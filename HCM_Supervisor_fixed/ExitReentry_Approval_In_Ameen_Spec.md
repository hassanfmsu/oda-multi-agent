# Exit / Re-entry Approval — inside Ameen **and** by email

Goal: the manager can approve or reject an Exit/Re-entry request **either** from the existing OIC email **or** from a conversation with Ameen on Teams. Both act on the same request. Nothing about the current email is removed.

Current state: `EXIT_ENTRY_APPROV_SUBMIS_INT/1.0/submitExitEntry` creates the request and OIC emails the approver with Approve / Reject links. That keeps working exactly as it does today.

---

## 1. What OIC must add (2 endpoints)

These are the only new pieces. Both target the **same** pending approval that the email links act on.

### 1.1 `GET pendingApprovals`
Returns the Exit/Re-entry requests currently waiting on this manager.

**Query params**
| Param | Required | Notes |
|---|---|---|
| `approverEmail` | ✅ | The manager's work email. Ameen sends `profile.email` from the Teams session — no ID is collected from the user. |

**Response — one object per pending request**
```json
{
  "Status": "200",
  "requests": [
    {
      "requestId": "12345",
      "employeeName": "HASSAN FAISAL MOHAMMED ALHASSAN",
      "employeeEmail": "alhassanhf@alj.com",
      "visaType": "One Visit",
      "fromDate": "2026-08-09",
      "toDate": "2026-09-09",
      "period": "31",
      "traficViolation": "No",
      "paidFee": "Yes",
      "iqamaExpiry": "Yes",
      "submittedOn": "2026-08-09"
    }
  ]
}
```
- Must return **only** items still pending. Anything already approved/rejected — including via the email link — must not appear.
- Empty list is a normal result, not an error: `{"Status":"200","requests":[]}`.

### 1.2 `POST approvalAction`
Performs the same action the email Approve / Reject links perform.

**Body**
```json
{
  "requestId": "12345",
  "approverEmail": "manager@alj.com",
  "action": "APPROVE",
  "comment": ""
}
```
`action` = `APPROVE` | `REJECT`. `comment` optional (used as the rejection reason).

**Response**
```json
{ "Status": "200", "result": "APPROVED" }
```

**Required behaviours**
| Case | Response | Why |
|---|---|---|
| Action succeeds | `Status 200`, `result` = `APPROVED` / `REJECTED` | Normal path |
| Already actioned (e.g. manager clicked the email link first) | `Status 409` + `ErrorReason` naming the outcome and when, e.g. `Already APPROVED on 2026-08-09` | **This is the key dual-channel rule.** Ameen will show the manager what already happened instead of failing or double-approving. |
| `approverEmail` is not the assigned approver | `Status 403` + `ErrorReason` | Prevents approving someone else's item |
| Unknown `requestId` | `Status 404` + `ErrorReason` | |

Errors follow the existing convention (`"ErrorReason":"..."`), which the skill already parses.

---

## 2. What I build on the Ameen side

A new self-contained `approvalAgent` (same architecture as the working `submitExitReentryAgent`) plus one supervisor tool, `approvals`.

**Flow**
1. Manager says "my approvals" / "الموافقات" / "pending requests" → supervisor calls `approvals`.
2. Agent calls `GET pendingApprovals` with the manager's email.
   - none → "You have no requests waiting for your approval."
   - some → numbered list: `1. HASSAN — One Visit, 2026-08-09 → 2026-09-09 (31 days)`
3. Manager picks one (LLM-classified: "1", "the first", "Hassan's", typos, Arabic).
4. Agent shows the full request detail and asks **Approve or Reject?**
5. LLM classifier → `APPROVE` / `REJECT` / `CANCEL` / `OTHER`, typo-tolerant, any language.
6. On reject, ask for a short reason (optional but prompted).
7. `POST approvalAction` → confirm the outcome to the manager.
   - On `409` → tell them it was already actioned and how, then re-list what's still pending.
8. Then offer the next pending item, if any.

Language handling and typo tolerance reuse the exact pattern now proven in `submitExitReentryAgent`: detect the language once into an ISO code, render every message against that code, and classify every manager reply with a small LLM.

**Also updated:** `supervisorFlow.yaml` — add `approvals` to the tool enum, `routeTool`, and STEP 1 intent classification (triggers: my approvals, pending approvals, requests waiting for me, approve a request, الموافقات, الطلبات المعلقة).

---

## 3. Recommended email tweak (optional, not required)

Keep the Approve / Reject links. Add one line to the email body:

> You can also review and approve this request in Ameen on Microsoft Teams — just say "my approvals".

Both routes then work, and the `409` rule above keeps them consistent.

---

## 4. Test cases

1. Manager with 2 pending requests says "my approvals" → both listed → picks #1 → approves → employee's request becomes approved; item disappears from a second "my approvals" call.
2. Manager approves via the **email link first**, then opens Ameen → that item is no longer listed.
3. Manager opens the request in Ameen, meanwhile it is approved by email, then Ameen submits → `409` → Ameen reports "already approved" rather than erroring.
4. Reject with a reason → reason reaches the employee/Fusion the same way the email rejection does.
5. Manager with nothing pending → clean "nothing waiting for you" message.
6. Arabic manager → whole conversation in Arabic.
7. Non-manager employee says "my approvals" → empty list, no error.

---

## 5. To start building

Send me, as screenshots of the OIC endpoints (same as before):
1. The `pendingApprovals` URL + its query parameters + a real response sample.
2. The `approvalAction` URL + its request body + a real response sample.

With those two I can produce `approvalAgent.yaml` and the updated `supervisorFlow.yaml` in one pass.
