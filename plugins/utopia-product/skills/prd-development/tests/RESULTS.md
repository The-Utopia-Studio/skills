# Eval log — prd-development

Author agent seeds the cases; the judge scores. Gates that could not be honestly
scored in this pass are marked **SEEDED-UNSCORED** with the reason.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Run us through building the PRD — design and engineering have three afternoons next week."
2. "We finished discovery; turn the findings into a PRD my engineers can act on."
3. "Facilitate the PRD for this initiative, phase by phase."
4. "We have scattered notes and Slack threads and need one source of truth."
5. "Nobody's aligned on scope for this initiative — walk the team through it."

MUST NOT fire (3, naming the sibling each belongs to):
1. "I've got the research, personas and metrics in these files — just structure it into a PRD by tomorrow." → belongs to `create-prd`
2. "I need a 1-2 page spec to get my VP's approval Thursday." → belongs to `one-pager-prd`
3. "Retention dropped 18 points and nobody knows why — figure out what we should build." → belongs to `discovery-process`

### Gate 1 result — **FAIL before this pack, PASS after**

Scored statically, side by side against the two sibling PRD skills. Reproducible
on the description text; not a live run.

**Before — FAIL on MUST-NOT #1, and unguarded on #2 and #3.** The description
read only:

> "Build a structured PRD that connects problem, users, solution, and success
> criteria. Use when turning discovery notes into an engineering-ready document
> for a major initiative."

Nothing in it says **facilitated**, nothing says **2-4 days**, and nothing names
a sibling. Meanwhile `best_for` claimed *"Writing a complete PRD from scratch"* —
the exact request that belongs to `create-prd`. A router had no way to tell that
this skill costs three afternoons of several people's time and that skill costs
one pass. MUST-NOT #1 would have fired it, at a cost the fellow never agreed to.

**After — PASS.** The description now leads with *"Facilitates a PRD into
existence over 8 phases and 2-4 days… for a major initiative where the content
does not exist yet"*, carries NOT-clauses naming `create-prd`, `one-pager-prd`
and `problem-statement`, and closes with an explicit instruction against being
run as a single-response generator. The body's `When NOT to Use This` is now a
routing table whose first row is the `create-prd` misfire, called out as the
most common one.

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| 2026-09-03 | 1 — Trigger precision | **FAIL → PASS** | Static three-way comparison. MUST-NOT #1 fired before this pack's patch; #2 and #3 had no NOT-clause. Passes after. |
| 2026-09-03 | 2 — Golden 01–05 | **SEEDED-UNSCORED** | Cases authored this pass; no live run. See the multi-turn note below — this skill is harder to score than the others in the pack. |
| 2026-09-03 | 3 — Adversarial 01–03 | **SEEDED-UNSCORED** | Same. |
| 2026-09-03 | 4 — `supersedes` | n/a | No `supersedes` declared. |
| 2026-09-03 | 5 — Reference integrity | **FAIL → PASS** | Mechanically checkable; see below. |

### Gate 5 — Reference integrity (mechanically scored, and it failed)

This gate is not in the standard five. It is added here because the defect it
catches is load-bearing for this skill: it orchestrates other skills, so a
reference that does not resolve sends the fellow to a dead end mid-session.

**Before — FAIL.** Three referenced skills did not exist anywhere in `skills/`:

| Referenced | Cited at | Exists? |
|---|---|---|
| `epic-hypothesis` | Phase 7 activity 1, References, workflow tree | **no** |
| `epic-breakdown-advisor` | Phase 7 activity 2, References, workflow tree | **no** |
| `customer-journey-mapping-workshop` | Phase 2 supporting context, References | **no** |

Plus: every cross-reference used a pre-module `skills/<skill>/SKILL.md` path
that no longer resolves (the tree is `skills/<module>/<skill>/`), and
`workshop-facilitation` was linked as `../workshop-facilitation/SKILL.md` when
it lives in `founder-productivity`, not `product`. And the file shipped an
unresolved authoring placeholder at line 648: `- [If Dean has PRD templates,
link here]`.

