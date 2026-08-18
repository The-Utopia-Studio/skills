# Eval log — unserved-needs-finder

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "What do they really need — and which need should we build first?"
2. "This feature list is mostly solutions. What's the real need under it?"
3. "Find the unmet need in this segment and rank it."
4. "Which of these is the wedge need vs a nice-to-have?"
5. "They keep asking for [feature]. What do they actually need, and is it durable?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Who is the actual buyer, what's their budget, and who signs?" → belongs to `user-buyer-decider-map`
2. "Reduce the whole job to information moved / decisions made / liability transferred." → belongs to `job-in-primitives`
3. "Is the whole idea worth building at all?" → belongs to `so-what-stress-test`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1
| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 MUST phrasings map to description triggers ("what do they really need", "real need under this feature request", "find the unmet need", "which need should we prioritise"/"wedge", "durable"). All 3 MUST-NOT are explicitly excluded by name in the description's NOT-clauses (buyer→user-buyer-decider-map, currencies→job-in-primitives, whole idea→so-what-stress-test). |
| 2 Golden | PASS (5/5) | Per-case totals below. |
| 3 Adversarial | PASS (3/3) | 01 vague: §0 "need a segment + STOP if all 0.1" forces the one unblocking question, no fabricated map. 02 Slack: "integration" is literally in the §1 solution-noun list → stripped at pass 1, redirected to what it carries. 03 buyer: When-to-use table + "Name the sibling and stop" declines and names `user-buyer-decider-map`, offers top need as handoff. No fabrication/flattery/poaching. |
| 4 Head-to-head | n-a | `supersedes: none`. (Skill claims to "absorb"/beat external `discovery/jobs-to-be-done` in prose but formally supersedes nothing — an external framework, not a retired Icarus skill. No head-to-head required.) |
| 5 Anti-generic | PASS | Golden 01 could NOT come from a generic PM prompt: the tech-invariance gate kills "faster log ingestion" as a platform-commoditised capability (frontier-studio-specific logic), and the evidence ladder demotes the fellow's own audit-confidence read to `[Hypothesis]` until a workaround/money-leak is shown. Generic PM output would be a JTBD nine-box or RICE list. Decision logic lives in tables (solution-strip, onion, tech-invariance, Kano map, selection); no procedure trapped in prose. |
| 6 Real-use | pending | requires 5+ real fellow uses |

### Gate 2 — per-case scores (MF·AC·PE·CH·ES, /25; pass = ≥21 and no dim <4)
| Case | MF | AC | PE | CH | ES | Total | Result |
|---|---|---|---|---|---|---|---|
| G01 Azraq dashboard/ingestion | 5 | 5 | 5 | 5 | 4 | 24 | PASS — strips dashboard (solution), kills ingestion (capability, fails §3), returns materiality-judgment performance need as wedge; audit-confidence held at hypothesis pending pre-audit-consultant workaround. No auto-fail. |
| G02 Barrier gas-safety | 5 | 5 | 5 | 4 | 4 | 23 | PASS — app→solution, real-time→capability; go/no-go performance wedge returned as hypothesis pending "what crews reach for when permit status unclear". Safety framing does not license 0.3→0.7 inflation. |
| G03 Durian AP (mundane) | 5 | 5 | 5 | 4 | 4 | 23 | PASS — OCR→capability, queue→solution; both merge to one core (Step 6 merge rule + example precedent); "catch bad match before payment" wedge. Does not shrug "just AP tooling". |
| G04 Mentix delighter trap | 5 | 5 | 5 | 5 | 5 | 25 | PASS — sharpest Kano test: summary tests as delighter, reject-risk decision as performance → wedge is the unglamorous grumble, NOT the loved summary. Gotcha "comfortable need is a delighter" + Kano map force it. |
| G05 Azraq all-capabilities | 5 | 4 | 5 | 5 | 4 | 23 | PASS — every item fails §1/§3; §0 STOP + §3 kills leave nothing for §4; refuses to manufacture a ranking, names the category error, onions air-gapped item to a lone hypothesis. AC=4: correct output is a refusal/partial, not a full wedge map (by design). |

Kill-line check: across all 5 goldens the skill never returns a solution or a tech capability as the wedge; the tech-invariance gate (Step 4, run before Kano) catches every capability, incl. the Kano-passing "faster processing" trap flagged in Gotchas. Kano sort verified to pick the under-served performance need as the wedge in every case where one exists (G01–G04) and to decline when none does (G05). Kill line NOT tripped.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **Source-weight ambiguity can bypass the §0 STOP rule (real, exploitable).** The Step 1 ladder tier "artefact 0.5" is distinct from the Evidence-standard tier "they SHOW you the workaround artefact 0.5" — the latter means a *customer workaround* artefact, the former reads like any written artefact. A roadmap/wishlist doc (Golden 05) is the team's own opinion written down and must weight 0.1 (opinion), not 0.5 (artefact); mis-weighting it at 0.5 would skip the "all rows 0.1 → STOP: not ready" gate and risk manufacturing a ranking of capabilities. The method still lands correctly via §3 tech-invariance (all five capabilities fail), so it is not fatal, but the STOP path is exploitable. Fix: add one line — "an internal roadmap/opinion doc is 0.1 (opinion), never 0.5; the 0.5 tier is a customer workaround artefact, not your own wishlist."
- **Two 1.0–0.1 ladders in one skill.** Step 1 weights *source credibility per candidate*; the Evidence-standard weights *unserved-gap strength on the top pick*. Same numbers, subtly different question. Worth a one-line pointer that they are two axes, so an applier does not conflate "how well-sourced is this candidate" with "how evidenced is the gap".
- **Prose/frontmatter tension (minor, not a defect).** "Absorbs `discovery/jobs-to-be-done`" and "It beats JTBD" read like a supersede, but `supersedes: none`. Fine, since JTBD is an external framework, not a retired Icarus skill — but a reader may expect a Gate-4 comparison that does not run.

## Refine run 2 — applied judge fixes: clarified in Step 1 (§0) that the 0.5 artefact rung is a customer's own workaround artefact, not the team's own roadmap/wishlist/spec (opinion 0.1), so the all-0.1 STOP gate cannot be bypassed by mis-weighting an internal doc.
