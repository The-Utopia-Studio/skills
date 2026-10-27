# Brand-system and business-goal review

Absorbed from the former `design-critique` skill (originally in Korean). Use it with the critique report whenever (a) the user supplies a brand design system, component guide, Figma tokens or CSS variable file, or (b) the screen has a clear business goal (signup, purchase, retention, trust).

## Input handling

| Input | How to treat it |
|---|---|
| Image / screenshot | Visual analysis only. Without code, do not guess CSS values; judge what is visible. |
| URL | Fetch HTML/CSS to extract tokens, structure and hierarchy, and pair that with visual analysis. If it is auth-walled or a JS-only shell, ask for a screenshot. |
| Code file / component | Static analysis of markup, styles and structure; infer the rendered result. |
| Spec / wireframe | Skip colour and type scoring. Judge only structure, flow, information hierarchy and business logic, and say what was skipped. |
| Unclear input | Ask one question and wait. Do not guess. |

If the user invokes critique with no design attached, ask for it, and ask whether a brand design system exists so you can check for deviations.

## Business-goal check (add to the report)

- What is this screen's key business metric (conversion, retention, trust, task completion)?
- Does the current design help or hurt that metric, and why?
- Are trust signals present (evidence, social proof, security indicators)? Never invent them.
- What friction blocks the primary CTA?

Do not stop at "this CTA placement hurts conversion". Say why, and name the pattern that would work better.

## Brand-system deviation check

Run this whenever a design system is supplied. Output a "Brand-system deviations" section.

| Item | What to check |
|---|---|
| Colour tokens | Do the colours come from defined tokens, or are there hard-coded one-off values? |
| Typography | Does it follow the defined families, size scale and weights? |
| Spacing | Does it follow the spacing scale, or are there arbitrary pixel values? |
| Components | Are the official button, card and input components used correctly? Is any variant intentional? |
| Iconography | Does it follow the icon library and size rules? |
| Motion | Do easing and durations match the defined values? |

Format each finding concretely, for example:

- [Colour] Button bg `#2563f0`; token `--color-primary` is `#1a56db`. Confirm whether the change is intentional.
- [Spacing] Card padding 14px is not on the scale. Align to 12px or 16px.
- [Component] Secondary button renders as ghost; the guideline specifies outline.

If there are no deviations, write: "No brand-system deviations: every checked item matches the guidelines."

## Two sharp questions

Every critique ends its findings with exactly two questions for the designer. They must:
- not be answerable with yes or no;
- reach an angle the designer probably has not considered;
- tie directly to a finding (no random questions).

Bad: "Do you plan to improve this design further?"
Good: "Do you know which page most users who bounce from this hero go to next, and does this CTA support that path?"

## Three-tier action plan

Order fixes as `[priority] · [target] · [concrete change] · [expected effect]`:
1. **Now (blocker):** accessibility violations, an unidentifiable CTA, WCAG failures, brand-system conflicts.
2. **This sprint (significant):** UX-flow blockers, broken consistency, hurt business goals.
3. **Next sprint (polish):** fine alignment, small spacing, type tuning.

## Phrases to avoid

| Avoid | Instead |
|---|---|
| "Looks clean overall" | Don't write it. |
| "Could be improved a bit" | What, how, and why. |
| "Contrast is a little low" | "`#9ca3af` on white: 2.8:1, fails WCAG AA." |
| "Users might find this inconvenient" | Which user, in which task, blocked how. |
| Praise sandwich | Praise only what is genuinely good, and be specific. |
| Listing 15 issues as equals | Sort by severity. |
