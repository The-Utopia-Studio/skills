# 🎓 Welcome to Utopia Skills — Fellow Edition

A shared library of AI workflows built specifically for Studio fellows. Install one pack, and your AI (Claude, Cursor, ChatGPT, etc.) instantly knows how Utopia does things — no more re-explaining context every time you open a chat.

> **Marketplace:** [`The-Utopia-Studio/skills`](https://github.com/The-Utopia-Studio/skills)
> **Maintainer:** Karan Pinto · karanmjpinto@gmail.com · `#utopia-skills` on Slack

---

## What this is, in one sentence

It's an "app store" of pre-built workflows for your AI. Four modules — GTM, Product, Investments, Founder Productivity — so you only load what's relevant.

## Why it matters

Today, when you ask AI to help with discovery work, you have to explain Utopia's approach every single time:
> "I'm a fellow at Utopia Capital. We use the JTBD framework. We don't do generic personas, we use proto-personas. We look at problem-market fit before solution design..."

With the right pack installed, your AI already knows. You just say:
> "I did 5 customer interviews. Synthesize the themes."

And get an output that already follows our methodology.

---

## Quick Start (~2 minutes)

**Easiest path:** open Claude Code and paste this:

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

Full instructions (Claude Code, Cursor, troubleshooting): **[INSTALL.md](./INSTALL.md)**

### Manual steps (if you prefer)

1. Install Claude Code: `curl -fsSL https://claude.com/install.sh | sh` then run `claude`
2. Register: `/plugin marketplace add The-Utopia-Studio/skills`
3. Install what you need:

```
/plugin install utopia-product@skills                # Discovery, design, build, deploy
/plugin install utopia-gtm@skills                    # Sales, marketing, growth
/plugin install utopia-investments@skills            # Fundraising, DD, modeling
/plugin install utopia-founder-productivity@skills   # Onboarding, legal, agents
```

Skills auto-trigger based on what you ask. If Claude picks the wrong one, just say which to use.

> **Don't want Claude Code?** Cursor and others work too — see [INSTALL.md](./INSTALL.md).

---

## What's in each pack

### 📌 M1 — Fellow Onboarding (11 skills)

Frameworks for orientation, market sizing, and stakeholder mapping. **Install this first when you join the program.**

| Skill | What it does |
|-------|-------------|
| `workshop-facilitation` | Run structured group sessions and workshops |
| `alignment-values-north-star` | Build org-wide alignment around a north star |
| `market-sizing` | Calculate market size (TAM/SAM/SOM) |
| `market-segments` | Identify 3-5 customer market segments |
| `pestel-analysis` | Political/Economic/Social/Tech/Environmental/Legal scan |
| `porters-five-forces` | Industry competitiveness analysis |
| `swot-analysis` | Strengths/Weaknesses/Opportunities/Threats |
| `stakeholder-map` | Map who matters and how to manage them |
| `role-switch` | See decisions from multiple stakeholder perspectives |
| `prioritization` | 9 prioritization methods to pick from |
| `proof` | Collaborative docs with live presence and provenance |

**Try saying:** *"I'm a new fellow. Help me build a 30-60-90 day plan and identify the 3 stakeholders I should meet first."*

---

### 🔍 M2 — Discovery & Problem Validation (16 skills)

Customer interviews, JTBD, opportunity solution trees, problem framing.

| Skill | What it does |
|-------|-------------|
| `continuous-discovery-engine` | Map opportunities to solutions to experiments |
| `jobs-to-be-done` | Uncover what customers "hire" your product to do |
| `discovery-interview-prep` | Plan a customer discovery interview |
| `discovery-process` | Run a full discovery cycle from problem to insight |
| `problem-framing-canvas` | MITRE problem-framing methodology |
| `problem-statement` | Write a sharp user-centered problem statement |
| `proto-persona` | Quick persona from existing assumptions |
| `lean-ux-canvas` | Lean UX canvas walkthrough |
| `business-model` | Combined Lean + Business Model canvas |
| `beachhead-segment` | Pick your first beachhead market |
| `ideal-customer-profile` | Define your ICP precisely |
| `probe-matrix` | Validate ideas before building |
| `identify-assumptions-new` | Find risky assumptions in a new idea |
| `summarize-interview` | Synthesize themes from a customer interview |
| `job-stories` | "When… I want… So I can…" stories |
| `user-story-mapping` | Run a user story mapping workshop |

**Try saying:** *"I just finished 5 customer interviews about [topic]. Synthesize the JTBD themes and tell me what to test next."*

---

### 💡 M3 — Concept & Solution Design (14 skills)

Turn validated problems into solutions. PRDs, user stories, prototypes.

| Skill | What it does |
|-------|-------------|
| `prd-development` | Build a structured full-length PRD |
| `user-story-mapping` | Lay out user stories on a map |
| `user-story` | Generate user stories (multiple formats) |
| `user-story-splitting` | Break large stories into smaller ones |
| `job-stories` | "When/I want/So I can" stories |
| `recommendation-canvas` | Evaluate an AI product idea |
| `value-proposition` | Detailed value proposition design |
| `pricing-strategy` | 3-5 monetization strategy options |
| `business-model` | Business Model Canvas |
| `interface-craft` | Animated React interfaces (Josh Puckett toolkit) |
| `shape` | Plan UX/UI before writing code |
| `critique` | Evaluate a design with quantitative scoring |
| `diagram-design` | Dark-themed system architecture diagrams |
| `ui-ux-pro-max` | UI/UX library — 50+ styles, 161 palettes, 99 UX guidelines |

**Try saying:** *"Help me write a one-page PRD for [product idea] based on the discovery work I did in M2."*

---

### ⚖️ M4 — Legal & Entity Setup (4 skills)

Basics for legal docs and hiring materials.

| Skill | What it does |
|-------|-------------|
| `draft-nda` | Draft a non-disclosure agreement |
| `privacy-policy` | Draft a detailed privacy policy |
| `grammar-check` | Catch grammar/logic/clarity issues |
| `press-release` | Amazon-style press release |

> **⚠️ Note:** This pack covers basics. **GCC/MENA-specific cap table and entity setup is a known gap** — talk to Karan if you need jurisdiction-aware advice.

**Try saying:** *"Draft an NDA for a partnership conversation with [company]."*

---

### 🎨 M5 — Brand & Identity (11 skills)

Visual identity, brand narrative, naming, voice. Powered by Efecto, Impeccable, and design philosophy from Emil Kowalski.

| Skill | What it does |
|-------|-------------|
| `efecto-web-design` | Design web pages and app UIs (JSX + Tailwind) |
| `efecto-graphic-design` | Pitch decks, posters, infographics, business cards |
| `efecto-social-media` | Instagram, X, LinkedIn, TikTok, YouTube assets |
| `polish` | Emil Kowalski's UI polish philosophy |
| `impeccable` | Production-grade frontend with high design quality |
| `minimalist-ui` | Clean editorial-style interfaces |
| `industrial-brutalist-ui` | Raw mechanical aesthetic — Swiss + military terminal |
| `stitch-design-taste` | Premium semantic design for Google Stitch |
| `product-name` | Brainstorm 5 unique memorable product names |
| `positioning-workshop` | Messaging and storytelling templates |
| `business-narrative-builder` | Structured narrative for the business |

**Try saying:** *"Help me come up with 5 product names for [idea] and pick the strongest one."*

---

### 🛠️ M6 — Product & Technology (28 skills)

Build the actual product. Design polish (Impeccable suite), deployment (Railway, Vercel), production readiness, ML, architecture.

| Skill | What it does |
|-------|-------------|
| `shape` | Plan UX/UI before writing code |
| `critique` | UX evaluation with quantitative scoring |
| `audit` | Technical quality checks (a11y, perf, theming) |
| `polish` | Final quality pass — alignment, spacing, consistency |
| `layout` | Improve layout, spacing, visual rhythm |
| `typeset` | Fix font choices, hierarchy, sizing, readability |
| `animate` | Add purposeful animations and micro-interactions |
| `adapt` | Make designs responsive across screens |
| `optimize` | Diagnose and fix UI performance |
| `clarify` | Improve UX copy, error messages, microcopy |
| `delight` | Add joy and personality to interfaces |
| `interface-craft` | Animated React interfaces (Josh Puckett toolkit) |
| `railway` | Create projects/services on Railway |
| `deploy-to-vercel` | Deploy applications to Vercel |
| `vercel-react-best-practices` | React/Next.js performance patterns |
| `repo-scanner` | Audit a repo's tech stack and production readiness |
| `repo-structurer` | Clean up and structure a repo |
| `prompt-engineer` | Make a repo AI-native (AGENTS.md, .cursorrules) |
| `deployment-engineer` | Set up CI/CD, Docker, environments |
| `security-auditor` | Find hardcoded secrets, vulnerable deps |
| `monitoring-setup` | Configure Sentry, PostHog, health checks |
| `integration-linker` | Connect Slack/GitHub/Linear/etc. |
| `cost-optimizer` | Identify unused cloud resources |
| `devops-advisor` | Audit DB config, caching, scaling patterns |
| `transformers-js` | Run ML models in JavaScript/TypeScript |
| `diagram-design` | System architecture diagrams as HTML+SVG |
| `tdd-red-green-refactor` | Disciplined TDD workflow in TypeScript |
| `typed-service-contracts` | Type-safe TS services with Spec+Handler pattern |

**Try saying:** *"Audit my repo for production readiness. Check security, performance, and infrastructure setup."*

---

### 🚀 M7 — Go-to-Market (25 skills)

Positioning, hook, copywriting, content strategy, BD, sales, distribution.

| Skill | What it does |
|-------|-------------|
| `positioning-workshop` | Define ICP and product positioning |
| `ideal-customer-profile` | Identify your ICP precisely |
| `gtm-strategy` | Create a go-to-market strategy |
| `sales-motion-design` | Choose between PLG/SLG/hybrid motions |
| `launch-strategy` | Plan a product launch |
| `solo-founder-gtm` | GTM for solo founders |
| `copywriting` | Write/rewrite marketing copy |
| `copy-editing` | Edit/refine existing copy |
| `content-strategy` | Plan a content strategy |
| `content-to-pipeline` | Turn content into qualified pipeline |
| `marketing-psychology` | Apply psychology principles to marketing |
| `marketing-ideas` | Generate marketing ideas |
| `competitive-battlecard` | Sales-ready competitive battlecards |
| `ai-sdr` | Deploy an AI sales development rep |
| `lead-enrichment` | Build data enrichment workflows |
| `cold-email` | Write B2B cold emails and follow-ups |
| `email-sequence` | Multi-touch email sequences |
| `sales-enablement` | Create sales enablement materials |
| `account-tier-scoring` | Score leads on ICP fit/budget/intent |
| `expansion-retention` | Manage pricing, packaging, deal terms |
| `discovery-calls` | MEDDIC qualification checklist |
| `social-selling` | Engage prospects through social channels |
| `social-content` | Create social media content |
| `paid-ads` | Plan and optimize paid ads |
| `referral-program` | Design a referral program |

**Try saying:** *"Help me write a positioning statement and a sequence of 5 cold emails for [my product] targeting [ICP]."*

---

### 💰 M8 — Fundraising Prep (14 skills)

Investor-ready materials. Decks, financial models, valuations, competitive analysis.

| Skill | What it does |
|-------|-------------|
| `pitch-deck` | Generate Utopia-branded pitch decks from notes |
| `ib-pitch-deck` | Populate IB-style pitch deck templates |
| `deck-refresh` | Update decks with new numbers |
| `ib-check-deck` | Quality-check a pitch deck |
| `3-statement-model` | Income statement, balance sheet, cash flow |
| `saas-economics-efficiency-metrics` | CAC, LTV, contribution margin analysis |
| `dcf-model` | DCF valuation |
| `comps-analysis` | Comparable company multiples |
| `valuation-reconciler` | Synthesize DCF + comps |
| `cost-of-capital-estimator` | Cost of equity (CAPM) |
| `competitive-analysis` | Competitive landscape decks |
| `datapack-builder` | IC-ready data packs from CIMs/SEC filings |
| `business-narrative-builder` | Structured business narrative |
| `tear-sheet` | Professional company tear sheets |

**Try saying:** *"Build me a 12-slide pitch deck from these meeting notes [paste notes]."*

---

### 📊 M9 — Operations & Finance (17 skills)

Ongoing ops once the business is running. Metrics, unit economics, retention, churn, pricing.

| Skill | What it does |
|-------|-------------|
| `metrics-that-matter` | Define a North Star Metric |
| `growth-loops` | Identify growth flywheels |
| `ab-test-analysis` | Analyze A/B test results with significance |
| `metrics-dashboard` | Define and design product metrics dashboards |
| `saas-revenue-growth-metrics` | SaaS revenue, retention, growth metrics |
| `expansion-retention` | Drive retention and LTV |
| `churn-prevention` | Reduce churn |
| `onboarding-cro` | Optimize onboarding conversion |
| `analytics-tracking` | Set up analytics tracking |
| `revops` | Revenue operations workflows |
| `page-cro` | Optimize landing page conversion |
| `signup-flow-cro` | Optimize signup flow conversion |
| `customer-research` | VoC research and synthesis |
| `account-tier-scoring` | Define product-qualified leads |
| `pricing-strategy` | Price AI products |
| `roadmap-planning` | Strategic roadmap planning |
| `saas-economics-efficiency-metrics` | SaaS finance metrics reference |

**Try saying:** *"Help me define a North Star Metric for [product] and design a metrics dashboard around it."*

---

## 🎯 Quant pricing

Bayesian reasoning, forecasting, and auction-theory skills for pricing physical/emerging risks now live in **`utopia-investments`** — no separate pack.

```
/plugin install utopia-investments@skills
```

---

## How to Actually Use It

A few examples of what real fellow workflows look like with these skills installed:

### "I just finished customer interviews."
Just say:
> "I did 5 interviews about [topic]. Here are my notes. Synthesize the themes and map them to JTBD."

The AI uses `summarize-interview` + `jobs-to-be-done` automatically.

### "I need to brief my Studio coach on what I'm working on."
Just say:
> "Build me a one-page PRD for [product idea]. Include the problem, JTBD, ICP, and three risky assumptions to test."

The AI uses `prd-development` + `identify-assumptions-new` + `ideal-customer-profile`.

### "I need to design a quick prototype."
Just say:
> "Sketch a landing page for [idea]. Use Utopia's design taste."

The AI uses `efecto-web-design` + `impeccable`.

### "I need to write a pitch deck for an investor meeting."
Just say:
> "Build me a 12-slide pitch deck from these notes [paste notes]. Investor-ready."

The AI uses `pitch-deck` (Utopia-branded automatically).

### "I need to find risks in my plan before I commit."
Just say:
> "Run a pre-mortem on [my plan]. What could go wrong?"

The AI uses `pre-mortem` + `forecast-premortem`.

---

## Updating

The marketplace gets new skills regularly. To pull updates:

```
/plugin marketplace update skills
```

Then reinstall whichever pack you want refreshed.

---

## FAQ

**Q: I don't write code. Will this be useful for me?**
Yes. Most skills are about strategy, discovery, fundraising, design, and ops — not just engineering. Use the AI like ChatGPT in a chat window.

**Q: I use Claude.ai web chat, not Claude Code. Can I still use this?**
Partially. Claude.ai web doesn't support the `/plugin` command. To use the marketplace properly, install Claude Code (it's free). Or DM Karan and he'll send you `.skill` files you can upload directly to Claude.ai under Settings → Capabilities → Skills.

