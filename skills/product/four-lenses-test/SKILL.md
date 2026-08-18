---
name: four-lenses-test
description: >-
  Scores a specific concept across the four build-risk lenses — Desirability,
  Usability, Feasibility, Viability — where each lens is graded ONLY by its named
  tool (onion+JTBD+Kano for Desirability, a watched usability observation for
  Usability, a dev spike for Feasibility, ICE anchored to measured value for
  Viability) and run by its dual-track owner (Product/Design discovery beside
  Engineering delivery). Fires on "is this desirable / usable / feasible / viable",
  "should we build it", "run the four lenses", "go or no-go on this concept",
  "is this worth building". Output is a filled Four-Lens Scorecard: per-lens tool,
  owner, evidence + ladder weight, score, and an AND gate that KILLS the go if any
  single lens fails, every claim tagged [Fact]/[Assumption]/[Hypothesis]. NOT for
  the full problem→vision→strategy→roadmap spine (use product-frame-stack), NOT for
  scoring the PROBLEM on 8 dimensions (use problem-quality-scorecard), NOT for the
  five-question so-what gut check on the whole idea (use so-what-stress-test).
type: generator
supersedes: none
---
# Four-Lenses Test

## What it does
Takes one concept the fellow is thinking of building and forces a verdict on four separate risks — Desirability (do they want it enough to change behaviour or pay), Usability (can they actually get the outcome), Feasibility (can we build it at the accuracy/latency/cost the decision needs), Viability (does the money work). Each lens gets a score, but only through its named tool — never through an opinion. The four scores are then ANDed, not averaged: a single failing lens is a no-go no matter how strong the other three read. The output is a filled Four-Lens Scorecard ([template.md](template.md)) that names, per lens, the tool run, the track owner who ran it, the evidence produced with its ladder weight, the score, and the overall gate with the next probe for every lens short of a clean pass.

## The Icarus reframe
The generic four-lenses check (and the recommendation-canvas it descends from) asks "is it desirable, feasible, viable?" and lets a team answer each lens with a confident opinion, then averages the four into a gut "yes". Icarus refuses both moves. First, a lens is graded only by the instrument that produces behaviour or money evidence for that specific risk — Desirability by onion+JTBD+Kano, Usability by watching a real user attempt the task, Feasibility by a dev spike on the riskiest slice, Viability by ICE anchored to a measured value number — so a lens with no tool behind it is not scored, it is ungraded, and an ungraded lens cannot pass. Second, the four are ANDed: one fatal lens kills the go, because a product that no one can use is not rescued by being cheap to build. Each lens also has a named track owner (Product and Design on the discovery track, Engineering on the delivery track, running in parallel) so no single person waves a lens through on their own say-so.

## When to use / When NOT
Use it when a fellow has a specific, named concept and needs a go/no-go on whether to build it, lens by lens.

| Situation | Use this? | Go to |
|---|---|---|
| "Is this concept desirable / usable / feasible / viable?" | Yes | four-lenses-test |
| "Should we build it? Go or no-go on this concept." | Yes | four-lenses-test |
| "Run the four lenses on this idea." | Yes | four-lenses-test |
| "Is this worth building — score the build risks." | Yes | four-lenses-test |
| "Walk me from validated problem to vision, strategy, North Star, roadmap." | No | `product-frame-stack` |
| "Score this PROBLEM across the eight dimensions — is it worth solving?" | No | `problem-quality-scorecard` |
| "Give me the five-question so-what gut check on the whole idea." | No | `so-what-stress-test` |
| "Just find and prioritise the unserved need." | No | `unserved-needs-finder` |
| "Run the actual usability session and write the findings." | No | `usability-test-protocol` |
| "List every risky assumption across the eight risk categories." | No | `identify-assumptions-new` |

This skill scores one concept across exactly four build-risk lenses and gates it. It does not build the strategy spine, score the problem, gut-check the whole idea, or run the sessions themselves — it names which tool each lens needs and reads the evidence those tools return. It absorbs the generic recommendation-canvas and the four-core-risks list from `identify-assumptions-new` and beats them (see Related skills); it does not route to them.

## Method
Fill the scorecard in [template.md](template.md). Do not narrate; fill the rows. Tag every empirical claim `[Fact]` (money moved or behaviour observed), `[Assumption]` (a stated, defensible estimate), `[Hypothesis]` (a guess or a not-yet-observed claim).

