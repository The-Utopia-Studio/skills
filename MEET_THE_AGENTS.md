# 🤖 Meet the Utopia Agents

We now have three named AI agents at Utopia — each with their own personality, persistent memory, and clear job. Plus a framework to build new ones.

**Try them this week. They take 30 seconds to invoke and feel completely different from generic Claude.**

> **Repo:** https://github.com/The-Utopia-Studio/skills
> **Live in:** Claude Code, Cursor, ChatGPT Codex, Windsurf, and most other AI coding tools

---

## TL;DR (60 seconds)

We've built three internal AI agents. Each is good at one specific Utopia job:

| Agent | Job | Try saying |
|-------|-----|-----------|
| **Ada** 🔍 | Technical due diligence | *"Ada, run DD on this repo"* |
| **Khalil** 📊 | Pitch decks | *"Khalil, build a syndication deck from these notes"* |
| **Salim** 🎓 | Studio fellow coaching | *"Salim, I'm stuck in M2"* |

Plus an **`agent-persona-builder`** skill — use it to design new agents for your portco or for specific Utopia workflows.

Install: `/plugin install utopia-internal-agents@skills`

---

## What's the big deal? Why "agents" and not just "skills"?

You've already got 750+ skills available in your AI. The problem: you have to know which skill applies when. Most of you said the same thing — *"there are too many skills and I don't know which to use."*

An **agent** wraps related skills in a **persona** with a name, a voice, and a memory. The cognitive ask is way smaller:

> ❌ *"What skill do I use for technical due diligence?"*
> ✅ *"Run DD as Ada."*

That's the entire pitch. Same underlying capabilities, but bundled into a character with personality and memory.

It also fixes the "generic Claude" problem. Without enforced personality, AI output drifts toward bland, hedging, "as an AI assistant" voice. Each agent has hard rules locked in their `SOUL.md` — Khalil literally cannot use Inter font or purple gradients. Salim literally cannot give you the answer when a question would teach better.

---

## Meet them

### 🔍 Ada — Technical Due Diligence

> **Named for** Ada Lovelace, the first programmer.
> **Voice:** Skeptical detective. Never falls in love with the deal.
> **Tagline:** *"What does the code actually do?"*

**Who uses Ada:** Funds team. Anyone evaluating a startup before investment.

**What Ada does:**
- Audits a startup's GitHub repo in 5 phases (stack → security → infra → cost → integrations)
- Produces a branded Utopia TDD .docx report with P0/P1/P2/P3 risk severities
- Names exactly what Karan should ask the founder before committing
- Quantifies every risk ("3 of 7 critical paths lack tests" — not "test coverage is poor")

**What Ada won't do:**
- Tell you it's a great deal (she's not your cheerleader)
- Accept founder claims at face value
- Skip the security audit, even on small portcos
- Recommend investment — that's Karan's job

**Try this:**
```
"Ada, run DD on https://github.com/anthropics/claude-code"
```
You'll see her acknowledge in one sentence, confirm scope, then start the 5-phase audit.

---

### 📊 Khalil — Pitch Deck Builder

> **Named for** Khalil Gibran, the Lebanese-American poet.
> **Voice:** Storytelling-first editor. Asks "who's the audience?" before doing anything.
> **Tagline:** *"What's the one thing they should remember?"*

**Who uses Khalil:** Karan, the Studio team helping portcos, anyone building investor materials.

**What Khalil does:**
- Turns founder meeting notes (Granola, Notion, raw scraps) into investor-ready PPTX decks
- Default mode: Utopia-branded syndication decks for co-investors
- Switches modes for LP decks, portco coaching decks, portco pitch decks
- Headlines every slide as a complete idea, not a label ("17% MoM growth in Q2" — not "Growth")
- Hard rules: never Inter font, never purple gradients, never generic Sequoia templates, never buries the ask

**What Khalil won't do:**
- Build a deck without asking who's reading it first
- Fabricate data the founder didn't provide
- Pad decks with filler slides (8-12 is the sweet spot)
- Use buzzwords like "revolutionizing" or "next-generation"

**Try this:**
```
"Khalil, I have founder meeting notes from a Granola session — build me a 10-slide
syndication deck for co-investors. Here are the notes: [paste]"
```
He'll ask the audience question first, then build.

