/**
 * The UtopiaOS connection the fellow already gave Claude Code, and the one call
 * these scripts make with it: get_pending_actions on the UtopiaOS MCP.
 *
 * No new setup: the Connect page adds UtopiaOS to Claude Code under the name
 * "utopia" at user scope (`claude mcp add --scope user utopia … --header
 * "Authorization: Bearer …"`), which Claude Code keeps in ~/.claude.json (or in
 * $CLAUDE_CONFIG_DIR). The address and header are read from there, used for
 * this one request and never written anywhere. UTOPIA_MCP_URL and UTOPIA_TOKEN
 * override them, for testing.
 *
 * No dependencies, so the plugin runs as installed: Node's own fetch and fs.
 * Shared by the session-start hook (this plugin) and the channel pilot
 * (plugins/utopia-os-channel, which carries a copy kept in step by a test).
 */

/* global process, URL, fetch, AbortSignal */
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

export const SERVER_NAME = "utopia";
const REQUEST_TIMEOUT_MS = 8_000;
/** Below this much time left, a request isn't worth starting. */
const MIN_REQUEST_MS = 500;

/** @typedef {Record<string, string | undefined>} Env */

/**
 * Where Claude Code keeps user-scope MCP servers.
 * @param {Env} [env]
 * @param {string} [home]
 */
export function configPaths(env = process.env, home = homedir()) {
  const dir = env.CLAUDE_CONFIG_DIR;
  return dir ? [join(dir, ".claude.json"), join(home, ".claude.json")] : [join(home, ".claude.json")];
}

/**
 * The UtopiaOS address and Authorization header, or null when UtopiaOS isn't connected to Claude Code.
 * @param {{ env?: Env; home?: string; read?: (path: string) => string }} [options]
 * @returns {{ url: string; authorization: string } | null}
 */
export function findConnection({ env = process.env, home = homedir(), read = (path) => readFileSync(path, "utf8") } = {}) {
  // The override is held to the same rule as the saved connection: the token only goes to https, or to a local address.
  if (env.UTOPIA_MCP_URL && env.UTOPIA_TOKEN) return isAllowedUrl(env.UTOPIA_MCP_URL) ? { url: env.UTOPIA_MCP_URL, authorization: `Bearer ${env.UTOPIA_TOKEN}` } : null;
  for (const path of configPaths(env, home)) {
    let config;
    try {
      config = JSON.parse(read(path));
    } catch {
      continue;
    }
    const server = config?.mcpServers?.[SERVER_NAME];
    const url = typeof server?.url === "string" ? server.url : null;
    const headers = server?.headers && typeof server.headers === "object" ? server.headers : {};
    const authorization = Object.entries(headers).find(([name]) => name.toLowerCase() === "authorization")?.[1];
    // Only an https address, or a local one while developing: the token never goes anywhere else.
    if (url && typeof authorization === "string" && /^Bearer\s+\S+$/.test(authorization) && isAllowedUrl(url)) return { url, authorization };
  }
  return null;
}

export function isAllowedUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || (parsed.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname));
  } catch {
    return false;
  }
}

/** Calls one UtopiaOS tool and returns its structured result. Throws on any failure, with no token in the message. */
export async function callTool(connection, name, args = {}, { fetchImpl = fetch, timeoutMs = REQUEST_TIMEOUT_MS } = {}) {
  const response = await fetchImpl(connection.url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream", Authorization: connection.authorization },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name, arguments: args } }),
    signal: AbortSignal.timeout(timeoutMs),
    redirect: "error",
  });
  if (response.status === 401 || response.status === 403) throw Object.assign(new Error("UtopiaOS refused the token"), { unauthorized: true });
  if (!response.ok) throw new Error(`UtopiaOS answered ${response.status}`);
  const body = await response.json();
  if (body?.error) throw new Error(`UtopiaOS: ${String(body.error.message ?? "error").slice(0, 200)}`);
  if (body?.result?.isError) throw new Error("UtopiaOS reported an error for the call");
  return body?.result?.structuredContent ?? null;
}

/** The actions waiting for this AI tool, as get_pending_actions returns them. */
export async function pendingActions(connection, options) {
  const result = await callTool(connection, "get_pending_actions", {}, options);
  const actions = Array.isArray(result?.actions) ? result.actions : [];
  return actions.filter((action) => typeof action?.id === "string" && typeof action?.title === "string" && typeof action?.instructions === "string");
}

/**
 * The waiting actions this session may show Claude: every one no other session
 * holds, each claimed for this session first (claim_action), so two open
 * sessions never both do it. One another session claimed is left until its
 * claim runs out; one this session can't claim (a race lost) is left too.
 * @param {{ url: string; authorization: string }} connection
 * Stops claiming when `deadline` is near, keeping what it already claimed, so a
 * slow connection can't leave work claimed but never shown.
 * @param {Array<{ id: string; title: string; instructions: string; approvedInUtopiaOS?: boolean; claimedUntil?: number | null; claimedBy?: string | null }>} actions
 * @param {string} claimant
 * @param {{ now?: () => number; deadline?: number; fetchImpl?: typeof fetch }} [options]
 */
export async function takeActions(connection, actions, claimant, { now = Date.now, deadline = Infinity, fetchImpl } = {}) {
  const taken = [];
  for (const action of actions) {
    // Held by another session: leave it. This session's own claim (a resumed or cleared chat) is taken again.
    if (typeof action.claimedUntil === "number" && action.claimedUntil > now() && action.claimedBy !== claimant) continue;
    const left = deadline - now();
    if (left < MIN_REQUEST_MS) break;
    try {
      const result = await callTool(connection, "claim_action", { actionId: action.id, claimant }, { fetchImpl, timeoutMs: Math.min(REQUEST_TIMEOUT_MS, left) });
      if (result?.claimed === true) taken.push(action);
    } catch (error) {
      if (error?.unauthorized) throw error;
      // Couldn't claim it this time: leave it for the next look rather than risk doing it twice.
    }
  }
  return taken;
}

/**
 * How waiting actions reach Claude: what each is, whether the person already
 * approved it in UtopiaOS, and the exact steps UtopiaOS wrote for it. The steps
 * come from UtopiaOS's fixed set of kinds (convex/lib/queuedActions.ts), never
 * from free text.
 */
export function describeActions(actions, { when }) {
  const approved = actions.filter((action) => action.approvedInUtopiaOS === true);
  const ask = actions.filter((action) => action.approvedInUtopiaOS !== true);
  const lines = [
    when === "start"
      ? `UtopiaOS has ${actions.length === 1 ? "an action" : `${actions.length} actions`} waiting for this AI tool. Whatever the person's first message says, start by telling them in one line, then:`
      : `UtopiaOS just sent ${actions.length === 1 ? "an action" : `${actions.length} actions`} for this AI tool. Tell the person in one line, then:`,
  ];
  if (approved.length) lines.push("- Do each action marked approved now. The person already approved it in UtopiaOS, so don't ask them again; your own permission prompts still apply.");
  if (ask.length) lines.push("- Ask the person before doing any action not marked approved (the studio queued it).");
  lines.push(`- After each one, call complete_action on the "${SERVER_NAME}" MCP server with its id and how it went (done, declined or failed).`, "");
  for (const action of actions) {
    lines.push(`Action ${action.id}: ${action.title} (${action.approvedInUtopiaOS === true ? "approved" : "ask first"})`, action.instructions, "");
  }
  return lines.join("\n").trim();
}
