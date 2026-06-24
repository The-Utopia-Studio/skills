# Deck template structure

Mirrors the utopia-os-deck pattern: section-scroll site, one component per slide, motion
reveals, fixed navbar, branded loader.

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3 (with brand tokens injected from `brand.json`)
- `motion` (Framer Motion's open-source successor)
- `@fontsource/*` for self-hosted brand fonts
- No router (single-page scroll deck). Add `react-router` only if user wants multiple variant
  decks at `/investor` and `/sales`.

## File tree

```
<deck-output>/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js       # extends theme.colors/fontFamily from brand.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json              # only if deploying to Vercel
├── brand.json               # written by Phase 1
├── deck-brief.md            # written by Phase 2
├── public/
│   └── assets/
│       ├── logo.svg
│       └── <slide imagery>
├── scripts/
│   └── download-assets.sh   # optional: re-fetch figma exports
└── src/
    ├── main.tsx
    ├── App.tsx              # AnimatePresence loader → main
    ├── index.css            # @tailwind base/components/utilities + brand CSS vars
    ├── brand.ts             # typed import of brand.json
    ├── assets.ts            # central image manifest { local, figma? }
    ├── components/
    │   ├── Loader.tsx
    │   ├── Navbar.tsx
    │   ├── Reveal.tsx       # in-view motion wrapper
    │   ├── icons.tsx
    │   └── slides/
    │       ├── Cover.tsx
    │       ├── Problem.tsx
    │       ├── Solution.tsx
    │       ├── Market.tsx
    │       ├── Product.tsx
    │       ├── Traction.tsx
    │       ├── Proof.tsx
    │       ├── BusinessModel.tsx
    │       ├── GTM.tsx
    │       ├── Team.tsx
    │       ├── Roadmap.tsx
    │       └── Ask.tsx
```

## App.tsx pattern

```tsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Cover from "./components/slides/Cover";
// ...import shipped slides in order

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  return (
    <>
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: loading ? 0 : 0.2 }}
      >
        <Navbar />
        <Cover />
        {/* ...shipped slides in audience order */}
      </motion.main>
    </>
  );
}
```

## Slide conventions

- Wrap in `<section id="<kebab>" className="mx-auto max-w-[1440px] px-6 md:px-[120px]">`.
- Spacing rhythm: `py-16 md:py-24` per slide.
- Reveal wrapper for primary content: `<Reveal>...</Reveal>`.
- Headline: `font-display text-[44px] md:text-[64px] font-light leading-[1.2]`.
- Body: `font-sans text-[18px] leading-[1.6] text-ink-soft`.
- Eyebrow: `font-mono text-[14px] uppercase tracking-[1.2px] text-brand`.
- CTAs use the brand color; secondary actions use a border-only style.

## Navbar

Fixed top, anchors to each shipped slide's id. Mobile collapses to a sheet/menu. Anchors use
`scroll-behavior: smooth` set in `index.css`.

## Responsiveness checklist

- 360, 768, 1024, 1280, 1920 — no horizontal overflow.
- Headlines reflow at sm without truncation.
- Images use `max-w-full h-auto object-contain`.
- Charts (Traction slide) re-stack at sm.
- Navbar collapses below 768.

## When to add a route

Only when the user wants both investor and sales variants from the same brand. Add
`react-router-dom`, scaffold `/`, `/investor`, `/sales` — each route renders its own slide
order. Brand tokens shared.
