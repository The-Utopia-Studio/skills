# Banner workflow (from the former ckm-banner-design skill)

Banners for social covers, ads, website heroes, print and creative assets. Sizes and the 22 art-direction styles are in [banner-sizes-and-styles.md](banner-sizes-and-styles.md).

## Step 1: Gather requirements

Ask once, in one message:
1. **Purpose:** social cover, ad banner, website hero, print, or creative asset?
2. **Platform/size:** which platform, or custom dimensions?
3. **Content:** headline, subtext, CTA, logo placement?
4. **Brand:** existing brand guidelines? If the project has a brand guidelines file (ckm-brand writes `docs/brand-guidelines.md`), use it.
5. **Style preference:** any art direction? Show style options if unsure.
6. **Quantity:** how many options? Default 3.

## Step 2: Research and art direction

1. Use `ui-ux-pro-max` for style and palette intelligence.
2. Optionally browse design references (for example Pinterest: "[purpose] banner design [style]") and capture 3–5 references.
3. Pick 2–3 complementary art-direction styles from `banner-sizes-and-styles.md`.

## Step 3: Design and generate options

For each art direction:
1. **Build an HTML/CSS banner** (follow `impeccable` for craft):
   - Exact platform dimensions from the size reference.
   - Safe zone: critical content in the central 70–80%.
   - Max 2 typefaces, a single CTA, 4.5:1 contrast.
   - Brand context from `node ../ckm-brand/scripts/inject-brand-context.cjs` if ckm-brand is installed next to this skill.
2. **Generate visual elements (optional)** with this skill's Gemini script. Run it with `--prompt` and without `--style` to get a general image rather than a logo:
   ```bash
   python3 scripts/logo/generate.py --prompt "<banner visual, no text, no letters>" --aspect-ratio 16:9 --output assets/banners/<campaign>/bg.png
   python3 scripts/logo/generate.py --prompt "<hero illustration>" --pro --aspect-ratio 16:9 --output assets/banners/<campaign>/hero.png
   ```
   Supported ratios: `1:1`, `16:9`, `9:16`, `4:3`, `3:4`. Pick the closest one to the platform and crop in CSS. Use the standard model for backgrounds, patterns and quick variants, and `--pro` for hero illustrations and photoreal scenes.
   Prompt tips: describe style, lighting, mood, composition and palette; name the art direction ("minimalist flat design", "editorial photography"); always add "no text, no letters, no words", because text is overlaid in HTML.
3. **Compose:** overlay the text, CTA and logo on the visual in HTML/CSS.

## Step 4: Export to images

Serve the HTML (`python3 -m http.server 8765`) and screenshot each banner at exact size with headless Chrome or Playwright, as shown in [social-photos-design.md](social-photos-design.md):
```bash
npx playwright screenshot --viewport-size=1500,500 http://localhost:8765/banner-01-minimalist.html assets/banners/<campaign>/minimalist-1500x500.png
```
Compress anything over 5MB.

Output convention:
```
assets/banners/{campaign}/
├── minimalist-1500x500.png
├── gradient-1500x500.png
└── minimalist-1080x1080.png
```
Use kebab-case `{style}-{width}x{height}.png`, with an optional `{YYMMDD}-` prefix for time-sensitive campaigns.

## Step 5: Present and iterate

Show all options side by side with: style name, PNG preview, design rationale, file path and dimensions. Iterate until approved.

## Design rules

- Safe zones: critical content in the central 70–80%.
- One CTA per banner, bottom-right, min 44px high, action verb.
- Max 2 fonts, min 16px body, at least 32px headline.
- Text under 20% of ad area (Meta penalises heavy text).
- Print: 300 DPI, CMYK, 3–5mm bleed.

## Security

Never expose env vars, API keys or internal file paths. Never fabricate personal data.
