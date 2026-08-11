#!/usr/bin/env node
// Tiny static file server for previewing docs/ locally. Node stdlib only.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";

const DOCS_DIR = new URL("../docs", import.meta.url).pathname;
const PORT = process.env.PORT || 4173;
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript", ".json": "application/json" };

createServer(async (req, res) => {
  let path = join(DOCS_DIR, decodeURIComponent(req.url.split("?")[0]));
  try {
    if ((await stat(path)).isDirectory()) path = join(path, "index.html");
    res.writeHead(200, { "Content-Type": TYPES[extname(path)] || "application/octet-stream" });
    res.end(await readFile(path));
  } catch {
    res.writeHead(404).end("not found");
  }
}).listen(PORT, () => console.log(`docs preview on :${PORT}`));
