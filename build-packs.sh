#!/usr/bin/env bash
# Build script for Claude Code plugin marketplace.
#
# Reads packs.config.json and regenerates:
#   - .claude-plugin/marketplace.json (marketplace manifest)
#   - plugins/<pack-name>/                  (one folder per pack)
#       ├── .claude-plugin/plugin.json       (plugin manifest)
#       └── skills/<skill-name>/             (copied from skills/<category>/<skill-name>/)
#
# To add a new pack: edit packs.config.json, then run ./build-packs.sh.
# To add a skill to an existing pack: add it to that pack's "skills" array in packs.config.json.
#
# Requirements: bash 4+, jq

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG="$REPO_ROOT/packs.config.json"
SKILLS_DIR="$REPO_ROOT/skills"
PLUGINS_DIR="$REPO_ROOT/plugins"
MARKETPLACE_DIR="$REPO_ROOT/.claude-plugin"

if ! command -v jq >/dev/null 2>&1; then
  echo "Error: jq is required. Install with 'brew install jq'." >&2
  exit 1
fi

if [[ ! -f "$CONFIG" ]]; then
  echo "Error: packs.config.json not found at $CONFIG" >&2
  exit 1
fi

echo "→ Building marketplace from packs.config.json"

# --- 1. Resolve skill locations (flatten skills/<category>/<skill>/ lookup) ---
declare -A SKILL_PATH_MAP
while IFS= read -r -d '' skill_dir; do
  skill_name="$(basename "$skill_dir")"
  SKILL_PATH_MAP["$skill_name"]="$skill_dir"
done < <(find "$SKILLS_DIR" -mindepth 2 -maxdepth 2 -type d -print0)

echo "  Found ${#SKILL_PATH_MAP[@]} skills in $SKILLS_DIR"

# --- 2. Clean and recreate plugins/ ---
rm -rf "$PLUGINS_DIR"
mkdir -p "$PLUGINS_DIR"
mkdir -p "$MARKETPLACE_DIR"

# --- 3. Build each pack ---
pack_count=$(jq '.packs | length' "$CONFIG")
echo "  Building $pack_count packs..."

for i in $(seq 0 $((pack_count - 1))); do
  pack_name=$(jq -r ".packs[$i].name" "$CONFIG")
  pack_desc=$(jq -r ".packs[$i].description" "$CONFIG")
  pack_version=$(jq -r ".packs[$i].version" "$CONFIG")
  pack_keywords=$(jq -c ".packs[$i].keywords" "$CONFIG")
  pack_skills=$(jq -r ".packs[$i].skills[]" "$CONFIG")

  pack_dir="$PLUGINS_DIR/$pack_name"
  mkdir -p "$pack_dir/.claude-plugin"
  mkdir -p "$pack_dir/skills"

  # Copy each skill into the pack
  skill_count=0
  missing_skills=()
  while IFS= read -r skill; do
    [[ -z "$skill" ]] && continue
    if [[ -n "${SKILL_PATH_MAP[$skill]:-}" ]]; then
      cp -R "${SKILL_PATH_MAP[$skill]}" "$pack_dir/skills/$skill"
      skill_count=$((skill_count + 1))
    else
      missing_skills+=("$skill")
    fi
  done <<< "$pack_skills"

  # Write plugin.json
  owner_name=$(jq -r '.marketplace.owner.name' "$CONFIG")
  cat > "$pack_dir/.claude-plugin/plugin.json" <<EOF
{
  "name": "$pack_name",
  "description": "$pack_desc",
  "version": "$pack_version",
  "author": { "name": "$owner_name" },
  "keywords": $pack_keywords
}
EOF

  if [[ ${#missing_skills[@]} -gt 0 ]]; then
    echo "    ⚠ $pack_name: $skill_count skills (missing: ${missing_skills[*]})"
  else
    echo "    ✓ $pack_name: $skill_count skills"
  fi
done

# --- 4. Write marketplace.json ---
echo "  Writing marketplace.json..."
jq --argjson packs "$(
  for i in $(seq 0 $((pack_count - 1))); do
    pack_name=$(jq -r ".packs[$i].name" "$CONFIG")
    pack_desc=$(jq -r ".packs[$i].description" "$CONFIG")
    pack_version=$(jq -r ".packs[$i].version" "$CONFIG")
    jq -n \
      --arg name "$pack_name" \
      --arg desc "$pack_desc" \
      --arg version "$pack_version" \
      --arg source "./plugins/$pack_name" \
      '{name: $name, source: $source, description: $desc, version: $version}'
  done | jq -s '.'
)" \
  '{
    name: .marketplace.name,
    owner: .marketplace.owner,
    description: .marketplace.description,
    plugins: $packs
  }' "$CONFIG" > "$MARKETPLACE_DIR/marketplace.json"

echo ""
echo "✓ Marketplace built successfully."
echo ""
echo "  Generated:"
echo "    .claude-plugin/marketplace.json"
echo "    plugins/           ($pack_count packs)"
echo ""
echo "  Next steps:"
echo "    1. git add -A && git commit -m 'Rebuild marketplace'"
echo "    2. git push"
echo "    3. Team runs: /plugin marketplace add The-Utopia-Studio/skills"
