---
name: yoda-data-sourcing
description: Assemble a sourced proprietary-data corpus map — sort every candidate data source by one test (can a foundation model already reach it?) and keep only the workflow-trapped, permission-gated signal (shadow AI threads, operational logs, permits, vendor-locked sensor feeds, workflow exhaust) as the moat seed. Fires on "get our own data", "what data do we own", "where's our proprietary data", "build the moat's seed", "what data can't a competitor get". Not for drafting the contract that unlocks a gated source (use data-rights-clause, section 06), not for scoring whether one signal counts as real evidence (use evidence-ladder), not for running the interview that captures tacit judgment (use tacit-knowledge-interview).
type: interactive
supersedes: none
---

## What it does

Takes a fellow's list of candidate data sources and returns a sourced proprietary corpus map: every source scored on one axis first — can a foundation model already reach it? — then on access, compounding, and whether the source is even real. Reachable data is thrown out of the moat column, because a model that can reach it can hand the same corpus to a competitor for free. What survives the test is the workflow-trapped, permission-gated signal: the shadow ChatGPT threads, the operational logs, the permits behind a records request, the vendor-locked sensor feed, the exhaust of the real work. Only those rows are the moat seed. The map is also the honest eval set: the data a model cannot narrate from training is the only data that can tell you whether your product actually works.

## The Icarus reframe

An idea built on data a foundation model can already reach is an idea the model can hand your competitor for free. YODA sorts every candidate source by one test — can a model already reach it? — and discards everything that passes, because reachable data is not a moat, it is a commodity the model narrates on demand. What is left is the workflow-trapped signal: shadow AI threads, operational logs, permits behind a records request, the vendor-locked sensor feed, the exhaust of the actual workflow — data a model cannot get, which is exactly why it seeds both the moat and the only honest eval set.

## When to use / When NOT

Use when a fellow has candidate data sources (or a workflow that produces data) and needs to know which of them a competitor's model cannot already replicate. Trigger phrases: "get our own data", "what data do we own", "where's our proprietary data", "build the moat's seed", "what data can't a competitor get".

Do not use when:

| Request | Belongs to |
|---|---|
| "Draft the clause / contract that gives us rights to the operator's telemetry" | `data-rights-clause` (section 06, forthcoming). This skill *flags* that a gated source needs a signed clause and points there; it does not write legal language. |
| "Is 'they said they'd buy it' strong enough evidence? Score this signal." | `evidence-ladder`. That skill owns the rungs. This skill *uses* the ladder to weigh whether a source is real, but scoring a lone signal is not its job. |
| "Run the interview that pulls the supervisor's tacit judgment out of their head" | `tacit-knowledge-interview`. This skill can *list* tacit judgment as a proprietary seam; capturing it is a different runbook. |

Also do not use it to invent data a fellow does not have. If the input is a vague domain with no workflow and no real sources, it is not ready. Say so and ask the one unblocking question (see Method step 1).

## Method

Fill in `template.md`. Five steps.

### Step 1 — Anchor on the workflow, not the domain

Proprietary data is a byproduct of work. Before listing sources, name the recurring task the fellow (or their user) actually does, and what byproduct it leaves. If the fellow can only name a domain ("logistics", "safety") with no workflow and no real source, stop. Ask the one question: *what recurring task do you or your users do by hand today, and what does doing it leave behind?* Do not invent sources to fill the gap.

### Step 2 — List candidates, seeded from the six seams

Proprietary signal hides in six seams. Use them to prompt the fellow past the obvious public datasets.

| # | Seam | What it holds | Default reachability |
|---|---|---|---|
| 1 | Shadow AI threads | The ChatGPT/Claude sessions people already run to do the job. Prompts + the corrections they make are a labelled record of the real task. | P |
| 2 | Workflow exhaust | Drafts, edits, rejected options, undo trails, the `final_v7` version graveyard. The decision path, not just the result. | P |
| 3 | Operational & sensor logs | Telemetry from machines, systems, operations. Often held by a vendor, not by you. | P, access-risk |
| 4 | Permits, filings & records | Administrative records tied to real activity (rig permits, inspection reports). | G |
| 5 | Tacit judgment | The calls experts make that are written down nowhere. Captured by shadowing (`tacit-knowledge-interview`). | P |
| 6 | Transaction ledger | Prices actually paid, deal notes, who-bought-what. Money-moved signal. | P |

The default is a starting guess, not a verdict. Step 3 decides each row in context.

### Step 3 — Run the one test on every candidate: can a model already reach it?

Assign each source exactly one band. The decision rule is a tree, top down.

| Band | Test | Meaning | Moat status |
|---|---|---|---|
| **R — model-reachable** | Published, indexed, or synthesizable from public web / common training data? | Standards, news, textbooks, Wikipedia, most OEM manuals, published datasets, common-API data. | **Not a moat seed.** A model hands it to your competitor for free. |
| **G — gated** | Real and specific, but behind a gate anyone with money, standing, or effort can pass (paywall, records request, licence, membership)? | Permits via records request, licensed datasets, paywalled databases, trade-association data. | **Speed/exclusivity edge at best.** A moat only if you can lock the gate or be structurally faster. |
| **P — genuinely proprietary** | Created by the doing of the work and held privately, so no outside party — model or competitor — can retrieve it? | Shadow AI threads, workflow exhaust, private operational/sensor logs, captured tacit judgment, transaction ledger. | **The moat seed** — if you can actually get it (Step 4). |

If a source could plausibly sit in two bands, place it in the *lower* one (R over G, G over P). A charitable band is how reachable data sneaks into the moat column.

