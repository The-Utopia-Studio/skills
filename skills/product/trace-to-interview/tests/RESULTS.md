# Eval log — trace-to-interview

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "Mine our logs — what are users telling us?"
2. "Turn our production traces into discovery questions."
3. "Learn from our usage / learn from how people actually use it."
4. "What job aren't we finishing? Read it off the usage."
5. "What are our production traces telling us about intent?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Build the retention curve and pick our North Star from usage." → belongs to `metrics-that-matter`
2. "Summarise this recorded customer interview transcript." → belongs to `summarize-interview`
3. "Set up the whole discovery loop — interviews, traces, and evals, on a cadence." → belongs to `continuous-discovery-engine`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | Must-fire 1/2/3/5 hit literal trigger phrases ("mine the logs", "turn usage data into discovery", "learn from usage", "what are our production traces telling us"); #4 ("read the job off usage") maps to "turn usage data into discovery". All 3 must-not-fire are named in the description's NOT-clauses (retention/North-Star→metrics-that-matter; transcript→summarize-interview; whole loop→continuous-discovery-engine). |
| 2 Golden | PASS (5/5) | Per-case table below. All ≥21, no dimension <4, no golden-specific auto-fail triggered. |
| 3 Adversarial | PASS (3/3) | 01 vague → Method Step 1 forces "stop and ask for the trace unit + ~10 real traces, invent no patterns". 02 solution-in-disguise → "Optimising the number instead of answering the question" Gotcha + kill line name the suppress-the-signal trap and re-anchor on recovering the question. 03 out-of-scope → When-NOT table + related skills decline cleanly, name metrics-that-matter, build no dashboard, offer the hand-back. No fabrication, flattery, or scope-poaching. |
| 4 Head-to-head | n/a | `supersedes: none`. |
| 5 Anti-generic | PASS | Golden-01 output recovers the discovery question "which part of the output is not trusted?" and reads the field-level split (line/timestamp trusted, root-cause not) as the signal, with two-rung discipline (behaviour 0.7 vs why [Hypothesis]) and replaced-interview pricing — a generic PM prompt reports "70% edit rate, improve the root-cause model". Decoder, distinct-user weighting, and template are tabular where guidance should be tabular; no should-be-a-table-as-prose defect. |
| 6 Real-use | pending | Requires 5+ real fellow uses; not executable here. |

### Gate 2 — per-case scores (method / artifact / proprietary_edge / challenge / evidence)

| Case | m_f | art | prop | chal | evid | Total | Pass |
|---|---|---|---|---|---|---|---|
| 01 Mentix — edit-before-accept on root-cause field | 5 | 5 | 5 | 4 | 5 | 24 | ✓ |
| 02 Barrier — retry-until-it-passes (safety fork) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 03 Durian — export-then-leave (mundane) | 5 | 5 | 4 | 4 | 5 | 23 | ✓ |
| 04 Azraq — N=1 power user (trace worship) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 05 Mentix — 91% accept = trust (ambiguity gate) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |

Notes on the two hardest cases: **02** applied faithfully names the safety-critical gaming-vs-unclear-rejection fork and gives the diff-the-wording probe rather than picking the flattering "unclear rejection" read. **04** applies Step 6 hard — the dramatic 47-export trace is N=1 (anecdote), refused as a "killer use case", and the buried real finding (30 operators average 2 exports = low engagement) is surfaced. **05** refuses "91% accepted = trusted = ready for autonomy", uses the 6-second dwell as counter-evidence, and blocks the autonomy leap (held as candidate, why-rung 0.1) pending an error-injection probe. Kill-line stress test: no case reports a metric-only finding; every card recovers the discovery question. The skill is architected against the kill line (decoder Step 3, template auto-fail on "number but no question", explicit kill line in Method + Evidence standard).

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **Why-rung numeric vs word-tag mapping is under-specified.** Method/Evidence say the un-probed why "starts at opinion (0.1)", but the worked example places Cards 1–2 at "0.3 (Assumption)" and Card 3 at "0.1 (unconfirmed)" with the JTBD field tagged `[Hypothesis]` in the same card. The rule for when an un-probed why is 0.1 vs 0.3, and how the numeric why-rung maps to the `[Hypothesis]`/`[Assumption]` word-tag, is not stated. Suggest one line: "un-probed why = 0.1 `[Hypothesis]`; why corroborated by a second independent behaviour but no probe landed = up to 0.3 `[Assumption]`; probe landed / money moved = 0.7+." Minor, non-fatal — a fellow could tag two cards inconsistently.
- **Active-segment denominator can go missing.** Step 6 requires distinct-user count as a % of active segment, but an input may omit the active-segment size (e.g. Golden 05 gives 25 accepting supervisors but no restated active count). Template could prompt the fellow to state or carry the denominator explicitly, or flag "active segment unknown" rather than silently computing a %.

## Refine run 2 — applied judge fixes: stated the why-rung mapping in Step 5 (un-probed why = 0.1 `[Hypothesis]`; corroborated by a second independent trace/artefact = 0.3 `[Assumption]`), and forced the template's active-segment denominator to be stated or explicitly flagged "unknown" (plus a self-check line).
