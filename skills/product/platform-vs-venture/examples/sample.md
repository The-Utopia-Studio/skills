# Worked example — Mentix's factory-manager AI copilot

Mentix builds an AI copilot for factory-plant managers. This is a test fixture: numbers and lane calls are illustrative, not real client data. "Now" is 2026-07. The component list is taken straight from the pipeline `compound-system-architecture` already produced for Mentix (plant-data layer 40% · model 20% · orchestration 30% · chat interface 10%, three named swap points).

## Input the fellow brought

"We've got the architecture. Now we're planning the build. My engineer wants us to build our own RAG pipeline and our own agent-orchestration layer so we control the whole stack, and to fine-tune a model on our plant data so we have something defensible. What do we actually build, and what does Daedalus give us?"

Evidence on the table:
- Compound-system architecture done: data layer is maintenance logs + shift handovers + sensor history the plant already produces (workflow exhaust, behaviour 0.7). [Fact]
- 2 plants running a pilot; managers accept ~60% of copilot suggestions unedited, edit the rest. [Fact]
- The "fine-tune our own model" plan has no eval behind it; it is a feeling that owning a model equals defensibility. [Assumption]
- Daedalus provides router, eval harness, RAG pipeline, guardrail engine and observability today. [Assumption — confirm the platform roadmap]

## A. The components

Pulled from the Mentix compound-system pipeline: data layer, input, router, retrieve/RAG, reason (model), act, validate & guardrails, output, observability, chat interface.

## B. The moat test on each component

> If a well-resourced competitor had this exact component tomorrow, is Mentix still defensible?

| Component | Competitor with it beats you? | Moat claim + ladder + tag | Lane |
|---|---|---|---|
| Data layer (plant corpus) | Yes — with the accumulated cross-plant maintenance corpus, a rival matches the copilot | Corpus a single-plant rival cannot reproduce; deepens every shift. Behaviour 0.7 [Fact] | **Venture** |
| Input | No | Request normalisation is generic. Opinion 0.1 | Platform |
| Router | No | Dispatch machinery is identical for every venture. — | Platform |
| Retrieve / RAG | Split (see C) | Plumbing: no. Corpus + plant-relevance: yes | Platform substrate / Venture signal |
| Reason (model) | No — the weights are rented and swappable | A rented model is not a moat. Opinion 0.1 [Assumption] | **Buy** |
| Act (write-back to shift tool) | No | The connector is plumbing; the *decisions* it writes are the reasoning, already counted | Platform |
| Validate & guardrails | Split (see C) | Engine: no. Plant-safety thresholds + sign-off matrix: yes | Platform engine / Venture rules |
| Output | No | Formatting is generic. — | Platform |
| Observability | Split (see C) | Tracing: no. *Which* trace signal → flywheel: yes | Platform substrate / Venture signal |
| Chat interface (inside the shift tool) | No — but it is where Mentix meets its user | Thin venture; the surface, not the moat. Behaviour 0.5 [Fact] | Venture (thin) |

## C. Substrate / signal split

| Component | Substrate (Platform — inherit) | Signal (Venture — build, moat) |
|---|---|---|
| Retrieve / RAG | chunking, embedding, vector ops, the retriever | the plant-maintenance corpus + what "relevant" means to a factory manager mid-shift |
| Eval | the harness/runner, scoring, regression gate | the golden cases drawn from real shift incidents + the "would a senior plant manager accept this" pass bar |
| Guardrails | the policy engine, schema validation, sign-off routing | which safety rules fire, the plant thresholds, the cost-of-error matrix (a wrong shutdown call is expensive) |
| Observability | tracing, logging, cost accounting, dashboards | the tweak-time signal (how much managers edit before accepting) that feeds the flywheel |
| Model | whole thing is Buy — rented, swappable, gated by an eval | the plant-domain reasoning wrapped around the call, never the weights |

## D. The three-lane assignment

| Lane | This build's members |
|---|---|
| **Platform** (inherit from Daedalus) | router · eval harness (runner) · RAG pipeline (plumbing) · guardrail engine · observability (tracing) · auth/deploy · input · act connector · output formatting |
| **Venture** (build — the moat) | the plant corpus · the factory-domain reasoning · the golden cases · the plant-safety rules inside the engine · the tweak-time flywheel signal · the chat surface inside the shift tool (thin) |
| **Buy** (rent) | the base model weights · cloud infra · vector-DB product |

## E. Two-error kill line

| Error | Check | Result |
|---|---|---|
| **Rebuild** | The engineer's plan puts the **RAG pipeline** and **agent orchestration** in Venture. Both are platform primitives with no domain signal of their own. | **TRIPS** |
| Moat leak | Nothing that fails the moat test is outsourced. The corpus, reasoning, golden cases and safety rules are all Venture. | pass |
| Commodity-as-moat | The "fine-tune our own model for defensibility" plan labels a rented, swappable commodity the moat. | **TRIPS** |
| Roadmap hole | Daedalus's five primitives are `[Assumption]` until confirmed. | flagged — confirm before deleting from scope |
| Gold-plating | Most components are Platform or Buy; the moat is ~4 components. | pass |

## F. Verdict

**Verdict: BOUNDARY WRONG — two reassignments.**

| What is misplaced | Error | The one move |
|---|---|---|
| RAG pipeline + agent orchestration in Venture | Rebuild | Move both to Platform. Inherit them from Daedalus. Redirect the saved weeks to the plant corpus and the golden cases — the components that actually fail the moat test. |
| "Fine-tune our own model" as the moat | Commodity-as-moat | The model is Buy: rent it, gate the swap with the eval harness. The defensibility the fellow wants is the corpus and domain reasoning wrapped around it, which is already Venture. Fine-tuning at v1 is retrieval and corpus work in disguise. |

The instinct to "control the whole stack" reads as diligence. It is the rebuild error: it spends Mentix's finite venture time re-deriving the studio spine while the corpus — the one thing a competitor cannot reproduce — stays shallow. And the instinct that "we need our own model to be defensible" mislabels a rented commodity as the moat. Both are the same mistake pointing opposite ways: the line drawn in the wrong place.

## G. Next step

- Take the **Venture** lane (plant corpus, domain reasoning, golden cases, flywheel signal) into `moat-design-canvas` and sequence it into dated gates.
- Route the **plant-safety rules and thresholds** to `guardrail-design`. The guardrail engine stays Platform.
- Confirm Daedalus's RAG pipeline, orchestration and eval harness exist today `[Fact]` before deleting them from Mentix's build scope. An inherited primitive that is still on a slide is a hole with no owner.
- Kill the fine-tune plan at v1. Re-open it only if a golden-case eval shows a fine-tune beats the rented model at acceptable cost — the swap-point discipline from `compound-system-architecture`.
