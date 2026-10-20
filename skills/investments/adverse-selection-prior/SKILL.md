---
name: adverse-selection-prior
description: >-
  Produces a Bayesian prior that a deal or offer someone brought to you is actually good
  for you, given that the counterparty chose to propose it. Applies Akerlof market-for-lemons
  logic: if they offered it, they believe it is good for them, so the prior that it is good
  for you sits below 50%. Outputs a prior, a multiplicative haircut to apply to your own
  valuation or EV, a rationale and override hints. Use for unsolicited secondary-purchase
  offers for your stake, deals shared by other investors or brokers, allocations still open
  late in a round, counter-offers on terms, inbound M&A or acqui-hire approaches, and
  unsolicited job offers, or when the user asks "why did they offer this?", mentions adverse
  selection, the market for lemons, or a too-good-to-be-true offer.
  Not for sizing your own bid in a competitive auction (use auction-first-price-shading) or a
  general probability-weighted payoff calculation (use expected-value).
---
# Adverse Selection Prior

## Table of Contents
- [Example](#example)
- [Workflow](#workflow)
- [Common Patterns](#common-patterns)
- [Guardrails](#guardrails)
- [Quick Reference](#quick-reference)

## Example

**Scenario**: A later-stage fund emails us out of nowhere offering to buy our full 4% stake in Qubit Labs at a $60M post-money. Our own mark is $55M, so on the surface the offer looks slightly generous (+9% vs our mark). The fund is sophisticated, has board-observer seats at two Qubit competitors, and Qubit's last board update was six weeks ago.

**Inputs**:
- `offer_type`: `unsolicited_offer`
- `proposer_archetype`: `expert` (sophisticated, active secondaries buyer)
- `offer_symmetry_score`: 75 (looks fair-to-favourable for us on surface)
- `proposer_info_asymmetry`: 65 (they plausibly see competitor and market data we do not)

**Step 1 — Base prior**: unsolicited offer → **0.40**.
**Step 2 — Symmetry**: 75 > 70 → **+0.06** → 0.46.
**Step 3 — Asymmetry**: 65 (60-80 band) → **-0.12** → 0.34.
**Step 4 — Archetype**: `expert` → **-0.08** → **0.26** (inside the [0.10, 0.70] clip).
**Step 5 — Haircut**: 0.26 sits between 0.25 (0.75) and 0.30 (0.80) → interpolate `recommended_adjustment` = **0.76**. Our view of the offer's edge (+9% vs mark) becomes 1.09 x 0.76 = 0.83, i.e. treat the offer as roughly **17% below** fair value until we learn more.

**Output contract**:
```json
{
  "prior_ev_probability": 0.26,
  "recommended_adjustment": 0.76,
  "bayesian_rationale": "A sophisticated secondaries buyer chose this specific stake and price from everything it could have bid on; that selection is strong evidence the price is good for them. Surface generosity (+9% vs our mark) partly offsets, but their visibility into two competitors and a stale board update push the prior to 0.26.",
  "override_hints": [
    "If Qubit's next board update or a call with the CEO shows no new negative information, asymmetry falls to ~40; re-run (prior rises to ~0.33).",
    "If two other buyers quote within 5% of $60M, symmetry rises to 85+ and the offer is closer to market; re-run.",
    "If this buyer has bought from us before and those positions performed in line with their price, treat as repeated-game: base prior +0.05."
  ]
}
```

## Workflow

```
Adverse Selection Prior Progress:
- [ ] Step 1: Identify offer_type and set base prior
- [ ] Step 2: Classify the proposer archetype from behaviour
- [ ] Step 3: Score offer_symmetry (0-100) from our own valuation
- [ ] Step 4: Score proposer_info_asymmetry (0-100)
- [ ] Step 5: Apply adjustments to produce prior_ev_probability
- [ ] Step 6: Convert prior to recommended_adjustment (multiplicative haircut)
- [ ] Step 7: Write bayesian_rationale and override_hints
- [ ] Step 8: Validate against rubric
```

**Step 1: Offer type and base prior** — the tighter the counterparty's selection, the lower the prior. See [resources/template.md](resources/template.md#base-prior-by-offer-type).

| `offer_type` | Base prior | Venture example | Name in resources/ |
|---|---|---|---|
| `unsolicited_offer` | 0.40 | Someone offers to buy our stake, or sells us theirs, unprompted | `trade` |
| `deal_passed_along` | 0.42 | Another investor or broker shares a deal they are not doing themselves | `waiver_claim_dropped_by_other` |
| `open_allocation` | 0.48 | Allocation still available late in a round; may just be unnoticed | `free_agent_pickup_available` |
| `counter_offer` | 0.38 | They rejected our terms and crafted their own | `counter_offer` |
| `generic` | 0.40 | Context unknown | `generic` |

The resource files were written for fantasy-sports trades; the maths is identical, use the right-hand column to translate.

**Step 2: Archetype** (from behaviour, not self-description; see [resources/methodology.md](resources/methodology.md#archetype-adjustments))
- `expert` (-0.08): sophisticated fund, serial secondaries buyer, strategic acquirer with deep market data.
- `active` (-0.05): diligent investor who clearly analysed before offering.
- `dormant` (+0.08): disengaged seller (angel tidying up a portfolio, estate, fund at end of life selling a tail position without analysis).
- `frustrated` (0.0, flag): under pressure to sell (fund needing DPI, founder needing liquidity). Could be a genuine motivated seller (good for us) or cover for bad news (bad); needs a second signal.
- `unknown` (0.0).

**Step 3: Offer symmetry** — how fair the offer looks against our own valuation.
- 0-30: clearly lopsided in their favour. 30-70: asymmetric but plausible. 70-100: fair or favourable for us on the surface.
- `> 70` → +0.05 to +0.10 (higher above 85). `< 30` and not obviously predatory → flag "too good to be true" and investigate.

**Step 4: Information asymmetry** — do they plausibly know something we do not?
- Check recent signals: board-update timing, key hires or departures, competitor rounds, regulatory news, the proposer's other portfolio positions.
- 0-30 parity → 0. 30-60 minor gap → -0.03 to -0.05. 60-80 → -0.10 to -0.15. 80-100 → -0.15 to -0.20.

**Step 5: Combine** — base + symmetry + asymmetry + archetype, clipped to [0.10, 0.70]. Derivation: [resources/methodology.md](resources/methodology.md#bayesian-update-derivation).

**Step 6: Haircut** — >= 0.50 → 1.00; 0.45 → 0.95; 0.40 → 0.90; 0.35 → 0.85; 0.30 → 0.80; <= 0.25 → 0.75; interpolate linearly in between. Apply multiplicatively to your own valuation or EV ratio: `adjusted = own x recommended_adjustment`.

**Step 7: Rationale and overrides** — 2-4 sentences naming the base prior, the two largest adjustments and the conclusion; 2-5 hints of the form "If X, re-run with Y = Z", each moving the prior by at least 0.05.

**Step 8: Validate** with [resources/evaluators/rubric_adverse_selection_prior.json](resources/evaluators/rubric_adverse_selection_prior.json). Minimum average 3.5.

## Common Patterns

**Pattern 1: Disengaged seller offers us their stake (prior rises toward 0.50)**
- An angel or a fund at end of life offers a small position at a round-number price with no questions asked. `dormant` +0.08; if the price is near our mark, the prior can approach 0.50. Haircut ~0.95.

**Pattern 2: Sophisticated buyer bids for our stake (prior drops toward 0.25)**
- A crossover or secondaries fund, or a strategic, approaches us first. `expert` -0.08 plus elevated asymmetry. Haircut 0.75-0.85. Before accepting, get competing quotes and the company's latest numbers.

**Pattern 3: Motivated seller (mixed)**
- A fund needs DPI before a raise; a founder needs liquidity. Require two signals (public fundraise timeline, LP pressure, the price movement) before treating it as a genuine motivated sale (haircut can rise to 1.0-1.05). Otherwise 0.90.

**Pattern 4: A deal another investor is passing along**
- "We're full, want our allocation?" or a broker-shared deal. Ask why they are not doing it. Base 0.42; if the sharer knows the company well and passed, raise asymmetry.

**Pattern 5: Inbound acquisition or acqui-hire approach for a portco**
- The acquirer selected this target from many. Either the fit is real, or they see the company's weakness (runway, key-person risk) more clearly than we do. Base 0.40; adjust asymmetry for how much of the data room they have seen.

## Guardrails

1. **Base prior is below 0.50 for received offers.** A prior above 0.50 means a mis-specified archetype or ignored selection pressure.
2. **"Seems fair" means "probably bad".** A fair-looking offer is the worst case: they had many fair-looking options and picked the one best for them.
3. **Do not double-count.** Information you already priced in is not asymmetry; asymmetry is what they know and you do not.
4. **Clip to [0.10, 0.70].**
5. **Archetype from behaviour**, not self-description.
6. **Motivated-seller claims need two independent signals.**
7. **Repeated-game history moves the base prior by about ±0.05.**
8. **Override hints must be actionable and specific.**
9. **The haircut is multiplicative**, never additive.
10. **This produces a prior, not a verdict.** Accept / counter / reject belongs to the caller (e.g. `expected-value` or the IC).

## Quick Reference

| `prior_ev_probability` | `recommended_adjustment` |
|---|---|
| >= 0.50 | 1.00 |
| 0.45 | 0.95 |
| 0.40 | 0.90 |
| 0.35 | 0.85 |
| 0.30 | 0.80 |
| <= 0.25 | 0.75 (predatory suspicion; default to reject or renegotiate) |

**Inputs**: `offer_type` (enum above), `proposer_archetype` (expert | active | dormant | frustrated | unknown), `offer_symmetry_score` (0-100), `proposer_info_asymmetry` (0-100).

**Outputs**: `prior_ev_probability` (0.10-0.70), `recommended_adjustment` (0.75-1.00), `bayesian_rationale`, `override_hints`.

**Resources**
- [resources/template.md](resources/template.md) — decision tree, worked examples, output template (fantasy-sports framing; see the name mapping in Step 1)
- [resources/methodology.md](resources/methodology.md) — Akerlof derivation, Bayesian update maths, why "seems fair" means "probably bad", cross-domain examples including M&A and job offers
