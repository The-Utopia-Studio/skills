# Scoring rubric

**Everything in this file is a provisional calibration default, not a scientifically validated threshold.** These numbers exist to give a consistent starting structure — recalibrate them against real QSP history for the specific environment before relying on them operationally. Say so explicitly whenever a score is presented against uncalibrated defaults.

## Why gates-then-factors, not a weighted composite

An earlier version of this skill scored a fixed weighted composite across three dissimilar dimensions (cryptographic posture, a separate behavioral-trust product, and QSP). That structurally capped QSP's contribution to roughly 40-44 points out of 100 regardless of how strong its own evidence was, because it was competing for a fixed share of weight against dimensions outside its control. This skill is QSP-only — there is nothing else to weight against — so the scoring model is a single product's own evidence strength, gated before it can be scored, not summed against unrelated axes.

## Gates

Must **all** pass before any finding can be scored above Insufficient Evidence:

1. **Reliable baseline exists** for this signal category, in this context (workload, deployment version, time-of-day/seasonality, environment). A baseline collected under one workload or environment may not generalize to another — verify it applies to the context being evaluated, don't assume it does.
2. **Deviation is reproducible** — confirmed under replay or repeated observation, not a single unexplained blip.
3. **The most plausible benign causes have been checked** — see [false-positive-handling.md](false-positive-handling.md). Not assumed absent; actually checked.

A finding that fails any gate stays at Insufficient Evidence no matter how dramatic the raw deviation looks.

## Factors (scored only once gated)

| Factor | Points | Basis |
|---|---|---|
| Corroboration breadth | 0–40 | 1 signal category = 10; 2 independent categories, same trigger/window = 25; 3+ independent categories = 40 |
| Magnitude | 0–30 | Per-category tiered bands below, combined by the rule below when multiple categories fire |
| Trigger specificity & trajectory | 0–30 | Diffuse and stable = 5; narrow/specific trigger, stable volume = 15; narrow/specific trigger and growing/spreading over time = 30 |

**Total: 0–100.**

Note the deliberate asymmetry: a narrow, trigger-specific deviation scores *higher* than a diffuse, environment-wide one at the same magnitude. This is intentional — a condition-gated deviation is more consistent with deliberately introduced logic than organic variance, which tends to be diffuse. Don't let a large diffuse number outscore a small but precisely-triggered one without checking which pattern the evidence actually shows.

### Magnitude — one tiered band per signal category

Every signal category defined in `SKILL.md` has a deterministic magnitude method below. **These bands are provisional calibration defaults, not scientifically validated thresholds** — recalibrate them against real QSP runs for the environment in question.

| Category | Low (5) | Medium (15) | High (30) |
|---|---|---|---|
| Execution-timing | <2x baseline duration | 2–10x baseline duration | >10x baseline duration |
| Resource-utilization | <2x baseline for the relevant metric (CPU, memory, I/O, handle count) | 2–10x baseline | >10x baseline, or growth not reclaimed across normal GC/cleanup cycles (a leak-like pattern rather than a transient spike) |
| Process/system-behavior | A single anomalous process/task/service event, observed once, not yet reproduced | A reproducible anomalous event (e.g. a recurring unexpected process spawn or scheduled-task creation), otherwise unexplained | Reproducible **and** self-concealing or self-reverting (e.g. a scheduled task or config change that reappears after being reverted, or is restored to its original state after use), **or** the event sits entirely outside the component's documented function (disabling logging, modifying security tooling, spawning a shell) |
| Network/egress metadata | Contact with an endpoint outside the documented dependency list, but otherwise unremarkable | Contact with a novel, undocumented endpoint, with no plausible legitimate explanation identified | Novel undocumented endpoint **plus** at least one additional red flag — high query-name entropy/DGA-like pattern, or the endpoint's registration/provisioning postdates the deviation's onset by only a few days (a staged-ahead-of-time pattern) |
| Cryptographic-operation behavior | <2x baseline deviation in timing/frequency of crypto-operation calls | 2–10x baseline deviation | >10x baseline deviation, or invocation from a caller/process/context never observed at baseline for that operation |

### Combining magnitude across multiple categories (Q3)

When ≥2 signal categories deviate simultaneously and independently pass gates 1–3, the Magnitude factor score is the **highest** of the per-category magnitude scores among those categories — **never summed**.

Why max, not sum: Corroboration breadth (the separate 0–40 factor above) already rewards the *number* of independently corroborating categories. Summing magnitude across categories on top of that would double-count the same breadth signal inside two different factors, inflating scores for reasons unrelated to how severe any individual piece of evidence actually is. Magnitude answers "how severe is the single most severe piece of evidence," not "how many severe things are there" — breadth already answers the second question.

## Evidence ladder

| State | Criteria |
|---|---|
| Insufficient Evidence | No reliable baseline, or a single unreplicated observation |
| Anomalous (Unconfirmed) | Reproducible deviation from a reliable baseline, one signal category, benign causes not yet fully checked |
| Anomalous (Corroborated) | Reproducible deviation confirmed across ≥2 independent signal categories on the same trigger/window, **or** one category with benign causes actively checked and ruled out |
| Confirmed Execution-Compromise Indicator | Multiple independent signal categories deviate together, causally tied to an identifiable trigger or change, benign causes ruled out, pattern inconsistent with the component's documented/intended function |

Named "Indicator" deliberately: the top rung confirms the *evidence*, not that a compromise occurred. QSP characterizes; it does not verdict.

## Decision thresholds

**These score bands are provisional calibration defaults, exactly like the Magnitude bands and the other scoring factors above — not scientifically validated thresholds.** They require calibration against real QSP runs before being trusted operationally, and every brief presenting a recommendation should say so.

| Score | QSP recommends |
|---|---|
| 0–24 | Monitor |
| 25–49 | Flag for review |
| 50–74 | Escalate for investigation |
| 75–100 | Escalate — containment recommended |

These are recommendations for a downstream decision-maker or process, not an order QSP issues on its own authority.

## Overrides

Named, explicit, and must be stated in the brief whenever applied — never a silent score bump:

- **Trajectory override (Branch Q5):** the deviation's volume, scope, or magnitude is growing or spreading over time, rather than static or intermittent → justifies recommending above what the raw score alone would indicate.
- **Criticality override (Branch Q6):** the affected component is pre-designated as critical (payment processing, auth-adjacent infrastructure, safety-critical control) → same.

A finding can trigger both overrides simultaneously — they are independent checks, not alternatives.
