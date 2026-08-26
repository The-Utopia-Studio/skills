# Install Utopia Skills

**Time:** ~2 minutes · **Hardest part:** copying and pasting

Four modules · **350 skills** · Claude Code plugin marketplace for The Utopia Studio.

**Site:** [the-utopia-studio.github.io/skills](https://the-utopia-studio.github.io/skills)

| Module | Pack | For… |
|--------|------|------|
| GTM | `utopia-gtm` | Sales, marketing, growth, RevOps |
| Product | `utopia-product` | Discovery, design, build, deploy |
| Investments | `utopia-investments` | DD, modeling, fundraising |
| Founder Productivity | `utopia-founder-productivity` | Onboarding, legal, notes, agents |

---

## The 30-second version

1. Install [Claude Code](https://claude.com/claude-code) (one-time)
2. Paste the **prompt below** into Claude Code
3. Done

---

## Copy-paste prompt

Open Claude Code (`claude` in your terminal), then paste this entire block:

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

That's it. Skills will trigger automatically when you ask for relevant work (pitch decks, discovery, GTM, DD, etc.).

---

## Prefer to do it yourself?

### Step 1 — Install Claude Code (once)

```bash
curl -fsSL https://claude.com/install.sh | sh
```

Then open a terminal and run `claude`.

### Step 2 — Register the marketplace (once)

```
/plugin marketplace add The-Utopia-Studio/skills
```

### Step 3 — Install the packs you need

**Recommended (install all four):**

```
/plugin install utopia-gtm@skills
/plugin install utopia-product@skills
/plugin install utopia-investments@skills
/plugin install utopia-founder-productivity@skills
```

**Or pick one:**

| If you're working on… | Install |
|------------------------|---------|
| Sales, marketing, growth | `/plugin install utopia-gtm@skills` |
| Discovery, design, building, deploy | `/plugin install utopia-product@skills` |
| DD, fundraising, modeling, markets | `/plugin install utopia-investments@skills` |
| Onboarding, legal, notes, agents | `/plugin install utopia-founder-productivity@skills` |

### Step 4 — Stay up to date

```
/plugin marketplace update skills
```

---

## Using Cursor instead?

```bash
# Clone once
git clone https://github.com/The-Utopia-Studio/skills.git

# Copy skills into Cursor (all four modules)
cp -r skills/{gtm,product,investments,founder-productivity}/* ~/.cursor/skills/
```

Or with npx:

```bash
npx skills add The-Utopia-Studio/skills
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `marketplace add` fails | Check you're logged into Claude Code / GitHub has access to `The-Utopia-Studio/skills` |
| Pack not found | Re-run `/plugin marketplace add The-Utopia-Studio/skills`, then install again |
| Skills don't seem to fire | Ask explicitly: "use the pitch-deck skill" or "use the GTM pack" |
| Want a fresh install | `/plugin marketplace update skills` then reinstall the pack |

Need help? Ping **Karan** (@kmjp) or open an issue on the [repo](https://github.com/The-Utopia-Studio/skills).

More detail: [Team Guide](./GUIDE.md) · [Fellows Guide](./FELLOWS.md)
