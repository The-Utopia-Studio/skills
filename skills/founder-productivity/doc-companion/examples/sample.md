# Worked example · companion for a fellow pilot proposal

Document: `barrier-intelligence-pilot-proposal-v3.pdf`, an 11-page pilot proposal from Barrier Intelligence (a Utopia Studio fellow venture, oil and gas well-barrier safety) to a drilling contractor in Qatar, sent ahead of a meeting. The owner is the fellow, Satheesh. All figures below are illustrative.

---

## Part A · Stranger's read

| Field | Value |
|---|---|
| Document type | Proposal (PDF) |
| Visible structure | 1 cover · 2 problem · 3 to 5 solution and workflow · 6 pilot scope · 7 commercials · 8 data and security · 9 timeline · 10 team · 11 appendix (barrier taxonomy) |
| Numbers that read as claims | "38% of barrier failures are undetected until audit" (p2) · "pilot fee QAR 180,000" (p7) · "12-week pilot" (p9) · "3 rigs" (p6) · "90% detection target" (p6) |
| Terms a stranger would not know | Barrier, barrier envelope, Utopia Studio, fellow, co-build, QDB, WBE (well barrier element), MOC (management of change), Azraq (referenced as a sister venture) |
| Ambiguous status | "Proposal v3" with a signature block on p7; timeline written in present tense; the 90% target reads as a guarantee |

## Owner answers (step 2)

| # | Answer |
|---|---|
| 1 | Reader should agree to a scoping call and nominate three rigs. Not sign anything yet. |
| 2 | The contractor's drilling superintendent and HSE lead. Not for procurement yet; commercials are indicative. |
| 3 | Status: draft for discussion, v3, 28 Oct 2026. Supersedes v2 (sent 14 Oct). Will be superseded by a signed pilot agreement built with `pilot-six-term-sheet`. |
| 4 | 38% is from a 2024 IOGP-style industry report the fellow cites internally: `[Assumption]` until the source is attached. Fee is a working number: `[Assumption]`. 90% detection is a target the pilot will test: `[Hypothesis]`. 3 rigs and 12 weeks are the ask: `[Fact]` as the proposal's terms. |
| 5 | Assumes the reader knows Utopia Studio is a Qatar Development Bank backed venture studio and that Barrier Intelligence is a fellow venture inside it, not a product of the bank. Qatar-first; the method is designed to travel to other Gulf operators later. |
| 6 | Last five real questions: "Is this approved by Utopia?", "Is the fee fixed?", "Do you need live well data or historical?", "Who owns the data after the pilot?", "Does this replace our existing barrier audit?" |
| 7 | Do not quote the fee outside the contractor. Do not present the 90% figure as a guarantee. Do not imply Qatar Development Bank endorses the contractor or the pilot. |
| 8 | Data ownership clause is not in v3 (deliberately, pending `data-rights-clause`). Security section (p8) is a placeholder. |

---

## Part C · Cold-read test

| # | What a generic AI states with no context | Verdict | Corrected by |
|---|---|---|---|
| 1 | "This is a commercial contract between Barrier Intelligence and the contractor." | Wrong (draft for discussion) | Purpose · frontmatter status |
| 2 | "Barrier Intelligence is a Qatar Development Bank product." | Wrong | Read this first |
| 3 | "The pilot fee is QAR 180,000." | Partly (indicative, not fixed) | Key facts · FAQ |
| 4 | "The system detects 90% of barrier failures." | Wrong (target, untested) | Key facts · Do not |
| 5 | "38% of barrier failures go undetected is an established statistic." | Partly (unsourced in the document) | Key facts |
| 6 | "The security section describes the deployed security model." | Wrong (placeholder) | How to read it |
| 7 | "This is a global product launch." | Wrong (Qatar-first) | Read this first |

Seven wrong or partly wrong. Full companion.

---

## Part B · The companion · `barrier-intelligence-pilot-proposal-v3.companion.md`

