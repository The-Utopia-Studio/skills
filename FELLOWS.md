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

### 📌 M1 — Fellow Onboarding (13 skills)

Frameworks for orientation, market sizing, and stakeholder mapping. **Install this first when you join the program.**

| Skill | What it does |
|-------|-------------|
| `workshop-facilitation` | Run structured group sessions and workshops |
| `executive-onboarding-playbook` | 30-60-90 day plans for senior hires |
| `alignment-values-north-star` | Build org-wide alignment around a north star |
| `tam-sam-som-calculator` | Calculate market size (TAM/SAM/SOM) |
| `market-segments` | Identify 3-5 customer market segments |
| `market-sizing` | Estimate market size with frameworks |
| `pestel-analysis` | Political/Economic/Social/Tech/Environmental/Legal scan |
| `porters-five-forces` | Industry competitiveness analysis |
| `swot-analysis` | Strengths/Weaknesses/Opportunities/Threats |
| `stakeholder-map` | Map who matters and how to manage them |
| `role-switch` | See decisions from multiple stakeholder perspectives |
| `prioritization-frameworks` | 9 prioritization methods to pick from |
| `proof` | Collaborative docs with live presence and provenance |

**Try saying:** *"I'm a new fellow. Help me build a 30-60-90 day plan and identify the 3 stakeholders I should meet first."*

---

### 🔍 M2 — Discovery & Problem Validation (19 skills)

Customer interviews, JTBD, opportunity solution trees, problem framing.

| Skill | What it does |
|-------|-------------|
| `opportunity-solution-tree` | Map opportunities to solutions to experiments |
| `jobs-to-be-done` | Uncover what customers "hire" your product to do |
| `discovery-interview-prep` | Plan a customer discovery interview |
| `discovery-process` | Run a full discovery cycle from problem to insight |
| `problem-framing-canvas` | MITRE problem-framing methodology |
| `problem-statement` | Write a sharp user-centered problem statement |
| `proto-persona` | Quick persona from existing assumptions |
| `lean-ux-canvas` | Lean UX canvas walkthrough |
| `interview-script` | Build a structured customer interview script |
| `startup-canvas` | Combined Lean + Business Model canvas |
| `beachhead-segment` | Pick your first beachhead market |
| `ideal-customer-profile` | Define your ICP precisely |
| `prototyping-pretotyping` | Validate ideas before building |
| `identify-assumptions-new` | Find risky assumptions in a new idea |
| `identify-assumptions-existing` | Find risky assumptions in an existing product |
| `brainstorm-experiments-new` | Design lean startup experiments |
| `summarize-interview` | Synthesize themes from a customer interview |
| `job-stories` | "When… I want… So I can…" stories |
| `user-story-mapping-workshop` | Run a user story mapping workshop |

**Try saying:** *"I just finished 5 customer interviews about [topic]. Synthesize the JTBD themes and tell me what to test next."*

---

### 💡 M3 — Concept & Solution Design (21 skills)

Turn validated problems into solutions. PRDs, user stories, prototypes.

| Skill | What it does |
|-------|-------------|
| `prd-development` | Build a structured full-length PRD |
| `create-prd` | PRD generator |
| `one-pager-prd` | One-page decision-ready PRD |
| `user-story-mapping` | Lay out user stories on a map |
| `user-stories` | Generate user stories (multiple formats) |
| `user-story` | Mike Cohn-style stories |
| `user-story-splitting` | Break large stories into smaller ones |
| `job-stories` | "When/I want/So I can" stories |
| `recommendation-canvas` | Evaluate an AI product idea |
| `value-proposition` | Detailed value proposition design |
| `value-prop-statements` | Generate value prop statements |
| `monetization-strategy` | 3-5 monetization strategy options |
| `business-model` | Business Model Canvas |
| `lean-canvas` | Lean Canvas |
| `sketch-prompt` | Turn text/notes into conceptual sketch images |
| `interface-craft` | Animated React interfaces (Josh Puckett toolkit) |
| `shape` | Plan UX/UI before writing code |
| `critique` | Evaluate a design with quantitative scoring |
| `architecture-diagram` | Dark-themed system architecture diagrams |
| `diagram-design` | 13 diagram types as standalone HTML+SVG |
| `ui-ux-pro-max` | UI/UX library — 50+ styles, 161 palettes, 99 UX guidelines |

**Try saying:** *"Help me write a one-page PRD for [product idea] based on the discovery work I did in M2."*

