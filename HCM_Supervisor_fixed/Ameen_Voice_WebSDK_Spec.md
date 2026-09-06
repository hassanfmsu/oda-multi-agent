# Ameen — Voice in the Web / Mobile App

Goal: employees open the employee portal or the mobile app, **speak** to Ameen, and **hear** the reply. Teams keeps working exactly as it does today, in text.

This is the option where ODA gives you the most out of the box: the Oracle Web SDK and the iOS/Android SDKs have built-in speech recognition (the employee talks) and text-to-speech (Ameen talks back). No telephony, no custom audio bridge.

---

## 1. Two workstreams

| # | Workstream | Owner | Depends on |
|---|---|---|---|
| A | Channel: embed the SDK, switch on speech in and speech out | Portal / mobile developer | ODA admin creating the channel |
| B | Skill: make Ameen's answers sound right when spoken | Me (partly done — see §4) | Nothing |

They are independent. B is already started and does not block A.

---

## 2. Workstream A — the channel

1. **Create a Web (ODA Web SDK) channel** for the Ameen skill in the ODA console and note the channel ID / URI.
2. **Embed the SDK** in the portal, and the mobile SDK in the app.
3. **Turn on speech input and speech output** in the SDK initialisation settings. In the Oracle Web SDK these are init-time flags — the ones to look for are the speech-recognition switch, the auto-send-after-speech switch, and the bot-audio-response (TTS) switch, plus a speech locale. Exact flag names move between SDK releases, so take them from the SDK version you actually install rather than from any older sample.
4. **Set the speech locale per user** — Arabic (Saudi Arabia) or English. Do not hardcode one. If the portal knows the employee's preferred language, pass it; otherwise expose a toggle.
5. **Authentication**: use the signed JWT / client-auth flow so `profile.email` and `personId` arrive exactly as they do on Teams. Every Ameen agent reads identity from the session — none of them ask the user who they are, and that must stay true.

> Point to confirm with Oracle before committing dates: whether you use ODA's own speech service or the device/browser speech engine, and which Arabic locales that choice supports. This single answer drives the Arabic quality result in §5.

---

## 3. What changes for the employee

| | Teams (today) | App with voice (new) |
|---|---|---|
| Input | typed | spoken, or typed |
| Output | formatted text, emoji, tables | spoken sentences, and text on screen |
| Payslip | totals on screen | totals spoken, document still emailed |
| Attendance | day-by-day list | "You worked 21 days in July, averaging 9 hours. Want me to go through them?" |

---

## 4. Workstream B — the skill (status: groundwork done)

**Done already:**
- New skill variable `modality` (`voice` or `text`), defaulting to `text` so nothing changes for Teams.
- `loopFlow.setModality` sets it once per turn, before anything else runs.
- `languageOutput` — the renderer for every supervisor reply — is now modality-aware. In voice it drops emoji, drops bullets and tables, speaks dates naturally ("the ninth of September"), never reads a URL, and keeps to two or three sentences, offering to continue for long lists.

**How `modality` is detected — one line to point at your signal.** `setModality` currently checks, in order:
1. `messagePayload.channelExtensions.speech` contains `true`
2. `messagePayload.channelExtensions.modality` contains `voice`
3. a `modality` property on the user profile
4. otherwise `text`

The app decides which of these it can set. If the SDK exposes a "this message was spoken" flag, use 1. If not, have the app set the profile property when the user turns the mic on, or set it for the whole app session. **Tell me which signal you can actually provide and I will pin `setModality` to it** — the rest of the skill needs no change.

**Still to do (say the word and I will do it):** apply the same `modality` parameter to the renderers that currently produce screen-shaped output —
- `submitExitReentryAgent` — the visa type question is a numbered list ("reply with 1 or 2"), which is meaningless spoken. In voice it must become "Do you need a one-visit or a multiple-visit visa?"
- `payslipAgent` — totals read aloud as sentences.
- `attendanceAgent` and `absenceAgent` — the day-by-day and month-grouped tables must become a spoken summary plus an offer to go through the detail.
- `balanceAgent`, `personalAgent`, `employmentAgent`, `ragAgent`, `helloAgent` — short, already close.

Scan of the current skill for what breaks when spoken: **332 emoji characters**, **1 numbered pick-list**, **3 table-style renderers**.

---

## 5. Risks worth raising with the CHRO

1. **Arabic recognition quality is the whole ballgame.** Saudi dialect, mixed Arabic-English ("عندي meeting بكرة"), and names will decide whether people keep using it. Test with real employees before launch, not with the project team.
2. **Privacy.** Ameen reads salary, payslip totals and leave balances. Spoken aloud in an open office, a workshop or a shared car, that is a disclosure. Recommendation: for pay and salary answers in voice, speak a confirmation first ("I can read your July totals aloud — shall I?") or send to email and say only that it was sent. This is a policy decision, not a technical one — get the CHRO to choose.
3. **Confirmations matter more.** Speech recognition misreads dates and numbers far more often than typing. The submission flows already confirm before submitting; keep that, and never let voice skip a confirmation.
4. **Noise and silence handling.** Decide what Ameen does on an unclear utterance: re-ask once, then offer to switch to typing. Without this, voice failures feel like the bot is broken.

---

## 6. Test plan (must pass before launch)

1. English employee speaks "what is my leave balance" → hears the balance in one sentence.
2. Arabic employee speaks "كم رصيدي" → hears the balance in Arabic, no English mixed in.
3. Voice payslip: employee asks for July → hears the totals, no URL spoken, document arrives by email.
4. Voice exit/re-entry: full journey by voice, including the confirmation, ending in a submitted request. No "reply with 1 or 2" is ever spoken.
5. Attendance for a month → hears a summary, not 30 rows.
6. Same six journeys typed in the same app → still render as today, with emoji and tables. Proves `modality` switches cleanly.
7. Teams regression: every journey unchanged. Proves the default stayed `text`.
8. Mic on, employee says nothing → sensible re-prompt, then a graceful fallback to typing.
