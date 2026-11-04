---
name: doc-companion
description: >-
  Pairs a document, deck, memo, spreadsheet, contract or report with a short companion note so any
  AI tool that reads it (Claude, ChatGPT, Gemini, Copilot, a fellow's own agent) knows what the
  document is, why it exists, what to assume and what not to, and the answers to the questions
  people actually ask. Use when the user wants to make a document AI-ready or agent-native before
  sharing it, add a context note, FAQ or sidecar to a file, write an llms.txt-style note for a
  document, or prepare a pack for fellows, investors or QDB. Not for code repos (agents-md-writer)
  or skills (skill-creator).
type: generator
supersedes: none
---

## What it does

Takes one document and returns its companion: a short, structured note that travels with the file and tells any AI assistant what the document is, who it is for, what decision it supports, which facts are settled and which are not, and the answers to the questions the owner gets asked every week. The companion is written for a cold reader with no studio context. The test is simple: paste the document and the companion into any AI tool, ask the ten questions a stranger would ask, and get the owner's answers back instead of confident guesses.

The output comes in three shapes from one source, so the context reaches the file wherever it goes: a sidecar file (`<document-name>.companion.md`) for folders, drives and repos; an embedded block (a "Note for AI assistants" page or appendix) for PDFs, decks and documents that travel alone; and a paste-ready header paragraph for the email, Slack or WhatsApp message that carries the attachment.

## The reframe

A document shared without context is not neutral. The moment a reader drops it into an AI tool, the tool fills every gap with the most common pattern from its training data: a draft reads as final, a Qatar-first pilot reads as a global launch, a placeholder number reads as a forecast, an internal shorthand reads as an industry term. Those guesses arrive fluently and confidently, and the reader cannot tell them from the document's own claims. The companion exists to take that guessing away. It is not a summary (the AI can summarise) and not a second copy of the document (that doubles the tokens and halves the trust). It is the context the document assumes you already have, the questions it does not answer, and the lines an assistant must not cross, written once by the person who knows.

Two things make it work. First, it is built from the cold read: before writing a line, the skill lists what an AI would wrongly assume about this document with no help, and the companion is judged by whether it kills every one of those assumptions. Second, it is cheap to keep true: short enough to update in the same change as the document, with a `last_verified` date and an owner, so a stale companion is visible rather than silently wrong.

## When to use / When NOT

Use when a document is about to leave the author's hands and will plausibly be read by an AI tool before it is read by a person: investor updates, QDB reports, fellow packs, pilot proposals, handover packs, pricing sheets, policies, research memos, decks sent ahead of a meeting. Trigger phrases: "make this AI-ready", "agent-native version", "add context so an AI doesn't misread it", "companion file", "sidecar", "llms.txt for this doc", "context note", "FAQ for this document", "prep this pack for the fellows".

Do not use when:

| Request | Belongs to |
|---|---|
| "Write a CLAUDE.md or AGENTS.md so coding agents understand our repo." | `agents-md-writer`. Code repositories need commands, stack and conventions, not a document companion. |
| "Turn this playbook into a skill Claude can run." | `skill-creator`. A companion explains a document; a skill tells an agent how to do a job. |
| "Summarise this report for me." | No skill needed. The companion is written by the owner for strangers, not a summary for the owner. |
| "Write the document itself." | The relevant authoring skill (`prd-development`, `pitch-deck`, `investor-memorandum`). Run this skill after the document exists. |
| "Set up a knowledge base or vault for all our docs." | `obsidian-company-map` or `proofeditor-docs`. This skill works one document at a time. |

Also: the companion never contains anything the owner would not put in the document itself. If the document is confidential, the companion inherits that label and says so in its first lines.

## Method

Fill in `template.md`. Six steps. Steps 1 and 2 gather; step 3 is the gate; steps 4 to 6 write and verify.

### Step 1 · Read the document as a stranger

Read the whole document before asking anything. Record, in `template.md` §A: the document type, its visible structure (sections, slides, tabs), every number that looks like a claim, every name, term or acronym a stranger would not know, and every place where status is ambiguous (draft or final, proposal or agreed, estimate or actual). Do not ask the owner anything the document already answers.

### Step 2 · Ask the owner only what the document cannot tell you

Ask at most eight questions, in one message, and only the ones the document leaves open. The standing set:

| # | Question | Why it matters to an AI reader |
|---|---|---|
| 1 | What decision or action should a reader take after this? | Sets the purpose line. A deck "for context" and a deck "to approve a budget" are read differently. |
| 2 | Who is it for, and who should not rely on it? | Audience and the out-of-scope reader. |
| 3 | What is its status and version, and what supersedes it? | Draft, review, final, superseded. The single most common wrong assumption. |
| 4 | Which numbers are facts, which are assumptions, which are hypotheses? | Tagging. Without it every figure reads as a fact. |
| 5 | What context does it assume the reader already has? | The studio, the fellow, the programme, the prior document, the market. |
| 6 | What are you asked about it every week? | The frequently asked questions, from real questions, not invented ones. |
| 7 | What must an assistant not do with it? | Not quote prices externally, not treat the roadmap as a commitment, not infer a valuation. |
| 8 | What is deliberately missing or still open? | Known gaps, so the AI says "not covered" instead of inventing. |

If the owner is unavailable, draft from the document alone, tag every owner-only field `[Assumption]`, and list them under "To confirm with owner" at the top of the companion. Never fill them silently.

### Step 3 · Run the cold-read test (the gate)

Before writing the companion, write five to ten sentences of what an AI tool would state about this document with no context at all: its purpose, status, audience, the meaning of its numbers, the meaning of its terms. Do this honestly, as the generic model would, not as the owner would. Then mark each statement wrong, partly wrong or right.

| Cold-read outcome | What it means |
|---|---|
| Three or more wrong or partly wrong | The companion is needed. Each wrong statement becomes a line the companion must correct, under "Read this first" or "Do not". |
| Fewer than three wrong | The document already carries its context. Write the short form only (purpose, status, owner, three questions) and say so. Do not pad. |
| The wrong statements are about the document's content, not its context | The document itself is unclear. Flag that to the owner before writing a companion that papers over it. |

Keep the cold-read list; it goes into `template.md` §C and drives the self-test in step 6.

### Step 4 · Write the companion

Fill `template.md` §Part B. Ten sections, in this order, because an AI reads top-down and context must land before content:

| # | Section | Rule |
|---|---|---|
| 1 | Frontmatter | Machine-readable: document name, title, type, owner (name, role, contact), audience, status, version, date, `last_verified`, confidentiality, language. Every field filled or marked `unknown`. |
| 2 | Purpose | One paragraph. What this is, why it exists, what decision or action it supports. First sentence names the document type and status. |
| 3 | Read this first | The context the document assumes: the organisation, the programme, the prior document, the market, the geography (Qatar-first, global later, or both). Three to six lines. |
| 4 | Key facts, tagged | The claims an AI will be asked about, each tagged `[Fact]`, `[Assumption]` or `[Hypothesis]`, with the source (section or slide) and the date. Numbers always carry a tag. |
| 5 | How to read it | A structure map: section or slide range, what it does, what can be skipped. Marks placeholders, templates and appendices as such. |
| 6 | Frequently asked questions | Five to ten questions people actually ask, with the owner's answer and where in the document it lives. Include at least one question the document does not answer, with "not covered; ask [owner]". |
| 7 | Do not | Explicit negative rules, imperative voice: "Do not quote the pricing in section 4 to anyone outside the studio." "Do not treat the Q2 dates as commitments; they are a plan." "Do not infer a valuation from the raise amount." |
| 8 | Definitions | Every name, product, programme and term a stranger would not know, written out in plain words. No acronym appears without its expansion. |
| 9 | Related documents and sources | What supersedes, what this supersedes, what to read alongside, with links. |
| 10 | Change log | Date, what changed, by whom. One line per change. |

Length bar: the companion is one page or less for a normal document, under 700 words. A companion longer than a tenth of its document is doing the document's job. Cut the summary, keep the corrections.

### Step 5 · Produce the three shapes

From the same source, write all three unless the owner asks for one:

| Shape | File or place | Use |
|---|---|---|
| Sidecar | `<document-name>.companion.md`, same folder, same basename | Drives, repos, shared folders, Utopia OS library. The canonical copy. |
| Embedded block | A final page or appendix titled "Note for AI assistants", or the first page for decks | The document travels alone (PDF attachment, printed deck). Carries sections 2, 3, 4, 7 and 8 only. |
| Header paragraph | Three to five sentences, plain prose, pasted above the attachment in the email or message | The moment of sharing. Purpose, status, who to ask, one "do not". |

The sidecar is canonical. The other two are generated from it, not written separately, so they never drift.

### Step 6 · Self-test with a cold model

Take the cold-read list from step 3. Turn the wrong statements into questions ("What is the status of this document?", "Are the figures on slide 7 forecasts?"). Give a fresh session the document plus the companion and ask them. Record the answers in `template.md` §D. The companion passes when every answer matches the owner's, and fails when any answer still carries the original wrong assumption. Fix and re-run. Do not ship a companion that has not been read by a model that did not write it.

**Kill line.** The output is auto-failed if the companion restates the document instead of contextualising it, if any number appears without a `[Fact]`, `[Assumption]` or `[Hypothesis]` tag, if any acronym appears unexpanded, if the status or owner field is missing, or if the cold-read self-test was skipped.

## Evidence standard

Every claim in the companion is tagged. The companion is the one place a stranger's AI will look for the difference between what is known and what is hoped, so the tags are the product.

| Signal | Tag |
|---|---|
| Measured, signed, paid, shipped, dated, with a source the owner can point to | `[Fact]` |
| The owner's working belief, used in the document as if true, not yet verified | `[Assumption]` |
| A bet the document is making, to be tested | `[Hypothesis]` |
| Not known, not covered | Say so. "Not covered; ask [owner]." |

Owner-only fields drafted without the owner are `[Assumption]` until confirmed. A companion with no `[Assumption]` lines on a draft document is suspicious: drafts have assumptions, and a companion that hides them is lying for the document.

## Gotchas

Writing the summary instead of the context. The first draft always drifts into restating the document because that is what comes naturally. The companion's job is the opposite: what the document does not say but assumes. Every line should be something the AI could not have got from the document alone. If it could, cut it.

Inventing frequently asked questions. Questions written from the author's chair are the questions the document already answers. The real ones come from the owner's inbox: "Is this approved?", "Can I share this with the fellow?", "Is the price final?". Ask for the last five questions they were actually asked.

Status drift. The companion says "final" and the document gets revised; now the companion is actively harmful. Every companion carries `last_verified`, an owner and a change log, and the owner's rule is: edit the companion in the same change as the document. A sidecar with the same basename makes the pair visible in any folder listing.

Over-length. A companion that runs to three pages is a second document. Hard cap: one page, 700 words. The embedded block is shorter still. If the owner wants more, that is a glossary or an appendix to the document itself, not the companion.

Hiding the geography. Studio documents are usually Qatar-first with global intent. A cold model will pick one. Say which, in "Read this first", every time.

Acronyms. Studio shorthand (QDB, GTM, PRD, OS, MRV) reads as noise or as a different thing to a model without the key. Write every one out in Definitions, and prefer the plain words in the companion body.

## Examples

`examples/sample.md` is the full companion for a fellow pilot proposal: the cold-read test (six wrong assumptions, including "this is a signed contract" and "the pricing is public"), the sidecar with all ten sections, the embedded block, the header paragraph, and the self-test transcript showing all six corrected.

## Related skills

`agents-md-writer` (Product) is the equivalent for code repositories: commands, stack and conventions for coding agents. If the document is a repo, go there. If the repo has a design document or a decision record that non-coding agents will read, both apply: that skill for the repo, this one for the document.

`skill-creator` (Anthropic) turns a method into a skill. A companion explains one artefact; it does not instruct an agent to do a job.

`investor-memorandum`, `pitch-deck`, `prd-development`, `pilot-six-term-sheet` produce the documents this skill pairs. Run this skill as the last step before any of their outputs is sent.

`obsidian-company-map` and `proofeditor-docs` organise many documents. This skill works on one. A library of companions is what makes those tools answer questions instead of guessing.

Supersedes: none. Adapted ideas, not text, from the llms.txt proposal (Answer.AI, 2024: lean, link-led, root-level note with an optional section), the AGENTS.md convention (imperative rules, explicit negatives, keep it short, maintain it as code) and the Readme_AI paper (arXiv 2509.19322: typed references and the evidence that a model with no context confidently misdescribes the resource).
