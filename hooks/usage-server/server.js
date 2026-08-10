#!/usr/bin/env node
// Shared ingestion endpoint for hooks/log-skill-usage.sh (TUS-2594).
// Node stdlib http + node:sqlite only — no dependencies to install or update.
// ponytail: no auth. This is an internal tool behind an unlisted Railway URL,
// same trust bar as the rest of this repo's tooling. Add a shared-secret
// header check here if it ever needs to be internet-safe.
import { createServer } from "node:http";
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const PORT = process.env.PORT || 8080;
const DB_PATH =
  process.env.DB_PATH ||
  (process.env.RAILWAY_VOLUME_MOUNT_PATH ? `${process.env.RAILWAY_VOLUME_MOUNT_PATH}/usage.db` : "./usage.db");
mkdirSync(dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);
db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ts TEXT NOT NULL,
    user TEXT NOT NULL,
    host TEXT NOT NULL,
    session TEXT NOT NULL,
    skill TEXT NOT NULL,
    received_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);
const insertEvent = db.prepare("INSERT INTO events (ts, user, host, session, skill) VALUES (?, ?, ?, ?, ?)");
const recentEvents = db.prepare("SELECT ts, user, host, session, skill FROM events ORDER BY id DESC LIMIT ?");

const MAX_BODY_BYTES = 10_000;
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > MAX_BODY_BYTES) req.destroy(new Error("payload too large"));
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

const server = createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/events") {
      const event = JSON.parse(await readBody(req));
      const { ts, user, host, session, skill } = event;
      if (![ts, user, host, session, skill].every((v) => typeof v === "string" && v.length > 0)) {
        res.writeHead(400, { "Content-Type": "text/plain" }).end("missing required field: ts, user, host, session, skill");
        return;
      }
      insertEvent.run(ts, user, host, session, skill);
      res.writeHead(204).end();
      return;
    }
    if (req.method === "GET" && req.url.startsWith("/events")) {
      const limit = Math.min(Number(new URL(req.url, "http://x").searchParams.get("limit")) || 100, 1000);
      res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(recentEvents.all(limit)));
      return;
    }
    if (req.method === "GET" && req.url === "/health") {
      res.writeHead(200, { "Content-Type": "text/plain" }).end("ok");
      return;
    }
    res.writeHead(404, { "Content-Type": "text/plain" }).end("not found");
  } catch (e) {
    res.writeHead(400, { "Content-Type": "text/plain" }).end(String(e.message || e));
  }
});

server.listen(PORT, () => console.log(`usage-server listening on :${PORT} (db=${DB_PATH})`));
