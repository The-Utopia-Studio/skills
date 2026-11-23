# LP one pager layout

One flat canvas, a full-bleed footer strip, and two orientations off one component set. Measured from the Dextrum samples in `assets/`, which are built from the Dextrum brand kit and use nothing its design language does not authorise.

## Contents

- [Two orientations](#two-orientations)
- [The grid](#the-grid)
- [Option A anatomy](#option-a-anatomy)
- [Option B anatomy](#option-b-anatomy)
- [Component catalogue](#component-catalogue)
- [Type scale](#type-scale)
- [What makes it feel like the brand](#what-makes-it-feel-like-the-brand)
- [JSON schema](#json-schema)
- [Fitting one page](#fitting-one-page)

## Two orientations

`"orientation": "landscape"` (the default) or `"portrait"`. Same components, different arrangement, and the choice is about how much investment record the page has to carry.

| | **Landscape** | **Portrait** |
|---|---|---|
| Page | 1440 x 810, 16:9 | 1080 x 1527, A4 proportion |
| Shape | Two tall columns beside each other | Full-width bands, stacked |
| Holds | 4 metric tiles, 3 sections, 2 cards | 6 metric tiles, 4 cards, claims across three, a 6-point rail |
| Reads on | A screen, in a deck, on a shared call | Paper, an email attachment, a data room |
| Use when | It sits beside other 16:9 material, or the record is short | The full investment record has to fit: both rounds, valuation, ownership, multiple, IRR, allocation and an exit view |

Portrait is the one to reach for when an LP wants the whole position on one page. Landscape is the one that lives inside a quarterly pack.

**Portrait band order**, each with its own numbered kicker:

```
01 Company            headline + standfirst
02 The problem, and the fix   two panels side by side
03 The position       metric strip, 3 across x 2 rows
04 The record         cards[0] | cards[1] side by side
05 Why we backed it   three claims across
06 Where it stands    milestone rail, up to 6 points
07 Round and return   cards[2] | cards[3] side by side
   logo strip         above the footer
```

Bands are collected before they are numbered, so a block that renders empty never burns a kicker: an option A page with no prose position still counts 01, 02, 03, 04 without a gap. The title block is always 01 and everything else follows in reading order, whichever column it lands in. With the pair present, portrait has room for six metric tiles, four cards and the rail but not also a prose involvement block; landscape has room for the pair, a four-tile strip, three claims and one card. Both are full pages. Adding a block means removing one.

`cards` fills the two duos in order, so the first two entries are the record pair and the next two are the round pair.

## The grid

Landscape:

```
|<-48->|<--------- 690 --------->|<-46->|<--------- 608 --------->|<-48->|
       |    PROSE / ARGUMENT     |gutter|        DATA CARDS        |
```

- Page 1440 x 810. Margins 34 top, 48 left and right, 58 bottom.
- Left column 690, gutter 46, right column 608.
- Portrait: page 1080 x 1527, margins 40 top, 44 left and right, 62 bottom, content width 992, two-up bands split 1fr / 1fr with a 20 gutter.
- A full-bleed footer strip, 44 tall, sits at the very bottom in the structure colour. The 58 bottom padding clears it.
- **The canvas is one flat colour edge to edge.** No tinted band, no gradient, no chromatic panel. Cards are white, boundary drawn with the brand's shadow-border rather than a `border` so the geometry stays exact.
- Sections are separated by numbered kickers and whitespace. There are no divider rules anywhere on the page.

## Option A anatomy

```
 0   ┌──────────────────────────────────────────────────────────────────┐
     │ [logo]                              LP BRIEF · SEED · Q3 2026    │
     │ 01 COMPANY                                                        │
     │ A neutral verification layer for multi-party oil and gas          │
     │ fiscal operations.                                                │
     │ standfirst, two lines                                             │
     │                                                                   │
     │ 02 THE POSITION                    ┏━ KEY COMPANY INFORMATION ━━┓ │
     │ one paragraph                      ┃ 2 x 4 label / value grid   ┃ │
     │                                    ┃ values in mono, chips      ┃ │
     │ 03 WHY WE BACKED IT                ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
     │ 01 claim + two lines                                              │
     │ 02 claim + two lines               ┏━ VERIFICATION COVERAGE ━━━━┓ │
     │ 03 claim + two lines               ┃ donut + legend             ┃ │
     │                                    ┃ ● ILLUSTRATIVE  note       ┃ │
     │ 04 FOUNDER                         ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
     │ one paragraph                                                     │
     │                                                                   │
     │ 05 STANDING                                                       │
     │ 40+        3          0          4        ← metric strip          │
     │ ● REPORTED ● BOUND    ● BOUND    ● REPORTED                       │
     ├───────────────────────────────────────────────────────────────────┤
     │ From Insight to Impact   CONFIDENTIAL · NOT FOR REDISTRIBUTION    │
     └───────────────────────────────────────────────────────────────────┘
```

## Option B anatomy

```
 0   ┌──────────────────────────────────────────────────────────────────┐
     │ [logo]                        LP BRIEF · SEED · OPEN · Q3 2026   │
     │ 01 THE CASE                                                       │
     │ Your systems already produce the numbers. Dextrum turns them      │
     │ into proof every party can check.                                 │
     │ standfirst, one line                                              │
     │                                                                   │
     │ 02 THE ROUND                                                      │
     │ 1.5M       18mo        3           1       ← metric strip, full   │
     │ ● ILLUS.   ● ILLUS.    ● BOUND     ● ILLUS.   width, under the    │
     │                                               headline            │
     │ 03 WHY WE BACKED IT                ┏━ KEY COMPANY INFORMATION ━━┓ │
     │ 01 02 03 claims                    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
     │                                                                   │
     │ 04 WHERE IT STANDS                 ┏━ USE OF PROCEEDS ━━━━━━━━━━┓ │
     │ ●───●───●───○───○ milestone rail   ┃ 4 bars, mono percentages   ┃ │
     │                                    ┃ ● ILLUSTRATIVE  note       ┃ │
     │ 05 OUR INVOLVEMENT                 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
     │ one paragraph                                                     │
     ├───────────────────────────────────────────────────────────────────┤
     │ From Insight to Impact   CONFIDENTIAL · NOT FOR REDISTRIBUTION    │
     └───────────────────────────────────────────────────────────────────┘
```

The metric strip is the only element that spans both columns, and moving it is the whole difference between the two options. In A it closes the page as standing. In B it sits directly under the headline, because a page making an ask should state the ask before it argues for it.

## Component catalogue

| Component | Where | Notes |
|---|---|---|
| Header | Top | Logo left at 34 tall, mono stamp right: doc label, stage, period |
| Numbered kicker | Every section | Mono, uppercase, tracked, muted. Numeral in ink. Replaces rules |
| Headline | Title block | 29, display, 700, one or two lines. No accent clause unless the spec allows it |
| Standfirst | Title block | 13, one or two lines, the mechanism end to end |
| Problem and solution pair | Full width in portrait and landscape | Two equal panels. Claim, three evidence lines, a bottom line naming the cost on the left and what it replaces on the right. The solution numbers its steps and takes the accent; the problem stays neutral, because colour marks the fix rather than the complaint |
| Logo strip | Above the footer | Three to six chips, real marks or text fallback, one labelled set. See `logo-slots.md` |
| Prose section | Left | One paragraph. Two is the ceiling and usually one too many |
| Claims | Left | Three. Mono index, title at 13.5, body at 11.5 over two lines |
| Milestone rail | Left | 5 points, filled dots for done, hollow for pending. Dates in mono |
| Metric strip | Full width | 4 tiles. Value in mono at 22 with tabular figures, label tracked uppercase, provenance chip, optional note |
| Info card | Right | Dark header bar, 2 columns, 4 rows. Values in mono unless prose |
| Donut card | Right | Monochromatic ramp, legend with mono values, chipped note |
| Bars card | Right | Horizontal bars, mono percentages, chipped note |
| Provenance chip | Anywhere | Dot plus mono uppercase label. BOUND takes the accent, everything else neutral |
| Card-level chip | Card header bar | Set `state` on a card when every row shares it. Rows matching it then drop their own chip |
| Footer strip | Bottom, full bleed | Structure colour, tagline reversed out left, tracked mono confidential right |

## Type scale

At 1440 wide. Display is the brand's display face; mono is the brand's data face with `font-variant-numeric: tabular-nums`.

| Role | Face | Size | Weight |
|---|---|---|---|
| Headline | display | 29 | 700 |
| Standfirst | body | 13 | 400 |
| Header stamp | mono | 11 | 500, uppercase, 0.12em |
| Kicker | mono | 10.5 | 500, uppercase, 0.13em |
| Card header bar | display | 11.5 | 600, uppercase, 0.11em |
| Card label | body | 10 | 500, uppercase, 0.09em |
| Card value | mono or body | 12.5 | 400 |
| Claim index | mono | 11 | 500 |
| Claim title | display | 13.5 | 600 |
| Claim body | body | 11.5 | 400 |
| Prose | body | 12 | 400, 1.5 |
| Metric value | mono | 22 | 500, tabular |
| Metric label | body | 10.5 | 500, uppercase, 0.09em |
| Provenance chip | mono | 9.5 | 500, uppercase, 0.1em |
| Milestone date | mono | 10.5 | 500, uppercase |
| Footer tagline | display | 14 | 500 |
| Footer meta | mono | 10.5 | 500, uppercase, 0.14em |

## What makes it feel like the brand

Five things, in rough order of how much they matter:

1. **Every figure in the brand's mono with tabular figures.** Control IDs, percentages, dates, counts. It is the difference between a page in the brand and a page near it.
2. **One flat canvas.** No band, no panel, no gradient. Contrast comes from white cards and one dark footer strip.
3. **Numbered kickers instead of rules.** `01`, `02`, `03` down the page, and nothing else separating sections.
4. **The accent used only where the design language allows.** For an instrument-register brand that means data, action and evidence. Headings stay in ink, and so do kicker numerals and claim indices.
5. **The footer strip.** Structure colour, tagline reversed out, tracked mono confidential label. Most design languages describe exactly this for a print or audit export; read theirs before copying this one.

## JSON schema

```jsonc
{
  "option": "A",              // or "B"
  "orientation": "landscape", // or "portrait"
  "slug": "dextrum-lp-portfolio-highlight",
  "stage": "seed",            // documentation only; you choose the blocks
  "_provenance": { "reported": "...", "illustrative": "..." },

  "meta": {
    "company": "Dextrum",
    "logo": "assets/....svg",        // falls back to a type lockup
    "docLabel": "LP brief",
    "stage": "Seed",                 // shown in the header stamp
    "asOf": "Q3 2026",
    "titleLabel": "Company",         // kicker 01
    "headline": "...",
    "headlineAccent": "",            // leave empty when the spec reserves the accent
    "standfirst": "...",
    "positionLabel": "The position", "thesisLabel": "Why we backed it",
    "founderLabel": "Founder", "timelineLabel": "Where it stands",
    "involvementLabel": "Our involvement", "metricsLabel": "Standing",
    "tagline": "From Insight to Impact",
    "confidential": "CONFIDENTIAL · NOT FOR REDISTRIBUTION",
    "page": "PG 01"
  },

  /* Option A uses position, thesis, founder. Option B uses thesis, timeline, involvement. */
  "position":    { "paragraphs": ["..."] },
  "founder":     { "paragraphs": ["..."] },
  "involvement": { "paragraphs": ["..."] },
  "thesis":      { "points": [ { "title": "...", "body": "..." } ] },
  "timeline":    { "items": [ { "when": "2026 Q3", "what": "...", "done": true } ] },

  "cards": [
    { "kind": "info", "title": "Key company information", "columns": 2,
      "state": "ILLUSTRATIVE",   // optional: one chip in the header instead of one per row
      "items": [ { "label": "Provenance", "value": "SHA-256" },
                 { "label": "Sector", "value": "Fiscal verification", "mono": false, "state": "BOUND" } ] },

    { "kind": "donut", "title": "Verification coverage",
      "segments": [ { "label": "Controls bound", "value": 1, "note": "C-001" } ],
      "state": "ILLUSTRATIVE", "note": "..." },

    { "kind": "bars", "title": "Use of proceeds",
      "rows": [ { "label": "Control library", "value": 45, "display": "45%" } ],
      "state": "ILLUSTRATIVE", "note": "..." }
  ],

  "metrics": [
    { "value": "3", "unit": "", "label": "Controls implemented",
      "state": "BOUND", "note": "C-001 to C-003" }
  ],

  "problem": {
    "title": "The problem",
    "lead": "One number settles the barrel. Only one party can compute it.",
    "points": [ { "lead": "The operator owns the maths.", "body": "..." } ],
    "bottomLabel": "Cost today", "bottom": "..."
  },
  "solution": {
    "title": "The solution",
    "lead": "A clearing layer for the entitlement number.",
    "points": [ { "lead": "Reads.", "body": "..." } ],
    "bottomLabel": "Replaces", "bottom": "..."
  },

  "logos": {
    "label": "OUTPUT MAPS TO",
    "state": "ILLUSTRATIVE",
    "items": [ { "name": "ISAE 3000" }, { "name": "Partner", "src": "assets/x.svg" } ],
    "note": "Shown for introduction context. No partnership implied."
  }
}
```

Notes on fields that are easy to get wrong:

- `mono: false` on an info-card item switches that value to the body face. Use it for prose values like "Fiscal verification, oil and gas"; leave it on for anything numeric or ID-shaped.
- `state` accepts any label. `BOUND` renders in the accent, `PASS` and `FAIL` in the status colours, everything else neutral. Where a design language defines its own state words, use those.
- `headlineAccent` exists but most instrument-register brands forbid it. Check the spec before using it.
- Two cards is the comfortable maximum. Three fits only when one is a short bars card and the left column is light.

## Fitting one page

The renderer fails the build when content spills, which is the failure mode that matters. When it does, cut in this order:

1. Prose sections down to one paragraph. Two paragraphs is almost always one too many.
2. Claim bodies to two lines.
3. Info-card items to eight. If a row is not a question an LP would ask, it is not a row.
4. Card notes to one line.
5. A card. Two is the maximum and one is often better.

Do not reach for `--scale-to-fit`. Shrinking type off the brand's scale is more damage than cutting a sentence.

Rough budget at the current type scale. **Landscape**: 704px of content height, of which the header takes 38, the title block 106 with a one-line headline or 140 with two, the metric strip 100, and the columns get the rest. A three-section left column runs about 400 and two cards about 440, so the right column is usually the binding constraint. Four metric tiles and two cards with eight rows each is the comfortable load.

**Portrait**: 1425px of content height, which absorbs six metric tiles, four cards, three claims and a six-point rail with room left. It is the orientation to choose when the record does not fit landscape, rather than cutting the record.

## The simulated investment record

`assets/dextrum-portrait.json` carries a full simulated position, and it is the pattern to copy because the numbers tie to each other:

| Field | Value | Where it comes from |
|---|---|---|
| Entry | 600K pre-seed, Mar 2025, at 6.3M post | The first institutional round |
| Current mark | 1.5M seed, Sep 2026, at 12.0M post | A priced round, which is what creates the mark |
| Multiple | 1.9x | 12.0 / 6.3 |
| Gross IRR | 53% | 1.9 ^ (1 / 1.5) - 1, over 18 months held |
| Ownership | 12.5% fully diluted | Pre-seed plus pro rata |

Note what that makes legitimate. The stage matrix says a multiple and an IRR are **Avoid** at seed, and they are, right up until a priced round sets a mark. Here one has, the entry and the mark are both on the page with their dates, and the arithmetic between them is checkable. That is the whole test: not what stage the company is at, but whether the reader can verify the number from what the page already tells them.

If you change one of those five figures, recompute the other four. A reader who spots an IRR that does not follow from the multiple and the holding period stops trusting the page, and they are right to.

Third-party investor names are deliberately absent. Naming a real institution in a simulated cap table is a different kind of error from an optimistic projection, and a worse one. Use role descriptions until the commitment is real.
