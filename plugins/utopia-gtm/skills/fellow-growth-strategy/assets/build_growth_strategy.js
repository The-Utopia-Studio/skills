/**
 * Utopia Studio -- Growth Strategy document generator.
 *
 * This is a STARTER SCRIPT, not a finished document. It implements the studio's
 * real brand system (Special Black / Brick Red / TWK Lausanne, cover, header,
 * footer, heading, and table helpers) so you never have to rebuild that part.
 *
 * What to do with it:
 *   1. Fill in CONFIG below with the real fellow name and date.
 *   2. Replace every placeholder paragraph/table in the CONTENT section near the
 *      bottom with real, researched content for this fellow (see the skill's
 *      SKILL.md for the research-first workflow and the fixed 1.1-1.6 structure).
 *   3. Keep the helper functions (h1/h2/h3/p/table/cover) exactly as they are --
 *      they ARE the brand system. Only touch them if the brand tokens themselves
 *      have genuinely changed (re-check references/brand-tokens.md or the live
 *      @utopia-studio-design/design-system package first).
 *   4. node build_growth_strategy.js
 *   5. Render to PDF/images and QA before delivering (see SKILL.md).
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, ShadingType, AlignmentType, Header, Footer, PageNumber, BorderStyle,
  convertInchesToTwip, VerticalAlign, TableLayoutType, HeightRule,
} = require("docx");

// ---------------------------------------------------------------------------
// CONFIG -- fill this in per fellow
// ---------------------------------------------------------------------------
const CONFIG = {
  fellowName: "[FELLOW NAME]",        // e.g. "Pocket Health"
  docTitle: "Growth Strategy",         // rarely needs to change
  docVersion: "V1",                    // bump on later revisions
  date: "[MONTH YEAR]",                // e.g. "August 2026"
  preparedFor: "The Studio, Utopia Capital",
  outputPath: "./Growth_Strategy_v1.docx",
};

// ---------------------------------------------------------------------------
// BRAND TOKENS -- from @utopia-studio-design/design-system (utopia-default theme)
// Re-verify against references/brand-tokens.md or the live package before reuse;
// these can drift as the design system evolves.
// ---------------------------------------------------------------------------
const BLACK = "3C3235";        // Special Black -- the studio's near-black, never pure #000
const BRICK = "CC5536";        // Brick Red -- brand primitive, accent only (5-15%)
const BRICK_ACTION = "B8472C"; // accessible action tone of brick red, for small colored text
const GREY_LIGHT = "EEEEEE";   // Light Grey
const WHITE = "FFFFFF";
const GREY_20 = "E3E1E2";      // black-20, hairline border tint
const GREY_50 = "A6A0A2";      // black-50, muted text

const F_BOLD = "TWK Lausanne";       // resolves to the 700 weight
const F_MED = "TWK Lausanne 500";    // medium weight, for tracked labels/eyebrows
const F_BODY = "TWK Lausanne 350";   // body weight

const NO_BORDERS = {
  top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
};

// ---------------------------------------------------------------------------
// STYLE HELPERS -- implement the brand system. Leave these alone.
// ---------------------------------------------------------------------------
function tracked(text, opts = {}) {
  return new TextRun({
    text, font: opts.font || F_MED, color: opts.color || BLACK, size: opts.size || 16,
    bold: !!opts.bold, characterSpacing: opts.tracking ?? 20, allCaps: opts.caps !== false,
  });
}

// H1: numbered, brick-red numeral + black uppercase title, full-width brick-red rule underneath.
function h1(number, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 420, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: BRICK, space: 6 } },
    children: [
      new TextRun({ text: number + "  ", font: F_BOLD, color: BRICK, size: 30, bold: true }),
      new TextRun({ text, font: F_BOLD, color: BLACK, size: 30, bold: true, allCaps: true, characterSpacing: 10 }),
    ],
  });
}
// H2: numbered subsection heading, no rule (keeps rules from becoming repeated decoration).
function h2(number, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 130 },
    children: [
      new TextRun({ text: number + "  ", font: F_BOLD, color: BRICK, size: 23, bold: true }),
      new TextRun({ text, font: F_BOLD, color: BLACK, size: 23, bold: true, allCaps: true, characterSpacing: 8 }),
    ],
  });
}
// H3: small tracked eyebrow label, brick-action color -- for sub-groupings like named-account tables.
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 220, after: 100 },
    children: [new TextRun({ text, font: F_MED, color: BRICK_ACTION, size: 19, bold: false, allCaps: true, characterSpacing: 14 })],
  });
}
// p: body paragraph.
function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 170, line: 288 },
    children: [new TextRun({ text, italics: opts.italics, color: opts.color || BLACK, size: 21, font: F_BODY })],
  });
}
function cell(text, opts = {}) {
  return new TableCell({
    width: { size: opts.width || 2000, type: WidthType.DXA },
    verticalAlign: VerticalAlign.TOP,
    shading: opts.header
      ? { type: ShadingType.CLEAR, fill: BLACK }
      : (opts.alt ? { type: ShadingType.CLEAR, fill: GREY_LIGHT } : { type: ShadingType.CLEAR, fill: WHITE }),
    margins: { top: 90, bottom: 90, left: 130, right: 130 },
    children: [new Paragraph({
      children: [new TextRun({
        text,
        bold: !!opts.header,
        allCaps: !!opts.header,
        color: opts.header ? WHITE : BLACK,
        size: opts.header ? 17 : 19,
        font: opts.header ? F_MED : F_BODY,
        characterSpacing: opts.header ? 10 : 0,
      })],
    })],
  });
}
// table: headers (string[]), rows (string[][]), widths (number[] in DXA, must sum sensibly).
function table(headers, rows, widths) {
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    columnWidths: widths,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: GREY_20 },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: GREY_20 },
      left: { style: BorderStyle.SINGLE, size: 2, color: GREY_20 },
      right: { style: BorderStyle.SINGLE, size: 2, color: GREY_20 },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: GREY_20 },
      insideVertical: { style: BorderStyle.SINGLE, size: 2, color: GREY_20 },
    },
    rows: [
      new TableRow({ children: headers.map((t, i) => cell(t, { header: true, width: widths[i] })) }),
      ...rows.map((r, ri) => new TableRow({ children: r.map((c, i) => cell(c, { width: widths[i], alt: ri % 2 === 1 })) })),
    ],
  });
}

// ---------------------------------------------------------------------------
// COVER PAGE -- full-bleed Special Black panel, built as a page-sized table cell.
// Uses CONFIG above; you shouldn't need to touch this beyond CONFIG.
// ---------------------------------------------------------------------------
const coverInner = [
  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 1000 },
    children: [new TextRun({ text: "///", font: F_BOLD, color: BRICK, size: 28, bold: true })] }),
  new Paragraph({ spacing: { before: 1400, after: 40 },
    children: [new TextRun({ text: CONFIG.fellowName, font: F_BOLD, color: WHITE, size: 60, bold: true, allCaps: true, characterSpacing: 10 })] }),
  new Paragraph({ spacing: { before: 120, after: 220 },
    children: [
      new TextRun({ text: CONFIG.docTitle.toUpperCase(), font: F_MED, color: BRICK, size: 30, allCaps: true, characterSpacing: 30 }),
      new TextRun({ text: "  " + CONFIG.docVersion, font: F_BOLD, color: WHITE, size: 30, bold: true, allCaps: true, characterSpacing: 30 }),
    ] }),
  new Table({
    width: { size: 900, type: WidthType.DXA },
    borders: NO_BORDERS,
    rows: [new TableRow({ children: [new TableCell({
      width: { size: 900, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: BRICK },
      margins: { top: 30, bottom: 0, left: 0, right: 0 },
      children: [new Paragraph({ children: [] })],
    })] })],
  }),
  new Paragraph({ spacing: { before: 1600 }, children: [] }),
  new Paragraph({ spacing: { after: 60 },
    children: [new TextRun({ text: CONFIG.date, font: F_BODY, color: GREY_LIGHT, size: 21 })] }),
  new Paragraph({ spacing: { after: 60 },
    children: [new TextRun({ text: "Prepared for " + CONFIG.preparedFor, font: F_BODY, italics: true, color: GREY_LIGHT, size: 21 })] }),
  new Paragraph({ spacing: { after: 600 },
    children: [new TextRun({ text: "STRICTLY CONFIDENTIAL", font: F_MED, color: BRICK, bold: true, size: 19, allCaps: true, characterSpacing: 16 })] }),
  new Paragraph({ children: [new TextRun({ text: "THE", font: F_MED, color: WHITE, size: 15, allCaps: true, characterSpacing: 20 })] }),
  new Paragraph({ children: [new TextRun({ text: "UTOPIA", font: F_BOLD, color: WHITE, bold: true, size: 15, allCaps: true, characterSpacing: 20 })] }),
  new Paragraph({ children: [new TextRun({ text: "STUDIO", font: F_MED, color: WHITE, size: 15, allCaps: true, characterSpacing: 20 })] }),
];

const coverTable = new Table({
  width: { size: 11907, type: WidthType.DXA },
  layout: TableLayoutType.FIXED,
  borders: NO_BORDERS,
  rows: [new TableRow({
    height: { value: 16840, rule: HeightRule.EXACT },
    children: [new TableCell({
      width: { size: 11907, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: BLACK },
      margins: { top: 1000, bottom: 1000, left: 1000, right: 1000 },
      children: coverInner,
    })],
  })],
});

// ---------------------------------------------------------------------------
// HEADER / FOOTER
// ---------------------------------------------------------------------------
const pageHeader = new Header({
  children: [new Paragraph({
    alignment: AlignmentType.RIGHT,
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BRICK, space: 4 } },
    children: [tracked(`${CONFIG.fellowName.toUpperCase()}  -  ${CONFIG.docTitle.toUpperCase()}`, { size: 14, tracking: 16 })],
  })],
});
const pageFooter = new Footer({
  children: [new Paragraph({
    tabStops: [{ type: "right", position: convertInchesToTwip(6.3) }],
    children: [
      tracked("THE UTOPIA STUDIO", { size: 14, color: GREY_50, tracking: 14 }),
      new TextRun({ text: "\tPage ", color: GREY_50, size: 14, font: F_BODY }),
      new TextRun({ children: [PageNumber.CURRENT], color: GREY_50, size: 14, font: F_BODY }),
    ],
  })],
});

// ---------------------------------------------------------------------------
// CONTENT -- replace every placeholder below with real, researched content.
// Structure is fixed (see SKILL.md): 1.1 through 1.6, in this order.
// Do not leave bracketed placeholders in a delivered document.
// ---------------------------------------------------------------------------
const body = [
  h1("1", "Where We Are Going"),

  h2("1.1", "Value Proposition"),
  p("[What the fellow actually does, in plain terms. What does the customer get, and from whom does it take the work of doing this themselves? One concrete analogy is fine if it genuinely clarifies -- don't force one.]"),
  p("[What the first product actually is/does, concretely -- not a mission statement.]"),
  p("[What this is worth to whoever pays for it, and why they can start using it with minimal setup, if that's true.]"),

  h2("1.2", "Target Segments and Why"),
  p("[The segments who carry a cost or problem they can't currently solve themselves, and why the fellow doesn't compete with any of them for their core job.]"),

  h3("Top 5 target customers in Qatar"), // rename the market if Qatar/Gulf isn't the relevant regional lens for this fellow
  p("[What's structurally different about this market versus the fellow's primary market -- regulatory regime, data availability, licensing bodies -- researched, not assumed.]"),
  table(
    ["Account", "Segment", "Why"],
    [
      ["[Real company name]", "[Insurer / Employer / TPA / etc.]", "[Specific, checkable reason this account belongs on the list.]"],
      ["[Real company name]", "[Segment]", "[Why]"],
      ["[Real company name]", "[Segment]", "[Why]"],
      ["[Real company name]", "[Segment]", "[Why]"],
      ["[Real company name]", "[Segment]", "[Why]"],
    ],
    [2600, 1400, 5400]
  ),

  h3("Top 5 target customers globally"),
  table(
    ["Account", "Segment", "Why"],
    [
      ["[Real company name]", "[Segment]", "[Why]"],
      ["[Real company name]", "[Segment]", "[Why]"],
      ["[Real company name]", "[Segment]", "[Why]"],
      ["[Real company name]", "[Segment]", "[Why]"],
      ["[Real company name]", "[Segment]", "[Why]"],
    ],
    [2600, 1400, 5400]
  ),

  h2("1.3", "Business Model"),
  p("[Who pays, for what value, through what mechanism today -- and what it becomes longer-term if that's a real, planned evolution rather than aspiration.]"),
  table(
    ["Participant", "Value Created", "Revenue Model"],
    [
      ["[Segment]", "[What they get]", "[How the fellow gets paid]"],
      ["[Segment]", "[What they get]", "[How the fellow gets paid]"],
      ["[Segment]", "[What they get]", "[How the fellow gets paid]"],
    ],
    [2800, 3900, 2700]
  ),

  h2("1.4", "Collaboration Options with a Customer"),
  p("[How a customer can start small and go deeper -- lightest commitment first.]"),
  table(
    ["Tier", "What It Is", "What It Requires", "Example"],
    [
      ["0. [Tier name]", "[Description]", "[What it requires from the customer]", "[Real example if one exists]"],
      ["1. [Tier name]", "[Description]", "[What it requires]", "[Example]"],
      ["2. [Tier name]", "[Description]", "[What it requires]", "[Example]"],
      ["3. [Tier name]", "[Description]", "[What it requires]", "[Example]"],
    ],
    [1700, 3300, 2600, 1800]
  ),

  h2("1.5", "Growth Flywheel"),
  p("[The core usage-data loop: what gets better with use, and why that attracts the next round of customers.]"),
  p("[A second flywheel if one genuinely exists for this fellow -- e.g. cross-border distribution through a partner already operating in multiple markets. Delete this paragraph if there isn't a real second loop; don't invent one.]"),

  h2("1.6", "GTM Plan: Next 6 Months"),
  p("[One line on which motion comes first and why -- solutions-led vs platform-led -- and any market that stays solutions-led-only for a structural reason.]"),
  table(
    ["Timing", "Motion", "Action", "Output"],
    [
      ["Months 0-1", "Solutions-led", "[Action]", "[Output]"],
      ["Months 1-3", "Solutions-led", "[Action]", "[Output]"],
      ["Months 2-4", "Solutions-led", "[Action]", "[Output]"],
      ["Months 3-5", "Solutions-led", "[Action]", "[Output]"],
      ["Months 4-6", "Platform-led (seed)", "[Action]", "[Output]"],
      ["Month 6", "Decision gate", "[Real, named contingencies]", "[Output]"],
    ],
    [1200, 1600, 5000, 1600]
  ),

  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { before: 400 },
    children: [new TextRun({ text: "///", font: F_BOLD, color: BRICK, size: 22, bold: true })] }),
];

// ---------------------------------------------------------------------------
// ASSEMBLE + WRITE
// ---------------------------------------------------------------------------
const doc = new Document({
  styles: { default: { document: { run: { font: F_BODY, size: 21, color: BLACK } } } },
  sections: [
    {
      // Cover section: zero margins, no header/footer, full-bleed panel.
      properties: {
        page: { size: { width: 11907, height: 16840 }, margin: { top: 0, bottom: 0, left: 0, right: 0 } },
      },
      children: [coverTable],
    },
    {
      properties: {
        page: {
          size: { width: 11907, height: 16840 }, // A4
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: { default: pageHeader },
      footers: { default: pageFooter },
      children: body,
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(CONFIG.outputPath, buf);
  console.log("Wrote " + CONFIG.outputPath);
});
