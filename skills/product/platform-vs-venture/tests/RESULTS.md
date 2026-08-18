# Eval log — platform-vs-venture

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "build vs buy on this"
2. "build or use the platform?"
3. "what does Daedalus give me?"
4. "do we build our own eval harness / RAG / router?"
5. "should we build our own model?"
MUST NOT fire (3, name the sibling each belongs to):
1. "sequence the moat into dated gates" → belongs to `moat-design-canvas`
2. "lay out the component pipeline and effort split" → belongs to `compound-system-architecture`
3. "write the actual guardrail rules and thresholds" → belongs to `guardrail-design`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| 2026-08-06 | 1 — Trigger precision | PASS | 5/5 MUST-fire present in the description verbatim/near-verbatim ("build vs buy", "build or use the platform", "what does Daedalus give me", "do we build our own eval harness / RAG / router", "should we build our own model"); 3/3 MUST-NOT-fire deflected in the When-NOT table with the correct sibling named (moat-design-canvas · compound-system-architecture · guardrail-design). |
| 2026-08-06 | 2 — Golden 01–05 | PASS | 5/5 reproduce through Steps 1–6 / template A–G. G01 Azraq → BOUNDARY DRAWN, corpus behaviour-0.7 Venture, RAG+eval substrate/signal split. G02 Barrier → BOUNDARY WRONG (moat leak), labelling+rules pulled in-venture, engine stays Platform, asymmetry stated. G03 Durian → none of the five primitives built, corpus [Hypothesis] challenged. G04 Mentix → BOUNDARY WRONG (commodity-as-moat), model→Buy. G05 mundane → short one-lane observability=Platform, only trace-signal=Venture. See nits below on two unwired handoffs. |
| 2026-08-06 | 3 — Adversarial 01–03 | PASS | A01 vague one-liner → invents no stack, asks the one unblocking question, routes to compound-system-architecture. A02 harness-as-problem → names the rebuild trap, refuses to build the harness (Platform primitive), redirects to golden cases as the Venture-moat, shows the substrate/signal split. A03 sequence-the-moat → declines, names moat-design-canvas, draws the which-vs-when boundary, hands off the Venture lane. |
| 2026-08-06 | 4 — Supersede | N/A | `supersedes: none`. |

### Rubric score — 25 / 25 (pass_threshold 21; min 4/dim) — **PASS**

| Dimension | Score | Basis |
|---|---|---|
| method_fidelity | 5 | Six-step method, each step bound to a template section (A–G): components → moat test → substrate/signal split → three-lane assignment → Step-5/E kill-line self-check → Step-6/F verdict + the one move. No step skipped or softened ("Do not soften"). sample.md executes all six on Mentix; all 8 fixtures reproduce through the stated tables. |
| artifact_complete | 5 | Named artifact (boundary map) is fully specified by template.md: per-component moat test with ladder score + [Fact]/[Assumption]/[Hypothesis] tag, substrate/signal split, three-lane table, five-row kill-line self-check, verdict + single reassignment, next step. sample.md fills every field with the fellow's own numbers (corpus behaviour 0.7, tagged). |
| proprietary_edge | 5 | Not reachable from a generic prompt: changes the axis from cheapest-to-own (TCO) to where-venture-time-compounds, and draws the line *through* each component (substrate vs signal) rather than treating whole components as atomic build-or-buy. Moat test = the unlimited-resources discriminator applied per component; evidence ladder gates the "this is our moat" claim at ≥0.5. Explicitly states why a generic answer fails (treats each row as one binary). |
| challenge | 5 | Refuses to flatter (auto-fail-backed; G02 "good plan" / G04 "right?"). Catches both errors and both mirror-image gold-plating/commodity traps, each with the single reassignment. Names kill criteria (three BOUNDARY WRONG triggers), gaps (roadmap-hole: confirm the primitive exists today), and what would change the view (re-open fine-tune only if a golden-case eval beats the rented model). |
| evidence_standard | 5 | Explicit ladder money 1.0 · behaviour 0.7 · artefact 0.5 · verbal 0.3 · opinion 0.1, with a ≥0.5 bar to call a component Venture-moat; "feels like our edge" (0.1) demoted to a claim to test, not a reason to build or to refuse to outsource. Symmetric on inheriting (structural fact, not cheaper-preference). Platform-roadmap claims forced to [Assumption] until confirmed. |

