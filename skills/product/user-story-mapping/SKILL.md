---
name: user-story-mapping
description: >-
  Create a Jeff Patton user story map: backbone activities, steps and tasks laid out left-to-right as
  the user's journey, prioritized top-to-bottom, with release slices and a walking-skeleton MVP. Works
  as a one-shot map or as an interactive story-mapping workshop with adaptive questions and a
  facilitation agenda. Use when planning an MVP or release around a user workflow, turning a flat
  backlog into a map, aligning a team on scope, or running a story mapping session. Not for writing
  individual stories with acceptance criteria (use user-story), splitting one oversized story (use
  user-story-splitting), or quarter-level initiative sequencing (use roadmap-planning).
intent: >-
  Visualize the user journey by creating a hierarchical map that breaks down high-level activities into steps and tasks, organized left-to-right as a narrative flow. Use this to build shared understanding across product, design, and engineering, prioritize features based on user workflows, and identify gaps or opportunities in the user experience.
type: component
---

## Purpose
Visualize the user journey by creating a hierarchical map that breaks down high-level activities into steps and tasks, organized left-to-right as a narrative flow. Use this to build shared understanding across product, design, and engineering, prioritize features based on user workflows, and identify gaps or opportunities in the user experience.

This is not a backlog—it's a strategic artifact that shows *how* users accomplish their goals, which then informs *what* to build.

## Key Concepts

### The Jeff Patton Story Mapping Framework
Invented by Jeff Patton, story mapping organizes work into a 2D structure:

**Horizontal axis (left-to-right):** User journey over time
- **Backbone:** High-level activities the user performs
- **Steps:** Specific actions within each activity
- **Tasks:** Detailed work required to complete each step

**Vertical axis (top-to-bottom):** Priority and releases
- **Top rows:** Essential tasks (MVP / Release 1)
- **Lower rows:** Nice-to-have tasks (Future releases)

### Story Map Structure

```
Segment → Persona → Narrative (User's goal)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Activity 1] → [Activity 2] → [Activity 3] → [Activity 4] → [Activity 5]
     ↓              ↓              ↓              ↓              ↓
  [Step 1.1]     [Step 2.1]     [Step 3.1]     [Step 4.1]     [Step 5.1]
  [Step 1.2]     [Step 2.2]     [Step 3.2]     [Step 4.2]     [Step 5.2]
  [Step 1.3]     [Step 2.3]     [Step 3.3]     [Step 4.3]     [Step 5.3]
     ↓              ↓              ↓              ↓              ↓
  [Task 1.1.1]   [Task 2.1.1]   [Task 3.1.1]   [Task 4.1.1]   [Task 5.1.1]
  [Task 1.1.2]   [Task 2.1.2]   [Task 3.1.2]   [Task 4.1.2]   [Task 5.1.2]
  [Task 1.1.3]   [Task 2.1.3]   [Task 3.1.3]   [Task 4.1.3]   [Task 5.1.3]
  ...            ...            ...            ...            ...
```

### Why This Works
- **User-centric:** Organizes work around user goals, not engineering modules
- **Shared understanding:** Product, design, engineering all see the same journey
- **Prioritization clarity:** Top tasks = MVP, lower tasks = future iterations
- **Gap identification:** Missing steps or tasks become obvious
- **Release planning:** Draw horizontal "release lines" to define scope

### Anti-Patterns (What This Is NOT)
- **Not a Gantt chart:** This isn't project management—it's user journey visualization
- **Not a feature list:** Activities aren't features—they're user behaviors
- **Not static:** Story maps evolve as you learn more about users

### When to Use This
- Kicking off a new product or major feature
- Aligning stakeholders on user workflow
- Prioritizing backlog based on user needs
- Identifying MVP vs. future releases
- Onboarding new team members to the product vision

