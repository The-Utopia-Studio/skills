# Eval log — concept-council

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "Here's my idea — an AI copilot for factory managers."
2. "Tear this apart."
3. "What am I missing?"
4. "What should I build first?"
5. "Rip this concept apart."
MUST NOT fire (3, name the sibling each belongs to):
1. "Run the five so-what questions on my concept." → belongs to `so-what-stress-test`
2. "Score my problem across the eight dimensions / give it a numeric quality score." → belongs to `problem-quality-scorecard`
3. "Write the PRD for this idea." → belongs to `prd-development` (lean variant `one-pager-prd`, or `create-prd`)

## Kill line (auto-fail, mirror of rubric)
- More than one "first thing to build."
- A probe that costs more than one week.
- A probe whose best possible result is an opinion (0.1).

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | Description names literal triggers ("here's my idea", "tear this apart", "rip this concept apart", "what am I missing", "what should I build first") → all 5 fire. Negative clause routes "five so-whats"→so-what-stress-test and "eight dimensions / numeric score"→problem-quality-scorecard; "write the PRD" shares none of the trigger phrases and reads as spec-writing, not first-contact teardown → 0 misfire. |
| 2 Golden | PASS (5/5) | Per-case table below. All totals ≥21, no dimension <4, no auto_fail. Each golden output yields exactly ONE probe, each ≤ 1 week — kill line holds across all five. |
| 3 Adversarial | PASS (3/3) | 01 vague one-liner: Step 1 fails (no user/job/change) → asks the single unblocking question, invents nothing, no Gap Map. 02 solution-in-disguise: "no mobile app" names no job → skill reframes to the underlying job and refuses to attack the feature (relies on applying agent to name the trap explicitly — see gotcha). 03 out-of-scope PRD: When-NOT table declines, names prd-development/one-pager-prd/create-prd, explains upstream boundary, offers teardown. No fabrication, flattery, or scope-poaching. |
| 4 Head-to-head | n/a | supersedes: none |
| 5 Anti-generic | PASS | Golden 01 could not come from a generic PM prompt: five lenses each forced to ONE attack, ranked by L×D (not a parallel bullet list), one load-bearing gap as a falsifiable sentence, one probe engineered to a 0.7 behaviour signal in 3 shifts for $0 with explicit pass/fail/kill. Evidence-ladder + single-probe compression are the proprietary edge. Guidance that should be tabular (lens panel, Gap Map, First-Probe Brief) is tabular. |
| 6 Real-use | pending | Requires 5+ real fellow uses. |

### Gate 2 per-case scores (0–5 each; pass = total ≥21 and no dim <4)

| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Pass |
|---|---|---|---|---|---|---|---|
| 01 Mentix | 5 | 5 | 5 | 5 | 5 | 25 | ✅ |
| 02 Azraq (DC risk) | 5 | 5 | 5 | 5 | 4 | 24 | ✅ |
| 03 Barrier (gas safety) | 5 | 5 | 5 | 5 | 4 | 24 | ✅ |
| 04 Durian (compliance report) | 5 | 5 | 5 | 5 | 5 | 25 | ✅ |
| 05 Slack bot (mundane) | 5 | 5 | 5 | 5 | 5 | 25 | ✅ |

Notes on the two 24s: both cases surface a real friction (see gotchas) between the skill's "probe must reach behaviour 0.7 / money 1.0" bar and the correct probe for the case. In 02 the right probe is a data-release (behaviour 0.7 when the operator actually hands over logs, but tempting to settle for a 0.3–0.5 LOI); in 03 the right probe is an authoritative HSE ruling (dispositive fact, but not a demand-behaviour and not explicitly ranked by the ladder). A faithful run still lands a single ≤1-week probe that clears the "not opinion (0.1)" bar in both, so each case passes — but the ladder's demand-shape costs a point on evidence_standard.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **The evidence ladder is demand-shaped and doesn't cleanly rank non-demand probes.** Golden 02 (secure/observe a data feed) and Golden 03 (get an authoritative regulatory ruling) both need probes whose best result is a commitment/artefact/legal-fact, not a 0.7 demand-behaviour or 1.0 payment. Step 5's rule "moves the claim up to behaviour (0.7) or money (1.0)" and the Evidence-standard line "the probe would produce a signal of at least 0.7 within a week" can be read to reject the correct probe. Recommend one sentence licensing dispositive fact-establishing probes (a legal/data-access determination that can outright kill the idea counts as high-value evidence, not opinion) so the Regulator/Engineer lens can win without tripping the ladder.
- **Solution-in-disguise reframe (adversarial 02) is only implicit.** Step 1 catches "names no user, no job, or no change → ask one question", which routes "we don't have a mobile app" to a clarifying question, but the SKILL.md never names the solution-smuggling trap explicitly. The pass depends on the applying agent adding "this is a solution stated as a problem." Recommend a one-line note in Step 1 or Gotchas: a stated solution ("we lack feature X") names no job — reframe to the job before attacking, do not attack the missing feature.

### Kill-line check (explicit)
- Exactly one "first thing to build" in every golden output: ✅ (Mentix 3-shift concierge; Azraq single data-release+back-test; Barrier single HSE confirmation; Durian single paid concierge report; Slack bot single manual @-mention week).
- Every probe ≤ 1 week: ✅ (all bounded to days / one week).
- No probe whose best result is an opinion (0.1): ✅ (all reach behaviour, money, data-release, or dispositive fact).

## Refine run 2 — applied judge fixes: licensed dispositive fact-establishing probes in Step 5 and added an explicit solution-in-disguise Gotcha.
