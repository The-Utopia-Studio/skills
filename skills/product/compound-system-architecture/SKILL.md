---
name: compound-system-architecture
description: >-
  Fires when a fellow is ready to design how the AI product is actually built —
  "architect the product", "how do we build the AI system", "design the AI system",
  "what's the system architecture", "what does the stack look like". Returns a
  compound-system architecture (input → router → retrieve/reason/act → validate &
  guardrails → output over a data layer), a 40/20/30/10 effort-allocation plan, and
  named model-swap points, then kills any monolithic one-big-prompt design. Do NOT
  fire to write the pass/fail scope (use eval-first-spec), to render the HTML/SVG
  picture (use design/architecture-diagram), or to argue defensibility (use
  moat-design-canvas).
type: generator
supersedes: none
---

# Compound-System Architecture

## What it does

Turns "how do we build this?" into a component pipeline, an effort budget, and a set
of swap points. The fellow describes the product; the skill returns the architecture as
a compound system of specialised parts over a data layer, allocates build effort across
Data / Model / Orchestration / Interface, and marks every place a model is called so a
new model release is a config change, not a rebuild. It forces the design that most AI
products actually need and refuses the one most fellows reach for: one big prompt.

## The Icarus reframe

An AI product is not a model with a prompt. It is a compound system — input → router →
(retrieve / reason / act in parallel) → validate & guardrails → output — sitting on a
data layer, where each part is specialised and separately swappable. The effort split
is Data 40 / Model 20 / Orchestration 30 / Interface 10, and the number that stops
fellows cold is that the model is only 20%: the work is the data you ground on and the
orchestration around the call, not the call. Because the model is one swappable node,
every model release becomes a config change gated by an eval — not a reason to rebuild.

## When to use / When NOT

Use when: the concept and wedge are set and the question is now how to build v1; a
fellow is about to start with "we'll just send it all to a big model"; a build already
exists and needs to be decomposed into components with swap points.

| Not this skill | Use instead | Why |
|---|---|---|
| "Write the pass/fail spec — golden cases, failure rate, cost budget" | `eval-first-spec` | That defines the scoreable contract for the build; this lays out the components and effort split. The two compose: the swap-point evals here ARE that skill's golden cases. |
| "Draw me the diagram / give me the HTML architecture picture" | `design/architecture-diagram` | That renders the dark-themed HTML/SVG. This decides the components and allocation; route the picture there once the pipeline is filled. |
| "Is this defensible / where's the moat" | `moat-design-canvas` | That sequences the moat gates. The data layer here feeds the moat, but this skill is a build plan, not a defensibility argument. |
| "Structure the pilot deal / price it" | `pilot-six-term-sheet` | That is the commercial term sheet. This is the technical architecture. |

If the input is a bare one-liner with no workflow named, do not invent components. Ask
the one question that unblocks it — which workflow's data does this run on? — or return
the smallest honest next step.

## Method

Copy this checklist:

```
Compound-System Architecture progress:
- [ ] Step 1: State the one-sentence system job
- [ ] Step 2: Specify the data layer and score its grounding evidence
- [ ] Step 3: Fill the component pipeline (each node: job, I/O, failure mode)
- [ ] Step 4: Allocate effort across Data/Model/Orchestration/Interface
- [ ] Step 5: Name the model-swap points and their gating evals
- [ ] Step 6: Run the kill line before returning
```

**Step 1 — the system job.** One sentence: what the whole system turns into what, for
whom. Not a feature list. If it needs "and" three times, it is more than one system.

