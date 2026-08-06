# Eval log — null-hypothesis-test

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "What has to be true for this to work?"
2. "How would I disprove this before we build?"
3. "What's the riskiest assumption here?"
4. "What could kill this — which belief do I test first?"
5. "Which of my assumptions should I test before building?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Is this problem good enough to build? Give me a go/no-go." → belongs to `problem-quality-scorecard` (the 8-dimension /40 build gate, not belief falsification)
2. "Size this market bottom-up — build me the number." → belongs to `bottoms-up-quantification` (magnitude from verifiable units)
3. "Map how this workflow is done today and what each step costs." → belongs to `current-state-map` (priced current-state workflow)

(Near-miss to watch: "Imagine it failed and tell me the story" → `pre-mortem`. That
narrates failure modes as prose; this skill designs the single cheapest observation
that disproves a named belief and ranks it by P(wrong) x impact.)

## Skill-specific kill line (judge enforces)

Auto-fail this skill if the output:
- proposes a confirmation test (a test that can only return support, scores "they
  said yes", or carries no pre-committed failure result) as the disproof for any
  belief, OR
- ranks beliefs without computing P(wrong) x impact, or omits the pre-committed kill
  signal on the tested beliefs, OR
- writes a null for a chosen feature/solution instead of reframing it to a claim
  about the world first.

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire phrasings appear near-verbatim in the description's "Fires on" list; all 3 must-not-fire excluded by explicit "NOT ... (sibling)" clauses naming problem-quality-scorecard / bottoms-up-quantification / current-state-map. |
| 2 Golden | PASS (5/5) | Per-case totals below. |
| 3 Adversarial | PASS (3/3) | 01 declines to fabricate from a sector name, asks the one unblocking claim, routes to problem-statement/problem-quality-scorecard, invents nothing. 02 names the solution-in-disguise trap, reframes "need a mobile app" to a world-claim, gives a behavioural disproof (not "would you use an app?"). 03 declines the go/no-go, names problem-quality-scorecard, offers the handoff, emits no /40. No fabrication, flattery, or scope-poaching. |
| 4 Head-to-head | n/a | frontmatter `supersedes: none` (Related-skills "takes the bones of" identify-assumptions-* but does not claim supersession; that skill is already superseded by problem-quality-scorecard). |
| 5 Anti-generic | PASS | Golden-01 output could NOT come from a generic PM prompt: it depends on the null-inversion, the P(wrong)xImpact rank with the Impact-5 floor, the confirmation-test kill line + disproof twins, and the money>behaviour>artefact>verbal>opinion ladder with a pre-committed kill signal per row. A generic prompt lists assumptions and "suggests a test" (usually a confirmation test) with no floor, no rank, no kill signal. Guidance that should be tabular is tabular (score bands, twins, template). |
| 6 Real-use | pending | requires 5+ real fellow uses. |

### Golden per-case scores (rubric: /25, pass = total >= 21 AND no dim < 4)

| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Pass |
|---|---|---|---|---|---|---|---|
| 01 Barrier Intelligence | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 02 Mentix copilot | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 03 Azraq | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 04 Durian Labs | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 05 Mentix internal (mundane) | 4 | 5 | 5 | 5 | 5 | 24 | Y |

Kill-line check (skill-specific): every tested row across all 5 cases writes the null, the single cheapest disproof, a pre-committed kill signal, and a P(wrong)xImpact rank; confirmation tests are caught and rewritten into disproof twins; no null is written for a raw feature (adversarial-02 forces the reframe). Kill line NOT tripped.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **Equal-Impact tie has no written tie-break.** In Golden 01 and 02 two Impact-4 beliefs both land at P4xI4 = 16 (e.g. predictive-lift vs act-on-it). Step 5's tie-break rule only says "ties break toward the higher Impact" — which does not resolve an equal-Impact tie. The correct resolution used here (order descending, then shoot at the cheaper / more foundational test first — lift's historical backtest gates the live-shift concierge) is defensible but not stated. Add: "equal-Impact ties break toward the cheaper / more foundational test."
- **Park band vs a near-free pre-rollout test (Golden 05).** The park action reads "Note it; do not spend a test yet," yet the mundane internal-form belief (Rank ~6-8, at/near the park line) still warrants the smallest honest test because the test is near-zero cost and rollout is imminent. Method should note: below the park line, a near-zero-cost test on an imminent change is still allowed; parking means "don't spend a *costly* test," not "never observe."
- **Evidence ladder is inline prose.** The money 1.0 > behaviour 0.7 > artefact 0.5 > verbal 0.3 > opinion 0.1 ladder is written as a sentence in ## Evidence standard; a 5-row table would make the rung weights scannable and match the rest of the skill's tabular style. Minor.

## Refine run 2 — applied judge fixes: Step 5 gains an equal-Impact tie-break (higher P(wrong), then cheaper disproof); park band (Step 5 + template Test order) now allows a ~zero-cost disproof — parking bars a costly test, not observation; the evidence ladder in ## Evidence standard is now a 5-row table.