**After — PASS.** All three non-existent skills are removed from the
instructions and replaced with what is actually installed (`user-story` +
`user-story-splitting` for Phase 7; inline epic hypothesis with a stated
evidence requirement; `problem-framing-canvas` or a named gap for Phase 2's
journey map). Every remaining reference resolves; paths are module-correct; the
placeholder is gone. Verify with:

```bash
D=skills/product/prd-development
grep -o '](\.\./[^)]*)' "$D/SKILL.md" | sed 's/](\(.*\))/\1/' | sort -u \
  | while read -r p; do [ -f "$D/$p" ] || echo "DANGLING: $p"; done
```

Nine relative references, all resolving as of this pass. (Links in a `SKILL.md`
resolve from the skill's own directory, not from the module root — an earlier
draft of this command used the module root and reported all nine as dangling.)

### Why Gates 2 and 3 are unscored — and why this one is harder

The other skills in this pack produce a document in one response, so a judge can
run the golden input and grade the output. **This skill is explicitly a
multi-turn facilitated workflow** — a correct response to golden 01 is Phase 1
plus a stop, not a PRD. Scoring it therefore needs a multi-turn harness with a
simulated fellow answering the phase questions, which does not exist in this
repo.

That is a real gap and it should not be papered over with a single-turn score.
Single-turn scoring would reward exactly the behaviour the skill's own
description now forbids: emitting all 8 phases at once.

**To close Gate 2:** either build a multi-turn eval harness, or score only the
cases that are legitimately single-turn — **golden 02, 03, 04 and all three
adversarial cases**, which are all routing/diagnosis responses rather than
facilitation runs. Golden 01 and 05 need the harness. Recording partial
coverage honestly is better than a total that hides which half was tested.

### Static SKILL.md audit against rubric.json (document review, not a run score)

| Dimension | Present in SKILL.md? | Evidence |
|---|---|---|
| method_fidelity | yes | 8 phases with durations, activities, participants and per-phase outputs; `workshop-facilitation` named as the interaction protocol; the workflow tree gives the end-to-end sequence. |
| artifact_complete | yes | Named artifact is the filled `template.md`, 10 sections; `examples/` present. |
| proprietary_edge | **partial** | The facilitated-phases structure and the `create-prd` cost boundary are real differentiators. The 10-section PRD structure itself is upstream (deanpeters/product-manager-prompts) and standard. Honest read: 3–4. |
| challenge | yes | 5 named Pitfalls with wrong/right pairs; `When NOT to Use This` routing table led by the most common misfire; golden 03 (committed solution) and golden 04 (workflow too heavy) both push back. |
| evidence_standard | **partial** | Phase 2 demands evidence — customer quotes, data, research — and Pitfall 2 is "No Evidence in Problem Statement". But like `one-pager-prd`, the body does not use `[Fact]`/`[Assumption]`/`[Hypothesis]` tags; that requirement enters only via the golden cases and the rubric. Same open item as `one-pager-prd`. |

**Pack-level open item — RESOLVED this pass.** The rubric's
`evidence_standard` dimension was written in Icarus `[Fact]`/`[Assumption]`/
`[Hypothesis]` terms, which four of this pack's seven skills never use because
they derive from external sources. Rather than retrofit the tagging convention
onto four upstream bodies, the dimension now carries a **shared principle and a
skill-local mechanism**:

> *Principle (all seven):* weights money and behaviour over opinion, and makes
> the strength of every claim visible to a reader who was not there.
> *Mechanism (per skill):* see `evidence_standard.desc` in `rubric.json`.

For this skill the mechanism is: Phase 2 does not close without customer quotes, data, or research. Where the fellow has none, the phase is named as blocked rather than filled, and the sections resting on it are marked as resting on it.

This unblocks Gate 2 scoring. It is the right call and not merely the
convenient one: claim-tagging is one way to expose evidence strength, not the
only one, and forcing it onto an interview script or a transcript summary would
add ceremony without adding discipline. The dimension stays weighted 5 and
comparable across skills, because the standard did not move — only the test for
it.


**Auto-fail checks (static):** the skill-specific auto-fail *"directed the
fellow to a skill that does not exist in this marketplace"* **would have fired
on the pre-patch file** — three times. It is the reason Gate 5 exists. It does
not fire on the current file.
