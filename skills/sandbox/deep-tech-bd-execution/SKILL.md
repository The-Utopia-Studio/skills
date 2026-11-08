---
name: deep-tech-bd-execution
description: Use when a founder or operator is running BD/sales motion for a deep-tech or early-stage product before the ICP, pricing, or buyer is confirmed — qualifying a real prospect, deciding whether a pilot counts as commercial traction, judging whether an interaction is progress or just activity, or resolving a GTM decision where the evidence is incomplete or contradicts itself. Also use when a claim about pipeline, a segment, or a deal needs to be tagged by evidence strength before it goes into a strategy document or external material.
---

# Deep-Tech BD Execution

## What it does

Gives an operator the judgment layer for running BD before the market has validated itself — the period where `meddic-checklist`, `lead-qualification`, and `signal-scoring` don't yet apply because their inputs (a confirmed ICP, real lead volume, a calibrated model) don't exist yet. It does three things: forces every GTM claim to carry an honest evidence tag, keeps "an activity happened" from silently becoming "we have traction," and gives explicit branching logic for the situations that actually occur (a partner with no named buyer, a technically-successful pilot with no budget, repeated rejection of the same pitch).

**Relationship to existing skills:** this is upstream of them, not a duplicate. Once a segment is confirmed and real pipeline volume exists, hand off to `signal-scoring` for the scoring model and `meddic-checklist` for deal inspection — this skill's job is done at that point. Using MEDDIC or a scoring model before the ICP is confirmed just launders a guess into something that looks calibrated.

## Core method

**1. Tag every claim, always.** Five tiers, no others:

| Tag | Means | Example |
|---|---|---|
| `Known` | Verified fact, not contingent on anyone's account | "The product performs X when tested by us" |
| `Observed` | Happened in a real interaction, once or a few times | "This specific prospect asked for Y" |
| `Hypothesis` | An unverified belief driving a decision | "We believe the buyer is the CISO" |
| `Experiment` | A proposed test designed to move a Hypothesis toward Known or kill it | "Run 10 discovery calls and track the objection pattern" |
| `Decision rule` | An IF/THEN judgment call, not a fact at all | "IF no sponsor after two conversations, THEN stop pursuing on champion enthusiasm alone" |

A claim keeps its tag until real evidence changes it. Nothing is promoted from Hypothesis to Known by repetition or conviction — only by the Experiment it named actually running.

**2. Distinguish activity from progress from pipeline from traction. These are not synonyms:**

- **Activity** — an outreach sent, a meeting held. Proves nothing by itself.
- **Progress** — a stage's exit condition was actually met (see `references/pipeline.md`), not just attempted.
- **Qualified pipeline** — passed the qualification rubric (see `references/qualification-and-evidence.md`), with a named next commitment.
- **Commercial traction** — a real paid engagement, or a specific, named reason one didn't happen. A successful unpaid pilot is not this. A proposal sent is not this. Positive sentiment is not this.

Common collapse to catch: "we had a great pilot" (activity/progress) reported upward as if it were traction. See `references/worked-examples.md` #5.

**3. Score qualification, but the score never overrides contradictory evidence.** A weighted rubric is a starting operating hypothesis, not a calibrated instrument, until it's been checked against ~10 real outcomes. See `references/qualification-and-evidence.md` for the rubric template, the six qualification types that must not collapse into one number (account / buyer / problem / solution / pilot / commercial), and the evidence ledger's required `contradictory evidence` field — the field that exists specifically to block confirmation bias.

**4. Map the roles in every deal, explicitly, before assuming one person fills them:**

Buyer/economic buyer · Champion · Technical evaluator · Blocker · Trigger · Pain/problem · Proof required · Objection · Next commitment · Exit criteria. Full definitions and what to ask each role in `references/pipeline.md`.

**5. Branch, don't improvise.** A short sample (full state-transition model in `references/branching-logic.md`):

- IF there's a clear problem but no owner → identify ownership before proposing a pilot.
- IF there's a technical champion but no economic buyer → technical validation can continue, but the commercial stage is classified **blocked**, not "in progress."
- IF a pilot succeeds technically but no budget/urgency emerges → record the technical proof; do **not** classify the opportunity as traction.
- IF repeated prospects reject the same message → test whether the problem, buyer, or proof requirement is wrong before increasing outbound volume.

## What good looks like

An evidence ledger where the `contradictory evidence` column actually has entries in it — a ledger with none is a sign no one is looking for disconfirmation. A pipeline where most opportunities are honestly logged as blocked or stalled, not quietly advanced past a stage whose exit condition wasn't really met. A founder who can say, for any deal, which role is missing and what signal would fill it — not just "it's going well."

## Gotchas

- **Scoring becomes the point.** Once a rubric exists, it's tempting to chase the number instead of the underlying signal. If qualitative evidence (a prospect's actual words) contradicts a high score, the qualitative evidence wins — always.
- **One data point gets treated as a trend.** A single non-response, or a single rejection, is noise. Three or more on the same objection is a signal. Don't act on the first; don't ignore the third.
- **A partner introduction gets counted as pipeline.** It isn't, until they name a specific buyer and problem. Track it separately as an introduction hypothesis so it doesn't inflate real pipeline numbers.
- **An unpaid or academic pilot gets treated as a confirmed beachhead.** It validates technical and analyst usefulness at most. It says nothing about a paying buyer's willingness to pay, because that conversation didn't happen.
- **The evidence ledger gets written once and never touched.** It's only useful if re-tagged as real conversations happen — a ledger frozen at draft time is decoration.

## Examples

See `references/worked-examples.md` for five full worked examples (an unpaid academic-style pilot, a partner/consultancy introduction, an economic-buyer conversation, a no-response prospect, and a technically-successful pilot with no commercial intent) — each shows which stage applies, which decision rule fires, and exactly what evidence tier the outcome produces. None use a specific company or product name; adapt the pattern to your own deal.

## References

- `references/pipeline.md` — the full stage-by-stage pipeline (target hypothesis through expansion/referral), each stage's objective, entry condition, required inputs, operator actions, decision points, exit criteria, evidence generated, failure modes, what an expert notices first, and the common novice mistake.
- `references/qualification-and-evidence.md` — the qualification rubric template, the six qualification types, and the full evidence ledger schema.
- `references/branching-logic.md` — the complete IF/THEN state-transition model.
- `references/worked-examples.md` — five generic worked examples.
