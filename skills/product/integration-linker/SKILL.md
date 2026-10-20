---
name: integration-linker
description: >-
  Connect a startup's dev tools so they talk to each other: GitHub and Vercel
  notifications into Slack, Linear issues linked to branches and PRs, Sentry
  error alerts into Slack, with step-by-step setup and a connectivity map. Use
  when the user asks to connect or integrate GitHub, Slack, Linear, Jira, Sentry
  or Vercel, set up PR, deploy or error notifications, or says their tools do
  not talk to each other. Not for setting up Sentry itself (use monitoring-
  setup) or CI/CD (use deployment-engineer).
---

# Integration Linker

Detects which development tools are in use and connects them together with step-by-step procedures.

## How It Works

1. Run detection commands to find which tools are configured
2. Identify missing high-value connections
3. Provide step-by-step setup for each recommended integration
4. Verify connections work

## Step-by-Step Procedure

### Step 1: Detect Current Tools
```bash
# Detect Slack
grep -rn "SLACK_\|slack-sdk\|@slack/\|slack-webhook" --include="*.ts" --include="*.js" --include="*.py" --include="*.env*" . 2>/dev/null | head -5

# Detect Linear
grep -rn "LINEAR_\|linear-sdk\|@linear/sdk" --include="*.ts" --include="*.js" --include="*.env*" . 2>/dev/null | head -5

# Detect project management (Jira, Asana, Notion)
grep -rn "JIRA_\|ASANA_\|NOTION_\|jira\|asana\|@notionhq" --include="*.ts" --include="*.js" --include="*.env*" . 2>/dev/null | head -5

# Detect CI/CD (already linked?)
ls .github/workflows/ 2>/dev/null

# Detect error tracking (Sentry, PostHog)
grep -rn "SENTRY_DSN\|POSTHOG_\|sentry\|posthog" --include="*.ts" --include="*.js" --include="*.env*" . 2>/dev/null | head -5

# Detect hosting platform
ls vercel.json railway.toml fly.toml render.yaml 2>/dev/null
```

### Step 2: Set Up GitHub → Slack Notifications
**Source:** [GitHub Slack integration](https://github.com/integrations/slack)

1. In Slack: Go to your workspace → Apps → Search "GitHub" → Install
2. In a Slack channel, type: `/github subscribe owner/repo`
3. This enables: issue/PR notifications, deployment status, CI results

To customize notifications:
```bash
# In Slack channel:
/github subscribe owner/repo pulls commits releases deployments
/github unsubscribe owner/repo issues
```

For webhook-based alerts (more control):
```yaml
# .github/workflows/notify-slack.yml
name: Slack Notification
on:
  push:
    branches: [main]
  pull_request:
    types: [opened, merged]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: slackapi/slack-github-action@v2
        with:
          webhook: ${{ secrets.SLACK_WEBHOOK_URL }}
          payload: |
            {"text": "${{ github.event_name }}: ${{ github.event.pull_request.title || github.event.head_commit.message }}"}
```

### Step 3: Set Up Linear → GitHub Sync
**Source:** [Linear GitHub integration docs](https://linear.app/integrations/github)

1. In Linear: Settings → Integrations → GitHub → Connect
2. Select which repos to link
3. Enable PR linking and commit linking

**Branch naming convention** (auto-links PRs to issues):
```bash
# Use Linear issue ID in branch name:
git checkout -b feat/LIN-123-add-user-auth

# Or in PR title:
# "LIN-123: Add user authentication"
```

**Magic words in PR description** (alternative linking):
```
Fixes LIN-123
Closes LIN-123
Resolves LIN-123
```

**Workflow automations** (per-team settings):
- PR opened → Issue moves to "In Progress"
- PR merged → Issue moves to "Done"
- PR closed → Issue moves back to "Todo"

### Step 4: Set Up Sentry → Slack Alerts
**Source:** [Sentry Integrations](https://sentry.io/integrations/)

1. In Sentry: Settings → Integrations → Slack → Install
2. Configure alert rules: Settings → Alerts → Create Alert
3. Set conditions: "When an issue is first seen" → "Send Slack notification to #engineering"

### Step 5: Set Up Vercel → Slack Deploy Notifications
1. In Vercel dashboard: Settings → Integrations → Slack → Install
2. Select project and channel
3. Enables: deploy started, deploy succeeded, deploy failed notifications

## Output Format

```markdown
## 🔗 Integration Status

### Currently Connected
- {Tool A} ↔ {Tool B}: {what's linked}

### Recommended Connections
1. **{Tool A} → {Tool B}** — Why: {one sentence value prop}
   Setup time: ~{X} minutes
   Steps: {numbered list}

### Connectivity Map
GitHub ──→ Slack (PR notifications)
  │
  └──→ Linear (auto-link issues)
  │
  └──→ Vercel (auto-deploy)
         │
         └──→ Slack (deploy notifications)
Sentry ──→ Slack (error alerts)
```
