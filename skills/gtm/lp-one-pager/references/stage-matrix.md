# Blocks by growth stage

The page holds roughly **three left-column sections, two cards and one metric strip**. Every block you take in costs one you leave out, so the stage decides the slate before taste does.

Ask the stage first. See Step 1 of `SKILL.md`.

## The matrix

**Core** always include · **Add** include when the data exists · **Hold** usually omit · **Avoid** actively misleading at this stage

| Block | Pre-seed | Seed | Series A | Series B / growth | Pre-exit / secondary |
|---|---|---|---|---|---|
| Key company information card | Core | Core | Core | Core | Core |
| Headline and standfirst | Core | Core | Core | Core | Core |
| The position, prose | Core | Core | Core | Add | Add |
| Why we backed it, 3 claims | Core | Core | Core | Core | Add |
| Founder block | **Core** | **Core** | Add | Hold | Hold |
| Metric strip | Hold | Add, 3 tiles | **Core**, 4 tiles | **Core**, 4 tiles | Core |
| Milestone rail | Add, forward-looking | Add | Core | Add | Hold |
| Use of proceeds | **Core** | **Core** | Core | Add | Avoid |
| Traction chart | Avoid | Hold | Add | **Core** | Core |
| Cohort retention or NRR | Avoid | Avoid | Add | **Core** | Core |
| Unit economics, CAC, payback | Avoid | Hold | Add | **Core** | Core |
| Round and cap table rows | Add | Core | Core | Core | **Core** |
| Ownership, multiple, IRR | **Avoid** | **Avoid** | Add | Core | **Core** |
| Exit outlook or comparables | Avoid | Avoid | Hold | Add | **Core** |
| Our involvement | Hold | Add | Core | Core | Core |
| Customer or partner logos | Hold | Add | Core | Core | Add |
| Pipeline, named targets | Add | Core | Add | Hold | Hold |
| Regulatory or licence status | Add if gated | Add if gated | Core if gated | Core if gated | Core if gated |
| Risks and mitigations | Hold | Add | Core | Core | Core |
| Impact metrics | Add | Add | Add | Add | Add |
| Product coverage or roadmap chart | Add | Core | Add | Hold | Avoid |

## The four rules that override the table

**1. Never show a multiple or an IRR on a company that has not had a mark.** Before Series A those numbers are arithmetic on a guess. A reader who spots one discounts every other figure on the page.

**2. An empty block is worse than a missing one.** A Use of Proceeds card at Series B with numbers nobody has agreed is a liability. Drop it and let the layout close up.

**3. Impact metrics are all or nothing.** If the fund reports impact, the block is standing furniture at every stage and its numbers get the same sourcing discipline as the financials. If it does not, leave it off rather than decorating one page with it.

**4. Every figure carries its provenance chip regardless of stage.** `BOUND` when the fund has seen the evidence, `REPORTED` when the company said so, `ILLUSTRATIVE` when it is modelled. At pre-seed most of the page is REPORTED and that is fine; pretending otherwise is not.

## What each stage's page tends to look like

**Pre-seed.** Founder-weighted. The founder block is the asset, the thesis is about why this person and this wedge, the only numbers are a target raise and a use of proceeds. No metric strip.

**Seed.** Product exists, so the page can show what is built. A coverage or roadmap chart earns its place here more than a traction chart does. Three metric tiles, most of them `REPORTED`. Both Dextrum samples in `assets/` are seed-stage, and the coverage donut in option A is exactly this block.

**Series A.** The first stage where operating numbers carry the page. Metric strip goes to four tiles, milestone rail becomes core, the founder block compresses to a line inside the info card.

**Series B or growth.** Cohort, retention and unit economics displace narrative. The thesis compresses to three short claims and the right column carries two data cards.

**Pre-exit or secondary.** Ownership, multiple, IRR and comparables are the page. The position prose shrinks to a paragraph, the founder block goes, and the reader's question is what it is worth and who buys it.

## Choosing between option A and option B at a given stage

Stage sets the blocks; the reader sets the option.

| | Option A | Option B |
|---|---|---|
| Pre-seed, seed | A fund update covering a new holding | The round is open and this page is the ask |
| Series A, B | A quarterly LP page | A follow-on or syndication |
| Pre-exit | An LP report on a marked position | An IC paper on a secondary |

When a round is live and an LP is the reader, build both. They share `lp.json` except for the option field, the labels and the metric strip.
