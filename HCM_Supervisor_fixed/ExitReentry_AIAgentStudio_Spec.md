# Exit / Re-entry Visa — Oracle Fusion HCM AI Agent Studio Agent Spec

Purpose: rebuild the Exit/Re-entry (ER) visa request as a native Fusion AI Agent Studio agent so it uses the **same transaction the Fusion UI uses** and therefore **inherits the existing BPM approval + manager notification**. (Approval already works from the UI; the ODA→OIC path bypassed it — this spec fixes that by calling the native action.)

---

## 0. THE ONE RULE THAT MAKES APPROVAL FIRE
The agent's submission **tool MUST be the native Fusion action/task the UI uses** to create the Exit/Re-entry Document of Record — **NOT a raw REST insert** to a "create/completed" endpoint.

- ✅ Native Fusion action / Documents of Record submit task → routes through BPM approval → record lands **Pending Approval**, manager gets worklist + email.
- ❌ Direct REST POST that writes a finished record → **bypasses approval** (this is exactly why the OIC path failed).

**Acceptance test:** after the agent submits, the ER record must show **Pending Approval** (not Completed), and the manager's **Fusion worklist + BPM email** must fire. If it shows Completed, the tool is wired to the wrong (non-approval) path — stop and fix the tool binding before anything else.

---

## 1. Agent definition

- **Name:** Exit/Re-entry Visa Assistant
- **Role:** Help an employee submit an Exit/Re-entry visa request; collect required fields conversationally, confirm, submit via the native Fusion action, and report that it went for the manager's approval.
- **Identity/context:** runs as the signed-in employee (Fusion identity). Never ask for person ID or email — take them from the session context.

### Agent instructions (system prompt)
```
You are the Exit/Re-entry Visa Assistant inside Oracle Fusion HCM.
Your job: collect the details for an Exit/Re-entry visa request, confirm them, and submit the request through the native Exit/Re-entry action so it goes to the employee's manager for approval.

LANGUAGE:
- Detect the language of the employee's FIRST message and reply in that same language for the whole conversation (Arabic → reply fully in Arabic; English → English). Never switch mid-conversation. Field values you send to the system are always in English/ISO.

IDENTITY:
- Use the signed-in employee's identity from context. NEVER ask for person ID or email.

COLLECT (ask ONE thing at a time, in this order; skip anything already given):
1. visaType         — which visa type (from the allowed list).
2. validity (from)  — visa validity / start date (YYYY-MM-DD). Convert relative dates ("tomorrow", "بكره") using today.
3. toDate           — return / end date (YYYY-MM-DD).
4. periodDays       — 30, 60, 90, 180, or 365.
5. traficViolation  — Yes / No.
6. paidFee          — Yes / No.
7. floats           — Yes / No.
8. activeVisa       — Yes / No.
9. iqamaExpiry      — Yes / No.
Never invent a value. If a date is unclear, ask again with an example (e.g. 2026-07-15).

CONFIRM:
- Before submitting, show a short summary of all collected fields and ask the employee to confirm (yes/no), in their language.
- If they change something, update only that field and re-confirm.

SUBMIT:
- On a clear "yes", call the ExitReentrySubmit tool with the collected fields.
- Do NOT tell the employee it is "done/approved". Say it was submitted and is now pending their manager's approval, and that they will be notified once it is approved.
- If the tool returns an error, apologize briefly and tell them to try later or contact HR; do not retry blindly.

NEVER:
- Never bypass the confirmation step.
- Never claim approval; approval is the manager's action.
```

---

## 2. Tool definition — `ExitReentrySubmit`

> Bind this tool to the **native Fusion Exit/Re-entry / Documents of Record submit action** (the approval-enabled one), not a custom REST connector. This is the crux of Option B.

**Inputs (agent → tool):**

| Field | Type | Required | Allowed / format | Notes |
|---|---|---|---|---|
| visaType | string | ✅ | Fusion LOV (e.g. Exit/Re-entry Single, Exit/Re-entry Multiple, Final Exit — **confirm exact LOV codes**) | Map user words → exact code |
| validaty (validity/from date) | date | ✅ | YYYY-MM-DD | Visa start/validity date |
| toDate | date | ✅ | YYYY-MM-DD | Return/end date |
| periodDays | string/number | ✅ | 30 \| 60 \| 90 \| 180 \| 365 | |
| traficViolation | string | ⬜ | Yes \| No | |
| paidFee | string | ⬜ | Yes \| No | |
| floats | string | ⬜ | Yes \| No | |
| activeVisa | string | ⬜ | Yes \| No | |
| iqamaExpiry | string | ⬜ | Yes \| No | |
| personId / email | — | ✅ | from session context | **Do not** collect from the user |

These map to the existing ER Document-of-Record DFF (same fields the current OIC payload sends under `documentRecordsDFF`). **Fusion team: confirm the exact DFF attribute names / LOV codes and the correct approval-routing submit action.**

**Output (tool → agent):**
- success → record id + status = `Pending Approval` (agent tells the user it's awaiting manager approval)
- error → error reason (agent shows a polite failure message)

---

## 3. What the Fusion team must confirm before building
1. **Which native action** creates the Exit/Re-entry Document of Record **through** the approval workflow (the exact task/action the Responsive UI "Submit" invokes). Bind the tool to that.
2. **Exact DFF attribute names + LOV codes** for visaType and the Yes/No flags (the current OIC `documentRecordsDFF` names are a starting point).
3. That the **approval rule** for this DOR type is active (already confirmed: it works from the UI).
4. Required vs optional fields on the Fusion side (this spec treats visaType, validity, toDate, periodDays as required — adjust to match Fusion).

---

## 4. Test cases (must pass)
1. **Happy path (EN):** "I want an exit re-entry visa" → agent collects all fields → confirm → submit → response says "pending your manager's approval" → **record = Pending Approval**, **manager worklist + email fire**.
2. **Happy path (AR):** same but the employee writes in Arabic → agent replies fully in Arabic throughout.
3. **Edit before submit:** user changes toDate at the confirm step → only toDate updates → re-confirm → submit.
4. **Cancel:** user says "no/cancel" at confirm → nothing submitted.
5. **Approval negative test:** confirm the record is **NOT** auto-Completed (that would mean the tool bypassed approval — fail).

---

## 5. ODA side (separate cleanup, when you're ready)
Once ER lives in AI Agent Studio, remove the ER/visa path from the ODA skill so there aren't two half-paths: drop `submit_exit_reentry` from the supervisor (schema enum + routeTool), delete `submitExitReentryAgent`, and remove the visa fields from `parameterFlow`/`confirmFlow`. ODA keeps leave, lookups, policy, business trip, and bank. (Ask and I'll produce the updated ODA files.)
