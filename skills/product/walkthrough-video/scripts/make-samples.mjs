// Renders clearly-labelled fake documents for upload steps, so a take never touches a real ID or letter.
//   node make-samples.mjs <out dir> [docs.json]
// docs.json: [{ "file": "sample-passport.jpg", "title": "Passport", "holder": "Jordan Sample · Northwind Health" }]
import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { loadConfig } from "./config.mjs";
import { DEFAULT_BRAND } from "./walkthrough.mjs";

const config = loadConfig();
const brand = { ...DEFAULT_BRAND, ...config.brand };
const require = createRequire(join(config.appDir, "package.json"));
const { chromium } = require("playwright");
const [out, list] = process.argv.slice(2);
const docs = list ? JSON.parse(readFileSync(list, "utf8")) : [
  { file: "sample-passport.jpg", title: "Passport", holder: "Jordan Sample" },
  { file: "sample-bank-letter.jpg", title: "Bank confirmation letter", holder: "Jordan Sample" },
];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
for (const doc of docs) {
  await page.setContent(`<body style="margin:0;background:${brand.background};font-family:Helvetica,Arial,sans-serif;display:flex;flex-direction:column;justify-content:center;padding:80px;height:800px;box-sizing:border-box"><div style="color:${brand.accent};font-size:64px;font-weight:700">${esc(doc.title)}</div><div style="color:#555;font-size:36px;margin-top:24px">SAMPLE — NOT A REAL DOCUMENT</div><div style="color:#333;font-size:36px;margin-top:40px">${esc(doc.holder ?? "")}</div></body>`);
  await page.screenshot({ path: join(out, doc.file), type: "jpeg", quality: 85 });
}
await browser.close();
console.log(`samples ready in ${out}`);
