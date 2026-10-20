// Records one flow:  node <skill>/scripts/record.mjs <flow.mjs>   (run from the app's repo)
// env: DRY=1 (rehearse, no capture), MAX_SCENES=n (short test take), OUT_DIR, OUTPUT, PROFILE, CONFIG,
//      DEEPGRAM_API_KEY (else read from <app>/.env.local; never pasted into a chat).
import { mkdirSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { loadConfig, readEnvFile } from "./config.mjs";
import { run } from "./walkthrough.mjs";
import * as locators from "./locators.mjs";

const env = process.env;
if (!process.argv[2]) { console.error("usage: node record.mjs <flow.mjs>"); process.exit(2); }
const flowPath = resolve(process.argv[2]);
const config = loadConfig();
const name = basename(flowPath).replace(/\.m?js$/, "");
const outDir = resolve(env.OUT_DIR ?? join(config.workDir, "take-" + name));
mkdirSync(outDir, { recursive: true });

const mod = await import(pathToFileURL(flowPath));
const flow = typeof mod.default === "function" ? await mod.default({ config, env, ...locators }) : mod.default;
const scenes = env.MAX_SCENES ? flow.scenes.slice(0, Number(env.MAX_SCENES)) : flow.scenes;
const base = config.baseUrl.replace(/\/$/, "");

console.log(`config: ${config.sources.join(", ") || "defaults only"}; app ${base}; voice ${config.voice.deepgram}`);
await run({
  dry: env.DRY === "1",
  baseUrl: base,
  profile: resolve(env.PROFILE ?? join(config.workDir, "chrome-profile")),
  outDir,
  pwFrom: config.appDir,
  scenes,
  voice: config.voice.deepgram,
  ttsKey: env.DEEPGRAM_API_KEY ?? readEnvFile(join(config.appDir, ".env.local"), "DEEPGRAM_API_KEY") ?? readEnvFile(join(config.root, ".env.local"), "DEEPGRAM_API_KEY"),
  brand: config.brand,
  width: config.viewport.width, height: config.viewport.height,
  outWidth: config.output.width, outHeight: config.output.height, fps: config.output.fps,
  zoom: Number(env.ZOOM ?? flow.zoom ?? config.zoom),
  output: resolve(env.OUTPUT ?? join(config.workDir, name + ".mp4")),
  prepare: flow.prepare ?? (async (h) => { await h.page.goto(base + config.startPath); await h.sleep(1500); }),
});
