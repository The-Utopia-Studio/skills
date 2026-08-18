# Worked example — Mentix

Fellow: **Mentix** (industrial AI, factory operations). Numbers are illustrative test fixtures, not client data.

The product is an AI copilot for factory managers. The first task handed to an agent: triage the plant's incoming maintenance work orders — read each order, classify fault type, set priority, and route to the right crew. One triaged work order = one outcome.

## 0. Setup

Steps: (1) read work order + attached sensor log → (2) classify fault type → (3) set priority → (4) route to crew.
Exceptions carried in from the concierge run: null sensor reads, orders with no fault code, dual-fault orders.

Rates: input $3 / 1M, output $15 / 1M, tool calls $0.02 each, human-fix $1.20 / min (loaded).

## 1. Run log (10 runs)

| Run | In tokens | Out tokens | Tool calls | Human-fix min | Outcome |
|---|---|---|---|---|---|
| 1 | 9,200 | 1,100 | 3 | 0 | ok |
| 2 | 8,800 | 900 | 2 | 0 | ok |
| 3 | 12,400 | 1,600 | 4 | 4 | ok (no fault code — human classified) |
| 4 | 9,000 | 1,000 | 3 | 0 | ok |
| 5 | 15,100 | 2,000 | 5 | 6 | ok (dual-fault — human split it) |
| 6 | 8,900 | 950 | 2 | 0 | ok |
| 7 | 9,300 | 1,050 | 3 | 0 | ok |
| 8 | 11,800 | 1,400 | 4 | 3 | failed (null read → wrong priority, caught) |
| 9 | 9,100 | 1,000 | 3 | 0 | ok |
| 10 | 9,000 | 980 | 3 | 0 | ok |

Successful outcomes: 9 (run 8 failed; its tokens still count).

## 2. Cost-per-outcome

| Component | Total | × rate | Cost |
|---|---|---|---|
| Input tokens | 102,600 | ÷1M × $3 | $0.308 |
| Output tokens | 11,980 | ÷1M × $15 | $0.180 |
| Tool calls | 32 | × $0.02 | $0.640 |
| Human-fix minutes | 13 | × $1.20 | $15.60 |
| **Total across 10 runs** | | | **$16.73** |

CPO = $16.73 ÷ 9 = **$1.86 / triaged order** [Fact]

Read: model tokens are cheap ($0.05/order); the cost lives in human-fix minutes ($1.73/order, 93% of the total). Sanity check (both in USD so "flag if CPO > price" is unambiguous): the concierge customer paid ~$4/order — CPO ($1.86) sits under it, but only because failures were caught for free by the founder.

## 3. Frontier map

| Step | Green | Amber | Red | Note |
|---|---|---|---|---|
| 1 read order + log | ✓ | | | reliable except null reads |
| 2 classify fault | | ✓ | | reprompt needed on odd codes |
| 3 set priority | | | ✓ | null reads → wrong priority; human takeover |
| 4 route to crew | ✓ | | | reliable |

Red step on the critical path: **priority-setting when sensor data is null or missing**. That is the frontier.

## 4. Read-out (honesty contract)

Honest about:
- Cost-per-outcome: [Fact] $1.86 / triaged order, 93% of it human-fix time.
- Frontier: [Fact] the agent triages clean orders unaided; it cannot set priority on null/missing sensor data without a human. Dual-fault and no-code orders need a human today.

Must NOT claim:
- Self-serve UX: [Hypothesis, not tested] the founder drove the agent and caught the failure.
- Trust / adoption: [Hypothesis, not tested] whether the plant manager would trust agent-set priorities is a concierge/field question.

## 5. Decision
CPO ($1.86) is under the concierge price, but the human-fix share means it is not truly automated. Frontier verdict: automatable after the null-read priority step is solved (better sensor validation, or route those orders to a human by rule). Next move: fix the red step, re-run, and re-price; send the trust question to a field probe.
