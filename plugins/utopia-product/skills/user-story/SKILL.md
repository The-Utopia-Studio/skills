---
name: user-story
description: >-
  Write development-ready user stories: a single story in Mike Cohn format (As a / I want to / so
  that) with Gherkin Given/When/Then acceptance criteria, or a full set of backlog stories for a
  feature using the 3 C's (Card, Conversation, Confirmation) and INVEST with numbered acceptance
  criteria and supplied design links. Use when writing a user story, breaking a feature into backlog items,
  converting a PRD requirement into stories, defining acceptance criteria, or writing situation-first
  job stories (When / I want to / so I can). Not for splitting an oversized story or epic
  (use user-story-splitting), or laying out the whole journey and release slices (use
  user-story-mapping).
intent: >-
  Create clear, concise user stories that combine Mike Cohn's user story format with Gherkin-style acceptance criteria. Use this to translate user needs into actionable development work that focuses on outcomes, ensures shared understanding between product and engineering, and provides testable success criteria.
type: component
theme: pm-artifacts
best_for:
  - "Writing user stories with proper acceptance criteria"
  - "Converting requirements into development-ready stories"
  - "Establishing story quality standards across your team"
scenarios:
  - "I need to write a user story for a new notification system in our B2B SaaS app"
  - "Convert this PRD requirement into a properly formatted user story with Gherkin acceptance criteria"
estimated_time: "5-10 min"
---

## Purpose
Create clear, concise user stories that combine Mike Cohn's user story format with Gherkin-style acceptance criteria. Use this to translate user needs into actionable development work that focuses on outcomes, ensures shared understanding between product and engineering, and provides testable success criteria.

This is not a feature spec—it's a conversation starter that captures *who* benefits, *what* they're trying to do, *why* it matters, and *how* you'll know it works.

## Key Concepts

### The Mike Cohn + Gherkin Format
A user story combines:

**Use Case (Mike Cohn format):**
- **As a** [user persona/role]
- **I want to** [action to achieve outcome]
- **so that** [desired outcome]

**Acceptance Criteria (Gherkin format):**
- **Scenario:** [Brief description of the scenario]
- **Given:** [Initial context or preconditions]
- **and Given:** [Additional preconditions]
- **When:** [Event that triggers the action]
- **Then:** [Expected outcome]

### Why This Structure Works
- **User-centric:** Forces focus on who benefits and why
- **Outcome-focused:** "So that" emphasizes the value delivered, not just the action
- **Testable:** Gherkin acceptance criteria are concrete and verifiable
- **Conversational:** Story is the opening for discussion, not the final spec
- **Shared language:** Product, engineering, and QA all understand the format

### Anti-Patterns (What This Is NOT)
- **Not a task:** "As a developer, I want to refactor the database" (this is a tech task, not user value)
- **Not a feature list:** "I want dashboards, reports, and analytics" (this is too big—needs splitting)
- **Not vague:** "I want a better experience" (unmeasurable, no clear outcome)
- **Not a contract:** Stories are placeholders for conversation, not locked-in specs

### When to Use This
- Translating user needs into development work
- Backlog grooming and sprint planning
- Communicating value to engineering and design
- Ensuring testable acceptance criteria exist before development

### When NOT to Use This
- For pure technical debt or refactoring (use engineering tasks instead)
- When stories are too large (split first—see `user-story-splitting`)
- Before understanding the user problem (write a problem statement first)

---

## Application

### Step 1: Gather Context
Before writing a story, ensure you have:
- **User persona:** Who is this for? (reference `proto-persona`)
- **Problem understanding:** What need does this address? (reference `problem-statement`)
- **Desired outcome:** What does success look like?
- **Constraints:** Technical, time, or scope limitations

**If missing context:** Use the facts already supplied and label assumptions or open questions. Ask only for missing information that blocks a useful story; do not require a new discovery cycle to draft one.

---

### Optional Helper Script (Template Generator)

If you want a consistent Markdown stub, you can generate one from CLI inputs. This script is deterministic and does not fetch data or write files.

```bash
python3 scripts/user-story-template.py --persona \"trial user\" --action \"log in with Google\" --outcome \"access the app without creating a new password\"
```

---

### Step 2: Write the Use Case

Use `template.md` for the full fill-in structure.

Fill in the template:

