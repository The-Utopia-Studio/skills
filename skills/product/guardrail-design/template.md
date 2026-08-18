# Guardrail Spec — <product name>

**Fellow:** <name> · **Date:** <date> · **Stage:** commit-build v1 · **Autonomy level (from eval-first-spec):** <L0–L4>

## A. Inputs from eval-first-spec

Do not fill the rest of this template until these exist. If any cost-of-one-failure is
blank, that mode cannot be sized — route back to `eval-first-spec`. Do not invent costs.

| Failure mode | Cost of one failure | Acceptable rate (derived) | Source rung |
|---|---|---|---|
| <e.g. Miss> | <e.g. loss of life / rig — effectively unbounded> `[Assumption]` | <→ 0> | <artefact 0.5 / opinion 0.1> |
| <e.g. False alarm> | <e.g. crew stop 20 min × N> `[Assumption]` | <e.g. ≤ 8%> | <rung> |
| <mode 3> | ... | ... | ... |

Ladder: money 1.0 · behaviour 0.7 · artefact 0.5 · verbal 0.3 · opinion 0.1. A
cost-of-error scored on opinion (0.1) cannot size a guardrail; push it to an incident,
a regulation, or a measured rate.

## B. Cost × volume matrix

Band each mode, then read off its class from the grid.

| Failure mode | Cost band (Cat/High/Low) | Volume band (Low/High) | Volume basis | Quadrant → class |
|---|---|---|---|---|
| <Miss> | Catastrophic | Low (true hazards rare) | <e.g. handful/yr> `[Assumption]` | Q1 |
| <False alarm> | High | High (noise constant) | <e.g. dozens/day> `[Assumption]` | Q4 |
| <mode 3> | ... | ... | ... | Q_ |

```
                Volume Low (reviewable)          Volume High (not fully reviewable)
Catastrophic    Q1 code block + sign-off,        Q2 code block + conservative τ +
                confidence never gates,             human on flagged, monitor,
                FAIL-SAFE                            FAIL-SAFE
High            Q3 τ gate + sign-off below τ,     Q4 code rules + τ gate, human on
                FAIL-SAFE                            exceptions, rate alarm, FAIL-SAFE
Low             Q5 τ gate + log, no human,        Q6 code rules only, accept residual,
                FAIL-OPEN                            monitor aggregate, FAIL-OPEN
```

Volume line: can one reviewer attend to *every* instance of this mode within its SLA?
Yes → Low. No → High. Two laws: (1) a Catastrophic/High mode never rests on confidence
alone; (2) a Low-cost mode carries no per-item human review. Same class in every row is
a KILL.

## C. Three-layer stack per mode

Layers run in order; layer 1 always runs. Mark which layers are active and the fail-mode.

| Failure mode | L1 rules in code (the deterministic check) | L2 confidence threshold (active? τ) | L3 human sign-off (active? trigger) | Fail-mode |
|---|---|---|---|---|
| <Miss> | <hard-limit block, e.g. reading > LEL → fire unconditionally> | no — never gate a catastrophe on a score | on the risky action | fail-safe |
| <False alarm> | <de-dupe, cooldown, zone denylist> | yes — τ = <__> | on flagged exceptions only | fail-safe on action |
| <Low mode> | <schema/format> | yes — τ = <__> | no | fail-open |

L2's score must be independent of the reasoning model (a judge or a historical
pass-rate lookup), not the model grading itself.

## D. Confidence-threshold derivation

For each mode with L2 active. τ is derived, not chosen.

> τ = lowest score whose calibration bucket, and every bucket above it, shows measured
> failure rate ≤ acceptable_rate(mode).

| Mode | acceptable_rate | Calibration source | Score bucket that clears it | τ | Rung |
|---|---|---|---|---|---|
| <False alarm> | <≤ 8%> | <golden set, N cases> | <≥ 0.86 bucket: 6% fail> | <0.86> `[Fact]` | behaviour 0.7 |
| <mode> | ... | <none yet> | — | <owed> `[Hypothesis]` | opinion 0.1 |

No calibration curve → τ is `[Hypothesis]`; route the whole mode to human sign-off until
the curve exists. Never ship a felt τ on a Catastrophic/High mode.

## E. Human sign-off spec

Every Catastrophic and High mode must appear here, or the kill line fails.

| Sign-off | Trigger (mode × confidence band) | Reviewer (one role) | SLA | Fail-mode on timeout |
|---|---|---|---|---|
| <Dismiss potential hazard> | <auto-dismiss soft anomaly in manned zone> | <shift safety engineer> | <5 min> | fail-safe: alert stays open |
| <sign-off 2> | ... | ... | ... | ... |

## F. Guardrail cost → cost-per-outcome

| Line | Value | Note |
|---|---|---|
| Flagged volume (per period) | <e.g. 30/day> `[Assumption]` | what actually reaches a human |
| Review minutes each | <e.g. 3 min> | one reviewer, one SLA |
| Loaded reviewer rate | <e.g. $__/hr> `[Assumption]` | |
| Guardrail cost per outcome | <$__> | add to eval-first-spec cost-per-outcome |
| Fits the budget? | yes / no | if no: tighten flagging, lower autonomy, or the wedge is not economic — do NOT widen τ to fit |

## Kill line — self-check before returning

- [ ] Not one-size. The matrix (B) does not put the same class in every row. A single
      uniform stack across all modes is an automatic KILL.
- [ ] Every Catastrophic and High mode has a deterministic code block OR a human sign-off
      trigger in (E) — never model confidence alone. A high-cost / low-confidence path with
      no sign-off is an automatic KILL.
- [ ] Every Catastrophic/High mode fails **safe**. No high-cost path fails open.
- [ ] Every active τ (D) is derived from an acceptable rate against a calibration curve, or
      is tagged `[Hypothesis]` and routed to human in the interim. No felt thresholds.
- [ ] Low-cost modes carry no per-item human sign-off (that review is waste and will be
      dropped).
- [ ] L2's confidence score is independent of the reasoning model, not self-grading.
- [ ] Guardrail cost (F) is written back into cost-per-outcome and fits the budget.
- [ ] Every cost, volume, rate, and threshold is tagged `[Fact]`/`[Assumption]`/
      `[Hypothesis]`. No number invented that the fellow did not provide.
