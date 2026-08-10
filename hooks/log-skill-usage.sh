#!/usr/bin/env bash
# Optional PreToolUse hook for logging skill usage.
#
# Based on the Anthropic Skills guide:
#   "To evaluate skill adoption, we use a PreToolUse hook that logs skill
#   usage inside the company. This approach helps surface popular skills —
#   or ones that fire less often than expected."
#
# Usage: fellows and team members can opt in by adding this to their
# ~/.claude/settings.json:
#
#   {
#     "hooks": {
#       "PreToolUse": [
#         {
#           "matcher": "Skill",
#           "hooks": [
#             { "type": "command", "command": "~/.claude/skills/hooks/log-skill-usage.sh" }
#           ]
#         }
#       ]
#     }
#   }
#
# Logs append to ~/.claude/skill-usage.log as JSONL.
#
# To also send events to a shared team endpoint, set SKILL_USAGE_ENDPOINT to
# its base URL (see hooks/usage-server/). The local file always gets written
# first regardless — the network POST is best-effort and never blocks or
# fails the skill invocation.

set -eu

LOG_FILE="${SKILL_USAGE_LOG:-$HOME/.claude/skill-usage.log}"
mkdir -p "$(dirname "$LOG_FILE")"

# Claude Code passes hook input as JSON on stdin.
# Example payload fields include: tool_name, tool_input.skill, session_id.
INPUT="$(cat)"

TIMESTAMP="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
USER="$(whoami)"
HOST="$(hostname)"

# Extract skill name from the tool input.
# Falls back to raw input if jq isn't installed.
if command -v jq >/dev/null 2>&1; then
  SKILL="$(echo "$INPUT" | jq -r '.tool_input.skill // .tool_input.name // "unknown"')"
  SESSION="$(echo "$INPUT" | jq -r '.session_id // "unknown"')"
else
  SKILL="unknown"
  SESSION="unknown"
fi

EVENT_JSON="$(printf '{"ts":"%s","user":"%s","host":"%s","session":"%s","skill":"%s"}' \
  "$TIMESTAMP" "$USER" "$HOST" "$SESSION" "$SKILL")"

# Append a JSONL entry
printf '%s\n' "$EVENT_JSON" >> "$LOG_FILE"

# Best-effort POST to the shared endpoint. Short timeout, errors swallowed —
# never block or fail the skill invocation on a flaky/unreachable network.
if [ -n "${SKILL_USAGE_ENDPOINT:-}" ] && command -v curl >/dev/null 2>&1; then
  curl -fsS -m 2 -X POST "$SKILL_USAGE_ENDPOINT/events" \
    -H "Content-Type: application/json" \
    -d "$EVENT_JSON" >/dev/null 2>&1 || true
fi

# Always pass through (don't block the skill)
exit 0
