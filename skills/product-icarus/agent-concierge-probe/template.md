# Agent Concierge Probe — cost sheet + frontier map

Fill during the runs. No cost-per-outcome number without the breakdown above it.

## 0. Setup (set before you run)

| Field | Value |
|---|---|
| Task (one unit outcome = "one what") | |
| Steps (from the mapped workflow) | |
| Known exceptions carried in (from concierge run) | |

Rates:

| Meter | Unit | Rate |
|---|---|---|
| Input tokens | per 1M | $ |
| Output tokens | per 1M | $ |
| Tool / API calls | per call | $ |
| Human-fix time | per minute | $ (loaded) |

## 1. Run log (N ≥ 5; log failures too)

| Run | In tokens | Out tokens | Tool calls | Human-fix min | Outcome (ok / failed) |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

Successful outcomes: __

## 2. Cost-per-outcome (breakdown first, then the number)

| Component | Total | × rate | Cost |
|---|---|---|---|
| Input tokens | | | $ |
| Output tokens | | | $ |
| Tool calls | | | $ |
| Human-fix minutes | | | $ |
| **Total across runs** | | | **$** |

CPO = total cost ÷ successful outcomes = **$__.__ / outcome** [Fact]

Sanity check vs concierge price paid: __  (flag if CPO > price)

## 3. Frontier map

| Step | Green (unaided) | Amber (retry/verify) | Red (human took over) | Note |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| … | | | | |

Red steps on the critical path: __  (these are the frontier)

## 4. Read-out (honesty contract)

**Honest about — state these:**
- Cost-per-outcome: [Fact] $__ /outcome, breakdown above.
- Frontier: [Fact] red steps are __; the task is / is not automatable end to end because __.

**Must NOT claim — leave out or tag as untested:**
- Self-serve UX: [Hypothesis, not tested] the operator did not drive the agent; you did.
- Trust / adoption: [Hypothesis, not tested] send to a concierge or field probe.

## 5. Decision
- CPO vs value/price: __
- Frontier verdict: automatable now / automatable after the red steps are solved / not yet.
- Next move: __