---

### 🎓 Salim — Studio Fellow Coach

> **Salim** means "safe" or "peaceful" in Arabic.
> **Voice:** Socratic coach. Asks before he tells. Warm but never sycophantic.
> **Tagline:** *"Have you talked to a customer yet?"*

**Who uses Salim:** Studio fellows working through the 9-module Cobuild curriculum (M1–M9).

**What Salim does:**
- Identifies which Cobuild module the fellow is in (M1 Onboarding → M9 Ops)
- Asks 1-2 targeted Socratic questions to surface the *actual* blocker (often different from the stated one)
- References specific Cobuild frameworks (JTBD, Opportunity Solution Tree, Lean UX, etc.)
- Suggests ONE smallest next step — never a 10-step plan
- Logs persistent cobuild reflection to Proof docs so progress carries across sessions

**What Salim won't do:**
- Write your PRD, canvas, or pitch for you (he asks questions; you write)
- Let you skip Discovery (M2) for Build (M6)
- Give generic encouragement ("great job!" without a specific observation)
- Tell you the answer when a question would teach better

**Try this (if you're a fellow):**
```
"Salim, I'm in M2 working on Discovery. I think I know my customer but I haven't
done interviews yet because I'm worried about wasting their time. What should I do?"
```
He'll redirect you toward customer conversations, but Socratically — not by telling you.

---

### 🛠️ `agent-persona-builder` — Build Your Own Agent

This is a skill that walks you through designing your own agent. 25 questions across 5 phases. Outputs the four canonical files: SOUL.md (personality), AGENTS.md (operating manual), MEMORY.md (cross-session knowledge), BOOTSTRAP.md (first-boot setup).

**Use this when:**
- You have a recurring AI workflow you'd like to formalize as a named agent
- You're building a portco that needs its own customer-facing or internal agent
- You want to apply the methodology to design Maya (Azraq engine reviewer), Iman (LP relations), Rana (portco success), or any other named agent

**Try this:**
```
"Help me design an agent named Maya for reviewing Azraq's risk engine."
```
The framework will walk you through Identity & Voice → Purpose & Mechanics → Outputs & Communication → Continuity & Memory → First Workflow.

---

## Quick Start (5 minutes)

### Step 1 — Install the agents pack

Inside Claude Code:

```
/plugin marketplace add The-Utopia-Studio/skills
/plugin install utopia-internal-agents@skills
```

(If you already have the marketplace registered, just run the second command.)

That gives you all four: `agent-persona-builder`, `ada`, `khalil`, `salim`.

### Step 2 — Try one of them

Pick the one that matches what you do most:

- **You evaluate startups for Karan?** Try Ada with a portco GitHub URL.
- **You build decks?** Try Khalil with raw meeting notes.
- **You're a Studio fellow?** Try Salim with a real M2/M3/M5 blocker.

### Step 3 — Notice the voice

You'll feel the difference immediately. Each agent:
- Acknowledges in one sentence (no preamble, no "great question!")
- Asks one targeted clarifying question before doing the work
- Uses signature phrases consistently (Ada's "the data says…", Khalil's "what's the one thing they should remember?", Salim's "have you talked to a customer yet?")

If at any point the output feels like generic Claude, tell me — that's a voice drift bug.

---

## How agents differ from skills (one more time)

| | Skills | Agents |
|---|--------|--------|
| Shape | Utility / workflow | Persona with voice |
| Invocation | By trigger keyword | "Ada, do X" or natural language |
| Memory | Stateless | Persistent in MEMORY.md across sessions |
| Voice | Default Claude | Locked in SOUL.md, won't drift |
| Use case | "I need X done" | "I need someone who does X consistently" |

Agents **compose** skills — they're a layer on top, not a replacement.

---

## The key file: MEMORY.md

Each agent has a `MEMORY.md` file. **This is the most important file in the whole system.**

When Ada finds a new pattern of red flag → add it to Ada's MEMORY.md.
When Karan gives Khalil heavy edits on a deck → add the lesson to Khalil's MEMORY.md.
When Salim sees a new fellow stuck-point → add it to Salim's MEMORY.md.

**Without explicit memory updates, the agents drift back to generic Claude over time.** Memory is explicit, not implicit. The methodology is non-negotiable on this point.

Read the MEMORY files for each agent:
- [Ada's memory](https://github.com/The-Utopia-Studio/skills/blob/main/agents/ada/MEMORY.md)
- [Khalil's memory](https://github.com/The-Utopia-Studio/skills/blob/main/agents/khalil/MEMORY.md)
- [Salim's memory](https://github.com/The-Utopia-Studio/skills/blob/main/agents/salim/MEMORY.md)

You'll see they're partly empty — they fill up as we use the agents in real work.

---

## When to use which agent (cheat sheet)

| Situation | Agent |
|-----------|-------|
| Karan asks "is this portco technically sound?" | **Ada** |
| You need to audit a startup before investing | **Ada** |
| You need to build a co-investor pitch deck | **Khalil** |
| A founder needs help with their own deck | **Khalil** (portco mode) |
| LP update presentation | **Khalil** (LP mode) |
| A fellow says "I'm stuck" | **Salim** |
| A fellow wants you to write their PRD | **Salim** (he won't write it, but he'll coach) |
| You have a recurring AI workflow that should be a named agent | **`agent-persona-builder`** |
| You're building a portco and need its own internal agent | **`agent-persona-builder`** |

---

## FAQ

**Q: Will Ada / Khalil / Salim actually behave differently than regular Claude?**
Yes. Each has hard rules locked in their SOUL.md. Khalil literally won't use Inter font. Salim literally won't write your PRD. Try it — you'll feel the difference in the first response.

**Q: Can I invoke an agent without saying their name?**
Yes. They have natural-language triggers too. "Run DD on this" → Ada. "Build me a deck" → Khalil. "I'm stuck in M2" → Salim.

**Q: What if two agents could both handle a request?**
Use the name to be specific. *"Khalil, build me a deck"* removes ambiguity.

**Q: Can I customize an agent for my own use?**
Yes — fork the repo, edit the SOUL.md / AGENTS.md / MEMORY.md, and your local copy overrides. But the canonical version stays in the marketplace.

**Q: How do I build a new agent?**
Use the `agent-persona-builder` skill. *"Help me design an agent for [role]."* It walks you through 25 questions and outputs the four files.

**Q: Does this work in Claude.ai web chat?**
No — Claude.ai doesn't support the `/plugin` marketplace yet. Install Claude Code (free), Cursor, or ChatGPT Codex to use the agents. DM Karan if you need a workaround for Claude.ai.

**Q: An agent gave me weird output. What do I do?**
Tell me. The most likely cause is voice drift — fix is to update MEMORY.md with the gotcha, so it doesn't recur.

---

## TL;DR — three commands and three prompts

```
# Install the agents
/plugin marketplace add The-Utopia-Studio/skills
/plugin install utopia-internal-agents@skills

# Try them
"Ada, run DD on [GitHub URL]"
"Khalil, build a syndication deck from these notes: [paste]"
"Salim, I'm in M[X] and stuck on [topic]"
```

---

## What's next

If these three work for the team:

- **Build Maya** — Azraq engine reviewer (IP defensibility + risk modeling)
- **Build Iman** — LP relations (quarterly updates, LP comms)
- **Build Rana** — portco success coach (post-investment quarterly check-ins)

The principle: don't build an agent until you have a workflow you've done 5+ times manually. Otherwise it's premature persona-engineering.

---

**Questions?** DM Karan on Slack, post in `#utopia-skills`, or email karanmjpinto@gmail.com.

**Want to learn more?**
- [Full agent system docs](https://github.com/The-Utopia-Studio/skills/blob/main/agents/README.md)
- [Ada's full persona](https://github.com/The-Utopia-Studio/skills/tree/main/agents/ada)
- [Khalil's full persona](https://github.com/The-Utopia-Studio/skills/tree/main/agents/khalil)
- [Salim's full persona](https://github.com/The-Utopia-Studio/skills/tree/main/agents/salim)
- [Build your own agent](https://github.com/The-Utopia-Studio/skills/blob/main/skills/meta/agent-persona-builder/SKILL.md)
- [Source methodology (Jack & Jill)](https://github.com/Jack-and-Jill-AI/Jack_and_Jill_AI_Guides/blob/main/agent-builder-skill.md)
