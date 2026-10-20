---
name: auction-first-price-shading
description: >-
  Sizes a bid in a sealed-bid or competitive process in two steps: first a winner's-curse
  haircut on your valuation when the asset is worth roughly the same to every bidder
  (common value), then (N-1)/N first-price bid shading for the number of rivals, adjusted
  for value distribution, risk aversion and remaining budget or dry powder. Works for
  competitive funding rounds and allocation fights, secondary-share blocks sold by sealed
  bid, M&A sealed-bid rounds, procurement tenders and any blind-bid auction. Use when the
  user asks how much to bid, mentions a first-price or sealed-bid auction, bid shading,
  (N-1)/N, the winner's curse, common-value auctions, over-paying when winning, or a
  valuation haircut before bidding.
  Not for judging whether an unsolicited offer someone sent you is good (use
  adverse-selection-prior) or for a general probability-weighted payoff comparison
  (use expected-value).
---
# Auction Bid Sizing: Winner's-Curse Haircut + First-Price Shading

## Table of Contents
- [Example](#example)
- [Workflow](#workflow)
- [Common Patterns](#common-patterns)
- [Guardrails](#guardrails)
- [Quick Reference](#quick-reference)

Two independent corrections, applied in order:

1. **Winner's-curse haircut (Step 0)** — corrects your *valuation*. In a common-value auction, winning is evidence you were the most optimistic estimator, so shrink the estimate first.
2. **First-price shading (Steps 1-5)** — corrects your *bid*. Bidding your full value leaves zero surplus; shade it by `(N-1)/N` and adjust.

Apply both, never either twice.

## Example

**Scenario**: A sealed-bid secondary sale of a Series B block. Our raw valuation of the block is $1.8M. Four other funds are bidding off the same data room (common value). Estimates across funds are moderately dispersed (signal_dispersion = 40/100). We are mildly risk-averse (0.2) and the SPV has $1.5M of dry powder left.

**Step 0 — winner's-curse haircut** (common value, N = 5 bidders including us):
```
haircut_pct = min(35, 10 + ln(5) x 5 + 40 x 0.2) = min(35, 10 + 8.05 + 8) = 26.05
true_value  = 1.8M x (1 - 0.2605) = $1.331M
```

**Steps 1-4 — shade** (uniform values):
```
shade      = (N-1)/N = 4/5 = 0.80
shade'     = 0.80 + 0.2 x (1 - 0.80) x 0.4 = 0.816
raw bid    = 1.331M x 0.816 = $1.086M
```

**Step 5 — caps**: `min(1.086M, 0.9 x 1.331M = 1.198M, budget 1.5M)` = **$1.09M**.

**Output**:
- `adjusted_value = 1.331M`, `haircut_pct = 26.05`
- `shaded_bid = 1.09M`, `shade_fraction = 0.816`
- `rationale`: "Common-value block with 5 informed bidders: 26% winner's-curse haircut takes value from $1.8M to $1.33M. (N-1)/N shading at N=5 plus mild risk aversion gives 0.816 of adjusted value. No cap binds."
- `assumptions_flagged`: ["common_value classification", "N=5 is an estimate", "signal_dispersion=40 inferred from bid spreads in comparable secondaries", "uniform value distribution", "risk_aversion=0.2 is a modelling choice"]

**Contrast — private value**: if the block completes a position only we care about (e.g. it gives us a board seat we specifically need), classify `private_value`: haircut 0, shade the full $1.8M.

## Workflow

```
Auction Bid Sizing Progress:
- [ ] Step 0: Classify value type and apply the winner's-curse haircut
- [ ] Step 1: Validate inputs (true_value > 0, 1 <= N <= 12, distribution known)
- [ ] Step 2: Compute base shade from (N-1)/N
- [ ] Step 3: Apply distribution adjustment (uniform / log-normal / empirical)
- [ ] Step 4: Apply risk-aversion adjustment
- [ ] Step 5: Apply budget and safety caps
- [ ] Step 6: Emit outputs, rationale and flagged assumptions
```

**Step 0: Winner's-curse haircut**

Classify the target explicitly (decision tree and worked examples: [resources/winners-curse-template.md](resources/winners-curse-template.md); derivation and Kagel-Levin evidence: [resources/winners-curse-methodology.md](resources/winners-curse-methodology.md)):

- `common_value` — worth about the same to every bidder; information is shared (a hot round everyone has diligenced, a secondary block, a public-data M&A target). Haircut applies.
- `private_value` — worth meaningfully more to you for a structural reason (strategic fit, a follow-on right only you hold). Haircut = 0. Short-circuit.
- `mixed` — shared core value plus a private increment. State the common weight explicitly (default 0.6).

```
common:  haircut_pct = min(35, 10 + ln(N) x 5 + signal_dispersion x 0.2)
mixed:   haircut_pct = mix_common_weight x common_haircut
private: haircut_pct = 0
true_value = raw_valuation x (1 - haircut_pct / 100)
```

`signal_dispersion` (0-100) is a proxy: spread of bids in comparable processes, disagreement between valuations you have seen, or degree of information asymmetry. Document the basis.

**Step 1: Validate inputs** — see [resources/template.md](resources/template.md#input-contract).
- [ ] `true_value` (post-haircut) is non-negative
- [ ] `n_bidders_estimate` integer, clamp to `[1, 12]`
- [ ] `value_distribution` in `"uniform"`, `"log-normal"`, `"empirical"`
- [ ] `risk_aversion` in `[0, 1]` (default 0)
- [ ] `budget_remaining` non-negative (if missing, treat as unlimited and flag)

**Step 2: Base shade** — risk-neutral bidders with uniform private values bid `b(v) = v x (N-1)/N` in symmetric equilibrium ([derivation](resources/methodology.md#uniform-value-equilibrium-derivation)).
- [ ] `shade_fraction = (N - 1) / N`; `N = 1` → bid the minimum increment
- [ ] `shaded_bid = true_value x shade_fraction`

**Step 3: Distribution adjustment** ([details](resources/methodology.md#distribution-adjustment-log-normal-and-empirical))
- `uniform`: no change.
- `log-normal`: shade toward `1 - 1/(N x spread)`, `spread >= 1` (default 1.5) — tight clusters force bids near consensus.
- `empirical`: use a shade lookup from past processes if available, else the log-normal formula with spread inferred from history.

**Step 4: Risk aversion** ([details](resources/methodology.md#risk-aversion-adjustment)) — `shade' = shade + risk_aversion x (1 - shade) x 0.4`. The 0.4 factor never closes the gap to full value.

**Step 5: Caps** — `shaded_bid = min(raw_shaded_bid, 0.9 x true_value, budget_remaining)`. Flag whichever cap binds.

**Step 6: Emit** `adjusted_value`, `haircut_pct`, `shaded_bid`, `shade_fraction`, `rationale` (1-2 sentences naming both corrections), `assumptions_flagged`.

Validate with [resources/evaluators/rubric_auction_first_price_shading.json](resources/evaluators/rubric_auction_first_price_shading.json) and, for Step 0, [resources/evaluators/rubric_auction_winners_curse_haircut.json](resources/evaluators/rubric_auction_winners_curse_haircut.json). Minimum average 3.5.

## Common Patterns

**Pattern 1: Hot competitive round, many informed funds (common value)**
- N = 5-8, dispersion 30-60 → haircut ~22-32%, then shade 0.80-0.875.
- Typical failure: bidding the "headline" valuation everyone heard; that is exactly the winner's curse.

**Pattern 2: Strategic / private-value target**
- Only you get the synergy (follow-on right, portfolio fit, distribution partner). Haircut 0; shade only.
- Watch for: if two other bidders have the same synergy, it is closer to common value.

**Pattern 3: Thin field (N = 2)**
- Haircut still ~14-18% for common value; shade to 0.50. Low N does not mean no winner's curse.

**Pattern 4: Must-win (risk-averse bidder)**
- You need the allocation (e.g. pro-rata defence, a deal that anchors a fund thesis). risk_aversion 0.5-1.0 raises the shade, but the 0.9 x value cap still holds.

**Pattern 5: Dry-powder constrained**
- Unconstrained bid exceeds remaining budget: output equals budget, effective shade = budget / true_value. Flag it; the caller may prefer to pass.

## Guardrails

1. **Classification is explicit.** Never infer `value_type` silently; a missing classification is an error.
2. **Private value short-circuits the haircut**, even at large N.
3. **Apply each correction once.** Haircut corrects valuation, shading corrects strategy; never stack another winner's-curse discount on top.
4. **Haircut cap is 35%** (Kagel-Levin range 15-30% plus headroom).
5. **`(N-1)/N` assumes symmetric bidders.** If a rival systematically overbids, flag it.
6. **N is an estimate.** Mistaking N=2 for N=6 moves the bid from 50% to 83% of value; always flag it. Clamp N to `[1, 12]`.
7. **Never bid above `0.9 x true_value` or above budget.**
8. **Domain-neutral contract.** Translate the deal into the generic inputs; the skill returns generic outputs.

## Quick Reference

```
Step 0 (common value):  haircut_pct = min(35, 10 + ln(N) x 5 + dispersion x 0.2)
                        true_value  = raw_valuation x (1 - haircut_pct/100)
Shade (uniform):        shade = (N-1)/N
Shade (clustered):      shade = 1 - 1/(N x spread), spread default 1.5
Risk aversion:          shade' = shade + risk_aversion x (1 - shade) x 0.4
Final bid:              min(true_value x shade', 0.9 x true_value, budget_remaining)
```

**Haircut lookup (common value):**

| N | disp 0 | disp 25 | disp 50 | disp 100 |
|---|---|---|---|---|
| 2 | 13.5% | 18.5% | 23.5% | 33.5% |
| 4 | 16.9% | 21.9% | 26.9% | 35% (cap) |
| 6 | 19.0% | 24.0% | 29.0% | 35% (cap) |
| 8 | 20.4% | 25.4% | 30.4% | 35% (cap) |

**Shade table (uniform, risk-neutral):** N=2 0.50, N=3 0.67, N=4 0.75, N=5 0.80, N=6 0.83, N=8 0.875, N=10+ capped at 0.90.

**Input contract**

| Field | Type | Range |
|---|---|---|
| `raw_valuation` | number | >= 0 |
| `value_type` | string | `common_value` / `private_value` / `mixed` |
| `signal_dispersion` | number | [0, 100] |
| `mix_common_weight` | number | [0, 1], only if mixed |
| `n_bidders_estimate` | int | clamped [1, 12], including self |
| `value_distribution` | string | `uniform` / `log-normal` / `empirical` |
| `risk_aversion` | number | [0, 1], default 0 |
| `budget_remaining` | number | >= 0 |

**Output contract**

| Field | Type | Range |
|---|---|---|
| `adjusted_value` | number | [0, raw_valuation] |
| `haircut_pct` | number | [0, 35] |
| `shaded_bid` | number | [0, 0.9 x adjusted_value] |
| `shade_fraction` | number | [0, 0.9] |
| `rationale` | string | 1-2 sentences |
| `assumptions_flagged` | string[] | every modelling assumption |

**Resources**
- [resources/template.md](resources/template.md) — shading input/output contract and worked example
- [resources/methodology.md](resources/methodology.md) — `(N-1)/N` derivation, distribution and risk-aversion adjustments, revenue equivalence
- [resources/winners-curse-template.md](resources/winners-curse-template.md) — value-type decision tree and haircut worked examples (originally written for fantasy waiver auctions; the logic is domain-neutral)
- [resources/winners-curse-methodology.md](resources/winners-curse-methodology.md) — Kagel-Levin evidence and the Bayesian derivation of the haircut
