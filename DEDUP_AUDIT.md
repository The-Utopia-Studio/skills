# Near-duplicate skill audit (TUS-2598)

Method: computed name/description token-overlap (Jaccard) across all 301 skills (`scripts/find-duplicate-skills.mjs`), then read the full `SKILL.md` (not just the description) for every flagged pair before deciding. Line count is used as a rough proxy for how developed a skill is — a thin skill duplicating a deep one is exactly what `CONTRIBUTING.md`'s bar exists to catch.

Several high-scoring pairs are **not duplicates** — they're deliberate patterns already in the corpus and are excluded from the decision list below after review:

- **Tool-family namespaces**: `railway-*` (11 skills), `ckm-*` (6), `huggingface-*` (7), `obsidian-*` (3), `efecto-*` (2), `vercel-*` (3) — siblings under one vendor/tool prefix, each a distinct command. Shared prefix inflates name-similarity but each does a different job.
- **The `-workshop` pattern**: `positioning` / `positioning-workshop`, `user-story-mapping` / `user-story-mapping-workshop` — a recurring intentional variant (static skill vs. a guided-facilitation version of the same skill). Not a duplicate pair, it's a house style.
- **`identify-assumptions-existing` / `identify-assumptions-new`**: self-documented different risk-category counts (4 vs. 8) for genuinely different contexts (existing vs. new product).
- **`huggingface-papers` / `huggingface-paper-publisher`**: read vs. write, complementary.
- **Canvas family** (`lean-canvas`, `lean-ux-canvas`, `startup-canvas`, `problem-framing-canvas`, `recommendation-canvas`): each names a genuinely distinct framework; only share the generic word "canvas." `founder-productivity/json-canvas` is unrelated — it's the Obsidian `.canvas` *file format*, not a strategy canvas.

## Decision list

### Merge

| Skills | Depth | Decision |
|---|---|---|
| `gtm/cold-outreach` (36 lines) → `gtm/ai-cold-outreach` (737 lines) | thin vs. comprehensive | **Retire `cold-outreach`.** `ai-cold-outreach` already covers drafting cold emails plus the tooling/deliverability/scale angle `cold-outreach` doesn't. Fold `cold-outreach`'s LinkedIn/social-touch framing into `ai-cold-outreach` if not already covered, then delete. `gtm/outreach-execution` is the third skill in this named group but is **not** part of this merge — it's a sender-assignment/approval-rails governance layer for *sending* an already-drafted sequence, a different job from drafting. Keep it separate; add "drafted by ai-cold-outreach, executed by outreach-execution" cross-reference language to both. |
| `product/design-critique` (208 lines, Korean) → `product/critique` (225 lines, English) | parallel, not thin | **Merge into one bilingual skill.** Same job (UX critique with quantitative scoring, persona testing) built twice in two languages. Fold `design-critique`'s Korean trigger phrases and scoring-format output into `critique`, retire `design-critique`. `product/audit` is the third skill in this named group but is **not** part of this merge — it runs automated technical/accessibility/performance checks (P0–P3 severity), not a design-taste judgment call. Keep it separate; the two are already distinguishable (technical correctness vs. visual/UX quality) but worth a one-line cross-reference on both so an agent doesn't have to guess. |
| `gtm/expansion-plays` (31 lines) → `gtm/expansion-playbook` (31 lines) | identical template, different filler | **Confirmed duplicate** — line-by-line diff shows the same skeleton (Use Cases / Framework steps / Output) with different words in each slot. Keep `expansion-playbook` (more standard term), fold `expansion-plays`'s "Signal Stack" trigger list in if useful, retire `expansion-plays`. |
| `product/user-stories` (74 lines) → `product/user-story` (272 lines) | thin vs. developed | **Retire `user-stories`.** Same job (write agile user stories) under two competing frameworks (3C's+INVEST vs. Mike Cohn+Gherkin). Fold INVEST criteria into `user-story` as an alternate output option, retire `user-stories`. |
| `product/create-prd` (86 lines) → `product/prd-development` (655 lines) | thin vs. very developed | **Likely retire `create-prd`** in favor of `prd-development`, but double-check first — `create-prd`'s "8-section template" may be a specific format worth preserving as a template option inside `prd-development` rather than lost. |

### Keep separate, but fix confusable naming/routing

These aren't duplicates — they do different jobs — but the names are close enough that an agent (or a person) could easily pick the wrong one. Add explicit "use X instead when Y" language to each description, per `CONTRIBUTING.md`'s own convention (already used in `cold-email`).

- **Deck family** (`investments`): `pitch-deck` (build PPTX from notes), `pitch-deck-web` (build a web deck), `ib-pitch-deck` (populate an existing IB template with data — "not for creating from scratch"), `ib-check-deck` (QC an existing deck), `deck-refresh` (swap in new numbers on an existing deck). Five real, distinct lifecycle stages — needs disambiguation, not merging.
- `founder-productivity/prioritization` (do the scoring) vs. `founder-productivity/prioritization-frameworks` (reference guide comparing 9 frameworks). Recommend renaming the latter to make "this is a reference, not a scoring tool" obvious at a glance — e.g. `prioritization-framework-guide`.
- `investments/competitive-analysis` (competitive landscape decks) vs. `investments/comps-analysis` (comparable-company valuation multiples in Excel). Totally different jobs; "comps" vs. "competitive" is a genuine finance-jargon collision.
- `product/repo-scanner` (read-only audit) vs. `product/repo-structurer` (actively reorganizes). Complementary pipeline — cross-reference each other ("scan first, then structure").
- `product/design-taste-frontend` (general anti-generic frontend rules) vs. `product/stitch-design-taste` (same philosophy, scoped to Google Stitch's DESIGN.md output). Tool-specific variant, same pattern as the `-workshop` family — cross-reference, don't merge.

### Needs a deeper human read (couldn't confidently call it from content alone)

- `product/polish` (224 lines) vs. `product/ui-polish` (148 lines) — both substantial, both genuinely about UI micro-detail/finish. Unlike the deck or PRD families, there's no clean structural split (action vs. reference, create vs. fix) visible from the descriptions. Worth 10 minutes of a real side-by-side read to decide merge vs. keep.
- `investments/dcf-model` (1263 lines) vs. `investments/intrinsic-valuation-dcf` (272 lines) — both do DCF valuation with sensitivity analysis and per-share output. `dcf-model` is far larger (SEC-filing-driven, single approach) while `intrinsic-valuation-dcf` supports multiple variants (DDM/FCFE/FCFF). Could be genuinely complementary (one is a specific pipeline, the other a flexible toolkit) or a case where the smaller one is redundant — flagging rather than guessing given the size and financial-domain stakes.

### Reviewed, no action

`gtm/social-content` / `social-selling` / `efecto-social-media` / `kmjp-social` — content creation vs. sales outreach vs. visual-asset design vs. one person's personal-brand voice skill. Four different jobs sharing the word "social." `kmjp-social` is narrow (one named individual's voice/vault) and could eventually fold into `social-content` as a personal-voice-profile feature, but that's a product decision, not a dedup fix — noting for awareness only.

## Next steps

This feeds the Week 2 description-rewrite issue (`TUS-2599`) per that issue's own note: rewriting trigger conditions for a skill that's about to be merged away is wasted work. Recommend actioning the five "Merge" rows before `TUS-2599` starts, and giving Karan the "needs deeper read" pair for a quick decision.