---

### ⚖️ M4 — Legal & Entity Setup (5 skills)

Basics for legal docs and hiring materials.

| Skill | What it does |
|-------|-------------|
| `draft-nda` | Draft a non-disclosure agreement |
| `privacy-policy` | Draft a detailed privacy policy |
| `review-resume` | Comprehensive resume review |
| `grammar-check` | Catch grammar/logic/clarity issues |
| `press-release` | Amazon-style press release |

> **⚠️ Note:** This pack covers basics. **GCC/MENA-specific cap table and entity setup is a known gap** — talk to Karan if you need jurisdiction-aware advice.

**Try saying:** *"Draft an NDA for a partnership conversation with [company]."*

---

### 🎨 M5 — Brand & Identity (16 skills)

Visual identity, brand narrative, naming, voice. Powered by Efecto, Impeccable, and design philosophy from Emil Kowalski.

| Skill | What it does |
|-------|-------------|
| `efecto-web-design` | Design web pages and app UIs (JSX + Tailwind) |
| `efecto-graphic-design` | Pitch decks, posters, infographics, business cards |
| `efecto-social-media` | Instagram, X, LinkedIn, TikTok, YouTube assets |
| `emil-design-eng` | Emil Kowalski's UI polish philosophy |
| `impeccable` | Production-grade frontend with high design quality |
| `high-end-visual-design` | Design like a high-end agency |
| `minimalist-ui` | Clean editorial-style interfaces |
| `industrial-brutalist-ui` | Raw mechanical aesthetic — Swiss + military terminal |
| `design-taste-frontend` | Senior UI/UX engineer overriding default LLM biases |
| `stitch-design-taste` | Premium semantic design for Google Stitch |
| `redesign-existing-projects` | Upgrade existing apps to premium quality |
| `product-name` | Brainstorm 5 unique memorable product names |
| `brand-narrative-playbook` | Messaging and storytelling templates |
| `business-narrative-builder` | Structured narrative for the business |
| `positioning-workshop` | Run a positioning workshop |
| `sketch-prompt` | Turn text into conceptual sketch images |

**Try saying:** *"Help me come up with 5 product names for [idea] and pick the strongest one."*

---

### 🛠️ M6 — Product & Technology (33 skills)

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
| `railway-new` | Create projects/services on Railway |
| `railway-deploy` | Push code with `railway up` |
| `railway-environment` | Manage Railway env vars |
| `deploy-to-vercel` | Deploy applications to Vercel |
| `vercel-cli-with-tokens` | Vercel CLI with token auth |
| `vercel-react-best-practices` | React/Next.js performance patterns |
| `web-design-guidelines` | Web Interface Guidelines compliance |
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
| `architecture-diagram` | System architecture diagrams as HTML+SVG |
| `diagram-design` | 13 diagram types — flowcharts, ER, sequence, etc. |
| `tdd-red-green-refactor` | Disciplined TDD workflow in TypeScript |
| `typed-service-contracts` | Type-safe TS services with Spec+Handler pattern |

**Try saying:** *"Audit my repo for production readiness. Check security, performance, and infrastructure setup."*

---

### 🚀 M7 — Go-to-Market (30 skills)

Positioning, hook, copywriting, content strategy, BD, sales, distribution.

| Skill | What it does |
|-------|-------------|
| `positioning-icp` | Define ICP and product positioning |
| `positioning` | Structure positioning frameworks |
| `ideal-customer-profile` | Identify your ICP precisely |
| `gtm-strategy` | Create a go-to-market strategy |
| `gtm-motions` | Identify the best GTM motions |
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
| `ai-cold-outreach` | AI-powered cold outreach campaigns |
| `cold-email` | Write B2B cold emails and follow-ups |
| `email-sequence` | Multi-touch email sequences |
| `sales-enablement` | Create sales enablement materials |
| `lead-qualification` | Score leads on ICP fit/budget/intent |
| `outbound-plays` | Channel-specific outbound plays |
| `deal-desk` | Manage pricing, packaging, deal terms |
| `meddic-checklist` | MEDDIC qualification checklist |
| `discovery-calls` | Plan and run discovery calls |
| `social-selling` | Engage prospects through social channels |
| `social-content` | Create social media content |
| `paid-ads` | Plan and optimize paid ads |
| `referral-program` | Design a referral program |

**Try saying:** *"Help me write a positioning statement and a sequence of 5 cold emails for [my product] targeting [ICP]."*

