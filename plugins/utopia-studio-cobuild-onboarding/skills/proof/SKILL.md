---
name: proof
description: Web-first skill for working with Proof documents via proofeditor.ai. Use when a Proof URL is shared, when creating collaborative docs in Proof, or when an installed Proof preference says new docs should live there.
---

# Proof

Proof is a collaborative markdown editor for agents and humans. Use the hosted web API at `https://www.proofeditor.ai`.

Every write must include `by: "ai:<agent-name>"` so Proof can track who wrote what.

This skill is web-only. Do not use a local Mac app bridge or `localhost:9847` from this skill.

## Default Behavior

If the user shares a Proof URL:
- Join the doc immediately.
- Show presence right away.
- Read the current state before editing.
- Work in the Proof doc unless the user explicitly asks you to move elsewhere.

When creating new docs, follow this priority order:
1. If persistent instructions already define a Proof default mode, use it.
2. Otherwise default to `collaborative_docs`.

Supported default modes:
- `all_new_markdown`: new markdown artifacts you create go to Proof by default.
- `collaborative_docs`: plans, specs, bug writeups, reports, memos, proposals, drafts, and similar iterative docs go to Proof by default.
- `explicit_only`: only use Proof when the user explicitly asks.

Boundary rules:
- Existing repo-tracked markdown files stay local unless the user explicitly asks to move or share them in Proof.
- Do not silently replace local project docs with Proof links.
- If the task is code-adjacent local documentation, keep it local unless the user asks for Proof.

## Shared URLs And Auth

Shared URL format:

```text
https://www.proofeditor.ai/d/<slug>?token=<token>
```

Use one of:
- `Authorization: Bearer <token>` (preferred)
- `x-share-token: <token>`
- `?token=<token>`

`by` controls authorship. `X-Agent-Id` controls presence identity.

## If Proof Looks Wrong

Use one reporting tool call:

```bash
curl -sS -X POST "https://www.proofeditor.ai/api/bridge/report_bug" \
  -H "Content-Type: application/json" \
  -d '{
    "summary":"Short bug summary",
    "context":"What you were trying to do and what looked wrong.",
    "slug":"<slug-if-you-have-it>",
    "evidence":[
      {
        "kind":"http_response",
        "method":"POST",
        "url":"https://www.proofeditor.ai/api/agent/<slug>/edit/v2",
        "status":500,
        "requestId":"<x-request-id>"
      }
    ]
  }'
```

If the response returns `status: "needs_more_info"`, ask the suggested questions and call the same endpoint again.

If you want reference code while debugging or preparing the report, you can optionally inspect:
- `https://github.com/EveryInc/proof-sdk`

## Existing Proof Docs

When a Proof URL is provided:
1. Extract `slug` and `token`.
2. Join immediately by reading state with `X-Agent-Id` or by posting presence.
3. Read the doc.
4. Reply with a short confirmation like `Connected in Proof and ready.`
5. Then keep working inside Proof.

Read state and show presence on read:

Preferred presence identity: `X-Agent-Id`.
Compatibility: `/presence` also accepts `agentId` or `agent.id` in the JSON body.
`by` controls authorship on mutations, not presence identity.

```bash
curl -sS "https://www.proofeditor.ai/api/agent/<slug>/state" \
  -H "Authorization: Bearer <token>" \
  -H "X-Agent-Id: <your-agent-id>"
```

Update presence explicitly:

`POST /api/agent/<slug>/presence` requires explicit agent identity.
Preferred: `X-Agent-Id: <your-agent-id>`.
Also accepted: `agentId` or `agent.id` in the JSON body.

```bash
curl -sS -X POST "https://www.proofeditor.ai/api/agent/<slug>/presence" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -H "X-Agent-Id: <your-agent-id>" \
  -d '{
    "agentId":"<your-agent-id>",
    "status":"reading",
    "summary":"Joining the doc"
  }'
```

Common statuses: `reading`, `thinking`, `acting`, `waiting`, `completed`, `error`.

## Reading Comments

Read comment threads from:

```text
GET /api/agent/<slug>/state
```

Comment bodies, replies, and resolved state live in `marks` on the state response.

- Read `state.marks` for comment text and thread metadata.
- Use `/snapshot` for block refs and `edit/v2` only. It does not include comment thread bodies.
- Use `/queue/pending` as the primary "what changed?" feed and `/events/pending` as raw activity. Do not treat either as the source of comment text.

## Creating A New Proof Doc

Create a shared document:

```bash
curl -sS -X POST https://www.proofeditor.ai/share/markdown \
  -H "Content-Type: application/json" \
  -d '{"title":"My Document","markdown":"# Hello\n\nFirst draft."}'
```

Save:
- `slug`
- `accessToken`
- `shareUrl`
- `tokenUrl`
- `_links`

When Proof is the default for the task:
1. Create the doc.
2. Return the live Proof link to the user.
3. Join the doc immediately.
4. Keep working there.

## Choosing An Edit Strategy

| Task | Recommended API | Why |
|---|---|---|
| Precise paragraph or section rewrite | `edit/v2` | Block refs plus authoritative token locking |
| Simple append, replace, or insert | `edit/v2` | Stable block operations; legacy `/edit` is removed |
| Human-reviewed edits | `ops` | Suggestions and comments in track changes |
| Large rewrite proposal | `ops` + `rewrite.apply` | Produces reviewable changes |

## Snapshot And Edit V2

Get a snapshot:

