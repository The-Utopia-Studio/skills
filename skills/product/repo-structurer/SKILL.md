---
name: repo-structurer
description: >-
  Clean up and structure a messy repository for production: add READMEs to every
  directory, find dead files and duplicates (api-old, v2-final), split oversized
  files and functions, and suggest modularisation, asking before deleting
  anything. Use when the user says their repo is a mess, asks to clean up,
  reorganise or restructure it, add directory READMEs, or remove dead code. Not
  for writing AGENTS.md or .cursorrules (use prompt-engineer).
---

# Repo Structurer

Makes any repository clean, documented, and agent-friendly by adding READMEs, improving organization, and removing clutter.

## How It Works

1. Analyze the current directory structure
2. Identify directories missing READMEs
3. Generate context-aware READMEs for each directory
4. Identify dead code and unused files
5. Suggest modularization improvements
6. Route agent configuration work to `prompt-engineer` when requested

## Step-by-Step Procedure

### Step 1: Map the Directory Structure
```bash
find . -type d -not -path './.git/*' -not -path './node_modules/*' -not -path './.next/*' -not -path './dist/*' -not -path './__pycache__/*' -not -path './venv/*'
```

### Step 2: Check README Coverage
```bash
# Find directories without READMEs
for dir in $(find . -type d -not -path './.git/*' -not -path './node_modules/*' -not -path './.next/*' -maxdepth 3); do
  if [ ! -f "$dir/README.md" ]; then
    echo "MISSING: $dir"
  fi
done
```

### Step 3: Generate READMEs

For each directory missing a README, create one following this template:

```markdown
# {Directory Name}

{One sentence describing what this directory contains and why it exists.}

## Contents

{List the key files/subdirectories with one-line descriptions.}

## How It Works

{2-3 sentences explaining the role of this directory in the overall project.}

## Key Files

| File | Purpose |
|------|---------|
| `{file}` | {description} |
```

**Rules for README generation:**
- Read 2-3 files in the directory to understand purpose
- Keep it under 30 lines
- Focus on WHAT and WHY, not HOW (the code shows how)
- Make it useful for AI agents navigating the codebase
- Include relationships to other directories if relevant

### Step 4: Identify Dead Code
- Files not imported anywhere
- Commented-out code blocks > 10 lines
- Unused dependencies in package.json / requirements.txt
- Empty files or placeholder files
- Duplicate files with slightly different names

### Step 5: Suggest Modularization
Look for:
- Files > 300 lines that could be split
- Functions > 50 lines that could be extracted
- Mixed concerns (API routes + business logic + database queries in one file)
- Utility functions scattered across multiple files

### Step 6: Agent Configuration Handoff

For writing or updating AGENTS.md, CLAUDE.md, .cursorrules or scoped agent rules, use `prompt-engineer`. Preserve existing instructions during cleanup; do not maintain a competing agent-config template here. Report whether configuration exists and whether a handoff is needed.

## Output Format

```markdown
## 🧹 Structure Report

### README Coverage
- Before: X/Y directories documented
- After: Y/Y directories documented
- Files created: {list}

### Dead Code Found
- {file}: {reason}

### Modularization Suggestions
1. {suggestion with rationale}

### Agent Config
- Existing configuration: {paths or none}
- prompt-engineer handoff: {needed/not needed and why}
```

## Important

- ALWAYS ask before deleting files
- ALWAYS explain WHY a change is recommended
- Keep READMEs concise — agents have limited context windows
- Prioritize directories that other developers/agents interact with most