**Step 0 — Name the one concept.** State the concept in one line, as concretely as the fellow gave it. If there is no concept yet — only a domain or a wish — stop and ask for it. You cannot lens a fog. Invent no concept.

**Step 1 — Assign the tool and owner to each lens.** Every lens is scored by its instrument and run by its track owner. No lens is scored by "we think".

| Lens | The question | The ONLY tool that grades it | Track / owner | Evidence it must return |
|---|---|---|---|---|
| Desirability | Do they want it enough to change behaviour or pay? | Onion (peel the need to its core) + JTBD (the job) + Kano (must / performance / delighter) | Discovery — Product leads, Design pairs | A core unserved need + its Kano class, ideally with a behaviour or money signal it is real |
| Usability | Can they get the outcome without help? | Usability observation — watch a real user attempt the task on a prototype | Discovery — Design leads, Product observes, Eng watches | Observed task success or failure on a mock, not stated preference |
| Feasibility | Can we build it at the accuracy / latency / cost the decision needs? | Dev spike — build the single riskiest slice for real | Delivery — Engineering leads | A spike result (hit or missed the floor), not an estimate |
| Viability | Does the money work — value captured > cost to serve? | ICE (Impact × Confidence × Ease), Impact = measured value, Confidence = evidence weight, Ease = the spike result | Business — Product / founder leads | A value number with a source on the ladder; price at 10–20% of it |

The discovery track (Desirability, Usability) and the delivery track (Feasibility) run in parallel — that is the dual-track. Viability is read once the spike sizes the cost.

**Step 2 — Score each lens.** A lens is scored only if its tool was actually run. Opinion is not a score.

| Score | Verdict | Meaning | Evidence weight |
|---|---|---|---|
| 3 | PASS | Tool run; lens bar cleared on behaviour or money | ≥ 0.5 |
| 2 | CONDITIONAL | Tool run or a credible artefact/commitment exists; bar likely cleared but a probe is still needed | 0.3–0.5 |
| 1 | FAIL | Tool run; the lens bar was NOT cleared (users failed the task / spike missed the floor / value < cost to serve) | any |
| 0 | UNGRADED | No named tool run; only opinion behind it | 0.1 |

**CONDITIONAL(2) vs UNGRADED(0) — the deciding test is whether the tool is in play.** Score 2 when the named tool was run or partially run and the result is genuinely inconclusive — a real but incomplete read (an artefact shown not transacted, a half-finished session) with no one asserting the lens passes; a named probe finishes it. Score 0 when the tool has not run at all, or someone is claiming the lens passes on opinion. Tool-in-play-but-inconclusive → 2 → NOT-YET; no-tool-or-opinion-pass → 0 → BLOCKED. This fixes the verdict label deterministically — two readers grade the same input the same way — and never breaches the kill line: a 2 is never a GO.

**Step 3 — Apply the gate (AND, never average).**

| Any lens at… | Overall verdict | What to do |
|---|---|---|
| 1 (FAIL) | **NO-GO** | Kill or reframe. The failing lens names the fix; do not average it away. |
| 0 (UNGRADED) | **BLOCKED** | Run the missing tool. You may not grade a lens on opinion. |
| 2 (CONDITIONAL) | **NOT-YET** | Name the cheapest probe that lifts each conditional lens to a 3. |
| all four = 3 | **GO** | Build. Every lens cleared its bar on behaviour or money. |

**Step 4 — Name the next probe per lens.** For every lens below 3, write the single cheapest observation that would move it up: the usability session to run, the spike to build, the value number to price, the behaviour to observe. This is the output the fellow acts on.

**Step 5 — Write the one-line verdict.** `[Concept]: D_ U_ F_ V_ → [GO / NOT-YET / NO-GO] — blocked by [weakest lens], next probe: [___].`

**Kill line: giving any lens a PASS on opinion with no tool run, or returning GO while any lens sits at FAIL, is an auto-fail.** Four graded lenses, ANDed. No tool, no grade; one fail, no go.

## Evidence standard
Desirability and Viability are where fellows flatter themselves — "users love it", "the ROI is obvious". A lens score is only as strong as the evidence weight beneath it, on the ladder:

