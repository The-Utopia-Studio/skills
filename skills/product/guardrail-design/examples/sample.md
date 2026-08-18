# Guardrail Spec — Barrier Intelligence, gas-safety alerting

**Fellow:** Barrier Intelligence · **Date:** 2026-07 · **Stage:** commit-build v1 · **Autonomy level (from eval-first-spec):** L1 (system raises alerts; a control-room operator acts on the physical world)

> All numbers below are illustrative test-fixture values, tagged for source. None are
> real client data. The point is the shape of the reasoning, not the magnitudes.

The product ingests field sensor logs and permit data from a manned offshore platform and
raises gas-safety alerts. The fellow arrived asking "where do we put a human in the loop,
and how do we stop it spamming the crew?" — two questions the matrix answers differently.

## The finding that reframes it

For a safety product the dangerous auto-action is not *alerting* — it is *suppression*.
Raising a false alert costs a work-stoppage; suppressing a real one costs the platform.
So the guardrail is not "should a human approve each alert" (there could be thousands). It
is "the system may never auto-dismiss a potential hazard without a code block or a human,
and it may auto-alert freely." That inverts where the sign-off goes.

## A. Inputs from eval-first-spec

| Failure mode | Cost of one failure | Acceptable rate (derived) | Source rung |
|---|---|---|---|
| Miss (real hazard not alerted) | Loss of life / rig — treat as unbounded `[Assumption]` | → 0 | regulation + incident history, artefact 0.5 |
| False alarm (alert on a non-hazard) | Crew stop ~20 min × 8 crew × loaded rate ≈ low $, but alert fatigue compounds into Misses `[Assumption]` | ≤ 8% of alerts | field log of past alerts, artefact 0.5 |
| Silent failure (pipeline dies, stops evaluating) | Equivalent to a Miss across the whole platform — unbounded `[Assumption]` | → 0 | reasoning `[Assumption]` |
| Too slow (alert past the response deadline) | A late gas alert is a Miss — unbounded `[Assumption]` | → 0 | permit response-time spec, artefact 0.5 |

## B. Cost × volume matrix

| Failure mode | Cost band | Volume band | Volume basis | Quadrant → class |
|---|---|---|---|---|
| Miss | Catastrophic | Low (true hazards ~handful/yr) | ~4/yr on this platform `[Assumption]` | Q1 |
| False alarm | High (fatigue → Miss) | High (sensor noise constant) | ~4,000 evals/hr, dozens of soft anomalies/day `[Assumption]` | Q4 |
| Silent failure | Catastrophic | Low (a pipeline either runs or it doesn't) | continuous `[Fact]` (it's a heartbeat) | Q1 |
| Too slow | Catastrophic | High (every eval has a deadline) | ~4,000 evals/hr `[Assumption]` | Q2 |

```
                Volume Low                        Volume High
Catastrophic    Q1  Miss, Silent failure          Q2  Too slow
High                                                Q4  False alarm
Low             —                                  —
```

Four modes, three distinct classes. A single uniform stack would either drown the crew
(human-approve every alert) or gate a catastrophe on a confidence score. Neither survives.

## C. Three-layer stack per mode

| Failure mode | L1 rules in code | L2 confidence threshold | L3 human sign-off | Fail-mode |
|---|---|---|---|---|
| Miss | Reading > LEL hard limit → alert fires unconditionally, no model in the path | no — a catastrophe is never gated on a score | on any proposal to auto-dismiss a soft anomaly in a manned zone | fail-safe |
| False alarm | De-dupe + cooldown per sensor; zone denylist (never suppress in a manned high-consequence zone) | yes — τ suppresses soft-anomaly noise below the score | on flagged exceptions only (below τ in a manned zone) | fail-safe on the suppression |
| Silent failure | Heartbeat: no eval in 60 s → page on-call, mark platform "unmonitored" | no | on-call ack required | fail-safe (platform treated as at-risk) |
| Too slow | Hard deadline timer per eval; miss → escalate as if positive | no | operator ack | fail-safe (treated as a hazard) |

