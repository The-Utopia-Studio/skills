# Worked example — Durian Labs' first workflow

Durian Labs is building an early workflow product for regional inventory planners at mid-size grocery chains. This is a test fixture: numbers are illustrative, not real client data.

## Input the fellow brought

"Our first workflow is the weekly stockout digest. We ran it by hand for three planners for two weeks before writing any code. I think it's our wedge — can you check?"

Available evidence, as stated:
- Concierge run: Durian's team hand-produced the digest for 3 planners, 2 Mondays running. [Fact]
- 2 of the 3 planners changed their Monday reorder quantities based on the ranked list. [Fact]
- All 3 planners have a standing Monday 9am regional planning meeting. [Fact]
- 2 planners pasted the list into their store-ops channel (8 store managers each, none of them Durian users). [Fact]
- Planners spent roughly 40 min/week retyping the recommended quantities into the ERP by hand. [Fact]
- Durian's product logs every digest export by default. [Fact]

## 1. The wedge in one sentence

Every Monday morning, a regional planner uploads last week's sales-and-stock CSV and gets a ranked list of the 20 SKUs most likely to stock out this week, each with a suggested order quantity.

Passes the sentence test: who (regional planner), recurring trigger (Monday morning, ahead of the 9am meeting), single output (ranked 20-SKU stockout list).

## 2. The five-row verdict

| # | Question | Threshold | Evidence | Pass / Fail |
|---|---|---|---|---|
| 1 | Standalone value | Full job alone in week 1, nothing else built | Concierge run needed only a CSV upload and the list — no integrations. 2 of 3 planners changed their orders on it in week 1. Behaviour observed 0.7 [Fact] | PASS |
| 2 | Forced cadence | Pulled by a recurring event already in the user's calendar | The Monday 9am regional planning meeting already exists; both adopters pulled the list before it, unprompted, in week 2. Behaviour observed 0.7 [Fact] | PASS |
| 3 | Travel | Output reaches ≥2 non-users/week | 2 planners forwarded the list weekly into a store-ops channel of 8 store managers each — none are Durian users. Behaviour observed 0.7 [Fact] | PASS |
| 4 | Structural expansion | Using it creates an unmet need the wedge can't satisfy | Acting on the list forces the orders to be placed; planners retype quantities into the ERP ~40 min/week. That is the reorder-writeback Durian will build next. Behaviour observed 0.7 [Fact] | PASS |
| 5 | Scoreable adoption | One number already collected | "Accounts with ≥1 export on ≥3 of 4 Mondays." Every export is already logged in the product's event stream. Artefact shown 0.5 [Fact] | PASS |

## 3. Verdict

**Score: 5 / 5**

**Verdict: REAL WEDGE.**

## 4. The row that nearly failed — and why it matters

Q4 first came in as: "planners told us they'd love it to just place the order." That is verbal commitment (0.3) — below the pass bar. Argued that way, Q4 fails and the whole test returns NOT a wedge, because the verdict is `AND`.

The upgrade was behavioural, not rhetorical: Durian timed the ~40 min/week of manual ERP retyping. That is observed behaviour (0.7) and, more importantly, it is *structural* — the wedge produces an order list, and an order list has to be entered somewhere. The next build (reorder-writeback) answers a need the wedge itself creates. Only after that upgrade does Q4 pass.

The lesson the skill enforces: a wedge that scores 4/5 on behaviour and 1/5 on "they said so" is not a 4.5. It is a NO until the weak row is moved up the ladder or the wedge is changed.

## 5. Next step

Build the stockout digest as the wedge. Instrument the Q5 number (Mondays-with-export per account) from day one so adoption is legible before the reorder-writeback build begins.
