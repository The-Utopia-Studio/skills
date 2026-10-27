---
name: ui-animation-storyboard
description: >-
  Refactors React animations into a readable storyboard (named TIMING constants, config objects,
  one stage integer instead of setTimeout chains) and adds DialKit slider panels to tune springs,
  stagger, scale and blur live. Use when the user wants setTimeout or useEffect animation chains
  cleaned up, mentions storyboard or DialKit, or wants live dials for animation values. Not for
  adding new animation (use ui-animation).
argument-hint: "[description, file path, or sub-skill name]"
---

# Interface Craft

**By Josh Puckett**

A toolkit for building polished, animated interfaces. Write animations you can read like a script, then tune them with live controls.

---

## Skills

| Skill | When to Use | Invoke |
| --- | --- | --- |
| [Storyboard Animation](storyboard-animation.md) | Writing or refactoring multi-stage animations into a human-readable DSL | `/ui-animation-storyboard storyboard` or describe an animation |
| [DialKit](dialkit.md) | Adding live control panels to tune animation/style values | `/ui-animation-storyboard dialkit` or mention dials/sliders/controls |
| [Design Critique](design-critique.md) | Systematic UI critique of a screenshot, component, or page | `/ui-animation-storyboard critique` or paste a screenshot for review |

## Quick Start

### Storyboard Animation

Turn any animation into a readable storyboard with named timing, config objects, and stage-driven sequencing:

```tsx
/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 *    0ms   waiting for scroll into view
 *  300ms   card fades in, scale 0.85 → 1.0
 *  900ms   heading highlights
 * 1500ms   rows slide up (staggered 200ms)
 * ───────────────────────────────────────────────────────── */

const TIMING = {
  cardAppear:  300,   // card fades in
  heading:     900,   // heading highlights
  rows:        1500,  // rows start staggering
};
```

See [storyboard-animation.md](storyboard-animation.md) for the full pattern spec.

### DialKit

Generate live control panels for tuning values in real time:

```tsx
const params = useDialKit('Card', {
  scale: [1, 0.5, 2],
  blur: [0, 0, 100],
  spring: { type: 'spring', visualDuration: 0.3, bounce: 0.2 },
})
```

See [dialkit.md](dialkit.md) for all control types and patterns.

## Sub-Skill Routing

When the user invokes `/ui-animation-storyboard`:

1. **With `storyboard` argument or animation-related context** → Load and follow [storyboard-animation.md](storyboard-animation.md)
2. **With `dialkit` argument or control-panel-related context** → Load and follow [dialkit.md](dialkit.md)
3. **With `critique` argument, a pasted image, or review-related context** → Load and follow [design-critique.md](design-critique.md)
4. **With a file path** → Read the file, detect whether it needs storyboard refactoring, dialkit controls, or a design critique, and apply the appropriate skill
5. **With a plain-English description of an animation** → Use storyboard-animation to write it
6. **Ambiguous** → Ask which skill to use

## Design Principles

1. **Readable over clever** — Anyone should be able to scan the top of a file and understand the animation sequence without reading implementation code
2. **Tunable by default** — Every value that affects timing or appearance should be a named constant, trivially adjustable
3. **Data-driven** — Repeated elements use arrays and `.map()`, not copy-pasted blocks
4. **Stage-driven** — A single integer state drives the entire sequence; no scattered boolean flags
5. **Spring-first** — Prefer spring physics over duration-based easing for natural motion
