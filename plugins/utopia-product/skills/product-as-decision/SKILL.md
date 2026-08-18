---
name: product-as-decision
description: >-
  Restates a product idea as ONE decision a named human makes, then quantifies how
  that decision is compressed — before→after on a single axis of time, effort, or
  autonomy (e.g. six minutes → thirty seconds). Fires on "what's the product here",
  "frame the problem", "what decision are we changing", "state this as a decision",
  "what are we actually changing for the user". Output is a filled Compressed-Decision
  Statement: the decision (never a feature), its one owner, the before→after
  compression with a source, and the autonomy-ladder move, every claim tagged
  [Fact]/[Assumption]/[Hypothesis]. NOT for stripping the job to primitives (use
  job-in-primitives), NOT for mapping and pricing the whole workflow (use
  current-state-map), NOT for the 8-dimension go/no-go (use problem-quality-scorecard),
  NOT for the per-unit prize ratio (use physics-floor-gap).
type: generator
supersedes: none
---
# Product as Decision

## What it does
Forces one sentence: this product makes ONE decision, made by one named human, go from a costly before to a cheap after. It refuses feature language ("a copilot", "a dashboard", "a platform") and refuses problem-narrative ("users feel frustrated"). It names the decision as a verb a person performs, names the single owner who stakes something on it, and quantifies the compression on one axis — time, effort, or autonomy — with the before number sourced and the after claim flagged as a hypothesis the build must earn. The output is a filled Compressed-Decision Statement ([template.md](template.md)). If there is no before→after compression, there is no product yet.

## The Icarus reframe
A generic prompt frames a product as a problem narrative — persona, pain, feeling — or as a feature list. Both let the fellow smuggle in the answer before locating the question. Icarus says a product is neither: it is a single decision that a human makes today, made easier, faster, or automatic. So the artefact is not a story and not a spec — it is the decision itself plus its compression: what used to take six minutes now takes thirty seconds, or what a person decided unaided a machine now drafts for approval. Name the decision with a verb, quantify the before→after on one axis, and you have stated the product. If you cannot name the decision without a product noun, or cannot show a before→after, you have a feature in search of a problem, and the skill says so instead of dressing it up.

## When to use / When NOT
Use it when a fellow has an idea and needs it stated as the one decision it changes, with the compression made explicit.

| Situation | Use this? | Go to |
|---|---|---|
| "What's the product here? What decision are we changing?" | Yes | product-as-decision |
| "Frame the problem — state this as a decision, not a feature." | Yes | product-as-decision |
| "In one line, what are we changing for the user?" | Yes | product-as-decision |
| "Strip this to the primitive job — what's really being done?" | No | `job-in-primitives` |
| "Map the workflow and price every step as it happens today." | No | `current-state-map` |
| "Score this problem across the 8 dimensions — go or no-go?" | No | `problem-quality-scorecard` |
| "Is the per-unit prize big enough to bother?" | No | `physics-floor-gap` |
| "Stress-test the whole idea across five questions." | No | `so-what-stress-test` |

This skill states and compresses exactly one decision. It does not reduce the job to primitives, price the workflow, score the problem, or size the prize. It also absorbs the generic empathy problem-statement and beats it — see Related skills — so it does not route there.

## Method
Fill the sheet in [template.md](template.md). Do not narrate; fill the lines. Tag every empirical claim `[Fact]` (priced artefact or observed behaviour), `[Assumption]` (a stated, defensible estimate), `[Hypothesis]` (a guess or a not-yet-observed claim).

**Step 1 — Name the decision, not the feature.**
State it with a judgment verb the human performs: *decides whether, picks which, approves, prioritises, sizes, diagnoses, releases.* Strike any product noun — dashboard, copilot, platform, tool, app, assistant, system, "AI". A copilot is not a decision; ask which decision the copilot would change. If the fellow cannot name the decision, stop and ask. Invent none.

**Step 2 — Name the one owner.**
One title, who makes this call today and stakes something on being wrong (budget, a safety sign-off, an SLA, their name). Not the user of the software — the owner of the call. Two owners means two products.

**Step 3 — Pick the single moving axis.**
Exactly one. Time (same decision, faster), effort (same decision, less human work to reach it), or autonomy (the call moves up the ladder). If two axes seem to move, the dominant one is the product; note the other and drop it from the statement.

**Step 4 — State before → after, quantified, sourced.**
Before is the cost of the decision today — minutes, pages read, or a rung on the autonomy ladder — and it must sit on behaviour or money, not opinion (see Evidence standard). The after is what the product claims, and its value comes from the fellow's own stated target ("we think we can cut it to X"); where the fellow gives none, label it an illustrative target and never silently mint a specific figure a careless reader could mistake for a commitment. Mark the after `[Hypothesis]`: it is a claim the build must earn, never a fact at framing time.

