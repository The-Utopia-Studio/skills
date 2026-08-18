# Eval log — pilot-six-term-sheet

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Structure the pilot terms for this deal."
2. "Help me structure the deal with this customer."
3. "How do I set up a paid pilot?"
4. "Write me a pilot term sheet."
5. "Structure the pilot so it isn't a free trial."

MUST NOT fire (3, name the sibling each belongs to):
1. "Brainstorm 3–5 revenue models and validate which one customers will pay for" → belongs to `monetization-strategy`
2. "Draft the data-rights legal clause for the pilot" → belongs to `data-rights-clause` (section 06)
3. "Is this the right wedge — will it actually get adopted?" → belongs to `wedge-five-questions`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | GRADUATE-READY | see judge run below |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 MUST-fire hit explicit trigger phrases in the description ("pilot terms", "structure the deal", "paid pilot", "pilot term sheet", "structure the pilot so it isn't a free trial"). All 3 MUST-NOT are explicitly excluded in the description and routed to monetization-strategy / data-rights-clause / wedge-five-questions. |
| 2 Golden | PASS (5/5) | per-case table below |
| 3 Adversarial | PASS (3/3) | 01: Step 1 stops and asks named customer + one workflow + pay signal, no fabrication. 02: price ladder + "free pilot for the marquee logo" gotcha refuse LOI/testimonial/logo/exposure as term 2 (0.1–0.3, no money moved). 03: declines without poaching, names monetization-strategy, offers explore-then-commit ordering. No fabrication, no flattery, no scope-poaching. |
| 4 Head-to-head | n/a | `supersedes: none` — new skill, nothing to beat. |
| 5 Anti-generic | PASS | Golden-01 output could NOT come from a generic PM prompt: a generic prompt blesses the free "reference" POC and defers pricing — the exact two moves this skill refuses via the evidence ladder (money-moved 1.0) and the "two terms fellows skip" reframe. Binary-AND 6/6 kill line, [Fact]/[Assumption]/[Hypothesis] tagging, and sibling routing are Icarus-specific. Guidance is tabular throughout (term bars, price ladder, conversion basis, verdict) — no load-bearing prose that should be a table. |
| 6 Real-use | pending | requires 5+ real fellow uses — not executable here |

### Gate 2 — per-case scores (5 dims × 0–5, pass ≥21 and no dim <4)

| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Pass? |
|---|---|---|---|---|---|---|---|
| Golden 01 (Mentix seed) | 5 | 5 | 5 | 5 | 5 | 25 | YES |
| Golden 02 (Azraq refusal) | 5 | 5 | 5 | 5 | 5 | 25 | YES |
| Golden 03 (Barrier success-contingent) | 5 | 5 | 5 | 5 | 5 | 25 | YES |
| Golden 04 (Durian mundane) | 5 | 4 | 5 | 4 | 5 | 23 | YES |
| Golden 05 (Mentix 5/6 deferred) | 5 | 5 | 5 | 5 | 5 | 25 | YES |

No auto_fail triggered on any case: illustrative numbers are clearly marked as test fixtures (not fabricated as real client data); weak inputs are challenged, not flattered; the skill stays in-scope and routes siblings out.

Special-check (orchestrator): six terms present and gated on a hard 6/6 `AND` (Golden 02/03 = 4/6, Golden 05 = 5/6 all return NOT A PILOT — no averaging, no softening). Free and conversion-deferred "pilots" are refused and renamed (demo / free POC / favour). Term 3 routes the legal language to `data-rights-clause` and does not rebuild it. All satisfied.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- Minor boundary tension, non-blocking: Step 1 says a fellow who "wants the pilot to be free" should be routed OUT ("a deliberately free demo is a demo; route it out"), yet Golden 02 (offered free "for the logo") is correctly handled IN-skill as a NOT-A-PILOT verdict with the money fix. Both are right, but the line between "route out at Step 1 (intentional free demo)" vs "run the binary and return NOT A PILOT + fix (a would-be pilot proposed free)" could be stated more crisply so a fellow does not bounce a genuine deal out prematurely.

## Refine run 2 — applied judge fixes: Step 1 now states the two exits explicitly — intent-to-charge → run the six-term binary and return NOT-A-PILOT with the fix; free demo/POC with no intent to charge → bounce up front and name it.
