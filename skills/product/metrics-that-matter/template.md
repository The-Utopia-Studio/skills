# Metric Scorecard — <product name>

**Fellow:** <name> · **Date:** <date> · **Stage:** refine / metrics

Route depth, do not restate it here: the NSM framework and AARRR are in SKILL.md Step 1-2; cohort mechanics → `saas-revenue-growth-metrics`; the dashboard build → `metrics-dashboard`;
CAC/LTV/payback → `saas-economics-efficiency-metrics`. This scorecard adds the two things they skip:
the retention diagnostic (C) and cost-per-outcome (D).

## A. Business game and North Star

| Field | Value |
|---|---|
| Business game | Attention / Transaction / Productivity |
| North Star (one, outcome received by the customer) | <e.g. accepted handovers per active team per week> |
| Why it is an outcome, not an output/total | <the customer *got* X, not "we emitted X"> |
| Status | **Candidate outcome metric**; evaluate usefulness separately from current retention performance |

Rules: exactly one North Star. It must be a customer-received outcome, never an emitted
output ("alerts sent") or a cumulative total ("all-time drafts"). Report retention performance separately from metric definition.

## B. AARRR skeleton (one metric per stage)

Retention is load-bearing; the other four explain it, they do not replace it.

| Stage | The one metric | Current value | Rung + tag |
|---|---|---|---|
| Acquisition | <new activated units / period> | <__> | <e.g. behaviour 0.7 `[Fact]`> |
| Activation | <% reaching first accepted outcome> | <__> | <rung + tag> |
| **Retention** | **<cohort % still delivering the outcome at week N>** | **<__>** | **<behaviour 0.7 `[Fact]`>** |
| Referral | <% pulling in another unit> | <__> | <rung + tag> |
| Revenue | <expansion / net revenue retention> | <__> | <verified accounting basis + tag; cash collection separately> |

## C. Retention diagnostic

Record outcome definition, cohort-entry rule, usage cadence, cohort dates, denominators, retained counts and uncertainty. Compare multiple mature cohorts at equal age.

| Cohort | Age | Starting N | Retained N | Rate | Measurement caveats |
|---|---|---|---|---|---|
| _ | _ | _ | _ | _ | _ |

Describe declining / apparently stable / rising retention. A tail change within 1 percentage point is a screening heuristic, not proof of PMF, permanence, or a valid North Star. A useful outcome metric can reveal poor retention. Name the next diagnostic and missing data; do not infer infinity from a short tail.

## D. Cost-per-outcome (to the cent)

| Line | Source | Amount |
|---|---|---|
| Inference / API per outcome | sum(input tokens × input rate + output tokens × output rate) /1,000,000 for per-million rates | $0.__ `[Fact/Assumption]` |
| Human-in-loop per outcome | review minutes /60 × loaded hourly rate | $0.__ |
| Infra / retrieval per outcome | vector + compute per outcome | $0.__ |
| **Cost per outcome** | sum, to the cent | **$0.__** |
| Price per outcome | what the customer pays per outcome | $_.__ |
| **Margin per outcome** | price − cost | **$_.__** |

| Check | Answer |
|---|---|
| Margin per outcome > 0? | yes / no |
| Direction as volume grows | falling cost (good) / holding / **inverting (kill risk)** |
| Cost sits well under price (room inside the 10–20%-of-value price)? | yes / no → route to `value-based-pricing` |

Inversion risk: if cost-per-outcome climbs with scale (longer contexts, more retries, more
review) faster than price, the product loses money the more it runs. Name it if present.

## E. Vanity audit

| Metric on this scorecard | vanity / actionable | If vanity: convert to |
|---|---|---|
| <total drafts all-time> | vanity | <accepted drafts per active team / week> |
| <MAU> | vanity | <cohort retention curve> |
| ... | ... | ... |

Any cumulative total is vanity by construction — it can only rise. A scorecard whose
headline is a total is a KILL.

## Kill line — self-check before returning

- [ ] Exactly ONE North Star, and it is a customer-received outcome — not an emitted output
      ("alerts sent") or a cumulative total. A vanity-total headline is an automatic KILL.
- [ ] Retention diagnostic reports cohort maturity, denominators and uncertainty; curve shape alone is not PMF proof or a metric-validity verdict.
- [ ] Cost-per-outcome (D) is computed to the cent, with margin-per-outcome and its
      direction at scale. Inversion risk named if present.
- [ ] Retention is measured on the North Star outcome, over the cohort that reached the
      first outcome — not raw account logins, not billing.
- [ ] Every metric tagged vanity / actionable; totals killed or converted.
- [ ] Every number tagged `[Fact]`/`[Assumption]`/`[Hypothesis]`; retention and revenue
      rest on ≥ 0.7 (behaviour / money), never on opinion; no number invented that the
      fellow did not provide.
- [ ] Depth routed, not restated: NSM framework, cohort mechanics, dashboard build, and
      unit economics point to the M9 skills, not copied in.
