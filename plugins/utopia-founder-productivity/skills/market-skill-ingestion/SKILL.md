---
name: market-skill-ingestion
description: Fires when a fellow proposes bringing an external/market skill into the studio repo — "found a skill for X on skills.sh", "should we add this market skill", "ingest the good parts of <repo/skill>", "there's a public skill that does Y", "pull this skill in", "vet this skill from the ecosystem". Produces an Ingestion Decision Record plus a FOLD / SUPERSEDE / REJECT / ADD-NEW decision and the concrete diff into an existing studio skill. NOT for authoring a brand-new proprietary skill from scratch (use the CONTRIBUTING sandbox flow) and NOT for installing a skill for one-off personal use (use `find-skills`).
type: interactive
supersedes: none
---

# Market Skill Ingestion

## What it does

Turns "here's a good public skill" into one of four decisions and, in the common case, a diff. A market skill is raw material, not a shelf item. This skill extracts the load-bearing value, finds where it already belongs in the studio set, and either folds it in, supersedes a weaker incumbent, rejects it, or (rarely) admits it as new surface. The output is a filled Ingestion Decision Record (`template.md`) and the concrete change to a target studio skill — never a copied folder.

## The rule

**Every market skill is, by default, folded into an existing studio skill or rejected. It is never added as new surface, and never vendored wholesale.**

The studio optimises for a small premium set. [Fact] Every skill Claude can load costs context for every fellow on every session. So net-new surface has to earn that recurring cost, not just be "good in isolation". The generic instinct is to `npx skills add` and drop the folder in a category. That is exactly the noise this skill exists to stop. [Fact] `skills/product/product-manager-skills/` is a full external repo vendored wholesale — README, CHANGELOG, LICENSE, `package.json`, `bin/`, `docs/`, `templates/` all still present. That is the failure mode: one useful idea buried under a repo's worth of dead weight.

Adoption and behaviour outrank author opinion. A skill's install count and real usage are evidence; its README's self-description is not. Weigh the former.

## When to use / When NOT

Use this when the source is external and the question is "does this belong in OUR set".

| Situation | Use this? | Use instead |
|---|---|---|
| "Found a skill on skills.sh, should we add it?" | Yes | — |
| "Ingest the good parts of `owner/repo@skill`" | Yes | — |
| "There's a public skill that does Y — pull it in" | Yes | — |
| "Install a skill so I can use it once, right now" | No | `find-skills` |
| "Write a brand-new proprietary skill from scratch" | No | CONTRIBUTING sandbox flow |
| "This studio skill overlaps another studio skill" | No | CONTRIBUTING "Kill duplicates" / a consolidation PR |

Do not poach `find-skills`. That skill discovers and installs for personal use and stops there. This one decides whether external value enters the *shared, curated* repo and mutates it. Different job.

## Method

Run the pipeline in order. Do not skip QUALIFY to get to the interesting part — a low-signal source is a fast REJECT and saves the rest of the work.

### 1. QUALIFY

Apply the `find-skills` quality gate before anything else — install count, source reputation, GitHub stars. See `skills/meta/find-skills/SKILL.md` (the "Verify Quality Before Recommending" section); do not restate it here. Bands as a reminder only: ≥1K installs good, <100 caution. A low-signal source (unknown author, thin repo, no adoption) is a REJECT now — record it and stop.

### 2. LOCATE the incumbent(s)

Find which studio skill(s) already overlap by category and trigger. The default assumption is that one exists.

```bash
# Category first (taxonomy has 9; blur confuses Claude and fellows)
ls skills/<category>/
# Compare on trigger, not title — grep descriptions
grep -ri "<candidate trigger phrase>" skills/*/*/SKILL.md
```

List every incumbent that shares the candidate's job. If two or more overlap, the candidate is almost certainly a FOLD or a REJECT, not new surface.

### 3. DISTILL the bones

Extract only the load-bearing, non-obvious value. Write one short list: "what's actually good here". Everything else is discarded.

| Keep (the bones) | Discard (the noise) |
|---|---|
| A non-obvious method, threshold, or checklist | README, CHANGELOG, LICENSE, `package.json`, `bin/` |
| A template or script that does deterministic work | Restated defaults Claude already knows |
| A sharp trigger boundary or gotcha | Prose that repeats basic domain knowledge |
| A specific table/rubric worth reusing | Marketing copy, badges, contributor lists |

If the bones list is empty or is all things a generic prompt would already produce, that is a REJECT. Say so.

