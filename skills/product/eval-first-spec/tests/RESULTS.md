# Eval log — eval-first-spec

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Spec the build."
2. "Define scope for the v1."
3. "Scope the v1."
4. "Write the spec."
5. "How do we know it works?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Architect the AI system / design the component pipeline / what's the effort split" → belongs to `compound-system-architecture`
2. "What are the pilot terms / how do we price the pilot / set the commercial success metric" → belongs to `pilot-six-term-sheet`
3. "Is this even a wedge / will it get adopted" → belongs to `wedge-five-questions`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | Description names all 5 fire phrasings verbatim ("spec the build", "define scope", "scope the v1", "write the spec", "how do we know it works"). Each MUST-NOT is explicitly routed away in the description: pipeline/effort→compound-system-architecture, pilot price/terms/commercial metric→pilot-six-term-sheet, adoption→wedge-five-questions. Clean separation. |
| 2 Golden | PASS (5/5) | See per-case table below. All totals ≥21, no dimension <4, no auto_fail triggered. |
| 3 Adversarial | PASS (3/3) | 01 vague one-liner: skill asks the single job-line question and requests real artefacts, invents nothing (Part 1 "Not a job line" + "do not invent a spec from nothing"). 02 solution-in-disguise: skill refuses feature-as-spec, names the vanity-metric trap (aggregate ≠ per-instance ground truth), routes DAU to pilot-six-term-sheet. 03 out-of-scope: skill declines, names compound-system-architecture, hands over job line + golden set + budget as constraints, produces no pipeline/40-20-30-10. No fabrication, flattery, or scope-poaching. |
| 4 Head-to-head | n/a | `supersedes: none`. (Related-skills claims it "absorbs and beats" concept `user-story`/`user-story-splitting`, but that is not a formal pack supersede — Gate 4 correctly skipped.) |
| 5 Anti-generic | PASS | Golden-01 output cannot come from a generic PM prompt: the load-bearing machinery is the fixed 6/7/4/3 band spread + 14-`[Fact]` reality floor + mode-coverage rule; per-mode acceptable_rate *derived* as tolerable_cost ÷ cost_of_one_failure; and cost_per_outcome to the cent = (C_attempt×A)+C_human+C_remediation, explicitly distinguished from cost-per-call and gated against value_per_outcome (with the Miss-lives-on-the-value-side separation). A generic "acceptance criteria + cost estimate" prompt produces none of these. No guidance that should be a table is left as prose — template.md and the method are fully tabular; formulas are explicit. |
| 6 Real-use | pending | Not executable here (needs 5+ real fellow uses). |

### Gate 2 — per-case scores (rubric: 5 dims ×0–5, pass ≥21 AND no dim <4)

| # | Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Pass? |
|---|---|---|---|---|---|---|---|---|
| 01 | Mentix shift-risk digest | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 02 | Azraq monthly DC risk report | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 03 | Barrier gas-safety (autonomy trap) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 04 | Durian weekly stockout (mundane) | 5 | 5 | 5 | 4 | 5 | 24 | PASS |
| 05 | Under-evidenced spec (challenge) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |

Notes on the harder cases:
- **03 (gas safety)** is the autonomy stress test and the skill passes it cleanly: the method text itself derives the near-zero Miss rate from an unbounded cost_of_one_failure and forbids autonomy inflation, so a faithful application refuses the fellow's explicit "auto-act" ask, holds L0/L1, treats silent failure as the worst mode (mandatory "could not assess" heartbeat), and states economics cannot buy up the safety-derived autonomy ceiling. No auto_fail.
- **05 (under-evidenced)** correctly does NOT emit a filled template — the right deliverable is a refusal naming all four gaps with their quantified contrasts (8-vs-20, 0-vs-14 `[Fact]`, the acceptable_rate derivation rule, call-vs-outcome). `artifact_complete` scored on producing that correct deliverable, not a spec.
- **04 (mundane)** scored challenge 4 (input is clean, not weak) — the discipline shown is refusing to hand-wave the number and naming the L2 earn-up gate; other dims full.

### Special check (kill line: "fewer than 20 golden cases OR no cost-per-outcome number")
- Sample (`examples/sample.md`) carries **20** pass/fail rows, each with a binary checkable pass condition, and a cost_per_outcome of **$3.55/shift to the cent** checked against $900 value → economic PASS. Verified.
- Kill line + golden 05 confirm the skill **refuses** a spec missing either (fewer than 20 cases, or no cost-per-outcome number = auto-fail; report the gap, do not ship partial). Verified.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **Sub-case counting against the 14-`[Fact]` floor is under-specified.** Golden 02 (only 14 real report-months) leans on drawing *multiple distinct risk-cases from one report* to clear the reality floor — the golden expectation blesses this, but the SKILL.md method defines a case as "one real input" without stating whether distinct sub-inputs from a single artefact each count as `[Fact]`. A fellow could inflate the floor by slicing one artefact into many weakly-independent cases. Suggest a one-line rule: a sub-input counts `[Fact]` only if it is *independently checkable against its own ground truth*. (Not a gate failure — the ground-truth requirement partially guards it.)
- **Minor:** the "absorbs and beats `user-story`/`user-story-splitting`" line coexists with `supersedes: none`; harmless, but a reader may expect a head-to-head that the frontmatter does not declare. Consider phrasing it as "reframes" to avoid the supersede connotation.

## Refine run 2 — applied judge fixes: added Part-2 rule that a sub-input sliced from one artefact counts toward the 14-`[Fact]` floor only if independently checkable against its own ground truth (no slicing one artefact into many to inflate the floor).
