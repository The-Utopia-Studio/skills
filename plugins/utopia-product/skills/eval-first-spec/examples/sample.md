# Worked example — Mentix v1 spec (shift-handover machine-risk digest)

Mentix builds industrial AI for factory operations. This is a test fixture: numbers are illustrative, not real client data. Every dollar figure is tagged `[Assumption]` unless a probe produced it.

## Input the fellow brought

"The wedge passed. At each shift handover the supervisor gets a ranked list of the machines most likely to stop this shift. We replayed historical sensor logs against the maintenance log on 3 lines to build it. Spec the v1 — how do we know it works and what does it cost?"

Artefacts on the table:
- A concierge replay of **60 historical shifts** across 3 production lines: each shift's sensor-log window paired with the maintenance record of what actually caused an unplanned stop that shift (ground truth). [Fact]
- Every digest export is already logged in Mentix's event stream. [Fact]
- Supervisors read the draft digest for ~3 min at handover. [Fact]
- Illustrative plant figures: one unplanned stop ≈ $8,000; loaded supervisor rate ≈ $45/hr. [Assumption]

---

## Part 1 — The job line

**At each shift handover, the outgoing line supervisor gets a ranked list of the ≤5 machines most likely to cause an unplanned stop this shift, each with the one sensor reading that triggered the flag — judged pass if the machine that actually caused a stop was in the list (with the correct sensor cited), or the shift was clean and the list said "no elevated risk".**

**Outcome unit:** one shift-handover digest delivered before handover and read by the supervisor.

Passes the job-line test: who (outgoing supervisor), single output (ranked ≤5 list + trigger sensor), recurring trigger (shift handover), and a judged-by clause that scores one instance against the maintenance log.

---

## Part 2 — The 20 golden cases

Drawn from the 60-shift replay. First draft had only **11** real scenarios — under the 14 floor. The correct move was not to invent 9; it was to extend the replay window from 40 to 60 shifts, which surfaced 5 more real distinct scenarios. The 4 constructed cases below are fault-injections (16, 17, 18, 20), which are legitimately built, not padded happy paths.

| # | Band | Input (from the replay unless noted) | Pass condition | Source | Mode it can hit |
|---|---|---|---|---|---|
| 1 | Typical | Conveyor C, bearing-temp rising over 3 shifts, then stopped | C in top-5, cited sensor = bearing temp | [Fact] | Miss |
| 2 | Typical | Clean shift, all sensors nominal, no stop | Digest returns "no elevated risk" | [Fact] | False alarm |
| 3 | Typical | Press B, hydraulic-pressure drop, stopped | B in top-5, cited = hydraulic pressure | [Fact] | Miss |
| 4 | Typical | Robot arm R, moderate vibration signal, stopped | R in top-5 | [Fact] | Miss |
| 5 | Typical | Pump P flagged, self-recovered, no stop | If listed, ranked low; digest readable | [Fact] | False alarm |
| 6 | Typical | Two-line shift, Mixer M stops on Line 2 | M in top-5 for the correct line | [Fact] | Confidently wrong |
| 7 | Edge | 20-min sensor dropout on Conveyor C mid-shift, then a stop | C flagged as "elevated, degraded data", not dropped silently | [Fact] | Silent failure / Miss |
| 8 | Edge | New machine, only 4 shifts of history, caused a stop | Flags on absolute threshold OR states "insufficient history for X" | [Fact] | Miss / Wrong format |
| 9 | Edge | Two machines fail same shift (Press B + Pump P) | Both in top-5 | [Fact] | Miss |
| 10 | Edge | Overtime shift cut to 3 hrs, early handover | Digest delivered at the early handover, correct window | [Fact] | Too slow |
| 11 | Edge | Sensor recalibration step-change that mimics a fault | Not flagged, or flagged low with recalibration note | [Fact] | False alarm |
| 12 | Edge | Stop caused by operator error, no sensor precursor | Digest shows no machine flag — not machine-predictable | [Fact] | Confidently wrong |
| 13 | Edge | Slow degradation over 6 shifts, crosses the window boundary | Cited on the shift it actually stopped; trend acknowledged | [Fact] | Miss |
| 14 | Adversarial | Real look-alike of case 1 (bearing-temp rise) that self-corrected, no stop | Not over-generalised into a confident flag; ranked appropriately | [Fact] | False alarm |
| 15 | Adversarial | Stop with a novel signature absent from the 60-shift history | Acceptable as a Miss only if marked "low confidence / novel"; never a confident "clean" | [Fact] | Confidently wrong / Silent |
| 16 | Adversarial | Corrupted/empty log file fed at handover (injected) | Emits explicit "digest could not be produced — check feed"; never an empty "all clear" | [Assumption] | Silent failure |
| 17 | Adversarial | Log arrives 90 s before handover (injected) | Ready within deadline, or emits "not ready — using last-known" flag | [Assumption] | Too slow |
| 18 | Must-refuse | Request for a 7-day-ahead forecast (injected) | Refuses; states scope is this shift only | [Assumption] | Wrong format / scope |
| 19 | Must-refuse | A line with all sensor feeds down | Refuses to rank that line; "no signal, cannot assess"; no fabricated cause | [Fact] | Silent failure |
| 20 | Must-refuse | Two lines' logs merged, no line ID (injected) | Refuses to attribute; asks for line ID; does not guess | [Assumption] | Confidently wrong |

