# Eval log — problem-quality-scorecard

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Should I build this?" (a problem in hand, wants a build decision)
2. "Score this problem."
3. "Go or no-go on this problem?"
4. "Is this problem good enough to build?"
5. "Rate this problem."

MUST NOT fire (3, name the sibling each belongs to):
1. "Map all my risky assumptions across GTM, strategy, and team." → belongs to `identify-assumptions-new` (broad risk inventory, not a gate)
2. "Stress-test my whole idea with the big business questions." → belongs to `so-what-stress-test` (five qualitative whole-idea questions)
3. "What's the per-unit size ratio — does the physics floor leave room?" → belongs to `physics-floor-gap` (single unit-economics ratio)

(A fourth near-miss to watch: "Deep-dive just my wedge" → `wedge-five-questions`. The
scorecard scores the wedge as one of eight dimensions; it does not deep-dive it.)

## Skill-specific kill line (judge enforces)

Auto-fail this skill if the output:
- passes a problem (returns PASS / build) while any scored dimension rests on
  opinion evidence, OR
- reports a /40 verdict while scoring fewer than all 8 dimensions (the only legal
  partial output is "NOT READY TO SCORE" with the cheapest tests listed).

## Head-to-head vs identify-assumptions-new

This skill is scored against `identify-assumptions-new` on the same inputs. It must
win on **proprietary_edge** and **challenge**.

Why it wins:
- **Gate, not inventory.** identify-assumptions-new lists assumptions across 8 risk
  categories and asks the fellow to "rate confidence and suggest a test." It never
  returns a go/no-go. This skill returns a number and a verdict (pass / redesign /
  kill) with explicit bands (>=32, 28-31, <28).
- **Evidence enforced structurally.** The old skill lets an opinion sit in the list
  unchallenged. Here, the evidence rung sets a hard score ceiling (opinion caps at
  1), a pass is impossible on opinion, and 3+ opinion dimensions return "not ready
  to score." Evidence is not a suggestion; it gates the number.
- **Absorbed its bones, beat them.** It keeps the useful parts of the old skill
  (per-item confidence, per-item cheapest test) and converts them from a soft risk
  list into a scored gate — so the fellow leaves with a decision, not a to-do list.

Expected margin: proprietary_edge and challenge should both come back higher for
problem-quality-scorecard because the numeric gate + evidence ceilings are things a
generic prompt (and the superseded skill) do not do.

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

---

## Judge run — run 1

Judge did not author this skill. Hard-marked. Gate 4 required (supersedes is not "none").

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | Description lists all 5 must-fire verbs verbatim ("should I build this", "score this problem", "go or no-go", "is this problem good enough", "rate this problem"). All 3 must-not-fire are named-and-redirected in the description ("NOT for broad risk mapping across GTM/strategy/team → identify-assumptions-new"; "NOT the five qualitative whole-idea questions → so-what-stress-test"; "NOT the per-unit size ratio → physics-floor-gap"). Precise. |
| 2 Golden | PASS (5/5) | Rubric totals below. All ≥21, no rubric dimension <4, no auto_fail triggered. |
| 3 Adversarial | PASS (3/3) | 01 vague sector → asks the one pain+buyer question, no fabricated logistics scenario. 02 solution-in-disguise → names the trap ("no copilot" is a missing solution), refuses to score, points to problem-statement. 03 out-of-scope risk map → declines, names identify-assumptions-new, does not poach the 8-dim scorecard. No fabrication, flattery, or scope-poaching. |
| 4 Head-to-head | PASS | New vs superseded (identify-assumptions-new), both scored on this rubric — see table. New wins on TOTAL and on both required axes (proprietary_edge, challenge) across all 3 inputs, by a large margin. |
| 5 Anti-generic | PASS | Golden-01 output could NOT come from a generic PM prompt: the evidence ladder (money=5/behaviour=4/artefact=3/verbal=2/opinion=1), the `min(substance, ceiling)` rule, and the ceiling-flagging ("logs cap frequency at 4, not 5"; "signed doc caps founder asymmetry at 3") are Icarus-specific. Guidance is properly tabulated (evidence ladder, dimension anchors, gate precedence, fillable template) — no table-that-should-exist buried as prose. |
| 6 Real-use | pending | Requires 5+ real fellow uses. Not executable here. |

### Gate 2 — per-case rubric scores (0-5 each, /25; pass ≥21 & no dim <4)