### Step 4 — Separate "model can't reach it" from "you can reach it"

P means a model cannot get the source. It does not mean *you* can. Vendor-locked sensor logs are proprietary to the vendor, not to you. For every G and P row, record the access path and a data-rights note. A P source with no credible access path is a moat seed you do not hold yet — mark it, and flag that it needs a signed clause (point to `data-rights-clause`, section 06; do not draft it here).

**Clause-gated access is its own case — do not bury it in the access cell.** A source you can reach *only* through a signed data-rights arrangement (a vendor's telemetry you may read once a clause exists, data shared under a partnership term) gets its own explicit line: mark the row **P, access = clause-gated**, name the counterparty and the clause it hangs on, and flag it for `data-rights-clause` (section 06). Until that clause is signed you do not hold the seed — a clause-gated row is a seed-in-waiting, not a seed you own.

### Step 5 — Score reality, compounding, and assemble the map

For every surviving row, cite the evidence that the source is real and gettable, tagged on the ladder (see Evidence standard), and mark whether it compounds with use (does running the product generate more of this data?). Then fill the map in `template.md`:

| # | Candidate source | Signal it holds (the question it answers) | Band [R/G/P] | Access path + data-rights note | Compounds with use? | Evidence it's real (ladder + [Fact]/[Assumption]/[Hypothesis]) | Moat seed? |
|---|---|---|---|---|---|---|---|

A row is a **moat seed** only if: band = P, a credible access path exists, and evidence it is real scores **≥ 0.5** (money, behaviour, or a shown artefact). An R-band source can **never** enter the moat-seed column, whatever its gettability score — a high "gettable" number on an R row only confirms everyone can get it. The band gates the column; the score never overrides it. Rank the seeds by compounding: a P source that grows every time the product is used outranks a static one. Close with the verdict: the moat-seed rows, and — if any exist — the gated rows worth a fast-mover play.

**Kill line.** If the map lists only model-reachable (R) sources, or marks any R source as a moat seed, the output is auto-failed. Reachable data is never a moat seed. If every candidate is R, the honest output is: this is not a moat seed — a model already reaches all of it — here is where your trapped signal would actually be (Step 1's workflow question).

## Evidence standard

Every Icarus skill weights behaviour and money over opinion. Here the ladder scores the claim that a source *exists and you can get it* — not the data's value, its reachability.

| Signal that the source is real and gettable | Score |
|---|---|
| You already pay for or monetise access; the data already moved money | 1.0 |
| You already ingest it; it already flows into your system | 0.7 |
| You hold a sample export (40 permit PDFs, 200 thread transcripts) | 0.5 |
| Someone said you could probably get it | 0.3 |
| "I'm sure that data exists somewhere" | 0.1 |

A source's whole case resting on `[Assumption]` or a 0.3 "we could get it" is not a moat seed; it is a sourcing task to run first. Tag each claim `[Fact]`, `[Assumption]`, or `[Hypothesis]`. A model-reachable source scores high on "gettable" precisely because everyone can get it — which is why gettability alone never qualifies a row; the band does.

## Gotchas

Volume mistaken for proprietariness. "We need more data" almost always means more reachable data. A bigger scrape of the public web is more commodity, and the model already has it. The moat is not in the size of the R pile; it is in whether any P pile exists at all.

Proprietary-to-someone-else counted as yours. Vendor-locked telemetry is genuinely unreachable by a model, so it looks like gold — but if the vendor owns it and will not share, it is their moat, not yours. Band P, access = none. It becomes a seed only with a signed data-rights clause.

Public records treated as proprietary because they are annoying to get. Permits and filings are gated, not proprietary. If a competitor can file the same records request, the data is a speed edge, not a moat. It only becomes one if you can lock exclusivity or be structurally faster to the gate every cycle.

The static-seed trap. A one-time proprietary dataset erodes: competitors catch up, the world moves, the model's next version may absorb a public proxy. A seed that compounds — regenerated every time the product is used (shadow-thread corrections, workflow exhaust) — is worth more than a larger seed that sits still. Rank seeds by compounding, not size.

Reachable today, unreachable tomorrow — and the reverse. Reachability is a moving line. A dataset gated today may be indexed and model-reachable next year; a private log you hold may stay trapped for years. Score the band as it is now, and note any row whose band is about to move.

## Examples

`examples/sample.md` — a full corpus map for Barrier Intelligence's field-log data: rejects public gas-safety standards and industry news as model-reachable, surfaces rig permits (gated), shadow operator threads (proprietary, compounds), the field logs themselves (proprietary, compounds), and vendor-locked detector telemetry (proprietary but vendor-owned → data-rights clause needed), then names the moat seed.

## Related skills

`data-rights-clause` (section 06, forthcoming) — where a gated or vendor-locked row goes next. This skill names *that* a source needs a signed clause to use; that skill writes the clause. Point there; do not draft legal language here.

`evidence-ladder` (section 02) — owns the rungs this skill borrows to weigh whether a source is real. When a fellow wants to score one lone signal, send them there.

`tacit-knowledge-interview` (section 02) — captures the tacit-judgment seam (row 5) this skill can only list. When a proprietary source *is* an expert's head, that runbook gets it out.

`wedge-five-questions` (section 06) — a moat seed feeds the wedge's defensibility, but the wedge test is about adoption. Different question; run this to find the data, that to find the first thing to build.

Supersedes: none. Fully proprietary — there is no prior data-sourcing skill in the pack to absorb or beat.
