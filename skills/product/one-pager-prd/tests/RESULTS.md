# Eval log — one-pager-prd

Author agent seeds the cases; the judge scores. Gates that could not be honestly
scored in this pass are marked **SEEDED-UNSCORED** with the reason.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Write a one-pager for bulk CSV export — I need my VP to approve it Thursday."
2. "I need a short spec to get this approved."
3. "Feature proposal for the exec review."
4. "Scope this before we start designing it."
5. "My VP says my one-pager's metrics aren't specific enough — fix it."

MUST NOT fire (3, naming the sibling each belongs to):
1. "Give me the full 8-section long-form PRD — market segments, value propositions, release plan." → belongs to `create-prd`
2. "Facilitate the PRD with design and engineering across next week; we have nothing written down." → belongs to `prd-development`
3. "I can't yet say who's blocked or why it matters — help me frame the problem." → belongs to `problem-statement`

### Gate 1 result — **FAIL before this pack, PASS after**

Scored statically, by reading the three PRD descriptions side by side. This is a
reproducible check on the only text a router sees; it is not a live run.

**Before — FAIL on MUST-NOT #1 and #2.** The description claimed
*"documenting product requirements"*, *"documenting product requirements"* again
via *"product requirements"*, and *"one-pagers **and PRDs**"* — actively
claiming the long-form artifact that belongs to `create-prd`. The body carried a
`When NOT to use` line, but it routed to `ADRs` and a `postmortem skill`,
**neither of which exists in this marketplace**, and named none of the two
sibling PRD skills. MUST-NOT #3 had no destination.

**After — PASS.** The description now leads with the discriminator (*1-2 page
decision-ready spec that gets a go/no-go, self-scored against a rubric*), and
carries NOT-clauses naming `create-prd`, `prd-development` and
`problem-statement`. The body's `When NOT to use` is now a routing table where
every destination resolves on disk, and the two non-existent destinations are
called out as having no skill to route to rather than being cited as if they
did.

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| 2026-09-03 | 1 — Trigger precision | **FAIL → PASS** | Static three-way description comparison. Failed MUST-NOT #1 and #2 before this pack's SKILL.md patch; #3 had no destination. Passes after. |
| 2026-09-03 | 2 — Golden 01–05 | **SEEDED-UNSCORED** | Cases authored this pass; no live run executed. |
| 2026-09-03 | 3 — Adversarial 01–03 | **SEEDED-UNSCORED** | Same. |
| 2026-09-03 | 4 — `supersedes` | n/a | No `supersedes` declared. |

### Why Gates 2 and 3 are unscored

Scoring them means running the skill on each input and grading the page it
produces against `rubric.json`. That was not done in this pass. A number here
would be invented, and this repo already carries 22 suites with a 22-for-22 pass
rate and no logged failures — a 23rd invented pass would reduce the log's value.

**To close these gates:** run `golden/01–05.md` and `adversarial/01–03.md`,
score each output against `rubric.json` (5 × 5, pass ≥ 21, no dimension < 4),
and replace the SEEDED-UNSCORED rows with per-case scores.

Note one measurable sub-check a judge can run cheaply and should: **golden 01's
output must be ≤ 2 pages and must contain a computed rubric average.** Both are
mechanically checkable, and both are skill-specific auto-fails in
`rubric.json`.

### Static SKILL.md audit against rubric.json (document review, not a run score)

| Dimension | Present in SKILL.md? | Evidence |
|---|---|---|
| method_fidelity | yes | 5-step workflow with a copyable progress checklist; Step 4 is a self-assessment gate against a shipped rubric file, not a vibe check. |
| artifact_complete | yes | Named artifact `one-pager-prd.md`, required sections listed, ship gate stated (rubric average ≥ 3.5). |
| proprietary_edge | **partial** | Two genuinely non-generic parts: length as a hard constraint with a self-scoring gate, and the Guardrails' ❌→✓ rewrites ("users want better search" → "users abandon search after 3 failed queries (30% of sessions)"). The rest — problem/solution/metrics/scope — is standard PM structure. Honest read: 3–4, not 5. |
| challenge | yes | Red Flags section names solution-looking-for-problem and scope creep; golden 03 refuses invented baselines; golden 04 argues the artifact is not worth its cost; adversarial 02 rejects capability-gap-as-problem. |
| evidence_standard | **strengthened but upstream-thin** | The skill demands validation ("cite data, not assumptions") and baselines + targets, which is real. It does **not** natively use `[Fact]`/`[Assumption]`/`[Hypothesis]` tags — that requirement enters only through the golden cases (01, 05) and the rubric. A judge should expect tags in outputs and will not find the convention in the SKILL.md body. **This is a known gap left open deliberately** rather than retrofitting the tag convention onto an upstream skill mid-pass; see below. |

**Open item for the next pass (not silently fixed here):** `one-pager-prd` and
the Icarus evidence-ladder convention disagree. Icarus skills tag every claim
`[Fact]`/`[Assumption]`/`[Hypothesis]`; this skill inherits a
validated/not-validated binary from upstream. The rubric's `evidence_standard`
dimension is written in Icarus terms, so scoring this skill against it will
penalise it for a convention its own body never asks for. Either the tag
convention gets folded into the SKILL.md body, or `evidence_standard` needs a
skill-local definition. **Do not score Gate 2 until that is decided** — the
result would be noise either way.

**Auto-fail checks (static):** none triggered by the SKILL.md. The two
skill-specific auto-fails (over 2 pages; missing or claimed-but-uncomputed
rubric score) are mechanically checkable at run time and are exercised by
golden 01 and 02.
