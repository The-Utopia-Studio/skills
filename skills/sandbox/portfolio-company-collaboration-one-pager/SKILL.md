---
name: portfolio-company-collaboration-one-pager
description: "Build a single-page collaboration one-pager (PDF) in your own company's brand, pitching a partnership to a named target organisation: strategic rationale and their priorities, three collaboration touch points (revenue/cost use cases, your solution and proof, how you'd work together), what each side invests, and next steps. Use whenever someone asks for a 'one-pager', 'partnership one-pager', 'collaboration brief', 'leave-behind', 'pilot proposal on one page', or pastes meeting notes about a prospective customer or partner and wants something short to send them, even if they don't say 'one-pager'. Works from meeting notes plus research on the target. Not for multi-slide decks, investor pitches or long proposals."
license: Proprietary
---

# Portfolio Company Collaboration One-Pager

Turns your notes from conversations with a prospective partner, plus research on that organisation, into one A4 page in **your** brand that their leadership can read in two minutes and say yes to. Every one-pager follows the same spine, so your team's output stays consistent, but the content is written fresh for each partner.

The hard constraint is **one page**. That forces the useful choices: two or three sharp use cases, two or three proof points, short sentences. The build script refuses to make a second page, so plan for brevity from the first draft.

## Step 1: Set up your brand (once)

The page is themed from a `brand.json` file. Set it up the first time, then reuse it for every one-pager.

Look for an existing `brand.json` first (in the conversation, the project files, or attached by the user). If there isn't one, build it:

1. **Ask for the brand kit**: logo (PNG or SVG; ideally a light/white version for a dark header as well as the normal one), brand colours as hex codes, and brand font files (TTF/OTF/WOFF) if they have them.
2. If they don't have a kit to hand, pull what you can from their website (colours from the CSS or a brand page, logo from the site) and **show them the colours you picked before building**. A wrong brand colour on a page they send out is worse than asking.
3. Map the brand onto four colour roles:
   - `dark`: the deep brand colour used for the header band and card tops (navy, charcoal, deep green...). If the brand has none, use a near-black.
   - `accent`: the signature colour for numbers, rules and highlights.
   - `text`: body text, usually near-black.
   - `light`: a pale neutral for shaded panels (optional; derived if omitted).

The script handles readability for you: if the accent is too pale to read as small text on white, it darkens it for text while keeping the original for rules and highlights.

```json
{
  "company_name": "Acme Robotics",
  "short_name": "Acme",
  "tagline": "One line on what you do",
  "logo": "brand/logo.png",
  "logo_on_dark": "brand/logo-white.png",
  "colors": {"dark": "#14213D", "accent": "#FF7A1A", "text": "#1B1F24", "light": "#F1F3F7"},
  "fonts": {"family": "Inter", "files": {"regular": "brand/Inter-Regular.ttf", "medium": "brand/Inter-Medium.ttf", "bold": "brand/Inter-Bold.ttf"}},
  "header_style": "dark",
  "headline_case": "uppercase",
  "corner_radius": 0,
  "backed_by_line": "A Utopia Studio portfolio company"
}
```

Notes on the fields: file paths are relative to `brand.json`. `header_style` is `dark` (default), `accent`, or `light`. `headline_case` is `uppercase` or `none`. `corner_radius` matches the brand's feel (0 for sharp, 4 to 8 for soft). `backed_by_line` is optional; delete it if not wanted. Without font files the page uses the named family if installed, otherwise Arial: fine for a draft, but supply the files for anything going to a partner.

## Step 2: Gather the material

1. **Notes from people.** Whatever the user pastes or attaches: meeting notes, call transcripts, emails, WhatsApp summaries. If they name a meeting without pasting it, check any connected notes, CRM or email tools before asking. What the partner actually said they care about is the most valuable input and outranks anything you infer from the web.
2. **Research the target organisation.** Always do this, even when the notes are rich. Look for their published strategy, annual or sustainability report, news from the last 12 months, leadership interviews, big programmes or tenders, and how they line up with national or sector priorities. Note numbers you can use.
3. **Your own proof.** Your product, live customers and pilots, results with numbers, team credentials. Use only what the user confirms or what is public; ask for numbers rather than estimating your own track record.

If the target organisation is ambiguous (a group vs. a subsidiary, two similar names), ask which one. Otherwise get going.

## Step 3: Write the page (fixed structure)

**Header.** Your logo, "[You] × [Partner]", a one-line subtitle stating the collaboration in plain words, location and date.

