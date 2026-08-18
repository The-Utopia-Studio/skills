# Eval log — agent-design

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Design an agent for our shift-handover digest / permit review / incident triage."
2. "What tools and memory should this agent have?"
3. "Spec the agent — role, tools, what it remembers."
4. "Our agent repeats the same mistakes every run and never remembers corrections — how should its memory layer be built?"
5. "Should this even be an agent, and if so what does it need to remember to get better over time?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Give my agent a personality / voice / signature phrases / make it sound like someone." → belongs to `meta/agent-persona-builder`
2. "Design the fleet / how do the agents hand off / who spawns whom." → belongs to `workflow-design`
3. "Write the agent's golden cases / set its autonomy level / what's the cost-per-outcome." → belongs to `eval-first-spec`

Boundary note: MUST-fire #4 ("never remembers corrections — how to build its memory layer") is structural and in scope; the post-launch ship→observe→learn→refine cadence and autonomy-raise belong to `refine-flywheel`. The description carries an explicit NOT clause for refine-flywheel to keep that boundary cold.

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| 2026-08-06 | Judge (rubric.json) | **PASS — 25/25** | Kill line survived (memory layer + eval both mandatory ship-blockers). Gate 4 n/a (`supersedes: none`). No auto-fail. |

### 2026-08-06 — Scored run (judge)

Protocol note: `JUDGE_PROTOCOL.md` was absent from the expected scratchpad path; scored against the embedded protocol in the task brief + `tests/rubric.json`.

| Dimension | Weight | Score | Evidence |
|---|---|---|---|
| method_fidelity | 5 | 5 | 5-step method (role→tools→memory→eval), checklist, template mirrors steps, worked example follows all five. Order = least-owned→most-owned; no step softened. |
| artifact_complete | 5 | 5 | Named artefact is the filled `template.md`: four parts + ownership test + compounding mechanism + kill-line check. `sample.md` fully filled with numbers (L1, $1.20/permit, case #17, wk-2→wk-3, ~90 runs) and citations routed to siblings. |
| proprietary_edge | 5 | 5 | Memory-layer-as-only-moat, ownership test, named-run compounding mechanism, "filing cabinet vs flywheel", no-commit-tool-at-L1, trace-archive-as-YODA-moat. Not reachable from a generic "design an agent" prompt. |
| challenge | 5 | 5 | Kill line + "do not invent a role"; golden/04 (reformatter → build a skill not an agent), golden/05 (no traces → run by hand first, tag `[Hypothesis]`), adversarial/01/02/03 (one-question, tool-piling trap, decline persona). Names what would change the view. |
| evidence_standard | 5 | 5 | Money>behaviour>opinion ladder; scores the compounding claim on it ("will learn over time" = 0.1, fails); mandates `[Fact]/[Assumption]/[Hypothesis]` tags, enforced in example and golden/05. |
| **Total** | **25** | **25** | Threshold 21; min-per-dimension 4 (all 5). |

**Auto-fail checks:** none triggered — no fabricated data (example labelled a test fixture); challenges not flatters; clean trigger scope with explicit sibling routes; specific, not PM boilerplate.

**Required-element check (task verify list):** role ✓ · tools ✓ · memory layer = CLAUDE.md·skills·lessons.md·trace-archive loaded at birth ✓ · eval routed to `eval-first-spec` ✓ · memory framed as only owned/compounding part ✓ · persona mechanics of `meta/agent-persona-builder` NOT restated (boundary named, 25-Q framework not reproduced) ✓.

**Verdict: PASS (25/25).** Ship. Notable strength: the persona/"memory" collision with `agent-persona-builder`'s MEMORY.md is pre-empted explicitly (gotcha L134 + adversarial/03 fail clause), so the sibling boundary stays cold.
