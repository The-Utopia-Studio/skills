#!/usr/bin/env node
/**
 * Validate marketplace integrity:
 * - pack membership resolves to skills/ on disk
 * - SKILL.md frontmatter is present and consistent
 * - pack skill lists stay alphabetized
 * - evals.json files match a minimal schema
 *
 * Usage:
 *   node scripts/validate-marketplace.mjs
 *   node scripts/validate-marketplace.mjs --check-drift
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import {
  REPO_ROOT,
  buildSkillPathMap,
  getGtmSubmodules,
  namesMatchFolder,
  parseSkillFrontmatter,
  readConfig,
  skillModuleName,
} from "./lib/marketplace.mjs";

const checkDrift = process.argv.includes("--check-drift");

/** @type {string[]} */
const errors = [];
/** @type {string[]} */
const warnings = [];

function error(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function isSorted(names) {
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  return names.every((name, index) => name === sorted[index]);
}

function validateEvalFile(evalPath) {
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(evalPath, "utf8"));
  } catch (cause) {
    error(`${evalPath}: invalid JSON (${cause instanceof Error ? cause.message : cause})`);
    return;
  }

  if (typeof parsed.skill_name !== "string" || !parsed.skill_name) {
    error(`${evalPath}: missing skill_name`);
  }

  if (!Array.isArray(parsed.evals) || parsed.evals.length === 0) {
    error(`${evalPath}: evals must be a non-empty array`);
    return;
  }

  for (const [index, evalCase] of parsed.evals.entries()) {
    const prefix = `${evalPath} eval #${index + 1}`;
    if (typeof evalCase.prompt !== "string" || !evalCase.prompt.trim()) {
      error(`${prefix}: missing prompt`);
    }
    if (typeof evalCase.expected_output !== "string" || !evalCase.expected_output.trim()) {
      error(`${prefix}: missing expected_output`);
    }
    if (!Array.isArray(evalCase.assertions) || evalCase.assertions.length === 0) {
      error(`${prefix}: assertions must be a non-empty array`);
    }
  }
}

function validateRubricFile(rubricPath) {
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(rubricPath, "utf8"));
  } catch (cause) {
    error(`${rubricPath}: invalid JSON (${cause instanceof Error ? cause.message : cause})`);
    return;
  }

  if (!Array.isArray(parsed.criteria) && !Array.isArray(parsed.dimensions)) {
    error(`${rubricPath}: criteria or dimensions must be a non-empty array`);
    return;
  }

  const items = parsed.criteria ?? parsed.dimensions;
  if (items.length === 0) {
    error(`${rubricPath}: rubric must include at least one criterion`);
  }
}

function walkFiles(dir, matcher, results = []) {
  if (!fs.existsSync(dir)) {
    return results;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(entryPath, matcher, results);
      continue;
    }
    if (matcher(entryPath)) {
      results.push(entryPath);
    }
  }

  return results;
}

function validateSkills(config, skillPathMap) {
  const packed = new Set();

  for (const pack of config.packs) {
    if (!isSorted(pack.skills)) {
      error(`${pack.name}: skills array is not alphabetized`);
    }

    for (const skillName of pack.skills) {
      packed.add(skillName);
      const skillPath = skillPathMap.get(skillName);
      if (!skillPath) {
        error(`${pack.name}: listed skill "${skillName}" not found under skills/`);
        continue;
      }

      const frontmatter = parseSkillFrontmatter(skillPath);
      if (!frontmatter) {
        error(`${skillPath}: missing or invalid YAML frontmatter in SKILL.md`);
        continue;
      }

      if (frontmatter.name !== skillName && !namesMatchFolder(skillName, frontmatter.name)) {
        error(
          `${skillPath}: frontmatter name "${frontmatter.name ?? ""}" does not match folder "${skillName}"`,
        );
      }

      if (!frontmatter.description || frontmatter.description.length < 20) {
        error(`${skillPath}: description is missing or too short`);
      }

      if (frontmatter.description.length > 1024) {
        warn(`${skillPath}: description exceeds 1024 characters`);
      }
    }
  }

  for (const [skillName, skillPath] of skillPathMap.entries()) {
    const moduleName = skillModuleName(skillPath);
    if (moduleName === "meta" && !packed.has(skillName)) {
      warn(`${skillPath}: meta skill is not listed in any pack`);
    }
  }
}

