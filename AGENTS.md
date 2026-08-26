# Ceramic Design System agent rules

1. Run `npm run ceramic -- manifest --json` before generating UI.
2. Run `npm run ceramic -- search <intent> --json`, then inspect the selected component or template.
3. Prefer `@utopia-studio-design/design-system` exports over raw shadcn/ui source.
4. Components consume semantic tokens only. The active theme is `utopia-default`.
5. Request semantic motion only; inspect `npm run ceramic -- motion ceremonial --json` before choosing an application runtime adapter.
6. Read `npm run ceramic -- docs arabic-friendly --dense` before Arabic or RTL work.
7. Never invent component props, import paths, tokens, Arabic product copy, or left/right-only APIs.
8. Validate with `npm run ceramic:doctor` before handoff.

## Learned User Preferences

- Organize the marketplace into four modules only: GTM, Product, Investments, and Founder Productivity (overflow for skills that do not fit the first three).
- Prefer selective skill imports over bulk-adding external libraries; curate high-judgment additions and skip thin or vendor-locked long-tail skills.
- Keep install UX extremely simple: clear docs plus a copy-paste Claude Code / agent prompt.
- For public web surfaces, use the Utopia Ceramic design system with the `utopia-default` theme (including GitHub Pages).
- Commit and push only when explicitly asked; stage coherent marketplace slices and avoid scooping unrelated WIP.

## Learned Workspace Facts

- This workspace is the Utopia Skills marketplace repo: `https://github.com/The-Utopia-Studio/skills` at `/Users/kp/Documents/Utopia Skills`.
- Canonical skill sources live under `skills/<module>/` where module is `gtm`, `product`, `investments`, or `founder-productivity`. GTM skills nest one level deeper: `skills/gtm/<01–07 submodule>/<skill>/`.
- Installable packs are `utopia-gtm`, `utopia-product`, `utopia-investments`, and `utopia-founder-productivity` (rebuilt into `plugins/`); the old cobuild/M1–M9 pack layout is retired.
- GTM plugin path is `plugins/utopia-gtm` (not `plugins/utopia-studio-cobuild-gtm`).
- Swan GTM P0 skills were adapted into `skills/gtm/` (account tiering, warm intros, signal-anchored messaging, deliverability, cold offers, call scorecards, deal velocity, forecasting, outreach execution, earned autonomy).
- Public marketing site is GitHub Pages from `docs/` with vendored `utopia-default` theme assets, live at `https://the-utopia-studio.github.io/skills/`.
- Ceramic/agent config for this repo includes `.ceramic/`, design-system npm packages, and mirrored Ceramic rules in `AGENTS.md` / `CLAUDE.md`.
