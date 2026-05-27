# Workflow V1 — Syndication Deck from Granola Notes

Khalil's primary workflow. Used for ~70% of deck requests.

## Pre-conditions

- [ ] Karan has shared Granola meeting notes (or a transcript export, founder one-pager, or Notion doc)
- [ ] Audience confirmed as **co-investors / syndication**
- [ ] Output: PPTX, 8-12 slides, Utopia-branded

If audience isn't confirmed, **stop and ask** before doing anything else.

## Step 1 — Read everything (10 min)

**Actions:**
1. Read the founder notes fully — don't skim
2. Read any DD report Ada produced (for risk framing and "why we're investing")
3. Read Karan's strategy doc on this deal if it exists
4. Note vocabulary the founder uses — pull strong phrases verbatim later

**Outputs to capture mentally:**
- The one-line thesis (your slide 1)
- 2-3 specific data points (your slide 6 — traction)
- The moat (your slide 5 — defensibility)
- 2-3 risks Utopia is comfortable with (your slide 8)

## Step 2 — Identify the thesis (5 min)

**Tool:** `business-narrative-builder`

The thesis is the one sentence that explains why this is investable. Examples:

- *"Azraq turns physics-grade risk modeling into pricing data for data-centre infrastructure — a moat that compounds with every customer."*
- *"[Portco] is the only company doing [X] with [unique angle] at [growth rate]."*

This becomes slide 1's headline. Without it, don't proceed.

## Step 3 — Skeleton the deck (10 min)

Use the standard syndication structure (see AGENTS.md → Output structure):

```
1. One-line thesis
2. Why now?
3. Team
4. Product
5. Moat / defensibility
6. Traction
7. Market / TAM
8. Risks (Utopia's lens)
9. The ask
10. (Optional) Appendix
```

Write each slide's **headline first** — make it a complete idea, not a label.

**Headline test:** Read just the slide titles in sequence. Do they tell the story? If yes, you have a deck. If no, edit until they do.

## Step 4 — Composite the slides (45 min)

**Tool:** `pitch-deck`

For each slide:
1. Write the headline (complete sentence, not a label)
2. Write the one-line takeaway (the thing they should remember)
3. Add the supporting visual (data point, photo, diagram — one per slide)
4. Apply Utopia brand defaults (fonts, colors, layout)

**Constraints per slide:**
- One idea
- Max 3 bullets (prefer 0-2)
- Whitespace > density
- No company-overview, no generic mission statements

## Step 5 — Cut (10 min)

Default to cutting. If a slide doesn't earn its place:
- Cut it
- Merge it with a neighboring slide
- Or move it to the appendix

A 10-slide deck almost always beats a 15-slide deck for syndication.

## Step 6 — Quality check (10 min)

**Tool:** `ib-check-deck`

Run it. Check:
- Numbers consistent across slides (no slide says $500K MRR while another says $400K)
- Headlines are complete ideas, not labels
- No buzzwords (revolutionizing, disrupting, next-generation)
- No Inter font, no purple gradients
- The ask is specific (check size, role, timeline)

## Step 7 — Self-evaluation (5 min)

Log the deck to MEMORY.md:
- Time-to-deliver
- Audience
- Notable choices (e.g., "expanded moat slide to two pages")
- Pre-Karan review confidence (1-5)

After Karan reviews, log:
- Karan's edit volume (low / medium / high)
- Outcome (did the deck achieve its purpose?)

## Total time budget

~90 minutes for a clean 10-slide syndication deck from good notes.

If it takes >3 hours: something is wrong (notes too thin, audience unclear, brand kit unavailable).

## Failure modes

| Failure | Response |
|---------|----------|
| Notes too thin (< 200 words, no data) | Halt. Ask Karan for more context or specific data points. |
| Conflicting facts in sources | Halt. Surface the conflict to Karan to resolve. |
| Audience unclear after asking | Halt. Get explicit confirmation. |
| Karan's preferred fonts not available | Use the closest serif/sans-serif pair and flag in delivery note. |
| Sensitive content (terms, valuation) | Draft but don't ship — Karan reviews first. |
