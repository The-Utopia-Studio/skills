---
name: deployment-engineer
description: >-
  Set up CI/CD and deployment infrastructure: GitHub Actions for lint, tests and
  deploys, a production Dockerfile and docker-compose, dev/staging/production
  environment separation with env vars, and health checks. Use when the user
  asks to set up CI/CD, add GitHub Actions, dockerize an app, create staging and
  production environments, automate deploys, or stop deploying by SSH and git
  pull. Not for one-off Vercel deploys (use deploy-to-vercel), Railway (use
  railway), or monitoring (use monitoring-setup).
---

# Deployment Engineer

Sets up production-grade deployment infrastructure from scratch or improves existing setups.

## How It Works

1. Detect current deployment setup
2. Identify gaps in the CI/CD pipeline
3. Set up or improve GitHub Actions workflows
4. Configure Docker if needed
5. Establish dev/staging/prod environment separation

## Step-by-Step Procedure

### Step 1: Assess Current Setup
- Check `.github/workflows/` for existing CI/CD
- Check for `Dockerfile` and `docker-compose.yml`
- Check for hosting config (`vercel.json`, `railway.toml`, `fly.toml`)
- Check `package.json` scripts for build/start/test commands

### Step 2: Set Up GitHub Actions (if missing)

Create `.github/workflows/ci.yml`:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js  # Adapt for Python/Go/etc.
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: npm test
```

Adapt for the detected tech stack:
- **Python**: Use `setup-python`, `pip install`, `pytest`
- **Go**: Use `setup-go`, `go build`, `go test`
- **Next.js**: Add `npm run build` step with environment variables

### Step 3: Set Up Dockerfile (if needed and missing)

For **Node.js/Next.js**:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

### Step 4: Set Up Environment Separation

Create `.env.example` listing all required variables (no values):
```bash
# Database
DATABASE_URL=
# Auth
AUTH_SECRET=
NEXTAUTH_URL=
# External APIs
API_KEY=
```

Ensure `.env` and `.env.local` are in `.gitignore`.

### Step 5: Health Check Endpoint

If the app has an API, add a health check:
```typescript
// /api/health or /health
export function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || 'unknown'
  });
}
```

## Output Format
Present a checklist of what was created/configured with brief explanations of why each matters.
