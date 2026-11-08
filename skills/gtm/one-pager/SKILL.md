---
name: one-pager
description: "Build a single-page company brief (a 'one pager', 'one page brief', 'company one-pager', 'intro one pager', 'leave-behind', 'teaser sheet') for a named Utopia Studio fellow or any company, rendered to a print-ready PDF in that company's own brand. Produces Type 1 (16:9, image-rich: founder profile with headshot, product screenshot, partner logo strips, 01 challenge / 02 solution / 03 differentiation / 04 asks) when visual assets exist, and falls back to Type 2 (A4 landscape, typographic three-column, no photography) when they do not. Needs the company's brand assets (a zip or the brand/design-theme git repo) plus whatever GTM strategy and manifesto material already exists. Use this whenever someone asks for a one pager, one-page brief, one-page summary sheet, or a printable intro page for a company, even if they do not name the format precisely. Do NOT use for multi-slide pitch decks (use pitch-deck), growth strategy memos (use growth-strategy), or investment memos (use investment-memo)."
license: Proprietary
---

# One Pager

Builds the studio's standard single-page company brief: everything a founder needs a stranger to understand, on one printable page, in the company's own brand.

Two formats exist, and they are not interchangeable.

| | **Type 1** | **Type 2** |
|---|---|---|
| Reference | Barrier Intelligence, Vyapti Resonance | Dextrum |
| Page | 1440 x 810 px (16:9) | A4 landscape (297 x 210 mm) |
| Spine | 01 challenge · 02 solution · 03 differentiation · 04 asks, plus a Founder Profile panel | 01 problem · 02 solution · 03 what's different, three equal columns |
| Imagery | Founder headshot, product screenshot, field photo, partner logo strips | None. Structure is carried entirely by type, rules and boxes |
| Reads as | A brief you hand to a partner or investor who has never met the founder | A brief that explains a mechanism to someone who already knows the category |

Type 1 is the default and the better artefact. Type 2 is what you build when the visual assets genuinely are not there, and it is a real format in its own right, not a degraded one.

The full measured anatomy of each lives in `references/type-1-layout.md` and `references/type-2-layout.md`. Read the one you are building; do not read both.

## Step 1: find what already exists before asking for anything

Most of the input for a one pager has usually been produced already, by this fellow or by a sibling skill. Asking for material that is sitting in the project is the fastest way to make the skill feel worse than doing it by hand. Scan first, ask once, ask only for gaps.

Look for, in this order:

1. **This conversation.** Uploaded PDFs, decks, zips, images, pasted text.
2. **The working directory and any attached project.** Glob for `*growth-strategy*`, `*GTM*`, `*manifesto*`, `*one-pager*`, `*onepager*`, `*brand*`, `*.zip`, `*deck*`, `*dd*`, `*memo*`.
3. **Sibling skill output.** These skills produce exactly the inputs this one consumes, so their artefacts are dependencies, not suggestions:
   - `growth-strategy` gives you the value proposition, named target organisations, and the 6-month plan, which becomes **04 The asks**.
   - `manifesto` gives you the conviction and the stakes, which becomes the **01 challenge** headline and the closing tagline.
   - `company-moc` gives you sourced facts, incident citations and standards references.
   - `technical-dd`, `investment-memo`, `pitch-deck` give you traction, standing and proof points.
4. **The brand repo or brand zip.** See Step 2.

Everything you find is evidence. Everything you cannot find is either a question or an omission, and an omission is often the right call: a one pager with four honest credentials beats one with six where two were invented.

## Step 2: resolve the brand (required, no exceptions)

A one pager in a generic template is not worth rendering. The skill needs the real design theme before it builds anything, from one of two sources:

- **A brand assets zip.** Logos (SVG preferred), fonts, a colour list, a PDF of the brand guidelines.
- **The brand or design-theme git repo.** Clone it and read the tokens directly. Repos in this house tend to expose them cleanly, for example `src/lib/brand.ts` (colour and font objects), `src/app/globals.css` and theme CSS custom properties, `src/lib/typography.ts` (licensed families and weights), and `public/logo-pack/` (SVG and PNG lockups). The Dextrum brand book repo is the canonical shape of this.

Run the extractor, which handles both:

```bash
node .claude/skills/one-pager/scripts/extract-brand.mjs <zip-or-repo-dir-or-git-url> work/
```

It writes `work/brand.json` and copies logos and font files into `work/assets/`. Read `work/brand.json` afterwards and correct it by hand: the extractor is good at finding hex values and font files, and it cannot know which colour is the accent and which is a chart tint. `references/brand-intake.md` covers the token model, sensible defaults, and what to do when a repo uses an unusual layout.

If neither a zip nor a repo is available, say so plainly and ask for one. Do not substitute a guessed palette and do not proceed to render, because the whole point of the artefact is that it looks like the company made it.

## Step 3: one intake message, then build

After the scan, send a single message asking only for what is genuinely missing. Keep it short and concrete. A typical one:

> To build the one pager I have your growth strategy and manifesto already. Three things would let me build the full image-led version:
>
> 1. **Brand assets** · the brand zip, or the URL of your brand/design-theme repo
> 2. **A headshot of the founder** · a straight portrait, roughly 3:4, shoulders up, at least 800 px tall
> 3. **Anything visual you want on the page** · a product screenshot, a photo of the founder on site or in the field, logos of the organisations named in the asks
>
> Without 2 and 3 I will build the typographic version instead, which works fine and carries no photography.

