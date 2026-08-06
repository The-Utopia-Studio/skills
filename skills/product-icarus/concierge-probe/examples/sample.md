# Worked example — Barrier Intelligence

Fellow: **Barrier Intelligence** (oil & gas safety). Numbers are illustrative test fixtures, not client data.

The pitch is an automated gas-safety alert from rig field logs. Before writing any of it, the fellow delivers the alert by hand to one operator for two weeks and charges for it.

## 0. Scope (set before delivery)

| Field | Value |
|---|---|
| Customer (named, real) | Northfield Platform B, shift-safety lead |
| Outcome they get | One 06:00 gas-safety alert per day, ranked by rig zone |
| "Done" they will accept | Alert in their hands before the 07:00 handover, zero missed high-risk readings |
| Price | £400 / platform / 2-week trial, invoiced |
| Payment mechanism | Invoice, net-14 |
| Date price set | Day 0, before first delivery |

## 1. Concierge log (abridged — 10 delivery days)

| # | Step (by hand) | Minutes | Who | Exception |
|---|---|---|---|---|
| 1 | Pull overnight field logs from shared drive | 15 | founder | Day 3: logs not posted until 06:40 — night-shift lead forgot to upload |
| 2 | Read gas readings, flag zones over threshold | 25 | founder | Day 5: sensor 4B read null, not zero — had to call the rig to confirm safe |
| 3 | Cross-check against active work permits | 20 | founder | Day 6: hot-work permit not in the system; only on paper at the rig |
| 4 | Write + send ranked alert | 10 | founder | Day 8: operator wanted it as SMS, not email, for the walk to handover |

Total founder minutes: ~70/day. Distinct exceptions logged: 4.

## 2. WTP score

| Signal actually got | Rung | Score | Got it? |
|---|---|---|---|
| Invoice paid / charge cleared | money moved | 1.0 | **yes — invoice #0007 paid net-11** |
| Used the outcome in real work | behaviour | 0.7 | yes (alert read at every handover) |
| Signed LOI / PO | artefact | 0.5 | — |
| "Yes, I'd pay" | verbal | 0.3 | — |
| "Sounds useful" | opinion | 0.1 | — |

WTP score: **1.0**
Evidence: invoice #0007 for £400 cleared on day 11; renewed for a second platform verbally (not yet paid — that renewal is 0.3, not counted here).

## 3. Read-out (honesty contract)

Honest about:
- WTP: [Fact] rung 1.0 — one operator paid £400 for the hand-made alert.
- Real workflow: [Fact] the automation must handle null-vs-zero sensor reads, paper-only permits, late log uploads, and an SMS delivery path. None were in the original happy-path design.

Must NOT claim:
- Scale: [Hypothesis, not tested] one platform paying says nothing about the other 40.
- Self-serve UX: [Hypothesis, not tested] the founder read the logs and made every judgement call.

## 4. Decision

Band: ≥0.7 → real pull. Next move: hand this exact workflow (including the four exceptions) to `agent-concierge-probe` to see which steps an agent can do and what each alert costs. Scale and trust remain unproven and are out of scope for this probe.

What would move nothing higher: WTP already at the top rung. The open question is now cost-per-alert, not demand.
