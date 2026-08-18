---
name: data-rights-clause
description: Draft the data-rights clause for a fellow's first paid pilot. Run the three-part test — the data must be workflow exhaust, must compound with use, and must be covered by a clause signed at pilot #1 — then produce the actual clause language (data covered · retention · derived-data / compounding rights · training rights · survival on termination) with GCC/MENA jurisdiction points (residency, government-entity data, worker/sponsor consent) marked [Assumption] for counsel. Fires on "data rights", "what to sign at the pilot", "who owns the data", "data-rights clause", "can we keep and train on the pilot data", "protect our data", "make sure we keep our data", "change their standard agreement so the data stays ours". Not for deciding whether a source is a moat seed or model-reachable (use yoda-data-sourcing, section 03); not for structuring the whole pilot — scope, price, success metrics, conversion (use pilot-six-term-sheet, section 07, which carries this clause as one of its six terms); not for scoring whether a lone signal is real evidence (use evidence-ladder). Not a substitute for counsel.
type: generator
supersedes: none
---

## What it does

Takes one data source a fellow already has — the clause-gated moat seed YODA surfaced (section 03) — and returns two things: the three-part test applied to that data, and the actual clause language to put in pilot #1. The three-part test decides whether the data is worth a clause at all: it must be exhaust of the real workflow, it must compound as the product runs, and it must be locked by a clause signed at the first pilot. The first two legs come from YODA. This skill adds the third and the timing. The clause is not a generic NDA or the counterparty's standard vendor agreement — those protect the counterparty from you and usually delete your seed on termination. It is the inverse: the right to retain the exhaust, keep the data the product generates, train on it, and hold that corpus after the pilot ends. Signed at pilot #1, never bolted on later. No clause, no pilot.

## The Icarus reframe

The moat seed YODA found is worthless without the right to use it. Exhaust that compounds is the vendor's moat, not yours, until a signed clause makes it yours — so the clause is the third leg of the moat, not paperwork you handle later. Two things make it real. First, it is signed at pilot #1, because the right is cheapest before the data has visibly produced value, and consent you did not take up front cannot be retrofitted onto data you have already ingested. Second, the clause you actually need is the opposite of the one you will be handed: the counterparty's standard NDA or vendor DPA deletes your corpus on termination and forbids training, so signing it signs away the moat with your own signature. This skill drafts the inverse clause and flags every GCC/MENA legal specific as an [Assumption] for counsel — it never states jurisdiction law as fact.

## When to use / When NOT

Use when a fellow has a specific data source (named and banded by YODA, usually a P or clause-gated row) and a counterparty who can grant rights to it, and is heading into or negotiating pilot #1. Trigger phrases: "data rights", "what to sign at the pilot", "who owns the data", "data-rights clause", "can we keep and train on the pilot data".

Do not use when:

| Request | Belongs to |
|---|---|
| "Is the operator's telemetry even a moat seed, or can a model already reach it? Band our sources." | `yoda-data-sourcing` (section 03). That skill finds and bands the data and flags which rows are clause-gated. This skill drafts the clause for a row it already flagged. |
| "Structure the whole pilot — scope, price, success metrics, kill criteria, conversion." | `pilot-six-term-sheet` (section 07). The data-rights clause is one of its six terms. This skill drafts that one term in depth; the term sheet carries it. |
| "Design our moat — how it compounds and why the incumbent won't copy it." | `moat-design-canvas` (section 06). That sequences the moat's dated gates. This skill secures the legal right the data-advantage gate depends on. |
| "Is their verbal 'sure, keep the data' strong enough to count on? Score it." | `evidence-ladder` (section 02). This skill uses the ladder to weigh whether the right is held; scoring a lone signal is that skill's job. |

Also: this is not a substitute for counsel and not a general contract-review skill. It produces a drafting scaffold and a counsel checklist, not final legal advice. And it does not invent a source. If the fellow has no named data and no counterparty, it is not ready — ask the one question in Method step 1.

## Method

Fill in `template.md`. Six steps. Steps 1–2 gate; steps 3–6 draft.

### Step 1 — Confirm a real seed and a real counterparty

