---
name: pitch-deck
description: |
  Build a responsive, interactive pitch-deck website from a brand book + a PRD/example deck.
  Use when the user asks to "build a pitch deck", "make an investor deck", "create a sales deck",
  generate a deck site from a brand book, or scaffold a deck from a PRD or existing slides.
  Pulls brand tokens (colors, typography, voice) from a brandbook-builder-style repo, runs a
  guided brief (investor vs sales, copy approval, image/logo intake, reference mining), then
  scaffolds a Vite + React + TS + Tailwind + motion deck site mirroring the utopia-os-deck
  section-scroll pattern.
---

# Pitch Deck — guided build

Take the user from nothing to a deployed, responsive pitch-deck site. Mirrors the
brandbook-builder plugin pattern (brief → build → QA/deploy) but the deliverable is a
section-scroll deck app, not a brand book.

The output stack is fixed: **Vite + React + TypeScript + Tailwind CSS + motion (Framer Motion)**.
The structural pattern is the utopia-os-deck section-scroll model (one component per slide,
`AnimatePresence` loader, fixed `Navbar`, scroll-snap optional, motion reveals on enter).

## Hard rules

1. **Brand book is the source of truth for visual tokens.** Colors, typography, radii, motion
   timings, logo usage — all sampled from the brand book repo. Visual references from the user
   (Pinterest, existing decks) only influence *layout density, contrast feel, type pairings,
   imagery direction* — never override brand colors or type.
2. **Never invent copy silently.** If the user has no copy and no PRD, draft copy must be
   shown back for line-by-line approval before it is written into the deck.
3. **Audience drives voice.** Investor vs sales is asked once at brief time and threads through
   every section (see `references/investor-tone.md` and `references/sales-tone.md`).
4. **No layout-copying third-party references.** Sample moves (palette temperature, contrast,
   density, type style, spacing rhythm) — do not reproduce a competitor's slide.
5. **Responsive is non-negotiable.** Mobile (≤640), tablet (≤1024), desktop (≥1280) verified
   before handoff. No horizontal overflow at any breakpoint.

---

## Phase 0 — Confirm scope (≤ 30s)

Ask only what you can't infer. Combine into one `AskUserQuestion` call.

- Deck name / working title.
- Audience type — **investor** | **sales** (read the matching tone file).
- Source of brand book — pick one:
  - existing repo on disk (path),
  - git URL to clone (skill clones into `.cache/brand-source/` inside output dir),
  - none yet — fall back to inline brand intake (palette, primary font, logo).
- Source of deck content — pick one:
  - PRD file path (markdown/PDF/txt),
  - existing pitch deck (PDF/keynote/pptx export, or another deck repo),
  - none — generate draft copy from a short founder/product blurb.
- Output target — where to scaffold the deck site (absolute path).
- Visual references — optional, accept 0–10:
  - Pinterest board URL(s), image URLs, or local image paths.
  - These feed `references/reference-mining.md`; mine *moves*, not layouts.

If anything is ambiguous, ask in the same turn — never spawn the scaffold blind.

---

## Phase 1 — Brand extraction

**Default behaviour: read if present, ask if not.** If the user gave a path or URL, try to
extract every token from the brand book first; only prompt for tokens that cannot be
resolved. If no brand book at all, fall through to inline intake.

Follow `references/brand-extraction.md`. Produce a single `brand.json` at the output target's
root with this shape (fields the build phase reads):

```json
{
  "name": "...",
  "tone": "investor|sales",
  "colors": { "ink": "#101010", "inkSoft": "#3c3c3c",
              "brand": { "DEFAULT": "...", "deep": "...", "mint": "...", "light": "..." },
              "bg": "#fff", "surface": "#f7f7f7" },
  "fonts": { "display": "...", "sans": "...", "mono": "..." },
  "logo": { "src": "/assets/logo.svg", "alt": "..." },
  "radii": { "sm": 4, "md": 8, "lg": 16 },
  "motion": { "ease": "easeOut", "durationMs": 600, "stagger": 80 }
}
```

If a brand book repo is provided, read tokens from `tailwind.config.js` (extend.colors,
extend.fontFamily), `index.css` (CSS custom props), and any `brand.{ts,json}` / `tokens.*`
files. If the brand book uses Shadcn-style theming, also read `:root` CSS vars from globals.

If no brand book exists, prompt for: 1 primary color, 1 accent, 1 ink color, display font,
body font. Confirm before writing.

---

## Phase 2 — Deck brief

For each canonical section (see `references/section-map.md`), produce a one-line *intent*
plus a *copy block* status:

- `provided` — pulled verbatim from PRD or existing deck.
- `draft` — generated; **must be approved by user before write**.
- `defer` — section dropped this round.

Output the brief as `deck-brief.md` at the output root. Show it to the user. Wait for explicit
"approved" or edits before Phase 3.