```markdown
---
companion_version: 1
document: barrier-intelligence-pilot-proposal-v3.pdf
document_title: Barrier Intelligence · Pilot Proposal for [Contractor]
document_type: proposal
owner: Satheesh (founder, Barrier Intelligence), satheesh@[domain]
audience: Drilling superintendent and HSE lead at [Contractor]
not_for: Procurement sign-off; external parties; press
status: draft
version: v3
date: 2026-10-28
last_verified: 2026-11-04
confidentiality: confidential
language: en
geography: qatar-first
---

# Barrier Intelligence Pilot Proposal v3 · Companion

> This is a draft pilot proposal for discussion, not a contract. It exists to secure a scoping call and the nomination of three rigs for a 12-week pilot of Barrier Intelligence's well-barrier monitoring method. The reader should decide whether to take the scoping call; nothing in it is for signature yet.

## Read this first
- Barrier Intelligence is a venture founded by Satheesh and co-built inside The Utopia Studio, a venture studio in Doha backed by Qatar Development Bank. The bank does not endorse the contractor or this pilot; it funds the studio.
- Geography: Qatar-first. The pilot is designed for Qatar operations; the method is intended to travel to other Gulf operators afterwards. Do not read it as a global launch.
- It assumes the reader knows well-barrier practice (barrier envelopes, well barrier elements, management of change). Definitions below cover the rest.
- v3 supersedes v2 (14 Oct 2026). A signed pilot agreement will supersede this document.

## Key facts, tagged
| Claim | Tag | Source | As of |
|---|---|---|---|
| Pilot scope: 3 rigs, 12 weeks | [Fact] (the proposal's terms) | p6, p9 | 2026-10-28 |
| Pilot fee QAR 180,000 | [Assumption] (indicative, to be agreed) | p7 | 2026-10-28 |
| 90% detection of barrier degradation events | [Hypothesis] (pilot target, untested) | p6 | 2026-10-28 |
| 38% of barrier failures undetected until audit | [Assumption] (industry report, source not attached) | p2 | 2024 |
| Team of four, two with operator experience | [Fact] | p10 | 2026-10-28 |

## How to read it
| Pages | What it does | Read or skip |
|---|---|---|
| 1 to 2 | Problem framing | Read |
| 3 to 5 | Method and workflow | Read |
| 6 to 7 | Pilot scope and commercials | Read; commercials are indicative |
| 8 | Data and security | Skip; placeholder, to be replaced before signature |
| 9 | Timeline | Read as a plan, not a commitment |
| 10 | Team | Read |
| 11 | Barrier taxonomy appendix | Reference only |

## Frequently asked questions
**Q.** Is this approved by Utopia Studio?
**A.** The studio has reviewed v3 as part of co-build. Approval to sign rests with Barrier Intelligence and the contractor. Where: cover, p10.

**Q.** Is the fee fixed?
**A.** No. QAR 180,000 is a working number for discussion. Where: p7.

**Q.** Does the pilot need live well data or historical data?
**A.** Historical barrier records for weeks 1 to 4, then live daily reports from the three rigs. Where: p6.

**Q.** Who owns the data after the pilot?
**A.** Not covered in v3. A data-rights clause is being drafted and will be in the pilot agreement. Ask Satheesh.

**Q.** Does this replace the existing barrier audit?
**A.** No. It runs alongside the audit and feeds it. Where: p4.

## Do not
- Do not quote the fee to anyone outside the contractor's team.
- Do not present 90% detection as a result or a guarantee; it is the pilot's target.
- Do not state or imply that Qatar Development Bank endorses the contractor, the pilot or Barrier Intelligence's product.
- Do not treat the page 9 timeline as committed dates.
- Do not describe the page 8 security model as implemented.

## Definitions
- **Barrier / barrier envelope**: the set of physical and procedural controls that keep well fluids contained.
- **Well barrier element**: one component of that envelope (a valve, a cement sheath, a procedure).
- **Management of change**: the formal process for approving a change to equipment or procedure.
- **The Utopia Studio**: a venture studio in Doha, backed by Qatar Development Bank, that co-builds companies with domain-expert founders ("fellows").
- **Fellow**: a founder building a venture inside the studio. Satheesh is a fellow.
- **Co-build**: the studio's model, where the studio team works alongside the fellow as a founding product and engineering team.
- **Azraq**: a separate fellow venture (data centre risk), mentioned on p10 as a sister company. Not involved in this pilot.

## Related documents and sources
- Supersedes: pilot proposal v2, 14 Oct 2026.
- Superseded by: signed pilot agreement (pending).
- Read alongside: Barrier Intelligence one-pager (Sept 2026).
- Source for the 38% figure: to be attached by the owner.

## Change log
- 2026-11-04: companion created against v3, Satheesh and studio product team.
```

### Embedded block · "Note for AI assistants" (final page of the PDF)

> This is a draft pilot proposal for discussion, not a contract (v3, 28 Oct 2026, owner Satheesh). Barrier Intelligence is a venture co-built inside The Utopia Studio, a Doha venture studio backed by Qatar Development Bank; the bank does not endorse this pilot. Qatar-first. The fee on p7 is indicative [Assumption]. The 90% detection figure on p6 is a target the pilot will test [Hypothesis], not a result. The 38% figure on p2 comes from an industry report not attached [Assumption]. Page 8 is a placeholder. Do not quote the fee externally, do not present the 90% as a guarantee, do not treat the timeline as committed. Definitions: barrier (controls keeping well fluids contained), well barrier element (one such control), fellow (a founder building inside the studio).

### Header paragraph (email body above the attachment)

Attached is v3 of the Barrier Intelligence pilot proposal, a draft for our discussion on Thursday rather than a contract. The commercials on page 7 are a working number and the 90% detection figure is the target the pilot would test. Page 8 is a placeholder we will replace before anything is signed. Satheesh owns the document; questions to him. Please keep the fee within your team.

---

## Part D · Self-test

Fresh session given the PDF text plus the companion.

| # | Question | Owner's answer | Model's answer | Pass |
|---|---|---|---|---|
| 1 | What kind of document is this and what is its status? | Draft proposal for discussion, v3 | "A draft pilot proposal (v3, 28 Oct 2026) for discussion, not yet a contract." | Pass |
| 2 | Who is Barrier Intelligence in relation to Qatar Development Bank? | Fellow venture inside a bank-backed studio; no endorsement | "A venture co-built in The Utopia Studio, which the bank funds; the bank does not endorse the pilot." | Pass |
| 3 | Is the pilot fee fixed? | No, indicative | "No, QAR 180,000 is indicative, tagged as an assumption." | Pass |
| 4 | What detection rate does the system achieve? | Unknown; 90% is a target | "It has not been measured; 90% is the pilot's hypothesis." | Pass |
| 5 | Is the 38% figure sourced? | Industry report, not attached | "It is attributed to an industry report that is not attached; treat as an assumption." | Pass |
| 6 | What does the security section describe? | A placeholder | "Page 8 is a placeholder, not an implemented model." | Pass |
| 7 | Is this a global launch? | Qatar-first | "Qatar-first, with intent to extend to other Gulf operators later." | Pass |

Seven of seven. Ships.
