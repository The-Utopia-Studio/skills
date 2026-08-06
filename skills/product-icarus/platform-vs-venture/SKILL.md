---
name: platform-vs-venture
description: >-
  Draws the ownership line for an AI build. For every component it decides one of
  three things: Daedalus (the studio platform) builds it once and the fellow inherits
  it, the fellow builds it because it is their moat, or it is a rented commodity.
  Fires on "build vs buy", "build or use the platform", "what does Daedalus give me",
  "do we build our own eval harness / RAG / router", "what's ours vs the studio's",
  "should we build our own model". Returns a build/buy boundary map that splits each
  component into platform substrate (inherit) and domain signal (build), and kills two
  errors: rebuilding a platform primitive, or buying/outsourcing what is actually the
  moat. Not for sequencing the moat into dated gates (use moat-design-canvas), not for
  laying out the component pipeline and effort split (use compound-system-architecture —
  run it first), not for writing the actual guardrail rules and thresholds (use
  guardrail-design).
type: generator
supersedes: none
---

# Platform vs Venture

## What it does

Takes the components of a fellow's AI build and assigns each one to a lane: Platform (Daedalus builds it once, every venture inherits it), Venture (the fellow builds it, it is their moat), or Buy (a vendor rents it, it is nobody's moat). It splits each shared component into its substrate — the plumbing — and its signal — the domain content running through the plumbing, so the fellow inherits the router, eval harness, RAG pipeline, guardrail engine and observability while still owning the corpus, the domain reasoning and the rules that fire inside them. The output is a filled boundary map. It ends with a two-error kill line: if a component that carries no domain signal sits in the Venture lane, the fellow is about to rebuild a platform primitive and waste the one resource they cannot refill; if a component that carries the domain signal sits in the Buy or Platform lane, the fellow is about to let someone else own their moat. Either one returns `BOUNDARY WRONG` and names the single reassignment that fixes it.

## The Icarus reframe

Build-vs-buy is usually a cost calculation: cheapest total ownership wins. Icarus refuses that axis. The only question that matters is where the fellow's finite venture time compounds, and it compounds nowhere on a platform primitive, because a router, an eval harness, a RAG pipeline, a guardrail engine and observability are identical for every venture and carry zero domain signal, so Daedalus builds each once and every fellow inherits it. The line is not drawn *between* components. It is drawn *through* each one, between the plumbing (shared, inherited) and the domain signal running through it (yours, the moat). A fellow who rebuilds the plumbing spends the only resource they cannot get back and gets no moat for it; a fellow who lets a vendor own the signal has sold the moat and kept the plumbing. Both are the same mistake — the line drawn in the wrong place — pointing in opposite directions.

## When to use / When NOT

Use when a fellow is deciding, for a build that already has a component list, what to build and what to inherit: "build or use the platform", "what does Daedalus give me", "build vs buy", "do we build our own eval harness / RAG / router / observability", "what's ours versus the studio's", "should we train our own model". Run `compound-system-architecture` first if no component list exists yet — this skill assigns lanes to components; it does not invent them.

Do not use when:

| Request | Belongs to | Why |
|---|---|---|
| "Lay out the component pipeline and the Data/Model/Orch/Interface effort split" | `compound-system-architecture` | That produces the components. This draws the ownership line through them. Run it first; feed its pipeline in here. |
| "Sequence our moat into dated gates with falsifiers" | `moat-design-canvas` | That sequences the moat over time. This decides which components *are* the moat and must stay in-venture. The components this skill marks Venture are the raw material that one sequences. |
| "Write the actual guardrail rules and thresholds / the sign-off matrix" | `guardrail-design` | This decides that the guardrail *engine* is Platform and the domain *rules* are Venture, then routes rule-writing there. It does not write the rules. |
| "Which Icarus stages apply to me / what type of fellow am I" | `fellow-path-router` | That classifies the fellow and the flow. This classifies the components of one build. |
| "Spec the agent's tools and memory / design the fleet" | `agent-design`, `workflow-design` | Those design the agent and the orchestration. This decides which parts of that design are inherited versus built. |

If the input is a bare one-liner with no build and no component named, do not invent a stack. Ask the one question that unblocks it — which component are you unsure about? — or send the fellow to `compound-system-architecture` for the pipeline first.

## Method

Fill in `template.md`. Six steps.

### Step 1 — List the components

Pull the component list from `compound-system-architecture` if it exists (data layer, input, router, retrieve, reason, act, validate & guardrails, output, observability, interface). If it does not exist, that is the missing input; route there first. Do not classify components the fellow has not named.

### Step 2 — Run the moat test on each component

One discriminator, applied to every component:

> **If a well-resourced competitor had this exact component tomorrow, is your product still defensible?**

