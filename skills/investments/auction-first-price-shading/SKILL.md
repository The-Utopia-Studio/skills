---
name: auction-first-price-shading
description: >-
  Evaluate a first-price sealed-bid auction: establish auction rules and value assumptions,
  calculate a justified bid benchmark, and assess winner's-curse risk in common-value settings.
  Use for bid shading, sealed-bid sizing, or conditioning valuation on winning. The uniform
  private-value formula applies only under its stated assumptions; common-value bids need
  a signal model. Not for fixed-price funding allocations, reverse procurement without a cost
  model, or unsolicited-offer selection evidence (use bayesian-reasoning-calibration).
---
# First-price auction bidding

## Establish the mechanism

Record who pays whom, how bids win, reserve/minimum bid and increments, total bidders **including us**, tie-breaking, and whether bids are sealed and first-price. A competitive fundraising process is not necessarily an auction. For procurement, the seller bids a cost-based price and the lowest qualifying bid may win; do not apply a buyer-value formula.

Classify values using economics, not labels:

- **Independent private values:** each bidder knows their own value; another bidder's signal does not change it.
- **Common value:** bidders estimate a shared uncertain value. Winning changes the information available about that value.
- **Mixed/interdependent:** private benefits plus uncertain shared components; model the relationship explicitly.

A shared data room alone does not establish common value, nor does a strategic benefit prove independence.

## Private-value benchmark

For N symmetric, risk-neutral bidders with independent uniform values on [0, Vmax], no entry costs or binding budget constraints, and zero reserve:

`bid(v) = v * (N-1)/N`

N is the total number, not the number of rivals. Do not silently clamp it. With a public reserve r and v >= r:

`bid(v) = v*(N-1)/N + r*(r/v)^(N-1)/N`

For v < r, abstain. For N=1, bid the minimum admissible price if within value and budget. Respect actual bid increments; evaluate adjacent permissible bids if rounding changes the result. This is a model benchmark, not a guarantee of optimality in a real process.

Run the bundled helper for the continuous uniform benchmark:

```sh
python3 scripts/uniform_bid.py --value 100 --bidders 2 --reserve 80
# benchmark_bid: 82
```

Examples at value 100 with zero reserve: N=2 → 50; N=5 → 80; N=20 → 95. A universal 90% cap would contradict this benchmark. Apply a user-specified risk or budget limit as a separate constraint and explain that the constrained bid is not the unconstrained equilibrium result. Budget below reserve means no feasible bid.

## Common-value and other models

Read [resources/methodology.md](resources/methodology.md) when values are correlated, the distribution is nonuniform, or risk aversion matters. Condition expected value on the signal **and winning** using a supported joint model. There is no universal percentage haircut from bidder count and a 0–100 dispersion score. If common value is publicly known with certainty, winning reveals no additional information and does not justify a winner's-curse haircut.

If the signal distribution or rival behavior is unknown, give a sensitivity analysis or identify the missing evidence. Do not stack a fabricated haircut with a private-value formula and label it equilibrium. An empirical bid model requires relevant historical outcomes, not an arbitrary log-normal multiplier.

## Output

Use [resources/template.md](resources/template.md): mechanism, assumptions, value estimate and uncertainty, benchmark with derivation, feasibility constraints, sensitivity, and limitations. Separate researched facts from user inputs and modeling assumptions. No bid is submitted by this skill.

Quality checks: [resources/evaluators/rubric_auction_first_price_shading.json](resources/evaluators/rubric_auction_first_price_shading.json). Check assumptions before arithmetic; an exact calculation under the wrong model is not a valid recommendation.