```bash
curl -sS "https://www.proofeditor.ai/api/agent/<slug>/snapshot" \
  -H "Authorization: Bearer <token>"
```

Apply block operations:

```bash
curl -sS -X POST "https://www.proofeditor.ai/api/agent/<slug>/edit/v2" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -H "Idempotency-Key: <unique-key>" \
  -d '{
    "by":"ai:codex",
    "baseToken":"mt1:<token-from-state-or-snapshot>",
    "operations":[
      {"op":"replace_block","ref":"b3","block":{"markdown":"Updated paragraph."}},
      {"op":"insert_after","ref":"b3","blocks":[{"markdown":"## New section"}]}
    ]
  }'
```

Supported ops:
- `replace_block`
- `insert_before`
- `insert_after`
- `delete_block`
- `replace_range`
- `find_replace_in_block`

Schema reminder:
- `/ops` uses a top-level `type`.
- `/edit/v2` uses top-level `operations`, and each entry uses `op`.
- `replace_range` uses `fromRef` and `toRef`.

## Legacy `/edit`

`POST /api/agent/<slug>/edit` has been removed.

Older callers receive `410 LEGACY_EDIT_REMOVED` with guidance to re-read `/state` and switch to `/edit/v2`.

## Comments, Suggestions, And Rewrites

Primary endpoint:

```text
POST /api/agent/<slug>/ops
```

Use `baseToken` from `/state` or `/snapshot` on every ops request.

Legacy compatibility alias for older callers only:

```text
POST /api/documents/<slug>/ops
```

Supported op types:
- `comment.add`
- `comment.reply`
- `comment.resolve`
- `comment.unresolve`
- `suggestion.add` with `kind: "insert" | "delete" | "replace"`
- `suggestion.accept`
- `suggestion.reject`
- `rewrite.apply`

`suggestion.resolve` is not supported. Use `suggestion.accept` or `suggestion.reject` instead.
For comments, the public API supports resolve/unresolve, not delete.

Examples:

```json
{"type":"comment.add","by":"ai:codex","baseToken":"mt1:<token-from-state-or-snapshot>","quote":"anchor text","text":"Comment body"}
{"type":"comment.reply","by":"ai:codex","baseToken":"mt1:<token-from-state-or-snapshot>","markId":"comment-123","text":"Reply text"}
{"type":"suggestion.add","by":"ai:codex","baseToken":"mt1:<token-from-state-or-snapshot>","kind":"replace","quote":"old text","content":"new text"}
{"type":"suggestion.accept","by":"ai:codex","baseToken":"mt1:<token-from-state-or-snapshot>","markId":"mark-123"}
{"type":"suggestion.reject","by":"ai:codex","baseToken":"mt1:<token-from-state-or-snapshot>","markId":"mark-123"}
{"type":"suggestion.add","by":"ai:codex","baseToken":"mt1:<token-from-state-or-snapshot>","kind":"replace","quote":"old text","content":"new text","status":"accepted"}
{"type":"rewrite.apply","by":"ai:codex","baseToken":"mt1:<token-from-state-or-snapshot>","content":"# Rewritten markdown"}
```

Use the comment mark's `markId` when calling `comment.reply`.
`comment.resolve` keeps the comment in marks metadata and flips `resolved: true`; it does not delete the comment.

Use `ops` when you want the human to review changes in track changes.

## Events And Presence

Poll summarized queue items:

```bash
curl -sS "https://www.proofeditor.ai/api/agent/<slug>/queue/pending?after=0" \
  -H "Authorization: Bearer <token>"
```

Poll for pending events:

```bash
curl -sS "https://www.proofeditor.ai/api/agent/<slug>/events/pending?after=0" \
  -H "Authorization: Bearer <token>"
```

Ack processed events:

```bash
curl -sS -X POST "https://www.proofeditor.ai/api/agent/<slug>/events/ack" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"upToId":123,"by":"ai:codex"}'
```

If you are staying in the loop while a human reviews changes, keep presence updated so the doc shows what you are doing.

## Error Handling

| Error | Meaning | Action |
|---|---|---|
| `401/403` | Bad or missing auth | Re-read token from URL and retry with bearer token |
| `404` | Slug not found | Verify slug and environment |
| `409 PROJECTION_STALE` | Metadata catching up | Re-read `state` or `snapshot`, then retry |
| `409 BASE_TOKEN_REQUIRED` | Route requires `baseToken` | Re-read `state` or `snapshot` and send `mutationBase.token` |
| `409 ANCHOR_NOT_FOUND` | V1 search anchor missing | Re-read state and choose a tighter anchor |
| `422` | Invalid payload | Fix required fields and schema |
| `429` | Rate limit | Back off and retry with jitter |

Guidelines:
- Re-read state before retries that depend on anchors or revisions.
- If the behavior still looks wrong after a normal retry, call `POST /api/bridge/report_bug` with the request/response, request ID, slug, and a short context note.
- Include `by` on every write.
- Prefer `content` and markdown payloads as canonical text input.
- Use `Idempotency-Key` on `edit/v2` requests so retries stay safe.

## Discovery

- Discovery JSON: `https://www.proofeditor.ai/.well-known/agent.json`
- Docs: `https://www.proofeditor.ai/agent-docs`
- Setup: `https://www.proofeditor.ai/agent-setup`
- Report bug tool: `https://www.proofeditor.ai/api/bridge/report_bug`
- Open-source reference: `https://github.com/EveryInc/proof-sdk`
