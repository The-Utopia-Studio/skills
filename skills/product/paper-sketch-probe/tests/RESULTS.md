# Eval log — paper-sketch-probe

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "Can you paper-test the factory-copilot workflow before we build it?"
2. "Let's sketch it — I want to see if a plant manager can follow the alert-to-action steps."
3. "I want to run a paper prototype of the invoice-to-approval flow."
4. "Run a sketch probe on the incident-report workflow."
5. "Draw the 3-screen signup and check a new user can follow it." (mundane)

MUST NOT fire (3, name the sibling each belongs to):
1. "Which probe should I run to test whether operators trust the alert?" → belongs to `probe-matrix`
2. "Fake the backend so users think the anomaly detection is live and see if they act." → belongs to `wizard-of-oz-probe`
3. "I'll run it by hand myself for the first ten customers to see if they'll pay." → belongs to `concierge-probe`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | see block below | judge (did not author) |

## Judge run — run 1
| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire carry paper/sketch + workflow-legibility framing; description tokens ("paper test/sketch it/paper prototype/sketch probe/draw the flow and check they can follow") fire on each incl. the mundane signup (#5). All 3 must-not-fire caught by explicit exclusions: "which probe" → probe-matrix; "fake the backend…see if they act" → wizard-of-oz (demand); "by hand…see if they'll pay" → concierge (pay). |
| 2 Golden | PASS (5/5) | per-case table below |
| 3 Adversarial | PASS (3/3) | 01 vague → asks the one question (which workflow + legibility/decision claim), refuses to invent panels; 02 fidelity-for-demand → rejects framing, names polish≠demand trap, routes demand via probe-matrix→wizard-of-oz/fake-door; 03 trust-to-act → declines, names concierge-probe (real stakes), offers only the in-scope legibility slice. No fabrication, flattery, or scope-poach. |
| 4 Head-to-head | n/a | frontmatter `supersedes: none`. (Prose claims it "absorbs/sharpens" prototyping-pretotyping — a sibling-narrowing, not a formal supersede; see gotchas.) |
| 5 Anti-generic | PASS | Golden-01 output is not reproducible by a generic PM prompt: the two-outputs-only contract (legibility vs decision-location), the 0.7-behaviour / 0.1-opinion evidence-ladder cap on demand/feel/trust, the mandatory "does NOT tell you" block, and sibling-probe routing are all Icarus-specific. Guidance is tabular (panel/signal bands, route table, template); no should-be-a-table-as-prose defect. |
| 6 Real-use | pending | requires 5+ real fellow uses |

### Gate 2 — per-case scores (dims: method / artifact / proprietary / challenge / evidence)
| Case | method | artifact | proprietary | challenge | evidence | Total /25 | Pass? |
|---|---|---|---|---|---|---|---|
| 01 Durian vendor-email→PO | 5 | 5 | 5 | 4 | 5 | 24 | Y |
| 02 Azraq incident-report | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 03 Barrier permit-check | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 04 mundane 3-screen signup | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 05 Mentix "whole product" (weak) | 5 | 4 | 5 | 5 | 4 | 23 | Y |

Notes per case:
- **01** — Drew 7 panels (email→parse→review→**ambiguous line item (exception)**→catalogue check→approve→issued). Legibility ≈86% (1 legibility gap at the parse panel, resolves by showing the raw email side-by-side); decision isolated to the ambiguous-line-item panel, needing off-page catalogue/prior-order judgment. Demand/pay refused (opinion 0.1). No auto_fail.
- **02** — 6 panels; decision correctly located at the "flag the risk call" panel; explicitly warns the contested-data-point panel could be a *second* decision point (>2 = job not decomposed) and resists automating panels 1–4 before the decision panel is isolated.
- **03** — Scope boundary held: reports legibility only; decision at the stale/shadow-permit panel; "does NOT tell you" block routes trust-to-act to `concierge-probe`. Did NOT claim trust or safety-behaviour proven.
- **04** — Under-5 panels handled honestly ("a legibility check on a short flow, not a workflow probe"); did NOT manufacture a decision panel; capped signup intent at opinion 0.1 and flagged "wrong probe" if a demand read was expected. This is the strongest discriminator against generic PM output.
- **05** — Correctly invoked the over-9 band, refused to draw the whole product, and narrowed to one slice (shift-handover) as the smallest honest next step. Artifact scored 4 because the correct deliverable is a challenge + narrowing, not a filled template (filling it would have been the failure); evidence 4 as evidence-tagging is lighter in a refusal. No fabricated sketch.

No `auto_fail` triggered on any case (no numbers/quotes passed off as real input, no flattery, no scope-poach, not generic boilerplate). Run-log/percentage values in cases 01–03 are illustrative placeholders (as in `examples/sample.md`), correctly evidence-tagged — see gotcha 1.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **Golden cases can only be shape-scored, not outcome-scored.** The inputs provide no real operator run-log data, so the artifact's pauses/percentages are illustrative placeholders. `examples/sample.md` labels this ("Illustrative fixture… not real client data"); the golden files do not. Consider a one-line note in the goldens that eval artifacts are illustrative — real outcome validation is Gate 6.
- **Legibility-% counting convention is implicit.** The sample computes % by counting only *legibility gaps* against the total (decision-point pauses still count as "followed"): "5 of 6 = 83%" despite two paused panels. Neither the Method nor `template.md` states this. A fellow counting *every* pause would wrongly drop below the 80% band and redraw a legible flow. Fix: state the formula in the read-out — `legibility % = (panels not blocked by a legibility gap) / N`; decision-point pauses do not count against legibility.
- **`supersedes` prose vs frontmatter.** Frontmatter says `supersedes: none`, but the closing prose says it "absorbs/sharpens the paper/L1 rung of `prototyping-pretotyping`." That's a sibling-narrowing, not a formal supersede. Minor, but worth a word to avoid a future judge treating Gate 4 as applicable.

## Refine run 2 — applied judge fixes: added illustrative-fixture label convention to sample (shape-scored, no real operator data); stated legibility-% formula (decision-point pauses do not count against it); clarified it narrows, not supersedes, prototyping-pretotyping.
