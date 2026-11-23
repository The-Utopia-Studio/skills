# Brand intake: turning a zip or a repo into tokens

The one pager only works if it looks like the company made it. That means real colours, real type, real logo files, resolved before anything gets laid out. Two sources are acceptable, and nothing else is.

## Contents

- [Source A: the brand assets zip](#source-a-the-brand-assets-zip)
- [Source B: the brand or design-theme git repo](#source-b-the-brand-or-design-theme-git-repo)
- [The token model](#the-token-model)
- [Assigning roles to extracted colours](#assigning-roles-to-extracted-colours)
- [Fonts](#fonts)
- [Logos](#logos)
- [When the brand does not exist yet](#when-the-brand-does-not-exist-yet)

## Source A: the brand assets zip

What founders normally send: a folder of logo exports, a guidelines PDF, sometimes font files.

```bash
node .claude/skills/one-pager/scripts/extract-brand.mjs brand-assets.zip work/
```

The extractor unpacks to `work/_brand-src/`, copies every `.svg`, `.png`, `.woff2`, `.woff`, `.ttf` and `.otf` into `work/assets/`, scans every text-like file for hex colours, and writes a draft `work/brand.json`.

It cannot read a guidelines PDF's palette swatches, because those are usually vector fills with no text label. When the zip is mostly a PDF, pull the hex values out of it yourself. The same trick the skill uses on source one-pagers works: decompress the content streams and count the distinct `rg` fill operators, most frequent first. `scripts/extract-brand.mjs --pdf <file.pdf>` does exactly that and prints the ranked list.

## Source B: the brand or design-theme git repo

Better source, because tokens are named.

```bash
node .claude/skills/one-pager/scripts/extract-brand.mjs https://github.com/org/brandbook work/
# or, if it is already checked out
node .claude/skills/one-pager/scripts/extract-brand.mjs ./ work/
```

The extractor looks, in order, at:

| Path | What it yields |
|---|---|
| `src/lib/brand.ts` or `brand.js`/`brand.json` | Named colour object, fonts, tagline, founder, positioning |
| `src/lib/typography.ts` | Licensed families, weights, foundry, licence URL |
| `src/app/globals.css`, `**/theme*.css`, `**/tokens*.css` | CSS custom properties |
| `tailwind.config.*`, `**/theme*.json`, `**/manifest*.json` | Token maps and visual policy (`allow` / `avoid` lists) |
| `public/logo-pack/`, `public/**/logo*`, `assets/**/logo*` | SVG and PNG lockups, light and reversed |
| `**/fonts/*.woff2\|woff\|ttf\|otf` | The real font files to embed |

The Dextrum brand book repo is the canonical example of this shape. Reading `src/lib/brand.ts` there gives locked navy `#1F3A5F` and ocean blue `#2E75B6`, the tagline, the positioning line and the founder record in one file, and `public/logo-pack/` gives navy and reversed lockups in both SVG and PNG.

A theme manifest, where one exists, is worth reading even when you already have the CSS. Its `allow` and `avoid` lists are what stop the output drifting into generic template territory: no rounded corners, no gradients, no drop shadows, and so on. Honour them over anything in the layout references.

## The token model

`work/brand.json`:

```jsonc
{
  "name": "Dextrum",
  "canvas":      "#FFFFFF",   // page background. Type 1 wants a warm off-white, Type 2 wants white
  "surface":     "#FFFFFF",   // card fill
  "surfaceAlt":  "#F2F6FB",   // tinted inner card, chip, asks panel
  "ink":         "#192B39",   // headings and emphasis. Never pure black
  "body":        "#3A4F5E",   // running text
  "muted":       "#5C6E7A",   // captions, sources, eyebrows
  "faint":       "#9BA6AE",   // disclaimers
  "accent":      "#3E8ECC",   // labels, links, the accent half of a headline
  "accentDeep":  "#1F3A5F",   // badge and pill fills
  "onAccent":    "#FFFFFF",   // text on accentDeep
  "hairline":    "#C9D0D5",
  "warning":     "#C47C48",   // optional, only for genuine three-state output
  "danger":      "#C76B62",   // optional, and for the broken-chain connector in Type 2
  "radius":      10,          // Type 1. Use 4 for Type 2
  "fonts": {
    "display": "'Clash Grotesk', 'Satoshi', system-ui, sans-serif",
    "body":    "'Satoshi', system-ui, sans-serif",
    "mono":    "'IBM Plex Mono', ui-monospace, monospace"
  },
  "fontFiles": [
    { "family": "Clash Grotesk", "weight": 600, "style": "normal", "path": "assets/ClashGrotesk-Semibold.woff2" }
  ],
  "logo":         "assets/logo.svg",
  "logoReversed": "assets/logo-reversed.svg"
}
```

Only `ink`, `body`, `muted`, `accent`, `accentDeep`, `hairline`, `canvas` and `fonts` are load-bearing. The rest have defaults in the build script.

## Assigning roles to extracted colours

The extractor ranks hex values by frequency; it does not know what they mean. Assign roles yourself, and check three things before locking them in:

1. **Accent against canvas at 6.5 pt.** Most brand blues and greens fail here. If the mono uppercase labels go muddy, lighten the accent for type and keep the original for solid fills. Dextrum does exactly this: `#2E75B6` locked in the brand, `#3E8ECC` used for small labels on the page.
2. **`onAccent` against `accentDeep`.** Badge numerals are 8 pt and reversed. If the contrast is under about 7:1 the numeral disappears in print.
3. **Ink is not `#000000` and canvas is not `#FFFFFF` for Type 1.** Both examples use a warm off-white canvas and a near-black ink, and that single pair does most of the work of making the page look designed rather than generated.

Do not invent a second accent. Both reference one-pagers use exactly one accent hue plus neutrals, and the warm one adds two status tones only because the product has three output states.

## Fonts

Embed real files. A page that silently falls back to Helvetica is not in the company's brand no matter what the colours say.

The build script base64-inlines every entry in `fontFiles` into `@font-face` rules, so licensing matters: only inline fonts the company is licensed to embed. The Fontshare ITF Free Font Licence and the SIL OFL both permit it. A commercial desktop-only licence does not, and in that case pick the closest permissively licensed substitute, say so in your reply, and do not pretend otherwise.

If no font files are available at all, use the family names in a CSS stack with sensible fallbacks and tell the person the render will substitute. Do not stop the build over it.

## Logos

Prefer SVG. Keep both the standard and reversed lockups if both exist, since the pill in Type 1's header and any dark chip need the reversed one.

Third-party logos for the asks panel are a different matter. Fetch them at a reasonable size, keep them on white chips so trademarks are not recoloured, never redraw or restyle them, and always carry the disclaimer line when the relationship is a target rather than an agreement.

## When the brand does not exist yet

Say so, and offer the two real options: build the one pager in a neutral system now and re-skin it later once the brand exists, or run the brand work first. Do not quietly pick a palette and present it as theirs. The one thing a founder will notice immediately is a page that is not their brand.

If they choose to proceed neutrally, use: canvas `#FAF8F4`, surface `#FFFFFF`, surfaceAlt `#F3F5F8`, ink `#111214`, body `#3A3A3F`, muted `#6E6E76`, accent `#1F3A5F`, accentDeep `#1F3A5F`, hairline `#E4E0D9`, and a system font stack. State clearly in your reply that this is a placeholder system.
