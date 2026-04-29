# Technical DD — Formatting Guide

This document specifies the .docx formatting standards for Technical DD reports. Read the docx skill (`/mnt/skills/public/docx/SKILL.md`) for implementation details.

---

## Document Setup

- **Page size**: A4 (The Studio operates from London/MENA/Europe)
- **Margins**: 1 inch all sides (1440 DXA)
- **Default font**: Arial, 12pt
- **Line spacing**: 1.15

## Branding

Read `assets/utopia-branding.md` for default colors and branding. The user can override with custom brand assets.

## Page Structure

### Cover Page (Section 1)
- Studio logo centered, sized at ~1.5 inches
- Report title: "TECHNICAL DUE DILIGENCE" — Arial 28pt bold, brand dark color
- Company name: Arial 22pt, brand dark color
- Company one-liner: Arial 14pt italic, dark gray
- Assessment type: Arial 12pt, e.g. "Pre-Series A Technical Assessment"
- Prepared for: "The Studio — Utopia Capital"
- Date: month and year
- Classification: "Strictly Confidential" — bold, red (#C0392B)
- Page break after cover

### Headers (all pages except cover)
- Right-aligned: "CONFIDENTIAL | [Company Name] Technical DD | [Month Year]"
- Arial 8pt, gray (#666666)
- Bottom border: thin line in brand accent color

### Footers (all pages except cover)
- Left: "The Studio — Utopia Capital"
- Right: "Page [X]"
- Arial 8pt, gray (#666666)

## Section Formatting

### Section Headings
- **H1** (major sections): Arial 20pt bold, brand dark color, page break before
- **H2** (subsections): Arial 16pt bold, brand dark color
- **H3** (sub-subsections): Arial 13pt bold, dark gray

### Body Text
- Arial 12pt, black, 1.15 line spacing
- Paragraph spacing: 6pt after

## Tables

All tables follow these conventions:

### Standard Data Table
- Full page width (content width)
- Header row: brand accent color background, white text, bold
- Alternating row shading: light gray (#F5F5F5) on even rows, white on odd
- Cell padding: top/bottom 80 DXA, left/right 120 DXA
- Borders: light gray (#CCCCCC), single, 1pt
- Use DXA width type (never percentage)

### Evidence Rating Table
Same as standard table, but the Evidence Status column uses color-coded text:
- SUPPORTED: dark green (#27AE60) bold
- PARTIAL: amber (#F39C12) bold
- CLAIMED: orange (#E67E22) bold
- UNSUPPORTED: red (#C0392B) bold

### Risk Register Table
Same as standard table, but the Severity column uses background colors:
- CRITICAL: light red background (#FADBD8)
- HIGH: light orange background (#FDEBD0)
- MEDIUM: light yellow background (#FEF9E7)
- LOW: light green background (#D5F5E3)

### Key Metrics Table (Technical Summary)
- Two-column table: Metric | Value | Assessment
- Compact format, no alternating shading
- Assessment column uses same color coding as evidence ratings

## Callout Boxes

Used for critical findings, assessment boxes, and important notes.

### Critical Finding Callout
- Left border: 4pt, red (#C0392B)
- Background: very light red (#FDF2F2)
- Padding: generous (200 DXA all sides)
- Title in bold, all caps
- Body text in regular weight

### Technical Assessment Box (Technical Summary section)
- Left border: 4pt, brand accent color
- Background: very light brand color
- Contains: assessment rating, one-line rationale, key terms

### Information Callout
- Left border: 4pt, blue (#2980B9)
- Background: very light blue (#EBF5FB)
- Used for notes, context, and phase 2 recommendations

## Lists

- Use proper Word numbering (LevelFormat.BULLET / LevelFormat.DECIMAL)
- Never use unicode bullet characters
- Indent: 720 DXA, hanging 360 DXA
- Spacing between items: 4pt after

## Evidence Quality Indicators

When inline in text (not in tables), use:
- [SUPPORTED] — bold, dark green
- [PARTIAL] — bold, amber
- [CLAIMED] — bold, orange
- [UNSUPPORTED] — bold, red

## Table of Contents

Include a Table of Contents on the page after the cover page, before the Technical Summary. Use heading levels for proper TOC generation.

---

## Document Assembly Order

1. Cover Page
2. Table of Contents
3. Technical Summary
4. Company Overview
5. Technical Architecture Assessment
6. AI/ML Capabilities Assessment
7. Code Quality & Engineering Practices
8. Security & Compliance
9. Scalability Assessment
10. Technical Debt & Maintenance
11. Technical Team Assessment
12. Technical Moat & IP
13. Roadmap Feasibility
14. Technical Risk Register
15. Evidence Quality Audit
16. What Must Be True
17. Dispositive Technical Questions
18. End of Report marker with Studio branding
