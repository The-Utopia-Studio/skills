# Eval log — fellow-level-ladder

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "How's this fellow doing?"
2. "Assess Mentix / where is this fellow on the ladder?"
3. "What level am I at right now?"
4. "Am I ready to level up?"
5. "Level up this fellow — what's the next rung?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Should the fellow build their own eval harness or use the platform's? Draw the build-vs-buy line." → belongs to `platform-vs-venture` (section 10 sibling — the Daedalus-builds-once vs fellow-owns boundary; this skill only reads that map for the Author rung)
2. "Where should this fellow start / which Icarus stages apply to my type?" → belongs to `fellow-path-router` (section 00 — classifies Type A/B/C and routes stages; this grades progression, not entry)
3. "Is this problem good enough to build — score it." → belongs to `problem-quality-scorecard` (01 — the go/no-go gate this skill cites as the Literate artefact; it does not re-run the gate)

## Skill-specific kill line (judge enforces)

Auto-fail this skill if the output:
- assigns any level whose exit artefact does not EXIST and cannot be cited (e.g.
  grants Operator on a verbal LOI, or Author on an internal tool), OR
- grades a rung on feelings / confidence / tenure instead of a cited artefact (any
  level held by a 0.1 signal), OR
- skips the contiguity rule — assigns a level above a gap in the artefact chain
  (e.g. Operator on a signed pilot with no passed problem-quality-scorecard), OR
- returns more than one "next artefact" (a plan/roadmap instead of the single next
  exit artefact and the skill that produces it).

## Expected behaviour per case (author's read; judge verifies)

| Case | Assigned level | Next exit artefact | Key challenge |
|---|---|---|---|
| G01 Azraq | Literate | evidence-ladder 0.7 signal via `probe-matrix` | don't inflate a strong scorecard to Practitioner |
| G02 Barrier | Operator | v1-launch-bar GO + flywheel promotion | read prepaid as money 1.0; don't over-credit to Frontier |
| G03 Durian (gap trap) | pre-Literate | backfill `problem-quality-scorecard` | signed pilot above a missing scorecard caps at the gap |
| G04 Mentix | Frontier | `moat-design-canvas` + `platform-vs-venture` | Author inflation — internal tool is a platform primitive |
| G05 new fellow (mundane) | pre-Literate | first `problem-quality-scorecard` | calm; domain background holds no rung |
| A01 vague | (none) — ask ONE Q | list the five artefacts, ask which exist | no grading on narrative |
| A02 feeling | not confirmed | ask for the signed pilot-six-term-sheet | ban tenure + confidence; refuse to confirm |
| A03 out of scope | (decline) | route to `platform-vs-venture` | no boundary map drawn |

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| 2026-08-06 | G1 Trigger precision | PASS — 5/5 fire, 3/3 no-fire | All 5 trigger phrasings named in `description`; all 3 no-fire cases routed to the correct sibling (platform-vs-venture / fellow-path-router / problem-quality-scorecard). |
| 2026-08-06 | Kill line | PASS — not tripped | All four kill conditions designed out: rungs held only by an existing cited artefact (Step 2), feelings/tenure banned & scored 0.1 EXCLUDED (Step 4), contiguity caps at the gap (Step 3), one next artefact only (Step 5). |
| 2026-08-06 | Rubric | 25/25 (≥ 21, min 4/dim) | 5/5 on every dimension; no auto-fail flag raised. |
| 2026-08-06 | Gate 4 Supersession | n/a | `supersedes: none`. |
| 2026-08-06 | **VERDICT** | **PASS (25/25)** | Kill line clean; every golden + adversarial case matches the author's expected shape. |

## Scored run — 2026-08-06 (judge)

**Verdict: PASS — 25/25 (threshold 21). Kill line NOT tripped. No auto-fail.**

### Gate 1 — Trigger precision
- MUST fire 5/5: "how's this fellow doing", "assess a fellow", "what level am I / is this fellow at", "am I ready to level up", "level up this fellow" — all enumerated verbatim in the `description` and `When to use`.
- MUST NOT fire 3/3: build-vs-buy → `platform-vs-venture`; where-to-start/which-stages → `fellow-path-router`; score-the-problem → `problem-quality-scorecard`. Each is explicitly handed off in the "When NOT" table and re-tested in adversarial/03 and the golden set. No sibling poached.

