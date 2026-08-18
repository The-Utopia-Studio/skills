# Eval log — yoda-data-sourcing

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "How do we get our own data?"
2. "What data do we own?"
3. "Where's our proprietary data?"
4. "Help me build the seed of our data moat."
5. "What data can't a competitor get?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Draft the contract clause that gives us rights to the operator's telemetry" → belongs to `data-rights-clause` (section 06, forthcoming)
2. "Is 'they said they'd buy it' strong enough evidence? Score this signal." → belongs to `evidence-ladder`
3. "Run the interview that pulls the plant supervisor's tacit judgment out of their head" → belongs to `tacit-knowledge-interview`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | GRADUATE-READY | see judge block below |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | Description lists explicit fire phrases + explicit sibling exclusions. All 5 must-fire map to a phrase (incl. #4 "build the seed of our data moat" → "build the moat's seed"). All 3 must-not-fire are named-and-excluded: draft-clause→data-rights-clause, score-one-signal→evidence-ladder, tacit-interview→tacit-knowledge-interview. |
| 2 Golden | PASS (5/5) | Per-case totals below. Applied Method to each input; every case reproduces required R/G/P bands, moat-seed selection, sibling routing, and kill-line handling. No auto_fail triggered on any case. |
| 3 Adversarial | PASS (3/3) | 01 vague → asks the one Step-1 question, invents no sources. 02 "more data" → names volume≠proprietariness trap, treats bought dataset as G, refuses "biggest corpus = moat". 03 draft-clause → declines without poaching, names data-rights-clause (sec 06), restates P/vendor-owned/no-access note only. No fabrication, flattery, or scope-poaching. |
| 4 Head-to-head | n/a | `supersedes: none`. |
| 5 Anti-generic | PASS | Golden 01 output not reproducible by a generic PM prompt: the "reachable data = the model hands your competitor the same corpus for free" inversion + eval-set duality is load-bearing. A generic prompt would praise the "cleaned safety dataset" and treat volume as a moat; the skill throws both of the fellow's proudest datasets into the R column. All structural guidance is tabular (six seams, bands, ladder, map); only Gotchas are prose, appropriately. |
| 6 Real-use | pending | Requires 5+ real fellow uses; not executable here. |

### Golden per-case scores (rubric: 5 dims × 0–5, pass ≥21 AND no dim <4)

| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total /25 | Pass? |
|---|---|---|---|---|---|---|---|
| 01 Barrier Intelligence | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 02 Azraq | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 03 Mentix | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 04 Durian Labs (mundane) | 5 | 5 | 5 | 4 | 5 | 24 | Y |
| 05 all-R (kill-line inverse) | 5 | 5 | 5 | 5 | 5 | 25 | Y |

Notes: 04 challenge scored 4 — the case is supportive (fellow under-estimates), so pushback is a correction of self-doubt rather than a hard reframe; still names the trapped exhaust and rejects templates as R. 05 (the special kill-line check) confirmed: skill refuses to call an all-model-reachable corpus a moat seed, bands filings/news R and bought reports G, and redirects to the missing Step-1 workflow with no flattery and no invented proprietary angle.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **Access-rights arrangement has no home row.** Golden 02's "negotiated data-rights position with two operators" is an *access mechanism*, not a data source, and can span several rows. The one-row-per-candidate map handles it only by folding it into the access-path column of the source it unlocks. A fellow may be unsure where a cross-cutting rights arrangement goes. Consider a one-line note in Step 4 that rights arrangements live in the access column of the row(s) they convert, not as their own row.
- **≥0.5 gettability can look like it qualifies an R row.** The evidence ladder scores "the source is real and gettable", and R sources score *high* on gettability (everyone can get them — see example rows 1–2 at 0.5/0.7). The "moat seed only if band=P AND access AND ≥0.5" rule guards this, and the skill states "gettability alone never qualifies a row; the band does" — but it is the single easiest place for a careless fellow to sneak an R row into the moat column. Already covered; flagging as the top user-error hotspot.

## Refine run 2 — applied judge fixes: added dedicated clause-gated access-rights handling (SKILL Step 4 + template §4); reinforced that an R-band source can never enter the moat-seed column regardless of gettability score.
