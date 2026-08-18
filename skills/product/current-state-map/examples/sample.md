# Worked example — Azraq static site risk report

Fellow: **Azraq** (data-centre / infrastructure risk). All numbers are illustrative test fixtures, not client data.

**Fellow's ask:** "How is our risk report actually produced today, and what does one cost? We know it's roughly an analyst-day but I want it itemised before we talk automation."

## Shared assumption block
- Loaded rate: **£120/hr** = £2.00/min for the analyst/senior (fully loaded specialist)  `[Assumption]`
- Priced against the timesheet export for the week of 3 Mar and one report observed 12 Mar  `[Fact]`

---

## 1. Unit and trigger
- **Unit:** one static site risk report (uptime/incident history + data-rights position for one operator site).
- **Trigger:** quarterly refresh cycle opens for a site.
- **Frequency:** ~40 sites × quarterly = **160 reports/year**  `[Assumption]`

## 2–3. As-is step ledger (£2.00/min loaded)

| # | Step | Actor | Artefact in→out | Touch min | Loaded £/min | Cost £ | Source | Ladder | Tag |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Pull incident + uptime logs from operator portal | analyst | portal export → raw logs | 55 | 2.00 | 110 | timesheet wk 3 Mar | 0.7 | [Fact] |
| 2 | Reconcile data-rights position (what we may publish) | analyst | contract terms → cleared fields | 80 | 2.00 | 160 | timesheet wk 3 Mar | 0.7 | [Fact] |
| 3 | Draft standard report sections | analyst | logs+template → draft | 150 | 2.00 | 300 | timesheet wk 3 Mar | 0.7 | [Fact] |
| 4 | Senior materiality review + sign-off | senior | draft → signed report | 20 | 2.00 | 40 | observed 12 Mar | 0.7 | [Fact] |
| 5 | Format, chart, QA | analyst | draft → final PDF | 60 | 2.00 | 120 | timesheet wk 3 Mar | 0.7 | [Fact] |

- **Touch-labour subtotal = 365 min = £730**

## 4. Handoff tax
- Handoffs: analyst chases the operator twice for missing data; one senior review round-trip. ≈ **70 min**.
- **Handoff subtotal = 70 min × £2.00 = £140**  · Source: timesheet wk 3 Mar · `[Fact]` (0.7)

## 5. Delay
- Elapsed time ≈ **3 calendar days** waiting on operator data vs **~7 hr** touch.
- Does the wait cost money? A quarterly report has no SLA, no carrying cost, no decaying decision. **Delay = £0, because the refresh cadence absorbs the wait.** The three days are real but not billable.
- **Delay subtotal = £0**  · Source: no penalty clause in the reporting agreement · `[Assumption]`

## 6. Failure and rework
- **Rework loop:** 25% of drafts bounce at senior review × +180 min redo = 0.25 × 180 × £2.00 = **£90**  · Source: senior's returned-drafts log, Q4 · `[Fact]` (0.7)
- **Escaped failure:** a *material* risk missed and shipped to the operator → mispriced SLA / reputational cost. Azraq has no historical rate or £ figure yet. **Flagged `[Hypothesis]`.** The two numbers to get: how often a material miss has occurred (returned-report + incident records); the £ cost when it did (one remediation/dispute).

## 7. Total — current priced practice per unit
- **Total = touch £730 + handoff £140 + delay £0 + rework £90 + escaped-failure (unpriced, flagged) = £960 per report**
- Reconciles to the observed analyst-day: 365 + 70 + 45 (expected rework) = 480 min = 8 hr × £120 = £960. Now itemised and sourced.
- This £960 is the number `physics-floor-gap` divides against the floor.

## 8. Cost concentration
- Ranked: 1) Drafting **£300 (31%)**  2) Reconcile data-rights £160  3) Format/QA £120.
- **Dominant step: drafting (£300).** That is the step the product attacks first.
- Foreshadow for the floor: automatable part (→ floor A) = drafting + log pull + formatting; irreducible judgment (→ floor B) = the 20-min senior materiality sign-off (£40).

## 9. Map-readiness verdict
- **This map is: READY.** Every priced line sits on a timesheet or an observed run (ladder 0.7); the dominant line (drafting) is sourced.
- The only weak item is the escaped-failure tail, tagged `[Hypothesis]` — it sits *outside* the £960 priced total, so the total holds. It is an upside-risk number to price before betting the product on the current-cost figure being complete.
- What would change the total: timing the senior sign-off on a real report (it drives floor B downstream); pricing the failure tail; removing the operator-data chase (handoff £140) with a direct feed.

**Hand-off:** current cost = **£960/report**, dominant automatable line = drafting (£300), irreducible judgment = senior sign-off (£40, 20 min). Run `physics-floor-gap` next.
