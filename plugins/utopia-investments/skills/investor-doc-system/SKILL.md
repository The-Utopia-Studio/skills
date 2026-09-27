---
name: investor-doc-system
description: Use when an investor-facing document has to exist as both a web page and a clean A4 PDF — "make this a PDF", "our memo looks bad when printed", "investor docs that match our brand", "build the document template", page breaks landing mid-table, or as the rendering layer for investor-reading-room, investor-deal-sheet, investor-memorandum and investor-faq. Ships a print-first CSS template and a headless-Chrome render script. Use instead of docx or pptx when the document must be both linkable and printable from one source.
---

# Investor Document System

## Why HTML, not Word

One source, two outputs: a link you can send and a PDF that prints properly. Word gives you a file that must be re-exported by hand every time a number changes, and that renders differently on the reader's machine than on yours. A deal sheet that a partner opens on a phone in a taxi needs to be a URL.

Use `docx` instead only when the recipient will edit the document — a term sheet redline, a document going to counsel. Use `pptx`/`pitch-deck` for the deck. Everything else in a reading room is HTML.

## The page model

The whole system is one idea: **a document is a stack of fixed-size pages, not a flowing web page.** Each section sits in a `.page` div sized to A4. You lay out inside a page; you never let content decide where the break falls.

```html
<div class="page">
  <header class="page-head"><span class="mark">COMPANY</span><span>Investment memorandum</span></header>
  <h2 class="section-title">The business in brief</h2>
  <p class="lead">One sentence that states the claim of this page.</p>
  <!-- body -->
  <footer class="page-foot"><span>Confidential</span><span>3</span></footer>
</div>
```

`@page { size: A4 portrait; margin: 0 }` plus `page-break-after: always` on `.page` means what you see on screen is exactly what prints. This is the difference between a document that looks designed and one that looks like a web page someone printed.

Files:

- `assets/doc.css` — the template. Brand tokens are the first 12 lines; change those, change nothing else.
- `assets/document-template.html` — a three-page skeleton: cover, content page, closing page.
- `scripts/render-pdf.sh` — headless Chrome to PDF, for a list of documents.

Copy all three into your document directory. Do not edit the CSS beyond the tokens on the first pass — the print rules at the bottom are load-bearing and easy to break by accident.

## Rendering

```bash
./render-pdf.sh deal-sheet memorandum faq team      # names without .html
```

It finds Chrome or Chromium, renders each `<name>.html` to `<name>.pdf` with backgrounds on and no browser header, and waits for web fonts via `--virtual-time-budget`. If Chrome is missing it tells you the manual settings: **A4 portrait, margins None, background graphics ON**. Those three settings are what people get wrong when printing by hand; the first two produce white gutters and the third drops every dark band and rule.

Fonts: use `@font-face` with local files, or accept that a webfont CDN means the render script needs the virtual time budget to let fonts land. A PDF rendered before the font loads silently falls back and looks wrong in a way you will not notice on screen.

## Craft rules that matter for this document type

**Typography.** One display face, one mono or one text face, nothing else. Body at 15–16px on screen (which prints at a comfortable 11pt on A4), line height 1.55–1.65, measure capped around 70–75 characters. A memo set at 13px with a full-width measure is technically readable and reads as cheap.

**The first screen of every page states the claim.** Each page gets a section title and a one-sentence lead that asserts something. An investor skimming at speed reads only those two lines per page; make them a coherent argument on their own.

**Numbers get their own component.** A "stat row" — three or four figures with a label under each — is the single most useful element in investor documents. Right-align figures in tables, use tabular figures (`font-variant-numeric: tabular-nums`), and never let a currency column wrap.

**Tables must not break.** `break-inside: avoid` on every table, figure, callout and stat block. A table split across a page boundary is the most common defect in founder-made PDFs and it reads as carelessness.

**Print-safe colour.** Keep body text near-black on white for the pages that carry argument; save full-bleed dark for the cover and section dividers. A 20-page document in reverse type is unreadable on paper and prints as a toner brick. Alternate: dark cover, light content pages, dark closing page.

**Redaction is a content edit, not a visual one.** Never publish a PDF with a black rectangle over a number — the text is still in the file and any reader can select it. Delete the value in the HTML and render again.

## What good looks like

- Every page break is one you chose. Open the PDF and check every boundary; no orphaned heading, no table split, no single line stranded at the top of a page.
- Screen and PDF are visually identical. If they differ, the print rules are being overridden.
- A page renders legibly at 60% zoom — that is how a partner reads it on a laptop next to their email.
- File size under about 3MB for a 20-page document. If it is 14MB, an uncompressed cover image is the cause; convert to WebP or a compressed JPEG at 1600px wide.
- Filenames say what the document is and whose it is: `Company-Investment-Memorandum.pdf`, not `memo-final-v3.pdf`. It will be saved into a folder with 40 other companies' documents.

## Gotchas

- **`margin: 0` on `@page` plus your own padding inside `.page`.** Setting a Chrome print margin *and* internal padding double-pads the page and pushes content off the bottom.
- **`min-height` not `height` on `.page`.** With a fixed height, content that overflows is silently clipped in the PDF. With `min-height` it pushes to a new page and you see the problem.
- **Backgrounds off by default.** Chrome's own print dialog drops backgrounds unless the box is ticked; the render script passes the flag. This is why hand-printed PDFs lose every dark band.
- **`position: fixed` headers repeat unpredictably.** Put the running head inside each `.page` as normal flow content instead.
- **A cover image with text baked into it.** It will not be searchable, will not survive a re-brand, and looks soft on a retina screen. Set the title in HTML over the image.
- **Rendering before the fact check.** Render last. A PDF is a frozen copy; every stale figure in it is now in someone's downloads folder forever.
- **One CSS file across documents.** Two near-identical stylesheets diverge within a week. One `doc.css`, plus a small per-document override file if a document genuinely needs one.