The founder photo is always worth asking for by name. It is the one input nobody has already filed somewhere, it is the single biggest difference between the two formats, and founders almost always have one. Ask for it naturally as part of that list rather than making it a separate interrogation.

Then stop asking. If the session is unattended or the person does not answer, pick the type the available assets support, state the assumption in one line at the top of your reply, and build.

## Step 4: choose the type

| Available | Build |
|---|---|
| Brand + founder headshot + at least one other visual (screenshot, field photo, or partner logos) | **Type 1** |
| Brand + founder headshot only | **Type 1**, with the founder panel carrying the visual weight and no product figure |
| Brand + wordmark only, no usable photography | **Type 2** |
| Strong mechanism, weak narrative, audience already knows the category | **Type 2**, even if photos exist |

A headshot that is a cropped group photo, a webcam still, or under about 600 px tall is not a usable headshot. Say so and build Type 2 rather than shipping a soft, upscaled face at 150 px wide, which reads as amateur faster than no photo at all.

## Step 5: write the content into `onepager.json`

Copy the matching starter and fill it in:

```bash
cp .claude/skills/one-pager/assets/type-1.example.json work/onepager.json   # or type-2.example.json
```

The examples are the real Vyapti and Dextrum content, so they show the register as well as the schema. Every field is documented in the layout reference for that type.

Content rules that matter more than the schema:

- **The headline states the mechanism, not the category.** "Quantum risk starts before the break. Most security stacks cannot see the migration window." beats "AI-powered post-quantum security platform." Take the second sentence's key phrase into `headlineAccent` so it renders in the brand accent colour.
- **Every claim carries its source inline.** `3,712 alarms in 12 h before two died, CSB 2024`. A one pager is read by sceptics; unsourced numbers cost more than they earn.
- **The asks are doors, not wishes.** Name what you want, what it costs the other party, and how it ends. "One unit, its existing study pack, a few weeks, no site access. If it shows nothing new, we stop."
- **Standing is a flat list of verifiable facts,** separated by `·`, with no adjectives: `functional prototype · 139 engine tests green · patent application filed`.
- **No em dashes anywhere.** Use `·`, a comma, or a full stop. Check the rendered text before delivering.
- Logos of named organisations belong under a label such as `TARGET VALIDATION ENVIRONMENT` with the disclaimer `Target organisations shown for introduction context; no partnership implied.` Do not imply a relationship that does not exist.

`references/copy-rules.md` has the voice patterns, the fixed section furniture, and worked before/after examples.

## Step 6: build, render, and look at it

```bash
node .claude/skills/one-pager/scripts/build-onepager.mjs work/onepager.json work/brand.json work/out/
node .claude/skills/one-pager/scripts/render-onepager.mjs work/out/<slug>.html
```

`build-onepager.mjs` inlines every image and font as a data URI, so the HTML is a single portable file. `render-onepager.mjs` drives the pre-installed Chromium through `playwright-core` and writes both a PDF and a PNG at the exact page box. It fails loudly if the content spills onto a second page, which is the failure mode that matters.

Chromium is already present in this environment at `/opt/pw-browsers/chromium`, and `PLAYWRIGHT_BROWSERS_PATH` is set, so do not run `playwright install`.

**Then read the PNG.** Actually look at it. A one pager that validates and looks wrong is still wrong. Check:

- Nothing overflows, nothing is clipped, no card bottom is cut.
- Fonts resolved to the brand families and did not silently fall back to a system sans. Compare letterforms if unsure.
- The founder photo is not stretched. It is object-fit cover in a fixed frame; a wrong aspect ratio shows up as a squashed face.
- Logos sit on white chips, are optically balanced, and none is so dark it disappears into the chip.
- No bracketed placeholders, no lorem, no `TODO` survived.
- No em dash anywhere.
- The whole page reads at 100% zoom on a laptop. If a caption needs zooming, it is decoration, so cut it.

Fix, rebuild, look again. Two or three passes is normal.

## Step 7: deliver

Send the PDF with `SendUserFile`, and send the PNG alongside it so the person can see it without opening anything. Say which type you built and why, and name anything you left out for lack of evidence, for example "no partner logos, so the asks panel runs as text only." Keep `work/onepager.json` next to the output: the next revision is an edit to that file and a rebuild, not a rewrite.

If the company has a brand repo and the one pager will be reused, offer to commit `onepager.json` and the output into that repo so the source of truth lives with the brand, rather than in a chat thread.

## Files

| Path | Read it when |
|---|---|
| `references/type-1-layout.md` | Building Type 1. Measured grid, every slot, image specs |
| `references/type-2-layout.md` | Building Type 2. Measured grid, the block model |
| `references/brand-intake.md` | Resolving a zip or repo into tokens, and the token model |
| `references/copy-rules.md` | Writing the copy, in every case |
| `assets/type-1.example.json` | Starter content, real Vyapti brief |
| `assets/type-2.example.json` | Starter content, real Dextrum brief |
| `scripts/extract-brand.mjs` | Step 2 |
| `scripts/build-onepager.mjs` | Step 6 |
| `scripts/render-onepager.mjs` | Step 6 |
