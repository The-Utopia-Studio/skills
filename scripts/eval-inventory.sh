#!/usr/bin/env bash
# Emits the eval + provenance inventory as TSV on stdout.
#
#   ./scripts/eval-inventory.sh > /tmp/inventory.tsv
#
# Columns: skill, path, pack, provenance, evidence, has_full_suite, is_icarus, results_verdict
#
# "Canonical" excludes the 84 duplicated flat skills/gtm/<skill>/ directories left
# behind by the sub-module reorganisation (each is byte-identical to its
# skills/gtm/<NN-submodule>/<skill>/ copy). Delete those and this filter is a no-op.
#
# EVAL_INVENTORY.md and PROVENANCE.md are written from this output.

set -uo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

IMPECCABLE="shape impeccable layout typeset colorize animate adapt optimize clarify delight distill bolder quieter overdrive critique audit polish"
TASTE="design-taste-frontend high-end-visual-design minimalist-ui industrial-brutalist-ui stitch-design-taste redesign-existing-projects full-output-enforcement"
EFECTO="efecto-web-design efecto-graphic-design efecto-social-media"
DG_EXT_SINGLE="emil-design-eng hallmark diagram-design architecture-diagram ui-ux-pro-max"
DG_INT="sketch-prompt ckm-design ckm-design-system ckm-ui-styling ckm-banner-design ckm-slides ckm-brand brand-narrative-playbook business-narrative-builder"
VENDOR_PREFIX="railway- vercel- huggingface- clerk-"
VENDOR_EXACT="hf-cli transformers-js obsidian-cli obsidian-bases obsidian-markdown defuddle deploy-to-vercel json-canvas"

inlist(){ case " $2 " in *" $1 "*) return 0;; esac; return 1; }
hasprefix(){ for p in $2; do case "$1" in ${p}*) return 0;; esac; done; return 1; }

verdict(){ # $1 = tests/RESULTS.md
  local f=$1 runs sc ref
  [ -f "$f" ] || { echo "missing"; return; }
  runs=$(sed -n '/^## Runs/,/^## [^R]/p' "$f")
  sc=$(grep -o "Rubric score — [0-9]*/25\|PASS — [0-9]*/25" "$f" | head -1 | grep -o "[0-9][0-9]*/25")
  ref=""; grep -q "^## Refine run" "$f" && ref=" +refine"
  if   echo "$runs" | grep -q  "pending judge";     then echo "SEEDED-UNSCORED"
  elif echo "$runs" | grep -q  "SEEDED-UNSCORED";   then
       # cases authored; some gates scored, rubric gates deliberately not
       if echo "$runs" | grep -q "Trigger precision"; then echo "GATE1-SCORED · G2/3-UNSCORED"
       else echo "SEEDED-UNSCORED"; fi
  elif echo "$runs" | grep -qi "GRADUATE-READY";    then echo "GRADUATE-READY${sc:+ $sc}$ref"
  else echo "PASS${sc:+ $sc}$ref"; fi
}

printf "skill\tpath\tpack\tprovenance\tevidence\tfull_suite\ticarus\tresults\n"
find skills -mindepth 2 -name SKILL.md | sort | while read -r f; do
  d=$(dirname "$f"); n=$(basename "$d"); rel=${d#skills/}; pack=${rel%%/*}
  # skip the flat gtm duplicates
  if [ "$pack" = gtm ] && [ "$(awk -F/ '{print NF}' <<<"$rel")" = 2 ] \
     && [ -n "$(find skills/gtm -mindepth 2 -maxdepth 2 -type d -name "$n")" ]; then continue; fi

  suite=no
  [ -f "$d/tests/rubric.json" ] && [ -f "$d/tests/RESULTS.md" ] \
    && [ "$(find "$d/tests/golden" -name '*.md' 2>/dev/null | wc -l)" -ge 5 ] \
    && [ "$(find "$d/tests/adversarial" -name '*.md' 2>/dev/null | wc -l)" -ge 3 ] && suite=yes
  ic=no; grep -q "\"$n\"" scripts/icarus-skills.json && ic=yes

  al=$(grep -m1 -i "Adapted from\|^Attribution:" "$f" | sed 's/\t/ /g; s/^[ *>-]*//' | cut -c1-115)
  lic=$(sed -n '1,15p' "$f" | grep -m1 -i "^license:.*\(based on\|adapted\)" | cut -c1-115)

  if   [ -n "$al" ];  then cls=found-outside; ev="SKILL.md: $al"
  elif [ -n "$lic" ]; then cls=found-outside; ev="frontmatter $lic"
  elif inlist "$n" "$IMPECCABLE";     then cls=found-outside; ev="DESIGN_GUIDE Sources: pbakaus/impeccable (17-skill workflow)"
  elif inlist "$n" "$TASTE";          then cls=found-outside; ev="DESIGN_GUIDE Sources: Leonxlnx/taste-skill (all 7 Taste skills)"
  elif inlist "$n" "$EFECTO";         then cls=found-outside; ev="DESIGN_GUIDE Sources: pablostanley/efecto-plugin (all 3)"
  elif inlist "$n" "$DG_EXT_SINGLE";  then cls=found-outside; ev="DESIGN_GUIDE Sources: named external repo"
  elif inlist "$n" "$DG_INT";         then cls=built-inside;  ev="DESIGN_GUIDE Sources: custom internal"
  elif [ "$ic" = yes ];               then cls=built-inside;  ev="scripts/icarus-skills.json (Icarus method skill)"
  elif grep -qi "dean's work\|deanpeters" "$f"; then cls=found-outside-NO-LINE
       ev="body cites deanpeters/product-manager-prompts (\"Dean's Work\"); no Adapted-from line"
  elif grep -qi "productcompass\|Huryn" "$f";   then cls=found-outside-NO-LINE
       ev="body cites productcompass.pm (Pawel Huryn); no Adapted-from line"
  elif hasprefix "$n" "$VENDOR_PREFIX" || inlist "$n" "$VENDOR_EXACT"; then cls=unknown-vendor-wrapper
       ev="wraps an external product/CLI; no provenance line"
  else
    # STRONG internal markers only. "fellow"/"Utopia" are deliberately NOT used:
    # they appear in studio-authored *edits* (routing tables, gotchas) as readily as
    # in studio-authored *origins*, so they detect who last touched the file rather
    # than who wrote the method. Using them mis-classified one-pager-prd as
    # built-inside the moment a routing table containing the word "fellow" was added.
    mk=""
    grep -qi "icarus" "$f"                        && mk="${mk}Icarus,"
    grep -q  "CKM" "$f"                           && mk="${mk}CKM,"
    grep -qi "karan\|kmjp\|@kmjp" "$f"            && mk="${mk}Karan,"
    grep -qi "custom internal\|studio-built" "$f"  && mk="${mk}declared-internal,"
    if [ -n "$mk" ]; then cls=built-inside; ev="strong internal marker in SKILL.md: ${mk%,}"
    else cls=unknown; ev="no provenance line, no strong internal marker"; fi
  fi
  printf "%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n" \
    "$n" "$d" "$pack" "$cls" "$ev" "$suite" "$ic" "$(verdict "$d/tests/RESULTS.md")"
done
