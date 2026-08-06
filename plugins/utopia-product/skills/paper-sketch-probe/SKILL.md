---
name: paper-sketch-probe
description: Fires when a fellow wants to test a workflow on paper before building it — "paper test", "sketch it", "paper prototype", "sketch probe", "draw the flow and check they can follow it". Output is a hand-drawn workflow sketch plus a structured read-out naming what was legible and where the decision lived. NOT for choosing which probe to run (that is `probe-matrix`), and NOT for testing demand, trust, or willingness to pay — a sketch lies about all three; route those to `wizard-of-oz-probe` or `concierge-probe`.
type: generator
supersedes: none
---
# Paper / Sketch Probe

## What it does
Compresses a "does this workflow read the way I think it does" question into a 30-minute test. You draw the workflow as 5–9 panels, hand it to one real operator, stay silent, and log where they pause. The output is the sketch plus a read-out that names two things only: was the flow legible, and which single panel carries the real decision. It refuses to report demand or feel, because a sketch cannot observe either.

## The Icarus reframe
A generic paper prototype "tests usability." This probe tests two narrower things a sketch can honestly answer: legibility (can a real operator follow the steps unprompted) and decision location (which panel holds the judgment). The pause points do the work. A pause that clears the moment you explain is a legibility gap you fix by redrawing. A pause where the operator says "it depends" or reaches for context you never drew is the decision point — that is the surface your product actually has to serve. Everything else the sketch tells you is opinion.

## When to use / When NOT
Use it when the claim is about a workflow you can draw and an operator can walk, and you have not yet built it.

| Use when the claim is | Do NOT use — route to |
|---|---|
| "An operator can follow these steps without me narrating" | — |
| "The real judgment sits in one identifiable step" | — |
| "Would they trust the output enough to act" | `concierge-probe` (trust needs real stakes) |
| "Would they use it if it worked" | `wizard-of-oz-probe` |
| "Will they pay / is there demand" | `wizard-of-oz-probe`, then a fake-door; a sketch lies about demand |
| "Which probe answers my question at all" | `probe-matrix` |

This is not `probe-matrix` — that picks the probe. This runs one specific probe once the choice is made.

## Method
Set a 30-minute timer. Fill in `template.md` as you go.

1. **Write the one claim (2 min).** State it as a legibility or decision-location claim, tagged `[Hypothesis]`. If the claim contains the words demand, trust, pay, or "want it," stop — wrong probe. Hand back to `probe-matrix`.
2. **Draw the workflow (10 min).** 5–9 panels, one decision per panel, pen on paper or a single frame. No colour, no polish. Include the exception panel, not just the happy path — the decision usually hides there.

   | Panel count | Reading |
   |---|---|
   | Under 5 | You are testing a screen, not a workflow. Fine, but say so. |
   | 5–9 | Right size for one workflow. |
   | Over 9 | You are testing the whole product. Split it. |
3. **Recruit one real operator (target segment).** Not a colleague, not a founder friend — they read your intent, not the artifact.
4. **Run silent (10 min).** Hand over the sketch. Ask them to talk through what they would do at each panel. You say nothing until they finish. Log every pause in the run table.
5. **Classify each pause (5 min).** Legibility gap (resolves when you explain) or decision point (needs off-page judgment or context).
6. **Write the read-out (3 min).** Legible yes/no with the count, the one panel where the decision lived, the evidence-ladder score, and the mandatory "what this does NOT tell you" block.

Bands:

| Signal | Band | Meaning |
|---|---|---|
| Panels followed unprompted | ≥ 80% | Legible enough to build the flow |
| Panels followed unprompted | < 80% | Redraw; do not advance |
| Panels carrying the decision | 1 | Workflow is decomposed |
| Panels carrying the decision | > 2 | Not decomposed yet; the job is still fuzzy |

Legibility % = (panels not blocked by a legibility gap) / N. A decision-point pause does NOT count against legibility — the operator followed the panel and reached for off-page judgment, which is the finding, not a failure.

## Evidence standard
On the ladder — money moved 1.0, behaviour observed 0.7, artefact shown 0.5, verbal commitment 0.3, opinion 0.1 — a paper probe observes behaviour (0.7) about legibility and decision location, and nothing else. Demand and feel are not observable from a sketch, so any demand or feel signal it produces is opinion, capped at 0.1. The probe is honest about workflow legibility and where the decision sits; it lies about how it feels to use and about real demand. Done means you can name the decision panel and cite the pause behaviour. You have not earned a demand number and must not write one.

## Gotchas
- Reading "yeah I'd use this" as demand. It is opinion at 0.1. The sketch lies about demand at every fidelity, so polishing it changes nothing.
- Drawing the happy path only. The decision almost always lives in the exception panel you were tempted to skip.
- Narrating the sketch as they go. You contaminate the legibility read. Run silent; explain only after they finish.
- Using a colleague or co-founder as the operator. They infer intent from knowing you, which is exactly the crutch a real user will not have.
- More than nine panels. You are testing the product, not a workflow, and the read-out will be mush.

Kill line (auto-fail): the read-out claims the sketch proved demand, willingness to pay, trust, or how the product feels to use.

## Examples
[examples/sample.md](examples/sample.md) — Mentix runs a sketch probe of the factory-copilot alert-to-action flow; the decision turns out to live in the "halt the line" panel, which needs shift context that was never on the page.

## Related skills
- `probe-matrix` — the router that should have sent you here; go back to it if your claim is about demand, trust, or cost.
- `wizard-of-oz-probe` — the next rung when the claim is "would they use it if it worked."
- `concierge-probe` — when the claim is trust or willingness to pay under real stakes.
- `evidence-ladder` — the scoring ladder this read-out uses.
Supersedes nothing. It absorbs the paper/L1 rung of `skills/discovery/prototyping-pretotyping` and sharpens it: that skill tests "workflow"; this one tests legibility and decision location, and refuses to let a sketch speak about demand. It **narrows** that one rung — it does not replace the whole skill. `probe-matrix` is what supersedes `prototyping-pretotyping`, so this skill's `supersedes: none` is correct.