L2's score is an independent anomaly-detector calibrated on labelled history, not the
alerting model grading itself — matching the architecture rule that component 4 ≠ 3b.

## D. Confidence-threshold derivation (False alarm only)

τ governs one decision only: whether a *soft* anomaly (pattern resembles a slow leak, no
hard-limit breach) is suppressed as noise or raised. Because a suppressed soft anomaly can
be a Miss, the acceptable rate that τ must clear is the Miss rate (→ 0), not the False-alarm
rate. That forces τ conservative: almost anything ambiguous is raised, not suppressed.

| Mode | acceptable_rate for the suppression | Calibration source | Bucket that clears it | τ | Rung |
|---|---|---|---|---|---|
| False alarm (suppress soft anomaly) | Miss among suppressed → ~0 | 20 golden cases + 6 mo labelled soft anomalies | only the ≥ 0.97 bucket showed 0 later-confirmed hazards | 0.97 `[Assumption]` (curve is illustrative) | behaviour 0.7 |

Reading: the system may auto-suppress a soft anomaly only when the independent detector
scores ≥ 0.97 *and* the zone is unmanned. Everything else is raised or routed to sign-off.
If the six-month curve did not exist, τ would be `[Hypothesis]` and every soft anomaly
would go to the safety engineer until it did.

## E. Human sign-off spec

| Sign-off | Trigger | Reviewer | SLA | Fail-mode on timeout |
|---|---|---|---|---|
| Dismiss potential hazard | System proposes to auto-dismiss a soft anomaly in a manned high-consequence zone (below τ, or any zone denylist hit) | Shift safety engineer | 5 min | fail-safe: alert stays open and visible |
| Unmonitored platform | Heartbeat miss → platform marked unmonitored | On-call engineer | 2 min | fail-safe: crew told monitoring is down |

No sign-off is placed on *raising* an alert — that path is cheap and fail-safe already.
Sign-off is spent only on the one expensive, irreversible decision: closing a hazard.

## F. Guardrail cost → cost-per-outcome

| Line | Value | Note |
|---|---|---|
| Flagged volume | ~30 dismissal reviews/day `[Assumption]` | soft anomalies in manned zones below τ |
| Review minutes each | 3 min | one safety engineer |
| Loaded reviewer rate | $95/hr `[Assumption]` | |
| Guardrail cost | ~$142/day/platform `[Assumption]` | ≈ $0.036 per sensor-hour of coverage |
| Fits the budget? | yes | well under the value of one prevented stoppage, let alone one prevented Miss |

If flagged volume rose to hundreds/day, the fix is a better independent detector (fewer
soft anomalies below τ), not a looser τ — loosening τ trades review cost for Miss risk,
which for a Catastrophic mode is not a trade Barrier may make.

## Kill line — self-check

- [x] Not one-size — three classes across four modes.
- [x] Every Catastrophic/High mode has a code block or a sign-off trigger; the Miss rests on
      the LEL hard-limit, never on a score.
- [x] Every Catastrophic/High mode fails safe; no high-cost path fails open.
- [x] τ derived from the Miss acceptable rate against a labelled curve; would be `[Hypothesis]`
      + human-routed without it.
- [x] No per-item human review on raising alerts (the cheap path).
- [x] L2 score is an independent detector, not the alerting model self-grading.
- [x] Guardrail cost written back to cost-per-outcome and fits.
- [x] Every number tagged; none invented beyond what the fellow's field logs and permits imply.

## What the skill pushed back on

The fellow's opening ask — "have a human approve every alert" — is the uniform stack, and it
fails twice: it is unaffordable at 4,000 evals/hr, so in practice the approval gets skipped,
and it guards the wrong action (alerting is cheap; suppression is the risk). The skill declined
the framing, moved the single human sign-off onto the dismissal decision, and put the Miss
behind a deterministic hard-limit that no confidence score may override.
