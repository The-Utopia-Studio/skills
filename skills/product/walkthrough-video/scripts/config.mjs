// Reads walkthrough-video.config.json, found by walking up from the current folder (CONFIG=<path> overrides).
// A repo already set up for ui-walkthrough PR videos needs no second file for the shared bits: the sign-in
// path, app folder, brand accent and Deepgram voice are read from its ui-walkthrough.config.json, so tours
// and PR videos sound and look the same. Anything in walkthrough-video.config.json wins.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const DEFAULTS = {
  baseUrl: "http://localhost:3000",
  startPath: "/",
  signInPath: "/sign-in",
  authPaths: ["/sign-in", "/sign-up", "sso-callback"],
  app: ".",
  viewport: { width: 1420, height: 799 },
  output: { width: 1920, height: 1080, fps: 30 },
  zoom: 1,
  brand: {},
  voice: { deepgram: "aura-2-thalia-en" },
  workDir: ".walkthrough-video",
};

function findUp(name, from) {
  for (let dir = resolve(from); ; dir = dirname(dir)) {
    if (existsSync(join(dir, name))) return join(dir, name);
    if (dirname(dir) === dir) return null;
  }
}

/** Reads one KEY=value line from a dotenv file without ever printing the file. */
export function readEnvFile(file, key) {
  if (!existsSync(file)) return undefined;
  const line = readFileSync(file, "utf8").split("\n").find((l) => l.trim().startsWith(key + "="));
  return line?.slice(line.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "") || undefined;
}

export function loadConfig(from = process.cwd()) {
  const own = process.env.CONFIG ? resolve(process.env.CONFIG) : findUp("walkthrough-video.config.json", from);
  const shared = findUp("ui-walkthrough.config.json", own ? dirname(own) : from);
  const read = (file) => (file ? JSON.parse(readFileSync(file, "utf8")) : {});
  const a = read(own), b = read(shared);
  const fromShared = {
    ...(b.signInPath && { signInPath: b.signInPath }),
    ...(b.app && { app: b.app }),
    brand: { ...(b.brand && { name: b.brand }), ...(b.accent && { accent: b.accent }) },
    voice: { ...(b.voice?.deepgram && { deepgram: b.voice.deepgram }) },
  };
  const config = {
    ...DEFAULTS, ...fromShared, ...a,
    viewport: { ...DEFAULTS.viewport, ...a.viewport },
    output: { ...DEFAULTS.output, ...a.output },
    brand: { ...fromShared.brand, ...a.brand },
    voice: { ...DEFAULTS.voice, ...fromShared.voice, ...a.voice },
  };
  config.root = dirname(own ?? shared ?? join(resolve(from), "_"));
  config.appDir = resolve(config.root, config.app);
  config.workDir = resolve(config.root, config.workDir);
  config.sources = [own, shared].filter(Boolean);
  return config;
}
