---
name: forecast-premortem
description: Stress-tests predictions by assuming failure and working backward to identify blind spots, tail risks, and overconfidence. Applies Gary Klein's premortem technique to probabilistic forecasting. Use when confidence is high (>80% or <20%), need to identify tail risks and unknown unknowns, want to widen overconfident intervals, or when user mentions premortem, backcasting, what could go wrong, stress test, or black swans.
---

# Forecast Pre-Mortem

## Table of Contents
- [Interactive Menu](#interactive-menu)
- [Quick Reference](#quick-reference)
- [Resource Files](#resource-files)

**Core Principle**: Invert the problem. Instead of "Will this succeed?", ask "It has failed -- why?"

---

## Interactive Menu

**What would you like to do?**

### Core Workflows

**1. [Run a Failure Premortem](#1-run-a-failure-premortem)** - Assume prediction failed, explain why
**2. [Run a Success Premortem](#2-run-a-success-premortem)** - For pessimistic predictions (<20%)
**3. [Dragonfly Eye Perspective](#3-dragonfly-eye-perspective)** - View failure through multiple lenses
**4. [Identify Tail Risks](#4-identify-tail-risks)** - Find black swans and unknown unknowns
**5. [Adjust Confidence Intervals](#5-adjust-confidence-intervals)** - Quantify the adjustment
**6. [Learn the Framework](#6-learn-the-framework)** - Deep dive into methodology
**7. Exit** - Return to main forecasting workflow

---

## 1. Run a Failure Premortem

**Let's stress-test your prediction by imagining it has failed.**

```
Failure Premortem Progress:
- [ ] Step 1: State the prediction and current confidence
- [ ] Step 2: Time travel to failure
- [ ] Step 3: Write the history of failure
- [ ] Step 4: Identify concrete failure modes
- [ ] Step 5: Assess plausibility and adjust
```

### Step 1: State the prediction and current confidence

**Tell me:**
1. What are you predicting?
2. What's your current probability?
3. What's your confidence interval?

**Example:** "This startup will reach $10M ARR within 2 years" - Probability: 75%, CI: 60-85%

### Step 2: Time travel to failure

**The Crystal Ball Exercise:**

Jump forward to the resolution date. **It is now [resolution date]. The event did NOT happen.** This is a certainty. Do not argue with it.

**How does it feel?** Surprising? Expected? Shocking? This emotional response tells you about your true confidence.

### Step 3: Write the history of failure

**Backcasting Narrative:** Starting from the failure point, work backward in time. Write the story of how we got here.

**Prompts:**
- "The headlines that led to this were..."
- "The first sign of trouble was when..."
- "In retrospect, we should have known because..."
- "The critical mistake was..."

**Frameworks to consider:**
- **Internal friction:** Team burned out, co-founders fought, execution failed
- **External shocks:** Regulation changed, competitor launched, market shifted
- **Structural flaws:** Unit economics didn't work, market too small, tech didn't scale
- **Black swans:** Pandemic, war, financial crisis, unexpected disruption

See [Failure Mode Taxonomy](resources/failure-mode-taxonomy.md) for comprehensive categories.

### Step 4: Identify concrete failure modes

**Extract specific, actionable failure causes from your narrative.**

For each failure mode: (1) What happened, (2) Why it caused failure, (3) How likely it is, (4) Early warning signals

**Example:**
| Failure Mode | Mechanism | Likelihood | Warning Signals |
|--------------|-----------|------------|-----------------|
| Key engineer quit | Lost technical leadership, delayed product | 15% | Declining code commits, complaints |
| Competitor launched free tier | Destroyed unit economics | 20% | Hiring spree, beta leaks |
| Regulation passed | Made business model illegal | 5% | Proposed legislation, lobbying |

### Step 5: Assess plausibility and adjust

Narrative ease and the number of imagined risks identify questions to investigate; neither measures probability. Deduplicate causes, distinguish scenarios conditioned on failure from unconditional event risks, and look for evidence before changing the forecast.

For events that each suffice to cause failure, aggregate their union. For two events, `P(A or B)=P(A)+P(B)-P(A and B)`. Sum only mutually exclusive events; use `1-product(1-p)` only with justified independence. Without dependence information, report bounds `max(p_i) <= P(any) <= min(1,sum(p_i))`, not a forced point adjustment. A risk event that does not always cause failure also needs its conditional impact.

Example: two labels describe the same 30% event; failure remains30%, not60%. Two independent30% sufficient causes produce51%. Two mutually exclusive30% causes produce60%. These are synthetic probability checks, not empirical estimates.

**Next:** Return to [menu](#interactive-menu) or document findings

---

## 2. Run a Success Premortem

**For pessimistic predictions - assume the unlikely success happened.**

```
Success Premortem Progress:
- [ ] Step 1: State pessimistic prediction (<20%)
- [ ] Step 2: Time travel to success
- [ ] Step 3: Write the history of success
- [ ] Step 4: Identify how you could be wrong
- [ ] Step 5: Assess and adjust upward if needed
```

### Step 1: State pessimistic prediction

**Tell me:** (1) What low-probability event are you predicting? (2) Why is your confidence so low?

**Example:** "Fusion energy will be commercialized by 2030" - Probability: 10%, Reasoning: Technical challenges too great

### Step 2: Time travel to success

**It is now 2030. Fusion energy is commercially available.** This happened. It's real. How?

### Step 3: Write the history of success

**Backcasting the unlikely:** What had to happen for this to occur?
- "The breakthrough came when..."
- "We were wrong about [assumption] because..."
- "The key enabler was..."
- "In retrospect, we underestimated..."

### Step 4: Identify how you could be wrong

**Challenge your pessimism:**
- Are you anchoring too heavily on current constraints?
- Are you underestimating exponential progress?
- Are you ignoring parallel approaches?
- Are you biased by past failures?

### Step 5: Assess and adjust upward if needed

Use a plausible success narrative to identify evidence to seek; change probability only when the evidence warrants it.

**Next:** Return to [menu](#interactive-menu)

---

## 3. Dragonfly Eye Perspective

**View the failure through multiple conflicting perspectives.**

The dragonfly has compound eyes that see from many angles simultaneously. We simulate this by adopting radically different viewpoints.

```
Dragonfly Eye Progress:
- [ ] Step 1: The Skeptic (why this will definitely fail)
- [ ] Step 2: The Fanatic (why failure is impossible)
- [ ] Step 3: The Disinterested Observer (neutral analysis)
- [ ] Step 4: Synthesize perspectives
- [ ] Step 5: Extract robust failure modes
```

### Step 1: The Skeptic

**Channel the harshest critic.** You are a short-seller, a competitor, a pessimist. Why will this DEFINITELY fail?

**Be extreme:** Assume worst case, highlight every flaw, no charity, no benefit of doubt

**Output:** List of failure reasons from skeptical view

### Step 2: The Fanatic

**Channel the strongest believer.** You are the founder's mother, a zealot, an optimist. Why is failure IMPOSSIBLE?

**Be extreme:** Assume best case, highlight every strength, maximum charity and optimism

**Output:** List of success reasons from optimistic view

### Step 3: The Disinterested Observer

**Channel a neutral analyst.** You have no stake in the outcome. You're running a simulation, analyzing data dispassionately.

**Be analytical:** No emotional investment, pure statistical reasoning, reference class thinking

**Output:** Balanced probability estimate with reasoning

### Step 4: Synthesize perspectives

**Find the overlap:** Which failure modes appeared in ALL THREE perspectives?
- Skeptic mentioned it
- Even fanatic couldn't dismiss it
- Observer identified it statistically

**These are your robust failure modes** - the ones most likely to actually happen.

### Step 5: Extract robust failure modes

**The synthesis:**

| Failure Mode | Skeptic | Fanatic | Observer | Robust? |
|--------------|---------|---------|----------|---------|
| Market too small | Definitely | Debatable | Base rate suggests yes | YES |
| Execution risk | Definitely | No way | 50/50 | Maybe |
| Tech won't scale | Definitely | Already solved | Unknown | Investigate |

Focus adjustment on the **robust** failures that survived all perspectives.

**Next:** Return to [menu](#interactive-menu)

---

## 4. Identify Tail Risks

**Find the black swans and unknown unknowns.**

```
Tail Risk Identification Progress:
- [ ] Step 1: Define what counts as "tail risk"
- [ ] Step 2: Systematic enumeration
- [ ] Step 3: Impact × Probability matrix
- [ ] Step 4: Set kill criteria
- [ ] Step 5: Monitor signposts
```

### Step 1: Define what counts as "tail risk"

**Criteria:** Low probability (<5%), High impact (would completely change outcome), Outside normal planning, Often exogenous shocks

**Examples:** Pandemic, war, financial crisis, regulatory ban, key person death, natural disaster, technological disruption

### Step 2: Systematic enumeration

**Use the PESTLE framework for comprehensive coverage:**

- **Political:** Elections, coups, policy changes, geopolitical shifts
- **Economic:** Recession, inflation, currency crisis, market crash
- **Social:** Cultural shifts, demographic changes, social movements
- **Technological:** Breakthrough inventions, disruptions, cyber attacks
- **Legal:** New regulations, lawsuits, IP challenges, compliance changes
- **Environmental:** Climate events, pandemics, natural disasters

For each category, ask: "What low-probability event would kill this prediction?"

See [Failure Mode Taxonomy](resources/failure-mode-taxonomy.md) for detailed categories.

### Step 3: Impact × Probability matrix

**Plot your tail risks:**

```
High Impact
│
│  [Pandemic]        [Key Founder Dies]
│
│
│  [Recession]       [Competitor Emerges]
│
└─────────────────────────────────────→ Probability
  Low                              High
```

**Focus on:** High impact, even if very low probability

### Step 4: Set kill criteria

**For each major tail risk, define the "kill criterion":**

**Format:** "If [event X] happens, probability drops to [Y]%"

**Examples:**
- "If FDA rejects our drug, probability drops to 5%"
- "If key engineer quits, probability drops to 30%"
- "If competitor launches free tier, probability drops to 20%"
- "If regulation passes, probability drops to 0%"

**Why this matters:** You now have clear indicators to watch

### Step 5: Monitor signposts

**For each kill criterion, identify early warning signals:**

| Kill Criterion | Warning Signals | Check Frequency |
|----------------|----------------|-----------------|
| FDA rejection | Phase 2 trial results, FDA feedback | Monthly |
| Engineer quit | Code velocity, satisfaction surveys | Weekly |
| Competitor launch | Hiring spree, beta leaks, patents | Monthly |
| Regulation | Proposed bills, lobbying, hearings | Quarterly |

**Setup monitoring:** Calendar reminders, news alerts, automated tracking

**Next:** Return to [menu](#interactive-menu)

---

## 5. Adjust Confidence Intervals

**Quantify how much the premortem should change your bounds.**

```
Confidence Interval Adjustment Progress:
- [ ] Step 1: State current CI
- [ ] Step 2: Evaluate premortem findings
- [ ] Step 3: Calculate width adjustment
- [ ] Step 4: Set new bounds
- [ ] Step 5: Document reasoning
```

### Step 1: State current CI

**Current confidence interval:** Lower bound: __%, Upper bound: __%, Width: ___ percentage points

### Step 2: Evaluate premortem findings

**Score your premortem on these dimensions (1-5 each):**

1. **Narrative plausibility** - 1 = Failure felt absurd, 5 = Failure felt inevitable
2. **Number of failure modes** - 1 = Only 1-2 unlikely modes, 5 = 5+ plausible modes
3. **Unknown unknowns discovered** - 1 = No surprises, all known, 5 = Many blind spots revealed
4. **Dragonfly synthesis** - 1 = Perspectives diverged completely, 5 = All agreed on failure modes

**Total score:** __ / 20

### Step 3: Reassess uncertainty from evidence

Do not translate a narrative score into an interval-width multiplier. Determine whether the target is a quantity, a binary event probability, or a model parameter, and label the interval accordingly (prediction, confidence, credible or subjective sensitivity range). Use a calibrated model or explicitly justified sensitivity analysis. Lack of calibration is a limitation, not a reason to invent precision.

### Step 4: Set justified bounds

Document the method and assumptions. Probability bounds must stay within0–100%; asymmetric uncertainty need not be forced around the old estimate. Recompute from evidence and dependence assumptions; retaining the estimate is valid when no new evidence appears.

### Step 5: Document reasoning

**Record:** (1) What failure modes drove the adjustment, (2) Which perspective was most revealing, (3) What unknown unknowns were discovered, (4) What monitoring you'll do going forward

**Next:** Return to [menu](#interactive-menu)

---

## 6. Learn the Framework

**Deep dive into the methodology.**

### Resource Files

📄 **[Premortem Principles](resources/premortem-principles.md)** - Why humans are overconfident, hindsight bias and outcome bias, the power of inversion, research on premortem effectiveness

📄 **[Backcasting Method](resources/backcasting-method.md)** - Structured backcasting process, temporal reasoning techniques, causal chain construction, narrative vs quantitative backcasting

📄 **[Failure Mode Taxonomy](resources/failure-mode-taxonomy.md)** - Comprehensive failure categories, internal vs external failures, preventable vs unpreventable, PESTLE framework for tail risks, kill criteria templates

**Next:** Return to [menu](#interactive-menu)

---

## Quick Reference

### The Premortem Commandments

1. **Assume failure is certain** - Don't debate whether, debate why
2. **Be specific** - Vague risks don't help; concrete mechanisms do
3. **Use multiple perspectives** - Skeptic, fanatic, observer
4. **Quantify failure modes** - Estimate probability of each
5. **Set kill criteria** - Know what would change your mind
6. **Monitor signposts** - Track early warning signals
7. **Audit uncertainty** - Narrative ease is not calibration evidence

### One-Sentence Summary

> Assume your prediction has failed, write the history of how, and use that to identify blind spots and adjust confidence.

### Integration with Other Skills

- **Before:** Use after inside view analysis (you need something to stress-test)
- **After:** Use `scout-mindset-bias-check` to validate adjustments
- **Companion:** Works with `bayesian-reasoning-calibration` for quantitative updates
- **Feeds into:** Monitoring systems and adaptive forecasting

---

## Resource Files

📁 **resources/**
- [premortem-principles.md](resources/premortem-principles.md) - Theory and research
- [backcasting-method.md](resources/backcasting-method.md) - Temporal reasoning process
- [failure-mode-taxonomy.md](resources/failure-mode-taxonomy.md) - Comprehensive failure categories

---

**Ready to start? Choose a number from the [menu](#interactive-menu) above.**
