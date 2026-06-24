# Brand extraction — reading tokens from a brandbook-builder repo

The brandbook-builder plugin (aiden150/brandbook-builder) produces Vite + React + TS + Tailwind
+ Shadcn brand-book apps. Brand tokens live in predictable files. Read them in this order and
stop at the first source that resolves each token.

## Source modes

1. **existing repo on disk** — user gives a path. Read directly.
2. **clone on demand** — user gives a git URL. `git clone --depth 1 <url> .cache/brand-source/`
   inside the deck output dir. Never write to the clone.
3. **inline intake** — no brand book. Prompt for the minimum (see bottom of file). Write the
   user's answers straight into `brand.json`.

## Files to read (in order)

| File                              | Tokens                                     |
|-----------------------------------|--------------------------------------------|
| `tailwind.config.{js,ts,cjs,mjs}` | `theme.extend.colors`, `theme.extend.fontFamily`, `borderRadius`, `boxShadow` |
| `src/index.css` / `src/globals.css` / `app/globals.css` | `:root { --... }` custom props (Shadcn convention) |
| `src/brand.{ts,tsx,json}` / `tokens.{ts,json}` / `theme.{ts,json}` | typed token export |
| `src/lib/brand.ts` / `src/config/brand.ts` | configured constants |
| `public/brand/` or `public/assets/` | `logo.svg`, `logo-mark.svg`, `wordmark.svg` |
| `src/copy/` or `src/content/` | voice samples, tagline, value props |
| `README.md` / `BRAND.md`        | tone-of-voice notes, do/don't                |

## Mapping rules

- **Brand color** — `theme.extend.colors.brand.DEFAULT`, else `--primary`, else first non-grey
  custom color. If multiple shades exist (`brand.deep`, `brand.light`), keep them.
- **Ink / text** — `colors.ink`, else `--foreground`, else `#101010`.
- **Surface / bg** — `colors.bg` / `--background`, else `#ffffff`.
- **Display font** — `fontFamily.display`, else `fontFamily.sans[0]`, else from `@fontsource/*`
  package.json deps.
- **Body font** — `fontFamily.sans`, fall back to `system-ui`.
- **Mono** — `fontFamily.mono`, fall back to `ui-monospace`.
- **Radius** — `borderRadius.lg|md|sm`, else `--radius`, else `{sm:4, md:8, lg:16}`.
- **Logo** — first SVG in `public/brand/` or `public/assets/` with `logo` in name.

## Voice extraction

If `BRAND.md`, `voice.md`, or any markdown under `src/content/` mentions tone words
(confident / playful / clinical / warm / technical), capture up to 5 adjectives and write them
into `brand.json` under `voice.adjectives`. The build phase passes these to copy generation as
guard-rails.

## Inline intake (no brand book)

Ask in one `AskUserQuestion` call:

1. Primary brand colour (hex).
2. Accent / secondary (hex, optional).
3. Ink / text colour (hex, default `#101010`).
4. Display font name (must exist on `fontsource.org` or Google Fonts).
5. Body font name (same).
6. Logo file (SVG/PNG path, or "none — placeholder").
7. 3-word voice (e.g. "confident, plain, numerate").

Write straight to `brand.json`. Show back to user. Move on.

## What never to extract from a brand book

- Specific copy from the brand book's marketing pages. That's the brand's own pitch, not
  yours. Voice yes, lines no.
- Hero imagery from the brand book site. The deck needs its own imagery.
- Layout patterns. The deck has its own layout pattern (section-scroll, not document-grid).
