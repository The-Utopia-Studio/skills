# Utopia Skills Marketplace — Team Guide

A shared set of AI skills for Utopia Capital fellows, funds team, and staff. Installs in ~2 minutes. No code needed.

> **Repo:** https://github.com/The-Utopia-Studio/skills
> **Maintainer:** Karan Pinto ([@kmjp](https://x.com/kmjp)) · karanmjpinto@gmail.com
>
> **Just want to install?** → [**INSTALL.md**](./INSTALL.md) (copy one prompt and you're done)

---

## TL;DR — paste this into Claude Code

```
Install the Utopia Skills marketplace for me.

1. Register the marketplace:
   /plugin marketplace add The-Utopia-Studio/skills

2. Install all four modules:
   /plugin install utopia-gtm@skills
   /plugin install utopia-product@skills
   /plugin install utopia-investments@skills
   /plugin install utopia-founder-productivity@skills

3. Confirm what's installed and tell me how to update later with:
   /plugin marketplace update skills

If any step fails, explain what went wrong and how to fix it.
Don't invent pack names — use only the four above.
```

Or follow the step-by-step below / in [INSTALL.md](./INSTALL.md).

---

## What is this?

This is a **plugin marketplace** for Claude Code. Think of it like an app store — except the "apps" are curated workflows that make Claude smarter at specific Utopia tasks.

Instead of re-explaining Utopia's frameworks to Claude every time you use it, install the right pack once and Claude knows:
- How we do customer discovery
- How we write pitch decks
- How we structure a TDD report
- What our brand voice is
- And 200+ more workflows

Packs are bundled into **four modules**. Install only what you need — this keeps Claude fast and focused.

---

## Who is this for?

1. **Studio Fellows** — building companies; usually start with Product + GTM
2. **Funds / Investment Team** — DD, modeling, markets → Investments
3. **Internal Team / Maintainers** — running this marketplace

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

Four modules. Install the one that matches the work you're doing:

```
# Go-to-Market — sales, marketing, growth, retention
/plugin install utopia-gtm@skills

# Product — discovery, design, build, deploy, product metrics
/plugin install utopia-product@skills

# Investments — DD, modeling, valuation, fundraising, markets
/plugin install utopia-investments@skills

# Founder Productivity — onboarding, legal, knowledge tools, agents
/plugin install utopia-founder-productivity@skills
```

**Common combos:**
- Fellow building: `utopia-product` + `utopia-gtm`
- Funds team: `utopia-investments` (+ `utopia-founder-productivity` for Obsidian/Proof/agents)
- Full stack: install all four

---

## Step 3 — Use Claude Code

Now just use Claude Code normally. The skills trigger automatically based on what you ask:

- **Discovery:** "I did 5 customer interviews, can you synthesize the themes and map them to JTBD?" → uses Product discovery skills.
- **DD:** "Run a security audit on this GitHub repo" → uses Investments DD skills.
- **Fundraising:** "Build me a 12-slide pitch deck from these Granola notes" → uses the `pitch-deck` skill.

You don't have to call skills by name. Claude figures out which one is relevant. If it picks the wrong one, just tell it which to use.

---

## Step 4 — Update Packs (weekly / monthly)

The marketplace gets updates as we add new skills, fix existing ones, and improve coverage. To pull updates:

```
/plugin marketplace update skills
```

Then reinstall any pack you want to refresh:

```
/plugin install utopia-gtm@skills
```

---

## For the Internal Team / Maintainers

This is for whoever is running the marketplace in the background (currently Karan).

### Adding a new skill

1. Install the skill locally (e.g., `npx skills add some-repo/some-skill --yes`)
2. Copy it into the right module folder in [`skills/`](./skills/) — e.g., `skills/gtm/05-bd-partnerships/my-new-skill/`
3. Add the skill name to that module's pack in [`packs.config.json`](./packs.config.json) (alphabetized)
4. Run `./build-packs.sh` (requires `jq` — `brew install jq`; also syncs public doc counts)
5. Run `npm run validate` before you commit
6. Commit and push

Example:
```bash
npx skills add someone/cool-skills --yes
cp -r ~/.agents/skills/cool-skill skills/gtm/05-bd-partnerships/
# Edit packs.config.json — add "cool-skill" to utopia-gtm
./build-packs.sh
git add -A && git commit -m "Add cool-skill to GTM pack" && git push
```

### Modules

| Module | Folder | Pack | Put here when… |
|--------|--------|------|----------------|
| GTM | `skills/gtm/<submodule>/` | `utopia-gtm` | Sales, marketing, growth, distribution (seven sub-modules) |
| Product | `skills/product/` | `utopia-product` | Discovery, design, build, deploy, product metrics |
| Investments | `skills/investments/` | `utopia-investments` | DD, finance, fundraising, markets, quant |
| Founder Productivity | `skills/founder-productivity/` | `utopia-founder-productivity` | Doesn't fit the three above |

### Measuring adoption (recommended)

Add the optional [skill-usage logging hook](./hooks/README.md) to see which skills are actually being used.

### Known gaps to fill

1. **Legal** — no MENA/GCC jurisdiction-aware cap table or entity setup skill
2. **Customer ops** — no agentic NPS / customer ops skill
3. **Product verification** — thin coverage beyond `evidence-driven-testing`

---

## FAQ

**Do I need all four packs?**
No. Install only what you're working on.

**Can I install more than one?**
Yes. Most people run Product + GTM, or Investments alone.

**Where do agents live?**
Ada and Khalil are in Investments. Salim and the agent builders are in Founder Productivity.

**Something broken?**
Ping Karan (@kmjp) or open an issue on the repo.
