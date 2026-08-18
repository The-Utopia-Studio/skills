# Eval log — wizard-of-oz-probe

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "Let's fake the backend and have a human answer the requests for a day."
2. "Run a wizard of oz on the PO-generation workflow."
3. "I want a woz test: will managers act on the recommendation if it arrives reliably?"
4. "Put a human behind the curtain for the risk-report requests this week."
5. "Fake the auto-summary email by hand and see if anyone reads it." (mundane)

MUST NOT fire (3, name the sibling each belongs to):
1. "Which probe should I run to test whether operators trust the alert?" → belongs to `probe-matrix`
2. "Just sketch the workflow on paper and check they can follow the steps." → belongs to `paper-sketch-probe`
3. "I need our real cost-per-task before we price it." → belongs to `agent-concierge-probe`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all six | 5 executable gates PASS, Gate 4 n-a, Gate 6 pending | see judge block below |

## Judge run — run 1
| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | Description carries the exact WoZ vocab ("fake the backend", "wizard of oz", "woz test", "human behind the curtain", "answer the requests and see if they act") so all 5 must-fire phrasings match. The 3 must-not-fire are each named-and-excluded in the description: probe-choice→`probe-matrix`, paper-legibility→`paper-sketch-probe`, cost-per-task→`agent-concierge-probe`. Clean separation. |
| 2 Golden | PASS (5/5) | Applied Method to each input and scored the produced artifact. Table below. |
| 3 Adversarial | PASS (3/3) | 01 vague: Method step-1 forces a concrete claim+type-check, so a faithful applier asks the one question and cannot fabricate an output/curtain. 02 "prove the model works": rejected via the reframe + "When NOT" row (spike, not probe) + kill line + "feasibility by accident" gotcha. 03 "cost-per-task": declined via evidence standard (wizard-minutes = `[Hypothesis]`, not cost `[Fact]`) + "wizard minutes as unit cost" gotcha, routed to `agent-concierge-probe`. No fabrication, flattery, or scope-poaching. |
| 4 Head-to-head | n-a | `supersedes: none`. (Body notes it absorbs/sharpens the WoZ rung of `prototyping-pretotyping` but formally supersedes nothing.) |
| 5 Anti-generic | PASS | Golden-1 output cannot come from a generic PM WoZ prompt: it isolates usage by *deleting* feasibility, refuses to report cost/scale (mandatory "does NOT prove" block), scores on the evidence ladder (0.7 behaviour / 1.0 money / 0.1 opinion), and tags `[Hypothesis]/[Fact]`. Tabular guidance (fidelity contract, operator sizing, run log, routing) is tables, not prose. |
| 6 Real-use | pending | Requires 5+ real fellow uses. |

### Golden scores (rubric: /25, pass ≥21 and no dim <4)
| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Pass |
|---|---|---|---|---|---|---|---|
| 01 Mentix setpoint | 5 | 5 | 5 | 4 | 5 | 24 | ✅ |
| 02 Barrier gas-safety | 5 | 4 | 5 | 5 | 5 | 24 | ✅ |
| 03 Azraq risk answer | 5 | 5 | 5 | 4 | 5 | 24 | ✅ |
| 04 mundane summary | 5 | 5 | 4 | 5 | 5 | 24 | ✅ |
| 05 Durian weak input | 5 | 5 | 5 | 5 | 5 | 25 | ✅ |

No `auto_fail` triggered on any case (no fabricated numbers — placeholders/`[Hypothesis]` used; challenges the weak input in 05; routes to siblings rather than poaching; not boilerplate). Kill line (never claim feasibility/unit-cost/scale proof) is enforced by the mandatory "does NOT prove" block, the explicit kill-line statement, the evidence standard, and three gotchas.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas / template)
- **No safety-caveat field in the template.** Golden 02 (gas safety) and 01 (live setpoint change) involve real-world hazard, and the expected output notes "do not suppress a real hazard for the test." The template's curtain/operator sections have no prompt for this, so a faithful applier must add it unaided. Suggest an optional "Real-world-stakes caveat" line in §2/§4. (Caps golden-02 artifact_complete at 4.)
- **No explicit "vague input → ask the ONE question" instruction.** Adversarial 01 behaviour is reachable (step 1 can't be filled without an output + a usage action) but only implicitly. A one-line "If the output/action is unspecified, ask only: which single output, and what action counts as usage?" would make it explicit rather than emergent.
- **Minor doc wording:** frontmatter `supersedes: none` vs body "absorbs the WoZ rung of `prototyping-pretotyping`." Consistent (absorb ≠ supersede) but a reader could misread it; one clarifying clause would remove all doubt. Not a functional defect.

## Refine run 2 — applied judge fixes: added safety-caveat field to template (state what the wizard must NOT do on live/hazardous setpoints); added Method line to ask the ONE unblocking question on vague input; clarified it narrows, not supersedes, prototyping-pretotyping.
