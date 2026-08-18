---
name: value-based-pricing
description: Set the price and the charging metric for a validated product — anchor the number at 10–20% of the MEASURED incremental value, and charge on the outcome / asset / decision the customer gets, never on seats or tiers. Emits a value-priced model. Fires on "how should we price this", "what do we charge", "per seat or per outcome", "set the price", "what's the number". Not for brainstorming which revenue model to bet on across the product (that is `monetization-strategy`, exploratory; this commits ONE value-anchored number on ONE metric), not for structuring the whole pilot deal — scope, success metrics, kill criteria (that is `pilot-six-term-sheet`; this produces the price and metric that become its term 2 and term 6), not for measuring the value in the first place (that is `current-state-map`, which prices the status quo this consumes).
type: generator
supersedes: none
---

## What it does

Takes a validated product and returns one price on one metric, both defended. It forces the price to sit between two measured walls: a floor (your cost per outcome) and a ceiling (the incremental value the customer measures). The price is set at 10–20% of that incremental value — the band where the buyer keeps a 5–10× return and still feels the win — and it is charged on the outcome, asset, or decision the customer receives, not on seats, tiers, or usage. The output is a filled `template.md`: the measured value anchor with its evidence-ladder score, the incremental-over-status-quo calculation, the cost floor, the chosen metric with its coupling defended, the capture rate with its band position argued, and a single price statement a customer would see on an invoice. If the value is not measured, the skill does not produce a price. It names the gap and routes to where the value gets measured.

## The Icarus reframe

Generic pricing advice knows the "charge a fraction of value" rule and stops there. Two things make this different, and both are refusals. First: you cannot price value you have not measured — a willingness-to-pay survey is opinion (0.1 on the ladder), a competitor's number is their guess inherited as yours, and cost-plus caps your price at your own cost structure and falls exactly when your costs fall. The value anchor must clear behaviour (0.7) or money (1.0), or there is no value-based price to set. Second: price the METRIC, not the LEVEL. A seat or a tier is a proxy that decouples from value — as the product improves and one seat delivers the work of five, per-seat pricing caps your revenue while the value explodes, and it has told the customer they bought a tool per person, not an outcome. The metric must be the outcome unit itself, chosen so revenue tracks value as the flywheel makes the product better.

## When to use / When NOT

Use when a fellow has a validated product (a passed wedge, a working v1, or a pilot about to be priced) and needs the number and the charging axis set, and has — or can quickly get — a measured value figure. Trigger phrases: "how should we price this", "what do we charge", "per seat or per outcome", "set the price", "what's the number", "are we charging on the right thing".

Do not use when:

| Request | Belongs to |
|---|---|
| "Brainstorm 3–5 revenue models and test which one to bet on" | `monetization-strategy` (concept) — exploratory, tests willingness to pay across models. This skill does the opposite: it commits to ONE value-anchored number on ONE metric. |
| "Structure the whole pilot deal — scope, data-rights, success metrics, kill criteria, conversion" | `pilot-six-term-sheet` (section 07). This skill produces the price (its term 2) and the charging metric (its term 6 basis); it does not structure the six-term deal. |
| "How is this done today / what does the status quo cost / what is it worth" | `current-state-map` (section 01) prices the status quo — the value denominator this skill consumes. If the value is not measured yet, route there first. |
| "What does one outcome cost us to produce" | `eval-first-spec` (section 07) produces cost_per_outcome — the floor this skill checks the price against. |

Also do not use it to invent a price when there is no measured value. A price with a value anchor scoring ≤ 0.3 on the ladder is not a value-based price; say so and route the fellow to measure the value before returning here (see Method step 1).

## Method

Fill in `template.md`. Five parts, then a kill-line check. The spine is one inequality:

> cost_per_outcome  **<**  PRICE = capture_rate × incremental_value_per_outcome  **<**  incremental_value_per_outcome
> with capture_rate ∈ [10%, 20%], value measured at ≥ 0.7 on the ladder, charged on the outcome / asset / decision metric.

