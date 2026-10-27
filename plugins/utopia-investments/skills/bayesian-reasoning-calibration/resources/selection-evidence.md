# Selection evidence and adverse selection

This mode preserves the useful question from the retired adverse-selection-prior skill: why did this counterparty select this offer, and what information could explain that selection?

## Define the event before assigning numbers

Specify the perspective (buyer or seller), beneficial outcome, horizon and alternative. A deal can benefit both sides through different liquidity needs, constraints or synergies. An unsolicited offer alone does not imply a probability below 50%.

Assess credible information asymmetry: access to operating data, a recent diligence process, timing of company updates, and observed selection behavior. Consider competing explanations such as portfolio rebalancing or liquidity needs. An investor archetype is context, not a numerical likelihood.

Let H mean beneficial to the focal party and E mean this offer was made. With supported prior p, likelihood a=P(E|H), and b=P(E|not H):

`posterior = a*p / (a*p + b*(1-p))`

Explain the source of all three inputs. Missing likelihoods call for a qualitative assessment or a labeled sensitivity range. Do not invent calibrated probabilities, arbitrary 0.10–0.70 clips, or fixed expert/dormant adjustments. Do not count selection evidence twice if it already influenced the prior.

## Replicated synthetic cases

| Prior p | a | b | Posterior | Interpretation |
|---:|---:|---:|---:|---|
| .80 | .50 | .50 | .80 | Selection provides no new information |
| .60 | .20 | .80 | .272727 | Selection weighs against benefit |
| .20 | .90 | .10 | .692308 | Selection supports benefit |

These are arithmetic fixtures, not empirical deal statistics. If the evidence has zero probability under both hypotheses, report model incompatibility.

## Valuation and next evidence

A posterior probability is not a price discount. Compute expected payoffs only when outcome-specific values and costs are supplied. Preserve already-priced risks. For example, .8 probability of +10 and .2 of -5 gives expected payoff 7; it does not justify multiplying the purchase price by .8.

Suggest evidence that could discriminate competing explanations: current company figures, comparable bids, the stated sale rationale and verifiable constraints. Report assumptions and what would change the assessment; do not turn a screening concern into an automatic accept/reject rule.

Conceptual source: [Akerlof on the market for lemons](https://www.nobelprize.org/prizes/economic-sciences/2001/akerlof/article/). Information asymmetry motivates investigating selection; the numeric update above follows Bayes' rule and the stated inputs, not an Akerlof calibration table.
