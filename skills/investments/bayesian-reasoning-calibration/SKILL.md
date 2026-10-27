---
name: bayesian-reasoning-calibration
description: >-
  Update a probability with new evidence using Bayes' rule, and show the maths: prior,
  likelihoods P(E|H) and P(E|not H), likelihood ratio, posterior, and a calibration and
  sensitivity check. Use this skill whenever the user says something like "I thought there was
  a 30% chance, now X happened, what should I believe?", "update my probability", "how much
  should this evidence move me", "given these hit rates, what are the odds now", or gives a
  prior plus new data (a pilot result, a signal, a test outcome) and wants a revised estimate.
  Also for adverse selection in unsolicited offers: assess how the proposer selected the deal
  using an evidence-based prior and selection likelihoods, not a fixed penalty. Not
  for finding the starting base rate (use reference-class-forecasting) or for auditing your
  reasoning for bias (use scout-mindset-bias-check).
---

# Bayesian Reasoning & Calibration

## Table of Contents

- [Workflow](#workflow)
- [Common Patterns](#common-patterns)
- [Guardrails](#guardrails)
- [Quick Reference](#quick-reference)

**Core formula:** P(H|E) = P(E|H) x P(H) / P(E), where P(H) = prior, P(E|H) = likelihood, P(H|E) = posterior.

**Quick Example:**

```markdown
# Should we launch Feature X?

## Prior Belief
Before beta testing: 60% chance of adoption >20%
- Base rate: Similar features get 15-25% adoption
- Our feature seems stronger than average
- Prior: 60%

## New Evidence
Beta test: 35% of users adopted (70 of 200 users)

## Likelihoods
The likelihoods below are illustrative assumptions, not estimates derived from the 70/200 observation. A real analysis needs a sampling model or empirical likelihoods.

If true adoption is >20%:
- P(seeing 35% in beta | adoption >20%) = 75% (likely to see high beta if true)

If true adoption is ≤20%:
- P(seeing 35% in beta | adoption ≤20%) = 15% (unlikely to see high beta if false)

## Bayesian Update
Posterior = (75% × 60%) / [(75% × 60%) + (15% × 40%)]
Posterior = 45% / (45% + 6%) = 88%

## Conclusion
Updated belief: 88% confident adoption will exceed 20%
Evidence strongly supports launch, but not certain.
```

## Workflow

Copy this checklist and track your progress:

```
Bayesian Reasoning Progress:
- [ ] Step 1: Define the question
- [ ] Step 2: Establish prior beliefs
- [ ] Step 3: Identify evidence and likelihoods
- [ ] Step 4: Calculate posterior
- [ ] Step 5: Calibrate and document
```

**Step 1: Define the question**

Clarify hypothesis (specific, testable claim), probability to estimate, timeframe (when outcome is known), success criteria, and why this matters (what decision depends on it). Example: "Product feature will achieve >20% adoption within 3 months" - matters for launch decision.

**Step 2: Establish prior beliefs**

Set initial probability using base rates (general frequency), reference class (similar situations), specific differences, and explicit probability assignment with justification. Good priors are based on base rates, account for differences, honest about uncertainty, and include ranges if unsure (e.g., 40-60%). Avoid purely intuitive priors, ignoring base rates, or extreme values without justification.

**Step 3: Identify evidence and likelihoods**

Assess evidence (specific observation/data), diagnostic power (does it distinguish hypotheses?), P(E|H) (probability if hypothesis TRUE), P(E|¬H) (probability if FALSE), and calculate likelihood ratio = P(E|H) / P(E|¬H). LR > 10 = very strong evidence, 3-10 = moderate, 1-3 = weak, ≈1 = not diagnostic, <1 = evidence against.

**Step 4: Calculate posterior**

Apply Bayes' Theorem: P(H|E) = [P(E|H) × P(H)] / P(E), or use odds form: Posterior Odds = Prior Odds × Likelihood Ratio. Calculate P(E) = P(E|H)×P(H) + P(E|¬H)×P(¬H), get posterior probability, and interpret change. Inputs must be finite probabilities in [0, 1]. If P(E) = 0, the evidence is impossible under the specified model; revise the model instead of dividing by zero. Use the probability form when endpoint priors or zero likelihoods make odds undefined. For simple cases → Use `resources/template.md` calculator. For complex cases (multiple hypotheses) → Study `resources/methodology.md`.

**Step 5: Calibrate and document**

Check calibration (over/underconfident?), validate assumptions (are likelihoods reasonable?), perform sensitivity analysis, create `bayesian-reasoning-calibration.md`, and note limitations. Self-check using `resources/evaluators/rubric_bayesian_reasoning_calibration.json`: verify prior based on base rates, likelihoods justified, evidence diagnosticity interpreted correctly (LR = 1 leaves the prior unchanged; LR < 1 supports the alternative), calculation correct, posterior calibrated, assumptions stated, sensitivity noted. Minimum standard: Score ≥ 3.5.

## Selection evidence in unsolicited offers

Use [resources/selection-evidence.md](resources/selection-evidence.md) when the question is why a counterparty chose to offer a deal, share an allocation, or bid for an asset. Define who benefits and the comparison alternative. Use the selection event as evidence in the same Bayesian calculation; do not assign a universal below-50% prior or convert a probability into a valuation haircut without a payoff model.

## Common Patterns

**For forecasting:**
- Use base rates as starting point
- Update incrementally as evidence arrives
- Track forecast accuracy over time
- Calibrate by comparing predictions to outcomes

**For hypothesis testing:**
- State competing hypotheses explicitly
- Calculate likelihood ratio for evidence
- Update belief proportionally to evidence strength
- Don't claim certainty unless LR is extreme

**For risk assessment:**
- Consider multiple scenarios (not just binary)
- Update risks as new data arrives
- Use ranges when uncertain about likelihoods
- Perform sensitivity analysis

**For avoiding bias:**
- Force explicit priors (prevents anchoring to evidence)
- Use reference classes (prevents ignoring base rates)
- Calculate mathematically (prevents motivated reasoning)
- Document before seeing outcome (enables calibration)

## Guardrails

**Do:**
- State priors explicitly before seeing all evidence
- Use base rates and reference classes
- Estimate likelihoods with justification
- Update incrementally as evidence arrives
- Be honest about uncertainty
- Perform sensitivity analysis
- Track forecasts for calibration
- Acknowledge limits of the model

**Don't:**
- Use extreme priors (1%, 99%) without exceptional justification
- Ignore base rates (common bias)
- Treat all evidence as equally diagnostic
- Update to 100% certainty (almost never justified)
- Cherry-pick evidence
- Skip documenting reasoning
- Forget to calibrate (compare predictions to outcomes)
- Apply to questions where probability is meaningless

## Quick Reference

- **Standard template**: `resources/template.md`
- **Multiple hypotheses**: `resources/methodology.md`
- **Example**: `resources/examples/product-launch.md`
- **Quality rubric**: `resources/evaluators/rubric_bayesian_reasoning_calibration.json`

**Bayesian Formula (Odds Form)**:
```
Posterior Odds = Prior Odds × Likelihood Ratio
```

**Likelihood Ratio**:
```
LR = P(Evidence | Hypothesis True) / P(Evidence | Hypothesis False)
```

**Output naming**: `bayesian-reasoning-calibration.md` or `{topic}-forecast.md`
