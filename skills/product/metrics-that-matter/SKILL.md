---
name: metrics-that-matter
description: >-
  Pick and validate the few metrics that matter for a product, especially a launched AI product. Use
  when the user asks what metrics to track, to define or choose a North Star metric and its input
  metrics, whether growing MAU or a headline number is real or vanity, whether cohort retention is
  good or the curve flattens, or what one outcome costs. Returns a scorecard: the business game
  (Attention / Transaction / Productivity), one customer-centric North Star checked against the 7
  criteria with 3-5 input metrics, an AARRR one-metric skeleton, the flattening-retention test that
  GATES the North Star, and cost-per-outcome to the cent. Not for a team's mission or values (use
  alignment-values-north-star), the post-launch improvement loop (use refine-flywheel), mining traces
  for discovery (use trace-to-interview), or the dashboard spec and alerts (use metrics-dashboard).
type: generator
supersedes: none
---

# Metrics That Matter

## What it does

Builds a one-page scorecard with an outcome-focused North Star, an AARRR skeleton, a cohort retention diagnostic and cost per outcome. Keep the metric's definition separate from its current performance. A useful metric can reveal weak retention; a short flat or rising curve does not establish PMF.

## The Icarus reframe

Compare retention across mature cohorts with counts and uncertainty, and price inference, review and infrastructure in consistent units. Do not equate a descriptive curve shape with proof of permanent value. Track the contribution per outcome as volume and model requirements change.

## When to use / When NOT

Use when: a product is live and the fellow needs to pick the few numbers that matter; a
headline metric looks great and the fellow wants to know if it is real; a North Star has
been proposed and needs the retention diagnostic and a cost check.

| Not this skill | Use instead | Why |
|---|---|---|
| "Design the after-launch loop — ship, observe, promote autonomy by eval" | `refine-flywheel` | That is the improvement cadence. This picks and validates the metrics the loop watches; it does not run the loop. |
| "Mine our production traces / turn usage logs into discovery interviews" | `trace-to-interview` | That reads traces as discovery. This scores metrics; a trace is not a metric. |
| "Build the metrics dashboard, set the alert thresholds, instrument the events" | `metrics-dashboard`, `analytics-tracking` | Those render and instrument. This decides what to render and applies the truth test; route the build there. |
| "Work out CAC, LTV, payback, contribution margin" | `saas-economics-efficiency-metrics` | That is full unit economics. This needs only cost-per-outcome and margin-per-outcome; route the rest there. |

If the input names no product and no outcome, do not invent metrics. Ask the one question
that unblocks it — what single outcome does this product deliver for the customer? — or
return the smallest honest next step.

## Method

Copy this checklist:

```
Metrics That Matter progress:
- [ ] Step 1: Name the business game, the one North Star and its 3-5 input metrics
- [ ] Step 2: Fill the AARRR skeleton — one metric per stage, retention load-bearing
- [ ] Step 3: Run the retention diagnostic — classify the curve and report uncertainty
- [ ] Step 4: Price cost-per-outcome to the cent and check margin direction at scale
- [ ] Step 5: Vanity audit — tag every metric, kill the totals
- [ ] Step 6: Run the kill line before returning
```

**Step 1 — game and North Star.** Classify the business game:

| Game | The North Star measures… | Examples |
|---|---|---|
| Attention | time customers spend in the product | Spotify, YouTube, TikTok |
| Transaction | transactions between customers and the platform | Amazon, Uber, Airbnb |
| Productivity | how efficiently someone completes their work | Canva, Dropbox, Notion |

Pick ONE customer-centric outcome as the North Star and check it against the seven
criteria of an effective North Star: (1) easy to understand, (2) customer-centric —
reflects value delivered, not revenue or LTV, (3) sustainable value — indicates habit,
(4) aligned with the vision, (5) quantitative, (6) actionable by teams, (7) a leading
indicator of long-term business success. A North Star is a single metric, not an OKR (OKRs
can express the expected change in it) and not a strategy. Then name **3-5 input metrics**:
the levers that drive it, easier to move in the short term, showing where to focus.

This skill adds two hard rules: the North Star must be an **outcome the customer
receives** (a resolved hazard, an accepted draft), never an output you emit (alerts sent)
or an activity total (logins); and it is provisional until Step 3.

**Step 2 — AARRR skeleton.** One metric per stage. Retention is load-bearing; the other
four are diagnostic inputs that explain the North Star, not rivals to it. Do not restate
the funnel. Fill [template.md](template.md)
section C.

| Stage | One metric (example shape) | Role here |
|---|---|---|
| Acquisition | new activated teams / week | input — is the top filling? |
| Activation | % reaching first accepted outcome | input — does value land? |
| **Retention** | **cohort % still delivering the outcome at week N** | **diagnostic — Step 3 interprets this** |
| Referral | % of teams that pull in another | input — does it spread? |
| Revenue | expansion / net revenue retention | documented revenue basis; distinguish collection from recognition |

**Step 3 — the retention truth test.** Plot the newest full cohort's retention (share of
the cohort still delivering the North Star outcome) across equal periods and classify the
tail:

| Curve shape | Reading | North Star verdict |
|---|---|---|
| Decays toward 0 | Investigate retention and acquisition dependence. | Outcome metric may still be useful; performance is weak. |
| Flattens above 0 | Potential retained segment. | Provisional evidence; record maturity, denominators and uncertainty. |
| Smiles (dips then rises) | Investigate reactivation, seasonality and measurement changes. | Does not by itself prove PMF. |