```markdown
### User Story [ID]:

- **Summary:** [Brief, memorable title focused on value to the user]

#### Use Case:
- **As a** [user name if available, otherwise persona, otherwise role]
- **I want to** [action user takes to get to outcome]
- **so that** [desired outcome]
```

**Quality checks:**
- **"As a" specificity:** Is this a specific persona (e.g., "trial user") or generic ("user")?
- **"I want to" clarity:** Is this an action the user takes, or a feature you're building?
- **"So that" outcome:** Does this explain the user's motivation? Or is it just restating the action?

**Common mistakes:**
- ❌ "As a user, I want a login button, so that I can log in" (restating the action)
- ✅ "As a trial user, I want to log in with Google, so that I can access the app without creating a new password"

---

### Step 3: Write the Acceptance Criteria

Fill in the template:

```markdown
#### Acceptance Criteria:

- **Scenario:** [Brief, human-readable scenario describing value]
- **Given:** [Initial context or precondition]
- **and Given:** [Additional context or preconditions]
- **and Given:** [Additional context as needed]
- **and Given:** [UI-focused context ensuring 'When' can happen]
- **and Given:** [Outcomes-focused context ensuring 'Then' is delivered]
- **When:** [Event that triggers the action—aligns with 'I want to']
- **Then:** [Expected outcome—aligns with 'so that']
```

**Quality checks:**
- **Multiple Givens are okay:** Preconditions stack up (e.g., "Given I'm logged in" + "Given I have items in my cart")
- **Only one When:** If you need multiple "When" statements, you likely have multiple stories—split them
- **Related outcomes may share a scenario:** Use `Then` plus `And` for consequences of the same action. Split only independently valuable behaviors, not every assertion.
- **Alignment:** Does "When" match "I want to"? Does "Then" match "so that"?

**Red flags:**
- **Unrelated actions or outcomes:** May indicate scope creep; consider splitting independently valuable behaviors (reference `user-story-splitting`). Multiple assertions alone do not require splitting.
- **Vague Thens:** "Then I see improved performance" (unmeasurable—make it specific)

---

### Step 4: Add a Summary

Write a short, memorable summary that captures the story's value:

```markdown
- **Summary:** [Brief, human-readable title]
```

**Examples:**
- ✅ "Enable Google login for trial users to reduce signup friction"
- ✅ "Bulk delete items to save time for power users"
- ❌ "Add delete button" (feature-centric, not value-centric)

---

### Step 5: Validate and Refine

- **Read aloud to the team:** Does everyone understand who, what, why?
- **Test acceptance criteria:** Can QA write test cases from this?
- **Check for splitting:** If the story feels too big, use `user-story-splitting`
- **Ensure testability:** Can you prove "Then" happened?

---

### Mode B: Break a Feature into a Full Story Set (3 C's + INVEST)

Use this when the user hands you a whole feature (plus optional design link and assumptions) and wants the backlog items, not one polished story.

1. **Analyze the feature** from the design and context provided.
2. **Identify user roles** and the distinct journeys through the feature; one story per journey slice.
3. **Apply the 3 C's** to every story:
   - **Card:** a simple title and one-liner ("As a [role], I want to [action], so that [benefit].")
   - **Conversation:** a short note on intent and open questions for the team
   - **Confirmation:** Plain, numbered, testable acceptance criteria grounded in supplied requirements; do not invent criteria to reach a fixed count
4. **Check INVEST:** Independent, Negotiable, Valuable, Estimable, Small (fits one sprint), Testable. Stories should be buildable in any order.
5. **Use plain language** a primary-school graduate can understand.
6. **Link a supplied design file** (Figma, Miro) on each story; otherwise mark it not provided.

Story-set format:

```markdown
**Title:** [Feature slice name]
**Description:** As a [user role], I want to [action], so that [benefit].
**Design:** [Link to design files]
**Acceptance Criteria:**
1. [Clear, testable criterion]
2. [Observable behavior]
3. [System validates correctly]
4. [Edge case handling]
5. [Performance or accessibility consideration]
6. [Integration point]
```

Example: **Recently Viewed Section.** As an online shopper, I want to see a "Recently viewed" section on the product page so I can easily revisit items I considered. Criteria: shown at the bottom of the product page for anyone who has viewed at least one product; hidden on the first product page of a session; the current product is excluded; cards show image, title and price; each card says when it was viewed ("Viewed 5 minutes ago"); clicking a card opens that product page.

