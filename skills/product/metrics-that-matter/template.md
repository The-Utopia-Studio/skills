# Metric Scorecard — <product name>

**Fellow:** <name> · **Date:** <date> · **Stage:** refine / metrics

Route depth, do not restate it here: the NSM framework → `north-star-metric`; AARRR →
its resource; cohort mechanics → `cohort-analysis`; the dashboard build → `retention-dashboard`;
CAC/LTV/payback → `financial-unit-economics`. This scorecard adds the two things they skip:
the retention gate (C) and cost-per-outcome (D).

## A. Business game and North Star

| Field | Value |
|---|---|
| Business game | Attention / Transaction / Productivity |
| North Star (one, outcome received by the customer) | <e.g. accepted handovers per active team per week> |
| Why it is an outcome, not an output/total | <the customer *got* X, not "we emitted X"> |
| Status | **PROVISIONAL** until the retention gate (C) passes |

Rules: exactly one North Star. It must be a customer-received outcome, never an emitted
output ("alerts sent") or a cumulative total ("all-time drafts"). It is not adopted until C.

## B. AARRR skeleton (one metric per stage)

Retention is load-bearing; the other four explain it, they do not replace it.

| Stage | The one metric | Current value | Rung + tag |
|---|---|---|---|
| Acquisition | <new activated units / period> | <__> | <e.g. behaviour 0.7 `[Fact]`> |
| Activation | <% reaching first accepted outcome> | <__> | <rung + tag> |
| **Retention** | **<cohort % still delivering the outcome at week N>** | **<__>** | **<behaviour 0.7 `[Fact]`>** |
| Referral | <% pulling in another unit> | <__> | <rung + tag> |
| Revenue | <expansion / net revenue retention> | <__> | <money 1.0 `[Fact]`> |

## C. Retention truth test — the gate

Plot the newest full cohort's retention on the North Star **outcome** across equal periods.

| Period | W0 | W1 | W2 | W4 | W8 | W12 |
|---|---|---|---|---|---|---|
| % of cohort still delivering the outcome | 100% | <__> | <__> | <__> | <__> | <__> |

| Read | Value |
|---|---|
| Curve shape | decays-to-0 / flattens / smiles |
| Plateau height (if flat) | <__%> `[Fact/Assumption]` |
| Period it flattened | <e.g. ~W8> |
| Tail slope (last two equal periods) | <__ pts/period> |
| **Verdict** | **NORTH STAR VALID / INVALID** |

Flatten rule: flat = tail slope within ~1 pt of zero AND plateau > 0. Still dropping ≥ ~2
pts/period = INVALID (no PMF yet). Decays toward 0 = the North Star is a vanity metric
riding acquisition — INVALID. Points are `[Assumption]`; the shape rule is the law.

If INVALID: the North Star does not count yet. Name the smallest change that could bend the
tail flat, and say what evidence (which cohort, measured how) would move the verdict.

## D. Cost-per-outcome (to the cent)

| Line | Source | Amount |
|---|---|---|
| Inference / API per outcome | tokens × rate, every model call in the pipeline | $0.__ `[Fact/Assumption]` |
| Human-in-loop per outcome | review minutes × loaded rate | $0.__ |
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
- [ ] The retention truth test (C) was run. The North Star is marked VALID only if a real
      cohort curve has flattened (or smiled); INVALID if it still decays. No North Star
      passes without this check.
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
