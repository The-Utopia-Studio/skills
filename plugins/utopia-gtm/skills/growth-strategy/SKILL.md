---
name: growth-strategy
description: "Build or update a growth strategy document for a named Utopia Studio fellow (portfolio company) — covering value proposition, target segments with named example customers, business model, collaboration tiers, growth flywheel, and a 6-month GTM plan (e.g. 'give me a growth strategy for [Fellow]', 'build a v1 growth strategy for X', 'update the GTM plan for Y'). Applies Utopia's real brand system (Special Black / Brick Red, TWK Lausanne, stacked wordmark, /// mark) via the docx skill. Do NOT use for partner-facing decks (use utopia-partnership-deck) or investor/board decks — those follow different templates and different research inputs."
license: Proprietary
---

# Growth Strategy

Standardizes how growth strategy documents get built for Utopia Studio fellows, so every one — regardless of who authors it or which fellow it's for — has the same rigor, the same structure, and the studio's real brand instead of a generic template.

This skill was distilled from the first real growth strategy built this way (Pocket Health, August 2026), after an initial pass used a generic corporate template that turned out not to be close to the studio's actual brand. Treat that lesson as load-bearing: don't guess at branding when the real design system is one `npm install` away (see Brand System below).

## When to use

Trigger whenever asked for a "growth strategy," "GTM strategy," "GTM plan," or "growth plan" for a **named fellow**. This produces an internal strategy memo (.docx), not a partner-facing pitch deck (`utopia-partnership-deck` is a different skill for that) and not board/investor material.

## Before building: research first

Never start writing from the structure below until both halves of the research are done. A document full of guessed facts or generic placeholders is worse than asking a clarifying question first.

**Internal.** Check wherever this fellow's materials live (an attached Claude project, uploaded docs, prior conversation) for existing strategy work: executive summaries, MVP/pilot plans, prior decks. Read them. The growth strategy should be consistent with decisions already made, not reinvent them. If nothing exists yet, say so plainly rather than fabricating a backstory.

**External.** Research the fellow's actual market:

- Who the real target customers are in each named market, with a specific, checkable reason each belongs on the list. Never write a placeholder like "a large enterprise" or "a major insurer" — name the company and say why.
- The regulatory/structural specifics of any market that isn't the fellow's home market, especially Qatar/the Gulf (the studio's home base — see `utopia-partnership-deck`'s "Why Doha" convention for why this lens usually belongs in Utopia work). Don't assume a new market mirrors the primary one; for example, a market may lack the public price/quality data infrastructure the primary market has, which changes what's achievable there in year one.
- Named competitors and comparable companies, with what they actually do and where they fall short, if that context sharpens the value proposition.

If a scope question is genuinely unresolved (which fellow, which markets, what the 6-month window starts from) and someone is available to ask, ask via a clarifying question. If the session is unattended, make the most defensible assumption, state it at the top of the output, and proceed.

## Structure (fixed — do not reorder or skip sections)

Every growth strategy is one section, "1. Where We Are Going," with six fixed subsections. Content changes fellow to fellow; the shape does not.

1. **1.1 Value Proposition** — what the fellow actually does, in plain terms. One concrete analogy is fine if it genuinely clarifies (Stripe-for-X is a real, useful pattern for infrastructure/coordination-layer businesses) — but don't force an analogy where none fits, and don't lean on the same one in every later section.
2. **1.2 Target Segments and Why** — the segments who feel this problem and can't currently solve it themselves, and why the fellow doesn't compete with any of them for their core job. Then two named-account tables: **"Top 5 target customers in Qatar"** (or whichever market is the studio-relevant regional lens for this fellow) and **"Top 5 target customers globally."** Every row needs Account / Segment / Why, and the Why must be a specific, real reason, not filler.
3. **1.3 Business Model** — who pays, for what value, through what mechanism. A short Participant / Value Created / Revenue Model table is almost always clearer than prose here.
4. **1.4 Collaboration Options with a Customer** — the tiers a customer can move through, lightest commitment first (e.g., a no-agreement self-serve pilot, then a data/API integration, then packaged intelligence, then a full negotiated enterprise contract). Name a real or plausible example of each tier if one exists.
5. **1.5 Growth Flywheel** — the core usage-data loop (what gets better, and why that attracts the next round of customers), plus a second flywheel if one genuinely exists for this fellow (e.g., cross-border distribution through a partner that already operates in multiple markets).
6. **1.6 GTM Plan: Next 6 Months** — month-by-month or in short ranges, explicit about which motion each step is (solutions-led vs. platform-led), ending in a month-6 decision gate tied to real, named contingencies.

