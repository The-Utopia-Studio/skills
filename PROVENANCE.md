# Provenance — found from outside vs built from inside

Generated 2026-09-03 from this checkout (`./scripts/eval-inventory.sh`).
**This is provenance, not [SKILL_TAXONOMY](./SKILL_TAXONOMY.md) modules.** A skill's
module (GTM / Product / Investments / Founder Productivity) says what job it does.
Its provenance says who wrote the method.

## Classification rules

A skill is classified only on evidence found in this checkout. Nothing here is
inferred from a skill's name, topic, or subject matter.

| Class | Count | Evidence required |
|---|---|---|
| `built-inside` | **59** | Listed in `scripts/icarus-skills.json`; or named "custom internal" in the DESIGN_GUIDE Sources & credits table; or a **strong** internal authorship marker in the body (Icarus, CKM, Karan/@kmjp, an explicit "custom internal") |
| `found-outside` | **62** | A compliant `Adapted from <url>` / `Attribution:` line in `SKILL.md`; or a `license:` field naming an upstream; or a row in the DESIGN_GUIDE Sources & credits table |
| `found-outside-NO-LINE` | **33** | The body names an external author or source, but there is **no compliant provenance line**. Documented external origin, undocumented per CONTRIBUTING.md |
| `unknown-vendor-wrapper` | **34** | Wraps a named external product or CLI (Railway, Vercel, Hugging Face, Clerk, Obsidian…). Almost certainly distilled from vendor docs, but **nothing in the repo says so** — so not classified |
| `unknown` | **162** | No provenance line and no strong internal marker. **Not guessed.** |

Totals: **95 outside · 59 inside · 196 unclassified** of 350.

### Why "fellow" and "Utopia" are not accepted as evidence

An earlier version of this classifier counted the words *fellow* and *Utopia*
in a body as internal-authorship markers. It mis-classified `one-pager-prd` as
`built-inside` the moment this QA pass added a routing table containing the
phrase "the fellow wants…".

Those words detect **who last edited the file**, not who wrote the method. Any
studio edit — a routing table, a gotcha, a worked example — introduces them.
Since this QA programme will edit most of the catalog, the heuristic would have
converted the whole marketplace to "built-inside" one patch at a time. Only
strong authorship markers count now, and the remainder stays `unknown` rather
than being flattered into `built-inside`.

## The headline

**The unclassified bucket is the finding.** 196 of 350 skills — 56% — carry no
provenance statement of any kind. CONTRIBUTING.md's provenance convention
(`Adapted from <source-url>` in the body, `supersedes:` in frontmatter) is
written down and followed by 62 skills. It is not enforced, so it does not
hold for the rest.

Two external clusters can be dated from internal evidence despite carrying no line:

- **`deanpeters/product-manager-prompts`** — 9 skills carry a compliant
  `Adapted from \`prompts/<file>.md\`` line. A further 9 referenced "Dean's Work"
  or Dean's templates with no line at all. **Three of those nine were fixed in
  Pack 1** (`prd-development`, `discovery-process`,
  `discovery-interview-prep`). The **six** still undocumented:
  `roadmap-planning`, `opportunity-solution-tree`, `problem-framing-canvas`,
  `user-story-mapping-workshop`, `founder-productivity/tam-sam-som-calculator`,
  `gtm/01-growth-strategy/positioning-workshop`.
  `prd-development` also shipped the unresolved authoring placeholder
  `- [If Dean has PRD templates, link here]` — removed in Pack 1.
- **`productcompass.pm` (Paweł Huryn)** — 30 skills cited productcompass.pm in
  Further Reading with **zero** provenance lines, and `summarize-interview`
  used "Paweł Huryn" as the literal example action-item owner — a real person's
  name that would have leaked into fellow-facing interview summaries. **Three
  were fixed in Pack 1** (`create-prd`, `interview-script`,
  `summarize-interview`, the last including the name); 27 remain.

Neither cluster is a policy violation on its own — folding external value in is
exactly what the ingestion rule asks for. The gap is the one-line record it asks
for in exchange.