| Answer | Meaning | Lane |
|---|---|---|
| Still defensible — the competitor gains nothing | Not your moat | Platform (if Daedalus provides the primitive) or Buy (if a vendor rents it) |
| No longer defensible — the competitor now competes head-on | Your moat | Venture. Build it. Never outsource it. |

This is the unlimited-resources test from `moat-design-canvas`, applied to a component instead of a whole idea. Speed, UX polish and "we built it ourselves" all fail it — a competitor with the same component erases them. Only structure survives: the corpus they cannot legally accumulate, the domain reasoning they cannot reproduce, the flywheel signal they have no traces to feed.

### Step 3 — Split each shared component into substrate and signal

Most components are both. The substrate is inherited from Daedalus; the signal is built in-venture. Draw the line through the component:

| Nominal component | Substrate (Platform — inherit) | Signal (Venture — build, the moat) |
|---|---|---|
| Retrieval / RAG | chunking, embedding, vector ops, the retriever | the corpus + what "relevant" means in this domain |
| Eval | the harness/runner, scoring, the regression gate | the golden cases (from your corpus) + the domain pass/fail bar |
| Guardrails | the policy engine, schema validation, sign-off routing | which rules fire + the domain thresholds + the cost-of-error matrix |
| Router | the classify/dispatch machinery | which paths exist + the domain reasoning each path runs |
| Observability | tracing, logging, cost accounting, dashboards | which trace signal you mine into the flywheel |
| Model | — (whole thing is Buy: rented, swappable) | the domain reasoning wrapped *around* the call, never the weights |

A generic build-vs-buy answer treats each row as one binary — build the RAG or use the RAG. The Icarus answer splits the row: inherit the substrate, build the signal. If a fellow cannot name the signal half of a component, that component is pure substrate and belongs entirely to Platform.

### Step 4 — Assign the three lanes

| Lane | Built once by | Canonical members | Rebuilding it costs you | Losing / leaking it costs you |
|---|---|---|---|---|
| **Platform** | Daedalus (the studio) | router · eval harness · RAG pipeline · guardrail engine · observability · auth / deploy / secrets | Finite venture time, for zero moat | Nothing — you re-inherit it |
| **Venture** | The fellow | domain reasoning · corpus / golden cases · flywheel signal · domain rules inside the engine · the wedge interface | It is *supposed* to cost you time; that is the point | The moat. Fatal. |
| **Buy** | A vendor | base model weights · cloud infra · vector-DB product · commodity SaaS (billing, email) | Time spent rebuilding a commodity | Nothing — swap the vendor |