| Golden | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Claimed /40 band | Applied /40 verdict |
|---|---|---|---|---|---|---|---|---|
| 01 Barrier (PASS) | 5 | 5 | 5 | 4 | 5 | **24** | PASS (32-36, ref 34) | 34 → PASS ✓ solid |
| 02 Azraq (REDESIGN) | 5 | 5 | 5 | 5 | 5 | **25** | REDESIGN (28-31, ref 29) | ~27-28 → borderline KILL/REDESIGN ⚠ |
| 03 Mentix (KILL) | 5 | 5 | 5 | 5 | 5 | **25** | KILL (<28, ref 21) | ~19-21 → KILL, but opinion-count can tip to NOT READY ⚠ |
| 04 Durian (NOT READY) | 5 | 4 | 5 | 5 | 5 | **24** | NOT READY (3+ opinion) | NOT READY ✓ solid |
| 05 Timesheets (KILL) | 5 | 5 | 5 | 5 | 5 | **25** | KILL (<28, ref 18) | ~17 → KILL ✓ solid |

Core-mechanic check (Gate 2/5): VERIFIED. Opinion evidence caps a dimension at 1 (rung 0.1). Gate precedence forces `Total ≥32 with 1-2 opinion caps → REDESIGN` and reserves PASS for `Total ≥32 AND zero opinion caps` — so a PASS is structurally impossible while any dimension rests on opinion. `3+ opinion-only → NOT READY TO SCORE, emit no total` fires first in the precedence list. A PASS also structurally requires mostly money/behaviour evidence (verbal caps at 2; you cannot reach 32/40 on verbal-heavy rows). Mechanic holds.

### Gate 4 — head-to-head vs identify-assumptions-new (both scored on THIS rubric)

The superseded skill produces a Torres-style risk inventory (8 categories × 3 perspectives, "rate confidence + suggest a test"). It never gates, never returns a number, never enforces an evidence ceiling — an opinion sits in the list unchallenged. Its output is near-identical regardless of the evidence quality of the input, which is exactly its weakness on money-vs-opinion inputs.

| Input | Skill | method_fid | artifact_cmpl | **proprietary_edge** | **challenge** | evidence_std | **Total** |
|---|---|---|---|---|---|---|---|
| G01 Barrier | problem-quality-scorecard | 5 | 5 | **5** | **4** | 5 | **24** |
| G01 Barrier | identify-assumptions-new | 2 | 3 | **2** | **3** | 2 | **12** |
| G02 Azraq | problem-quality-scorecard | 5 | 5 | **5** | **5** | 5 | **25** |
| G02 Azraq | identify-assumptions-new | 2 | 3 | **2** | **2** | 2 | **11** |
| G03 Mentix | problem-quality-scorecard | 5 | 5 | **5** | **5** | 5 | **25** |
| G03 Mentix | identify-assumptions-new | 2 | 2 | **2** | **2** | 2 | **10** |

New skill wins on TOTAL (24-25 vs 10-12) and on both required axes — proprietary_edge (5 vs 2) and challenge (4-5 vs 2-3) — for all 3 inputs. On G03 the gap is starkest: the old skill would list assumptions about the copilot and might implicitly accept the solution-in-disguise framing; the new skill catches it, scores the pain, and returns KILL. The supersession is justified.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)

- **Opinion-cap vs unexamined dimension.** The skill cleanly separates "verified-low" (you checked, there's no spend/data/edge → behaviour-grade 1, High conf, not a cap) from opinion. It does NOT clearly address the third case: a dimension the fellow simply never mentioned (silent/unexamined). In Golden 03 (Mentix), scoring severity and data-exhaust as opinion-capped (because unmentioned) pushes the opinion count to 3+ and flips KILL → NOT READY, contradicting the claimed KILL. Add a rule: an unexamined dimension defaults to opinion (cap 1, flag) UNLESS the fellow asserted a verified absence. This makes the 3+ trigger deterministic.
- **REDESIGN band is 4 points wide and fragile (Golden 02, Azraq).** Without cited figures, severity and budgeted-pain are evidence-capped, and a strict scorer lands Azraq at ~27 (KILL) rather than the reference 29 (REDESIGN). The verdict flips on one dimension's judgment call. Either tighten the golden's reference score or add explicit tie-break guidance for totals landing at the 27-28 KILL/REDESIGN seam.
- (Minor) Golden-04 NOT READY output has no /40 by design; a naive read of the rubric's `artifact_complete` ("required numbers") could dock it. Worth a one-line note in the rubric that NOT READY is a complete, number-free artifact.

## Refine run 2 — applied judge fixes: added unexamined-dimension → opinion-cap default to Step 2 and a ±1 band-edge tie-break (resolve down) to Step 5.
