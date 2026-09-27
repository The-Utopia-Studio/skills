---
name: investor-reading-room
description: Use when a founder is raising and needs the whole set of investor documents rather than one file — "build my data room", "investor reading room", "what documents do investors need", "set up our diligence pack", "share our materials with investors", or when they have a deck but nothing behind it. Also use to audit an existing room for gaps, contradictions, and documents that should not be in there. This is the entry point; it decides the document set, the build order, and hands off to investor-deal-sheet, investor-memorandum, investor-faq, investor-fact-ledger and investor-doc-system.
---

# Investor Reading Room

## What this is

A reading room is the set of documents an investor moves through between "interesting" and "term sheet". It is not a folder of everything you have. It is a sequenced argument, where each document answers the question the previous one raised, and no two documents contradict each other.

Most founders have a deck and nothing else. The deck gets them a meeting. What loses the deal is the three weeks after the meeting, when the partner has to sell the deal internally and has nothing to forward.

This skill builds the room. It does not write the deck — use `pitch-deck` (PPTX) or `pitch-deck-web` for that.

## The six documents, and what each is actually for

Build in this order. Each one is cheap once the one above it exists.

| # | Document | Length | The job it does | Who reads it |
|---|----------|--------|-----------------|--------------|
| 1 | **Deal sheet** | 1 page | Terms, use of funds, traction in one screen. The thing that gets forwarded. | Partner, scanning in 90 seconds |
| 2 | **Investment memorandum** | 8–20 pages | The full argument, written so a partner can present it internally without rewriting it | Deal team, IC |
| 3 | **Investor FAQ** | 4–10 pages | Every objection, answered in your words before it is asked behind your back | Sceptic on the deal team |
| 4 | **Business plan** | 15–40 pages | The operating plan. Banks, DFIs and grant committees require it; VCs rarely read it | Institutional / debt / grant |
| 5 | **Team page** | 1–2 pages | Why these specific people, with the scar tissue that matters | Everyone, early |
| 6 | **Data room index** | 1 page + annexes | The evidence. Contracts, model, reports, cap table | Diligence, post-term-sheet |

Two documents are optional and situational. Add a **valuation justification** when you are pricing a round rather than taking a market price, or when the number will be argued about. Add a **market / thesis note** when the investor has to believe something about the world before they can believe anything about you.

### Which to skip

- Pre-seed, friends-and-angels, sub-$500k: deal sheet + FAQ + deck. A memorandum is over-engineering and reads as such.
- Seed to Series A: 1, 2, 3, 5, 6. This is the standard room.
- Debt, DFI, blended finance, government: add 4. They will not proceed without it and its absence is read as inexperience.
- Revenue over ~$5M: the model and the cohort data start doing the work; the memo gets shorter, the data room gets bigger.

## Build order (and why it is this order)

```
  1. fact ledger        → every number in one JSON file, before any prose exists
  2. deal sheet         → forces you to state the offer in one page
  3. memorandum         → expands the deal sheet into the argument
  4. FAQ                → written by attacking the memorandum
  5. team + data room   → assembled, mostly not written
  6. render + gate      → PDFs, hub page, access control
```

Start with the fact ledger (`investor-fact-ledger`). It feels like procrastination and it is the single highest-leverage step: the failure mode of a reading room is not weak prose, it is a figure that says $8M on the deck and $8.5M in the memo. An investor who finds one contradiction re-reads everything else as unreliable.

Write the deal sheet second, even though it looks like a summary of documents that don't exist yet. If you cannot fit the offer on one page, you do not yet know what you are selling, and the memorandum will sprawl.

Write the FAQ by attacking your own memorandum (see `investor-faq`). Anything you cannot answer in the FAQ is a real problem in the business, not a writing problem — take it back to the plan.

## The hub page

The room needs a single front door: one page listing the documents, each with a one-line description of what it contains and roughly how long it takes to read. Do not make an investor guess which of nine PDFs to open.

Order the hub by reading order, not alphabetically. Put the deal sheet first. Mark anything that is a live document ("updated monthly") with a date.

**Gating.** Gate the room, but cheaply. A single shared password behind a link is right for almost everyone: it signals that the material is not public without adding friction that costs you meetings. Do not build per-investor logins for a seed round. Do not put the room behind a form that emails you for approval — you will lose the investor who reads at 11pm on a Sunday.

Track opens if you can (a one-line script logging document and timestamp is enough). Which document an investor opened third tells you what they are actually worried about, and it is the best call-prep signal in fundraising.

**Never put in the room:** anything with a customer's confidential pricing, employee compensation by name, unredacted contracts before a term sheet, the cap table before a term sheet, or an internal costing sheet. The last one is the most common accident — internal cost files get built alongside customer-facing pricing and then swept into the same folder. Name them so the mistake is visible (`INTERNAL-costing-DO-NOT-SHARE.md`), keep them outside the published directory, and check the publish step copies an explicit list of files rather than a whole folder.

## What good looks like

A reading room is done when all five hold:

1. **No contradictions.** The fact checker passes. Every number appears in the same form on every surface that carries it.
2. **Every document is forwardable alone.** Each one restates the one-line thesis and the round terms in its first screen. Documents get separated from each other immediately.
3. **The hardest question is answered in writing.** If the biggest risk in the business is not addressed in the FAQ, the room reads as marketing.
4. **Claims are sourced.** Every third-party figure has an inline source. Every internal figure traces to the model, named by file and version.
5. **It is current.** A room with a number that changed last month is worse than a smaller room. Put the date on the hub and hold yourself to it.

## Gotchas

- **The deck and the memo drift first.** The deck gets edited for a meeting; the memo does not. Run the fact check before every send, not just at build time.
- **Length signals stage.** A 40-page memorandum at pre-seed reads as inexperience, not rigour. A 4-page memorandum at Series A reads as thin. Match the document to the cheque.
- **Do not write the memo as a deck in prose.** Slide bullets expanded into paragraphs is the most common failure and it is obvious to any reader. The memo is an argument with connective tissue; the deck is a set of claims.
- **One voice.** If three people write three documents, the room reads as three companies. Have one person do the final pass over all of them, out loud.
- **Retire numbers explicitly.** When a figure changes, record the old value in the ledger's `retired` list with the reason. Otherwise it creeps back in from an old draft six weeks later. This is the check that catches the most real errors.
- **Don't gate the deck.** The deck is the top of the funnel and wants to travel. Gate the room, leave the deck open.

## Worked example — a $6M seed for a climate hardware company

Founder arrives with a deck and a spreadsheet. Room shipped in four working days:

- **Day 1** — fact ledger: 34 facts (round size, pre-money, contracted revenue, unit cost, gross margin by year, capacity, three market figures with sources). Two contradictions found immediately: the deck said 42% gross margin, the model said 38.5%. The model was right; the deck had never been updated after a supplier quote changed.
- **Day 2** — deal sheet (one page, eight blocks), then the memorandum spine: thesis, problem, solution, market, business model, traction, risk, financials, return, team.
- **Day 3** — FAQ: 28 questions in six groups. Five of them had no good answer. Three were writing problems; two were real (no signed offtake for the second line, and a single-supplier dependency) and went to the risk section of the memo as named, mitigated risks rather than being hidden.
- **Day 4** — team page, data room index (contracts redacted, model as a read-only link, third-party engineering report), hub page behind one password, PDFs rendered, fact check green.

Result: the partner forwarded the deal sheet and the memo to their IC unedited. The two real risks came up in IC exactly as written — which is the point. You want the objection raised in your language.
