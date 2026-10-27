#!/usr/bin/env node
/**
 * SessionStart hook: puts the work the fellow approved in UtopiaOS in front of
 * Claude before their first message, so they don't have to ask Claude to check
 * in. Claude still answers only once they type something; Claude Code doesn't
 * start a turn by itself in an interactive session.
 *
 * Never gets in the way of starting Claude: any failure (no connection, offline,
 * a revoked token) prints nothing and exits 0.
 */

/* global process */
import { randomUUID } from "node:crypto";
import { describeActions, findConnection, pendingActions, takeActions } from "./utopia.mjs";

/** The session's id from the hook's input, so a resumed session keeps its own claims. */
async function sessionClaimant() {
  let input = "";
  for await (const chunk of process.stdin) input += chunk;
  try {
    const id = JSON.parse(input)?.session_id;
    if (typeof id === "string" && /^[A-Za-z0-9_-]{1,70}$/.test(id)) return `session:${id}`;
  } catch {
    // No input: a claim for this run alone.
  }
  return `hook:${randomUUID()}`;
}

async function main() {
  const claimant = await sessionClaimant();
  const connection = findConnection();
  if (!connection) return;
  // Only what this session claimed: work another open session is doing isn't shown twice.
  const actions = await takeActions(connection, await pendingActions(connection), claimant);
  if (actions.length === 0) return;
  process.stdout.write(
    JSON.stringify({ hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: describeActions(actions, { when: "start" }) } }),
  );
}

main().catch(() => {});
