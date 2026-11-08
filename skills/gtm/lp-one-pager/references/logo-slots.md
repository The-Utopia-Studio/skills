# Logo slots

One strip, just above the footer, in both orientations. It carries between three and six marks and it exists because a row of recognisable logos does argument work that a paragraph cannot: it borrows credibility the reader already holds.

Used badly it does the opposite, so the rules matter more than the component.

## Which set to use

Pick **one** set. A strip mixing customers with target counterparties says nothing, because the reader cannot tell which is which.

| Set | Label | Use when | Weight |
|---|---|---|---|
| **Customers** | `CUSTOMERS` or `IN PRODUCTION WITH` | Anyone is paying, or running a paid pilot | Highest. Always beats every other set |
| **Partners** | `PARTNERS` or `INTEGRATION PARTNERS` | A signed commercial or technical relationship exists | High, and only with a signature behind it |
| **Standards and frameworks** | `OUTPUT MAPS TO` | The product's output has to satisfy a named standard | Good at pre-revenue, where it is often the only honest set |
| **Target counterparties** | `TARGET COUNTERPARTY UNIVERSE` | Conversations are live but nothing is signed | Lowest, and needs the disclaimer below |
| **Co-investors** | `ALONGSIDE` | Syndicating, and the other names are confirmed | Situational. Strong for an LP, irrelevant to an IC |
| **Acquirer universe** | `LIKELY ACQUIRERS` | Pre-exit, paired with the exit view card | Only with a comparable transaction to cite |

At seed with no customers, **standards and frameworks** is usually the right call. It is verifiable, it says something real about where the product has to land, and it does not overstate a relationship.

## The rules

**1. Never imply a relationship that does not exist.** A logo on a page reads as an endorsement. When the set is targets rather than signed relationships, the label says so and the note says so:

> `TARGET COUNTERPARTY UNIVERSE`
> *Shown for introduction context. No partnership implied.*

That disclaimer is the convention the source one pagers use, and it is not optional.

**2. Text chips are a legitimate first pass.** The component falls back to a mono uppercase label in the same chip when no image is supplied, so the strip can be laid out, reviewed and approved before anyone chases an SVG. Ship the text version rather than leaving the slot empty or filling it with the wrong set.

**3. Do not restyle third-party marks.** White chip, contained, original colours. No recolouring to the brand palette, no knocking out to mono, no cropping to fit. That is both a trademark matter and, on a page about neutrality, a credibility one.

**4. Three to six.** Two looks thin. Seven stops being a strip and starts being a grid, and nobody reads the seventh.

**5. Order by recognition, not by size of relationship.** The reader scans left to right and stops early, so the mark most likely to be recognised goes first.

**6. Drop the strip rather than pad it.** Two real customers beat two customers and three aspirations.

## Sourcing marks

- Prefer SVG. Failing that, PNG at 200px on the long edge or better, with transparency.
- Take them from the organisation's own press or brand page, never a screenshot and never a search-result thumbnail.
- Keep them in `work/assets/` and reference them by path; the builder inlines them.
- Check each one on the chip background at final size. Dark marks on a white chip usually work; marks designed for dark backgrounds often disappear and need their reversed variant.

## Schema

```jsonc
"logos": {
  "label": "TARGET COUNTERPARTY UNIVERSE",
  "state": "ILLUSTRATIVE",          // optional chip beside the label
  "items": [
    { "name": "National oil company" },              // text chip
    { "name": "IOC partner", "src": "assets/x.svg" } // real mark
  ],
  "note": "Shown for introduction context. No partnership implied."
}
```

Items render as an even row, so a mix of image and text chips still aligns. Set `state` when the whole strip is aspirational; drop it entirely when the marks are customers.

## Where it sits

Directly above the footer strip, full content width, in both orientations. That position is deliberate: it is the last thing read, it closes the page on evidence rather than on an ask, and it costs roughly 80px, which is cheap for what it buys.

If the page is overflowing, the logo strip is the **second** thing to cut, after card notes. The exception is a customers strip, which is the last thing to cut on the whole page.
