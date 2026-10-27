# Metric Scorecard — Durian Labs shift-handover drafter

**Fellow:** Durian Labs · **Date:** 2026-07-22 · **Stage:** refine / metrics

Illustrative fixtures. Numbers are plausible, not real client data.

Depth routed: NSM framework and AARRR → SKILL.md Steps 1-2; cohort mechanics →
`saas-revenue-growth-metrics`; dashboard build → `metrics-dashboard`; unit economics → `saas-economics-efficiency-metrics`.
This scorecard adds the retention diagnostic (C) and cost-per-outcome (D).

The fellow arrived with: *"Our North Star is documents drafted — we're at 40,000 all-time
and climbing. What else should we track?"*

## A. Business game and North Star

| Field | Value |
|---|---|
| Business game | Productivity (helps a warehouse team finish the shift handover faster) |
| Proposed North Star | ~~Documents drafted (40,000 all-time)~~ — rejected: a cumulative total, and an *output* Durian emits, not an outcome the team received |
| Adopted North Star | **Accepted handovers per active team per week** (a draft the team accepted with minor edits and posted) `[Assumption]` — logged on the post button |
| Why it is an outcome | The team *used* the handover; a drafted-but-discarded doc does not count |
| Status | **Candidate outcome metric**; performance and validity assessed separately |

The 40,000 total is killed. It can only rise, it counts discarded drafts, and it says
nothing about whether any team came back. Reframed to a weekly per-team accepted-outcome rate.

## B. AARRR skeleton

| Stage | The one metric | Current | Rung + tag |
|---|---|---|---|
| Acquisition | New teams reaching first accepted handover / week | 9 | behaviour 0.7 `[Assumption]` |
| Activation | % of onboarded teams reaching a first accepted handover in week 1 | 72% | behaviour 0.7 `[Assumption]` |
| **Retention** | **Cohort % of teams still posting an accepted handover in week N** | **see C** | **behaviour 0.7 `[Assumption]`** (illustrative fixture; a real cohort export makes this the `[Assumption]` the gate requires) |
| Referral | % of teams that introduce a second team at the same site | 18% | behaviour 0.7 `[Assumption]` (small n) |
| Revenue | Net revenue retention across paying sites | 108% | `[Assumption]` — fictional revenue metric, not verified cash collection |

## C. Retention diagnostic — illustrative only

The supplied fictional sequence is 100%,78%,66%,58%,55%,54% at weeks 0,1,2,4,8,12. From week 8 to 12 the change is −1 percentage point over 4 weeks, or −0.25 points/week. This tail appears to decline more slowly; it does not establish an indefinite 55% plateau or PMF. Cohort denominators, maturity and other cohorts are missing. Request these before generalizing. A more steeply falling sequence would signal a retention problem while the accepted-handover outcome metric could remain useful.

## D. Cost-per-outcome (to the cent)

Per accepted handover:

| Line | Source | Amount |
|---|---|---|
| Inference / API | ~7k tokens in + 1.5k out across retrieval + draft calls | $0.09 `[Assumption]` from token logs |
| Human-in-loop | the team's own edit time — Durian pays $0 (customer labour) | $0.00 |
| Infra / retrieval | vector lookup over past handovers + exception feed | $0.05 `[Assumption]` |
| **Cost per outcome** | sum | **$0.14** |
| Price per outcome | metered at $2.00 per accepted handover | $2.00 `[Assumption]` |
| **Margin per outcome** | price − cost | **$1.86** |

| Check | Answer |
|---|---|
| Margin > 0? | yes — $1.86 |
| Direction as volume grows | holding; retrieval cost per outcome falls slightly as the corpus caches — good |
| Cost well under price? | yes — 7% of price; leaves room inside a value-based price |

Inversion watch: the only line that could climb is inference if drafts get longer or retries
rise. At current shape it holds. `[Assumption]` — reprice the token line each model release
via `refine-flywheel`.

## E. Vanity audit

| Metric | vanity / actionable | Converted to |
|---|---|---|
| Documents drafted (40,000 all-time) | vanity | Accepted handovers per active team / week (the North Star) |
| Total registered users | vanity | Activation % (B) |
| Accepted handovers / active team / week | actionable | — (kept) |
| Cohort retention curve | actionable | — (kept, the gate) |
| Cost per outcome ($0.14) | actionable | — (kept) |

## Review checks

- One outcome metric, not the 40,000 cumulative total.
- Curve interpreted descriptively; no invented cohort counts, permanence or PMF claim.
- All numbers are illustrative assumptions. The $0.09 token cost requires actual model input/output rates; it cannot be derived from token counts alone. If supplied as a scenario assumption, total $0.14 and contribution $1.86 follow arithmetically.
- Customer edit labor is excluded from vendor cash cost but should be tracked separately when evaluating customer value and total cost.
