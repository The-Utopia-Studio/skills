# Utopia Studio Brand Tokens (fallback reference)

Pulled from `@utopia-studio-design/design-system`, theme `utopia-default` (the "Ceramic" design system), as installed and inspected on 2026-08-10. Treat this file as a fallback — if the package is reachable, re-read it directly (see SKILL.md) since these values can drift.

## Colors

| Role | Token | Hex | Notes |
|---|---|---|---|
| Background / near-black | Special Black | `#3C3235` | The studio's dark tone. Never use pure `#000000`. |
| Primary accent | Brick Red | `#CC5536` | Brand primitive. Use as a 5-15% accent: headings, rules, numerals, small marks. Not for backgrounds of large fields at full saturation unless intentionally alternating (see Visual Policy). |
| Accessible action tone | Brick Red (action) | `#B8472C` | Slightly deeper, more accessible variant for text/links that need better contrast than the raw brand primitive. |
| Secondary / light field | Light Grey | `#EEEEEE` | Table alt-rows, light editorial fields. |
| Base | White | `#FFFFFF` | |
| Muted text | Black-50 | `#A6A0A2` | Footers, captions, de-emphasized labels. |
| Hairline border | Black-20 | `#E3E1E2` | Table borders, dividers — not a flat grey like `#CCCCCC`. |
| Destructive/active | `#9E3D25` | | Sparing use only (errors, critical flags), not for "confidential" labels — use Brick Red for those instead. |

## Typography

- **Primary family:** TWK Lausanne. Three static weights ship as separate files: 350 (body/regular), 500 (medium, for tracked labels and eyebrows), 700 (bold, for display/headline use).
- **Fallback stack** (when TWK Lausanne isn't installed/embedded): `"Helvetica Neue", Arial, sans-serif`.
- **Arabic:** IBM Plex Sans Arabic (400/500/700). Do not translate Latin all-caps styling into Arabic uppercase — Arabic keeps native casing at matching visual weight.
- **Headline casing:** uppercase, with tight tracking (roughly +0.02em to +0.04em, i.e. slightly loosened, not condensed).
- **Body:** regular weight, calm, readable line height (around 1.4-1.5x).
- **Labels/eyebrows:** medium weight, uppercase, more aggressively tracked than headlines (they're small, so need more letter-spacing to stay legible).

## Geometry

- **Radius: 0px, everywhere.** Square corners on every surface, table, card, and control. This is a deliberate brand decision, not an oversight — don't round anything.
- **Elevation:** hairline borders and background-color shifts only. No drop shadows on brand surfaces.

## Visual policy

**Allowed:**
- Asymmetric layouts, offset alignment (don't center every block by default).
- Large uppercase headlines as the dominant entry point on a page/cover.
- Brick Red as a 5-15% accent.
- Hairline borders.
- Solid Special Black, Light Grey, Brick Red, and White used as full editorial fields (a whole cover panel in Special Black, for instance) — not shrunk to small UI accents only.
- Editorial whitespace that isolates one dominant message per page.
- The three-bar `///` signature as structural punctuation at major entries (cover, section dividers).
- Full-bleed brand panels that alternate dark, accent, and light colourways across a document.

**Avoid:**
- Startup-cute styling, generic SaaS gradients, glassmorphism, textures.
- Drop shadows on brand surfaces, rounded "marketing card" corners.
- Pure black (`#000000`).
- Uniform card grids where every block has equal visual weight (pick one dominant element per page instead).
- Low-contrast grey-on-grey hierarchy.
- Brick Red for small body copy — insufficient contrast at that size; reserve it for headlines, rules, numerals, and large-scale marks.

## Wordmark and signature

- **Wordmark:** "THE / UTOPIA / STUDIO" stacked vertically, small, on brand surfaces (cover, footer). It's typographic, not an image asset in most contexts — set it in three separate lines/runs at a small size with generous letter-tracking.
- **Three-bar mark (`///`):** used as punctuation at major page entries (cover top-right, section dividers, or a closing mark) — never repeated on every page as decoration. If a document has a header/footer on every page, don't put `///` there too; reserve it for the moments that matter.
- **Numbering convention:** bold Brick Red numerals for section numbers, agenda items, or model/step cards (e.g. "1.1", "01", "02") followed by Special Black title text.

## Header/rule convention (carried over from slide decks, applies to documents too)

Utopia's real slide decks use white/light content surfaces with charcoal (near-black) headers and a short terracotta/brick-red rule underneath. In a document, the equivalent is: Special Black, bold, uppercase section headings with a Brick Red hairline rule directly beneath (full-width for a major "H1"-level heading reads as intentional, not as a generic underline — it mirrors the slide header convention at document scale).

## Known minor discrepancy

The `utopia-partnership-deck` skill's PPTX assets sample a very slightly different terracotta (`#C1502D`) and near-black (`#0A0A0A`) directly from production decks, rather than from the npm design-system package (`#CC5536` / `#3C3235`). Both are legitimate — the deck skill's playbook notes it deliberately trusts sampled production decks over the docs site. For documents (this skill), use the npm package's values (`#CC5536` / `#3C3235`) since that package is the actual published source of truth and documents are explicitly in its intended scope ("may identify The Utopia Studio branded products, documents, and template surfaces"). If a future refresh of either source changes this, prefer whichever is more current and note the change.
