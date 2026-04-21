#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/The-Utopia-Studio/skills.git"
INSTALL_DIR="${SKILLS_DIR:-$HOME/.agents/skills}"

echo "Installing skills to $INSTALL_DIR..."

# Clone to temp dir
TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT
git clone --depth 1 "$REPO_URL" "$TMP_DIR" 2>/dev/null

# Create install dir if needed
mkdir -p "$INSTALL_DIR"

# Copy all skills (flattened — no category subdirs)
count=0
for category in "$TMP_DIR"/skills/*/; do
  for skill in "$category"*/; do
    skill_name=$(basename "$skill")
    if [ -f "$skill/SKILL.md" ]; then
      cp -R "$skill" "$INSTALL_DIR/$skill_name"
      count=$((count + 1))
    fi
  done
done

echo "Installed $count skills to $INSTALL_DIR"
echo ""
echo "Next steps:"
echo "  - Claude Code:  cp -r $INSTALL_DIR/* ~/.claude/skills/"
echo "  - Cursor:       cp -r $INSTALL_DIR/* ~/.cursor/skills/"
echo "  - Skillshare:   skillshare config set source $INSTALL_DIR && skillshare sync"
