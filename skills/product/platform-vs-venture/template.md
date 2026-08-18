# Platform-vs-Venture Boundary Map — <product name>

**Fellow:** <name> · **Date:** <date> · **Stage:** commit-build / build-craft

The line is not drawn *between* components. It is drawn *through* each one, between the plumbing (Platform, inherited) and the domain signal running through it (Venture, the moat). Fill every field. If no component list exists yet, stop and run `compound-system-architecture` first.

## A. The components

List the build's components. Pull them from `compound-system-architecture` if it exists.

| # | Component | One-line job |
|---|---|---|
| 0 | Data layer | <the corpus/state it reasons over> |
| 1 | Input | <normalise + validate request> |
| 2 | Router | <classify + dispatch> |
| 3a | Retrieve / RAG | <pull grounding facts> |
| 3b | Reason (model) | <plan / synthesise> |
| 3c | Act | <tool calls / writes> |
| 4 | Validate & guardrails | <schema / rule / policy check> |
| 5 | Output | <format + deliver + log> |
| 6 | Observability | <trace / cost / dashboards> |
| 7 | Interface | <the surface the user already uses> |

## B. The moat test on each component

> **If a well-resourced competitor had this exact component tomorrow, is your product still defensible?**

Still defensible → not your moat → Platform or Buy. No longer defensible → your moat → Venture.

| Component | Competitor with it beats you? | Moat claim + ladder score + tag | Lane |
|---|---|---|---|
| Data layer | <yes/no> | <e.g. "corpus a single-user rival can't reproduce — behaviour 0.7 [Fact]"> | <Platform/Venture/Buy> |
| Input | <yes/no> | <> | <> |
| Router | <yes/no> | <> | <> |
| Retrieve / RAG | <yes/no> | <> | <> |
| Reason (model) | <yes/no> | <> | <> |
| Act | <yes/no> | <> | <> |
| Validate & guardrails | <yes/no> | <> | <> |
| Output | <yes/no> | <> | <> |
| Observability | <yes/no> | <> | <> |
| Interface | <yes/no> | <> | <> |

Ladder: money 1.0 · behaviour 0.7 · artefact 0.5 · verbal 0.3 · opinion 0.1.
Bar: a component is Venture-moat only if the moat claim clears **0.5**. "Feels like our edge" (0.1) is a claim to test, not a reason to build or to refuse to outsource.

## C. Substrate / signal split

For every component that is *both* plumbing and domain content, draw the line through it. Inherit the substrate; build the signal.

| Component | Substrate (Platform — inherit) | Signal (Venture — build, moat) |
|---|---|---|
| Retrieve / RAG | chunking, embedding, vector ops, retriever | <the corpus + what "relevant" means here> |
| Eval | harness/runner, scoring, regression gate | <the golden cases + the domain pass/fail bar> |
| Guardrails | policy engine, schema validation, sign-off routing | <which rules fire + domain thresholds + cost-of-error matrix> |
| Router | classify/dispatch machinery | <which paths + the domain reasoning each runs> |
| Observability | tracing, logging, cost accounting, dashboards | <which trace signal feeds the flywheel> |
| Model | (whole thing is Buy — rented, swappable) | <the domain reasoning wrapped around the call> |

If you cannot name the signal half of a component, it is pure substrate → all Platform.

## D. The three-lane assignment

The canonical spine is pre-filled. Move components only with a reason.

| Lane | Built once by | This build's members | Rebuilding it costs | Leaking it costs |
|---|---|---|---|---|
| **Platform** | Daedalus (studio) | router · eval harness · RAG pipeline · guardrail engine · observability · auth/deploy/secrets · <add> | venture time, zero moat | nothing (re-inherit) |
| **Venture** | The fellow | domain reasoning · corpus / golden cases · flywheel signal · domain rules · wedge interface · <add> | it should — that is the point | the moat (fatal) |
| **Buy** | A vendor | base model weights · cloud infra · vector-DB product · commodity SaaS · <add> | time on a commodity | nothing (swap vendor) |

## E. Two-error kill line — self-check before returning

| Error | Check | Trips? |
|---|---|---|
| **Rebuild** | Every Venture-lane component names a domain signal. A platform primitive (router / eval harness / RAG pipeline / guardrail engine / observability) with no signal is NOT in Venture. | <yes/no> |
| **Moat leak** (fatal) | No component that fails the moat test sits in Buy or Platform. Nothing that makes you defensible is outsourced. | <yes/no> |
| **Commodity-as-moat** | No rented, swappable component (base model, cloud) is labelled the moat. | <yes/no> |
| **Roadmap hole** | Every inherited Platform primitive is confirmed to exist today `[Fact]`, not a roadmap `[Assumption]`. | <yes/no> |
| **Gold-plating** | Not every box is marked Venture. Most components are Platform or Buy; the moat is 2–3 components. | <yes/no> |

## F. Verdict

**Verdict:** <BOUNDARY DRAWN | BOUNDARY WRONG — reason>

If **BOUNDARY WRONG**, the single reassignment that fixes it:

| What is misplaced | Which error | The one move |
|---|---|---|
| <component + current lane> | <rebuild / moat leak / commodity-as-moat> | <move to which lane + why> |

## G. Next step

- Take the **Venture** lane into `moat-design-canvas` — those components are the moat to sequence into dated gates.
- Route the **domain rules** to `guardrail-design`; the guardrail *engine* stays Platform.
- If a Venture corpus's right to be accumulated and kept is an `[Assumption]`, route to `data-rights-clause` to sign it; until then the corpus is not a settled moat.
- If the Venture moat is the golden-case set, route the golden-case build to `dataset-builder`; the harness stays Platform.
- Confirm every inherited **Platform** primitive exists today before deleting it from venture scope. An inherited primitive that is still on a slide is a hole with no owner.
- Any component classified on an `[Assumption]` about Daedalus's roadmap is not settled; confirm it before you commit the build plan to it.