### Step 1 — Measure the value, or stop (Part 1)

Name the value of one outcome to the customer and score how it is known:

| How the value is known | Ladder | Backs a price? |
|---|---|---|
| A loss the customer already paid, or an invoice they already pay to solve this | money moved 1.0 | Yes — strongest |
| A concierge/probe run that measured the outcome delivered; a `current-state-map` that priced the status quo | behaviour 0.7 | Yes |
| A report or artefact showing the cost of the problem | artefact 0.5 | Weak — corroborate, do not price on it alone |
| "This would save us about $X" said in an interview | verbal 0.3 | No |
| A willingness-to-pay survey ("would you pay $Y?") | opinion 0.1 | No — the classic pricing trap |

If the best anchor is ≤ 0.3, stop. There is no value-based price to set. Name what is missing and route to `current-state-map` or a concierge probe to measure it. Do not average a 1.0 penalty with a 0.1 survey; the anchor is only as strong as its weakest load-bearing number.

### Step 2 — Take the delta over the status quo (Part 2)

Price the value you *add*, not the gross outcome. If the status quo already prevents some of the loss, charging 15% of the full figure bills the customer for value they already had.

> incremental_value_per_outcome = value_you_deliver − value_the_status_quo_already_captures

Both terms measured. The status-quo figure comes from `current-state-map`. If you cannot state what the status quo already captures, you cannot state the incremental value — go get it.

### Step 3 — Set the floor (Part 3)

Pull cost_per_outcome from `eval-first-spec` (or estimate it: model + infra × attempts, human review, remediation). The price must clear this floor with margin, or the wedge is not economic regardless of value. State margin = PRICE ÷ cost_per_outcome.

### Step 4 — Choose the metric, not the level (Part 4)

Score candidate metrics; pick the highest-coupling one with feasible attribution. Name the leakage of whatever you pick.

| Metric | Coupling to value | Attribution | Improvement-proof? | Verdict |
|---|---|---|---|---|
| Per-outcome (incident avoided, decision made) | tight | needs clean attribution | yes — more outcomes → more revenue | first choice if attributable |
| Per-asset / per-decision (per machine, per site, per permit, per report) | medium | countable, both sides see it | partial | use when outcome is not cleanly attributable; name the leakage |
| Per-usage (runs, calls, tokens) | loose | easy | no — drifts to cost-plus, races model prices | avoid as primary basis |
| Per-seat / per-tier (the LEVEL) | decoupled / inverse | easy | no — caps revenue as product improves | banned as primary basis unless value genuinely scales with headcount |

The improvement-proof column is the tie-breaker: the `refine-flywheel` makes the product deliver more outcomes per asset over time; only an outcome-coupled metric captures that. When per-outcome fails attribution, proxy on the ASSET the outcome attaches to — never on raw usage — and state exactly what coupling you lost.

### Step 5 — Set the capture rate and write the price (Part 5)

Capture is 10–20% of incremental value. Position within the band from evidence, not feel:

| Lean 10% (buyer keeps ~10×) when | Lean 20% (buyer keeps ~5×) when |
|---|---|
| attribution is contested / outcome is probabilistic | attribution is clean and undisputed |
| buyer is budget-constrained; land-and-expand | you are the only path to the outcome (no substitute) |
| early, unproven, few reference outcomes | high switching cost; large, lumpy value |

The band *is* the buyer-return band: 10% capture ⇒ buyer keeps 10×; 20% ⇒ 5×. Below 10% you underprice and may not clear the floor; above 20% the buyer's retained win drops under 5× and stops justifying the switch. Then write the price as one line: **number + metric + what the customer sees on the invoice**, and run the three sanity checks.

**Kill line.** Auto-fail the output if the price is cost-plus or competitor-anchored; if it is charged on the level (seats/tiers) rather than an outcome/asset/decision metric; or if the value anchor scores ≤ 0.3 (a price with no measured value behind it). A value-priced model exists only when a ≥ 0.7 value anchor, a status-quo delta, a cleared cost floor, and an outcome-coupled metric are all present.

