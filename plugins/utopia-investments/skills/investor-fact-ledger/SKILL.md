---
name: investor-fact-ledger
description: Use whenever investor-facing numbers appear in more than one place — a deck plus a memo, a data room, a website with traction figures, a one-pager. Trigger on "keep my numbers consistent", "our deck and memo disagree", "we changed the valuation, what else needs updating", "check the data room for stale figures", before any investor send, or as the first step of investor-reading-room. Ships a fact-checker script that fails CI when a surface drifts or a retired number survives anywhere.
---

# Investor Fact Ledger

## What this does

Puts every investor-facing number in one JSON file, then verifies mechanically that each surface carries the figures it should and that no superseded figure survives anywhere.

The problem it solves is not sloppiness. It is that a raise takes months, numbers change, and documents are edited one at a time. The deck gets updated for Tuesday's meeting. The memo does not. Six weeks later an investor is holding both.

The cost of one contradiction is not proportional. A partner who finds a figure that disagrees with itself stops reading for content and starts auditing — and every number they now check is a number you have to defend rather than assert.

## The ledger

`facts.json` at the root of your document directory:

```json
{
  "updated": "2026-09-27",
  "sources": {
    "model": "Projections_2026.09.15v4.xlsx",
    "valuation": "Valuation_Note_v3.1.pdf"
  },
  "surfaces": {
    "deal-sheet": "docs/deal-sheet.html",
    "memo": "docs/memorandum.html",
    "faq": "docs/faq.html",
    "deck": "src/deck.astro"
  },
  "published": {
    "docs/deal-sheet.html": "public/room/deal-sheet/index.html"
  },
  "scanGlobs": ["public/*.html", "public/*/index.html", "docs/*.html"],
  "facts": [
    { "id": "raise",     "value": ["$6M", "$6.0M"], "on": ["deal-sheet", "memo", "deck"], "note": "Round size" },
    { "id": "pre-money", "value": "$24M",           "on": ["deal-sheet", "memo", "faq"],  "note": "Pre-money" },
    { "id": "arr",       "value": "$1.4M",          "on": ["deal-sheet", "memo", "deck"], "note": "Contracted ARR, source: model" }
  ],
  "retired": [
    { "value": "$20M", "now": "$24M", "why": "Repriced after the Aug supplier quote", "unless": "previously valued at" }
  ]
}
```

Four fields carry the judgment:

- **`value` as a list.** The same fact legitimately appears in different written forms — `$6M` on a slide, `$6.0M` in a memo table, `6,000,000` in a term sheet. List every acceptable form. Do not create three facts.
- **`on`.** Which surfaces *must* carry this fact. This catches the opposite error from drift: a memo that never states the round size at all.
- **`retired`.** Every number you have ever published and replaced. This is the check that finds the most real bugs, because stale figures come back from old drafts and copy-paste, not from deliberate edits.
- **`unless`.** An escape hatch for a retired value that legitimately survives inside an explicit negation — "previously valued at $20M". Set it to the phrase that *precedes* the value; the checker excuses occurrences that follow it within 40 characters (tune with `window`) and still flags every bare occurrence elsewhere.

## Running it

```bash
node scripts/fact-check.mjs            # report drift
node scripts/fact-check.mjs --check    # same, exit 1 (wire into CI and the build)
```

Wire `--check` into the build, not a pre-commit hook. You want it to fail the thing that publishes, and you want to be able to commit a half-finished edit.

## The discipline

When a number changes, in this order:

1. Change it in `facts.json`.
2. Move the old value into `retired` with a `why` and a `now`. Skipping this is the whole failure mode.
3. Run the checker. It now tells you every file still carrying the old value.
4. Fix those files. Re-run until green.

Never edit a document first. The ledger is the source of truth or it is decoration.

## What good looks like

- Between 20 and 60 facts for a seed round. Under 15 means you are only tracking headline terms and the drift will be in the second-order figures, which is where it always is. Over 100 means you are tracking prose, not facts.
- Every internal figure's `note` names the model file and version it came from. Every third-party figure's `note` names the source and its date.
- `retired` is longer than you expect by month three. A ledger with an empty `retired` list after a full raise has not been used.
- The checker runs in under two seconds, so nobody skips it.

## Gotchas

- **Rounding is the commonest false negative.** The model says 38.47%, the deck says 38.5%, the memo says "about 38%". All three are fine; they are three `value` forms of one fact. Add them all, or the checker trains people to ignore it.
- **Currency and thousands separators.** `$1.4M`, `$1,400,000`, `USD 1.4m` are different strings. List the forms you actually use.
- **A retired value that is a substring.** Retiring `$2M` will match `$28M` and `$2M` alike. Retire the longest unambiguous form, or include the surrounding characters.
- **`unless` is not a blanket exemption.** It excuses the value only where it follows that phrase. If you find yourself wanting a blanket exemption, the value is not really retired — reword the document instead.
- **Dates drift silently and are not in the ledger by default.** "As of Q3 2026" in six documents will be wrong in January. Add the as-of phrasing as a fact.
- **Do not put the ledger in the published directory.** It contains your retired numbers and your source-file names. Keep it in source, publish the rendered documents.
- **The checker proves consistency, not truth.** Six documents can agree on a wrong number. Consistency is mechanical; accuracy still requires tracing to the model.

## Worked example

A seed-stage company changed its pre-money from $20M to $24M. The ledger edit took a minute; the checker then found the old figure in five places nobody would have looked: the FAQ's return-maths answer, a valuation note's summary table, two published copies under `public/` that had not been re-synced, and the alt text of a chart image. Four of the five were outside the documents that had been "updated".
