---
name: ab-test-analysis
description: >-
  Analyze A/B test or split test results: conversion rates, relative lift, p-value, 95% confidence
  interval, sample size and power, sample ratio mismatch, guardrail metrics, and a ship / extend /
  stop / investigate call. Use whenever the user pastes control and variant numbers (visitors,
  conversions, signups, trials) and asks whether a test is significant, whether the lift is real, or
  whether to ship the variant. Runs a Python calculation when raw data is provided. Not for designing
  what to test before building (use probe-matrix) or setting up event tracking (use
  analytics-tracking).
---

## A/B Test Analysis

Evaluate A/B test results with statistical rigor and translate findings into clear product decisions.

### Context

You are analyzing A/B test results for **$ARGUMENTS**.

If the user provides data files (CSV, Excel, or analytics exports), read and analyze them directly. Generate Python scripts for statistical calculations when needed.

### Instructions

1. **Understand the experiment**:
   - What was the hypothesis?
   - What was changed (the variant)?
   - What is the primary metric? Any guardrail metrics?
   - How long did the test run?
   - What is the traffic split?

2. **Validate the test setup**:
   - **Sample size**: Is the sample large enough for the expected effect size?
     - Plan with baseline conversion `p0`, absolute minimum detectable difference `delta`, target `p1 = p0 + delta`, two-sided alpha (normally 0.05), and desired power (normally 0.80). Validate both probabilities are in (0, 1), delta is nonzero, and the allocation is 1:1 before using this approximation.
     - Let `pbar = (p0 + p1)/2`, `z_alpha = Φ⁻¹(1-alpha/2)`, and `z_power = Φ⁻¹(power)`. Required sample **per arm**, rounded up:
       `n = (z_alpha*sqrt(2*pbar*(1-pbar)) + z_power*sqrt(p0*(1-p0)+p1*(1-p1)))² / delta²`.
     - This is a normal approximation for independent binary outcomes and equal allocation. Use an appropriate power calculation for unequal allocation, clustering, repeated measures or rare events. Do not apply this formula to revenue means.
     - Compare enrollment to the prespecified target/MDE; do not use observed-effect post-hoc power to declare a completed experiment adequate.
   - **Duration**: Did the test run for at least 1-2 full business cycles?
   - **Randomization**: Test sample ratio mismatch (SRM) against the planned allocation; investigate an SRM failure before interpreting treatment effects.
   - **Analysis plan**: Check the prespecified stopping rule, primary metric, and corrections for multiple variants/metrics or repeated looks. A nominal p-value is not valid evidence after unadjusted peeking.
   - **Novelty/primacy effects**: Was there enough time to wash out initial behavior changes?

3. **Calculate statistical significance**:
   - **Conversion rate** for control and variant
   - **Relative lift**: (variant - control) / control × 100
   - **p-value**: Using a two-tailed z-test or chi-squared test
   - **Confidence interval**: 95% CI for the difference
   - **Statistical significance**: Is p < 0.05?
   - **Practical significance**: Is the lift meaningful for the business?

   If the user provides raw data, generate and run a Python script to calculate these.

4. **Check guardrail metrics**:
   - Did any guardrail metrics (revenue, engagement, page load time) degrade?
   - A winning primary metric with degraded guardrails may not be a true win

5. **Interpret results**:

   | Outcome | Recommendation |
   |---|---|
   | Significant positive lift, valid setup and stopping rule, meaningful effect, no guardrail issues | **Ship candidate** — assess rollout risk and uncertainty |
   | Significant positive lift, guardrail concerns | **Investigate** — understand trade-offs before shipping |
   | Not significant, positive trend | **Inconclusive** — continue only to a prespecified stopping point; otherwise design a new adequately powered test |
   | Not significant, flat | **Inconclusive** — use the confidence interval to assess plausible effects; absence of significance does not establish equivalence |
   | Significant negative lift | **Don't ship** — revert to control, analyze why |

6. **Provide the analysis summary**:
   ```
   ## A/B Test Results: [Test Name]

   **Hypothesis**: [What we expected]
   **Duration**: [X days] | **Sample**: [N control / M variant]

   | Metric | Control | Variant | Lift | p-value | Significant? |
   |---|---|---|---|---|---|
   | [Primary] | X% | Y% | +Z% | 0.0X | Yes/No |
   | [Guardrail] | ... | ... | ... | ... | ... |

   **Recommendation**: [Ship / Extend / Stop / Investigate]
   **Reasoning**: [Why]
   **Next steps**: [What to do]
   ```

Think step by step. Save as markdown. Generate Python scripts for calculations if raw data is provided.

---

### Further Reading

- [A/B Testing 101 + Examples](https://www.productcompass.pm/p/ab-testing-101-for-pms)
- [Testing Product Ideas: The Ultimate Validation Experiments Library](https://www.productcompass.pm/p/the-ultimate-experiments-library)
- [Are You Tracking the Right Metrics?](https://www.productcompass.pm/p/are-you-tracking-the-right-metrics)