**Q: Can I use this with Cursor or Codex?**
Yes. They support the same skill format. Run `npx skills add The-Utopia-Studio/skills` and follow the prompts.

**Q: Will this slow my AI down?**
No — only the skills in installed packs load. That's why we install one module at a time. More isn't better.

**Q: I have an idea for a skill that doesn't exist. How do I add it?**
Drop the idea in `#utopia-skills` Slack or DM Karan. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full flow.

**Q: A skill gave me a wrong/bad output. What do I do?**
DM Karan. We improve skills as we find edge cases — that's how they get better.

**Q: Can I uninstall a pack?**
Yes — `/plugin uninstall <pack-name>@skills`.

---

## TL;DR — three commands

```
1. Install Claude Code:               curl -fsSL https://claude.com/install.sh | sh
2. Register the marketplace:          /plugin marketplace add The-Utopia-Studio/skills
3. Install your current module pack:  /plugin install utopia-<module>@skills   # gtm | product | investments | founder-productivity
                                      where <module> is: onboarding, discovery, concept, legal,
                                      brand, product, gtm, fundraising, or ops
```

That's it. Welcome to the Studio.

---

**Questions?** DM Karan on Slack, post in `#utopia-skills`, or email karanmjpinto@gmail.com.

**Want to learn more?**
- [Full team guide](./GUIDE.md) — for fellows + funds team + maintainers
- [Contributing](./CONTRIBUTING.md) — propose your own skills
- [Skill taxonomy](./SKILL_TAXONOMY.md) — all skills mapped to 9 categories
- [Marketplace home](./README.md) — full repo docs

— Karan
