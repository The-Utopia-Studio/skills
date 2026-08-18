# Eval log — value-based-pricing

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "How should we price this?"
2. "What do we charge, and on what?"
3. "Should we price per seat or per outcome?"
4. "Set the price for the pilot conversion."
5. "Are we charging on the right thing / the right metric?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Brainstorm 3–5 revenue models and test which one to bet on" → belongs to `monetization-strategy`
2. "Structure the whole pilot deal — scope, data-rights, success metrics, kill criteria, conversion" → belongs to `pilot-six-term-sheet`
3. "How is this done today / what does the status quo cost us" → belongs to `current-state-map`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

Judge did NOT author this skill. Gates run by applying the Method to each input and scoring the produced artifact.

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire phrasings are literal or near-literal matches to the `Fires on` list ("how should we price this", "what do we charge", "per seat or per outcome", "set the price"); #5 (right metric) covered by the charging-metric thesis. All 3 must-not are explicitly excluded in the description with the sibling named (monetization-strategy, pilot-six-term-sheet, current-state-map). |
| 2 Golden | PASS (5/5) | see per-case table below |
| 3 Adversarial | PASS (3/3) | 01 vague → asks the ONE question (what is one outcome worth + how known), invents nothing. 02 tiers-in-disguise → refuses, names tier as a LEVEL not a value, reframes to outcome/metric, emits no tier numbers. 03 structure-the-deal → declines, names `pilot-six-term-sheet`, draws the term-2/term-6 boundary, does not draft the other five terms. |
| 4 Head-to-head | n/a | `supersedes: none` |
| 5 Anti-generic | PASS | Golden-01 output could not come from a generic PM prompt: evidence ladder (money 1.0 / behaviour 0.7 / opinion 0.1), refusal to price a WTP survey, "price the metric not the level," delta-over-status-quo ($125k not gross $220k), "wrong on the axis both directions," improvement-proof column tied to the flywheel. Reframe is load-bearing, not decoration. Guidance is properly tabular (ladder, metric-scoring, band-position, template) — no table-as-prose. |
| 6 Real-use | pending | requires 5+ real fellow uses; not executable here |

### Gate 2 — per-case scores (method / artifact / edge / challenge / evidence → total /25; pass ≥21 & no dim <4)

| Case | method | artifact | edge | challenge | evidence | Total | Verdict |
|---|---|---|---|---|---|---|---|
| 01 Azraq (seed) | 5 | 5 | 5 | 5 | 5 | 25 | PASS — rejects per-seat draft on 3 grounds; $220k paid penalty @1.0; delta $125k not gross; per-facility metric; 16% → $20k/facility/yr; retained 6.25×. Matches examples/sample.md. No auto-fail. |
| 02 Mentix | 5 | 4 | 5 | 5 | 5 | 24 | PASS — $8k @ behaviour 0.7 (path to 1.0 named); delta 0.85−0.20=0.65; per-avoided-stop dropped for contested attribution → per-line asset; floor $3.55 non-binding; capture in band; retained in band. Artifact 4: final per-line $ needs an unstated stop-frequency per line-period, so the number is parametric/flagged rather than hard. |
| 03 Barrier (priceless) | 5 | 5 | 5 | 5 | 5 | 25 | PASS — refuses to take a % of a life; re-anchors on bounded money-backed proxies ($1.2M fine, $300k/day, $180k/yr premium delta); prices % of proxy; per-site/per-permit metric; names safety = diligence floor not capture lever. No auto-fail. |
| 04 Durian (mundane) | 5 | 4 | 5 | 5 | 5 | 24 | PASS — rejects "$50, mark up costs" as banned cost-plus by name; runs full method at small stakes; $120 @[Assumption] on a 0.7 concierge recall lift; per-store asset (per-seat rejected as planner-count irrelevant); capture 10–20% lands well above $50. Artifact 4: hard per-store $ needs the digest's measured recall (a placeholder in the input) → parametric/flagged. |
| 05 Refusal | 5 | 5 | 5 | 5 | 5 | 25 | PASS — correctly STOPS: WTP survey 0.1 + competitor list 0.1, neither clears 0.7; names all three violations (no measured value, per-seat = level, competitor-anchored = banned); routes to current-state-map / concierge; fabricates no number. The refusal IS the correct artifact here. |

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas / template.md)

- **Missing conversion factor between the outcome unit and a per-asset metric.** When Part 2 measures `incremental_value_per_outcome` but Part 4 charges on a per-asset/per-period metric (per-line-month, per-store-week), Part 5 silently needs the *outcome frequency per asset-period* to convert value into a price. The template has no slot for it. The Azraq example hides this because base rate ≈ 1 breach/facility/yr (per-outcome ≈ per-facility-year). Mentix (many shifts) and Durian (~30 stockouts/store/month) cannot produce a hard invoice line without it. Recommend adding an explicit "outcome frequency per asset-period [Fact/Assumption]" line to Part 4/5 so the per-asset price is derived, not eyeballed.
- **Routing targets not yet in the pack.** The skill routes to `current-state-map`, `eval-first-spec`, `monetization-strategy`, `pilot-six-term-sheet`, `data-rights-clause` — none of these currently exist under `product-icarus/` (only `refine-flywheel` does). Routing logic is correct, but a fellow following the routes today hits dangling references. Not a skill defect; a pack-sequencing note for the orchestrator.
- **Premium-reduction proxy ladder score (golden 03).** A written insurance-premium *reduction* is a forward commitment, not a paid loss — cleanest scored 0.7–1.0 but should be tagged as a quoted commitment, not conflated with a 1.0 already-paid loss. Worth a one-line clarification in the "priceless outcome" gotcha.

## Refine run 2 — applied judge fixes: added a Part 5 outcome-frequency-per-asset-period conversion slot so a per-asset/period price is derived from the per-outcome value, not eyeballed.
