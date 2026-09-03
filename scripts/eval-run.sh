#!/usr/bin/env bash
# Assemble the exact prompt for one eval case, so a run is reproducible.
#
#   ./scripts/eval-run.sh interview-script golden/01 > /tmp/prompt.md
#   ./scripts/eval-run.sh interview-script adversarial/02
#
# The runner (a model) is given SKILL.md and the case's ## Input section, and
# nothing else — no expected-shape, no auto-fail list. Showing the runner the
# rubric would be teaching to the test; the whole point is whether the SKILL.md
# alone produces the expected shape.
#
# Save the produced artifact to:
#   skills/<module>/<skill>/tests/runs/<YYYY-MM-DD>/<case>.md
# so the score in RESULTS.md is auditable against a real output.

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

SKILL="${1:?usage: eval-run.sh <skill> <case>   e.g. interview-script golden/01}"
CASE="${2:?usage: eval-run.sh <skill> <case>}"

DIR=$(find skills -mindepth 2 -maxdepth 3 -type d -name "$SKILL" | head -1)
[ -n "$DIR" ] || { echo "no such skill: $SKILL" >&2; exit 1; }
CASEFILE="$DIR/tests/${CASE%.md}.md"
[ -f "$CASEFILE" ] || { echo "no such case: $CASEFILE" >&2; exit 1; }

echo "You are running the skill below. Follow it exactly. Produce the artifact it"
echo "specifies and nothing else — no commentary about the skill, no meta-notes."
echo
echo "=============================== SKILL.md ==============================="
cat "$DIR/SKILL.md"
echo
echo "================================ REQUEST ==============================="
# the case's ## Input section only, stripped of the heading
awk '/^## Input$/{f=1;next} /^## /{f=0} f' "$CASEFILE" | cat -s
