# Reference mining — Pinterest, existing decks, mood boards

The user can hand over visual references to set the *feel* of the deck. References never
override the brand book. They influence: density, contrast, type pairing direction, imagery
style, motion intensity.

## Accept

- Pinterest board URLs (public).
- Individual image URLs (any host).
- Local image paths (PNG/JPG/WebP).
- PDF / pptx / keynote exports of existing decks (extract page screenshots).
- Other deck repos (clone, screenshot key sections).

Cap at 10 references. More noise, not more signal.

## Mine (in this order)

1. **Palette temperature** — warm / neutral / cool / high-contrast / muted. Compare to brand
   palette. If reference is warmer than brand, brand still wins — but lean warmer within brand
   range (use `brand.light` over `brand.deep`).
2. **Contrast level** — high (black on white, electric accents), medium (off-white surfaces,
   muted accents), low (tone-on-tone). Sets `surface` vs `bg` separation in the deck.
3. **Type pairing direction** — display sizes (tight headline / spacious editorial / techy
   mono-led). Sets headline scale + leading.
4. **Imagery density** — full-bleed / contained / no imagery. Sets slide layout templates.
5. **Motion intensity** — static / subtle (fades, slow drifts) / kinetic (slides, scrubs).
   Sets motion duration + stagger in `brand.json`.

## Write conclusions

Append to `deck-brief.md` under `## Visual direction`:

```md
## Visual direction
- Temperature: <neutral|warm|cool> within brand range
- Contrast: <high|medium|low>
- Type: <tight|editorial|mono-led>
- Imagery: <full-bleed|contained|none>
- Motion: <static|subtle|kinetic>
- References: <count> (paths/URLs listed below)
```

## Conflicts

If a reference suggests a colour outside the brand palette, drop the colour, keep the
*relationship* (e.g. "accent appears at 5% area, never as a fill"). Note the drop in the brief
so the user can override.

## Never

- Reproduce a competitor's exact slide. Sample moves, not layouts.
- Use brand book hero imagery as deck imagery — the brand book is a different artefact.
- Carry watermarks, stock-overlay text, or recognizable product UI from third-party shots.
