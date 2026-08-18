# Product Module — Icarus

Utopia Studio's proprietary, eval-gated product method — 45 skills that take a raw idea from first-principles problem to a scored, pilot-ready v1. These live in the **Product** module (`utopia-product` pack) alongside the generic discovery/design/build/deploy skills they sequence and route to.

`market-skill-ingestion` (in Founder Productivity) is the companion curation tool — it folds the best of external skills into the studio set rather than accumulating noise.

## The method, in one line

An idea earns the right to become a company by passing gates, not by sounding good. Evidence is weighted the same way everywhere — the **evidence ladder**: money moved 1.0 → behaviour 0.7 → artefact 0.5 → commitment 0.3 → opinion 0.1. A probe's job is to move a claim up that ladder.

## The flow (read top to bottom)

Skills are flat in this folder; the intended sequence is:

| # | Stage | Skills |
|---|---|---|
| 00 | **Concept council** — entry & triage | `fellow-path-router`, `concept-council`, `so-what-stress-test` |
| 01 | **First-principles problem** | `product-as-decision`, `job-in-primitives`, `current-state-map`, `physics-floor-gap`, `problem-quality-scorecard`, `null-hypothesis-test`, `bottoms-up-quantification` |
| 02 | **Customer discovery** | `user-buyer-decider-map`, `unserved-needs-finder`, `synthetic-users`, `tacit-knowledge-interview`, `evidence-ladder`, `continuous-discovery-engine` |
| 03 | **YODA — your own data** | `yoda-data-sourcing`, `explicit-vs-tacit-capture`, `dataset-builder` |
| 04 | **Probes — build to learn** | `probe-matrix`, `paper-sketch-probe`, `wizard-of-oz-probe`, `concierge-probe`, `agent-concierge-probe` |
| 05 | **Frame the business & product** | `product-frame-stack`, `four-lenses-test`, `first-mocks`, `usability-test-protocol` |
| 06 | **Invent — wedge & moat** | `invent-by-hand`, `wedge-five-questions`, `moat-design-canvas`, `data-rights-clause` |
| 07 | **Commit — build & sell v1** | `eval-first-spec`, `compound-system-architecture`, `guardrail-design`, `pilot-six-term-sheet`, `value-based-pricing`, `v1-launch-bar` |
| 08 | **Refine flywheel** | `refine-flywheel`, `trace-to-interview`, `metrics-that-matter` |
| 09 | **Build craft** | `agent-design`, `workflow-design` |
| 10 | **Fellow progression** | `fellow-level-ladder`, `platform-vs-venture` |

Three skills supersede a weaker generic incumbent (and beat it head-to-head): `problem-quality-scorecard` → `identify-assumptions-new`; `continuous-discovery-engine` → `opportunity-solution-tree`; `probe-matrix` → `prototyping-pretotyping`. The build-craft section (09) and the UI/deploy steps route to the existing Product-module skills (Impeccable, Railway, Vercel) rather than restating them.

## How each skill is built and gated

Every skill ships an eval harness in its own `tests/` folder — five `golden/` cases from real fellow work (Azraq, Mentix, Barrier Intelligence, Durian), three `adversarial/` cases, a `rubric.json`, and a `RESULTS.md` log. Before graduating, each passed, scored by a judge agent separate from its author:

1. Trigger precision — fires on 5/5 wanted phrasings, 0/3 siblings.
2. Golden set — ≥21/25 on every case, no dimension below 4.
3. Adversarial — survives the vague one-liner, the solution-in-disguise, and the out-of-scope ask without fabricating or flattering.
4. Head-to-head — a superseding skill must beat the skill it replaces on the same inputs.
5. Anti-generic — its output could not have come from a generic PM prompt.

Gate 6 (used 5+ times in real fellow work) completes in use — log each miss as a gotcha and re-run the set.