You need two things before drafting: a named data source (from YODA, not a vague "our data") and a named counterparty who can actually grant the right (the operator, the plant, the vendor, the pilot customer). If the fellow has only a domain or an ambition, stop. Ask the one question: *which specific data source, and who holds or generates it that we would be signing with?* Invent no source and no counterparty to fill the gap.

### Step 2 — Run the three-part test (the gate before drafting)

A clause is only worth signing on data that is a moat. Score all three legs. Legs 1 and 2 carry over from YODA; confirm them, do not re-derive the whole corpus map.

| Leg | Question | Pass condition |
|---|---|---|
| 1 Exhaust | Is this a byproduct of the real workflow, regenerated as the work happens? | Not a one-time bought or scraped dataset. It comes off the doing of the work. |
| 2 Compounds | Does running the product generate more of it — corrections, labels, edits, decisions? | The corpus grows with use, not just with time. |
| 3 Signable at pilot #1 | Is there a counterparty who can grant the right, and will the clause be in the executed pilot agreement — not deferred? | The right is bundled into pilot #1, signed before data flows. |

Decision rule:

- Fail leg 1 or leg 2 → this data is not a moat worth a clause. A clause on a static, non-compounding dataset locks up an asset that erodes. Send the fellow back to `yoda-data-sourcing` to find the exhaust that actually compounds. Do not draft.
- Pass 1 and 2 but the fellow wants to defer leg 3 ("we'll sort rights after the pilot proves out") → that is the bolt-on trap and the kill line. Name it (see Step 6) and fix the timing before drafting.
- All three pass → draft (Steps 3–6).

### Step 3 — Name what the default contract does to your moat

Before writing anything, check what the counterparty will hand you. A standard vendor NDA or the customer's standard data-processing agreement is written to protect *them*: it typically (a) deletes your copy of the data on termination and (b) grants you no right to train on it or keep anything derived. Signing it is not neutral — it actively destroys the seed. In `template.md` §3, list the specific default terms and the flip each needs.

| Default term (theirs) | What it does to the moat | The flip you need |
|---|---|---|
| Delete all data on termination | Erases the seed the moment the pilot ends or does not convert | De-identified / derived corpus survives termination (Step 4, §4) |
| "Vendor may use data only to provide the service" | Forbids training and product improvement | Explicit grant to retain and train in aggregated / de-identified form (§2) |
| Silent on data the product generates | You get the input, not the compounding labels | Derived-data rights (§3) — the crux |

### Step 4 — Draft the six clause components

Write the clause in `template.md` §Part B. Six components. The two fellows skip are §3 (derived-data / compounding rights) and §4 (survival) — the two that separate a moat from a rented dataset.

| # | Component | What it must say for this data |
|---|---|---|
| 1 | Data covered | Name the exhaust categories precisely (input + generated + labels/corrections). Not "all data". |
| 2 | Grant of use & improvement | Right to retain and use the data to develop and improve the product, including model training, in aggregated / de-identified form. |
| 3 | Derived-data & compounding rights | The data the product generates by being used (corrections, labels, decisions) is yours to retain and use. Without this you hold the fuel, not the refinery. |
| 4 | Survival & retention | Rights survive pilot end, non-conversion, and termination. The de-identified / derived corpus is not deleted. |
| 5 | Residency, handling & security | Where the data lives, who may access it, security posture. Jurisdiction flags land here (Step 5). |
| 6 | Warranties & lawful basis | Counterparty warrants it has the right to share the data (including any third-party / worker data in sensor feeds). Consent flags land here (Step 5). |

### Step 5 — Flag every jurisdiction specific for counsel

For GCC/MENA pilots (and any cross-border data), tag each legal specific `[Assumption — confirm with counsel]`. Never write a statute, article, or "the law requires X" as `[Fact]`. Flag the risk *category*, not an invented citation.

| Risk category to flag [Assumption] | Why it may bite this clause |
|---|---|
| Data residency | Some jurisdictions / government contracts may require operational data to stay in-country, which constrains where you can host and train. |
| Government-entity data | Contracting with a state or semi-state entity (common in GCC energy) may impose sovereignty or ownership terms that override a standard SaaS grant. |
| Cross-border transfer | Moving the corpus out of the jurisdiction to train may be restricted. |
| Worker / third-party consent | Sensor and field data may capture identifiable workers; the counterparty's warranty (§6) may need a lawful basis, with sponsor/kafala-adjacent contracting realities. |

