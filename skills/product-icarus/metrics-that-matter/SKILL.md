---
name: metrics-that-matter
description: >-
  Fires when a fellow asks which numbers matter for a launched product —
  "what metrics should we track", "what should our North Star be", "is our
  retention any good / does the curve flatten", "our MAU is up-and-to-the-right,
  is that real or vanity", "what's our cost per outcome". Returns a metric
  scorecard: one customer-centric North Star, an AARRR one-metric skeleton, the
  flattening-retention truth test that GATES the North Star, and cost-per-outcome
  priced to the cent. Do NOT fire to design the post-launch improvement loop or
  promote autonomy (use refine-flywheel), to turn production traces into discovery
  interviews (use trace-to-interview), or to build the actual cohort dashboard,
  SQL, or alert thresholds (use the M9 retention-dashboard / cohort-analysis skills).
type: generator
supersedes: none
---

# Metrics That Matter

## What it does

Turns "what should we measure?" into a one-page scorecard with a single North Star, an
AARRR skeleton, a retention curve that must flatten, and a cost-per-outcome to the cent.
This is a thin wrapper: it does not re-teach the North Star framework, AARRR, cohorts, or
unit economics — those live in the M9 retention pack and are routed to, not restated. Its
whole job is the two things the generic frameworks skip: it treats the **flattening
retention curve as a gate** the North Star must pass before it counts, and it forces a
**cost-per-outcome** because an AI product pays a variable cost per outcome that can invert
the margin as volume grows.

## The Icarus reframe

Most metric frameworks let a fellow name a North Star and stop. Icarus says the North Star
is a lie until the retention curve flattens: a cohort curve that decays toward zero means
no product-market fit, and any headline number rising above it is rising on acquisition
spend, not on a product people come back to. Retention is the truth; everything else is
diagnostic. And every North Star outcome carries a variable cost — inference, review time,
infra — so Icarus prices it to the cent and checks that margin per outcome holds or widens
as volume scales, not just that the outcome count goes up.

## When to use / When NOT

Use when: a product is live and the fellow needs to pick the few numbers that matter; a
headline metric looks great and the fellow wants to know if it is real; a North Star has
been proposed and needs the retention gate and a cost check before it is adopted.

| Not this skill | Use instead | Why |
|---|---|---|
| "Design the after-launch loop — ship, observe, promote autonomy by eval" | `refine-flywheel` | That is the improvement cadence. This picks and validates the metrics the loop watches; it does not run the loop. |
| "Mine our production traces / turn usage logs into discovery interviews" | `trace-to-interview` | That reads traces as discovery. This scores metrics; a trace is not a metric. |
| "Build the cohort dashboard, write the SQL, set the alert thresholds" | `retention-dashboard`, `cohort-analysis`, `analytics-tracking` (M9) | Those render and instrument. This decides what to render and applies the truth test; route the build there. |
| "Validate a North Star against the 7 NSM criteria / classify the business game" | `north-star-metric` (M9) | That is the framework. This calls it once, then adds the retention gate and cost-per-outcome it lacks. |
| "Work out CAC, LTV, payback, contribution margin" | `financial-unit-economics` (M9) | That is full unit economics. This needs only cost-per-outcome and margin-per-outcome; route the rest there. |

If the input names no product and no outcome, do not invent metrics. Ask the one question
that unblocks it — what single outcome does this product deliver for the customer? — or
return the smallest honest next step.

## Method

Copy this checklist:

```
Metrics That Matter progress:
- [ ] Step 1: Name the business game and the one North Star (route the framework to M9)
- [ ] Step 2: Fill the AARRR skeleton — one metric per stage, retention load-bearing
- [ ] Step 3: Run the retention truth test — classify the curve, gate the North Star
- [ ] Step 4: Price cost-per-outcome to the cent and check margin direction at scale
- [ ] Step 5: Vanity audit — tag every metric, kill the totals
- [ ] Step 6: Run the kill line before returning
```

**Step 1 — game and North Star.** Classify Attention / Transaction / Productivity and pick
ONE customer-centric outcome as the North Star. Do not restate the 7 criteria — route to
`north-star-metric` (M9). This skill adds two hard rules: the North Star must be an
**outcome the customer receives** (a resolved hazard, an accepted draft), never an output
you emit (alerts sent) or an activity total (logins); and it is provisional until Step 3.

**Step 2 — AARRR skeleton.** One metric per stage. Retention is load-bearing; the other
four are diagnostic inputs that explain the North Star, not rivals to it. Do not restate
the funnel — see the AARRR resource in `north-star-metric`. Fill [template.md](template.md)
section C.

| Stage | One metric (example shape) | Role here |
|---|---|---|
| Acquisition | new activated teams / week | input — is the top filling? |
| Activation | % reaching first accepted outcome | input — does value land? |
| **Retention** | **cohort % still delivering the outcome at week N** | **the truth — Step 3 gates on this** |
| Referral | % of teams that pull in another | input — does it spread? |
| Revenue | expansion / net revenue retention | money-moved (1.0) confirmation |

