// Opens real Chrome on the app's sign-in page and waits, with no timeout, until the person has signed
// in themselves and is back on the app. Never type credentials for them. The session stays in a
// throwaway profile the recorder reuses; delete the profile folder when done.
//   node <skill>/scripts/signin.mjs [profile dir]   (run from the app's repo; reads the config)
import { createRequire } from "node:module";
import { join, resolve } from "node:path";
import { loadConfig } from "./config.mjs";

const config = loadConfig();
const require = createRequire(join(config.appDir, "package.json"));
const { chromium } = require("playwright");
const profile = resolve(process.argv[2] ?? process.env.PROFILE ?? join(config.workDir, "chrome-profile"));
const base = config.baseUrl.replace(/\/$/, "");
const context = await chromium.launchPersistentContext(profile, { channel: "chrome", headless: false, viewport: { width: 1280, height: 800 } });
const page = context.pages()[0] ?? (await context.newPage());
await page.goto(base + config.signInPath);
console.log("WAITING_FOR_SIGN_IN");
const app = new URL(base).host;
// SSO leaves the app's host mid-flow; only a page back on the app, off every auth path, counts.
await page.waitForURL((u) => u.host === app && !config.authPaths.some((p) => u.pathname.startsWith(p) || u.pathname.includes(p)), { timeout: 0 });
await page.waitForTimeout(4000);
console.log("SIGNED_IN", page.url());
await context.close();