The base model is the canonical Buy: rented, swappable, gated by an eval (see `compound-system-architecture`'s swap points). A fellow who calls a rented, swappable model their moat has mislabelled a commodity.

### Step 5 — The two-error kill line

Check every assignment against both errors. Either one is a fail.

| Error | Trips when | Direction | Severity | Fix |
|---|---|---|---|---|
| **Rebuild** | A component in the Venture lane has no domain signal — it is a platform primitive | Building what you should inherit | Expensive waste | Move it to Platform; redirect the time to the corpus and domain reasoning |
| **Moat leak** | A component in the Buy or Platform lane fails the moat test — a competitor with it beats you | Outsourcing what you must own | Fatal | Move it to Venture; never let a vendor own it |

The two errors are not symmetric in cost. Rebuilding a primitive burns weeks. Leaking the moat ends the venture. When a component is genuinely ambiguous, keep it in-venture until it is *proven* commodity by the moat test — but do not gold-plate every box as "our special sauce", because rebuilding everything is the rebuild error at scale and it burns the whole venture clock.

### Step 6 — Verdict and the one change

**Verdict:** `BOUNDARY DRAWN` or `BOUNDARY WRONG — reason`.

`BOUNDARY WRONG` fires if any of these is true:
- A platform primitive (router / eval harness / RAG pipeline / guardrail engine / observability) sits in the Venture lane with no domain signal named.
- A component that fails the moat test sits in the Buy or Platform lane (the moat is being outsourced).
- A rented, swappable commodity (base model, cloud) is labelled the moat.

When it fires, name the single reassignment that fixes it. Do not soften. A fellow rebuilding a primitive is not being thorough, and a fellow buying their moat is not being fast — both are drawing the line in the wrong place.

## Evidence standard

Every Icarus skill weights behaviour and money over opinion. The ladder scores the claim "this component is our moat":

| Signal that a component is the moat | Score |
|---|---|
| A customer renews or expands *because of* what this component produces | 1.0 |
| Each use deposits an asset a competitor cannot reproduce (corpus deepens, traces accumulate) | 0.7 |
| The component's output is cited in an external artefact the customer shows others | 0.5 |
| "This feels like our edge / our secret sauce" | 0.1 |

The bar: classify a component as Venture-moat only when the moat claim scores **≥ 0.5** — it deposits an observable asset, or there is money on it. "This feels defensible" (0.1) is not a reason to spend venture time building or to refuse to outsource; it is a claim to test with the moat test in Step 2. Symmetrically, do not inherit a component from Platform just because it is cheaper — inherit it because a competitor having it changes nothing, which is a structural fact, not a preference. Tag every empirical claim `[Fact]`, `[Assumption]`, or `[Hypothesis]`. Any claim about what Daedalus provides today versus what is on the platform roadmap is `[Assumption]` until confirmed — never inherit a primitive that does not yet exist.

## Gotchas

Rebuilding the plumbing to feel in control. Building your own eval harness, your own vector store, your own tracing feels like real engineering and hands you a sense of ownership. It also carries zero domain signal and burns the venture clock while the actual moat — the corpus, the golden cases — goes unbuilt. The feeling of control is not a moat. Inherit the primitive; spend the recovered weeks on the signal.

Buying the moat to move fast. Outsourcing the alert-labelling, buying a third-party domain-rules library, licensing someone else's dataset all look like speed. They are the fatal error: the compounding asset now lives outside the venture, and the vendor — or their next customer — can rebuild your product. Speed that ships the moat to a supplier is not speed; it is the end state arriving early.

The rented model mistaken for the moat. "We need our own model or we have no defensibility" mislabels a commodity. The base model is Buy: rented, swappable, gated by an eval. The moat is the domain reasoning and corpus wrapped around the call, which is what makes any model good on this problem. Fine-tuning at v1 is usually the rebuild error wearing a model costume — fix retrieval and the corpus first.

Platform primitive assumed, not confirmed. "Daedalus gives us the router" is an `[Assumption]` about the studio roadmap until it is confirmed to exist today. Inheriting a primitive that is still on a slide leaves a hole in the fellow's own build with no owner. Confirm the primitive exists before you delete it from the venture's scope.

Gold-plating every box as venture-moat. The mirror image of the rebuild error: marking every component "ours, special, must-build" so nothing gets inherited. That is the rebuild error applied to the whole stack, and it guarantees the venture clock runs out before the one real moat is deep. Most boxes are Platform or Buy. The moat is two or three components, not twelve.

## Examples

`examples/sample.md` — a full worked boundary map for Mentix's factory-manager AI copilot, taking the exact component pipeline `compound-system-architecture` produced (plant-data layer, router, retrieve/reason/act, validate, chat interface) and assigning each node to a lane. It catches a rebuild error — Mentix planned to build its own RAG pipeline and its own agent orchestration, both platform primitives — and shows the substrate/signal split that keeps the plant-workflow corpus and the factory-domain reasoning in-venture while inheriting the plumbing.

## Related skills

`compound-system-architecture` — produces the component pipeline and the Data/Model/Orch/Interface effort split. Run it first. This skill takes that pipeline and draws the ownership line through every node. Architecture without an ownership line ships a build where the fellow accidentally re-derives the studio spine; an ownership line without an architecture has no components to assign.

`moat-design-canvas` — sequences the moat into dated gates with falsifiers. The components this skill marks Venture are exactly the material that one sequences: the corpus, the flywheel signal, the domain reasoning. This decides *which* components are the moat; that decides *whether and when* they compound. Run this first, then take the Venture lane into the canvas.

`guardrail-design` — writes the domain rules and thresholds that fire inside the inherited guardrail engine. This skill splits the guardrail into engine (Platform) and rules (Venture) and routes the rule-writing there. It does not write the rules.

`data-rights-clause` — secures the fellow's legal right to accumulate and retain the corpus. A corpus is only a real Venture moat once the right to keep the data it deposits is signed; until then the moat claim rests on an `[Assumption]`. When a Venture-lane corpus's rights are unconfirmed, route here before treating it as settled.

`dataset-builder` — builds the golden-case set. When the component this skill marks Venture *is* the golden cases (the eval signal, not the inherited harness), that set still has to be built; route the golden-case work there.

`agent-design` / `workflow-design` — spec the agent's tools and memory and the multi-agent fleet. This decides which parts of those specs are inherited from the platform and which are built in-venture, especially the memory layer, which `agent-design` already flags as the only part the fellow owns.

Supersedes: none. This is a new skill. It beats the generic build-vs-buy TCO analysis not by adding cost columns but by changing the axis: from cheapest-to-own to where-the-venture-time-compounds, and by drawing the line through each component (substrate versus signal) rather than treating whole components as atomic build-or-buy decisions.