**Auto-fail check:** none triggered. No fabricated number/quote/citation (sample.md is labelled an illustrative fixture; invention forbidden throughout, adversarial cases require inventing no specifics); challenges rather than flatters (G02/G04 refuse the plan); boundaries held — no sibling poached (moat-design-canvas / compound-system-architecture / guardrail-design deflected); output is a specific ownership-line map, not PM boilerplate.

**Kill line:** NOT hit. The task's kill line *is* this skill's Step-5/6 thesis, enforced in both directions — a platform primitive (router / eval harness / RAG / guardrail engine / observability) in Venture with no signal → Rebuild error → move to Platform; a component that fails the moat test in Buy/Platform → Moat-leak (fatal) → move to Venture; plus commodity-as-moat (rented model), roadmap-hole, and gold-plating self-checks. The asymmetry is stated (rebuild burns weeks; leak ends the venture). The skill commits neither error; it is built to catch them.

**Three-way split (task-required verification):** VERIFIED per component. Lanes = Platform (inherit) / Venture (build) / Buy (rented commodity) — the exact three-way split. The split is drawn *through* each component, not just between them: RAG → retriever/embeddings (Platform) + corpus & domain-relevance (Venture); Eval → runner/gate (Platform) + golden cases & pass-bar (Venture); Guardrails → policy engine (Platform) + rules/thresholds/cost-of-error (Venture); Router → dispatch machinery (Platform) + paths & domain reasoning (Venture); Observability → tracing/dashboards (Platform) + which trace signal feeds the flywheel (Venture); Model → whole = Buy (rented, swappable, eval-gated) + domain reasoning wrapped around the call (Venture). Base model correctly seated as the canonical rented-commodity, not the moat.

**Verify checklist:** assigns each component Platform/Venture/Buy on the moat test ✓ · draws the substrate/signal line through shared components ✓ · returns BOUNDARY DRAWN / BOUNDARY WRONG + the single reassignment ✓ · does not poach compound-system-architecture (produces the pipeline) ✓ · does not poach moat-design-canvas (sequences the Venture lane over time) ✓ · does not poach guardrail-design (writes the rules; this splits engine vs rules) ✓.

**Judge note (protocol):** `JUDGE_PROTOCOL.md` was not present at the supplied path, elsewhere on disk, or in any session scratchpad (all empty). This run was scored against `tests/rubric.json` + the RESULTS.md gate structure + the task message's kill-line / three-way-split / verify criteria, mirroring the format the prior judge used on the `fellow-path-router` sibling. Gate labelling and this block's format are the judge's reconstruction, not a transcribed protocol Output section. Per the task, rubric.json + RESULTS.md were hand-completed after an interruption; they were judged normally and are internally consistent (5×5=25, threshold 21, min 4/dim).

**Improvement nits (non-scoring):**
- *Two unwired handoffs.* Fixtures expect routes the SKILL never names: G01 → `data-rights-clause` (for the corpus-rights `[Assumption]`), A02 → `dataset-builder` (for the golden cases). Neither exists on disk and neither is in the skill's Related-skills set, so an agent following SKILL.md produces the correct lane calls but would miss those two specific handoffs. Boundary correctness is unaffected; add both to Step 6 / Next-step or Related skills to close the fixture-vs-text gap.
- *Template heft vs. proportionality (G05).* template.md is a full A–G instrument with several 10-row tables; G05 demands a "couple of lines" answer and warns against inflating a mundane inherit-the-plumbing call. The gold-plating gotcha covers the intent, but the template offers no lightweight path — a mechanical fill risks over-length. Consider a one-row "single-component" express lane.
- *Core siblings unbuilt (build-state context, not a defect).* `compound-system-architecture` (mandatory upstream), `moat-design-canvas` and `guardrail-design` (downstream handoffs) are not yet on disk — expected in a wave-built sandbox. The skill self-guards (degrades to "ask for the component list" when no pipeline exists), so this does not affect its score.

## Refine run 2 — applied judge fixes: named the two unwired handoffs — data-rights-clause (unconfirmed corpus rights) and dataset-builder (golden-case build) — in Related skills and template G. Next step.