---

### 💰 M8 — Fundraising Prep (16 skills)

Investor-ready materials. Decks, financial models, valuations, competitive analysis.

| Skill | What it does |
|-------|-------------|
| `pitch-deck` | Generate Utopia-branded pitch decks from notes |
| `ib-pitch-deck` | Populate IB-style pitch deck templates |
| `deck-refresh` | Update decks with new numbers |
| `ib-check-deck` | Quality-check a pitch deck |
| `3-statement-model` | Income statement, balance sheet, cash flow |
| `financial-unit-economics` | CAC, LTV, contribution margin analysis |
| `saas-economics-efficiency-metrics` | SaaS unit economics |
| `intrinsic-valuation-dcf` | DCF valuation |
| `relative-valuation-multiples` | Comparable company multiples |
| `valuation-reconciler` | Synthesize DCF + comps |
| `cost-of-capital-estimator` | Cost of equity (CAPM) |
| `capital-structure-optimizer` | Debt/equity structure analysis |
| `competitive-analysis` | Competitive landscape decks |
| `datapack-builder` | IC-ready data packs from CIMs/SEC filings |
| `business-narrative-builder` | Structured business narrative |
| `tear-sheet` | Professional company tear sheets |

**Try saying:** *"Build me a 12-slide pitch deck from these meeting notes [paste notes]."*

---

### 📊 M9 — Operations & Finance (27 skills)

Ongoing ops once the business is running. Metrics, unit economics, retention, churn, pricing.

| Skill | What it does |
|-------|-------------|
| `north-star-metric` | Define a North Star Metric |
| `growth-loops` | Identify growth flywheels |
| `ab-test-analysis` | Analyze A/B test results with significance |
| `cohort-analysis` | Slice metrics by user cohort |
| `sql-queries` | Generate SQL queries from natural language |
| `metrics-dashboard` | Define and design product metrics dashboards |
| `saas-revenue-growth-metrics` | SaaS revenue, retention, growth metrics |
| `retention-ltv-playbook` | Drive retention and LTV |
| `expansion-playbook` | Upsell/cross-sell/expansion |
| `expansion-plays` | Adoption-to-expansion plays |
| `expansion-retention` | Reduce churn, drive expansion |
| `churn-prevention` | Reduce churn |
| `retention-dashboard` | Visualize churn and expansion |
| `onboarding-cro` | Optimize onboarding conversion |
| `analytics-tracking` | Set up analytics tracking |
| `revops` | Revenue operations workflows |
| `page-cro` | Optimize landing page conversion |
| `signup-flow-cro` | Optimize signup flow conversion |
| `voice-of-customer` | VoC research and synthesis |
| `sentiment-analysis` | Interpret qualitative feedback |
| `sentiment-feedback-loop` | Capture and act on qualitative feedback |
| `pql-framework` | Define product-qualified leads |
| `ai-pricing` | Price AI products |
| `pricing-strategy` | Design pricing strategy |
| `roadmap-planning` | Strategic roadmap planning |
| `finance-metrics-quickref` | SaaS finance metrics reference |
| `activation-map` | Link segments to insights to activation |

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

The AI uses `one-pager-prd` + `identify-assumptions-new` + `ideal-customer-profile`.

### "I need to design a quick prototype."
Just say:
> "Sketch a landing page for [idea]. Use Utopia's design taste."

The AI uses `sketch-prompt` + `efecto-web-design` + `high-end-visual-design`.

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

**Q: I use Claude.ai (web or desktop app), not Claude Code. Can I still use this?**
Partially. Neither the Claude.ai web chat nor the desktop app supports the `/plugin` command or running `npx` — they're chat surfaces, not command-execution environments. To use the marketplace properly, install Claude Code (it's free).

For the 6 flagship skills (`cold-email`, `outreach-execution`, `account-tier-scoring`, `pitch-deck`, `technical-dd`, `impeccable`), download the `.skill` file straight from [the docs site](https://the-utopia-studio.github.io/skills/#flagships) and upload it yourself under Settings → Capabilities → Skills — no need to wait on anyone.

For anything outside those 6, DM Karan and he'll send you a `.skill` file for the specific skill you need. We're staying manual for the full 302-skill corpus for now (self-serve zips for all of them would mean ~34MB of binary build artifacts committed to git, growing with every skill edit, for a use case that doesn't yet have the volume to justify it) — ask if that changes and it's worth revisiting.

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