**Step 5 — Place before and after on the autonomy ladder.**

| Rung | Who decides |
|---|---|
| L0 | Human decides unaided |
| L1 | Machine surfaces the inputs; human decides |
| L2 | Machine drafts the decision; human approves each one |
| L3 | Machine decides; human audits a sample |
| L4 | Machine decides; no human in the loop |

Name before-L and after-L. State any liability or regulatory reason the after cannot climb higher (a signed, liable human caps the ladder — that is a finding, not a failure).

**Step 6 — Compression band.**

| Ratio on the moving axis / ladder jump | Band | Read |
|---|---|---|
| = 1×, or interface-only change | No compression | Not a product. You renamed a feature. Reframe or kill. |
| < 2× | Marginal | A nicer way to make the same call. Weak as a standalone wedge. |
| 2–10× | Step change | Real compression. A wedge if the decision recurs and the outcome is paid for. |
| ≥ 10×, or a ladder jump of ≥ 2 rungs | Order of magnitude | The Icarus target. The decision's economics change, not just its speed. |

**Step 7 — Downstream.** One line: what money moves or what behaviour changes once this decision is compressed. If nothing downstream moves, a fast decision is a party trick.

**Step 8 — Write the one-line statement.** `[Owner] decides [the decision] in [after] instead of [before] — a [axis] compression of ___× (L_→L_).`

**Kill line: a statement that names a feature where a decision belongs, or shows no quantified before→after on a single named axis, is an auto-fail.** The decision plus its compression is the product. No compression, no product.

## Evidence standard
The before number is where fellows flatter themselves. It must sit on behaviour or money, weighted by the evidence ladder:

| Signal for the "before" cost | Ladder weight |
|---|---|
| An invoice / rate card / price paid for the decision (money moved) | 1.0 |
| The decision step timed directly in a real workflow (behaviour observed) | 0.7 |
| A priced artefact the decision produces, shown but not transacted | 0.5 |
| "It takes about six minutes" (verbal commitment) | 0.3 |
| The fellow's opinion of how long it takes | 0.1 |

If the only input for the before is opinion (0.1), the skill declares the input **not ready** and names the cheapest way to get the real number: time the decision step once, or pull one artefact. The after is always a `[Hypothesis]` — you cannot mark the compression `[Fact]` before a probe shows a human reaching the same or better call in the claimed after-time. Promoting the after to a fact is the auto-fail this standard exists to catch.

## Gotchas
- **Feature smuggling.** "The product is an AI copilot for factory managers" names the software, not the decision. Copilot for *which* decision? Strike the noun; recover the verb. If no verb survives, there is no product to state.
- **Compressing the artefact, not the decision.** Making the report faster to write is not the same as making the decision the report drives faster or better. Frame the decision, not the deliverable. (Its per-unit prize is `physics-floor-gap`'s job, not this skill's.)
- **The after marked as a fact.** The compression is a hypothesis until observed. A 12× claim at framing time is a `[Hypothesis]`, never a `[Fact]`. If the ranked list makes the owner slower or less accurate, the compression is negative and the product does not exist.
- **Two decisions wearing one coat.** An "and" in the decision line means two products. Pick the wedge decision; park the other explicitly. Do not average them into one blurry statement.
- **Interface change dressed as compression.** A new UI over the same decision at the same speed is 1× — no compression. Prettier is not faster. The band exists to catch this.

## Examples
- [examples/sample.md](examples/sample.md) — Mentix, worked end to end: a shift supervisor's alert-triage decision compressed from ~6 min to ~30 s (12×, autonomy held at L1 because the supervisor still owns every intervention), with the after flagged as the hypothesis the probe must earn.

## Related skills
- `job-in-primitives` — reduces the job to information moved / decisions made / liability transferred, deleting every tool and role name. Run it to find the primitive; run this to pick and compress the one decision. Different altitude, not a substitute.
- `current-state-map` — maps and prices the whole workflow; this names one decision inside it and its compression. Use that for cost-per-step, this for the decision.
- `problem-quality-scorecard` — scores the problem on 8 dimensions; the compressed decision is one input to that gate, not the gate.
- `physics-floor-gap` — sizes the per-unit prize; this frames the decision the prize sits on.
- Absorbs `discovery/problem-statement` (the generic empathy narrative: I am / trying to / but / because / makes me feel). It beats it by refusing feelings and features as the answer and forcing a decision plus a quantified before→after — a testable claim, not a story. `supersedes: none`: problem-statement lives outside this module; this replaces its role inside Icarus without deleting it.
