# Type 2 layout: the typographic A4 landscape brief

Measured from the live example, Dextrum `general intro v1`, Sept 2026, A4 landscape, 841.6 x 595.5 pt. Build at that page size and every number below is in points.

This format carries no photography at all. Its whole job is to explain a mechanism, and it does it with a three-column argument, mono uppercase labels, hairline rules and stacked boxes. Done well it looks more serious than Type 1, not less.

## Contents

- [The grid](#the-grid)
- [Vertical anatomy](#vertical-anatomy)
- [Region by region](#region-by-region)
- [The block model](#the-block-model)
- [Type scale](#type-scale)
- [Colour roles](#colour-roles)
- [JSON schema](#json-schema)

## The grid

```
|<-31->|<--- 249 --->|<-17->|<--- 249 --->|<-17->|<--- 249 --->|<-31->|
       |  COLUMN 01  |      |  COLUMN 02  |      |  COLUMN 03  |
```

- Page 841.6 x 595.5 pt, outer margin 31.
- Three equal columns of 249 with a 17 gutter. Column origins at x = 31, 297, 562.
- Vertical hairlines may separate the columns, or not. Dextrum uses whitespace only, which is calmer.
- Boxes inside a column are full column width with 8 to 10 of internal padding and radius 4 at most. This format is squarer than Type 1.

## Vertical anatomy

```
 0    ┌──────────────────────────────────────────────────────────────┐
      │                                     ENCODED FROM THE OPERATOR'S SIDE │  41
      │                                     Jamal Kamaludin, Founder · 40+ y │  56
      │   A neutral verification layer      Dextrum reads the systems each   │  107
      │   for multi-party oil & gas         party already runs, re-derives   │
      │   fiscal operations                 allocation, ... at close.        │
      ├──────────────────────────────────────────────────────────────┤  hairline ~145
      │ 01 · THE PROBLEM   │ 02 · THE SOLUTION │ 03 · WHAT'S DIFFERENT│  155
      │ Assurance stops at │ A read-only layer │ CEEP: the encoded    │  174
      │ the party boundary │ above your systems│ control library      │
      │ deck line          │ deck line         │ deck line            │  193
      │                    │                   │                      │
      │ [ chips ]          │ [ stack box ]     │ [ 2 x 2 grid ]       │
      │ [ stack box ]      │     ▲ EMITS       │ [ note ]             │
      │   × HAND-OFF       │ [ stack box ]     │ [ checks row ]       │
      │ [ stack box ]      │     ▲ READ-ONLY   │                      │
      │                    │ [ stack box ]     │                      │
      │ foot: lead + body  │ foot: lead + body │ foot: lead + body    │  499
      ├──────────────────────────────────────────────────────────────┤  hairline
      │        Your systems already produce the numbers. ...          │  553
      │        Each period closes with its evidence in place.         │  568
      │                                              www.dextrum.ai   │
      └──────────────────────────────────────────────────────────────┘
```

## Region by region

### Header

Three things, arranged asymmetrically.

- **The founder line**, top right, in the width of the last two columns. A mono uppercase eyebrow at 6.3 in muted (`ENCODED FROM THE OPERATOR'S SIDE`), then the founder's name in semibold ink at 7.5 immediately followed by a run of body text on the same line giving the credential in full (`· 40+ years oil & gas (EXXON, DIALOG Group); BSc Chem Eng, UK '82. MBA, France 2024`), wrapping to two or three lines, then a geography line. This is the entire founder treatment in Type 2. There is no portrait and there is no credentials grid: the credibility is one dense, checkable paragraph.
- **The headline**, left, at 20 in the display face, semibold, centred within the left two-thirds, two lines. It states what the company is, not what it does: `A neutral verification layer for multi-party oil & gas fiscal operations`.
- **The standfirst**, right, at 10, three lines, body colour, one sentence that explains the mechanism end to end: reads what, re-derives what, gives whom what.

A full-width hairline closes the header.

### The three columns

Every column opens identically:

- **Eyebrow**, mono uppercase at 7, letter-spacing about 0.08em, in accent: `01 · THE PROBLEM`. The ` · ` separator between the numeral and the label is part of the format.
- **Heading**, 11.5 semibold ink, one or two lines.
- **Deck**, 7.5 body colour, one or two lines, setting up what the blocks below prove.

Then between one and three blocks from the model below, then a **foot**: a bold ink lead phrase followed by body text that concludes the column (`Custody, not capability.` then `The systems work, but the number is computed on a system owned and operated by the party being audited.`). The foot is what the reader keeps if they only read three lines of the page.

Columns should end within about 20 pt of each other. If one runs long, cut it rather than shrinking type.

### Footer

A full-width hairline, then the closing statement over two centred lines at 12 in the display face, and the url at 11 on the right. The closing statement is the argument of the whole page in two sentences and it is worth more editing time than anything else on it:

> Your systems already produce the numbers. Dextrum turns them into proof every party can check.
> Each period closes with its evidence in place.

## The block model

A column body is an ordered list of blocks. Five kinds cover everything in the reference and they compose freely.

**`chips`** · a wrapped row of mono uppercase labels at 6.5 on tinted pills with a hairline. Names the actors or the surfaces the column is about: `OPERATORS`, `JV · PSC PARTNERS`, `REGULATORS`, `AUDITORS`.

**`stack`** · the workhorse. Two to four boxes in a vertical column, each with a mono uppercase label at 6.5 in accent and a body at 8, separated by a connector line: a small glyph, then a mono uppercase phrase at 6.5, centred in the gap. Connectors carry the argument, so write them as claims:
- `×  HAND-OFF · ASSURANCE STOPS HERE` for a broken chain, in the danger tone
- `▲  EMITS`, `▲  READ-ONLY`, `▲  EACH CHECKS INDEPENDENTLY` for a working one, in accent

Column 01 and column 02 in Dextrum are the same stack with the connectors inverted, which is the whole rhetorical move of the page: broken chain, then the same chain fixed. Reach for that symmetry when the argument allows it.

**`grid`** · a 2 x 2 of short items, each a title at 8.5 semibold ink over a two-line body at 7. Used for the four-part model that names the product's approach (`Controls`, `Evidence`, `Exceptions`, `Provenance`).

**`note`** · a short paragraph at 8 with a bold ink lead, used for the caveat that pre-empts the obvious objection: `Deterministic checks decide. AI explains: labelled advisory, never in the verification path.`

**`checks`** · a mono uppercase label at 6.5, then a row of ticked items at 6.3, then a body line at 7.5 explaining why the test is hard to pass. This is the competitive claim, and it only works when the test is genuinely three-dimensional and genuinely exclusive: `THE THREE-DIMENSION TEST` · `✓ CONTINUOUS` `✓ CROSS-PARTY` `✓ AUDIT-DEFENSIBLE` · `No incumbent category passes all three.`

## Type scale

At 841.6 wide.

| Role | Size | Weight | Colour |
|---|---|---|---|
| Headline | 20 | 600 | ink |
| Standfirst | 10 | 400 | body |
| Founder eyebrow | 6.3 | 600 | muted, uppercase, mono, 0.08em |
| Founder name | 7.5 | 600 | ink |
| Founder detail | 7.5 | 400 | body |
| Column eyebrow | 7 | 600 | accent, uppercase, mono, 0.08em |
| Column heading | 11.5 | 600 | ink |
| Column deck | 7.5 | 400 | body |
| Chip | 6.5 | 600 | ink, uppercase, mono, 0.06em |
| Stack label | 6.5 | 600 | accent, uppercase, mono, 0.06em |
| Stack body | 8 | 400 | body |
| Connector | 6.5 | 600 | accent or danger, uppercase, mono |
| Grid title | 8.5 | 600 | ink |
| Grid body | 7 | 400 | body |
| Note | 8 | 600 lead, 400 body | ink + body |
| Checks label | 6.5 | 600 | muted, uppercase, mono |
| Check item | 6.3 | 600 | accent, uppercase, mono |
| Column foot | 7.5 | 600 lead, 400 body | ink + body |
| Closing statement | 12 | 600 | ink |
| Url | 11 | 400 | body |

Line-height 1.2 for the headline, 1.3 elsewhere. Mono uppercase labels sit at 1.1.

## Colour roles

The Dextrum palette, extracted from the live file:

| Role | Hex |
|---|---|
| Ink | `#192B39` |
| Body | `#3A4F5E` |
| Muted | `#5C6E7A` |
| Faint | `#9BA6AE` |
| Accent | `#3E8ECC` |
| Accent deep | `#1F3A5F` |
| Accent deeper | `#243B4D` |
| Tint | `#B9D5EE` |
| Surface | `#EAEAEA` |
| Canvas | `#FFFFFF` |
| Hairline | `#C9D0D5` |

Note that the accent used on the page, `#3E8ECC`, is a lift of the brand's locked ocean blue `#2E75B6`. At 6.5 pt on white, the locked value goes muddy, so the page brightens it for small type while keeping the deep navy `#1F3A5F` for solid fills. That is a legitimate move and worth repeating: check every label size against the background before locking the accent.

Type 2 uses a white canvas, unlike Type 1's warm off-white. The whiteness is part of why it reads as a technical document.

## JSON schema

See `assets/type-2.example.json` for the filled-in version. Shape:

```jsonc
{
  "type": 2,
  "meta": {
    "wordmark": { "lead": "DEXTRUM" },
    "url": "www.dextrum.ai",
    "headline": "A neutral verification layer for multi-party oil & gas fiscal operations",
    "standfirst": "Dextrum reads the systems each party already runs, re-derives allocation, ...",
    "founder": {
      "eyebrow": "ENCODED FROM THE OPERATOR'S SIDE",
      "name": "Jamal Kamaludin, Founder",
      "detail": " · 40+ years oil & gas (EXXON, DIALOG Group); BSc Chem Eng, UK '82. MBA, France 2024",
      "geography": "Malaysia · Australia · Saudi Arabia · S Korea · USA."
    }
  },
  "columns": [
    {
      "eyebrow": "01 · THE PROBLEM",
      "heading": "Assurance stops at the party boundary",
      "deck": "For the parties who settle fiscal outcomes across company boundaries:",
      "blocks": [
        { "kind": "chips", "items": ["OPERATORS", "JV · PSC PARTNERS", "REGULATORS", "AUDITORS"] },
        { "kind": "stack",
          "items": [
            { "label": "OPERATOR", "body": "Computes the number inside its own systems, on its own boundary." },
            { "label": "PARTNER",  "body": "Re-derives alone, from statements, over the same evidence." }
          ],
          "connector": { "glyph": "×", "text": "HAND-OFF · ASSURANCE STOPS HERE", "tone": "danger" } },
        { "kind": "grid", "items": [ { "title": "Controls", "body": "Does the number follow the agreed basis?" } ] },
        { "kind": "note", "lead": "Deterministic checks decide.", "body": "AI explains: labelled advisory, never in the verification path." },
        { "kind": "checks", "label": "THE THREE-DIMENSION TEST",
          "items": ["CONTINUOUS", "CROSS-PARTY", "AUDIT-DEFENSIBLE"],
          "body": "Continuous means every record, every period. No incumbent category passes all three." }
      ],
      "foot": { "lead": "Custody, not capability.", "body": "The systems work, but the number is computed on a system owned and operated by the party being audited." }
    }
  ],
  "closing": {
    "lines": [
      "Your systems already produce the numbers. Dextrum turns them into proof every party can check.",
      "Each period closes with its evidence in place."
    ]
  }
}
```

A `connector` may also be given per gap as `connectors: [ {...}, {...} ]`, one fewer than the number of stack items. A single `connector` repeats between every pair.
