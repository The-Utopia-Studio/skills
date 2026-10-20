// Re-renders a recorded take (camera, audio, captions) without re-recording.
//   node reassemble.mjs <take dir> [output.mp4]
import { readFileSync } from "node:fs";
import { assemble } from "./walkthrough.mjs";
const outDir = process.argv[2];
const session = JSON.parse(readFileSync(`${outDir}/session.json`, "utf8"));
if (process.argv[3]) session.output = process.argv[3];
assemble(session, outDir);
console.log("assembled", session.output);