**Set checks:**
- Real (`[Fact]`) count: **16 / 20** — clears the 14 floor.
- Every mode covered: Miss (1,3,4,7,8,9,13,15) · False alarm (2,5,11,14) · Confidently wrong (6,12,15,20) · Wrong format (8,18) · Too slow (10,17) · Silent failure (7,16,19). All six reachable.
- Band floors met: Typical 6 · Edge 7 · Adversarial 4 · Must-refuse 3. Yes.

---

## Part 3 — Autonomy level + failure taxonomy + derived rates

**Chosen level: L1 — Drafts.** The system drafts the ranked digest; the supervisor reads it at handover and decides whether to inspect.

**Why not lower:** L0 is a raw sensor dashboard, which the plant already has and ignores; the job is the ranked, reasoned ≤5 list. **Why not higher:** L2+ means the system schedules an inspection or slows a line on its own. Blast radius is high and no measured pass rate has earned it. Earn it, do not assume it.

| Mode | Looks like here | cost_of_one_failure | tolerable_cost_per_cycle | acceptable_rate ≤ |
|---|---|---|---|---|
| Miss | Machine stopped, not in top-5 | ≈ $8,000 (one stop) [Assumption] | $400/shift [Assumption] | **5%** (400 ÷ 8,000) |
| False alarm | Flagged, no stop | ≈ $7.50 (10-min wasted inspection) [Assumption] | $1.13/shift [Assumption] | **15%** (1.13 ÷ 7.50) |
| Confidently wrong | Right machine, wrong sensor cited | trust decay → one ignored future flag | proxy: ≤ 1 in 10 flags | **10%** (trust proxy) |
| Wrong format | Not the ranked ≤5 shape / unreadable | one unread digest | near-zero | **2%** |
| Too slow | Arrives after handover | one unusable digest | near-zero | **2%** |
| Silent failure | Empty digest read as "all clear" | worst at L1: false safety | near-zero | **0.5%** (+ mandatory heartbeat "no digest" signal) |

Rates are derived from cost_of_one_failure, not chosen for comfort. Miss is the tight one because one stop is dear; Silent failure is tightest because at L1 an empty output is read as safety.

**Gate to earn L2 (auto-schedule an inspection):** Miss rate ≤ 3% AND False-alarm rate ≤ 10%, measured over 40 real shifts, before the system is allowed to act without a per-item human read.

---

## Part 4 — Cost-per-outcome budget

Outcome = one shift-handover digest delivered and read.

> cost_per_outcome = (C_attempt × A) + C_human + C_remediation

| Term | Value | Source |
|---|---|---|
| C_attempt (model + infra, one digest) | $0.15 | [Assumption] |
| A (mean attempts, retries in) | 1.1 | [Assumption] |
| C_attempt × A | $0.17 |  |
| C_human (3 min × $45/hr) | $2.25 | [Assumption] |
| C_remediation (15% accepted false-alarm × $7.50 wasted inspection) | $1.13 | [Assumption] |
| **cost_per_outcome** | **$3.55 / shift** |  |

**Economic gate:**
- value_per_outcome ≈ **$900 / shift** — base rate of a preventable stop ≈ 1 in 8 shifts (0.125) × recall 0.9 × $8,000. [Assumption]
- cost ($3.55) **<** value ($900): **PASS**
- Margin ≈ **250×**. Comfortable, and the sensitivity is on recall and stop-value, not on the $3.55 — worth pinning both with a real pilot before scaling.

Note the Miss cost lives on the value side, not the cost side: a Miss is value not captured, so it drags value_per_outcome down (via recall), it is not a cash line in cost_per_outcome. Keeping the two apart is what stops double-counting.

---

## Kill-line check

- [x] 20 golden cases, floors met, 16 `[Fact]`, all six modes covered
- [x] Job line has a checkable judged-by clause (against the maintenance log)
- [x] L1 chosen; rates derived from cost_of_one_failure; L2 gate stated
- [x] cost_per_outcome = $3.55 to the cent, checked against $900 value

Spec ships. Build at L1, instrument the golden-set pass rate from shift one, and hold the L2 gate until 40 shifts prove the Miss rate.

## The lesson this enforces

The draft that would have failed: 11 real scenarios padded to 20 with invented inputs, a chosen "1% error rate" with no cost behind it, and "$0.02 per call" standing in for the budget. The skill blocks all three — extend the real replay instead of inventing, derive the 5% Miss rate from the $8,000 stop, and price the whole outcome at $3.55 including the 3 human minutes and the false-alarm remediation. That is the difference between a spec you can score and a template you can only admire.
