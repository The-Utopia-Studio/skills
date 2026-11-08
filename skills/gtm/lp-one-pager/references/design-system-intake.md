# Design system intake

A fellow's brand kit is a small design system. Treating it as a folder of logos is how a page ends up technically on-palette and obviously off-brand.

## Contents

- [What a kit contains](#what-a-kit-contains)
- [Reading the design language](#reading-the-design-language)
- [Reading the asset manifest](#reading-the-asset-manifest)
- [The token model](#the-token-model)
- [Fonts, and what to do when they are missing](#fonts-and-what-to-do-when-they-are-missing)
- [When the spec and this skill disagree](#when-the-spec-and-this-skill-disagree)
- [Worked example: the Dextrum kit](#worked-example-the-dextrum-kit)

## What a kit contains

The shape that recurs:

```
<fellow>-brand-kit/
├── README.md                          provenance, licence posture, what is excluded and why
├── metadata/<fellow>.assets.json      machine-readable manifest of every asset
└── Design assets/
    ├── <fellow>-design-language.md    the spec. Read this first
    ├── Logo/                          SVG and PNG variants
    ├── BrandBook/                     the PDF
    └── PPT/                           editable presentation source
```

Order of authority: **design language, then manifest, then the files themselves.** If the spec says the accent is reserved for links and the PPT uses it as a background, the spec wins and the PPT is out of date.

## Reading the design language

Run the extractor first, then read the file. The extractor gets the values; only reading gets the reasoning, and the reasoning is what stops the page looking generic. Six things to pull out:

**1. The atmosphere paragraph.** Usually section 1. It tells you what register the page is in. "Neutrality engineered into a visual system... the register of instrumentation" is a direct instruction: no warmth, no personality colour, no decorative anything.

**2. Colour roles, and the philosophy note under them.** The table gives hexes; the philosophy sentence gives the rule. "Ocean Blue appears at exceptions, evidence links, and action, nowhere else" means you may not accent a headline clause, which is a habit worth breaking on contact.

**3. The type system and its duty separation.** Most specs of this kind split display from data. When a spec says all figures go in a mono with tabular figures, that is not a suggestion: it is why columns of numbers line up, and it is the most visible single signal that the page was made inside the system.

**4. Component rules.** Radius, border treatment, elevation. Note when the boundary is a shadow-border (`box-shadow: 0 0 0 1px rgba(...)`) rather than a `border`, because the two are not interchangeable: a shadow-border does not take layout space and keeps the card's geometry exact.

**5. Layout principles.** Spacing base, whether sections are separated by rules or by whitespace and numbered kickers. A spec that says "don't add divider lines where spacing will do" has just deleted a component you were about to use.

**6. Do's and don'ts, and the banned-word list.** The extractor surfaces the words; the builder warns when one reaches the page. Obey them in your own reply text too.

Specs often close with an agent prompt guide. Those example prompts are the fastest way to see how the system composes, and one of them is usually a print or audit export, which is exactly this page's register.

## Reading the asset manifest

```jsonc
{
  "assets": [
    { "id": "dextrum-logo-blue", "kind": "logo",
      "src": "Design assets/Logo/Dextrum Logo no Background (BLUE) v2.svg",
      "usage": "Primary blue Dextrum wordmark for approved brand surfaces.",
      "placements": ["identity", "cover", "closing"] }
  ]
}
```

Three things it gives you that a directory listing does not:

- **Which logo is primary.** The first `kind: "logo"` entry, and its `usage` line says where it may go.
- **Licence posture.** "Owner supplied; downstream rights not declared" means confirm before anything leaves the building.
- **What is missing.** Manifests routinely list assets the kit does not ship. The extractor reports these. Ask for them rather than assuming the kit is complete, and never fabricate a substitute for a brand book you have not seen.

## The token model

`work/brand.json`:

```jsonc
{
  "name": "Dextrum",
  "tagline": "From Insight to Impact",
  "canvas":      "#D9DCDE",   // the page. One flat colour, no bands
  "surface":     "#FFFFFF",   // card fill on a light ground
  "surfaceAlt":  "#EAEAEA",   // inner wells, bar tracks
  "highlight":   "#B9D5EE",   // kickers, soft highlights
  "ink":         "#192B39",   // structure, headings, the footer strip
  "maxContrast": "#141414",
  "panel":       "#2F3F4C",   // dark surfaces, third chart step
  "body":        "#42515D",   // derived from ink
  "muted":       "#7A848C",
  "faint":       "#A3AAB0",
  "accent":      "#3E8ECC",   // data, action, evidence. Nothing else
  "accentDeep":  "#26689A",
  "onAccent":    "#EAEAEA",   // type reversed out of ink or accent
  "borderShadow":"0 0 0 1px rgba(25,43,57,0.10)",
  "positive":    "#398E4A", "danger": "#E5484D", "neutral": "#8F8F8F",
  "chart":       ["#3E8ECC", "#26689A", "#2F3F4C", "#B9D5EE"],
  "radius": 8, "radiusCard": 12,
  "fonts": { "display": "...", "body": "...", "mono": "..." },
  "fontFiles": [ { "family": "...", "weight": 400, "style": "normal", "path": "assets/....woff2" } ],
  "logo": "assets/....svg",
  "neverSay": ["compliant", "immutable", "revolutionary", "AI-powered"]
}
```

`body`, `muted` and `faint` are derived by lightening `ink` toward the canvas, so a brand that supplies only structure and accent still gets a coherent text hierarchy.

**The chart ramp is monochromatic on purpose.** A brand that reserves its accent for function does not get a categorical rainbow. Segments step down accent, accent deep, panel, highlight. If a chart genuinely needs six distinguishable categories, it is the wrong chart for this page.

## Fonts, and what to do when they are missing

Kits name their typefaces and almost never ship the files. Three honest paths, in order:

1. **Get the real files.** Many are freely embeddable: the Fontshare ITF Free Font Licence and the SIL OFL both permit it. Put them in `work/assets/` and list them in `fontFiles`.
2. **Embed a licensed substitute and keep the real face first in the stack.** `'Clash Grotesk', 'Space Grotesk', system-ui, sans-serif` renders correctly wherever the brand face is installed and falls to a close match everywhere else. Say which substitute you used in your reply.
3. **Stack only, no embed.** Acceptable for a draft, never for something being sent out; the PDF will silently substitute a system sans and the page will not look like the brand.

Never embed a font under a licence that does not allow it. A commercial desktop-only licence does not.

## When the spec and this skill disagree

The spec wins, every time. This skill's defaults are what a good instrument-register page looks like in the absence of instruction, not a house style that overrides a client's.

Conflicts that come up most:

| This skill's default | Overridden when the spec says |
|---|---|
| Accent on a headline clause | The accent is reserved for links, data or action |
| A tinted band behind the data column | No chromatic backgrounds, no decorative colour |
| 1px hairline borders | The boundary is a shadow-border |
| Rules between sections | Whitespace and numbered kickers separate sections |
| Categorical chart colours | Considered colour only, function or nothing |
| Sentence-case card headers | Tracked uppercase labels |

Three defaults this skill does not let a spec override, because they are about honesty rather than taste: every figure carries a provenance chip, every number carries its period, and nothing that has not been marked shows a multiple or an IRR.

## Worked example: the Dextrum kit

Running the extractor over `dextrum-jamal-brand-kit.zip` produces, in one pass:

- 18 named colours and 20 quick-reference tokens, correctly role-mapped: canvas `#D9DCDE`, structure `#192B39`, accent `#3E8ECC`, pressed `#26689A`, soft highlight `#B9D5EE`, logo-on-light `#063946`
- Typefaces Clash Grotesk and JetBrains Mono, with zero font files shipped
- Radius 8, card radius 12, the shadow-border value, and the tagline
- Six logo files, with the manifest naming the blue SVG as primary
- Four manifest entries pointing at files the zip does not contain: the brand book PDF, the presentation source twice, and the UX and QA plan
- The banned-word list

What reading the spec adds on top, and the extractor cannot:

- Sections are separated by numbered kickers and whitespace, never rules. The page's `01`, `02`, `03` come straight from this.
- The accent is for links, key data and action only, so the headline stays in ink and the kicker numerals stay in ink.
- Figures go in JetBrains Mono with tabular figures. Every number on both sample pages does.
- "ILLUSTRATIVE vs BOUND state must be explicit, a label, not a colour hint alone." This is the product's own provenance vocabulary, and the LP page borrows it for the chips rather than inventing a new one.
- The audit-export prompt describes a Dark Blue footer strip carrying the tagline in Timid White with a tracked mono confidential label. That is exactly the footer on both pages.

The two sample pages in `assets/` are the output of that reading. Neither uses a colour, a rule or a typeface the spec does not authorise.
