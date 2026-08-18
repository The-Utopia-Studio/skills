---
name: unserved-needs-finder
description: Ranks what a customer actually needs by onioning each stated need to a tech-invariant core, sorting the survivors with Kano (must / performance / delighter), and returning the one durable, under-served need that will still be a need after the technology turns over. Fires on "what do they really need", "find the unmet need", "which need should we prioritise", "what's the real need under this feature request", or when a fellow hands you a list of "needs" that are mostly features and wants the durable one ranked out. Outputs a filled prioritised need map: candidate needs → solution-strip → onion-to-core → tech-invariance gate → Kano bands → one ranked wedge need with its unserved evidence. NOT for naming WHO holds the need or their budget (use user-buyer-decider-map), NOT for reducing the whole job to its currencies (use job-in-primitives), NOT for scoring whether the whole idea is worth building (use so-what-stress-test).
type: generator
supersedes: none
---
# Unserved Needs Finder

## What it does
Takes a fellow's list of customer "needs" — usually a mix of real needs, disguised solutions, and tech capabilities — and returns one ranked map. It strips the solution and capability words off each entry, onions what remains down to a core that would still be a need if the technology were completely different, classifies the survivors with Kano (must-have / performance / delighter), and names the single durable, under-served **performance** need that is the wedge. The output is a filled prioritised need map ([template.md](template.md)) that also kills the disguised solutions, flags the unmet must-haves as table stakes, and marks any delighter as decaying. It finds the need that survives when the model does not.

## The Icarus reframe
Generic JTBD produces a tidy nine-box of jobs, pains, and gains and stops. That list is not decisive, and it does not protect you from the two ways a "need" is fake. First, a stated need is often a pre-chosen solution ("they need a dashboard") — a dashboard is a thing you would build, not a thing they need. Second, and worse for a studio building on frontier models, a stated need is often a tech capability ("they need real-time anomaly detection", "they need a bigger context window"). A capability is a property of a solution, and it evaporates on the next model release — you cannot own a need that the platform commoditises in a quarter. So this skill adds two gates JTBD has no equivalent of: an onion that peels every solution and capability word off, and a tech-invariance test that keeps only needs still true if you solved them with paper, a clerk, or a model three generations away. Then Kano sorts the survivors — because the wedge is a specific band. Unmet must-haves are table stakes; you fix them but they never win. Delighters decay to must-haves as competitors copy them, and the ones built on a novel capability decay fastest. The wedge is the under-served performance need: the one customers already pay a workaround to half-meet, that gets better the more you meet it, and that will still be a need after the tech turns over.