| Signal behind a lens | Ladder weight | Best lens it grades |
|---|---|---|
| An invoice / price paid / renewal signed (money moved) | 1.0 | Viability, Desirability |
| A user observed doing the task or the behaviour (behaviour observed) | 0.7 | Usability, Desirability, Feasibility (spike on real data) |
| A priced artefact or a working spike, shown not transacted | 0.5 | Feasibility, Viability |
| "They said they'd use it / pay for it" (verbal commitment) | 0.3 | Desirability, Viability |
| The fellow's or an engineer's opinion | 0.1 | grades nothing — the lens stays UNGRADED |

A lens riding on opinion (0.1) is scored 0 and blocks the gate; the skill says so and names the tool to run. Confidence inside the Viability ICE is not a vibe from 1 to 10 — it is the ladder weight of the value claim. A CONDITIONAL is honest (0.3–0.5 evidence with a probe named); a PASS minted from a verbal or an opinion is the auto-fail this standard exists to catch.

## Gotchas
- **Averaging the four.** "3, 3, 3, 1 — that's 10 out of 12, ship it." No. The 1 is a NO-GO. A concept nobody can use is not saved by being desirable and cheap. The gate is AND; the moment a lens is averaged against another, the test has failed.
- **A lens with no tool.** "Desirability: strong, users clearly want it." Graded by what? If no onion+JTBD+Kano ran and no behaviour was observed, Desirability is UNGRADED (0), not a pass. Feasibility "we can definitely build it" with no spike is the same trap on the engineering side.
- **Feasibility by estimate instead of spike.** An engineer's confidence is a 0.1 opinion until a slice is built. The dev spike exists so the riskiest technical claim is observed, not guessed. "We've done harder things" does not grade this lens.
- **Usability tested as opinion.** "Do you like it?" is not a usability observation. The lens is graded by watching a real user succeed or fail at the task on a prototype — observed behaviour (0.7), not stated preference (0.3). Route the session to `usability-test-protocol`.
- **Viability priced on cost-plus or a competitor.** ICE Impact must be the measured value to the customer, priced at 10–20% of it — not cost plus a margin, not what a rival charges. A value number with no source on the ladder is a 0.1, so Viability stays ungraded.
- **Lensing a fog.** "Should we build something in gas safety? Run the four lenses." There is no concept to lens. Ask for the one concept first; do not manufacture four scores for an idea that does not exist.

## Examples
- [examples/sample.md](examples/sample.md) — Barrier Intelligence, worked end to end: a gas-alert prioritiser scored on all four lenses. Desirability PASSes on field-log behaviour and Feasibility PASSes on a spike, but a watched usability session shows gloved techs mis-tapping the ranked list — Usability FAILs, so the AND gate returns NO-GO despite three strong lenses, with the glove fix and the priced-value probe named. The anti-average, anti-flattery case.

## Related skills
- `product-frame-stack` — builds the whole problem→vision→strategy→North Star→OKR→roadmap spine and blocks unvalidated problems from passing down. This gates one concept's four build-risks; that gates the strategy. A concept that passes four-lenses is one input to the frame stack, not a substitute for it.
- `problem-quality-scorecard` — scores the PROBLEM on eight dimensions (is it worth solving). This scores the SOLUTION concept on four build-risks (should we build this answer). Different object: run the scorecard on the problem before you lens the concept.
- `so-what-stress-test` — the five-question gut check on the whole idea at concept-council. This is the disciplined, tool-per-lens go/no-go once a concept is concrete. Gut check first, lens second.
- `unserved-needs-finder` — runs the onion+JTBD+Kano that grades the Desirability lens. `usability-test-protocol` / `first-mocks` — run the observation that grades Usability. `value-based-pricing` — sets the value the Viability ICE is anchored to. `physics-floor-gap` — sizes the per-unit prize behind Impact. This skill orchestrates their outputs into one gate; it does not restate them.
- Absorbs `concept/recommendation-canvas` (the generic evaluate-across-outcomes-and-risks canvas) and the four-core-risks list inside `discovery/identify-assumptions-new`. It beats them by refusing to score a lens without its named tool and by ANDing the lenses instead of narrating them into a confident recommendation. `supersedes: none`: both live outside this module; this replaces their role inside Icarus without deleting them.