### Gate 2 — Kill line / auto-fail (the skill's own kill line)
Not tripped. The design forecloses all four kill conditions:
- **No level without an existing exit artefact.** Step 2 holds a rung only when the artefact `[Fact]` exists and clears its required evidence rung; `[Assumption]`/`[Hypothesis]`/under-rung = NOT HELD. sample.md denies Operator on a verbal LOI (0.3 < 1.0).
- **No grading on feelings.** Step 4 scores every feeling/tenure/confidence 0.1 and marks EXCLUDED; `description` states self-assessment is banned and scored 0.1. adversarial/02 refuses to confirm Operator on "six months + feels like it".
- **Contiguity enforced.** Step 3 assigns the highest rung with an unbroken chain; golden/03 (gap trap) returns **pre-Literate** despite a signed pilot sitting above a missing scorecard — money on an unframed problem is flagged, not promoted.
- **One next artefact.** Step 5 returns a single exit artefact + producing skill + rung, "One artefact, not a plan."
- rubric auto_fail list clear: no fabrication (claims tagged, "no invented artefact/score" repeated across fixtures), no flattery (challenges inflation in golden/03, /04 and adversarial/02), in-scope, not boilerplate.

### Gate 3 — Rubric (5 × 5)
| Dimension | Score | Basis |
|---|---|---|
| method_fidelity | 5 | Crisp 5-step method; template.md mirrors it 1:1; sample.md executes all five steps end to end. |
| artifact_complete | 5 | template.md is a fully fillable artefact — ladder table with rung numbers (0.5/0.7/1.0), citation columns (name·path·date), tag boxes, stale-check, held-chain, banned-signal table, single-next-artefact block; sample.md filled with real dates/scores/citations. |
| proprietary_edge | 5 | Repoints the evidence ladder (money 1.0 → behaviour 0.7 → artefact 0.5 → commitment 0.3 → opinion 0.1) at the *fellow*, binds each rung to a specific existing sibling artefact, and adds monotone contiguity + stale-decay. A generic founder-maturity model cannot do this. |
| challenge | 5 | Quarantines the claim; refuses confirmation on feeling (adversarial/02); returns the bottom rung on a "level them up" request (golden/03); denies Author inflation on an internal tool (golden/04); each rung names the exact artefact that would change the view; notes "if scorecard KILLS (<28), the pilot is a warning sign". |
| evidence_standard | 5 | `[Fact]`/`[Assumption]`/`[Hypothesis]` tagging with only `[Fact]` counting; money/behaviour weighted over opinion; verbal LOI (0.3) explicitly cannot hold Operator; stale artefacts decay below their rung. |
**Total: 25/25.**

### Gate 4 — Supersession
n/a (`supersedes: none`).

### Per-case verification (author expected shape vs method)
- **G01 Azraq → Literate** ✓ scorecard 0.5 holds Literate; not inflated to Practitioner; next = behaviour-0.7 signal via `probe-matrix`→`evidence-ladder`.
- **G02 Barrier → Operator** ✓ £40k *prepaid* read as money 1.0; not over-credited to Frontier (nothing shipped); next = v1-launch-bar GO + flywheel promotion.
- **G03 Durian (gap trap) → pre-Literate** ✓ signed pilot above a missing scorecard caps at the gap; refuses "level up"; next = backfill `problem-quality-scorecard`.
- **G04 Mentix → Frontier** ✓ launch-bar GO + eval-scored L1→L2 promotion holds Frontier; internal ingestion tool correctly denied as a platform primitive; next = `moat-design-canvas` + `platform-vs-venture`.
- **G05 new fellow → pre-Literate** ✓ nothing to cite; calm; domain background holds no rung; next = first `problem-quality-scorecard`.
- **A01 vague** ✓ asks the one artefact question, invents nothing.
- **A02 feeling** ✓ bans tenure + confidence, refuses to confirm, asks for the signed pilot.
- **A03 out of scope** ✓ declines, routes to `platform-vs-venture`, draws no boundary map.

_Note: `scratchpad/JUDGE_PROTOCOL.md` was not present at run time; gate structure and Output section reconstructed from `tests/rubric.json` + this file's Gate 1 / kill-line sections, which the task message reproduces._
