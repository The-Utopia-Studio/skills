# Eval log — job-in-primitives

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "What job is really being done under all these tools?"
2. "Strip this workflow down to the primitive job."
3. "Take the product and team names out — what's the underlying job?"
4. "What's the primitive job here?"
5. "Reduce this to information, decisions, and liability — what's left when the tools go?"

MUST NOT fire (3, name the sibling each belongs to):
1. "State this as the one decision we're changing and how much faster it gets." → belongs to `product-as-decision`
2. "Map how it's done today and price every step." → belongs to `current-state-map`
3. "What's the riskiest assumption / how would I disprove it?" → belongs to `null-hypothesis-test`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1
Judge did not author this skill. Applied the Method end-to-end to all 5 golden inputs and all 3 adversarials; scored produced artifacts against rubric.json.

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire phrasings match description trigger clauses ("what job is really being done", "strip this down to the primitive", "take the tool names out", "what's the primitive job", "reduce to information/decisions/liability … when the tools go"). All 3 must-not-fire are excluded: #1 caught by explicit "NOT for naming the single decision … (use product-as-decision)"; #2 by "NOT for mapping and pricing each workflow step (use current-state-map)"; #3 ("riskiest assumption") has zero overlap with any fire phrase. |
| 2 Golden | PASS (5/5) | Per-case table below. All ≥21, no dimension <4, no auto_fail triggered. |
| 3 Adversarial | PASS (3/3) | 01 vague-sector: skill refuses to reduce "logistics", asks the ONE question (name one concrete observed job instance), invents no primitive lines — backed by §0 STOP gate + Evidence standard. 02 solution-in-disguise: "a mobile app" is precisely a kill-list tool, so it can never be the primitive; skill names the trap and redirects to the manager's go/no-go — backed by §1 kill-list + Icarus reframe. 03 out-of-scope pricing: declines, routes to `current-state-map` without poaching — backed by When-NOT table + Related skills. No fabrication, no flattery, no scope-poach. |
| 4 Head-to-head | n/a | `supersedes: none`. |
| 5 Anti-generic | PASS | Golden 01 output could NOT come from a generic PM prompt: the three-currency split, the liability-transfer-as-AI-immovable-moat thesis ("no name to stake, no licence to lose"), the evidence-ladder weight, and the challenge on whether the account-director sign-off is contractually load-bearing (does money move against it) are all Icarus-specific and load-bearing, not decorative. Structured guidance lives in tables/template, not prose. |
| 6 Real-use | pending | Requires 5+ real fellow uses. |

### Gate 2 — per-case scores (rubric: method / artifact / proprietary / challenge / evidence, /25; pass ≥21 & no dim <4)
| Case | meth | artf | prop | chal | evid | Total | Pass |
|---|---|---|---|---|---|---|---|
| G01 Azraq risk report | 5 | 5 | 5 | 5 | 4 | 24 | ✓ |
| G02 Mentix stop/run | 5 | 5 | 4 | 5 | 5 | 24 | ✓ |
| G03 Durian PO-match (mundane) | 5 | 5 | 4 | 5 | 4 | 23 | ✓ |
| G04 Barrier field-log triage | 5 | 5 | 5 | 5 | 4 | 24 | ✓ |
| G05 Azraq data-rights (mostly-liability) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |

Notes: G03/G05 evid=4 and prop=4 where scored — the mundane and near-pure-liability cases have no money figures in the input to anchor, but the Method's §6 + Gotcha #3 ("do not manufacture an automatable primitive") force the honest liability read and prevent inflation, so both clear the bar. G05 is the discriminating case: the fellow asserts "a lot to automate"; the faithful run pushes back and names the job as mostly-liability with a thin information line — no manufactured flow. Kill-line gate (§5) holds on every case: no proper noun survives any §2 primitive line; all reductions land on information moved · decisions made · liability transferred.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **Orphaned negative-scope example in the `description`.** The frontmatter says "NOT for the MITRE look-inward/look-outward workshop" but "MITRE" names no sibling skill; the body's Related section identifies the absorbed skill as `discovery/problem-framing-canvas`. Harmless to trigger precision (no must-not-fire case involves it) but a fellow searching "MITRE" gets a dangling reference. Align the description's example to the actual absorbed skill name.
- **Described-not-observed inputs (G01, G02) sit at ladder ~0.3.** The Method handles this correctly via the STOP/UNVERIFIED gate on the liability line — but a lazy run could over-weight an interview-described workflow and call a habitual sign-off a "moat". Not a skill defect (the skill flags it); worth a one-line reminder in §6 that a moat claim needs the money-anchored sign-off confirmed before it counts.

## Refine run 2 — applied judge fixes: description negative-scope now points at the real absorbed sibling `problem-framing-canvas` (was orphaned "MITRE" reference); template §6 gains a money-anchor rule — a moat claim on a described (non-observed) sign-off does not count until it gates real money.