**Step 3 — the retention truth test.** Plot the newest full cohort's retention (share of
the cohort still delivering the North Star outcome) across equal periods and classify the
tail:

| Curve shape | Reading | North Star verdict |
|---|---|---|
| Decays toward 0 | Leaky bucket. No PMF. The headline rides acquisition. | **INVALID** — vanity North Star |
| Flattens at a plateau > 0 | A stable fraction stays. That plateau is the business. | **VALID** — record the plateau height |
| Smiles (dips then rises) | Resurrection + expansion beat churn. Strong PMF. | **VALID** — strongest |

Flatten test [Assumption] on the exact points, the shape rule is the law: the curve has
flattened when the retention change between the last two equal-length periods is within
~1 percentage point of zero and the plateau is above zero. Still dropping ≥ ~2 points per
period in the tail = not yet flat = North Star INVALID. Route the cohort mechanics (how to
cut vintages, triangle tables) to `cohort-analysis`; this skill only reads the shape and
renders the verdict. A North Star that has never been checked against a flattening curve is
not a North Star — it is a guess.

**Step 4 — cost-per-outcome to the cent.** One North Star outcome has a variable cost. Sum
it to the cent **once you have the token / compute rate and the price**; until you do, the
figure is an `[Assumption]`, not a to-the-cent `[Fact]` — name the one measurement that
resolves it. Then check its direction as volume grows.

| Line | How to get it | Example |
|---|---|---|
| Inference / API per outcome | tokens × rate, all model calls in the pipeline | $0.__ |
| Human-in-loop per outcome | review minutes × loaded rate | $0.__ |
| Infra / retrieval per outcome | vector + compute allocated per outcome | $0.__ |
| **Cost per outcome** | sum above, to the cent | **$0.__** |
| Price per outcome | what the customer pays per outcome | $_.__ |
| **Margin per outcome** | price − cost | **$_.__** |

Two checks: margin per outcome must be positive; and it must **hold or widen** as volume
grows. Flag the inversion risk — if cost-per-outcome climbs with scale (longer contexts,
more retries, more review) faster than price, the product loses money the more it works.
This is the AI-specific trap SaaS dashboards do not show. Cost-per-outcome should sit well
under price-per-outcome; if `value-based-pricing` set price at 10–20% of measured value,
cost must leave room inside that. Route CAC / LTV / payback to `financial-unit-economics`.

**Step 5 — vanity audit.** Tag every metric on the scorecard `vanity` or `actionable`
(Yoskovitz's golden rule: if it would not change what you do, it is vanity). Any cumulative
total (total signups, total documents drafted, all-time users) is vanity by construction —
it can only go up. Kill it or convert it to a rate or a cohort. A scorecard whose headline
is a total is an automatic KILL (see the kill line).

**Step 6 — the kill line.** Run the self-check at the foot of [template.md](template.md).

## Evidence standard

Money moved 1.0 → behaviour observed 0.7 → artefact shown 0.5 → verbal commitment 0.3 →
opinion 0.1. Retention is exactly why this ladder exists: a cohort still delivering the
outcome is **behaviour observed (0.7)**, and expansion / net revenue retention is **money
moved (1.0)** — those, and only those, validate the North Star. A North Star propped up by
a survey, an NPS, or "users say they love it" is **opinion (0.1)** and cannot pass Step 3
no matter how high the number. The bar: the North Star is adopted only when a real cohort
curve has flattened (≥ 0.7) and cost-per-outcome is a `[Fact]` computed from real usage,
not an estimate. Tag every number `[Fact]`, `[Assumption]`, or `[Hypothesis]`; invent none
the fellow did not give.

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
per active team per week, gated by a team-level retention curve that flattens at ~55% by
week 8, with cost-per-outcome priced at $0.14 against a $2.00 price, margin holding as
volume grows.

## Related skills

- `refine-flywheel` — the after-launch loop that acts on these metrics (observe → learn →
  refine). This skill chooses and validates the numbers the loop watches; it does not run
  the loop.
- `trace-to-interview` — reads production traces as discovery. Composes with this: the
  retention truth test says *whether* the product works; trace-mining says *why* users
  churn out of the tail.
- `north-star-metric`, `retention-dashboard`, `metrics-dashboard`, `cohort-analysis`,
  `financial-unit-economics` (M9 retention pack) — the depth this wrapper routes to for the
  NSM framework, the dashboard build, cohort mechanics, and unit economics. This skill's
  net-new over all of them is the flattening-retention gate and cost-per-outcome to the cent.
- `value-based-pricing` — sets price per outcome; this checks cost per outcome sits under it.
- `guardrail-design` (07) — when a failure mode's cost-of-error is a safety or regulatory cost
  (a missed hazard, a breach), that cost sizes the *guardrail*, not the scorecard. Route it there;
  this skill stays on cost- and value-per-outcome (see golden 03: Barrier's cost-of-a-missed-hazard).
- Supersedes nothing. It is the truth-test gate at the metrics step of the refine stage.
