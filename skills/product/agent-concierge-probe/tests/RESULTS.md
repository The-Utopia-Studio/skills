# Eval log — agent-concierge-probe

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "Let an agent do the task end to end and see how far it gets."
2. "Measure the cost per outcome for the Mentix work-order triage."
3. "Run an agent concierge on Durian's first workflow."
4. "Where's the automation frontier — what can the agent not do unaided?"
5. "Price this to the cent: tokens, tool calls, and human-fix time per outcome."

MUST NOT fire (3, name the sibling each belongs to):
1. "I'll deliver it by hand myself and charge one operator." → belongs to `concierge-probe`
2. "Which probe fits testing cost per outcome?" → belongs to `probe-matrix`
3. "Sketch the screens on paper and walk the operator through it." → belongs to `paper-sketch-probe`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | GRADUATE-READY | 6-gate judge run below |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire hit literal triggers ("agent do the task", "measure cost per outcome", "agent concierge", "automation frontier / what can the agent not do unaided", "price it to the cent"). Must-not route to sibling probes + matrix: #1→concierge-probe (founder+charge), #2→probe-matrix, #3→paper-sketch-probe. Two documentation notes below. |
| 2 Golden | PASS (5/5) | Applied method to each; re-did the cost arithmetic; per-case table below. |
| 3 Adversarial | PASS (3/3) | 01 vague → Step 1/2 force the one question (scoped task + rates; "if you cannot capture human-fix minutes you cannot run this probe"); invents no tokens. 02 model-buy smuggling → reframes to frontier+CPO, names model choice as a *rate input* not the finding. 03 out-of-scope → declines trust/adoption (the contract LIES about both), routes trust→concierge/field probe and "which probe"→probe-matrix. No fabrication/flattery/scope-poach. |
| 4 Head-to-head | n/a | supersedes: none. |
| 5 Anti-generic | PASS | Golden-01 output forces the four-component breakdown *before* the number, surfaces that human-fix minutes are 93% of CPO (priced-cheap but not truly automated), colours the frontier and names the red critical-path step, refuses self-serve/trust. A generic "can an agent do it + roughly $2/task" prompt produces exactly the bare number this skill calls the kill line. Rates/run-log/breakdown/frontier/contract are all tables. |
| 6 Real-use | pending | requires 5+ real fellow uses |

### Gate 2 — per-case scores + arithmetic recheck (rubric: /25, pass ≥21 AND no dim <4)
| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Pass |
|---|---|---|---|---|---|---|---|
| 01 Mentix cost/triaged order | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 02 Durian first workflow, automatable? | 5 | 5 | 4 | 5 | 5 | 24 | ✓ |
| 03 Azraq agent-drafted report | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 04 Barrier cost-vs-trust confusion | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 05 Durian mundane CSV load | 5 | 5 | 4 | 4 | 5 | 23 | ✓ |

Arithmetic verified: the method's own worked example (Mentix, the G01 scenario) ties out exactly — in 102,600→$0.308, out 11,980→$0.180, 32 calls→$0.640, 13 min→$15.60, total **$16.73**, ÷9 successful = **$1.86/order**, human-fix share **93.3%**, tokens **$0.05/order**. Every component is shown and priced before the number (no bare-CPO kill line). Constructed ≥5-run logs for G02/03/05 under the stated rates are internally consistent with the formula. G03 correctly counts human verification/correction as human-fix minutes (defeats the "invisible human" gotcha) and marks unsupervised accuracy [Hypothesis, not tested]. G04 correctly reports 9/10 as a frontier/accuracy [Fact] and refuses the trust + self-serve conclusions, routing trust to a concierge/field probe. No auto_fail.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- Trigger doc gap: must-not #3 routes a "sketch the screens on paper" input to `paper-sketch-probe`, but the description's negative list names only `wizard-of-oz-probe`. It does not misfire (zero trigger-token overlap), but add paper-sketch-probe (or "any interface-sketch probe") to the description's negatives for completeness.
- Trigger near-collision: must-not #2 "Which probe fits testing cost per outcome?" contains the positive trigger "cost per outcome"; correct routing to probe-matrix depends on reading "which probe fits" as a *selection* question. It holds, but it is the closest call.
- Unit consistency in the CPO-vs-price sanity check: the worked example compares a $ CPO ($1.86) to a £ concierge price (~£4/order) with no FX note. The CPO arithmetic itself is clean; tighten the comparison to a single currency so the "flag if CPO > price" check is unambiguous.
- "Solution-smuggling" (Adv-02) is not named in the skill text; the material supports the reframe but relies on the applier to name the trap. Optional: add it as a gotcha.

## Refine run 2 — applied judge fixes: added paper-sketch-probe to the description negative list + When NOT (must-not-fire #3 route); fixed sample CPO-vs-price sanity check to one currency (USD) so "flag if CPO > price" is unambiguous.
