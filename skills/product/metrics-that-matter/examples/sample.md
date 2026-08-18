# Metric Scorecard — Durian Labs shift-handover drafter

**Fellow:** Durian Labs · **Date:** 2026-07-22 · **Stage:** refine / metrics

Illustrative fixtures. Numbers are plausible, not real client data.

Depth routed: NSM framework → `north-star-metric`; AARRR → its resource; cohort mechanics →
`cohort-analysis`; dashboard build → `retention-dashboard`; unit economics → `financial-unit-economics`.
This scorecard adds the retention gate (C) and cost-per-outcome (D).

The fellow arrived with: *"Our North Star is documents drafted — we're at 40,000 all-time
and climbing. What else should we track?"*

## A. Business game and North Star

| Field | Value |
|---|---|
| Business game | Productivity (helps a warehouse team finish the shift handover faster) |
| Proposed North Star | ~~Documents drafted (40,000 all-time)~~ — rejected: a cumulative total, and an *output* Durian emits, not an outcome the team received |
| Adopted North Star | **Accepted handovers per active team per week** (a draft the team accepted with minor edits and posted) `[Fact]` — logged on the post button |
| Why it is an outcome | The team *used* the handover; a drafted-but-discarded doc does not count |
| Status | **PROVISIONAL** until the retention gate (C) passes |

The 40,000 total is killed. It can only rise, it counts discarded drafts, and it says
nothing about whether any team came back. Reframed to a weekly per-team accepted-outcome rate.

## B. AARRR skeleton

| Stage | The one metric | Current | Rung + tag |
|---|---|---|---|
| Acquisition | New teams reaching first accepted handover / week | 9 | behaviour 0.7 `[Fact]` |
| Activation | % of onboarded teams reaching a first accepted handover in week 1 | 72% | behaviour 0.7 `[Fact]` |
| **Retention** | **Cohort % of teams still posting an accepted handover in week N** | **see C** | **behaviour 0.7 `[Assumption]`** (illustrative fixture; a real cohort export makes this the `[Fact]` the gate requires) |
| Referral | % of teams that introduce a second team at the same site | 18% | behaviour 0.7 `[Assumption]` (small n) |
| Revenue | Net revenue retention across paying sites | 108% | money 1.0 `[Fact]` |

## C. Retention truth test — the gate

Newest full cohort: teams onboarded in the W0 vintage, measured on the accepted-handover
outcome (not logins).

| Period | W0 | W1 | W2 | W4 | W8 | W12 |
|---|---|---|---|---|---|---|
| % still delivering the outcome | 100% | 78% | 66% | 58% | 55% | 54% |

| Read | Value |
|---|---|
| Curve shape | flattens |
| Plateau height | ~54–55% `[Assumption]` — illustrative fixture, not a measured plateau |
| Period it flattened | ~W8 |
| Tail slope (W8→W12) | ~0.3 pts/period — within 1 pt of zero |
| **Verdict** | **NORTH STAR VALID** |

The curve stops falling around week 8 and holds near 55%. That flat is the product: a bit
over half of every team keeps the handover habit indefinitely. The North Star is now
adopted — before this check it was a guess sitting on a 40,000 total. These are illustrative
fixtures, not real client data, so the curve is tagged `[Assumption]`; on a measured cohort the
flattened shape is the behaviour-0.7 `[Fact]` the gate actually requires, and the plateau firms
up as later cohorts mature.

If this curve had instead slid 78 → 60 → 44 → 28 and kept going, the verdict would be
INVALID: a leaky bucket where "documents drafted" only rose because acquisition kept
feeding it. The smallest tail-bending move to test first: a week-2 nudge, since the steepest
drop is W1→W2.

## D. Cost-per-outcome (to the cent)

Per accepted handover:

| Line | Source | Amount |
|---|---|---|
| Inference / API | ~7k tokens in + 1.5k out across retrieval + draft calls | $0.09 `[Assumption]` from token logs |
| Human-in-loop | the team's own edit time — Durian pays $0 (customer labour) | $0.00 |
| Infra / retrieval | vector lookup over past handovers + exception feed | $0.05 `[Assumption]` |
| **Cost per outcome** | sum | **$0.14** |
| Price per outcome | metered at $2.00 per accepted handover | $2.00 `[Fact]` |
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

## Kill line — self-check

- [x] Exactly one North Star, a customer-received outcome (accepted, posted handover) — the
      40,000-total headline was killed.
- [x] Retention truth test run: curve flattens ~55% by W8, tail slope ~0.3 pt → VALID.
- [x] Cost-per-outcome $0.14 to the cent; margin $1.86; direction holding; inversion line named.
- [x] Retention measured on the outcome, over the activated cohort — not logins, not billing.
- [x] Every metric tagged vanity/actionable; both totals converted.
- [x] Numbers tagged; retention (0.7) and NRR (1.0) carry the verdict, not opinion; no figure
      invented beyond Durian's token logs, price sheet, and cohort export.
- [x] Depth routed to the M9 skills; the NSM framework and cohort mechanics are not restated.