function validateGtmSubmodules(config, skillPathMap) {
  const gtm = config.packs.find((pack) => pack.name === "utopia-gtm");
  if (!gtm) {
    error("packs.config.json is missing utopia-gtm");
    return;
  }

  const submodules = getGtmSubmodules(config);
  if (submodules.length !== 7) {
    error(
      `utopia-gtm: expected 7 sub-modules (Growth Strategy … IP Commercialisation), found ${submodules.length}`,
    );
  }

  const union = [];
  const seen = new Set();
  const expectedIds = [
    "01-growth-strategy",
    "02-marketing-comms",
    "03-sales-enablement",
    "04-customer-success",
    "05-bd-partnerships",
    "06-gtm-engineering",
    "07-ip-commercialisation",
  ];

  for (const [index, sub] of submodules.entries()) {
    if (sub.id !== expectedIds[index]) {
      error(
        `utopia-gtm.submodules[${index}]: expected id "${expectedIds[index] ?? "(none)"}", got "${sub.id}"`,
      );
    }
    if (!isSorted(sub.skills)) {
      error(`utopia-gtm.submodules.${sub.id}: skills array is not alphabetized`);
    }

    for (const skillName of sub.skills) {
      if (seen.has(skillName)) {
        error(`utopia-gtm: skill "${skillName}" listed in more than one sub-module`);
      }
      seen.add(skillName);
      union.push(skillName);

      const skillPath = skillPathMap.get(skillName);
      if (!skillPath) continue;
      const expectedPrefix = path.join(REPO_ROOT, "skills/gtm", sub.id, skillName);
      if (skillPath !== expectedPrefix) {
        error(
          `utopia-gtm: "${skillName}" should live at skills/gtm/${sub.id}/${skillName}/ (found ${path.relative(REPO_ROOT, skillPath)})`,
        );
      }
    }
  }

  const packSet = new Set(gtm.skills);
  const unionSet = new Set(union);
  for (const skillName of gtm.skills) {
    if (!unionSet.has(skillName)) {
      error(`utopia-gtm: packed skill "${skillName}" is not in any sub-module`);
    }
  }
  for (const skillName of union) {
    if (!packSet.has(skillName)) {
      error(`utopia-gtm: sub-module skill "${skillName}" is missing from the pack skills array`);
    }
  }
}

function validateEvalAssets(skillPathMap) {
  for (const skillPath of skillPathMap.values()) {
    for (const rubricPath of walkFiles(skillPath, (filePath) =>
      filePath.endsWith("/evals/evals.json") ||
      filePath.endsWith("/tests/rubric.json") ||
      /\/resources\/evaluators\/rubric_.*\.json$/.test(filePath),
    )) {
      if (rubricPath.endsWith("/evals/evals.json")) {
        validateEvalFile(rubricPath);
      } else {
        validateRubricFile(rubricPath);
      }
    }
  }
}

function validateIcarusList() {
  const icarusPath = path.join(REPO_ROOT, "scripts/icarus-skills.json");
  const icarus = JSON.parse(fs.readFileSync(icarusPath, "utf8"));
  const skillPathMap = buildSkillPathMap();

  if (!Array.isArray(icarus) || icarus.length === 0) {
    error("scripts/icarus-skills.json must be a non-empty array");
    return;
  }

  for (const skillName of icarus) {
    if (!skillPathMap.has(skillName)) {
      error(`scripts/icarus-skills.json: "${skillName}" not found under skills/`);
    }
  }
}

function validateDrift() {
  execSync("./build-packs.sh", { cwd: REPO_ROOT, stdio: "pipe" });
  const diff = execSync("git diff --name-only", { cwd: REPO_ROOT, encoding: "utf8" }).trim();
  if (!diff) {
    return;
  }

  error(
    "Generated marketplace artifacts are stale. Run ./build-packs.sh and npm run docs:sync, then commit the result.\nChanged files:\n" +
      diff.split("\n").map((line) => `  - ${line}`).join("\n"),
  );
}

function main() {
  const config = readConfig();
  const skillPathMap = buildSkillPathMap();

  validateSkills(config, skillPathMap);
  validateGtmSubmodules(config, skillPathMap);
  validateEvalAssets(skillPathMap);
  validateIcarusList();

  if (checkDrift) {
    validateDrift();
  }

  if (warnings.length) {
    console.warn("Warnings:");
    for (const message of warnings) {
      console.warn(`  ⚠ ${message}`);
    }
    console.warn("");
  }

  if (errors.length) {
    console.error("Marketplace validation failed:");
    for (const message of errors) {
      console.error(`  ✗ ${message}`);
    }
    process.exit(1);
  }

  const packedCount = config.packs.reduce((sum, pack) => sum + pack.skills.length, 0);
  console.log(`✓ Marketplace validation passed (${packedCount} packed skills)`);
}

main();