### 4. DECIDE (the gate)

Exactly one of four. FOLD is the default; ADD-NEW is rare and must clear the rubric.

| Decision | Choose when | Action |
|---|---|---|
| **FOLD** (default) | The bones overlap an incumbent's category + trigger | Patch the distilled value into the incumbent skill; add a provenance line |
| **SUPERSEDE** | A studio skill does the same job worse | The adapted skill sets `supersedes: <incumbent path>`, absorbs its useful bones, and beats it; retire the incumbent |
| **REJECT** | Duplicate, obvious, or low-signal source | State the one-line reason; stop |
| **ADD-NEW** (rare) | Clears every bar in `references/ingestion-rubric.md` AND fills a *named* SKILL_TAXONOMY gap | Create in `skills/sandbox/` first, then graduate via CONTRIBUTING |

ADD-NEW is not a default escape hatch. If any rubric bar fails, downgrade to FOLD or REJECT. Naming a gap is not enough on its own — the rubric must also hold.

### 5. EMIT the change

Produce the concrete mutation, not a vibe.

- FOLD / SUPERSEDE: describe the diff to the target studio skill — which section, which added lines, which `supersedes:` value if used. A patch description, not a pasted folder.
- Every decision that lands value carries a one-line provenance record: `Adapted from <source-url>` in the target skill (see `problem-statement`'s "Provenance" line for the house pattern).
- Never copy the raw skill directory into `skills/`. If you catch yourself running `cp -r <vendored-repo> skills/…`, stop — that is the anti-pattern.

### 6. RECORD

Fill `template.md` (the Ingestion Decision Record) for the candidate. If the decision changed a studio skill, flag it for the usage-telemetry review: `hooks/log-skill-usage.sh` logs which skills actually fire, so a later pass can check whether the folded value earns its place or should be cut.

## Evidence standard

Curation weighs behaviour and adoption over opinion, the same ladder the product skills use: real usage / install count (behaviour) outranks a README's claim about itself (opinion). Tag each judgement:

- [Fact] for the source's install count, star count, and what its files literally contain.
- [Assumption] for "this overlaps incumbent X" until you have grepped and confirmed the trigger overlap.
- [Hypothesis] for "fellows will use the folded value" — the `log-skill-usage.sh` telemetry is what later confirms or kills it.

Done means: an Ingestion Decision Record exists, the decision is one of the four, and (for FOLD/SUPERSEDE) the emitted diff and provenance line are written. A decision with no target skill named and no reason is not done.

## Gotchas

- **ADD-NEW as the lazy default.** The interesting-sounding path is a new skill. It is also the one that grows the noise this skill exists to prevent. Force it through the rubric every time; most candidates come out as FOLD.
- **Grading the README, not the skill.** A polished README oversells thin value. Judge the bones and the adoption numbers, not the prose.
- **Folding into the wrong incumbent.** Overlap by *title* is not overlap by *trigger*. Two skills can share a name and do different jobs. Grep the descriptions and match on what actually fires them.
- **Silent vendoring.** Copying "just the folder for now, we'll clean it later" never gets cleaned. The `product-manager-skills` repo is the proof. Emit a diff or reject; there is no "temporary" wholesale copy.
- **Superseding without beating.** Setting `supersedes:` does not make the new skill better. If it does not absorb the incumbent's useful bones and clearly win, it is a FOLD into the incumbent, not a supersede.
- **The middle install band.** A source between the reminder bands (roughly 100–1K installs) is CAUTION, not a REJECT — proceed to DISTILL and let the bones decide, don't short-circuit on the number alone. Only a genuinely low-signal source (well under 100, unknown author, thin repo) is a QUALIFY-stage reject.

## Related skills

- `skills/meta/find-skills/SKILL.md` — discovers and installs skills for personal use, and owns the quality gate this skill reuses in step 1. It stops at "installed"; this skill decides repo entry.
- `skills/meta/skillshare/SKILL.md` — the mechanics of installing, tracking, and auditing skills across tools. Use it to fetch a candidate locally for distillation; it does not make the curation decision.
- `CONTRIBUTING.md` — the sandbox → graduate flow and the "Kill duplicates / Don't write the obvious / Prefer scripts over prose" curation principles this pipeline enforces. ADD-NEW routes back through it.
- `SKILL_TAXONOMY.md` — the 9 categories and the named gaps (Data Retrieval, Code Templates, Runbooks). Only a named gap can justify ADD-NEW.