## When to use / When NOT
Use it once you have a segment and a handful of candidate needs (from interviews, observed workarounds, or the fellow's own list) and you need the durable one ranked out before anyone designs a solution.

| Situation | Use this? | Go to |
|---|---|---|
| "What do they really need — and which need first?" | Yes | unserved-needs-finder |
| "This feature list is mostly solutions. What's the real need under it?" | Yes | unserved-needs-finder |
| "Which unmet need is the wedge vs a nice-to-have?" | Yes | unserved-needs-finder |
| "Who is the actual buyer / who signs / what's their budget?" | No | `user-buyer-decider-map` |
| "Reduce the whole job to information / decisions / liability." | No | `job-in-primitives` |
| "Is the whole idea worth building?" | No | `so-what-stress-test` |
| "What's the riskiest assumption and how do I disprove it?" | No | `null-hypothesis-test` |

This skill ranks WHAT is needed. It does not name WHO needs it (that is `user-buyer-decider-map`, which reads the top need from here into its buyer clarity), it does not reduce the whole job to currencies (that is `job-in-primitives`), and it does not judge the idea (that is `so-what-stress-test`). Name the sibling and stop.

## Method
Fill the sheet in [template.md](template.md). Work the tables; do not narrate. Tag every empirical claim `[Fact]` (observed behaviour or a shown artefact), `[Assumption]` (a stated, defensible estimate), or `[Hypothesis]` (a guess needing evidence).

**Step 1 — Collect candidate needs (§0).** List every stated need verbatim, keeping its solution and tech words. For each, record the source and its ladder weight (money 1.0 · observed behaviour 0.7 · artefact 0.5 · verbal 0.3 · opinion 0.1). The artefact rung (0.5) means a *customer's own* workaround artefact — the spreadsheet, checklist, or screenshot they built to cope — NOT the team's own roadmap, wishlist, or spec, which is opinion (0.1). Mis-weighting an internal doc at 0.5 is how the all-0.1 STOP gets bypassed; do not. If every candidate rests on opinion (0.1), stop — see Evidence standard.

**Step 2 — Solution-strip, onion pass 1 (§1).** For each candidate, flag the words that name a thing you would build or a property of that thing, and replace them with the need beneath.

| Word type | Examples | Why it is not a need |
|---|---|---|
| Solution noun | app, dashboard, copilot, integration, alert, report, portal | It is a thing you build, not a thing they need |
| Tech capability | real-time, on-device, automated, AI-powered, bigger context, faster inference | A property of a solution; the platform commoditises it |

A candidate that is nothing but a solution or a capability has no need beneath until you peel — do not pass it through unpeeled.

**Step 3 — Onion to core (§2).** Ladder each stripped need: "if that were fully met, what would they still need, and why does it matter?" Peel until you reach a need that (a) contains no solution word and (b) names a human decision, outcome, or state — not a tool behaviour. Stop before it dissolves into a platitude (see Gotchas).

**Step 4 — Tech-invariance test (§3), the durability gate.** For each core need, ask: would this still be a need, unchanged, if you solved it with paper, a clerk, or a model three generations from now?

| Result | Meaning | Action |
|---|---|---|
| Y | Durable core need | Keep it |
| N | A capability is still hiding | Peel again, or discard as a non-need |

A "no" is the KILL line for a tech-capability-as-need. Kano alone will not catch it — a capability can masquerade as a performance need — so this gate runs before Kano, not after.

**Step 5 — Kano classify the survivors (§4).** Ask two questions per durable need: functional ("if this were fully met, how do you feel?") and dysfunctional ("if it were not met at all, how do you feel?"). Map:

| Functional | Dysfunctional | Kano class | What it means for the wedge |
|---|---|---|---|
| Neutral | Dissatisfied | Must-have | Table stakes — fix, do not differentiate |
| More is better | Less is worse | Performance | The wedge candidate |
| Delighted | Neutral | Delighter | Decaying — do not anchor the moat |
| Neutral | Neutral | Indifferent | Discard — it is noise |
| Worse | Better | Reverse | Anti-need — building it repels them |

**Step 6 — Rank and select (§5).** For each durable need record its Kano class and its unserved-evidence weight (how strongly current solutions fail to meet it, on the ladder). Then apply the selection rule:

- **Return** the durable need that is **performance-class AND has unserved evidence ≥ 0.5** (a shown workaround or stronger). That is the wedge.
- An unmet **must-have** → label "entry ticket: fix, do not differentiate".
- A **delighter** → label "decaying: do not anchor the moat here".
- Unserved evidence **< 0.5** → label "hypothesis: go observe before building".
- If two needs onion to the same core, merge them and say so (do not double-count a need as two).

**Step 7 — Evidence the pick (§6).** The "unserved" claim on the top need is a claim about a gap, and it must sit at ≥ 0.5 to be actionable — a workaround you can point to, or money leaking to a substitute. If it sits below that, return the need as a `[Hypothesis]` plus the single cheapest observation that would confirm the gap is real.

## Evidence standard
Icarus weights behaviour and money over opinion. "Unserved" is the load-bearing word here, and it is a claim about a gap — so it needs gap evidence, not agreement. The strongest proof a need is real AND unmet is money leaking to a workaround; the weakest is the fellow's belief that customers would like it.

| Proof the need is real and unserved | Ladder weight |
|---|---|
| They pay for a workaround or a substitute today (a manual service, a stopgap tool) | 1.0 |
| They built a workaround you can watch them use (a spreadsheet, a whiteboard, a checklist) | 0.7 |
| They show you the workaround artefact | 0.5 |
| They say "yes, I would want that" | 0.3 |
| The fellow believes they need it | 0.1 |

A need supported only at 0.3 or below is not an unserved need — it is a hope. The skill returns it as a `[Hypothesis]` with the cheapest observation to move it up the ladder, and it never ranks a hope above a workaround. If the whole input sits at 0.1, the skill declares it **not ready** and names the fix: watch one customer do the job once, and find what they reach for when the current tool stops helping.

## Gotchas
- **The comfortable need is a delighter.** Fellows fall for the surprising demo feature because it demos well. But delighters decay — competitors copy them and they slide to must-have — and delighters built on a novel capability decay in a quarter. If the wedge lands on a delighter, you are building on ground that erodes. Force the performance need out.
- **"Unserved" is not the same as "unspoken".** A need can be loudly complained about and still served — they cope, the substitute is adequate, nobody switches. Unserved means the gap is evidenced by a workaround or a money leak, not that the fellow has not heard anyone mention it.
- **Over-peeling dissolves the need into a platitude.** "They need to feel safe / make money / save time" is true of every human and directs nothing. Stop the onion at the last layer that still discriminates this segment's job from another's. If the core need would fit any business on earth, you peeled one layer too far.
- **A capability can pass Kano and still be a fake need.** "Faster processing" reads like a performance need (more is better, less is worse) and will sail through the Kano test. The tech-invariance gate is the only thing that catches it — run Step 4 before Step 5, always, or the disguised capability ranks as your wedge.
- **Two stated needs often share one core.** Fellows list the same need twice in different solution costumes. Merge them at Step 6 or you will inflate a single need into a phantom pattern.

## Examples
- [examples/sample.md](examples/sample.md) — Mentix's factory-manager needs, run end to end: "an AI copilot" and "real-time anomaly alerts" both peel away (one a solution, one a capability that fails tech-invariance), and the durable, under-served performance need surfaces — deciding which of several simultaneous emerging faults to send the one available technician to before a line stops — evidenced by the managers' manual tribal-knowledge whiteboard (behaviour, 0.7).

## Related skills
- Absorbs `discovery/jobs-to-be-done`: it keeps that framework's one durable instinct — separate the job from the solution, and look past functional needs to social and emotional ones — and drops the unranked nine-box list. Where JTBD ends in a wishlist, this ends in one ranked map with a single wedge need, the disguised solutions and capabilities killed, and the musts and delighters labelled. It beats JTBD by being decisive (it returns the one need) and durable by construction (the tech-invariance gate JTBD has no analogue of).
- Not `user-buyer-decider-map`: that names WHO has the need — user, buyer, decision-maker, champion, each with a budget and a why-now. This names WHAT the need is and ranks it. Run them side by side; the buyer map reads the top need from here.
- Not `job-in-primitives`: that reduces the whole job to information moved · decisions made · liability transferred. This ranks the needs inside that job. Compose them — reduce the job, then find the unserved need in it.
- Feeds `problem-quality-scorecard` (the durable unserved need is the "problem worth solving" input) and `wedge-five-questions` (the under-served performance need is the wedge candidate). `so-what-stress-test` scores the whole idea; this scores only the needs. Supersedes nothing.
