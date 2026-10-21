# Problem Quality Scorecard — Barrier Intelligence (worked)

**Fellow / venture:** Barrier Intelligence (oil & gas safety)
**Date:** 2026-07-20

> All numbers here are synthetic, domain-plausible test fixtures — not real client
> data. They exist to show the mechanic, not to report a finding.

## The one problem (a pain, not a feature)

> On offshore gas platforms, control-room operators miss early gas-leak indicators
> that sit buried across permit-to-work logs and sensor feeds; each missed
> indicator that escalates costs an unplanned shutdown or a safety incident.

This is a pain (missed indicators, escalations), not a feature. It scores.

---

## Scorecard

| # | Dimension | Score | Evidence cited + rung | Conf | Cheapest test to raise it |
|---|---|---|---|---|---|
| 1 | Frequency | **4** | `[Fact]` Pilot logs show 6-11 flagged gas indicators per 12-hour shift across 3 rigs (rung: behaviour → ceiling 4) | H | Tie each flagged indicator to a cost line → moves to money, ceiling 5 |
| 2 | Budgeted pain | **5** | `[Fact]` Operator already pays 2 senior engineers to hand-review permit logs, plus a SCADA-alarm vendor contract (rung: money) | H | Already at ceiling; confirm the spend is redirectable to us |
| 3 | Severity | **3** | `[Fact]` One unplanned shutdown ≈ $1.2M/day; `[Fact]` regulator fine schedule for a missed gas event (rung: artefact for the schedule; no paid loss is evidenced) | M | Obtain documented actual loss or measured consequence |
| 4 | Data exhaust | **4** | `[Fact]` Each alert + operator response builds a labelled incident dataset (rung: behaviour); `[Hypothesis]` it compounds into a moat | M | Show a second operator's model improving on rig-1 data → proves compounding |
| 5 | Structural persistence | **4** | `[Fact]` Offshore gas-detection duty rooted in physics + safety regs in force 20+ years (rung: behaviour-of-the-world; forward-looking, so caps at 4) | H | Structural cap; no test raises past 4 honestly |
| 6 | Buyer clarity | **3** | `[Fact]` Named offshore HSE manager holds the budget and signed the unpaid pilot PO (rung: artefact, ceiling 3) | H | Verify payment and actual authority; another signature does not turn a document into paid spend |
| 7 | Wedge sharpness | **4** | `[Fact]` First slice = permit-to-work gas conflicts on one operator's 3 rigs, a workflow incumbents ignore; pilot is live on that slice (rung: behaviour) | M | Win the same slice on a second operator → defends the wedge |
| 8 | Founder asymmetry | **3** | `[Fact]` Signed data-rights clause granting Barrier exclusive use of the pilot operator's rig logs (rung: artefact — signed, unproven as durable) | M | Convert exclusivity into observed switching cost or a second operator signing → behaviour, ceiling 4 |

**Opinion-capped dimensions (flagged):** none.
**Total: 30 / 40**

---

## Gate

- [x] Total 30 falls in 28–31 → **REDESIGN** under the studio rubric.

**Verdict:** REDESIGN. The unpaid PO caps buyer clarity at 3; a fine schedule without a paid loss cannot earn money-grade severity. Prioritize verifying the magnitude of actual consequences and collected pilot spend. The evidence gaps, not polished wording, must change before rescoring. These synthetic fixtures illustrate the rubric, not a real venture verdict.
