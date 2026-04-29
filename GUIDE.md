# Utopia Skills Marketplace — Team Guide

A shared set of AI skills for Utopia Capital fellows, funds team, and staff. Installs in 30 seconds. No code needed.

> **Repo:** https://github.com/The-Utopia-Studio/skills
> **Maintainer:** Karan Pinto ([@kmjp](https://x.com/kmjp)) · karanmjpinto@gmail.com

---

## TL;DR (30-second version)

1. **Install [Claude Code](https://claude.com/claude-code)** on your laptop (one-time).
2. Inside Claude Code, run: `/plugin marketplace add The-Utopia-Studio/skills`
3. Install the pack for whatever you're working on:
   - Fellow in Module 2 (Discovery)? → `/plugin install utopia-studio-cobuild-discovery@skills`
   - Funds team doing tech DD? → `/plugin install utopia-funds-dd@skills`
4. That's it. Claude will now use those skills automatically when relevant.

Full details below.

---

## What is this?

This is a **plugin marketplace** for Claude Code. Think of it like an app store — except the "apps" are curated workflows that make Claude smarter at specific Utopia tasks.

Instead of re-explaining Utopia's frameworks to Claude every time you use it, install the right pack once and Claude knows:
- How we do customer discovery
- How we write pitch decks
- How we structure a TDD report
- What our brand voice is
- And 200+ more workflows

Packs are bundled by **module** (for fellows) or **function** (for funds team). Install only what you need — this keeps Claude fast and focused.

---

## Who is this for?

There are **three audiences**, each with their own track:

1. **Studio Fellows** — installs packs mapped to the 9 Cobuild modules (M1–M9)
2. **Funds / Investment Team** — installs `utopia-funds-*` packs for DD, modeling, research
3. **Internal Team / Maintainers** — the people running this marketplace in the background

---

## Prerequisites

You need Claude Code installed on your laptop.

**Install Claude Code** (one-time, ~2 min):

```bash
curl -fsSL https://claude.com/install.sh | sh
```

Or follow the [official install docs](https://docs.claude.com/en/docs/claude-code/quickstart).

After installing, open a terminal and run `claude` in any folder (doesn't have to be a code folder — it works anywhere).

---

## Step 1 — Register the Marketplace (do this once)

Inside Claude Code, type:

```
/plugin marketplace add The-Utopia-Studio/skills
```

You'll see a confirmation that the marketplace is registered. You only need to do this once per laptop.

---

## Step 2 — Install the Right Pack(s)

### If you're a Studio Fellow

Install the pack for the **module you're currently working on**. No need to install them all — install as you progress:

```
# M1 Fellow Onboarding
/plugin install utopia-studio-cobuild-onboarding@skills

# M2 Discovery & Problem Validation
/plugin install utopia-studio-cobuild-discovery@skills

# M3 Concept & Solution Design
/plugin install utopia-studio-cobuild-concept@skills

# M4 Legal & Entity Setup
/plugin install utopia-studio-cobuild-legal@skills

# M5 Brand & Identity
/plugin install utopia-studio-cobuild-brand@skills

# M6 Product & Technology
/plugin install utopia-studio-cobuild-product@skills

# M7 Go-to-Market
/plugin install utopia-studio-cobuild-gtm@skills

# M8 Fundraising Prep
/plugin install utopia-studio-cobuild-fundraising@skills

# M9 Operations & Finance
/plugin install utopia-studio-cobuild-ops@skills
```

**Recommendation:** install one at a time as you move through the program. When you graduate to the next module, add that pack too. You can uninstall old ones if they feel noisy.

### If you're on the Funds / Investment Team

Install what matches your workflow:

```
# Technical Due Diligence (audit a startup's tech)
/plugin install utopia-funds-dd@skills

# Financial Modeling & IB Toolkit (DCF, LBO, comps, tear sheets)
/plugin install utopia-funds-finance@skills

# Capital Markets (bonds, FX, options — for public-markets fellows)
/plugin install utopia-funds-markets@skills

# Research (Obsidian vaults, markdown, web extraction, papers)
/plugin install utopia-funds-research@skills
```

**Most common combo:** `utopia-funds-dd` + `utopia-funds-finance` + `utopia-funds-research`.

### If you're working on a specific portfolio engagement

These packs bundle skills tailored to active engagements. Install on top of your cobuild/funds packs.

```
# Azraq engagement (data-centre risk intelligence — IP, patents, moat, Notion, engine audits)
/plugin install utopia-azraq-engagement@skills

# Anyone pricing physical/emerging risks (Bayesian, forecasting, parametric insurance pricing)
/plugin install utopia-quant-pricing@skills
```

The Azraq pack bundles 47 skills across IP defensibility (patents, prior art, moat analysis, VRIO), Notion workflows (knowledge capture, meeting intelligence, research docs), engine audit (Trail of Bits security skills), risk matrix design crits, contract review, and quant pricing. Install once and have the full toolkit for the engagement.

---

## Step 3 — Use Claude Code

Now just use Claude Code normally. The skills trigger automatically based on what you ask:

- **Fellow in M2:** "I did 5 customer interviews, can you synthesize the themes and map them to JTBD?" → Claude uses the `summarize-interview` and `jobs-to-be-done` skills automatically.

- **Funds team on DD:** "Run a security audit on this GitHub repo: github.com/startup/app" → Claude uses the `security-auditor` + `repo-scanner` skills automatically.

- **Fellow in M8:** "Build me a 12-slide pitch deck from these Granola notes" → Claude uses the `pitch-deck` skill with Utopia branding.

You don't have to call skills by name. Claude figures out which one is relevant. If it picks the wrong one, just tell it which to use.

---

## Step 4 — Update Packs (weekly / monthly)

The marketplace gets updates as we add new skills, fix existing ones, and improve coverage. To pull updates:

```
/plugin marketplace update skills
```

Then reinstall any pack you want to refresh:

```
/plugin install utopia-studio-cobuild-gtm@skills
```

---

## For the Internal Team / Maintainers

This is for whoever is running the marketplace in the background (currently Karan).

### Adding a new skill

1. Install the skill locally (e.g., `npx skills add some-repo/some-skill --yes`)
2. Copy it into the right category folder in [`skills/`](./skills/) — e.g., `skills/discovery/my-new-skill/`
3. Decide which pack(s) it belongs to — edit [`packs.config.json`](./packs.config.json) and add the skill name to those packs' `skills` array
4. Run `./build-packs.sh` (requires `jq` — `brew install jq`)
5. Commit and push

Example:
```bash
npx skills add someone/cool-skills --yes
cp -r ~/.agents/skills/cool-skill skills/gtm/
# Edit packs.config.json — add "cool-skill" to utopia-studio-cobuild-gtm
./build-packs.sh
git add -A && git commit -m "Add cool-skill to M7 GTM pack" && git push
```

### Adding a new pack

Edit [`packs.config.json`](./packs.config.json) and add a new pack entry:

```json
{
  "name": "utopia-studio-cobuild-community",
  "description": "M10 Community Building — ...",
  "version": "1.0.0",
  "keywords": ["community", "fellow", "m10"],
  "skills": ["skill-1", "skill-2", ...]
}
```

Then `./build-packs.sh && git push`. Fellows get it via `/plugin marketplace update skills`.

### Measuring adoption (recommended)

Add the optional [skill-usage logging hook](./hooks/README.md) to see which skills are actually being used. Helps you spot:
- Packs fellows love (build more like them)
- Skills that never fire (description is bad, or the skill isn't useful)
- Gaps where fellows ask for things the marketplace doesn't cover

### Known gaps to fill

Flagged in [`SKILL_TAXONOMY.md`](./SKILL_TAXONOMY.md):

1. **M4 Legal** — no MENA/GCC jurisdiction-aware cap table or entity setup skill. Build as a proprietary Studio skill.
2. **M9 Ops** — no agentic customer ops or NPS tracking skill. Strong candidate for a Studio build.
3. **Product Verification** — no skills that actually test Claude's output works (Playwright, visual regression, etc.).

### Docs in this repo

| File | Purpose |
|------|---------|
| [`README.md`](./README.md) | Full marketplace docs — pack lists, skill categories, install options |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | How fellows or team can propose new skills. Sandbox → graduation flow. |
| [`SKILL_TAXONOMY.md`](./SKILL_TAXONOMY.md) | All skills mapped to Anthropic's 9-category taxonomy, surfaces gaps |
| [`packs.config.json`](./packs.config.json) | Single source of truth for which skills are in which packs |
| [`build-packs.sh`](./build-packs.sh) | Regenerates `plugins/` from the config file |
| [`hooks/`](./hooks/) | Optional skill-usage logging hook |

---

## FAQ

**Q: I don't code. Is Claude Code still useful for me?**
A: Yes. You use it like ChatGPT or Claude.ai — in a chat window. It just happens to run in a terminal. The skills here are for strategy, discovery, fundraising, design — not just engineering.

**Q: What if I install a pack and don't like it?**
A: Uninstall with `/plugin uninstall <pack-name>@skills`. No consequences.

**Q: Can I install all packs at once?**
A: Technically yes, but not recommended. Each skill adds to Claude's context. More skills = slower, more confused Claude. Install only what you need for current work.

**Q: What if a skill does something wrong?**
A: DM Karan. Skills are improved as we find edge cases. That's what a Gotchas section is for — so the next person doesn't hit the same issue.

**Q: Can I use this with Cursor / Windsurf / ChatGPT Code instead of Claude Code?**
A: Most skills work with any tool that supports the Agent Skills standard. Cursor and Windsurf work out of the box. ChatGPT Code has partial support. Claude Code is where everything is tested.

**Q: Is this open source?**
A: The repo is public. Skills come from a mix of public repos (credited in [`README.md`](./README.md)) and some Utopia-proprietary skills (like `pitch-deck`, `technical-dd`). Fellows and team can use all of them freely.

**Q: How do I share my own skills with the team?**
A: Drop them in [`skills/sandbox/`](./skills/sandbox/) with a PR. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full flow.

---

## Quick Reference Card

Print this page or pin it in Slack.

```
# Register (do once)
/plugin marketplace add The-Utopia-Studio/skills

# Install a fellow module pack
/plugin install utopia-studio-cobuild-<module>@skills
  where <module> is: onboarding, discovery, concept, legal,
                     brand, product, gtm, fundraising, ops

# Install a funds team pack
/plugin install utopia-funds-<purpose>@skills
  where <purpose> is: dd, finance, markets, research

# Update all packs
/plugin marketplace update skills

# Uninstall a pack
/plugin uninstall <pack-name>@skills
```

---

**Questions?** Ask Karan on Slack or email karanmjpinto@gmail.com.