Audience handling:
- Investor → lead with problem, market, traction, ask. See `references/investor-tone.md`.
- Sales → lead with prospect's pain, solution fit, proof, next step. See `references/sales-tone.md`.

---

## Phase 3 — Scaffold

At the chosen output path, scaffold a fresh Vite + React + TS project (`npm create vite@latest
. -- --template react-ts`), then add: Tailwind, postcss, autoprefixer, motion, @fontsource for
brand fonts. Mirror this repo's layout:

```
src/
  App.tsx                  # AnimatePresence loader → main scroll
  main.tsx
  brand.ts                 # typed import of brand.json
  assets.ts                # central image manifest (local + optional figma URL)
  index.css                # Tailwind layers + brand CSS vars + font @imports
  components/
    Loader.tsx             # branded boot animation
    Navbar.tsx             # fixed, anchors to sections
    Reveal.tsx             # motion in-view wrapper
    icons.tsx              # inline SVGs (lucide-react optional)
    slides/
      Cover.tsx
      Problem.tsx
      Solution.tsx
      Market.tsx
      Product.tsx
      Traction.tsx         # investor only by default
      BusinessModel.tsx    # investor only by default
      GTM.tsx
      Proof.tsx            # sales: case studies; investor: traction continued
      Team.tsx
      Roadmap.tsx
      Ask.tsx              # investor: round ask; sales: next step CTA
tailwind.config.js         # extends colors/fonts from brand.json
index.html
public/assets/             # logo + slide imagery
```

One component per slide — section-scroll, not a slide carousel. Each slide is a `<section>`
with `id`, `mx-auto max-w-[1440px]`, `px-6 md:px-[120px]`, motion `Reveal` on enter. Match the
hero/stats/cta motion style in `templates/slide-skeleton.tsx`.

Investor vs sales drives which slides ship. Cover/Problem/Solution/Market/Product/GTM/Team/Ask
are universal. Traction + BusinessModel default-on for investor, default-off for sales. Proof
default-on for sales.

---

## Phase 4 — Image & copy intake

For every slide:

- **Logo** — required. Ask for SVG; PNG acceptable.
- **Hero/product imagery** — required for Cover, Solution, Product. If user has none, write a
  `[IMAGE NEEDED: <description>]` placeholder in `assets.ts` and a neutral SVG placeholder in
  `public/assets/`. Never leave broken refs.
- **Founder/team photos** — only if Team slide ships. Same placeholder rule.
- **Copy approval** — print every `draft` block from Phase 2 and require explicit approval per
  slide before committing to JSX. Investor numbers (traction, ask) must be user-supplied;
  never fabricate.

Reference uploads (Pinterest URLs, deck PDFs) go into `references/reference-mining.md` flow:
extract palette temperature, contrast level, type pairing direction, image density, motion
intensity — write the conclusions into `deck-brief.md` under "Visual direction" and apply at
JSX time. Brand tokens win every conflict.

---

## Phase 5 — Build, verify, deploy

Run `npm install`, then `npm run build`. Run the skill's validator before booting:

```bash
node <skill-root>/scripts/validate-pitchdeck-project.mjs <deck-output-path>
```

(Resolved from `pitch-deck/scripts/validate-pitchdeck-project.mjs` inside the skills
collection.) Then boot `npm run dev` and verify:

- No console errors.
- No horizontal scroll at 360, 768, 1280, 1920.
- Logo + every required image renders (no broken refs).
- Navbar anchors jump to the correct sections.
- Loader exits cleanly; main fades in.
- Tab order through anchors is sensible; CTAs are keyboard-reachable.

The validator fails the deploy if `brand.json`, `deck-brief.md`, Cover, Ask, slide
components, or `assets.ts` are missing/malformed.

Deploy target — ask. Default Vercel; offer GitHub Pages / Netlify / static export. For Vercel,
confirm `vercel.json` (output, framework=vite). Do NOT push or deploy without explicit user OK.

---

## Output contract

When done, summarise in ≤6 lines:
- Output path + deploy URL (if deployed).
- Audience (investor|sales) + section list shipped.
- Brand source (path/URL/inline) and any token gaps.
- Images: provided vs placeholder count.
- Copy: provided vs draft-approved count.
- Open follow-ups (missing photo, unapproved copy block, deferred section).

## Reference files

- `references/section-map.md` — canonical slide list + per-audience defaults.
- `references/investor-tone.md` — voice, structure, what investors need per slide.
- `references/sales-tone.md` — voice, structure, what prospects need per slide.
- `references/brand-extraction.md` — how to read tokens from a brandbook-builder repo.
- `references/reference-mining.md` — how to sample Pinterest / existing decks safely.
- `references/deck-template-structure.md` — full file tree + slide skeleton conventions.
- `templates/slide-skeleton.tsx` — copy-paste motion-aware slide template.
- `scripts/validate-pitchdeck-project.mjs` — pre-deploy validator.
