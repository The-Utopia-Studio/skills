# Eval log — create-prd

Author agent seeds the cases; the judge scores. Where a gate could not be
honestly scored in this pass, it is marked **SEEDED-UNSCORED** with the reason
rather than given a number.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Write the PRD for the shift-handover digest — I've got the research and the edit log."
2. "Draft a PRD for the supplier-triage feature."
3. "Turn this discovery research into a PRD."
4. "Review our existing PRD against a proper template — is it any good?"
5. "I need the full product requirements document: segments, value propositions, release plan."

MUST NOT fire (3, naming the sibling each belongs to):
1. "I need a one-pager so my manager can approve this by Friday." → belongs to `one-pager-prd`
2. "Facilitate the PRD with the team across next week — we have nothing written down yet." → belongs to `prd-development`
3. "Help me frame the problem first — I can't yet say who's blocked or why it matters." → belongs to `problem-statement`

### Gate 1 result — **FAIL before this pack, PASS after**

This gate was scored statically, by reading the three PRD descriptions side by
side and checking whether a router could separate them. That is a real check and
it is reproducible; it is not a substitute for a live run.

**Before (commit `2502bc8` and earlier) — FAIL on all three MUST-NOT-fire cases.**
The description read:

> "…Use when writing a PRD, documenting product requirements, preparing a feature
> spec, or reviewing an existing PRD."

`one-pager-prd`'s description also claimed *"documenting product requirements"*;
`prd-development`'s `best_for` claimed *"Writing a complete PRD from scratch"*
and *"Structuring product requirements for an engineering handoff"*. Three
skills, the same trigger phrase.

**No description among the three named another of the three.** `create-prd` and
`prd-development` had no NOT-clause at all. `one-pager-prd` had one, but in the
body — *"Detailed technical design docs (use ADRs instead)… post-launch
retrospectives (use postmortem skill)"* — which does not help routing twice
over: the description is the only thing a router sees, and both destinations it
named (`ADRs`, a `postmortem` skill) do not exist in this marketplace.

So MUST-NOT #1 and #2 would both have fired this skill, and MUST-NOT #3 had
nothing to route to. A fellow saying "write a PRD" got whichever of the three
the router happened to rank first — with a 4× cost spread between them.

**After — PASS.** Each of the three now carries an explicit discriminator plus
NOT-clauses naming the other two:

| Skill | Discriminator | Routes away to |
|---|---|---|
| `one-pager-prd` | 1-2 pages, self-scored, for a go/no-go | `create-prd`, `prd-development`, `problem-statement` |
| `create-prd` | one pass over 8 sections, from material that exists | `one-pager-prd`, `prd-development`, `problem-statement` |
| `prd-development` | 8 facilitated phases, 2-4 days, content does not exist yet | `create-prd`, `one-pager-prd`, `problem-statement` |

The boundary is **cost and prerequisite**, not topic: one page vs one pass vs
four days, and whether the evidence already exists. That is checkable by a
router from the description alone, which is the only thing it sees.

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| 2026-09-03 | 1 — Trigger precision | **FAIL → PASS** | Static side-by-side of the three PRD descriptions. Failed all 3 MUST-NOT-fire cases before the SKILL.md patch in this pack; passes after. Detail above. |
| 2026-09-03 | 2 — Golden 01–05 | **SEEDED-UNSCORED** | Cases authored this pass. No live run executed, so no rubric score is recorded. |
| 2026-09-03 | 3 — Adversarial 01–03 | **SEEDED-UNSCORED** | Same. |
| 2026-09-03 | 4 — `supersedes` | n/a | Frontmatter declares no `supersedes`; nothing to retire. |

### Why Gates 2 and 3 are unscored

Scoring them means running the skill against each input and grading the produced
artifact. That was not done in this pass — the pass authored the cases and fixed
the SKILL.md defects the cases exposed. Recording a rubric total here without
having run anything would be a fabricated score, and this repo already has 22
suites at 22-for-22 pass with no failures logged. Adding a 23rd invented pass
would make the log less useful, not more.

**To close these gates:** run each of `golden/01–05.md` and
`adversarial/01–03.md` through the skill, score each produced artifact against
`rubric.json` (5 dimensions × 5, pass ≥ 21, no dimension < 4), and replace the
SEEDED-UNSCORED rows with per-case scores and evidence.

### Static SKILL.md audit against rubric.json (document review, not a run score)

This is an audit of what the SKILL.md now contains, dimension by dimension. It
is evidence that the cases *could* pass; it is not evidence that they *do*.

| Dimension | Present in SKILL.md? | Evidence |
|---|---|---|
| method_fidelity | yes | 8-section template intact and unmodified; a `## Route first` gate added ahead of it so the method is not run on the wrong request. |
| artifact_complete | yes | Named artifact is a saved `PRD-<product>.md`, 8 sections, save step explicit. |
| proprietary_edge | **partial** | The `[Fact]`/`[Assumption]`/`[Hypothesis]` requirement, the "a reader who disagrees can find the sentence to argue with" test, and the Section 7.4-as-load-bearing rule are studio additions not reachable from a generic PRD prompt. The 8-section template itself is upstream (productcompass.pm) and generic. Honest read: this dimension would score 3–4, not 5. |
| challenge | yes | Golden 03 routes away from itself; golden 04 refuses an oversized scope; adversarial 02 rejects output-as-objective; gotchas name the "fellow says PRD, means one-pager" misfire as the common failure. |
| evidence_standard | yes | Tagging is mandated in `## What good looks like` and enforced by golden 01/05 and the skill-specific auto-fail. |

**Known weakness, recorded rather than smoothed over:** `proprietary_edge` is
the soft dimension for this skill and will stay soft. It fills an upstream
template. The studio value is the routing gate, the evidence tagging, and the
review-not-rewrite behaviour — real, but a 5/5 on "could not have come from a
generic prompt" is not honestly available here. A judge who scores this 5/5 is
not reading the dimension.

**Auto-fail checks (static):** none triggered by the SKILL.md itself — no
fabricated data, no flattery, trigger scope is explicit with three sibling
routes, and the added content is specific rather than boilerplate. The
skill-specific auto-fail (filling a section the input did not support) is
enforced in golden 01, 04 and 05.
