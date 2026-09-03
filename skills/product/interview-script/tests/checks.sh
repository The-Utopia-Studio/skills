#!/usr/bin/env bash
# Mechanical auto-fail checks for an interview-script run output.
#
#   ./checks.sh runs/2026-09-03/golden-01.md
#
# These are the auto-fails that need no judgment. They gate the rubric rather
# than replacing it: an output that trips one cannot pass Gate 2 however well it
# reads, so run these first and stop if they fire. Exit 0 = clean.
#
# CASE-AWARE BY DESIGN. Several of this skill's correct answers contain no
# script at all — a routing response, a diagnosis, a refusal. Applying
# script-shape checks to those is a false positive, and the first run of this
# checker produced five of them (golden 02/03/04, adversarial 01/02/03) before
# this was fixed. The script-shape checks below therefore run only when the
# output actually contains a script.
#
# SCOPED TO QUESTION LINES. The banned-question and pitch checks look only at
# bulleted quoted lines (`- "..."`), which is how this skill formats the words
# you say in the room. Prose and tables are excluded on purpose: a correct
# output QUOTES banned forms in order to condemn or rewrite them, and the first
# version of this checker failed adversarial/02 for doing exactly that.

set -uo pipefail
F="${1:?usage: checks.sh <run-output.md>}"
[ -f "$F" ] || { echo "no such file: $F" >&2; exit 1; }
fails=0

# Does this output contain a script? (section headings, or several question lines)
HAS_SCRIPT=no
if grep -qEi '^#+ .*(Opening|Warm.?up|Core|Wrap.?up|The script|The spine)' "$F" \
   || [ "$(grep -cE '^[[:space:]]*[-*][[:space:]]*"' "$F")" -ge 5 ]; then
  HAS_SCRIPT=yes
fi

# Question lines only — the words actually said in the room.
QLINES=$(grep -nE '^[[:space:]]*[-*][[:space:]]*"' "$F" || true)

# --- 1. No hypothetical / future-tense question -----------------------------
BANNED="would you (use|pay|want|prefer|be interested|consider|like)|do you think .* would|does (that|this) sound (useful|good|interesting)|would (that|this|it) (be|help|work)|how much would you|what would you pay|if we (built|made|added)"
hits=$(echo "$QLINES" | grep -Ei "($BANNED)" || true)
if [ -n "$hits" ]; then
  echo "AUTO-FAIL 1 — hypothetical/future-tense question in the script:"
  echo "$hits" | sed 's/^/    /' | head -10
  fails=$((fails+1))
fi

# --- 2. Note-taking template accompanies any script -------------------------
if [ "$HAS_SCRIPT" = yes ] && ! grep -qiE 'note.?taking|note template|note card|^Participant:|Participant: \[' "$F"; then
  echo "AUTO-FAIL 2 — script produced with no note-taking template"
  fails=$((fails+1))
fi

# --- 3. No free-text impression field in the note template ------------------
imp=$(grep -nEi '^[[:space:]]*[-*|]?[[:space:]]*(overall )?(impressions?|thoughts|how it went|general (notes|feel)|sentiment|vibe):' "$F" || true)
if [ -n "$imp" ]; then
  echo "AUTO-FAIL 3 — free-text impression field in the note template:"
  echo "$imp" | sed 's/^/    /'
  fails=$((fails+1))
fi

# --- 4. The script must not pitch -------------------------------------------
pitch=$(echo "$QLINES" | grep -Ei "we('re| are) (building|developing|working on|launching)|let me (tell you about|show you)|our (new )?(product|tool|platform) (does|will)" || true)
if [ -n "$pitch" ]; then
  echo "AUTO-FAIL 4 — pitch in the script:"
  echo "$pitch" | sed 's/^/    /' | head -6
  fails=$((fails+1))
fi

echo
if [ "$fails" -eq 0 ]; then echo "✓ mechanical checks clean (script present: $HAS_SCRIPT) — $F"; exit 0; fi
echo "✗ $fails mechanical auto-fail(s) — Gate 2 cannot pass — $F"; exit 1
