# doc-companion · working template

Fill Part A and the cold-read test first. Part B is the companion itself and becomes `<document-name>.companion.md`. Part C and D are the gate and the proof; keep them with the skill run, not in the shipped companion.

---

## Part A · Stranger's read (step 1)

| Field | Value |
|---|---|
| Document file name | |
| Document type | deck · memo · report · spreadsheet · contract · proposal · policy · one-pager · other |
| Visible structure | sections / slides / tabs, with ranges |
| Numbers that read as claims | list each, with location |
| Names, terms, acronyms a stranger would not know | list |
| Places where status is ambiguous | draft vs final, proposal vs agreed, estimate vs actual |

## Owner answers (step 2) · at most eight questions, only the ones the document leaves open

| # | Question | Answer | Tag if drafted without owner |
|---|---|---|---|
| 1 | Decision or action the reader should take | | |
| 2 | Audience, and who should not rely on it | | |
| 3 | Status, version, what supersedes it | | |
| 4 | Which numbers are fact / assumption / hypothesis | | |
| 5 | Context the document assumes | | |
| 6 | Questions asked about it every week (last five, verbatim) | | |
| 7 | What an assistant must not do with it | | |
| 8 | Deliberately missing or still open | | |

---

## Part C · Cold-read test (step 3, the gate)

What a generic AI would state about this document with no context. Write it as the model would, then mark each line.

| # | Cold-read statement | Wrong / Partly / Right | Companion line that corrects it (section) |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |

Decision: ≥3 wrong → full companion · <3 wrong → short form (purpose, status, owner, three questions) · wrong about content not context → flag the document to the owner first.

---

## Part B · The companion (step 4) · ships as `<document-name>.companion.md`

```markdown
---
companion_version: 1
document: <file name>
document_title: <title>
document_type: <type>
owner: <name, role, contact>
audience: <who it is for>
not_for: <who should not rely on it>
status: draft | review | final | superseded
version: <document version>
date: <document date>
last_verified: <YYYY-MM-DD>
confidentiality: public | internal | confidential
language: en | ar | en+ar
geography: qatar-first | global | both
---

# <Title> · Companion

> One paragraph. What this document is, why it exists, what decision or action it supports. First sentence names the type and the status.

## Read this first
- The context this document assumes you already have (organisation, programme, prior document, market).
- Geography: Qatar-first, global, or both, and what that changes.
- Three to six lines. No summary of the document.

## Key facts, tagged
| Claim | Tag | Source (section / slide) | As of |
|---|---|---|---|
| | [Fact] / [Assumption] / [Hypothesis] | | |

## How to read it
| Section / slides | What it does | Read or skip |
|---|---|---|
| | | |

## Frequently asked questions
**Q.** <real question>
**A.** <owner's answer>. Where: <section>.

**Q.** <a question the document does not answer>
**A.** Not covered. Ask <owner>.

## Do not
- Do not <explicit negative rule, imperative>.
- Do not <...>.

## Definitions
- **<Term>**: plain-words meaning. Every acronym written out.

## Related documents and sources
- Supersedes: <doc or none>
- Superseded by: <doc or none>
- Read alongside: <doc, link>

## Change log
- <YYYY-MM-DD>: <what changed>, <who>.
```

### Embedded block (sections 2, 3, 4, 7, 8 only)

Title: "Note for AI assistants". Place as the final page or appendix; first page for decks. Under 250 words.

### Header paragraph (three to five sentences, plain prose)

Purpose, status, who to ask, one "do not". Pasted above the attachment in the email or message.

---

## Part D · Self-test (step 6)

Fresh session, document plus companion, the cold-read statements turned into questions.

| # | Question (from Part C) | Owner's answer | Model's answer with companion | Pass / Fail |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

Ships only when every row passes.

---

## Kill line

Auto-fail if the companion restates the document, any number lacks a tag, any acronym is unexpanded, status or owner is missing, or Part D was skipped.
