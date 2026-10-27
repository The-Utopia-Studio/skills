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
import { describeActions, findConnection, pendingActions } from "./utopia.mjs";

async function main() {
  const connection = findConnection();
  if (!connection) return;
  const actions = await pendingActions(connection);
  if (actions.length === 0) return;
  process.stdout.write(
    JSON.stringify({ hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: describeActions(actions, { when: "start" }) } }),
  );
}

main().catch(() => {});
