# Eval log — data-rights-clause

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "What do we sign at the pilot so the data is actually ours?"
2. "Who owns the data in this pilot?"
3. "Draft our data-rights clause for the first pilot."
4. "Can we keep and train on the pilot data after it ends?"
5. "The operator wants us on their standard agreement — what do we need to change to protect our data?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Is the operator's telemetry even a moat seed, or can a model already reach it? Band our sources." → belongs to `yoda-data-sourcing` (section 03)
2. "Build the whole pilot term sheet — scope, price, success metrics, kill criteria, conversion." → belongs to `pilot-six-term-sheet` (section 07)
3. "Is their verbal 'sure, keep it' strong enough to count on? Score that one signal." → belongs to `evidence-ladder` (section 02)

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire hit named trigger phrases or the flip-the-standard-agreement intent (case 5 "protect our data" → "data rights"; fires on intent, no exact phrase). All 3 must-not-fire are explicitly carved out in the description (yoda-data-sourcing §03, pilot-six-term-sheet §07, evidence-ladder §02). |
| 2 Golden | PASS (5/5) | Per-case totals below. Every case pass ≥21 with no dimension <4; no auto_fail triggered. |
| 3 Adversarial | PASS (3/3) | 01 asks the one Step-1 question, invents nothing. 02 refuses NDA=data-rights, names confidentiality-vs-grant trap + return/destroy deletes seed, reframes to §3/§4 (the "standard NDA/DPA is the inverse" trap is caught). 03 declines without poaching, names pilot-six-term-sheet §07, offers the single-term handoff. |
| 4 Head-to-head | n/a | `supersedes: none` — fully proprietary, no prior skill to beat. |
| 5 Anti-generic | PASS | Golden 01 output cannot come from a generic PM prompt: three-part test (exhaust+compounds+signable-at-#1), "signing away the moat with your own signature" inversion, derived-data crux (§3), evidence-ladder right-held score (0.3→1.0), two-counterparty split, GCC [Assumption] tagging. Guidance is table-first (test, flip, components, flags, ladder), not prose. |
| 6 Real-use | pending | Requires 5+ real fellow uses. |

### Per-case golden scores (rubric: method_fidelity · artifact_complete · proprietary_edge · challenge · evidence_standard, /25)

| Case | MF | AC | PE | CH | ES | Total | Pass? |
|---|---|---|---|---|---|---|---|
| 01 Barrier (seed) | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 02 Mentix (derived-data) | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 03 Azraq (bolt-on timing) | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 04 Durian (mundane / proportionate) | 5 | 5 | 4 | 5 | 5 | 24 | Y |
| 05 no-moat (kill-line inverse) | 5 | 5 | 5 | 5 | 5 | 25 | Y |

Notes: 03 correctly fails leg 3 on timing and refuses a sign-at-conversion clause (kill line honoured — never presented as bolt-on-able). 05 correctly fails legs 1+2 and declines+redirects to yoda-data-sourcing (kill line honoured — no clause drafted when the test fails). 04 stays proportionate (light §5/§6, "small does not mean skip") without dropping §3/§4 or the pilot-#1 timing.

### Special-check verdicts (from judge brief)
- Jurisdiction / GCC-MENA specifics tagged `[Assumption — confirm with counsel]`, never asserted as fact: PASS. Step 5 mandates it, template.md pre-tags every residency/consent/sovereignty line, kill line auto-fails a fabricated legal fact, and examples/sample.md states no statute.
- Three-part test gates before drafting: PASS. Step 2 is the gate; Steps 3–6 draft only on all-pass. Verified against Golden 03 (leg-3 fail) and 05 (leg-1/2 fail).
- "Standard NDA/DPA is the inverse of what you need" trap caught: PASS. Present in the reframe, Step 3 flip table, Gotcha #1, and Adversarial 02.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- Minor, non-blocking: template.md §5/§6 ship with pre-filled `[Assumption]` residency/consent/sovereignty lines. In a genuinely mundane, non-GCC pilot (Golden 04) these could tempt an applier to pad jurisdiction complexity to look thorough. Step 5 and the Golden 02/04 "flag only where relevant" guidance mitigate it, but a one-line template note ("delete the flags that do not apply; do not manufacture jurisdiction complexity") would harden it.
- Minor, non-blocking: Gate-1 must-fire case 5 fires on intent ("protect our data" / change their standard agreement) rather than an exact trigger phrase. Adding "protect our data" or "change their standard agreement" to the fires-on list would make the trigger explicit rather than inferred. Not a miss — it still fires.

**Verdict: GRADUATE-READY.**

## Refine run 2 — applied judge fixes: added "protect our data" (+ similar intent phrasings) to the description fires-on list so Gate-1 must-fire #5 fires on an explicit phrase; added a template note to delete pre-filled jurisdiction `[Assumption]` lines (§5/§6/§4) that don't apply, so a mundane non-GCC pilot isn't padded with irrelevant flags.