## Writing style

- **No em dashes, anywhere.** Rewrite with a period, comma, or colon instead. This is a hard rule, not a preference — check the draft for the `—` character before delivering.
- Concise, plain, confident sentences. Match the tone of the fellow's own existing materials if any exist; otherwise write in a clear declarative register with no filler ("in today's landscape," "it's not just X, it's Y," "delve into").
- Vary sentence construction across paragraphs. Don't mechanically repeat one analogy or one sentence template in every section — that's the single biggest tell that a document was templated rather than written.
- Every number, company name, or claim in a table must trace back to real research. If you can't verify something, say so or leave it out — don't smooth it over with a plausible-sounding invention.

## Brand system

Full token reference: `references/brand-tokens.md`. In short: Special Black `#3C3235` (the studio's near-black — never pure `#000000`), Brick Red `#CC5536` as a 5-15% accent only (never for small body text — it fails contrast at that size), Light Grey `#EEEEEE`, White. Typeface TWK Lausanne (350 for body, 500 for tracked labels/eyebrows, 700 for bold uppercase display). Square geometry throughout — no rounded corners, no drop shadows, no gradients, no glassmorphism. The stacked "THE / UTOPIA / STUDIO" wordmark, and a single "///" mark used once as punctuation (cover, or a closing mark) — never repeated as decoration on every page.

Brand tokens can drift as the design system evolves, so treat the bundled reference as a fallback, not the source of truth. Before building, try to refresh from the real package:

```
npm install @utopia-studio-design/design-system
npm install -D @utopia-studio-design/design-system-cli
npx utopia-ds init . --theme utopia-default --yes
```

Then read the installed theme directly for live values:
- `node_modules/@utopia-studio-design/design-system/src/themes/utopia-default.css` — CSS custom properties (colors, type scale, spacing, radius = 0).
- `node_modules/@utopia-studio-design/design-system/src/manifests/theme-utopia-default.json` — the same values plus the visual policy (`allow`/`avoid` lists) and visual grammar rationale. Read this even if you already have the CSS — the policy notes are what keep the output from reading like a generic template.
- `node_modules/@utopia-studio-design/design-system/src/themes/fonts/*.ttf` — the real TWK Lausanne files (350/500/700 weights).

Install the fonts locally before rendering any preview, so QA reflects reality instead of a silent Arial substitution:
```
mkdir -p ~/.local/share/fonts
cp node_modules/@utopia-studio-design/design-system/src/themes/fonts/*.ttf ~/.local/share/fonts/
fc-cache -f ~/.local/share/fonts
```

If the package isn't reachable (no registry access, private registry auth needed), fall back to `references/brand-tokens.md` and say so in your response rather than silently using a generic look.

Do **not** try to scrape `utopia-design-system.vercel.app` directly — it's a client-rendered SPA and WebFetch only ever returns page metadata from it, not real content. The npm package above is the actual authoritative source; treat the live site as secondary at best.

## Building the document

1. Copy `assets/build_growth_strategy.js` to a working file. It implements the full brand system (cover, header, footer, heading, table helpers) — keep those helpers as-is and only change the content passed into them.
2. Replace the placeholder fellow name, date, and every section's prose and table rows with real content from research. Delete or add target-customer rows as the research supports — don't force exactly 5 if the real list is shorter, but don't pad with filler to reach 5 either.
3. Run `node build_growth_strategy.js` to produce the `.docx`. If you need anything the script doesn't already handle, follow the docx skill's general conventions rather than inventing a new approach.
4. QA before delivering (render to PDF, then to images, and look at them — see the docx skill for the exact commands):
   - Cover is full-bleed Special Black with no stray visible border.
   - Fonts resolved to TWK Lausanne, not silently substituted (check letterforms against a known Arial render if unsure).
   - No leftover bracketed placeholders anywhere.
   - No em dashes anywhere in the rendered text.
   - Tables aren't overflowing or clipping in any cell.
5. Deliver with `SendUserFile`. Also try to save it into the attached project via `project_write` — if that fails, say so plainly rather than reporting success. This has failed intermittently with an upstream 400 error; don't assume it's fixed without seeing it succeed.

## Known issues

- `project_write` with `local_path` for `.docx` files has intermittently failed with an upstream 400 error in this environment. Always verify it actually succeeded before telling the user the doc is saved to the project.
- `utopia-design-system.vercel.app` cannot be scraped by WebFetch (client-rendered SPA, metadata only). Use the npm package instead.
