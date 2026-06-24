# pitch-deck

A Claude Code skill that takes a founder or team from nothing to a deployed,
responsive, interactive pitch-deck site. Sibling to the
[`brandbook-builder`](https://github.com/aiden150/brandbook-builder) skill — it reads
the brand tokens that brandbook-builder produces (or asks for them inline when no
brand book exists yet) and ships a section-scroll deck site in the
[`utopia-os-deck`](https://github.com/The-Utopia-Studio/utopia-os-deck) pattern.

## What ships

```
pitch-deck/
├── SKILL.md                          # 5-phase flow: scope → brand → brief → scaffold → QA/deploy
├── references/
│   ├── section-map.md                # 12 canonical slides + investor/sales defaults
│   ├── investor-tone.md              # voice + per-slide micro-spec for investor decks
│   ├── sales-tone.md                 # voice + per-slide micro-spec for sales decks
│   ├── brand-extraction.md           # how to read tokens from a brandbook-builder repo
│   ├── reference-mining.md           # how to safely sample Pinterest / existing decks
│   └── deck-template-structure.md    # full file tree + slide conventions
├── templates/
│   └── slide-skeleton.tsx            # copy-paste motion-aware slide template
└── scripts/
    └── validate-pitchdeck-project.mjs # pre-deploy validator
```

## Output stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3 (tokens injected from `brand.json`)
- `motion` (Framer Motion's open-source successor)
- `@fontsource/*` self-hosted brand fonts
- No router unless multiple variant decks are requested

## Hard rules

1. Brand tokens win. References shape *feel* (density, contrast, type pairing direction,
   motion intensity); they never override brand color or type.
2. Never invent copy silently. Drafts go through per-slide approval before they touch JSX.
3. Audience drives voice. Investor vs sales is asked once at brief time and threads through
   every section.
4. No third-party layout copying. Sample moves, not layouts.
5. Responsive verified at 360 / 768 / 1024 / 1280 / 1920 before handoff.

## Brand source modes (asked at runtime)

- **existing repo on disk** — path to a brandbook-builder project.
- **clone on demand** — git URL; cloned into `.cache/brand-source/` inside the output dir.
- **inline intake** — no brand book yet; the skill collects the minimum and writes
  `brand.json` directly.

Default: *read if present, ask if not* — auto-detects a brand book at the path the user
provides and falls back to inline questions for any token it cannot resolve.

## Audience modes

- `investor` — Cover → Problem → Solution → Market → Product → Traction → Business Model
  → GTM → Team → Roadmap → Ask. Numerate. Sourced market figures. Use-of-funds in Ask.
- `sales` — Cover → Problem → Solution → Product → Proof → GTM (light) → Ask. Customer
  language. Outcome-led. Concrete next-step CTA.

## Validation

```bash
node pitch-deck/scripts/validate-pitchdeck-project.mjs <path/to/deck>
```

Fails when `brand.json`, `deck-brief.md`, the Cover or Ask slide, or core scaffolding is
missing. Warns on missing logo, missing `motion` dep, or `tailwind.config.js` without a
`brand` color extension.
