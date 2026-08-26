---
name: company-moc
description: Build a Map of Content (MOC) for a company in an Obsidian vault — an ideas-first knowledge graph built from primary sources (decks, transcripts, standards, reports), with a hub note and linked child notes. Use when asked to "build a MOC", "map this company", "create a knowledge graph on X", or to update an existing company MOC after a new call or document drop.
---

# Company MOC

Turn a pile of primary sources about a company into a navigable set of ideas.

The output is **not a summary**. A summary compresses documents. A MOC reorganises a company into the arguments it rests on, so that six months later you can see which ones held.

---

## The governing principles

Read these before writing anything. Everything below is downstream of them.

**1. Ideas first, company facts last.**
Open with the thesis, not the founding date. Order the map by the logic of the argument — what has to be true for this to be a business — and put the deal facts in one compressed block near the end. If the reader stops after section two, they should still understand why the company exists.

**2. Every claim carries its source and its date.**
"Three months of prep" is worthless. "Three months of prep (17 Jul field consultation)" is evidence. Tag the origin inline. When the same fact appears in two sources with different values, that is a finding, not a nuisance — see principle 4.

**3. One idea per note.**
A child note is 200–600 words about a single idea, mechanism, constraint or entity. If a note needs two `##` headings that could each stand alone, it is two notes. The hub note is the only place ideas are allowed to touch each other.

**4. Contradictions are the most valuable output.**
When the deck and the transcript disagree, do not average them, do not pick the newer one, and do not quietly drop the older one. Put both in a table, state which decisions depend on the answer, and route to an open-questions note. The point of the graph is to make disagreement visible.

**5. Write for the version of you that has forgotten everything.**
No insider shorthand without expansion on first use. Spell out acronyms. Explain the industry mechanic before you explain the company's answer to it.

**6. Ideas only — no operations.**
Meeting schedules, next steps, logistics, admin, org process, personal arrangements: all out. If it will be stale in three weeks and it is not an *idea*, it does not go in the vault. This is the most commonly violated rule when working from a call transcript.

**7. Links must resolve.**
Before writing, list the vault and collect the note names that already exist. Link to real notes. A wikilink to a note nobody ever writes is a broken promise; a wikilink into an existing thesis note is what makes the graph compound.

---

## Structure

```
Vault root/
├── <Company> MOC.md          ← the hub
└── <Company>/
    ├── <Idea One>.md
    ├── <Idea Two>.md
    └── ...
```

Aim for **12–20 child notes** for a company with a rich source set. Fewer than 8 means you have written a summary with extra steps; more than 25 means you are transcribing rather than thinking.

### Naming

- Name notes after the **idea**, not the document. `The Transparency Paradox`, not `Positioning Doc Notes`. `Plantation OS – The ERP Question`, not `Product Section 3`.
- Use hyphens, not colons or slashes, inside filenames.
- The hub is `<Company> MOC.md` at vault root so it surfaces alongside your other MOCs.

### Which notes to create

Not a template to fill — a checklist to interrogate. Most companies need most of these:

| Cluster | Typical notes |
| --- | --- |
| **Thesis** | The core claim. The evidence pillars behind it, graded by strength. |
| **Problem** | The pain, quantified. The forcing function (regulation, cost curve, deadline) that makes it urgent now. |
| **Market mechanics** | How the industry actually works — the value chain, the unit economics, the lifecycle. A reader who knows nothing about the sector should be able to follow the rest after reading these. |
| **Product** | The wedge, specified. The key mechanism or design insight. What it replaces and what it explicitly does not. |
| **Moat** | The defensibility argument. The compounding loop or flywheel. Why a competitor cannot enter at step three. |
| **Go-to-market** | Pricing and what it is priced *against*. Who buys, and the buying committee. Adoption constraints. |
| **Competition** | The landscape as a table. The structural rule (regulatory, incentive, economic) that creates the market at all. |
| **Evidence** | How the team learned this. What discovery *invalidated* — the corrected assumptions are usually the highest-signal note in the set. |
| **The deal** | Company overview and traction. Investment snapshot: bull case, diligence flags, how to underwrite it. |
| **Housekeeping** | Open questions and numbers to reconcile. |

Add whatever the specific company demands. Drop what it does not have.

---

## The hub note

The hub is a piece of writing, not an index. Someone should be able to read it top to bottom and come away with the argument.

```markdown
---
title: <Company> MOC
tags: [MOC, <domain>, company]
aliases: [<Company>, <Company> Map of Content]
cssclasses: [map-of-content]
---

# <Company> — Map of Content

<One paragraph: what this maps, and the stack of ideas in it, named in order.
End with "Start anywhere and follow the wikilinks.">

> [!abstract] How to read this map
> <The layers, bottom to top, in one compressed paragraph. A thesis: X.
> A forcing function: Y. A wedge: Z. And a company: W. Point at the
> deal-facts anchor for readers who only want the numbers.>

> [!info] At a glance
> - **What** — one sentence, no adjectives
> - **Core idea** — the non-obvious claim
> - **Wedge** — how it enters
> - **Market** — size, and how confident you are in it
> - **Stage** — where the company actually is

---

## 1 · <The thesis>
## 2 · <The forcing function>
## 3 · <The wedge>
## 4 · <The mechanism, posture or key insight>
## 5 · <The moat>
## 6 · <How it sells>
```

