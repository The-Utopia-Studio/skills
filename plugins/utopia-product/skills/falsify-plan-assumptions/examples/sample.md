# Null-Hypothesis Test — Azraq (worked)

**Fellow / venture:** Azraq (data-centre / infrastructure risk)
**Plan / wedge under test:** Sell an outage-risk score for data centres to
underwriters, built on operators' incident and uptime logs, with an exclusive
data-rights position.
**Date:** 2026-07-21

> All numbers here are synthetic, domain-plausible test fixtures — not real client
> data. They exist to show the mechanic, not to report a finding.

## The load-bearing beliefs

Read from four seats. The plan dies without each of these; nice-to-knows (report
format, refresh latency) were cut to the park line.

---

## Disproof table

| # | Belief (claim about the world) | Null H0 (belief is false) | P(wrong) | Impact | Rank | Cheapest disproof + evidence rung | Cost/time | Pre-committed kill signal |
|---|---|---|---|---|---|---|---|---|
| 1 | `[Assumption]` A data-centre operator will grant Azraq rights to its incident/uptime logs | Operators will not grant log rights | 4 | 5 | **20** | Ask ONE friendly operator for a signed sandbox read-grant to one month of real logs (rung: artefact -> behaviour) | 1 week, £0 | Not granted, OR it routes to legal and stalls past 5 business days |
| 2 | `[Assumption]` An underwriter will pay for a third-party outage-risk score | Underwriters price it in-house and won't buy | 4 | 5 | **20** | Take one historical outage to ONE underwriting lead and ask for a signed paid-pilot LOI, not a compliment (rung: verbal -> money) | 2 weeks | "We'd use it but wouldn't pay", OR no budget line named |
| 3 | `[Hypothesis]` The incident logs predict outages better than public signals | Logs add no lift over public data | 3 | 4 | **12** | Backtest the score against known past outages vs a public-signal baseline on the one operator's logs (rung: behaviour) | 3-4 days | Lift <= public-signal baseline |
| 4 | `[Assumption]` The data-rights position is exclusive/defensible | Operators grant the same rights to competitors | 4 | 3 | **12** | Ask the operator for an exclusivity clause in the sandbox grant (rung: artefact) | in the same ask as #1 | They sign access but refuse exclusivity |
| 5 | `[Assumption]` A named buyer with budget exists, not a committee | Buying is a diffuse committee with no owner | 3 | 3 | **9** | In the #2 meeting, ask who signs the PO and what line it comes from (rung: verbal) | same meeting | No single owner / no named line |
| 6 | `[Assumption]` Underwriters will trust an external model's methodology | They discount any model they can't audit | 2 | 1 | **2** | Park — cosmetic vs #2; folds into the pilot | — | (not tested yet) |

**Note the floor biting:** beliefs 1 and 2 are Impact 5 resting on opinion, so
even a confident fellow cannot score them below P(wrong) 3; here honest P is 4.
Both land at 20 — the two load-bearing walls.

---

## Confirmation tests caught (rewritten)

| Belief # | Confirmation test proposed | Disproof twin (with kill signal) |
|---|---|---|
| 1 | "Interview 8 operators about willingness to share data" | Ask ONE operator for a signed sandbox read-grant this week. Kill = not granted or stalls in legal past 5 days. Interviews return politeness; a grant returns access. |
| 2 | "Show 5 underwriters the concept deck and gauge interest" | Ask ONE for a paid-pilot LOI on a real historical outage. Kill = no signed LOI / no budget line. Interest is opinion (0.1); an LOI is verbal-to-money. |

---

## Test order

| Band | Beliefs | When |
|---|---|---|
| Load-bearing wall (Rank >= 15) | #1 data rights, #2 will-pay | THIS WEEK — both, in parallel; either failing kills the plan as drawn |
| Test this month (Rank 8-14) | #3 predictive lift, #4 exclusivity, #5 named buyer | before any build; #3 and #4 ride on the #1 grant |
| Park (Rank <= 7) | #6 methodology trust | note only |

## What would change the view

- **Belief #1 (data rights):** abandon the "we own the data moat" plan if the first
  operator won't grant access on any terms; it climbs a rung if a signed sandbox
  grant lands (opinion -> artefact), and another if a second operator grants without
  being asked twice (-> behaviour).
- **Belief #2 (will-pay):** abandon the direct-to-underwriter wedge if no underwriter
  will name a budget line against a real historical outage; it climbs to money the
  moment one signs a paid-pilot LOI. Until #1 and #2 both clear, nothing downstream
  (model, report, exclusivity) is worth building.
