# 🎨 The Utopia Studio — Design Skills Guide

A complete index of the **32 design skills** in the marketplace, organized for designers, design-curious fellows, and anyone reviewing what we've built.

> If you're a fellow installing for the first time, start with the [main GUIDE.md](./GUIDE.md). This doc is a deeper reference for design-specific work.

---

## How to use this guide

Each skill links to its source on GitHub — click through to read the full instructions before invoking it.

To install all design skills at once, fellows install the **brand pack** (M5) or **product pack** (M6):

```
/plugin install utopia-product@skills    # Design systems, Impeccable, deploy
/plugin install utopia-gtm@skills        # Brand narrative, naming (product-name lives in GTM)
```

Skills are auto-loaded; just describe what you want and the right one fires.

---

## 📐 Design Foundations (7 skills)

Base-layer skills, not tied to a specific aesthetic. Use these regardless of brand direction.

| Skill | What it does |
|-------|--------------|
| [`ui-ux-pro-max`](./skills/product/ui-ux-pro-max) | UI/UX intelligence — 50+ styles, 161 color palettes, 57 font pairings, 99 UX guidelines, 25 chart types across 10 stacks (React/Next/Vue/Svelte/SwiftUI/RN/Flutter/Tailwind/shadcn/HTML) |
| [`polish`](./skills/product/polish) | [Emil Kowalski](https://emilkowalski.com/)'s philosophy on UI polish, component design, animation decisions, and the invisible details that make software feel great |
| [`impeccable`](./skills/product/impeccable) | Anti-AI-slop design skill from [nutlope/hallmark](https://github.com/nutlope/hallmark), now folded into impeccable — audits, redesigns, design extraction from URLs or screenshots |
| [`diagram-design`](./skills/product/diagram-design) | 13 diagram types — flowchart, sequence, state machine, ER, timeline, swimlane, quadrant, venn, pyramid, etc. Includes a dark technical skin for architecture diagrams |
| [`ckm-design`](./skills/product/ckm-design) | Comprehensive — brand identity, design tokens, UI styling, logo generation (55 styles via Gemini), 50-deliverable corporate identity programs, banners and HTML presentations |
| [`ckm-design-system`](./skills/product/ckm-design-system) | Three-layer token architecture (primitive → semantic → component), CSS variables, spacing/typography scales |
| [`ckm-ui-styling`](./skills/product/ckm-ui-styling) | shadcn/ui (Radix + Tailwind) + canvas-based visual designs |
| [`ckm-brand`](./skills/product/ckm-brand) | Brand voice, visual identity, messaging frameworks, asset management |

---

## 🛠️ Impeccable Workflow (17 skills)

A full production pipeline from [pbakaus/impeccable](https://github.com/pbakaus/impeccable). Each skill is a **stage**. Designed to chain together as one workflow rather than be used in isolation.

### Plan → Build → Refine → Dial → Review → Ship

| Stage | Skill | What it does |
|-------|-------|--------------|
| **Plan** | [`shape`](./skills/product/shape) | Plan UX/UI before writing code — structured discovery interview + design brief |
| **Build** | [`impeccable`](./skills/product/impeccable) | Generate distinctive, production-grade frontend interfaces — avoids generic AI aesthetics |
| **Refine** | [`layout`](./skills/product/layout) | Fix spacing, visual rhythm, weak hierarchy, monotonous grids, alignment problems |
| **Refine** | [`typeset`](./skills/product/typeset) | Fix font choices, hierarchy, sizing, weight, readability |
| **Refine** | [`colorize`](./skills/product/colorize) | Add strategic color to monochromatic designs |
| **Refine** | [`animate`](./skills/product/animate) | Purposeful animations + micro-interactions + motion |
| **Refine** | [`adapt`](./skills/product/adapt) | Responsive breakpoints, fluid layouts, touch targets across devices |
| **Refine** | [`optimize`](./skills/product/optimize) | UI performance — loading speed, rendering, animations, images, bundle size |
| **Refine** | [`clarify`](./skills/product/clarify) | Fix unclear UX copy, error messages, microcopy, labels, instructions |
| **Refine** | [`delight`](./skills/product/delight) | Add joy, personality, unexpected touches — elevate functional to memorable |
| **Refine** | [`distill`](./skills/product/distill) | Strip designs to their essence — declutter, simplify, focus |
| **Dial** | [`bolder`](./skills/product/bolder) | Amplify safe or boring designs — more visual impact, character |
| **Dial** | [`quieter`](./skills/product/quieter) | Tone down visually aggressive or overstimulating designs |
| **Dial** | [`overdrive`](./skills/product/overdrive) | Push past conventional limits — shaders, spring physics, scroll-driven reveals, 60fps |
| **Review** | [`critique`](./skills/product/critique) | UX evaluation with quantitative scoring, persona-based testing, anti-pattern detection |
| **Review** | [`audit`](./skills/product/audit) | Technical quality checks — a11y, performance, theming, responsive, anti-patterns (P0–P3 severities) |
| **Ship** | [`polish`](./skills/product/polish) | Final quality pass — alignment, spacing, consistency, micro-detail issues |

---

## 🎨 Taste (5 skills)

Opinionated **aesthetic-defining** skills. The "this is what high-end looks like" layer.

| Skill | What it does |
|-------|--------------|
| [`impeccable`](./skills/product/impeccable) | Taste and premium layer (folded in from design-taste-frontend, high-end-visual-design, redesign-existing-projects and hallmark): VARIANCE/MOTION/DENSITY dials, premium archetypes, redesign checklist, one set of font and motion rules |
| [`minimalist-ui`](./skills/product/minimalist-ui) | Clean editorial-style interfaces — warm monochrome palette, typographic contrast, flat bento grids, muted pastels. No gradients, no heavy shadows |
| [`industrial-brutalist-ui`](./skills/product/industrial-brutalist-ui) | Raw mechanical interfaces — Swiss typographic print meets military terminal aesthetics. Rigid grids, extreme type scale contrast, analog degradation effects |
| [`stitch-design-taste`](./skills/product/stitch-design-taste) | Semantic design system for Google Stitch — generates DESIGN.md files enforcing premium, anti-generic UI standards |
| [`full-output-enforcement`](./skills/founder-productivity/full-output-enforcement) | Overrides default LLM truncation. Enforces complete code generation, bans placeholder patterns |

> ⚠️ **The 3 visual aesthetic skills are mutually exclusive.** A page is either `minimalist-ui` OR `industrial-brutalist-ui` OR `impeccable` — pick one per brand, don't combine.

---

## 🚀 Efecto (3 skills)

Live design via the [Efecto](https://efecto.dev) plugin — real-time generation through their MCP server. Requires Efecto plugin connected.

| Skill | What it does |
|-------|--------------|
| [`efecto-web-design`](./skills/product/efecto-web-design) | Real-time web pages and app UIs with JSX + Tailwind. Create sessions, build layouts, manage artboards, push live changes |
| [`efecto-graphic-design`](./skills/product/efecto-graphic-design) | Presentations, pitch decks, event posters, email headers, blog images, OG cards, business cards, resumes, menus, infographics, invitations |
| [`efecto-social-media`](./skills/gtm/02-marketing-comms/efecto-social-media) | Instagram posts/carousels/stories, YouTube thumbnails, TikTok covers, Twitter/X images, LinkedIn slides, Pinterest pins, Facebook graphics |

---

## 📚 Brand Narrative (2 skills)

The **story side** of brand work.

| Skill | What it does |
|-------|--------------|
| [`positioning-workshop`](./skills/gtm/01-growth-strategy/positioning-workshop) | Messaging and storytelling templates for brand |
| [`business-narrative-builder`](./skills/gtm/01-growth-strategy/business-narrative-builder) | Structured narrative for the business — the story behind the work |

---

## 🎯 Recommended Workflows

### Building a portco landing page (most common path)

```
shape → ui-ux-pro-max → impeccable → layout → typeset → colorize → polish → critique → ship
```

### Auditing an existing AI-generated UI

```
impeccable (redesign mode) → critique → audit → polish
```

### Portco brand identity from scratch

```
ckm-brand → positioning-workshop → ckm-design-system → ckm-design (banners) → efecto-graphic-design
```

### Investor pitch deck

```
efecto-graphic-design → ckm-design (slides) → critique
```

### Making something "look expensive"

```
impeccable (premium archetypes) → typeset → polish → critique
```

---

## ⚠️ Honest concerns (worth design-team review)

These are **open questions** about the current state of the marketplace. Looking for design-team feedback:

1. **`ckm-*` and `efecto-*` overlap** on brand + slides + UI. Should we pick favorites per workflow, or are they meaningfully different?

2. **The 5 Taste skills feel under-defined.** Are aesthetic categories like "industrial brutalist" actually coherent and worth surfacing, or just one founder's preference?

3. **Three review skills** — `impeccable`, `critique`, `audit` — all evaluate designs. Three flavors of the same thing, or do they each pull distinct weight?

4. **No vendor-neutral design system token generator.** Only `ckm-design-system` covers this. Worth adding a more agnostic one?

5. **Possible missing categories:**
   - Color theory deep-dive (we have `colorize` but no foundational color skill)
   - Iconography
   - Logo systems (beyond `ckm-design`'s 55-style generator)
   - Illustration
   - Motion design beyond `animate` and `overdrive`
   - Print / packaging
   - 3D / WebGL design

6. **Impeccable suite dominance.** 17 of 42 skills come from one source. Healthy concentration or single-author bias?

If you have a strong opinion on any of these, please open an issue or PR.

---

## How to contribute or propose changes

### Adding a new design skill

1. Find an existing skill (open source GitHub repos like [nutlope/hallmark](https://github.com/nutlope/hallmark), [pbakaus/impeccable](https://github.com/pbakaus/impeccable), [emilkowalski/skill](https://github.com/emilkowalski/skill), [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)) or design your own
2. Install locally: `npx skills add <author/repo>`
3. Copy into the appropriate `skills/<category>/` folder
4. Add to the relevant pack(s) in [`packs.config.json`](./packs.config.json)
5. Run `./build-packs.sh`
6. Commit and push

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full flow.

### Killing or merging a skill

If you find an overlap or redundancy, open an issue or just open a PR removing/merging the skill. Less is more — we don't want noise.

### Suggesting an aesthetic / brand direction

If The Studio settles on one official aesthetic per portco type (e.g., "all FinTech portcos use `minimalist-ui`, all DeepTech use `industrial-brutalist-ui`"), document that here and we'll bake it into our recommendation flows.

---

## Where this fits in the broader marketplace

The 32 design skills are bundled into these packs:

| Module | Pack | Design skills included |
|--------|------|-----------------------|
| **M3 Concept** | `utopia-product` | interface-craft, shape, critique, diagram-design, ui-ux-pro-max |
| **M5 Brand** | `utopia-product` / `utopia-gtm` | All 3 Efecto + 6 Taste skills + impeccable + product-name + brand narrative skills |
| **M6 Product** | `utopia-product` | Full Impeccable workflow (shape → impeccable → critique → audit → polish) + interface-craft |

See [`README.md`](./README.md) for the full pack structure.

---

## Sources & credits

| Source | Skills contributed |
|--------|-------------------|
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | The full 17-skill Impeccable workflow |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | Taste skills (taste dials and premium archetypes now live inside `impeccable`) |
| [pablostanley/efecto-plugin](https://github.com/pablostanley/efecto-plugin) | All 3 Efecto skills |
| [emilkowalski/skill](https://github.com/emilkowalski/skill) | `polish` |
| [nutlope/hallmark](https://github.com/nutlope/hallmark) | `impeccable` (hallmark folded in) |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | `diagram-design` |
| [Cocoon-AI/architecture-diagram-generator](https://github.com/Cocoon-AI/architecture-diagram-generator) | `diagram-design` |
| [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | `ui-ux-pro-max` |
| CKM design suite (custom internal) | The `ckm-*` skills |
| Brand narrative skills (custom internal) | The 2 brand narrative skills |

---

**Questions?** DM Karan on Slack or open an issue on this repo.