**Step 2 — the data layer.** The corpus, state, and memory the system reasons over.
Name the source and score it on the evidence ladder: does this data exist and is it
accessible today, or is it a hope? A data layer that is `[Hypothesis]` ("we'll have
great data once users come") is not designed — it is deferred. The best data layer is
workflow exhaust (see `yoda-data-sourcing`): data the workflow already produces.

**Step 3 — the component pipeline.** Fill every row of [template.md](template.md). The
spine is fixed; a product may collapse a node (a rules router instead of a model router)
but may not delete one silently.

| # | Component | Its one job | Failure mode if missing or weak |
|---|---|---|---|
| 0 | Data layer | Ground the system in real facts/state | Confident hallucination; nothing to retrieve |
| 1 | Input | Normalise and validate the request; reject malformed early | Garbage in; prompt injection reaches the model |
| 2 | Router | Classify the request and dispatch to the right path (cheap model or rules) | One expensive path for every request; trivial calls cost frontier money |
| 3a | Retrieve | Pull grounding facts from the data layer | Ungrounded answer |
| 3b | Reason | The model call(s) that plan or synthesise | (this is the model — the 20%) |
| 3c | Act | Tool calls, writes, side effects | A read-only toy that cannot do the job |
| 4 | Validate & guardrails | Check output against schema, rules, and policy before it ships | Wrong or unsafe output reaches the user; no autonomy is possible |
| 5 | Output | Format, deliver, and log for eval | Cannot score, cannot improve |

Retrieve / reason / act run in parallel where the router fans out; validate is the gate
they all pass through. No node may be "the model handles that" — if the model both
reasons and guards its own output, component 4 does not exist and the system cannot be
made autonomous.

**Step 4 — effort allocation.** Map real build work into four buckets. Target and bands:

| Bucket | Target | Band | Rule |
|---|---|---|---|
| Data | 40% | 35–50 | Must be ≥ Model. If Model > Data, that is a red flag on its own. |
| Model | 20% | 10–20 | Above 20% requires a stated, legitimate reason (below), or it is a kill. |
| Orchestration | 30% | 25–40 | Router + retrieve + act + validate. Usually the second-biggest bucket. |
| Interface | 10% | 5–15 | Meet the user in a surface they already use; a new app is rarely the wedge. |

Legitimate reasons for Model > 20%: the product's core value *is* frontier reasoning
(a diagnosis or research engine where the reasoning is the deliverable), or a regulated
domain mandates a specific certified/fine-tuned model. Not legitimate, because they are
Data or Orchestration problems wearing a Model costume: "we need a great prompt", "our
jargon is niche" (that is a glossary in the data layer), "the new model is impressive",
"we'll fine-tune to fix accuracy" (fix retrieval and validation first). Name the reason
in the plan or push the number back down.

**Step 5 — model-swap points.** Every model call is a swap point. Fill the swap table:
current model, the swap trigger, the eval that gates the swap, and where the config
lives. A swap point is only real if you can name the eval — otherwise a model change is
a leap of faith, not a config change. Those evals are the `eval-first-spec` golden cases.

**Step 6 — the kill line.** Run the self-check at the foot of [template.md](template.md).

## Evidence standard

Money moved 1.0 → behaviour observed 0.7 → artefact shown 0.5 → verbal commitment 0.3 →
opinion 0.1. Here the ladder scores the **data layer**, because that is where the system
is either grounded or guessing. Do not accept a data layer whose grounding is opinion
(0.1: "there's tons of data in this industry") or a hypothesis (0.1: "we'll collect it
once we launch"). The bar is behaviour (0.7): the data is workflow exhaust the target
already produces, and the fellow can point to a live instance of it. Tag every claim
about data, latency, cost, or accuracy `[Fact]`, `[Assumption]`, or `[Hypothesis]`.
An architecture is done when each component has a named, existing input — not a promised
one.

## Gotchas

- **The model-first trap.** Fellows arrive wanting to pick or fine-tune a model. That is
  the 20% bucket, chosen before the 40% (data) and 30% (orchestration) buckets exist.
  Fine-tuning at v1 almost always means Model is over-weighted with no legitimate reason.
  Route the energy back to the data layer and orchestration first.
- **The disappearing guardrail.** "The model checks its own output" means component 4
  does not exist. A model cannot be its own validator; without an independent guard the
  product can never move up the autonomy ladder past a human-in-the-loop toy.
- **A data layer that is a hope.** The commonest way this skill returns "not done" is a
  data layer scored `[Hypothesis]`. No amount of pipeline elegance saves a system with
  nothing real to retrieve. Push to workflow exhaust that exists today.
- **Swap points without evals.** Naming the config knob is half the job. If there is no
  golden-case eval that decides whether the new model is better, the swap is a gamble,
  and the "model-agnostic" claim is decoration. Point every swap point at an eval.
- **Collapsing is fine; deleting silently is not.** A rules-based router or a single act
  step is legitimate for a small tool. Writing the node as "n/a — rules" is honest;
  omitting it so the diagram looks clean hides a decision.

## Examples

[examples/sample.md](examples/sample.md) — Mentix's factory-manager AI copilot built as
a compound system: the plant-data layer as the 40%, a general LLM behind a swap boundary
as the 20%, the router/retrieve/act/validate work as the 30%, chat inside the existing
shift tool as the 10%, with three named swap points each gated by golden cases.

## Related skills

- `eval-first-spec` — the scoreable contract for this build. Run it alongside; its golden
  cases are the evals that gate every swap point named here. Architecture without a spec
  is untestable; a spec without an architecture has nothing to test.
- `design/architecture-diagram` — renders the filled pipeline as a dark-themed HTML/SVG
  diagram. This skill decides the components; that one draws them. Do not restate its
  design system here.
- `yoda-data-sourcing` — how to find the workflow exhaust that becomes the data layer.
  This skill assumes that layer exists; if it does not, start there.
- `moat-design-canvas` — sequences the moat. The compounding data layer designed here is
  usually the moat's engine, but defensibility is argued there, not here.
- Supersedes nothing. It is the build-shape gate at the top of the commit-build stage.
