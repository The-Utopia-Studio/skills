# Eval log — fellow-path-router

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "where do I start"
2. "I already have traction — which Icarus stages apply to me?"
3. "onboard me to Icarus"
4. "which stages should I skip?"
5. "I have a mature product — what's my path through this?"
MUST NOT fire (3, name the sibling each belongs to):
1. "tear this idea apart / what am I missing?" → belongs to `concept-council`
2. "how good is this fellow — what level are they?" → belongs to `fellow-level-ladder`
3. "what should we build vs. what does the platform give us?" → belongs to `platform-vs-venture`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| 2026-08-06 | 1 — Trigger precision | PASS | 5/5 MUST-fire covered verbatim in the description; 3/3 MUST-NOT-fire deflected with the correct sibling named (concept-council, fellow-level-ladder, platform-vs-venture). |
| 2026-08-06 | 2 — Golden 01–05 | PASS | 5/5 trace cleanly through the Step-2 evidence gate + Step-3 ledger + Step-5 ratio tables to the expected type, ledger, ratio and entry point. Down-grade (05) and venture-or-feature (04) cases explicitly handled. |
| 2026-08-06 | 3 — Adversarial 01–03 | PASS | Vague one-liner → asks the one classifying question and stops; shipped-artefact claim → grades artefact 0.5, not traction, withholds skip list; teardown request → declines and routes to concept-council / so-what-stress-test. |
| 2026-08-06 | 4 — Supersede | N/A | `supersedes: none`. |

### Rubric score — 25 / 25 (pass_threshold 21; min 4/dim) — **PASS**

| Dimension | Score | Basis |
|---|---|---|
| method_fidelity | 5 | 7-step checklist + top-to-bottom template + Step-7 kill-line self-check; no step skipped or softened. All 8 fixtures reproduce through the stated tables. |
| artifact_complete | 5 | Named artifact (evidence rung → type → keep/trim/subtract/leap ledger → dominant risk → think:build:test ratio → entry point + first artefact) is fully specified by template.md; sample.md fills every field with the fellow's own numbers, tagged and cited. |
| proprietary_edge | 5 | Evidence-ladder grading that rounds down over-claims, type → dominant-risk → ratio derivation, and build-as-a-cap-not-target could not come from a generic prompt. "Why a generic prompt would miss this" makes the edge explicit. |
| challenge | 5 | C→B down-grade machinery, "claimed vs graded" line, refusal to hand a skip list for unearned stages, per-SUBTRACT tripwires (kill criteria), named next-gate evidence (what would change the view), and the honest venture-or-feature flag. |
| evidence_standard | 5 | Explicit money 1.0 → behaviour 0.7 → artefact 0.5 → commitment 0.3 → opinion 0.1 ladder; [Fact]/[Assumption]/[Hypothesis] tagging; default-to-lower type when evidence is missing; usage flagged self-reported until logged. |

**Auto-fail check:** none triggered. No fabricated number/quote/citation (invention forbidden throughout; sample cites only the fellow's own figures); down-grades rather than flatters; boundaries held (no sibling poached); output is type-differentiated, not PM boilerplate.

**Kill line:** NOT hit. Ledgers AND ratios differ materially by type (A 6:1:3 front-funnel KEEP / build GATED · B 4:2:4 LEAP to 03+06, build cap 2 · C 2:4:4 LEAP to 08); every ratio is justified by that type's named dominant risk — no bare numbers.

**Verify checklist:** classifies Type A/B/C on the evidence gate ✓ · returns a keep/trim/subtract/leap ledger tied to the type's dominant risk ✓ · does not poach concept-council / so-what-stress-test (idea teardown) ✓ · does not poach fellow-level-ladder (person's skill level — explicitly held orthogonal) ✓ · does not poach platform-vs-venture (build-vs-buy line) ✓.

**Judge note (protocol):** `JUDGE_PROTOCOL.md` was not present on disk or in the scratchpad, so this run was scored against `tests/rubric.json` + the RESULTS.md gate structure + the task's kill-line/verify criteria. Gate labelling and this block's format are the judge's reconstruction, not a transcribed protocol Output section.

**Improvement nit (non-scoring):** the ledger's fourth verb, LEAP, is defined in Step 3 / template but never populates a ledger cell — the "start here" jump is realised only via Step 6's entry point — while the Type A ledger uses `GATED` and `not yet`, which sit outside the four named verbs (though golden 01 blesses both). Tighten by either seating LEAP on the entry-row of the ledger or adding GATED/not-yet to the verb key. Cosmetic; does not affect routing correctness.

## Refine run 2 — applied judge fixes: added GATED and not-yet to the Step 3 verb key so every Type A ledger cell uses a defined term.