Plain numbered criteria are fine in this mode; convert to Gherkin (Step 3) when the team needs QA-ready scenarios.

---

### Mode C: Situation-First Job Stories (JTBD)

Use for job stories, JTBD-style backlog items, or the requested **When / I want to / so I can** format. Preserve the triggering situation rather than replacing it with a persona. The former `job-stories` method and example are preserved in [references/job-stories.md](references/job-stories.md).

1. Identify the situation that triggers the need, the motivation, and the desired outcome.
2. Write: **When [situation], I want to [motivation], so I can [outcome].**
3. Add observable acceptance criteria covering supplied requirements and relevant edge cases. Label proposed additions; never invent a quota of 6–8 requirements, notifications, thresholds, or integrations.
4. Include a supplied design link; otherwise write “Design: not provided” rather than fabricating one.
5. Use numbered criteria or Gherkin as requested. Keep related consequences of one action together.

Example: **Offline inspection submission.** When coverage drops while I submit an inspection, I want my report retained and submitted once connectivity returns, so I can finish the visit without losing work or creating duplicates. Criteria: retain the report on device; show pending status; retry after reconnection; do not create duplicate reports.

Role-first requests still use Mode A; full feature backlog requests use Mode B. Splitting an oversized story and planning release slices remain separate skills.

---

## Examples

See `examples/sample.md` for full examples (good, bad, and split-needed stories).

Mini example excerpt:

```markdown
### User Story 042:

- **Summary:** Enable Google login for trial users to reduce signup friction

#### Use Case:
- **As a** trial user visiting the app for the first time
- **I want to** log in using my Google account
- **so that** I can access the app without creating and remembering a new password

#### Acceptance Criteria:
- **Scenario:** First-time trial user logs in via Google OAuth
- **Given:** I am on the login page
- **and Given:** I have a login account
- **When:** I click the "Sign in with Google" button and authorize the app
- **Then:** I am logged into the app and redirected to the onboarding flow
```

---

## Common Pitfalls

### Pitfall 1: Technical Tasks Disguised as User Stories
**Symptom:** "As a developer, I want to refactor the API, so that the code is cleaner"

**Consequence:** This is an engineering task, not a user story. No user value is delivered.

**Fix:** If there's no user outcome, it's not a user story—use an engineering task or tech debt ticket instead.

---

### Pitfall 2: "As a User" (Too Generic)
**Symptom:** Every story starts with "As a user"

**Consequence:** No persona clarity. Different users have different needs.

**Fix:** Use specific personas: "As a trial user," "As a paid subscriber," "As an admin," etc. (reference `proto-persona`)

---

### Pitfall 3: "So That" Restates "I Want To"
**Symptom:** "I want to click the save button, so that I can save my work"

**Consequence:** No insight into *why* the user cares. Just restating the action.

**Fix:** Dig into the motivation: "so that I don't lose my progress if the page crashes" (real outcome).

---

### Pitfall 4: Unrelated Behaviors in One Scenario
**Symptom:** One scenario combines separate user goals or independent workflows.

**Consequence:** Scope and verification become difficult to understand.

**Fix:** Split independently valuable behaviors using `user-story-splitting`. Keep related assertions for one action together; multiple scenarios or Then/And checks do not by themselves make a story too large.

---

### Pitfall 5: Untestable Acceptance Criteria
**Symptom:** "Then the user has a better experience" or "Then it's faster"

**Consequence:** QA can't verify success. Ambiguous definition of "done."

**Fix:** Make it measurable: "Then the page loads in under 2 seconds" or "Then the user sees a success confirmation message."

---

## References

### Related Skills
- `user-story-splitting` — How to break large stories into smaller ones
- `proto-persona` — Defines the "As a [persona]" section
- `problem-statement` — Stories should address validated problems

### Optional Helpers
- `scripts/user-story-template.py` — Deterministic Markdown stub generator (no network access)

### External Frameworks
- Mike Cohn, *User Stories Applied* (2004) — Origin of the "As a / I want / so that" format
- Gherkin (Cucumber) — "Given/When/Then" acceptance criteria format
- INVEST criteria (Independent, Negotiable, Valuable, Estimable, Small, Testable)

### Provenance
- Adapted from Dean Peters' product-manager-prompts repo (https://github.com/deanpeters/product-manager-prompts).
