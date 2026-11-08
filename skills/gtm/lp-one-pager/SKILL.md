---
name: lp-one-pager
description: "Build an LP-facing one pager for a portfolio company or fellow: a single page, landscape 16:9 or A4-proportion portrait, rendered to print-ready PDF in that company's own design system, for an LP reading a fund update, a co-investor, or an investment committee. Carries the full investment record where the evidence supports it: total raised, both rounds, post-money valuation, ownership, current multiple, gross IRR, use of proceeds and an exit view. Two content options, A Portfolio Highlight (reported register) and B Investment Case (argued register, live round). Reads the company's brand kit (a zip, a folder, or the design-assets git repo) and treats its design-language markdown and asset manifest as the source of truth for palette, type, radius, component rules and banned words. Opens with a problem and solution pair that explains a complex product to a financial reader in one pass, written in an investment-professional register. Every figure carries a provenance chip, BOUND, REPORTED or ILLUSTRATIVE, so a reader can see which numbers are evidenced, and a logo slot above the footer carries customers, partners, standards or target counterparties. Use this whenever someone asks for an LP one pager, an LP brief, a portfolio highlight page, a fund-update company page, an investor one pager, or a one-page investment case for a named company, even if they do not use the words 'LP one pager'. Ask for the growth stage before building, and confirm the content map against the uploaded documents before writing, because the stage decides which blocks belong on the page and the sources decide what can be evidenced. Do NOT use for founder-facing or customer-facing one pagers (use the one-pager skill), multi-slide decks (pitch-deck), growth strategy memos (growth-strategy), or investment memos (investment-memo)."
license: Proprietary
---

# LP One Pager

One page that an LP or an investment committee can read in ninety seconds and act on. It is the fund's page about the company, not the company's page about itself.

Two orientations off one component set: **landscape** at 1440 x 810 for a page that lives in a quarterly pack, and **portrait** at 1080 x 1527, A4 proportion, when the whole position has to fit, both rounds, valuation, ownership, multiple, IRR, allocation and an exit view. Set it with `"orientation"`.