**01 Strategic rationale.**
- *Why we are doing this*: two or three sentences on why this partnership, why now, and the shared upside. Start from their world, not yours.
- *Our read of [Partner]'s priorities*: three priorities, each a short bold title plus one line of evidence (a stated target, programme, or something they said). It has to be specific enough that they can say "yes, that's right" or correct you in the room.

**02 Three key collaboration touch points.** Three columns, in this order:
- **A. Use cases: revenue and cost.** Two or three specific use cases, each a short impact story: what happens today, what changes, the result for them. Tie each one to a priority from section 01 and add an impact tag ("Target: 20% fewer outages"). Numbers come from research, the notes, or a public benchmark; label estimates "target" or "indicative" so nobody reads them as promises.
- **B. Our solution and proof.** What you bring that makes the difference *for them*: two or three lines covering the product capability that matters here, live results with numbers, and the credibility point (customers, certifications, team). Concise beats complete.
- **C. How we work together.** What makes this easy to start and safe to scale: pilot approach, integration or data handling, local presence and language, partners and backers (e.g. your venture studio or investors) that add capacity. Pick the two or three that answer this partner's likely objections.

**03 What success looks like.** Two boxes, framed as what each side invests:
- *[You]'s investment*: typically a dedicated team that builds or configures for them, and measuring and reporting results.
- *[Partner]'s investment*: typically a defined pilot (or pilots) on their priorities, and a dedicated point of contact who aligns the relevant team owners. Add data or site access when the pilot needs it.
- Optional one line underneath on what good looks like at the end of the pilot window.

**04 Next steps.** Three steps with a one-line detail and rough timing: a meeting or site visit (office tour, demo, workshop), a pilot scope or MOU, and a joint announcement once there are results. Use any actions actually agreed in the notes instead of the defaults.

**Footer.** Company name and tagline, contact line, optional backed-by line, "Confidential · prepared for [Partner]".

## Writing style

- Plain, confident, short sentences for a senior reader at the partner. No jargon they would need to look up.
- Write from their side of the table: their priorities, their assets, their numbers.
- No long dashes (— or –); use a full stop, comma or colon. The build script warns if it finds any.
- No filler ("in today's rapidly evolving landscape", "unlock synergies", "cutting-edge"). Every line should be something only this one-pager could say.
- Never present a guess as fact. If something important is unknown, leave it out or phrase it as something to confirm.

## Step 4: Build and check

1. Write the content as JSON (`assets/examples/content.example.json` is a complete worked example; `assets/examples/brand.example.json` shows a brand file. The example brand colours are illustrative only, not that company's real brand).
2. Render:
   ```
   python3 scripts/build_one_pager.py brand.json content.json -o "<You>_x_<Partner>_One_Pager.pdf" --png preview.png
   ```
   Needs Python Playwright with Chromium (`pip install playwright && playwright install chromium` if missing).
3. On **OVERFLOW**, the script lists each section's height. Cut words from the tallest section and re-run. Don't shrink fonts or edit the CSS to squeeze it in.
4. Look at the preview before delivering: logo sharp and correctly coloured on the header, nothing clipped, no brackets or placeholder text, the partner's name spelled the same everywhere, the three columns roughly balanced.
5. Deliver the PDF. In the reply, add one or two lines on anything you couldn't verify and any assumption about their priorities worth confirming before it goes out.

### Content schema

```json
{
  "partner": {"name": "Full name", "short_name": "Name used in headings"},
  "doc_label": "Collaboration one-pager",
  "subtitle": "One line",
  "location": "City, Country",
  "date": "Month Year",
  "rationale": {"why": "2-3 sentences", "their_priorities": [{"title": "...", "detail": "..."}]},
  "touchpoints": [
    {"title": "Use cases: revenue and cost", "intro": "One line", "items": [{"title": "...", "text": "...", "tag": "Target: ..."}]},
    {"title": "Our solution and proof", "intro": "One line", "items": [{"title": "...", "label": "optional small grey label", "text": "..."}]},
    {"title": "How we work together", "intro": "One line", "items": [{"title": "...", "text": "..."}]}
  ],
  "success": {
    "ours": [{"commitment": "...", "detail": "..."}],
    "theirs": [{"commitment": "...", "detail": "..."}],
    "outcome": "optional one line"
  },
  "next_steps": [{"step": "...", "detail": "...", "when": "optional"}],
  "contact": {"name": "...", "role": "...", "email": "...", "phone": "optional", "web": "..."}
}
```

### Length budget

To land on one page: `why` ≤ 60 words; each priority ≤ 20 words; each touch-point item ≤ 25 words; each success detail ≤ 20 words; each next-step detail ≤ 14 words.
