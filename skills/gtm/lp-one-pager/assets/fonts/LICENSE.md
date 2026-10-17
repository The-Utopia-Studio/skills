# Fonts in this folder

Both families are shipped under the SIL Open Font License 1.1, which permits
embedding and redistribution. Neither may be sold on its own, and any
redistributed copy or derivative must retain the OFL.

| Family | Role here | Source |
|---|---|---|
| Space Grotesk | Substitute for a brand display face that is not reachable | https://github.com/floriankarsten/space-grotesk |
| JetBrains Mono | Data, figures, IDs, tabular numerals | https://github.com/JetBrains/JetBrainsMono |

Both were taken from the `@fontsource/space-grotesk` and
`@fontsource/jetbrains-mono` npm packages, latin subsets only.

## Why a substitute is here at all

Brand kits name their typefaces and almost never ship the files. Rather than
let a render silently fall back to a system sans, this skill embeds a close
open-licensed grotesque and keeps the real brand face first in the CSS stack,
so the page renders correctly wherever the brand face is installed.

Replace these with the real files whenever you can get them, and say in your
reply which face actually rendered. Never embed a font whose licence does not
allow it; a commercial desktop-only licence does not.
