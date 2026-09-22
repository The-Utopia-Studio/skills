# Type 1 layout: the image-led 16:9 brief

Measured from the two live examples, Barrier Intelligence (`Time to Act`, Sept 2026, 1280 x 720) and Vyapti Resonance (`One Page Brief`, 1440 x 810). Both are the same design at two scales. Build at **1440 x 810 px** and everything below is in those units.

## Contents

- [The grid](#the-grid)
- [Vertical anatomy](#vertical-anatomy)
- [Panel by panel](#panel-by-panel)
- [Type scale](#type-scale)
- [Colour roles](#colour-roles)
- [Image slots and specs](#image-slots-and-specs)
- [JSON schema](#json-schema)

## The grid

```
|<-42->|<-------------- 894 -------------->|<-22->|<------ 440 ------>|<-42->|
       |            MAIN COLUMN            |gutter|    SIDE COLUMN    |
```

- Page 1440 x 810, outer margin 42 on all four sides.
- Main column 894 wide, side column 440 wide, gutter 22.
- Card padding 11 vertical, 15 horizontal. Card corner radius 10 to 12.
- Everything sits on cards with a 1px hairline border on a warm off-white canvas. There are no drop shadows anywhere.

## Vertical anatomy

```
 0    ┌─────────────────────────────────────────────────────────────┐
      │  WORDMARK                                    ( One Page Brief )│  header, ~61 baseline
      ├─────────────────────────────────────────────────────────────┤  hairline rule, ~88
 99   │ ┌──── 01 The challenge ─────────────┐ ┌── Founder Profile ──┐│
      │ │ headline / body / 3 cause cards   │ │ portrait + 6 creds  ││
      │ │ stakes line                       │ └─────────────────────┘│
      │ ├───────────────────────────────────┤                        │
      │ │ 02 The solution                   │ ┌── 04 The asks ──────┐│
      │ │ lead / 4 numbered points / flow   │ │ headline            ││
      │ │ optional product figure           │ │ 1 ask + logo strip  ││
      │ ├───────────────────────────────────┤ │ 2 ask + logo strip  ││
      │ │ 03 Differentiation                │ │ academic strip      ││
      │ │ 4 numbered points                 │ │ disclaimer note     ││
      │ │ standing line                     │ └─────────────────────┘│
      │ └───────────────────────────────────┘                        │
 768  │  url · location                        closing tagline        │  footer baseline
      └─────────────────────────────────────────────────────────────┘
```

Each column is a flex stack with a 9 minimum gap and `justify-content: space-between`, so leftover height is distributed between the cards and the page always fills. A gap much wider than about 40 is the layout telling you the copy is thin. The side column's two cards do not have to align with the main column's three; they rarely do, and forcing it makes the page worse.

## Panel by panel

### Header

Left: the wordmark. In both examples it is set as type, not an image: the first word in the display face at 16.5 with tight tracking in the accent colour, the second word in the same size at regular weight in ink (`VYAPTI` accent + `RESONANCE` ink). Use the real logo SVG when one exists and it reads cleanly at 24 px tall; otherwise the two-tone type lockup is correct and is what both examples do.

Right: a pill. Fully rounded, filled with the deep accent, white label at 9, letter-spacing about 0.02em. The label is the document type, normally `One Page Brief`.

A hairline rule runs the full content width under the header.

### 01 The challenge

Header row, all on one baseline:
- a numbered badge, 17 x 17, radius 5, deep accent fill, white numeral at 8.25
- the section title at 12.75 semibold ink
- the eyebrow at 7.88 muted, about 12 px after the title, sentence case (`Every encrypted system, every day`)

Then:
- **The headline.** 22.5, display face, semibold, 1.18 line-height, two lines maximum. Split it so the final clause renders in `headlineAccent` colour. This is the single most important line on the page.
- **The body.** 9.38, body colour, two lines, ending in a bolded ink clause (`bodyEmphasis`) that turns the description into a claim.
- **Three cause cards**, equal width, in a row with an 11 gap. Each is a tinted surface with a hairline: a mono uppercase label at 6.75 (`01 CAPTURED NOW`), a title at 9.38 semibold ink, and body at 7.5. Barrier Intelligence adds a muted source citation at the end of the body run, which is the better pattern.
- **The stakes line.** A single line: a bold accent label (`The stakes:`) then muted text with claims separated by ` · `. It sits below a hairline, or with clear space above it.

Three cards is the count. Two reads thin, four crowds.

### 02 The solution

Same header row pattern.

- **Lead**, 9.75 semibold ink, one line, the plainest possible statement of what the software is and where it sits.
- **Sub**, 8.63, body colour, ending with a bolded ink clause naming the constraint the buyer cares about (`Controlled sandbox. Defined interfaces. No production data.` / `No site visit. No new hardware.`).
- **Four numbered points**, 2 x 2. Each: a 14 x 14 badge with the numeral at 6.75, title at 8.25 semibold ink, body at 7.13 body colour on one or two lines.
- **A flow line**, 7.13, steps separated by ` › `, with the final segment in accent. This is the process in one line.
- **An optional product figure.** When a screenshot exists, the four points narrow to the left of the panel and the figure takes a 268 column on the right: image in a hairline frame with radius 8, a caption at 10.5 ink beneath it, and a note at 8.5 muted under that giving provenance (`Our platform, August 2026 build. Modelled, anonymised module.`). Always state whether a screenshot is real, modelled or anonymised.

### 03 Differentiation

Same header row pattern. Four numbered points across a single row, each in its own column:

- badge at 7.13, title at 10.5 semibold ink over one or two lines
- a lead at 8.63 semibold ink, the assertion
- body at 8.25, with the load-bearing phrase in ink and the rest in body colour

Then the **standing line**, the same construction as the stakes line: bold accent label (`Standing:`) plus a ` · ` separated list of verifiable facts.

### Founder Profile (side column, top)

The panel that makes Type 1 worth building.

- Title `Founder Profile` at 12, ink, no badge.
- **Portrait** on the left, 124 wide x 152 tall, radius 8, `object-fit: cover`. Barrier Intelligence adds a wide field photo above the credentials with a white caption set over the image bottom-left at 8.5 (`Chopper travel to offshore`), which is worth doing whenever an in-the-field photo exists: it proves the founder has stood where the problem is.
- **Name** at 18 display semibold, wrapping to two lines if needed, with the role at 9.75 in accent, top-right of the name block.
- **Six credentials** in a 2 x 3 grid. Each: a badge at 7.13, a title at 10.13 semibold ink, and a two-line body at 8.63. Barrier Intelligence runs the title and body as a single flowing run separated by ` · ` (`F&G practitioner · 20 yrs · 100+ facilities`), which packs more in; Vyapti stacks them, which reads calmer. Either is correct, but pick one and hold it across all six.

Six is the target. Four real credentials beat six where two are padding.

### 04 The asks (side column, bottom)

Tinted card, deep-accent-at-4% fill with a hairline in the accent at about 20% opacity, so it reads as the call to action.

- Header row, same pattern, badge `04`.
- **Headline** at 14.25 over one or two lines, second clause in accent (`Two doors in Qatar. Each ends in independent evidence.`).
- **Two asks**, each: badge at 8.25, title at 9 semibold ink, body at 7.13 over two lines, then an optional logo strip.
- **Logo strips.** A mono uppercase label at 5.63 muted (`TARGET VALIDATION ENVIRONMENT`), then logo chips in a row: white fill, hairline, radius 6, 27 tall, logo centred with `object-fit: contain` and 8 padding.
- **A closing disclaimer** at 5.63 italic muted: `Target organisations shown for introduction context; no partnership implied.` Include this whenever named organisations appear and no agreement exists.

Barrier Intelligence uses the same slot for a `Partners` strip instead, with each partner's name at 10.5 ink over a role at 8.5 muted beside the logo. Use that form when relationships are real and signed.

### Footer

A hairline, then one line: the url in accent, then ` · ` and the location in muted, both at 8.25, left-aligned. The closing tagline at 8.25 muted, right-aligned, on the same baseline. The tagline is the manifesto compressed into one sentence: `Measure every cryptographic path. With evidence, not assumption.`

## Type scale

At 1440 wide. Scale linearly for other widths.

| Role | Size | Weight | Colour |
|---|---|---|---|
| Wordmark | 16.5 | 600 | accent + ink |
| Pill label | 9 | 600 | on-accent |
| Section badge numeral | 8.25 | 600 | on-accent |
| Section title | 12.75 | 600 | ink |
| Section eyebrow | 7.88 | 400 | muted |
| Challenge headline | 22.5 | 600 | ink + accent |
| Challenge body | 9.38 | 400 | body |
| Cause card label | 6.75 | 600 | accent, uppercase, mono, 0.06em |
| Cause card title | 9.38 | 600 | ink |
| Cause card body | 7.5 | 400 | body |
| Stakes / standing | 7.5 to 7.88 | 600 label, 400 body | accent + muted |
| Solution lead | 9.75 | 600 | ink |
| Solution sub | 8.63 | 400 | body |
| Point title | 8.25 | 600 | ink |
| Point body | 7.13 | 400 | body |
| Flow line | 7.13 | 400 | muted, accent on last step |
| Diff title | 10.5 | 600 | ink |
| Diff lead | 8.63 | 600 | ink |
| Diff body | 8.25 | 400 | body |
| Founder panel title | 12 | 600 | ink |
| Founder name | 18 | 600 | ink |
| Founder role | 9.75 | 600 | accent |
| Credential title | 10.13 | 600 | ink |
| Credential body | 8.63 | 400 | body |
| Asks headline | 14.25 | 600 | ink + accent |
| Ask title | 9 | 600 | ink |
| Ask body | 7.13 | 400 | body |
| Logo strip label | 5.63 | 600 | muted, uppercase, mono, 0.08em |
| Disclaimer | 5.63 | 400 italic | muted |
| Footer | 8.25 | 400 | accent + muted |

Line-height is 1.18 for display sizes above 14, and 1.35 for everything else.

## Colour roles

Two reference palettes, both real.

**Vyapti (cool, navy):** canvas `#FAF7F2`, surface `#FFFFFF`, tinted surface `#F2F6FB`, ink `#111214`, body `#3A3A3F`, muted `#6E6E76`, accent `#123C6B`, hairline `#E6E2DA`.

**Barrier Intelligence (warm, bronze):** ink `#0A0A0A`, body `#3A3A3F`, muted `#6F6F76`, accent `#8A6637`, accent soft `#A6824C`, on-badge `#1A1208`, warning `#C47C48`, danger `#C76B62`.

The warning and danger tones exist for the credited / at risk / lost legend under the solution flow line. Only introduce them when the product genuinely has a three-state output; otherwise they read as decoration.

The canvas is never pure white and the ink is never pure black. That one choice is most of what makes these pages look considered.

## Image slots and specs

| Slot | Aspect | Minimum pixels | Treatment |
|---|---|---|---|
| Founder portrait | 3:4 portrait | 600 x 800 | 124 x 152 frame, radius 8, cover, no border |
| Founder field photo | 16:9 | 1200 x 675 | 52 tall band, radius 8, cover, white caption set over bottom-left |
| Product screenshot | 16:10 or 3:2 | 900 x 570 | 268 x 92 frame, hairline, radius 8, caption + provenance note beneath |
| Logo chips | any | 200 px on the long edge | white chip, hairline, radius 6, contain, 8 padding |
| Wordmark | any | SVG preferred | 24 tall, or set as type |

Every raster asset is inlined as a data URI by the build script, so the HTML stays a single portable file. Downscale anything over about 1600 px on the long edge before building; a 5760 px hero turns a 200 KB page into a 4 MB one for no visible gain.

## JSON schema

See `assets/type-1.example.json` for the filled-in version. Shape:

```jsonc
{
  "type": 1,
  "meta": {
    "wordmark": { "lead": "VYAPTI", "rest": "RESONANCE" },   // or "logo": "assets/logo.svg"
    "docLabel": "One Page Brief",
    "url": "www.vyaptiresonance.com",
    "location": "Hyderabad, India",
    "tagline": "Measure every cryptographic path. With evidence, not assumption."
  },
  "challenge": {
    "title": "The challenge", "eyebrow": "Every encrypted system, every day",
    "headline": "Quantum risk starts before the break. Most security stacks cannot see ",
    "headlineAccent": "the migration window.",
    "body": "Long-life data can be captured now, ...",
    "bodyEmphasis": "It is how the system behaves while you move.",
    "cards": [ { "label": "01 CAPTURED NOW", "title": "Stored today. Exposed later.",
                 "body": "Long-life encrypted data can be retained now ...", "source": "CSB 2024" } ],
    "stakesLabel": "The stakes:", "stakes": "data can outlive today's cryptography · ..."
  },
  "solution": {
    "title": "The solution", "eyebrow": "The observation layer for post-quantum migration",
    "lead": "Software beside your cryptographic stack, without decrypting the payload.",
    "sub": "QSP compares classical and post-quantum paths ...",
    "subEmphasis": "Controlled sandbox. Defined interfaces. No production data.",
    "points": [ { "title": "Exposure, per workload", "body": "Classical and PQC paths measured side by side." } ],
    "flow": ["Provision two sandboxes", "Connect QSP through defined interfaces", "Run controlled anomaly playbooks"],
    "flowAccent": "Compare · explain · report",
    "figure": { "src": "assets/product.jpg", "caption": "Assure3D: red is where the frozen study over-claims.",
                "note": "Our platform, August 2026 build. Modelled, anonymised module." }
  },
  "differentiation": {
    "title": "Differentiation", "eyebrow": "Why this works, and why now",
    "points": [ { "title": "Behaviour, not checklist", "lead": "We measure what the session does.",
                  "body": "Inventory is the evidence underneath it, not the conclusion." } ],
    "standingLabel": "Standing:", "standing": "QSP platform defined · controlled sandbox protocol · ..."
  },
  "founder": {
    "title": "Founder Profile",
    "name": "Vijay Krishna Somaraju", "role": "Founder & CEO",
    "photo": "assets/founder.jpg",
    "banner": { "src": "assets/field.jpg", "caption": "Chopper travel to offshore" },
    "credentials": [ { "title": "QSP creator", "body": "Runtime cryptographic observability" } ]
  },
  "asks": {
    "title": "The asks", "eyebrow": "Where an introduction changes the outcome",
    "headline": "Two doors in Qatar. ", "headlineAccent": "Each ends in independent evidence.",
    "items": [ { "title": "A quantum environment for a scoped validation",
                 "body": "One controlled QKD/PQC environment. QSP beside it. ...",
                 "logosLabel": "TARGET VALIDATION ENVIRONMENT",
                 "logos": [ { "src": "assets/logo-hbku.png", "name": "HBKU" } ] } ],
    "strips": [ { "label": "ACADEMIC NETWORK", "logos": [ { "src": "...", "name": "..." } ] } ],
    "note": "Target organisations shown for introduction context; no partnership implied."
  },
  "partners": [ { "name": "The Utopia Studio", "role": "Cobuild partner", "logo": "assets/utopia.svg" } ]
}
```

Anything optional that is absent is simply not rendered: no figure, no banner, no logo strips, no partners. The layout closes up around the gap rather than leaving a hole.
