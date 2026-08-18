# Worked example — Azraq value-priced model (per-facility data-centre risk position)

Azraq sells data-centre risk analysis: a monthly risk position per facility that flags the single failure most likely to breach the operator's SLA this month. This is a test fixture — figures are illustrative, tagged `[Fact]` only where a probe or a paid invoice produced them.

## Input the fellow brought

"The wedge passed and the pilot's about to convert. How do we price it? I was thinking $2,000/month per seat — a competitor charges about that, and three ops seats gets us to $72k/year, which feels like a normal enterprise number."

Artefacts on the table:
- The lead design partner (a tier-III operator) **paid a $220,000 SLA-breach penalty** for a 4-hour outage 14 months ago — the invoice is in the data room. [Fact]
- That operator had **2 SLA-breaching outages in 24 months** on the pilot facility. [Fact]
- Their status quo: a **quarterly third-party audit (~$40k/yr)** plus internal ops review; on replay, this manual process would have caught roughly **1 in 3** of the breach-causing failure signatures. [Assumption]
- Azraq's continuous monitor caught **~9 in 10** of those signatures on the concierge replay of the two real outages plus 18 near-miss months. [Fact — replay; the recall rate is [Assumption] on a small n]

---

## First, why the fellow's draft fails

$2,000/month per seat × 3 seats = $72k/year. Three separate kill-line hits:

1. **Competitor-anchored + "feels normal."** The competitor's $2k is their guess; "normal enterprise number" is opinion (0.1). Neither is a measured value. The price rests on nothing.
2. **Per-seat is the LEVEL, not the metric.** How many ops people log in has no relationship to whether a breach is prevented. The value is per-facility-at-risk, not per-user.
3. **Wrong on the axis, both directions.** For this one-facility partner, $72k *overcharges* relative to the value Azraq adds; for a ten-facility operator, a flat three-seat $72k would *undercharge* by an order of magnitude. Seats decouple the price from value, so the same number is simultaneously too high and too low.

The fix is not a better seat price. It is a different axis, anchored on the paid penalty.

---

## Part 1 — The measured value anchor

**One outcome:** one prevented SLA-breaching outage on a facility.

**What it is worth:** **$220,000** — the penalty the operator actually paid for exactly this failure. [Fact]

| The anchor | Ladder score | Source |
|---|---|---|
| Operator paid a $220k SLA penalty for a 4-hr breach (invoice in data room) | **1.0 — money moved** | [Fact] |

**Gate:** anchor ≥ 0.7? **Yes.** This is the strongest possible anchor: a loss the customer already paid proves both the size of the value and that they will spend real money to avoid it. No survey needed.

---

## Part 2 — Incremental value over the status quo

Do not price 100% of the $220k — the quarterly audit already prevents some breaches. Price the delta Azraq adds.

Base rate: ~1 breach-causing failure per year on this facility (2 in 24 months). [Fact]

| Term | Value | Source |
|---|---|---|
| Breaches Azraq would prevent per year (recall 0.9 × 1.0/yr) | 0.90 avoided/yr | [Assumption] |
| Breaches the status quo already prevents (recall ~0.33 × 1.0/yr) | 0.33 avoided/yr | [Assumption] |
| **Incremental breaches avoided per year** | **0.57/yr** |  |
| **incremental_value_per_year_per_facility** = 0.57 × $220k | **≈ $125,000/facility/yr** | anchor [Fact], rate [Assumption] |

The $125k, not the $220k, is the denominator. Charging on the gross would bill the operator for the third of breaches their own audit already catches.

---

## Part 3 — The cost floor

Azraq's cost to produce a monthly risk position for one facility (estimate, pending `eval-first-spec`):

| Term | Value | Source |
|---|---|---|
| Model + data ingest, per facility-month | $60 | [Assumption] |
| Analyst review, 1 hr/month × $80 loaded | $80 | [Assumption] |
| **cost_per_outcome (per facility-year)** | **≈ $1,700/yr** | [Assumption] |

Any value price will clear this by a wide margin; cost is not the binding constraint here (as it should be for a value product).

---

## Part 4 — The metric

| Candidate | Coupling | Attribution | Improvement-proof? | Verdict |
|---|---|---|---|---|
| Per-avoided-breach (outcome) | tight | **contested** — cannot prove a breach that did not happen | yes | reject as billing basis: unbillable, would trigger disputes every renewal |
| **Per-facility per-year (asset)** | medium | countable, both sides see the facility list | partial | **choose** — the facility is the thing risk attaches to |
| Per-report / per-query (usage) | loose | easy | no | reject — cost-plus drift, races nobody |
| Per-seat | decoupled | easy | no | reject — the draft's error |

**Chosen metric:** per facility, per year (subscription on the asset the outcome attaches to).
**Leakage named:** the operator pays for a facility even in a year with no breach. That is the price of a countable, non-disputable metric — accepted, because per-avoided-breach is unbillable. The risk positions and the breach log are shared, so at renewal Azraq shows flagged-vs-occurred and the value is provable, not asserted.

---

## Part 5 — Capture rate and price

Incremental value = **$125,000/facility/yr**.

| Pull to 10% | Pull to 20% | This case |
|---|---|---|
| contested attribution, probabilistic | clean attribution, no substitute, high switching cost | Azraq is the only continuous monitor (no substitute) and the anchor is a *paid* penalty (money 1.0) → **pull high, ~16%**. Held just under 20% because breach avoidance is still probabilistic. |

**capture_rate = 16%.**

> **PRICE = 0.16 × $125,000 ≈ $20,000 per facility per year.**

**Invoice line:** **$20,000 per facility, per year.**

**Sanity checks:**
- [x] PRICE $20,000 > cost floor $1,700 → margin ≈ **12×**.
- [x] Buyer retained multiple = $125,000 ÷ $20,000 = **6.25×** (in the 5–10× band).
- [x] Improvement-proof: as recall climbs toward 1.0 via the flywheel, incremental breaches avoided rise, and per-facility pricing lets Azraq re-anchor upward at renewal on the shared breach log. A per-seat price would have captured none of that.

---

## Kill-line check

- [x] Anchor scores 1.0 (paid penalty), not a WTP survey or competitor glance
- [x] Price is 16% of measured incremental value — not cost-plus, not competitor-anchored
- [x] Charged per-facility (asset the outcome attaches to) — not per-seat
- [x] Cost floor cleared 12×; buyer keeps 6.25×; metric improvement-proof

Model ships. Carry $20,000/facility/yr into `pilot-six-term-sheet` as term 2's price and the per-facility basis as term 6's conversion metric.

## The lesson this enforces

The seat price was not a rounding error; it was the wrong axis. Anchored on the $220k the operator had already paid, netted to the $125k Azraq actually adds, and charged on the facility rather than the login, the price comes out at $20k for one facility — and scales to $200k for a ten-facility operator, exactly tracking the value. The draft's $72k flat-seat number could never do both. That is the whole point of pricing the metric, not the level.