### When NOT to Use This
- For trivial features (don't map what you already understand)
- When user workflows are constantly changing (map stabilizes workflows)
- As a replacement for user stories (the map informs stories, doesn't replace them)

---

## Application

### Step 1: Define the Context

Use `template.md` for the full fill-in structure.

#### Segment
Who are you building for?

```markdown
### Segment:
- [Specify the target segment, e.g., "Small business owners using DIY accounting software"]
```

**Quality checks:**
- **Specific:** Not "users" but "enterprise IT admins" or "freelance designers"

---

#### Persona
Provide details about the persona within this segment (reference `proto-persona`).

```markdown
### Persona:
- [Describe the persona: demographics, behaviors, pains, goals]
```

**Example:**
- "Sarah, 35-year-old freelance graphic designer, manages 5-10 client projects at once, struggles with invoicing and payment tracking, wants to spend less time on admin and more time designing"

---

### Step 2: Define the Narrative
What is the user trying to accomplish? Frame this as a Jobs-to-be-Done statement (reference `jobs-to-be-done`).

```markdown
### Narrative:
- [Concise narrative of the persona's objective, e.g., "Complete a client project from kickoff to final payment"]
```

**Quality checks:**
- **Outcome-focused:** Not "use the product" but "deliver a client project on time and get paid"
- **One sentence:** If it takes more than one sentence, the scope may be too broad

---

### Step 3: Identify Activities (Backbone)
List 3-5 high-level activities the persona engages in to fulfill the narrative. These form the backbone of your map.

```markdown
### Activities:
1. [Activity 1, e.g., "Negotiate project scope and pricing"]
2. [Activity 2, e.g., "Execute design work"]
3. [Activity 3, e.g., "Deliver final assets to client"]
4. [Activity 4, e.g., "Send invoice and receive payment"]
5. [Activity 5, optional]
```

**Quality checks:**
- **Sequential:** Activities happen in order (left-to-right)
- **User actions:** Describe what the user *does*, not what the product *provides*
- **3-5 activities:** Too few = oversimplified, too many = overwhelming

---

### Step 4: Break Activities into Steps
For each activity, list 3-5 steps that detail how the activity is carried out.

```markdown
### Steps:

**For Activity 1: [Activity Name]**
- Step 1: [Detail step 1, e.g., "Review client brief"]
- Step 2: [Detail step 2, e.g., "Draft project proposal"]
- Step 3: [Detail step 3, e.g., "Negotiate timeline and budget"]
- Step 4: [Optional step 4]
- Step 5: [Optional step 5]

**For Activity 2: [Activity Name]**
- Step 1: [Detail step 1]
- Step 2: [Detail step 2]
...
```

**Quality checks:**
- **Actionable:** Each step is something the user does
- **Observable:** You could watch someone perform this step
- **Logical sequence:** Steps follow a natural order

---

### Step 5: Break Steps into Tasks
For each step, list 5-7 tasks that must be completed.

```markdown
### Tasks:

**For Activity 1, Step 1: [Step Name]**
- Task 1: [Detail task 1, e.g., "Read client brief document"]
- Task 2: [Detail task 2, e.g., "Identify key deliverables"]
- Task 3: [Detail task 3, e.g., "Note budget constraints"]
- Task 4: [Detail task 4, e.g., "Clarify timeline expectations"]
- Task 5: [Detail task 5, e.g., "List open questions for client"]
- Task 6: [Optional task 6]
- Task 7: [Optional task 7]

**For Activity 1, Step 2: [Step Name]**
- Task 1: [Detail task 1]
...
```

**Quality checks:**
- **Granular:** Tasks are small, specific actions
- **User-facing or behind-the-scenes:** Include both (e.g., "Send email" and "Receive confirmation")
- **Prioritizable:** You'll prioritize tasks vertically (top = essential, bottom = nice-to-have)

---

### Step 6: Prioritize Vertically
Arrange tasks top-to-bottom by priority:
- **Top rows:** MVP / Release 1 (must-have)
- **Middle rows:** Release 2 (important but not critical)
- **Bottom rows:** Future / Nice-to-have

Draw horizontal "release lines" to demarcate scope.

---

### Step 7: Identify Gaps and Opportunities
Review the map and ask:
- Are there missing steps or tasks?
- Are there pain points we're not addressing?
- Are there opportunities to delight users?
- Do all activities flow logically?

---

## Workshop Mode (Interactive)

Use this mode when the user wants to *run* a story-mapping session ("run a story mapping workshop", "facilitate this with my team", "move our flat backlog to a map"). Follow the `workshop-facilitation` skill for pacing (one question per turn, progress labels, numbered options); skip the multi-turn flow if the user asks for a single-shot map. Use `workshop.md` for the 90-120 minute agenda and outputs checklist.

**Vocabulary:**
- **Backbone:** the activities across the top, in narrative order. They are not prioritized against each other; they are the story of the system.
- **Walking skeleton:** the highest-priority task under every activity. Together they form the smallest end-to-end release.
- **Ribs:** supporting tasks hanging under each activity, ordered by priority.
- **Build left-to-right, top-to-bottom:** ship a thin slice across all activities before deepening any one of them. This avoids "context-free mulch", a flat backlog where stories lose the system narrative.

**Step 0, gather context.** Ask for the product concept, PRD draft or existing backlog, personas or JTBD, and any research. The user can paste it or describe the system briefly.

**Up to 5 adaptive questions, each with 3-4 numbered options plus "Other":**
1. **Scope:** entire product / major feature area (e.g., onboarding, checkout) / one user journey or job / redesign of an existing flow.
2. **Users:** single persona / several personas sharing one workflow (e.g., marketplace buyer and seller) / several personas with different workflows (use swim lanes or separate maps) / internal roles.
3. **Backbone:** generate 5-8 activities left-to-right from the answers (e.g., Browse, Add to Cart, Review Cart, Enter Shipping, Enter Payment, Confirm, Receive Confirmation), then ask the user to add, remove or reorder.
4. **Tasks:** generate 3-5 tasks per activity, top = must-have (walking skeleton), bottom = nice-to-have, and confirm priorities.
5. **Release slices:** draw three horizontal lines: Release 1 walking skeleton (simplest version of every activity), Release 2 enhancements, Release 3 polish and edge cases.

**Output:** `# User Story Map: [scope]` with users and date, the backbone line, the full map (each task tagged Must/Should/Nice and its release), the three release slices with stories listed per activity and a one-line "why this is the walking skeleton", and next steps (write stories with `user-story`, estimate, walk the map with stakeholders, keep it visible).

**Bad map to avoid:** a backbone of `UI Layer -> API Layer -> Database Layer -> Deployment`. It follows system layers, not the user's workflow, so no release delivers end-to-end value. Re-map by workflow, e.g. `Sign Up -> Configure Settings -> Invite Team -> Start Project`.

**Workshop pitfalls:** a vertical list with no horizontal narrative; Release 1 = "build Activity 1 fully" (feature-complete waterfall); mapping every edge case up front; the map hidden in a tool instead of displayed.

---

## Examples

See `examples/sample.md` for a full story map example.

---

## Common Pitfalls

### Pitfall 1: Activities Are Features, Not User Behaviors
**Symptom:** "Activity 1: Use the dashboard. Activity 2: Generate reports."

**Consequence:** You've mapped the product, not the user journey.

**Fix:** Reframe as user actions: "Activity 1: Monitor project progress. Activity 2: Summarize work for stakeholders."

---

### Pitfall 2: Too Many Activities
**Symptom:** 10+ activities across the backbone

**Consequence:** Map becomes overwhelming and loses focus.

**Fix:** Consolidate. If you have 10 activities, you're likely mixing activities with steps. Aim for 3-5 high-level activities.

---

### Pitfall 3: Tasks Are Too Vague
**Symptom:** "Task 1: Do the thing"

**Consequence:** Can't prioritize or estimate vague tasks.

**Fix:** Be specific: "Task 1: Enter client email address in the 'Bill To' field."

---

### Pitfall 4: Ignoring Vertical Prioritization
**Symptom:** All tasks at the same level—no MVP vs. future releases defined

**Consequence:** No clarity on what to build first.

**Fix:** Explicitly prioritize. Draw release lines. Force hard choices about what's MVP.

---

### Pitfall 5: Mapping in Isolation
**Symptom:** PM creates the map alone, then presents it to the team

**Consequence:** No shared ownership or understanding.

**Fix:** Map collaboratively. Use Workshop Mode above with product, design, and engineering.

---

## References

### Related Skills
- `proto-persona` — Defines the persona for the story map
- `jobs-to-be-done` — Informs the narrative and activities
- `user-story` — Tasks from the map become user stories
- `user-story-splitting` — Split map tasks that are too big for a sprint
- `problem-statement` — Problem statement frames the narrative

### External Frameworks
- Jeff Patton, *User Story Mapping* (2014) — Origin of the story mapping technique
- Teresa Torres, *Continuous Discovery Habits* (2021) — Opportunity solution trees (complementary to story maps)
- Jeff Patton, "The New User Story Backlog is a Map" (blog) — the backbone concept

### Provenance
- Adapted from Dean Peters' product-manager-prompts repo (https://github.com/deanpeters/product-manager-prompts).