This is the investor-facing descendant of the `one-pager` skill. That skill still owns the founder-facing formats; see [Relationship to the one-pager skill](#relationship-to-the-one-pager-skill).

## Two options

| | **A · Portfolio Highlight** | **B · Investment Case** |
|---|---|---|
| Reader | An LP reading a fund update, or a co-investor | An IC, or an investor in the round on the table |
| Register | Reported. Third person, present tense | Argued. Numbered claims, dated milestones |
| Spine | 01 Company · 02 The position · 03 Why we backed it · 04 Founder · 05 Standing | 01 The case · 02 The round · 03 Why we backed it · 04 Where it stands · 05 Our involvement |
| Numbers sit | At the foot, as standing | Under the headline, as the ask |
| Right column | Key company information, then one chart card | Key company information, then use of proceeds |

When nobody says which, build **A**. It converts to B by moving the metric strip up and swapping prose for claims.

## Step 1: ask the growth stage

Ask this before anything else, because the stage decides which blocks belong on the page and a page with the wrong blocks is worse than a late one. Use `AskUserQuestion` with these options, and ask whether a round is live in the same call:

- **Pre-seed** · idea to first build, no institutional round closed
- **Seed** · product exists, first institutional money in
- **Series A** · repeatable sale, real operating metrics
- **Series B or growth** · scaling, cohort and unit economics available
- **Pre-exit or secondary** · marked, with a credible exit path

Two things follow from the answer and nothing else does:

1. Which optional blocks appear, per [the stage matrix](references/stage-matrix.md).
2. Whether ownership, multiple and IRR may appear at all. **Never show a multiple or IRR on a company that has not had a mark.** Before Series A those numbers are arithmetic on a guess, and a sophisticated reader discounts the whole page for it.

If the session is unattended, infer the stage from the evidence, state the inference in one line at the top of your reply, and build.

## Step 2: resolve the design system

A brand kit in this house is a small design system, not a folder of logos. Three files carry almost everything:

| File | What it is |
|---|---|
| `*-design-language.md` | The authoritative spec: palette with named roles, type system, component rules, do's and don'ts, and usually a `Quick Reference Tokens` block |
| `*.assets.json` | The machine-readable manifest: every asset with an id, kind, src, usage and placements |
| `Design assets/Logo/` | The marks, usually SVG |

```bash
node .claude/skills/lp-one-pager/scripts/extract-brand-kit.mjs <kit.zip|kit-dir|git-url> work/
```

It writes `work/brand.json`, copies usable assets into `work/assets/`, and tells you three things worth acting on: which typefaces the kit names but does not ship, which manifest entries point at files the kit does not contain, and which words the brand's voice bans.

Then **read the design language yourself**. The extractor gets the palette and the type scale; it cannot get the reasoning, and the reasoning is what keeps the page from looking generic. `references/design-system-intake.md` covers what to look for and how to resolve conflicts between the spec and this skill's defaults. The spec always wins.

If there is no kit, ask for one. Do not substitute a guessed palette.

## Step 3: the voice

Write as **an investment professional explaining a technical company to other investment professionals.** Not the founder, not a marketer. Someone who has done the diligence and has ninety seconds to make a busy partner understand why the money is going somewhere.

Four moves carry the value proposition, in order: **name the loss** in money or time, **give one analogy** that maps the product onto something a financial reader already owns (a clearing house, an escrow, a custody chain), **show the mechanism as three numbered steps**, then **say what it replaces**. Displacement is the clearest statement of value there is.

Read `references/tone-and-voice.md` before writing a word of copy. It carries the rules, the banned-word list and before-and-after examples.

## Step 4: confirm the content map

Before writing, map what the uploaded documents actually yield onto the blocks the page has, and ask only for the gaps. This is the step that stops the page being shaped by the template instead of by the evidence.

Produce the table, show it, then ask:

| Block | Source found | State |
|---|---|---|
| Problem | Intro one pager, p1 | Found |
| Our position | | Missing |
| Metric strip | IC memo, partial | Partial, needs periods |

`references/content-confirmation.md` has the full block list, what each document type reliably yields, a question bank written so every question is answerable in one line, and the closing paragraph that confirms the shape before you build. Close with the structure you intend to produce so the person corrects the shape rather than the prose.

If nobody answers, build anyway: drop what the stage matrix says to drop, chip everything unverified `ILLUSTRATIVE`, and put the assumptions at the top of your reply. Never fill a gap with a plausible number.

## Step 5: gather content, ask once

Scan before asking: this conversation, the working directory, and any sibling skill output. `growth-strategy`, `manifesto`, `company-moc`, `technical-dd`, `investment-memo` and `post-call-deal-screen` all produce material this page consumes.

Then one message for the gaps only:

> To build the LP page I have the positioning and the thesis. Four things would finish it:
>
> 1. **The brand kit** · the zip, or the URL of the design-assets repo
> 2. **The company record** · founded, HQ, headcount, total raised, last round and date
> 3. **Your position** · ownership, board seat, entry date, current mark and the date it was set
> 4. **Three to five operating numbers you can stand behind**, each with the period it covers and whether the fund has seen the underlying evidence
>
> Anything you cannot source I will leave off rather than estimate.

Point 4's last clause is not politeness. It decides the provenance chip on each figure.

## Step 6: write `lp.json`

```bash
cp .claude/skills/lp-one-pager/assets/dextrum-option-a.json  work/lp.json  # A, portfolio highlight, landscape
cp .claude/skills/lp-one-pager/assets/dextrum-landscape.json work/lp.json  # B, investment case, landscape
cp .claude/skills/lp-one-pager/assets/dextrum-portrait.json  work/lp.json  # B, full record, portrait
```

Three worked examples, one per shape, all in the finalised direction: problem and solution pair, investment register, logo strip. Option A carries no valuation, multiple or IRR, because that register reports standing rather than the round; option B carries the position.

Set `"orientation": "portrait"` for an A4-proportion page at 1080 x 1527. Portrait stacks full-width bands instead of running two columns, which roughly doubles what fits: six metric tiles, four cards, and the whole position, both rounds, valuation, ownership, multiple, IRR, allocation and an exit view. Choose it whenever the record does not fit landscape, rather than cutting the record.

All three are real Dextrum content built from the Dextrum brand kit, with a `_provenance` block separating what is reported from what is invented. `references/lp-layout.md` has the full schema and the block catalogue.

### Provenance chips

Every figure carries its state, next to the figure, not in a footnote nobody reads:

| Chip | Means |
|---|---|
| `BOUND` | The fund has seen the underlying evidence |
| `REPORTED` | Company-reported, not independently checked |
| `ILLUSTRATIVE` | Modelled, projected or indicative |

This is the single most valuable habit on an LP page, and for a brand like Dextrum whose product already distinguishes BOUND from ILLUSTRATIVE it is the brand's own vocabulary. Where a design language defines its own state semantics, use those words rather than these.

### The logo slot

One strip above the footer, three to six marks, one set only. Customers beat partners beat standards beat target counterparties. The component falls back to a text chip when no image exists, so the slot can be laid out and approved before anyone chases an SVG. Never imply a relationship that does not exist: when the set is targets, the label says so and the note says so. `references/logo-slots.md` has the sets, the rules and the schema.

### Copy rules

- **The headline states the mechanism**, not the category. "A neutral verification layer for multi-party oil and gas fiscal operations" beats anything with "platform" in it.
- **Three thesis claims.** Two reads thin, four dilutes. Each is a bold assertion plus two lines.
- **Date every number.** A figure without a period is not a figure.
- **No em dashes.** Use `·`, a comma, or a full stop.
- **Honour the brand's banned words.** The extractor prints them and the builder warns when one reaches the page.

## Step 7: build, render, look

```bash
node .claude/skills/lp-one-pager/scripts/build-lp-onepager.mjs work/lp.json work/brand.json work/out/
node .claude/skills/lp-one-pager/scripts/render-lp-onepager.mjs work/out/<slug>.html
```

The builder inlines every image and font, so the HTML is one portable file. The renderer drives the pre-installed Chromium, writes a PDF and a PNG at 1440 x 810, and **fails when content spills past one page**. Chromium is already present at `/opt/pw-browsers/chromium`; do not run `playwright install`.

**Then read the PNG.** Check:

- Nothing clipped, nothing overlapping the footer strip.
- Fonts resolved to the brand faces, not a system fallback. Compare letterforms if unsure.
- All figures in the brand's mono, with tabular figures, so columns align.
- The accent appears only where the design language allows it. For most instrument-register brands that is data, action and evidence, never headings.
- Every number has a provenance chip.
- No bracketed placeholder, no banned word, no em dash.

Two or three passes is normal. When it overflows, cut copy rather than passing `--scale-to-fit`.

## Step 8: deliver

Send the PDF and the PNG together. Say which option and which stage you built, name anything you left off for lack of evidence, and flag any figure still chipped `ILLUSTRATIVE`. Keep `work/lp.json` next to the output; the next revision is an edit to that file and a rebuild.

## Relationship to the one-pager skill

`one-pager` and `lp-one-pager` are siblings, not versions. Choose by reader:

| Reader | Skill |
|---|---|
| An LP, a co-investor, an investment committee | **`lp-one-pager`** |
| A customer, a partner, a first-meeting investor | `one-pager`, Type 1 (image-led) or Type 2 (typographic) |

`one-pager` also carries a Type 3 investor page, which was the prototype for this skill. This one supersedes it: plain canvas instead of a tinted band, the brand's real typefaces instead of a system stack, design-language intake instead of hex scraping, provenance chips instead of a single footnote, and an explicit stage question. Where the two disagree, prefer this skill for LP work.

## Files

| Path | Read it when |
|---|---|
| `references/tone-and-voice.md` | Before writing any copy. The persona, the four moves, banned words |
| `references/content-confirmation.md` | Step 4. Source-to-block map, question bank, the confirmation message |
| `references/logo-slots.md` | Choosing and sourcing the logo strip |
| `references/lp-layout.md` | Building. Grid, block catalogue, type scale, JSON schema |
| `references/design-system-intake.md` | Reading a brand kit, and resolving spec conflicts |
| `references/stage-matrix.md` | After Step 1, to pick the blocks |
| `assets/dextrum-option-a.json` | Worked example, option A portfolio highlight, 16:9 |
| `assets/dextrum-landscape.json` | Worked example, option B investment case, 16:9 |
| `assets/dextrum-portrait.json` | Worked example, option B full record, A4 portrait |
| `scripts/extract-brand-kit.mjs` | Step 2 |
| `scripts/build-lp-onepager.mjs` | Step 5 |
| `scripts/render-lp-onepager.mjs` | Step 5 |