**One wholesale vendoring is still in the tree.** `skills/product/product-manager-skills/`
carries the external repo copied in whole — `LICENSE`, `CHANGELOG.md`,
`package.json`, `VERSION`, `bin/`, `docs/`, `README.md`,
`README.zh-CN.md`, `TODOS.md`, `ETHOS.md`, `STARTER-PROMPTS.md`,
`SKILL.md.tmpl`, and **its own `CONTRIBUTING.md`**. This repo's
CONTRIBUTING.md names this exact directory as its banned example ("that is how
`skills/product/product-manager-skills/` ended up carrying an entire external
repo"). It is documented as banned and still present, so the rule currently
reads as a description of the tree rather than a constraint on it.

## What to do with the unclassified 196

Not a guessing exercise. Three mechanical passes clear most of it:

1. **The 34 vendor wrappers** (`railway-*` ×13, `huggingface-*` ×9,
   `vercel-*` ×4, `obsidian-*` ×3, plus `hf-cli`, `transformers-js`,
   `defuddle`, `deploy-to-vercel`, `json-canvas`) each wrap one named
   external product. Whoever added them knows whether they came from a public
   skill or from the vendor's docs. One line each, and the Icarus rubric
   probably should not be applied to them at all — `proprietary_edge` and
   `evidence_standard` are close to meaningless for a deterministic CLI
   wrapper.
2. **The 27 remaining productcompass skills and 6 remaining Dean skills** are
   already evidenced — verified by grep, listed in the full table below. They
   just need the line. Mechanical.
3. **The residue** — mostly `investments` (60 skills: 58 unclassified, 2
   built-inside, **0 tested**) and `gtm` (86 skills, 0 tested) — needs the
   person who added them. Do not guess these. `investments` is the largest
   completely-dark pack in the marketplace on both axes at once.

## Full table

| Skill | Pack | Classification | Evidence |
|---|---|---|---|
| `salim` | founder-productivity | built-inside | strong internal marker in SKILL.md: Karan |
| `brand-narrative-playbook` | gtm | built-inside | DESIGN_GUIDE Sources: custom internal |
| `business-narrative-builder` | gtm | built-inside | DESIGN_GUIDE Sources: custom internal |
| `gtm-engineering` | gtm | built-inside | strong internal marker in SKILL.md: declared-internal |
| `kmjp-social` | gtm | built-inside | strong internal marker in SKILL.md: Karan |
| `ada` | investments | built-inside | strong internal marker in SKILL.md: Karan |
| `khalil` | investments | built-inside | strong internal marker in SKILL.md: Karan |
| `agent-concierge-probe` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `agent-design` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `bottoms-up-quantification` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `ckm-banner-design` | product | built-inside | DESIGN_GUIDE Sources: custom internal |
| `ckm-brand` | product | built-inside | DESIGN_GUIDE Sources: custom internal |
| `ckm-design` | product | built-inside | DESIGN_GUIDE Sources: custom internal |
| `ckm-design-system` | product | built-inside | DESIGN_GUIDE Sources: custom internal |
| `ckm-slides` | product | built-inside | DESIGN_GUIDE Sources: custom internal |
| `ckm-ui-styling` | product | built-inside | DESIGN_GUIDE Sources: custom internal |
| `compound-system-architecture` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `concept-council` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `concierge-probe` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `continuous-discovery-engine` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `current-state-map` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `data-rights-clause` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `dataset-builder` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `eval-first-spec` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `evidence-ladder` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `explicit-vs-tacit-capture` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `fellow-level-ladder` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `fellow-path-router` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `first-mocks` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `four-lenses-test` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `guardrail-design` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `invent-by-hand` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `job-in-primitives` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `metrics-that-matter` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `moat-design-canvas` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `null-hypothesis-test` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `paper-sketch-probe` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `physics-floor-gap` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `pilot-six-term-sheet` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `platform-vs-venture` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `probe-matrix` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `problem-quality-scorecard` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `product-as-decision` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `product-frame-stack` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `refine-flywheel` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `sketch-prompt` | product | built-inside | DESIGN_GUIDE Sources: custom internal |
| `so-what-stress-test` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `synthetic-users` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `tacit-knowledge-interview` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `trace-to-interview` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `unserved-needs-finder` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `usability-test-protocol` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `user-buyer-decider-map` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `v1-launch-bar` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `value-based-pricing` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `wedge-five-questions` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `wizard-of-oz-probe` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `workflow-design` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `yoda-data-sourcing` | product | built-inside | scripts/icarus-skills.json (Icarus method skill) |
| `agent-persona-builder` | founder-productivity | found-outside | SKILL.md: A framework for designing internal AI agents with distinct, persistent personalities. Adapted from [Jack & Jill's a |
| `full-output-enforcement` | founder-productivity | found-outside | DESIGN_GUIDE Sources: Leonxlnx/taste-skill (all 7 Taste skills) |
| `pestel-analysis` | founder-productivity | found-outside | SKILL.md: PESTEL Analysis Prompt Template (adapted from Aguilar's framework) |
| `account-tier-scoring` | gtm | found-outside | SKILL.md: Adapted from [swan-gtm/gtm-skills](https://github.com/swan-gtm/gtm-skills) (`amos-bar-joseph/account-tier-scoring`) |
| `call-scorecards` | gtm | found-outside | SKILL.md: Adapted from [swan-gtm/gtm-skills](https://github.com/swan-gtm/gtm-skills) (`kevin-kd-dorsey/call-scorecards`), MIT |
| `cold-offer-architect` | gtm | found-outside | SKILL.md: Adapted from [swan-gtm/gtm-skills](https://github.com/swan-gtm/gtm-skills) (`tanyo-gochev/cold-offer-architect`), M |
| `deal-velocity-engineer` | gtm | found-outside | SKILL.md: Adapted from [swan-gtm/gtm-skills](https://github.com/swan-gtm/gtm-skills) (`rutger-katz/deal-velocity-engineer`),  |
| `earned-autonomy` | gtm | found-outside | SKILL.md: Adapted from [swan-gtm/gtm-skills](https://github.com/swan-gtm/gtm-skills) (`nadav-david/earned-autonomy`), MIT.* |
| `efecto-social-media` | gtm | found-outside | DESIGN_GUIDE Sources: pablostanley/efecto-plugin (all 3) |
| `email-deliverability` | gtm | found-outside | SKILL.md: Adapted from [swan-gtm/gtm-skills](https://github.com/swan-gtm/gtm-skills) (`joshua-waldman/email-deliverability`), |
| `outreach-execution` | gtm | found-outside | SKILL.md: Adapted from [swan-gtm/gtm-skills](https://github.com/swan-gtm/gtm-skills) (`jeremy-hurst/outreach-execution`), MIT |
| `press-release` | gtm | found-outside | SKILL.md: Adapted from `prompts/visionary-press-release.md` in the `https://github.com/deanpeters/product-manager-prompts` re |
| `revops-forecasting` | gtm | found-outside | SKILL.md: Attribution: Adapted from Pavilion CRO School. Original author: Carter/Nalbandian/Dick. |
| `signal-anchored-message` | gtm | found-outside | SKILL.md: Adapted from [swan-gtm/gtm-skills](https://github.com/swan-gtm/gtm-skills) (`peter-cools/signal-anchored-message`), |
| `warm-intro-intelligence` | gtm | found-outside | SKILL.md: Adapted from [swan-gtm/gtm-skills](https://github.com/swan-gtm/gtm-skills) (`din-arbel/warm-intro-intelligence`), M |
| `market-skill-ingestion` | meta | found-outside | SKILL.md: Every decision that lands value carries a one-line provenance record: `Adapted from <source-url>` in the target ski |
| `adapt` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `animate` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `architecture-diagram` | product | found-outside | DESIGN_GUIDE Sources: named external repo |
| `audit` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `bolder` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `clarify` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `colorize` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `create-prd` | product | found-outside | SKILL.md: Adapted from [productcompass.pm](https://www.productcompass.pm/p/prd-template) |
| `critique` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `delight` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `design-taste-frontend` | product | found-outside | DESIGN_GUIDE Sources: Leonxlnx/taste-skill (all 7 Taste skills) |
| `diagram-design` | product | found-outside | DESIGN_GUIDE Sources: named external repo |
| `discovery-interview-prep` | product | found-outside | SKILL.md: Adapted from [deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts) |
| `discovery-process` | product | found-outside | SKILL.md: Adapted from [deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts) |
| `distill` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `efecto-graphic-design` | product | found-outside | DESIGN_GUIDE Sources: pablostanley/efecto-plugin (all 3) |
| `efecto-web-design` | product | found-outside | DESIGN_GUIDE Sources: pablostanley/efecto-plugin (all 3) |
| `emil-design-eng` | product | found-outside | DESIGN_GUIDE Sources: named external repo |
| `finance-metrics-quickref` | product | found-outside | SKILL.md: Adapted from `research/finance/Finance_QuickRef.md` |
| `hallmark` | product | found-outside | DESIGN_GUIDE Sources: named external repo |
| `high-end-visual-design` | product | found-outside | DESIGN_GUIDE Sources: Leonxlnx/taste-skill (all 7 Taste skills) |
| `impeccable` | product | found-outside | frontmatter license: Apache 2.0. Based on Anthropic's frontend-design skill. See NOTICE.md for attribution. |
| `industrial-brutalist-ui` | product | found-outside | DESIGN_GUIDE Sources: Leonxlnx/taste-skill (all 7 Taste skills) |
| `interview-script` | product | found-outside | SKILL.md: Adapted from [productcompass.pm](https://www.productcompass.pm/p/interviewing-customers-the-ultimate) |
| `jobs-to-be-done` | product | found-outside | SKILL.md: Adapted from `prompts/jobs-to-be-done.md` in the `https://github.com/deanpeters/product-manager-prompts` repo. |
| `layout` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `minimalist-ui` | product | found-outside | DESIGN_GUIDE Sources: Leonxlnx/taste-skill (all 7 Taste skills) |
| `optimize` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `overdrive` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `polish` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `prd-development` | product | found-outside | SKILL.md: Adapted from [deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts) |
| `problem-statement` | product | found-outside | SKILL.md: Adapted from `prompts/framing-the-problem-statement.md` in the `https://github.com/deanpeters/product-manager-promp |
| `proto-persona` | product | found-outside | SKILL.md: Adapted from `prompts/proto-persona-profile.md` in the `https://github.com/deanpeters/product-manager-prompts` repo |
| `quieter` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `recommendation-canvas` | product | found-outside | SKILL.md: Adapted from `prompts/recommendation-canvas-template.md` in the `https://github.com/deanpeters/product-manager-prom |
| `redesign-existing-projects` | product | found-outside | DESIGN_GUIDE Sources: Leonxlnx/taste-skill (all 7 Taste skills) |
| `saas-economics-efficiency-metrics` | product | found-outside | SKILL.md: Adapted from `research/finance/Finance for Product Managers.md` |
| `saas-revenue-growth-metrics` | product | found-outside | SKILL.md: Adapted from `research/finance/Finance for Product Managers.md` |
| `shape` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `stitch-design-taste` | product | found-outside | DESIGN_GUIDE Sources: Leonxlnx/taste-skill (all 7 Taste skills) |
| `summarize-interview` | product | found-outside | SKILL.md: Adapted from [productcompass.pm](https://www.productcompass.pm/p/interviewing-customers-the-ultimate) |
| `typeset` | product | found-outside | DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow) |
| `ui-ux-pro-max` | product | found-outside | DESIGN_GUIDE Sources: named external repo |
| `user-story` | product | found-outside | SKILL.md: Adapted from `prompts/user-story-prompt-template.md` in the `https://github.com/deanpeters/product-manager-prompts` |
| `user-story-mapping` | product | found-outside | SKILL.md: User Story Mapping Prompt (adapted from Jeff Patton's methodology) |
| `user-story-splitting` | product | found-outside | SKILL.md: Adapted from `prompts/user-story-splitting-prompt-template.md` in the `https://github.com/deanpeters/product-manage |
| `market-segments` | founder-productivity | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `market-sizing` | founder-productivity | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `porters-five-forces` | founder-productivity | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `prioritization-frameworks` | founder-productivity | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `review-resume` | founder-productivity | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `stakeholder-map` | founder-productivity | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `tam-sam-som-calculator` | founder-productivity | found-outside-NO-LINE | body cites deanpeters/product-manager-prompts ("Dean's Work"); no Adapted-from line |
| `beachhead-segment` | gtm | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `competitive-battlecard` | gtm | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `growth-loops` | gtm | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `gtm-motions` | gtm | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `gtm-strategy` | gtm | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `ideal-customer-profile` | gtm | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `positioning-workshop` | gtm | found-outside-NO-LINE | body cites deanpeters/product-manager-prompts ("Dean's Work"); no Adapted-from line |
| `value-prop-statements` | gtm | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `value-proposition` | gtm | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `ab-test-analysis` | product | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `brainstorm-experiments-new` | product | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `business-model` | product | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `identify-assumptions-existing` | product | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `identify-assumptions-new` | product | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `job-stories` | product | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `lean-canvas` | product | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `metrics-dashboard` | product | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `monetization-strategy` | product | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `north-star-metric` | product | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `opportunity-solution-tree` | product | found-outside-NO-LINE | body cites deanpeters/product-manager-prompts ("Dean's Work"); no Adapted-from line |
| `problem-framing-canvas` | product | found-outside-NO-LINE | body cites deanpeters/product-manager-prompts ("Dean's Work"); no Adapted-from line |
| `roadmap-planning` | product | found-outside-NO-LINE | body cites deanpeters/product-manager-prompts ("Dean's Work"); no Adapted-from line |
| `sql-queries` | product | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `startup-canvas` | product | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `user-stories` | product | found-outside-NO-LINE | body cites productcompass.pm (Pawel Huryn); no Adapted-from line |
| `user-story-mapping-workshop` | product | found-outside-NO-LINE | body cites deanpeters/product-manager-prompts ("Dean's Work"); no Adapted-from line |
| `agent-prd` | founder-productivity | unknown | no provenance line, no strong internal marker |
| `alignment-values-north-star` | founder-productivity | unknown | no provenance line, no strong internal marker |
| `draft-nda` | founder-productivity | unknown | no provenance line, no strong internal marker |
| `executive-onboarding-playbook` | founder-productivity | unknown | no provenance line, no strong internal marker |
| `find-skills` | founder-productivity | unknown | no provenance line, no strong internal marker |
| `grammar-check` | founder-productivity | unknown | no provenance line, no strong internal marker |
| `last30days` | founder-productivity | unknown | no provenance line, no strong internal marker |
| `prioritization` | founder-productivity | unknown | no provenance line, no strong internal marker |
| `privacy-policy` | founder-productivity | unknown | no provenance line, no strong internal marker |
| `proof` | founder-productivity | unknown | no provenance line, no strong internal marker |
| `role-switch` | founder-productivity | unknown | no provenance line, no strong internal marker |
| `skillshare` | founder-productivity | unknown | no provenance line, no strong internal marker |
| `swot-analysis` | founder-productivity | unknown | no provenance line, no strong internal marker |
| `workshop-facilitation` | founder-productivity | unknown | no provenance line, no strong internal marker |
| `activation-map` | gtm | unknown | no provenance line, no strong internal marker |
| `ad-creative` | gtm | unknown | no provenance line, no strong internal marker |
| `ai-cold-outreach` | gtm | unknown | no provenance line, no strong internal marker |
| `ai-sdr` | gtm | unknown | no provenance line, no strong internal marker |
| `churn-prevention` | gtm | unknown | no provenance line, no strong internal marker |
| `cold-email` | gtm | unknown | no provenance line, no strong internal marker |
| `cold-email-personalization` | gtm | unknown | no provenance line, no strong internal marker |
| `cold-outreach` | gtm | unknown | no provenance line, no strong internal marker |
| `company-moc` | gtm | unknown | no provenance line, no strong internal marker |
| `content-strategy` | gtm | unknown | no provenance line, no strong internal marker |
| `content-to-pipeline` | gtm | unknown | no provenance line, no strong internal marker |
| `copy-editing` | gtm | unknown | no provenance line, no strong internal marker |
| `copywriting` | gtm | unknown | no provenance line, no strong internal marker |
| `customer-research` | gtm | unknown | no provenance line, no strong internal marker |
| `deal-desk` | gtm | unknown | no provenance line, no strong internal marker |
| `deal-review` | gtm | unknown | no provenance line, no strong internal marker |
| `discovery-calls` | gtm | unknown | no provenance line, no strong internal marker |
| `email-sequence` | gtm | unknown | no provenance line, no strong internal marker |
| `escalation-framework` | gtm | unknown | no provenance line, no strong internal marker |
| `expansion-playbook` | gtm | unknown | no provenance line, no strong internal marker |
| `expansion-plays` | gtm | unknown | no provenance line, no strong internal marker |
| `expansion-retention` | gtm | unknown | no provenance line, no strong internal marker |
| `growth-strategy` | gtm | unknown | no provenance line, no strong internal marker |
| `gtm-metrics` | gtm | unknown | no provenance line, no strong internal marker |
| `launch-strategy` | gtm | unknown | no provenance line, no strong internal marker |
| `lead-enrichment` | gtm | unknown | no provenance line, no strong internal marker |
| `lead-magnets` | gtm | unknown | no provenance line, no strong internal marker |
| `lead-qualification` | gtm | unknown | no provenance line, no strong internal marker |
| `manifesto` | gtm | unknown | no provenance line, no strong internal marker |
| `marketing-ideas` | gtm | unknown | no provenance line, no strong internal marker |
| `marketing-psychology` | gtm | unknown | no provenance line, no strong internal marker |
| `meddic-checklist` | gtm | unknown | no provenance line, no strong internal marker |
| `member-insights` | gtm | unknown | no provenance line, no strong internal marker |
| `multi-platform-launch` | gtm | unknown | no provenance line, no strong internal marker |
| `onboarding-cro` | gtm | unknown | no provenance line, no strong internal marker |
| `outbound-plays` | gtm | unknown | no provenance line, no strong internal marker |
| `page-cro` | gtm | unknown | no provenance line, no strong internal marker |
| `paid-ads` | gtm | unknown | no provenance line, no strong internal marker |
| `partner-affiliate` | gtm | unknown | no provenance line, no strong internal marker |
| `positioning` | gtm | unknown | no provenance line, no strong internal marker |
| `positioning-icp` | gtm | unknown | no provenance line, no strong internal marker |
| `pql-framework` | gtm | unknown | no provenance line, no strong internal marker |
| `product-marketing-context` | gtm | unknown | no provenance line, no strong internal marker |
| `product-name` | gtm | unknown | no provenance line, no strong internal marker |
| `referral-program` | gtm | unknown | no provenance line, no strong internal marker |
| `renewal-playbooks` | gtm | unknown | no provenance line, no strong internal marker |
| `retention-dashboard` | gtm | unknown | no provenance line, no strong internal marker |
| `retention-ltv-playbook` | gtm | unknown | no provenance line, no strong internal marker |
| `revops` | gtm | unknown | no provenance line, no strong internal marker |
| `sales-enablement` | gtm | unknown | no provenance line, no strong internal marker |
| `sales-motion-design` | gtm | unknown | no provenance line, no strong internal marker |
| `sentiment-analysis` | gtm | unknown | no provenance line, no strong internal marker |
| `sentiment-feedback-loop` | gtm | unknown | no provenance line, no strong internal marker |
| `signal-scoring` | gtm | unknown | no provenance line, no strong internal marker |
| `signup-flow-cro` | gtm | unknown | no provenance line, no strong internal marker |
| `social-content` | gtm | unknown | no provenance line, no strong internal marker |
| `social-selling` | gtm | unknown | no provenance line, no strong internal marker |
| `solo-founder-gtm` | gtm | unknown | no provenance line, no strong internal marker |
| `stakeholder-ops` | gtm | unknown | no provenance line, no strong internal marker |
| `suppression-logic` | gtm | unknown | no provenance line, no strong internal marker |
| `voice-of-customer` | gtm | unknown | no provenance line, no strong internal marker |
| `3-statement-model` | investments | unknown | no provenance line, no strong internal marker |
| `adverse-selection-prior` | investments | unknown | no provenance line, no strong internal marker |
| `auction-first-price-shading` | investments | unknown | no provenance line, no strong internal marker |
| `auction-winners-curse-haircut` | investments | unknown | no provenance line, no strong internal marker |
| `audit-xls` | investments | unknown | no provenance line, no strong internal marker |
| `bayesian-reasoning-calibration` | investments | unknown | no provenance line, no strong internal marker |
| `bond-futures-basis` | investments | unknown | no provenance line, no strong internal marker |
| `bond-relative-value` | investments | unknown | no provenance line, no strong internal marker |
| `capital-structure-optimizer` | investments | unknown | no provenance line, no strong internal marker |
| `causal-inference-root-cause` | investments | unknown | no provenance line, no strong internal marker |
| `clean-data-xls` | investments | unknown | no provenance line, no strong internal marker |
| `competitive-analysis` | investments | unknown | no provenance line, no strong internal marker |
| `comps-analysis` | investments | unknown | no provenance line, no strong internal marker |
| `cost-of-capital-estimator` | investments | unknown | no provenance line, no strong internal marker |
| `datapack-builder` | investments | unknown | no provenance line, no strong internal marker |
| `dcf-model` | investments | unknown | no provenance line, no strong internal marker |
| `decision-matrix` | investments | unknown | no provenance line, no strong internal marker |
| `deck-refresh` | investments | unknown | no provenance line, no strong internal marker |
| `deliberation-debate-red-teaming` | investments | unknown | no provenance line, no strong internal marker |
| `design-of-experiments` | investments | unknown | no provenance line, no strong internal marker |
| `earnings-analysis` | investments | unknown | no provenance line, no strong internal marker |
| `earnings-preview-single` | investments | unknown | no provenance line, no strong internal marker |
| `environmental-scanning-foresight` | investments | unknown | no provenance line, no strong internal marker |
| `epc-search` | investments | unknown | no provenance line, no strong internal marker |
| `epo-patent-analyzer` | investments | unknown | no provenance line, no strong internal marker |
| `equity-research` | investments | unknown | no provenance line, no strong internal marker |
| `estimation-fermi` | investments | unknown | no provenance line, no strong internal marker |
| `expected-value` | investments | unknown | no provenance line, no strong internal marker |
| `fixed-income-portfolio` | investments | unknown | no provenance line, no strong internal marker |
| `forecast-discipline` | investments | unknown | no provenance line, no strong internal marker |
| `forecast-modeling` | investments | unknown | no provenance line, no strong internal marker |
| `forecast-premortem` | investments | unknown | no provenance line, no strong internal marker |
| `fsi-strip-profile` | investments | unknown | no provenance line, no strong internal marker |
| `funding-digest` | investments | unknown | no provenance line, no strong internal marker |
| `fx-carry-trade` | investments | unknown | no provenance line, no strong internal marker |
| `hypothesis-library` | investments | unknown | no provenance line, no strong internal marker |
| `hypotheticals-counterfactuals` | investments | unknown | no provenance line, no strong internal marker |
| `ib-check-deck` | investments | unknown | no provenance line, no strong internal marker |
| `ib-pitch-deck` | investments | unknown | no provenance line, no strong internal marker |
| `initiating-coverage` | investments | unknown | no provenance line, no strong internal marker |
| `intrinsic-valuation-dcf` | investments | unknown | no provenance line, no strong internal marker |
| `kill-criteria-exit-ramps` | investments | unknown | no provenance line, no strong internal marker |
| `lbo-model` | investments | unknown | no provenance line, no strong internal marker |
| `macro-rates-monitor` | investments | unknown | no provenance line, no strong internal marker |
| `option-vol-analysis` | investments | unknown | no provenance line, no strong internal marker |
| `pct-application` | investments | unknown | no provenance line, no strong internal marker |
| `pitch-deck` | investments | unknown | no provenance line, no strong internal marker |
| `pitch-deck-web` | investments | unknown | no provenance line, no strong internal marker |
| `ppt-template-creator` | investments | unknown | no provenance line, no strong internal marker |
| `reference-class-forecasting` | investments | unknown | no provenance line, no strong internal marker |
| `relative-valuation-multiples` | investments | unknown | no provenance line, no strong internal marker |
| `research-claim-map` | investments | unknown | no provenance line, no strong internal marker |
| `scout-mindset-bias-check` | investments | unknown | no provenance line, no strong internal marker |
| `swap-curve-strategy` | investments | unknown | no provenance line, no strong internal marker |
| `tear-sheet` | investments | unknown | no provenance line, no strong internal marker |
| `technical-dd` | investments | unknown | no provenance line, no strong internal marker |
| `valuation-reconciler` | investments | unknown | no provenance line, no strong internal marker |
| `variance-strategy-selector` | investments | unknown | no provenance line, no strong internal marker |
| `agent-dx-cli-scale` | product | unknown | no provenance line, no strong internal marker |
| `ai-pricing` | product | unknown | no provenance line, no strong internal marker |
| `analytics-tracking` | product | unknown | no provenance line, no strong internal marker |
| `code-structure` | product | unknown | no provenance line, no strong internal marker |
| `cohort-analysis` | product | unknown | no provenance line, no strong internal marker |
| `cost-optimizer` | product | unknown | no provenance line, no strong internal marker |
| `deployment-engineer` | product | unknown | no provenance line, no strong internal marker |
| `design-critique` | product | unknown | no provenance line, no strong internal marker |
| `devops-advisor` | product | unknown | no provenance line, no strong internal marker |
| `evidence-driven-testing` | product | unknown | no provenance line, no strong internal marker |
| `financial-unit-economics` | product | unknown | no provenance line, no strong internal marker |
| `greploop` | product | unknown | no provenance line, no strong internal marker |
| `ink` | product | unknown | no provenance line, no strong internal marker |
| `integration-linker` | product | unknown | no provenance line, no strong internal marker |
| `interface-craft` | product | unknown | no provenance line, no strong internal marker |
| `lean-ux-canvas` | product | unknown | no provenance line, no strong internal marker |
| `monitoring-setup` | product | unknown | no provenance line, no strong internal marker |
| `one-pager-prd` | product | unknown | no provenance line, no strong internal marker |
| `pricing-strategy` | product | unknown | no provenance line, no strong internal marker |
| `product-manager-skills` | product | unknown | no provenance line, no strong internal marker |
| `prompt-engineer` | product | unknown | no provenance line, no strong internal marker |
| `prototyping-pretotyping` | product | unknown | no provenance line, no strong internal marker |
| `repo-scanner` | product | unknown | no provenance line, no strong internal marker |
| `repo-structurer` | product | unknown | no provenance line, no strong internal marker |
| `security-auditor` | product | unknown | no provenance line, no strong internal marker |
| `tdd-red-green-refactor` | product | unknown | no provenance line, no strong internal marker |
| `typed-service-contracts` | product | unknown | no provenance line, no strong internal marker |
| `ui-polish` | product | unknown | no provenance line, no strong internal marker |
| `web-design-guidelines` | product | unknown | no provenance line, no strong internal marker |
| `defuddle` | founder-productivity | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `json-canvas` | founder-productivity | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `obsidian-bases` | founder-productivity | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `obsidian-cli` | founder-productivity | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `obsidian-markdown` | founder-productivity | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `deploy-to-vercel` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `hf-cli` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `huggingface-community-evals` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `huggingface-datasets` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `huggingface-gradio` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `huggingface-llm-trainer` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `huggingface-paper-publisher` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `huggingface-papers` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `huggingface-tool-builder` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `huggingface-trackio` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `huggingface-vision-trainer` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `railway-central-station` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `railway-database` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `railway-deploy` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `railway-deployment` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `railway-domain` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `railway-environment` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `railway-metrics` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `railway-new` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `railway-projects` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `railway-railway-docs` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `railway-service` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `railway-status` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `railway-templates` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `transformers-js` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `vercel-cli-with-tokens` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `vercel-composition-patterns` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `vercel-react-best-practices` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
| `vercel-react-native-skills` | product | unknown-vendor-wrapper | wraps an external product/CLI; no provenance line |