State plainly that counsel finalizes the clause and confirms every flag. The skill drafts the scaffold; it does not give legal advice.

### Step 6 — Set the timing and score the right

The clause is signed at pilot #1, bundled into the six-term sheet (`pilot-six-term-sheet`, section 07). Write the timing line: *no clause, no pilot.* Then score how firmly the right is actually held, on the evidence ladder (below). A right is held only when the clause is executed — countersigned by an authorized signatory. A verbal "sure, keep it" is a seed-in-waiting, not a seed you hold.

**Kill line.** The output is auto-failed if it drafts a clause with no three-part test applied, or presents the clause as something that can be added after the pilot, or states a jurisdiction-specific legal claim as fact instead of tagging it `[Assumption]` for counsel.

## Evidence standard

Every Icarus skill weights behaviour and money over opinion. Here the ladder scores one claim: *do you actually hold the right to retain, train on, and keep this data?*

| Signal that the right is held | Score |
|---|---|
| Clause executed — countersigned by an authorized signatory in the pilot agreement | 1.0 (binding; the right moved) |
| Clause drafted and in the redline, agreed verbally, not yet signed | 0.3 |
| Email or call: "you can keep the data / we're fine with that", no clause | 0.3 |
| "Their standard agreement probably covers it" | 0.1 — and usually false; the standard agreement usually does the opposite |
| Data already flowing under no clause | Below 0.1: you are accumulating a seed you do not own, or deleting it on their terms |

The bar this skill enforces: the right is held only at 1.0 — signed at pilot #1. Anything at 0.3 or below is an open sourcing task, not a secured moat. Tag every empirical claim `[Fact]`, `[Assumption]`, or `[Hypothesis]`, and tag every jurisdiction specific `[Assumption]`.

## Gotchas

Signing away the moat with your own signature. The most common failure is not the absence of a contract — it is signing the counterparty's standard NDA or DPA, which deletes your copy on termination and forbids training. A fellow who "handled data rights" by countersigning the customer's template has usually secured the opposite of what they needed. Always read what the default does before drafting the flip (Step 3).

Input rights without derived rights. Fellows secure the raw input feed and stop, missing the data the product itself generates — the corrections, the accept/edit/override labels, the decisions. That generated stream is the part that compounds. Locking the input and leaving the derived data ungranted is locking the fuel tank and leaving the refinery open (component §3).

The bolt-on trap and the consent it cannot retrofit. "We'll add data rights in the conversion contract after we prove value" fails twice. Leverage flips once value is proven: the counterparty now sees the data was the fuel and prices the right accordingly, or takes the demonstrated playbook in-house. And consent you did not take up front cannot be applied retroactively to data you already used — retrofitting is a compliance mess, not a redline. Sign at pilot #1.

Fabricated legal certainty. Asserting "under [law] you must host in-country" as fact is an auto-fail even when it sounds right. Jurisdiction specifics are always `[Assumption — confirm with counsel]`. This skill drafts a scaffold and a counsel checklist; it is not counsel and does not state law as fact.

## Examples

`examples/sample.md` — the full three-part test and pilot-#1 clause for Barrier Intelligence's rig-sensor and field-log data at its first operator pilot: passes all three legs, flips the operator's standard delete-on-termination DPA, secures the derived correction stream and survival, and flags national-oil-company / residency / worker-consent points as `[Assumption]` for counsel.

## Related skills

`yoda-data-sourcing` (section 03) — upstream. It finds and bands the data and flags the clause-gated rows that come here. This skill drafts the clause for a row YODA already qualified; it does not decide whether a source is a moat seed.

`pilot-six-term-sheet` (section 07) — carries this clause as one of its six terms. That skill structures the whole pilot; this drafts the data-rights term in depth. Run this to write the term, that to assemble the deal.

`moat-design-canvas` (section 06) — the data-advantage gate on the moat trajectory is only real if the right is held. That skill sequences the moat; this secures the leg the data-advantage gate stands on.

`evidence-ladder` (section 02) — owns the rungs this skill borrows to score whether the right is held. When a fellow wants to weigh one lone signal, send them there.

Supersedes: none. Fully proprietary — there is no prior data-rights skill in the pack to absorb or beat.