A last-two-period change within one percentage point is only a descriptive screening heuristic. A one-person cohort can be perfectly flat without supporting a population claim. Compare multiple mature cohorts over a relevant usage horizon, report sample sizes and uncertainty, and check instrumentation. Declining performance does not make an otherwise well-defined outcome metric invalid. Route cohort construction to `saas-revenue-growth-metrics`.

**Step 4 — cost-per-outcome to the cent.** One North Star outcome has a variable cost. Sum
it to the cent **once you have the token / compute rate and the price**; until you do, the
figure is an `[Assumption]`, not a to-the-cent `[Fact]` — name the one measurement that
resolves it. Then check its direction as volume grows.

| Line | How to get it | Example |
|---|---|---|
| Inference / API per outcome | sum(input tokens × input rate + output tokens × output rate) / 1,000,000 for rates per million tokens | $0.__ |
| Human-in-loop per outcome | review minutes / 60 × loaded hourly rate | $0.__ |
| Infra / retrieval per outcome | vector + compute allocated per outcome | $0.__ |
| **Cost per outcome** | sum above, to the cent | **$0.__** |
| Price per outcome | what the customer pays per outcome | $_.__ |
| **Margin per outcome** | price − cost | **$_.__** |

Two checks: margin per outcome must be positive; and it must **hold or widen** as volume
grows. Flag the inversion risk — if cost-per-outcome climbs with scale (longer contexts,
more retries, more review) faster than price, the product loses money the more it works.
This is the AI-specific trap SaaS dashboards do not show. Cost-per-outcome should sit well
under price-per-outcome; if `value-based-pricing` set price at 10–20% of measured value,
cost must leave room inside that. Route CAC / LTV / payback to `saas-economics-efficiency-metrics`.

**Step 5 — vanity audit.** Tag every metric on the scorecard `vanity` or `actionable`
(Yoskovitz's golden rule: if it would not change what you do, it is vanity). Any cumulative
total (total signups, total documents drafted, all-time users) is vanity by construction —
it can only go up. Kill it or convert it to a rate or a cohort. A scorecard whose headline
is a total is an automatic KILL (see the kill line).

**Step 6 — the kill line.** Run the self-check at the foot of [template.md](template.md).

## Evidence standard

Tag measured observations, estimates and hypotheses separately. Record cohort denominators, maturity, outcome definition and instrumentation. Curve shape is descriptive evidence, not a calibrated PMF probability. Revenue recognition/NRR is not automatically cash collected; cite the accounting basis and distinguish paid spend from unpaid invoices or commitments. Compute costs from actual usage and explicit rates, or label estimates and missing inputs. Never invent figures to fill a scorecard.

## Gotchas

- **The up-and-to-the-right lie.** MAU, cumulative users, and total outcomes almost always
  rise — they are fed by acquisition and can climb while every cohort churns out. Without
  the cohort curve you cannot tell growth from a leak. Always cut the headline into cohorts
  before believing it.
- **North Star as output, not outcome.** "Alerts sent", "documents generated", "messages
  processed" measure what the machine emits, not what the customer got. They flatter the
  team and can rise while the product helps no one. Reframe to the received outcome (hazard
  resolved, draft accepted).
- **The margin that inverts at scale.** Outcome count going up while cost-per-outcome
  quietly overtakes value-per-outcome is the AI-native failure mode. A curve of value with
  no curve of cost beside it hides it. Price the outcome to the cent and watch the
  direction, not just the level.
- **Retention with no denominator of use.** "90% retention" of accounts that never
  activated is meaningless. Retention must be of the cohort that reached the first outcome,
  measured on the outcome itself — otherwise it is a billing artefact, not behaviour.

## Examples

[examples/sample.md](examples/sample.md) — Durian Labs' shift-handover drafter: the
proposed North Star ("documents drafted", a vanity total) reframed to accepted handovers
per active team per week, accompanied by an illustrative team-level retention curve near55% by
week 8, with cost-per-outcome priced at $0.14 against a $2.00 price, margin holding as
volume grows.

## Related skills

- `refine-flywheel` — the after-launch loop that acts on these metrics (observe → learn →
  refine). This skill chooses and validates the numbers the loop watches; it does not run
  the loop.
- `trace-to-interview` — reads production traces as discovery. Composes with this: the
  retention diagnostic describes observed persistence; trace-mining proposes hypotheses about why users
  churn out of the tail.
- `metrics-dashboard`, `expansion-retention`, `saas-revenue-growth-metrics`,
  `saas-economics-efficiency-metrics` — the depth this skill routes to
  for the dashboard build, retention plays, cohort mechanics, and unit economics. This
  skill's net-new over all of them is the retention diagnostic and cost-per-outcome to
  the cent.
- `alignment-values-north-star` — a team's *mission* North Star and values, not a metric.
- `value-based-pricing` — sets price per outcome; this checks cost per outcome sits under it.
- `guardrail-design` (07) — when a failure mode's cost-of-error is a safety or regulatory cost
  (a missed hazard, a breach), that cost sizes the *guardrail*, not the scorecard. Route it there;
  this skill stays on cost- and value-per-outcome (see golden 03: Barrier's cost-of-a-missed-hazard).
- It is the diagnostic at the metrics step of the refine stage, and the home of the North Star Framework (business games, 7 criteria, input metrics).
- Further reading: [The North Star Framework 101](https://www.productcompass.pm/p/the-north-star-framework-101), [AARRR Pirate Metrics](https://www.productcompass.pm/p/aarrr-pirate-metrics).
