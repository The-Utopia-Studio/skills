# Common mistakes

1. **Anomaly = attack.** A deviation means "differs from baseline." It does not establish why. Don't let a brief collapse that gap.

2. **One measurement becomes the verdict.** Timing, CPU, memory, cache behavior, or DNS entropy alone almost always has a benign explanation — they're inputs to correlation across signal categories, not verdicts on their own.

3. **Trusting a component's own self-reported telemetry as ground truth.** It's a signal to verify against independent categories, not an authoritative source — a covert channel can be shaped to look exactly like a product's legitimate diagnostic schema.

4. **Correlation without causation.** Two signal categories deviating together increases investigative value but does not automatically prove one caused the other, or that either is malicious.

5. **Ignoring legitimate change.** Deployments, configuration changes, feature flags, scaling, dependency updates, and maintenance can all produce legitimate execution/resource/network changes — check the false-positive taxonomy before escalating.

6. **Poor baselines.** A baseline collected under one workload, deployment version, environment, or time period may not remain valid under another — verify it applies to the context being evaluated.

7. **Confusing network latency with execution behavior.** Where technically possible, separate network-path variability from local execution measurements — they have different causes and different remediation paths.

8. **Producing a score without the evidence trail.** A number without baseline, deviation, reproducibility, trigger correlation, trajectory, and benign-cause elimination behind it is not operator judgment — it's noise with a decimal point.

9. **Treating a clean compliance or vulnerability scan as proof of safety.** A scan checks configuration; it says nothing about whether the component is doing what it's configured to do at runtime. That gap is this skill's entire reason to exist.

10. **Manufacturing precision.** The scoring point values in this skill are provisional calibration defaults, not validated thresholds — say so when presenting a score, don't present it as more certain than it is.

11. **Ignoring trajectory.** Treating a growing or spreading deviation the same as a static one under-weights urgency; treating a static one as if it were accelerating over-escalates.

12. **Declaring attribution.** QSP does not identify actors, attribution, or intent — never, at any confidence level, under any amount of corroborating evidence. Execution telemetry may support hypotheses about *execution behavior* ("this pattern is consistent with a conditionally-triggered payload"), but that must never be converted into a claim about who did it or why. If a brief starts naming a likely actor, campaign, or motive, that is a failure of this skill, not a strong finding — actor/intent/attribution determination is entirely out of scope, unconditionally.

13. **Ignoring attack-path/criticality relevance.** A small anomaly in an isolated, non-critical component is not equivalent to the same anomaly on a designated-critical path — use the criticality override (Q6) explicitly rather than letting a low raw score understate it.