## Evidence standard

Every Icarus skill weights behaviour and money over opinion. The ladder:

| Signal | Score |
|---|---|
| Money moved | 1.0 |
| Behaviour observed | 0.7 |
| Artefact shown | 0.5 |
| Verbal commitment | 0.3 |
| Opinion | 0.1 |

This skill enforces the ladder on the *value denominator*, which is where pricing usually cheats. The price can be as precise as you like; if the value under it is a survey or a competitor glance, the whole model is 0.1. The bar: the value anchor must clear 0.7. The strongest anchor is a loss the customer already paid (1.0) because it proves both the number and the willingness — they have spent money on this problem before. Tag every figure `[Fact]`, `[Assumption]`, or `[Hypothesis]`. A price whose value case is `[Assumption]` is a hypothesis to test in a paid pilot, not a price to publish — carry it to `pilot-six-term-sheet` and let the pilot move it up the ladder.

## Gotchas

The willingness-to-pay survey dressed as data. "We asked 20 prospects and they'd pay about $500/month." Stated WTP is opinion (0.1) — hypothetical, anchored to whatever number you said first, and it is a *level* ($/month) not a metric. It cannot back a value price. Measure what one outcome is worth instead.

Charging gross when the status quo already captures value. Pricing 15% of a full $8,000 avoided stop when the plant's manual process already prevents half of them bills the customer for value you did not create, and the buyer's own numbers will expose it at renewal. Price the delta over status quo (Step 2), not the headline figure.

Per-seat because "that's how SaaS is sold." The most common decoupling trap, and it is wrong on the *axis*, not just the number: it is simultaneously overpriced for a one-facility buyer and underpriced for a ten-facility one, because seats have nothing to do with the outcome. As the agent improves and does five analysts' work from one seat, per-seat caps your revenue at one seat while you deliver five. Price the outcome.

The unattributable outcome quietly downgraded to usage. When per-outcome attribution is hard, the lazy move is per-API-call — which is cost-plus in disguise and pins your price to a falling model-price curve. If you must proxy, proxy on the ASSET the outcome attaches to (per machine, per site, per permit) and name the coupling you gave up; do not retreat to raw usage.

The priceless outcome. When one outcome is a prevented fatality or an unbounded loss, you cannot capture 10–20% of it — the percentage is meaningless and taking it is grotesque. Anchor instead on a *bounded, money-backed proxy* the customer already pays: the regulatory fine avoided, the insurance-premium delta, the documented downtime cost. Price a percentage of the bounded proxy, never of the incident.

## Examples

`examples/sample.md` — a full value-priced model for Azraq (data-centre risk), built from a real $220k SLA-breach penalty the design partner paid (money 1.0). Includes the fellow's first draft — a competitor-anchored per-seat price — and the correction that shows per-seat was wrong on the axis, not just the number. Figures are illustrative test fixtures.

## Related skills

`monetization-strategy` (concept) — the skill this one absorbs and reframes. It brainstorms 3–5 revenue models and tests willingness to pay to decide which to bet on; this skill takes the chosen model and commits ONE value-anchored number on ONE metric. Send a fellow there when the model itself is still open; use this when it is time to set the number.

`pilot-six-term-sheet` (section 07) — consumes this skill's output: the price becomes term 2 and the metric becomes the term 6 conversion basis. That skill structures the whole deal (scope, data-rights, success metrics, kill criteria); this one only sets what to charge and on what. Route there to write the deal.

`current-state-map` (section 01) — prices the status quo, which is both the value denominator (Step 1) and the delta subtrahend (Step 2). If the value is not measured, this skill routes there first.

`eval-first-spec` (section 07) — produces cost_per_outcome, the price floor this skill checks against (Step 3).

Supersedes: none. This is a new skill; there is no prior value-pricing skill in the pack to beat.
