# Eval log — guardrail-design

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "Design the guardrails for our AI product."
2. "When does a human need to sign off on this?"
3. "How should we handle failures / bad outputs?"
4. "What confidence threshold should we auto-approve at?"
5. "We can't let it do X wrong unsupervised — where do we put the human in the loop?"
MUST NOT fire (3, name the sibling each belongs to):
1. "What acceptable failure rate should we accept per mode / which autonomy level L0–L4?" → belongs to `eval-first-spec`
2. "We've been accurate for a month — can we drop the human review now?" (autonomy promotion) → belongs to `refine-flywheel`
3. "How do we build the AI system / what's the component pipeline / effort split?" → belongs to `compound-system-architecture`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | GRADUATE-READY | see judge run below |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire map verbatim to description trigger phrases ("design the guardrails", "when does a human sign off", "how do we handle failures / bad outputs", "what confidence threshold ... auto-approve at", "where do we put the human in the loop"). All 3 must-not-fire are explicitly excluded in the closing "Do NOT fire..." clause naming eval-first-spec / compound-system-architecture / refine-flywheel. |
| 2 Golden | PASS (5/5) | per-case table below; every case ≥21, no dim <4, no auto_fail |
| 3 Adversarial | PASS (3/3) | 01 vague → fires then gates on missing inputs, asks the one question (cost×volume) / routes to eval-first-spec, invents nothing (SKILL "When NOT" + template §A). 02 review-everything → declines, names the uniform-stack trap + rubber-stamp + "a blanket approval is not a code block", redirects per quadrant (reframe + Gotchas). 03 clean-month → declines, hands to refine-flywheel, refuses to silently redesign to higher autonomy (description exclusion + "When NOT" row). |
| 4 Head-to-head | n/a | `supersedes: none` |
| 5 Anti-generic | PASS | G01 output rests on the cost×volume matrix (Q1–Q6), τ *derived* from a calibration curve vs the acceptable rate, the evidence ladder placing model self-report at 0.1, and the add-human-where-costly / remove-where-cheap reframe. A generic PM prompt ("add review for risky cases, use a threshold") produces none of these; the reframe is load-bearing, not decoration. Guidance is table-first (matrix, stack, τ-derivation, sign-off, cost all as tables), not prose. |
| 6 Real-use | pending | requires 5+ real fellow uses |

### Gate 2 per-case scores (dimensions: method_fidelity / artifact_complete / proprietary_edge / challenge / evidence_standard)

| Case | method | artifact | edge | challenge | evidence | total | pass |
|---|---|---|---|---|---|---|---|
| G01 Mentix sign-off | 5 | 4 | 5 | 5 | 5 | 24 | PASS |
| G02 Azraq downgrade | 5 | 5 | 5 | 5 | 4 | 24 | PASS |
| G03 Durian mundane | 5 | 4 | 5 | 5 | 5 | 24 | PASS |
| G04 "auto-approve >0.8" | 5 | 4 | 5 | 5 | 5 | 24 | PASS |
| G05 "one guardrail for both" | 5 | 5 | 5 | 5 | 4 | 24 | PASS |

Notes on the marking (hard-marked, artifact/evidence docked one where the input band is
genuinely soft, never fabricated up):
- G01 — bands shutdown High×Low→Q3, reorder Low×High→Q6, root-cause High×(Med/High)→Q4,
  format Low×High→Q6; declines "manager reviews everything" as the uniform stack; sign-off
  only on shutdown + below-τ root-cause; acceptable rates absent → τ tagged `[Hypothesis]`,
  routed to human interim (correct). artifact 4: "Medium" volume for root-cause has no band —
  collapses to High, defensible but under-specified in the input.
- G02 — isolates the *asymmetric* mode (downgrade ≠ upgrade); L1 code rule "never auto-publish
  a downgrade of a previously-flagged risk", fail-safe; sign-off on every downgrade. Sharpest
  edge in the set. evidence 4: High-to-Catastrophic band left straddling, correctly `[Assumption]`.
- G03 — the mundane test: *removes* the proposed per-ticket sign-off (Low×High→Q6), guards on
  aggregate rate not per-item, refuses to manufacture a catastrophe. artifact 4: single mode →
  thin matrix by nature.
- G04 — refuses felt 0.8 on both grounds (shared τ across High+Low = uniform stack; 0.8 not
  derived); names calibration curve owed; places model self-report at 0.1; interim = route High
  mode to human. artifact 4: honest output is a critique + owed-curve, less a full A–F fill.
- G05 — the canonical one-size KILL: Miss (Cat×Low→Q1) vs noisy tickets (Low×High→Q6) land in
  opposite corners; two distinct stacks; reframes "simple = fewer components, not one guard for
  every cost". evidence 4: both costs `[Assumption]`, no higher rung available in the input.

No auto_fail triggered in any case: no invented numbers (the skill actively refuses to), no
flattery, in-scope, not generic.

### Kill-line verification (task-specified)
- Cost-of-error × volume matrix present, operational volume band defined (one reviewer / SLA), Q1–Q6 consistent with all golden expected shapes. ✓
- Three-layer stack (rules in code → confidence threshold → human sign-off) sized per quadrant, layer 1 always on, L2 required independent of the reasoning model. ✓
- Catastrophic/High never rests on model confidence alone (Step 2 Law 1 + kill-line item 2); Cat×High (Q2) still safe because the deterministic code block runs on 100%. ✓
- Human-sign-off trigger mandatory for every high-cost/low-confidence path; fail-safe on timeout for Cat/High, fail-open only for Low. ✓

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas — judge did NOT edit SKILL.md)
- LOW — Two-band volume vs "Medium". Golden 01's root-cause mode is described "Medium/High"
  volume, but the matrix has only Low/High. The skill collapses Medium→High (Q4) correctly, but
  a one-line rule in Step 2 ("Medium rounds up to High — if you cannot review *every* instance,
  it is High") would remove the hesitation.
- LOW — description density. Trigger precision is perfect (5/0), but the `description` is long
  and packs the full output spec plus three negative-routing clauses; fine for firing, worth a
  trim only if brevity is later prioritised. No functional impact.

## Refine run 2 — applied judge fixes: added the no-Medium-volume-band rule in Step 2 (a "Medium" mode rounds up to High for stack-sizing, never down).
