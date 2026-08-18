# Contributing

How to propose, share, and graduate skills in this marketplace.

## Submit with your AI (fastest path)

Paste this into Claude, Cursor, or any capable agent — you don’t need to know git:

```
Fetch https://raw.githubusercontent.com/The-Utopia-Studio/skills/main/CONTRIBUTING.md and follow the sandbox → module graduation flow.

Interview me thoroughly about my skill — when it runs, what it produces, the full playbook with branches, real numbers/rubrics, worked examples, what experts notice first, common mistakes, and what good looks like.

Draft it as skills/sandbox/<skill-name>/SKILL.md with Utopia frontmatter (name + trigger-condition description). Put depth in references/ if needed. Then open a PR (or give me the files if you can’t use git).

Do not invent vendor lock-in. Use GTM/product verbs. Encode judgment, not a bare checklist.
```

The bar: **judgment, not steps**. A skill that is only a checklist gets sent back. Include a concrete “what good looks like,” real numbers where you score things, and at least one worked example.

## The Sandbox → Pack Flow

Based on the pattern Anthropic's Claude Code team uses internally. The goal: let anyone propose skills without overloading the default packs that every team member loads.

```
   idea
    │
    ▼
 sandbox/          ← experimental, anyone can add here, PR review light
    │
    ▼  (battle-tested, actually used, consistent quality)
    │
 skills/<module>/     ← official source of truth (gtm|product|investments|founder-productivity)
    │
    ▼
 packs.config.json ← added to a pack so team installs it
```

## Proposing a New Skill

**1. Create it in `skills/sandbox/<skill-name>/`**

Minimum structure:

```
skills/sandbox/my-skill/
└── SKILL.md
```

`SKILL.md` frontmatter:

```markdown
---
name: my-skill
description: One sentence. Written AS CONDITIONS FOR WHEN TO TRIGGER, not as a summary. E.g. "Use when the user asks to build X, mentions Y, or needs Z."
---

# My Skill

## What it does
...

## What good looks like
...

## Gotchas
- Real mistakes Claude makes when using this skill (update as you find them)

## Examples
...
```

**2. Test it**

Use it in real work for a few days. Record every time Claude misunderstands or goes off-track — those go into the Gotchas section.

**3. Share**

Open a PR, or post a link to the branch in Slack / the team forum. Get at least one other person to try it.

## Graduating a Skill

A skill is ready to graduate when it meets all of these:

- [ ] You (or someone else) has used it 5+ times in real work
- [ ] Gotchas section exists and reflects real edge cases
- [ ] Description is written as **trigger conditions**, not a summary
- [ ] Doesn't duplicate an existing skill (check by module first)
- [ ] Has at least one concrete example
- [ ] Encodes judgment (what good looks like / rubrics), not a bare checklist

**To graduate:**

1. Move `skills/sandbox/<skill>/` → `skills/<module>/<skill>/` (one of: `gtm`, `product`, `investments`, `founder-productivity`)
2. Add the skill name to that module's pack in `packs.config.json`
3. Run `./build-packs.sh`
4. Open a PR explaining: what problem it solves, who asked for it, gotchas found so far

## Modules

Skills live in one of four modules. When proposing, pick the best fit:

1. **GTM** (`skills/gtm/`) — sales, marketing, growth, retention, distribution
2. **Product** (`skills/product/`) — discovery, design, build, deploy, product metrics
3. **Investments** (`skills/investments/`) — DD, finance, fundraising, markets, quant
4. **Founder Productivity** (`skills/founder-productivity/`) — everything else (onboarding, legal, knowledge tools, agents)

If a skill blurs modules, put it in Founder Productivity rather than duplicating. See [SKILL_TAXONOMY.md](./SKILL_TAXONOMY.md).

## Curation Principles

When reviewing a proposal:

- **Don't write the obvious** — Claude already knows basic coding. The skill should push past defaults.
- **Leave flexibility** — overly specific instructions backfire. Give Claude what it needs, let it adapt.
- **Prefer scripts over prose** — if a skill can ship a script that does the work deterministically, it should.
- **Kill duplicates** — if a new skill overlaps with existing one, either merge or reject.
- **Reject thin checklists** — no judgment, no numbers, no “what good looks like” → send back.

## The Ingestion Rule — premium, not noise

The studio takes the best of the open skill ecosystem, but it does not accumulate it. Every skill Claude can load costs context for every fellow on every session, so the shared set is kept small and premium on purpose.

**The rule: every external ("market") skill is, by default, folded into an existing studio skill or rejected. It is never added as new surface, and never vendored wholesale.**

When you find a good public skill, run the [`market-skill-ingestion`](./skills/meta/market-skill-ingestion/SKILL.md) skill. It qualifies the source, finds the incumbent studio skill it overlaps, distills only the load-bearing value, and returns one of four decisions:

| Decision | When | Result |
|---|---|---|
| **FOLD** (default) | the value overlaps an existing skill's job | patch the value into that skill + a provenance line |
| **SUPERSEDE** | a studio skill does the same job worse | the adapted skill sets `supersedes:` and beats it; retire the incumbent |
| **REJECT** | duplicate, obvious, or low-signal source | one-line reason, stop |
| **ADD-NEW** (rare) | clears the ingestion rubric AND fills a named [taxonomy](./SKILL_TAXONOMY.md) gap | sandbox → graduate as normal |

Banned: `npx skills add <repo>` followed by `cp -r` of the folder into `skills/`. That is how `skills/product/product-manager-skills/` ended up carrying an entire external repo (README, CHANGELOG, `package.json`, `bin/`). Emit a diff or reject — there is no "temporary" wholesale copy.

**Provenance convention.** A skill that supersedes another declares it in frontmatter: `supersedes: skills/<module>/<skill>` (or `none`). A skill that folded in external value carries a one-line `Adapted from <source-url>` in its body. This keeps provenance queryable instead of buried in prose.

## Writing Good Descriptions

The `description` field in SKILL.md is the **only thing Claude sees when deciding whether to use the skill**. It's a trigger condition, not a summary.

**Bad:** `"A skill for generating diagrams"`
**Good:** `"Use when the user asks for architecture diagrams, flowcharts, sequence diagrams, or ER diagrams. Output is standalone HTML + inline SVG."`

Good descriptions include:
- Concrete trigger phrases the user might say
- What the output looks like
- When NOT to use it (if it overlaps with a similar skill)

## Questions?

Ask Karan (@kmjp) or open an issue.
