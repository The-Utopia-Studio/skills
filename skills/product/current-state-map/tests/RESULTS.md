# Eval log — current-state-map

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "How is this done today? Map it and price every step."
2. "Map the workflow and tell me what each step costs."
3. "What does this process cost us now?"
4. "Walk the as-is process and price it."
5. "Where does the time and money go in this workflow?"

MUST NOT fire (3, name the sibling each belongs to):
1. "What should this cost / is the gap big enough to build?" → belongs to `physics-floor-gap`
2. "Strip this job to its primitive — information, decisions, liability." → belongs to `job-in-primitives`
3. "What's the TAM / total market for this?" → belongs to `bottoms-up-quantification`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | `description` names the 5 fire-phrasings near-verbatim and carries an explicit NOT-list mapping each sibling (physics-floor-gap / job-in-primitives / bottoms-up-quantification / problem-framing-canvas). All 5 must-fire matched; all 3 must-not-fire routed to the correct sibling and did not fire. |
| 2 Golden | PASS (5/5) | Applied the Method to each input, filled the ledger, re-computed every number, re-checked each priced step cites an artefact and totals. See per-case table below. |
| 3 Adversarial | PASS (3/3) | 01 vague one-liner → Method Step 1 stops and asks for one unit + one priced artefact, invents nothing. 02 solution-in-disguise → Step 2 + Gotcha "price the real practice not the SOP/future-with-product" refuses the to-be map and re-anchors on today's manual work. 03 out-of-scope → When-NOT table + Related-skills decline and name `physics-floor-gap`, compute no floor/gap. No fabrication, no flattery, no scope-poaching. |
| 4 Head-to-head | n/a | `supersedes: none`. |
| 5 Anti-generic | PASS | G01 output turns on moves a generic PM prompt lacks: paid-wait-vs-free-delay split, the evidence ladder (shift logs = 0.7), [Fact]/[Assumption]/[Hypothesis] tagging, and failure-tail-flagged-not-invented. The load-bearing artifact (priced ledger) is a table in template.md; Method prose is procedural, not misplaced guidance. |
| 6 Real-use | pending | Requires 5+ real fellow uses. |

### Gate 2 — per-case scores (rubric: /25, pass ≥21 AND no dim <4)

| Case | method | artifact | proprietary | challenge | evidence | Total | Pass |
|---|---|---|---|---|---|---|---|
| G01 Mentix shift-handover (paid-wait handoff) | 5 | 5 | 5 | 4 | 5 | 24 | PASS |
| G02 Barrier permit-to-work (delay dominates) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| G03 Durian invoice reconciliation (mundane) | 5 | 4 | 4 | 5 | 5 | 23 | PASS |
| G04 Mentix config → NOT READY (failure tail) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| G05 Azraq aggregate → NOT READY | 5 | 5 | 5 | 5 | 5 | 25 | PASS |

Numeric kill-line re-check (per protocol): every case that emits a total prices each step from a cited artefact and totals correctly (G01 £41.17 from shift logs; G02 £18,850 with £180k/24=£7,500/hr × 2.5hr=£18,750 from charter; G03 ~£3.32/unit from time-tracking export). G04 and G05 correctly refuse a trustworthy total — decomposed / flagged [Hypothesis] and returned NOT READY, never floored. No unpriced step, no price without a cited source, no invented number. No `auto_fail` triggered in any case.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **The readiness gate has no crisp rule for an unpriced [Hypothesis] failure tail that *might* dominate.** In G04 an unpriced stoppage tail forces NOT READY; in G01 and examples/sample.md an unpriced failure tail sits "outside the priced total" and the map is READY. The concentration gate is stated in % of total, but a [Hypothesis] tail has no % (it is unpriced), so the arithmetic gate does not decide it — the boundary is left to judgment. Suggest an explicit rule: an unpriced tail is dominant-suspect (→ NOT READY) when the priced base is thin enough that a plausible tail could exceed it; it is an upside-risk sitting outside a holding total only when a substantial sourced base already stands. Both correct applications exist in the fixtures; the skill should name the test that separates them.
- **template.md vs sample.md column drift (minor).** template.md's step ledger carries a `Loaded £/min` column; examples/sample.md drops it. Harmless, but align them so the worked example matches the template a fellow fills.

## Refine run 2 — applied judge fixes: readiness gate (SKILL Step 9 + template §9) now separates a *dominant-suspect* unpriced `[Hypothesis]` tail that could exceed the priced total (→ NOT READY) from an *upside-risk* tail outside a valid holding total (→ READY, tail flagged); sample.md ledger regains the `Loaded £/min` column to match the template.
