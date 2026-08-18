# Sourced Proprietary Corpus Map — YODA

Fill every field. The moat column is not for data a model can already reach. If every row is R, the map has no moat seed — and says so.

## 1. The workflow this data comes off

> Proprietary data is a byproduct of work. Name the work first.

**Recurring task:** _[the task you or your users do by hand today]_
**Byproduct it leaves:** _[the exhaust — drafts, threads, logs, records, notes]_

If you can only name a domain, not a task, stop. You do not yet have sources to map. Answer this first: *what recurring task do you or your users do by hand today, and what does doing it leave behind?*

## 2. Candidates, seeded from the six seams

Run each seam against your workflow. Skip a seam only after checking it.

| Seam | Anything here? (name it or write "none") |
|---|---|
| 1 Shadow AI threads | _[the ChatGPT/Claude sessions people already run to do the job]_ |
| 2 Workflow exhaust | _[drafts, edits, rejected options, version graveyard]_ |
| 3 Operational & sensor logs | _[machine/system/operations telemetry — note who holds it]_ |
| 4 Permits, filings & records | _[administrative records tied to real activity]_ |
| 5 Tacit judgment | _[calls experts make that are written down nowhere]_ |
| 6 Transaction ledger | _[prices actually paid, deal notes, who-bought-what]_ |

## 3. The one test — band every candidate

Assign exactly one band. If a source could sit in two, place it in the lower one (R over G over P).

- **R — model-reachable:** published, indexed, or synthesizable from public web / common training data. Not a moat seed.
- **G — gated:** real but behind a gate anyone with money/standing/effort can pass. Speed edge at best.
- **P — genuinely proprietary:** created by doing the work, held privately, no outside party can retrieve it. The moat seed — if you can get it.

## 4. Access — model-can't-reach-it vs you-can-reach-it

For every G and P row, record how *you* get it and any data-rights note. A P source you cannot access is a seed you do not hold yet. Flag it for `data-rights-clause` (section 06).

**Clause-gated:** if a row is reachable *only* through a signed clause, give it its own line — mark **access = clause-gated**, name the counterparty and the clause, and list it as a seed-in-waiting. Do not fold it silently into the access cell.

## 5. The corpus map

One row per candidate. A row is a **moat seed** only if band = P **and** a credible access path exists **and** evidence it is real scores **≥ 0.5**.

| # | Candidate source | Signal it holds (the question it answers) | Band [R/G/P] | Access path + data-rights note | Compounds with use? | Evidence it's real (ladder + tag) | Moat seed? |
|---|---|---|---|---|---|---|---|
| 1 | _[source]_ | _[what question this data answers that others can't]_ | _[R/G/P]_ | _[how you get it; clause needed?]_ | _[Y/N — does using the product make more of it?]_ | _[e.g. "hold 40 permit PDFs" — artefact 0.5 [Fact]]_ | _[Yes only if P + access + ≥0.5]_ |
| 2 | | | | | | | |
| 3 | | | | | | | |

## 6. Verdict

**Moat seed (P + access + evidence ≥ 0.5), ranked by compounding:**
1. _[the compounding seed first]_
2. _[...]_

**Gated rows worth a fast-mover play (G, if any):** _[source + why speed/exclusivity matters]_

**Rejected as model-reachable (R):** _[list — these are commodity, not moat]_

**If every row is R:** This is not a moat seed. A model already reaches all of it and can hand the same corpus to a competitor for free. Go back to section 1: what does your users' real workflow leave behind that no one outside it can see?

## 7. Next step

- For each **P-with-no-access** row: it needs a signed clause before it is usable. Take it to `data-rights-clause` (section 06).
- For each **P source that is an expert's head** (tacit judgment): capture it with `tacit-knowledge-interview`.
- For each **moat seed you hold**: it is also your eval set. A model cannot narrate it from training, so it is the only data that can tell you whether the product actually works.
