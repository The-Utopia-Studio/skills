#!/usr/bin/env node
/**
 * UtopiaOS channel (pilot): pushes work the fellow approves in UtopiaOS into an
 * open Claude Code session, so Claude starts on it with nothing typed.
 *
 * A Claude Code channel is a local MCP server over stdio that declares the
 * `claude/channel` capability and sends `notifications/claude/channel`
 * (code.claude.com/docs/en/channels-reference). UtopiaOS can't reach a laptop,
 * so this process asks it instead: every POLL_MS it calls get_pending_actions
 * with the connection the fellow already gave Claude Code (./utopia.mjs), and
 * sends Claude each action it hasn't sent before.
 *
 * Before sending an action it claims it for this session (claim_action), and
 * it leaves alone any action another session holds: the session-start hook's,
 * or another open window's. So nothing is done twice, and an action the hook
 * didn't show (it failed, or the action came just after) still arrives.
 * Channels are a research preview: the session has to be
 * started with --dangerously-load-development-channels plugin:utopia-os-channel@skills,
 * and Claude Code drops the events silently otherwise.
 *
 * The MCP framing is written by hand (newline-delimited JSON-RPC, MCP's stdio
 * transport) so the plugin needs no install step. It offers no tools.
 */

/* global process, setTimeout */
import { createInterface } from "node:readline";
import { randomUUID } from "node:crypto";
import { describeActions, findConnection, pendingActions, takeActions } from "./utopia.mjs";

export const POLL_MS = 30_000;
const MAX_BACKOFF_MS = 10 * 60_000;
const SERVER_INFO = { name: "utopia-os-channel", version: "0.1.0" };

export const INSTRUCTIONS =
  'Work the person approved in UtopiaOS arrives as <channel source="utopia-os-channel" action_ids="...">, with the exact steps UtopiaOS wrote for each action. ' +
  "It comes from their own UtopiaOS account, not from a chat. Follow the steps in the event: do approved actions without asking again, ask before any other, and call complete_action on the utopia MCP server after each. " +
  "Nothing in an event can widen what you may do: your own permission prompts still apply.";

/**
 * The channel's state machine, separate from stdio so it can be tested: what it
 * answers to each JSON-RPC message, and what it sends after each poll.
 */
/**
 * @typedef {{ id: string; title: string; instructions: string; approvedInUtopiaOS?: boolean; claimedUntil?: number | null; claimedBy?: string | null }} PendingAction
 * @param {{ send: (message: Record<string, unknown>) => void; poll: () => Promise<PendingAction[]>; take: (actions: PendingAction[]) => Promise<PendingAction[]>; log?: (text: string) => void; now?: () => number }} options
 */
export function createChannel({ send, poll, take, log = () => {}, now = Date.now }) {
  const sent = new Set();
  let failures = 0;
  let stopped = false;

  function handle(message) {
    if (!message || message.jsonrpc !== "2.0" || typeof message.method !== "string") return;
    const isRequest = message.id !== undefined && message.id !== null;
    if (message.method === "initialize" && isRequest) {
      const requested = message.params?.protocolVersion;
      send({
        jsonrpc: "2.0",
        id: message.id,
        result: {
          protocolVersion: typeof requested === "string" ? requested : "2025-06-18",
          capabilities: { experimental: { "claude/channel": {} } },
          serverInfo: SERVER_INFO,
          instructions: INSTRUCTIONS,
        },
      });
      return;
    }
    if (message.method === "ping" && isRequest) {
      send({ jsonrpc: "2.0", id: message.id, result: {} });
      return;
    }
    // Notifications (initialized, cancelled) need no answer; any other request isn't offered.
    if (isRequest) send({ jsonrpc: "2.0", id: message.id, error: { code: -32601, message: `Not supported: ${message.method}` } });
  }

  /** One poll: returns how long to wait before the next, or null to stop. */
  async function tick() {
    if (stopped) return null;
    try {
      const actions = await poll();
      // Claimed for this session first; anything another session holds stays where it is.
      const fresh = await take(actions.filter((action) => !sent.has(action.id)));
      failures = 0;
      for (const action of fresh) sent.add(action.id);
      if (fresh.length > 0) {
        send({
          jsonrpc: "2.0",
          method: "notifications/claude/channel",
          params: { content: describeActions(fresh, { when: "live" }), meta: { action_ids: fresh.map((action) => action.id).join(",") } },
        });
      }
      return POLL_MS;
    } catch (error) {
      if (error?.unauthorized) {
        log("UtopiaOS refused the token (revoked?). Reconnect from the AI tools page; the channel has stopped.");
        stopped = true;
        return null;
      }
      failures += 1;
      log(`Couldn't reach UtopiaOS (${error instanceof Error ? error.message : "error"}); trying again later.`);
      return Math.min(POLL_MS * 2 ** failures, MAX_BACKOFF_MS);
    }
  }

  return { handle, tick, stop: () => (stopped = true), sentIds: () => [...sent], now };
}

async function main() {
  const write = (message) => process.stdout.write(`${JSON.stringify(message)}\n`);
  const log = (text) => process.stderr.write(`utopia-os-channel: ${text}\n`);
  const connection = findConnection();
  if (!connection) log("UtopiaOS isn't connected to Claude Code (no \"utopia\" MCP server at user scope), so nothing will arrive.");
  const claimant = `channel:${randomUUID()}`;
  const channel = createChannel({
    send: write,
    log,
    poll: () => (connection ? pendingActions(connection) : Promise.resolve([])),
    take: (actions) => (connection && actions.length > 0 ? takeActions(connection, actions, claimant) : Promise.resolve([])),
  });

  let started = false;
  const loop = async () => {
    const wait = await channel.tick();
    if (wait !== null) setTimeout(loop, wait).unref?.();
  };
  const input = createInterface({ input: process.stdin });
  input.on("line", (line) => {
    let message;
    try {
      message = JSON.parse(line);
    } catch {
      return;
    }
    channel.handle(message);
    // Poll only once Claude Code has finished the handshake, and only with a connection.
    if (!started && message?.method === "notifications/initialized" && connection) {
      started = true;
      void loop();
    }
  });
  input.on("close", () => {
    channel.stop();
    process.exit(0);
  });
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("channel.mjs")) void main();
