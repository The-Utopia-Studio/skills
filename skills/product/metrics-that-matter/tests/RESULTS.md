# Eval log — metrics-that-matter

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "What metrics should we track for the handover drafter now it's live?"
2. "What should our North Star be?"
3. "Is our retention any good — does our cohort curve actually flatten?"
4. "Our MAU is up-and-to-the-right. Is that real or is it vanity?"
5. "What's our cost per outcome, and which numbers actually matter post-launch?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Design the after-launch loop — how we ship, observe, and promote autonomy by eval." → belongs to `refine-flywheel`
2. "Turn our production traces / usage logs into discovery interviews." → belongs to `trace-to-interview`
3. "Build the cohort retention dashboard — write the SQL and set the alert thresholds." → belongs to `retention-dashboard` (M9)

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | see block below | judged by separate judge agent |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | **PASS** (5/5 fire, 0/3 misfire) | Description lists all 5 must-fire phrasings near-verbatim ("what metrics should we track", "what should our North Star be", "is our retention any good / does the curve flatten", MAU-vanity, "what's our cost per outcome"). All 3 must-not-fire are carved out by name in the `Do NOT fire` clause → refine-flywheel / trace-to-interview / retention-dashboard+cohort-analysis. Clean negative scope. |
| 2 Golden | **PASS** (5/5) | Per-case totals below. All ≥ 24/25, no dimension < 4, no auto_fail triggered. |
| 3 Adversarial | **PASS** (3/3) | 01 vague one-liner → skill's `When NOT` clause asks the exact one question ("what single outcome does this product deliver?"), invents nothing. 02 MAU-as-NS → names the up-and-to-the-right lie, refuses to adopt/track, reframes to received outcome, demands flattening gate. 03 out-of-scope loop → `When NOT` table row 1 declines and names `refine-flywheel` with the one-line boundary. No fabrication, flattery, or scope-poaching. |
| 4 Head-to-head | **n/a** | `supersedes: none`. |
| 5 Anti-generic | **PASS** | Golden-01 output could NOT come from a generic PM prompt: the flattening-retention *gate* (shape law: ≤~1pt tail slope = flat/VALID, ≥~2pt = INVALID, PROVISIONAL until passed), cost-per-outcome to the cent with AI-specific margin-inversion-at-scale check, and the money/behaviour/opinion evidence ladder are all Icarus-specific spine, not decoration. Guidance is table/checklist-first in both SKILL.md and template.md — no depth written as prose that should be a table. Verified thin-wrapper: cohort mechanics → cohort-analysis, NSM framework → north-star-metric, CAC/LTV → financial-unit-economics, dashboard → retention-dashboard; all resolve to real M9 skills. |
| 6 Real-use | pending | Requires 5+ real fellow uses. |

### Golden per-case scores (rubric: /25, pass ≥21 AND no dim <4)

| Case | method | artifact | proprietary | challenge | evidence | Total | Verdict |
|---|---|---|---|---|---|---|---|
| 01 Durian (no cohort data given) | 5 | 4 | 5 | 5 | 5 | **24** | PASS |
| 02 Mentix MAU (never cut cohort) | 5 | 4 | 5 | 5 | 5 | **24** | PASS |
| 03 Barrier "alerts sent" | 5 | 4 | 5 | 5 | 5 | **24** | PASS |
| 04 Azraq (real curve 100/74/61/52/49/48) | 5 | 5 | 5 | 5 | 5 | **25** | PASS |
| 05 three-numbers-on-the-wall | 5 | 5 | 5 | 5 | 5 | **25** | PASS |

Notes on scoring: 01/02/03 lose one point on `artifact_complete` only because the fellow supplies no cohort curve (and often no token rate/price), so section C is correctly a conditional + "must be measured" and D carries `[Assumption]` lines rather than hard facts. That is the *correct* honest output (fabricating the plateau would be an auto_fail), not a defect — but it means the "priced to the cent / flattened plateau" headline is fully realized only when data exists (golden 04). Golden 04 is the cleanest run: the given curve reads as flatten (tail slope month4→5 = −1pt, within the ~1pt rule), plateau ~48%, NORTH STAR VALID; cost $6 vs $90 price → margin $84, ~7% cost ratio, all `[Fact]`. The kill line bites in every case: vanity-total headline (Durian's 40k, Mentix MAU, Barrier alerts-sent) is an automatic KILL, and no North Star passes without the flattening check.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)

- **The example tags a fabricated plateau as `[Fact]`.** `examples/sample.md` line 49 renders the invented illustrative curve's plateau as "~54–55% `[Fact]` on this cohort" and fills C with fixtures (78/66/58/55/54). The file is labeled "plausible, not real client data," but tagging a made-up fixture `[Fact]` models the exact behaviour the skill forbids (Evidence standard: "invent none the fellow did not give"; golden 01 Must-NOT: "invent a retention number the fellow did not have"). A fellow mirroring the sample on the same Durian scenario could present a fabricated plateau as a fact. Fix: re-tag every invented fixture in the sample `[Assumption]`/`[Hypothesis]`, or move the illustrative curve behind a louder "SCENARIO FIXTURE — not measured" banner. (Recorded only; judge does not edit the sample.)
- **"To the cent" over-promises on partial data.** In 3/5 goldens no token rate and/or price is given, so cost-per-outcome is necessarily an `[Assumption]`, not a to-the-cent `[Fact]`. The skill handles this honestly via the evidence tags, but the description headline ("cost-per-outcome priced to the cent") reads as a firmer guarantee than the input often supports. Consider softening to "priced to the cent when usage/price data exist; otherwise state the one measurement that resolves it."
- **`guardrail-design` routing is used in golden 03 but not named in SKILL.md.** Golden 03 expects the safety cost-of-a-missed-hazard to route to `guardrail-design` (which exists at `skills/sandbox/product-icarus/07-commit-build-v1/guardrail-design`). SKILL.md's routing table and Related-skills list omit it. The skill still keeps scope correctly (cost/value-per-outcome only), but adding a one-line route for the safety cost-of-error boundary would close the gap cleanly.

## Refine run 2 — applied judge fixes: re-tagged the example's plateau/retention figures as `[Assumption]`/illustrative (never `[Fact]`), softened Step 4's "to the cent" to require the token/compute rate and price first (else `[Assumption]`), and named `guardrail-design` in Related for the safety cost-of-error route.
