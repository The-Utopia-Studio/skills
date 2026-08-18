# Value-priced model — v1

Fill every part. A model ships only with a value anchor scoring ≥ 0.7 on the ladder, a status-quo delta, a cleared cost floor, and an outcome-coupled metric. Anything less is not a value price; name the gap and route it.

The spine:

> cost_per_outcome  **<**  PRICE = capture_rate × incremental_value_per_outcome  **<**  incremental_value_per_outcome
> capture_rate ∈ [10%, 20%]  ·  value measured at ≥ 0.7  ·  charged on the outcome / asset / decision metric

---

## Part 1 — The measured value anchor

**One outcome, defined:** _[what is the single outcome the customer gets — one avoided X, one Y decided]_

**What that outcome is worth to the customer:** _[$ figure]_

**How the value is known** (score it):

| The anchor | Ladder score | Source tag |
|---|---|---|
| _[e.g. "operator paid a $220k SLA penalty for a 4-hr outage"]_ | _[1.0 / 0.7 / 0.5 / 0.3 / 0.1]_ | _[Fact / Assumption / Hypothesis]_ |

**Gate:** anchor score ≥ 0.7? _[Yes → continue / No → STOP]_
If No: there is no value-based price. State what is missing and route to `current-state-map` (price the status quo) or a concierge probe (measure the outcome). Do not invent a number.

---

## Part 2 — Incremental value over the status quo

> incremental_value_per_outcome = value_you_deliver − value_the_status_quo_already_captures

| Term | Value | Source |
|---|---|---|
| value_you_deliver (per outcome) | _[$]_ | _[Fact/Assumption]_ |
| value the status quo already captures | _[$ — from `current-state-map`]_ | _[Fact/Assumption]_ |
| **incremental_value_per_outcome** | **_[$]_** |  |

If you cannot state what the status quo already captures, you cannot state the delta. Go measure it; do not set it to zero for convenience or to the gross for ambition.

---

## Part 3 — The cost floor

Pull from `eval-first-spec`, or estimate.

| Term | Value | Source |
|---|---|---|
| cost_per_outcome | _[$ to the cent — from `eval-first-spec`]_ | _[Fact/Assumption]_ |

**Floor check:** PRICE will be set in Part 5; it must clear this. Stated margin = PRICE ÷ cost_per_outcome = _[fill after Part 5]_. If < ~2×, the wedge is thin on cost — flag it.

---

## Part 4 — The metric (charge on the outcome, not the level)

Score candidates; pick the highest-coupling one with feasible attribution.

| Candidate metric | Coupling | Attribution | Improvement-proof? | Keep / reject + why |
|---|---|---|---|---|
| Per-outcome: _[unit]_ | tight | _[clean / contested]_ | yes | _[…]_ |
| Per-asset / decision: _[unit]_ | medium | countable | partial | _[…]_ |
| Per-usage: _[unit]_ | loose | easy | no | _[reject — cost-plus drift]_ |
| Per-seat / tier | decoupled | easy | no | _[reject — decoupled from value]_ |

**Chosen metric:** _[the unit the customer is billed on]_
**Leakage named:** _[what this metric fails to capture — e.g. "customer pays in clean months too"]_

Auto-fail if the chosen metric is a seat or a tier while the value is per-outcome.

---

## Part 5 — Capture rate and the price statement

**Incremental value (from Part 2):** _[$ per outcome]_

**Outcome frequency per charging-metric unit** _(only when Part 4's metric is per-asset / per-period, not per-outcome)_: _[outcomes per asset per period — e.g. "≈1 breach / facility / year", "≈30 stockouts / store / month"]_ — _[Fact / Assumption]_
> Convert: value_per_charging_unit = incremental_value_per_outcome × this frequency. The band and PRICE below use the converted per-unit value. If the metric IS per-outcome, frequency = 1. If you cannot state the frequency, the per-asset price is eyeballed, not derived — flag it owed; do not guess the invoice line.

**Band position:**

| Pull toward 10% (buyer keeps ~10×) | Pull toward 20% (buyer keeps ~5×) | This case |
|---|---|---|
| contested attribution, probabilistic outcome, budget-constrained, early | clean attribution, no substitute, high switching cost, large value | _[chosen capture_rate + the reason]_ |

**capture_rate:** _[10–20%]_ — _[one-line reason from the row above]_

> **PRICE = capture_rate × incremental_value = _[$ on the chosen metric]_**

**The invoice line the customer sees:** _[e.g. "$20,000 per facility per year"]_

**Three sanity checks:**
- [ ] PRICE > cost_per_outcome — margin = _[×]_
- [ ] Buyer retained multiple = incremental_value ÷ PRICE = _[×]_ (in the 5–10× band)
- [ ] Metric stays coupled as the product improves (revenue rises when value rises)

---

## Kill-line check

- [ ] Value anchor scores ≥ 0.7 (not a WTP survey, not a competitor glance)
- [ ] Price is a % of measured incremental value — not cost-plus, not competitor-anchored
- [ ] Charged on an outcome / asset / decision metric — not seats or tiers
- [ ] Cost floor cleared; buyer keeps 5–10×; metric improvement-proof

Any box unchecked = not a value-priced model. State exactly which, and the smallest next step to fill it. If the value anchor is the gap, the next step is to measure it — do not publish a price on top of a guess.