Each numbered section runs: **a heading that states a claim**, a short paragraph of prose, **one callout** carrying the sharpest version of the point, then a bulleted list of `→ [[wikilinks]]` into child notes and existing vault notes. Nothing else.

Close the hub with:

- **The company, compressed** — a single `> [!abstract]` block: origin, traction, raise, and a **reality check** that says plainly what is not yet proven.
- **Concept map** — a Mermaid `graph TD`. Nodes are ideas, edges are dependencies. Add `class A,B,C internal-link;` on the last line so the key nodes render as links.
- **The whole thing in one breath** — a `> [!tip]` of two or three sentences, densely wikilinked, that reconstructs the entire argument. If you can't write this one, you haven't understood the company yet.
- **Related** — outbound links to existing thesis and sector notes in the vault.

---

## Child note shape

```markdown
---
tags: [<company>, <cluster>]
aliases: [<the other names people call this>]
---

# <Idea name>

## <The claim, as a heading>

<Prose. Lead with what is true, not with what the document said.>

> [!warning] <The sharpest version of the point>
> <Numbers, quote, or the constraint that makes this hard.>

## Why it matters

<The consequence for the business. This is the paragraph that earns the note.>

## Related

- [[<Company> MOC]]
- [[<sibling note>]]
- [[<existing vault note>]]
```

Callouts are the argument's furniture. Use them with intent:

| Callout | Use for |
| --- | --- |
| `[!abstract]` | The compressed version of a section |
| `[!info]` | Facts and figures the reader will come back for |
| `[!quote]` | Verbatim from a source — the thing someone actually said |
| `[!tip]` | The insight, the "why this works" |
| `[!important]` | A structural fact that changes how you read everything else |
| `[!warning]` | A risk, a constraint, or a number that needs verifying |
| `[!danger]` | A contradiction between sources, or a superseded position |
| `[!success]` / `[!failure]` | What it replaces / what it explicitly does not |

Use `==highlight==` sparingly — no more than one or two per note, on the sentence you would underline by hand.

---

## Process

**1. Read everything, properly.**
Convert PDFs to text (`pdftotext -layout`) and read the whole corpus before writing a word. Skimming produces a summary; the MOC needs the detail buried on page 30. Note the date and speaker of every source.

**2. Inventory the vault.**
List existing notes and collect the names you can legitimately link to — thesis notes, sector MOCs, frameworks, prior companies. This shapes what you write: an idea that connects to three existing notes is worth its own child note; one that connects to nothing may belong inside another.

**3. Find the spine.**
Before drafting, write down in one sentence: *what has to be true for this company to work?* Then the two or three things that follow from it. That is the hub's section order. Do not let the source documents' structure become your structure — they are organised for persuasion, you are organising for understanding.

**4. Write child notes first, hub last.**
The hub is a synthesis. You cannot synthesise notes you have not written.

**5. Verify.**
- Every wikilink resolves to a real file (script it — walk the vault, regex `\[\[([^\]|#]+)`, diff against the file list).
- All YAML frontmatter parses.
- Code fences are balanced and Mermaid renders.
- Every number in the MOC appears in a source, or is explicitly flagged as unverified.

---

## Updating after a new call or document

The update is where most knowledge graphs rot. Rules:

**Supersede in place; never silently overwrite.** When a new source contradicts an existing note, keep the old claim visible and mark it:

```markdown
> [!danger] Superseded on <date> — <what changed>
> The <original source> said <X>. The <new source> says <Y>, because <reason>.
> → [[<new note covering it>]]
```

This preserves the thing that matters most: *when did we learn we were wrong, and what did we believe before?*

**Route disagreements to a reconciliation note.** Maintain one `Open Questions and Numbers to Reconcile` note per company, structured as a table per contested figure: source, value, and — critically — **what decision moves if it changes**. A discrepancy with no decision attached is trivia.

**New idea → new note. Refinement → edit in place.** If the new source introduces a mechanism, constraint or strategic fork that did not exist in the graph, write a note. If it sharpens an existing claim, edit the existing note and date-stamp the change.

**Rewire the hub.** New notes are invisible until the hub points at them, and superseded positions in the hub are actively misleading. Always update the hub in the same pass.

**Flag claims that smell wrong.** If a source asserts something that contradicts your own knowledge of the domain — a regulatory relationship, a market structure, a technical claim — say so in the note rather than repeating it. Mark it as needing verification and explain what depends on it.

---

## The quality bar

The MOC is done when:

- [ ] Someone who has never heard of the company can read the hub and explain the business.
- [ ] Every number is sourced or explicitly flagged as unverified.
- [ ] The contradictions between sources are visible, not smoothed.
- [ ] The **reality check** names what is not yet proven, in plain language, without hedging.
- [ ] "The whole thing in one breath" is true and reads well.
- [ ] Every wikilink resolves.
- [ ] Nothing operational, scheduled, or logistical has crept in.
- [ ] You could hand it to the founders and they would learn something about their own company.

That last one is the real test.
