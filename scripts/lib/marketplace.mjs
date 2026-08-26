import fs from "node:fs";
import path from "node:path";

export const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
export const SKILLS_DIR = path.join(REPO_ROOT, "skills");
export const CONFIG_PATH = path.join(REPO_ROOT, "packs.config.json");

export const PACK_LABELS = {
  "utopia-gtm": "GTM",
  "utopia-product": "Product",
  "utopia-investments": "Investments",
  "utopia-founder-productivity": "Founder Productivity",
};

export const MODULE_FOLDERS = {
  "utopia-gtm": "gtm",
  "utopia-product": "product",
  "utopia-investments": "investments",
  "utopia-founder-productivity": "founder-productivity",
};

export function readConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
}

function walkSkillDirs(dir, visitor) {
  if (!fs.existsSync(dir)) {
    return;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const entryPath = path.join(dir, entry.name);
    if (fs.existsSync(path.join(entryPath, "SKILL.md"))) {
      visitor(entry.name, entryPath);
      continue;
    }
    walkSkillDirs(entryPath, visitor);
  }
}

export function buildSkillPathMap(skillsDir = SKILLS_DIR) {
  /** @type {Map<string, string>} */
  const map = new Map();

  walkSkillDirs(skillsDir, (skillName, skillPath) => {
    if (map.has(skillName)) {
      throw new Error(
        `Duplicate skill name "${skillName}" in ${map.get(skillName)} and ${skillPath}`,
      );
    }
    map.set(skillName, skillPath);
  });

  return map;
}

/** First path segment under skills/, e.g. gtm / product / sandbox. */
export function skillModuleName(skillPath, skillsDir = SKILLS_DIR) {
  const relative = path.relative(skillsDir, skillPath);
  return relative.split(path.sep)[0] ?? "";
}

export function getGtmSubmodules(config = readConfig()) {
  const gtm = config.packs.find((pack) => pack.name === "utopia-gtm");
  return gtm?.submodules ?? [];
}

export function parseSkillFrontmatter(skillPath) {
  const skillFile = path.join(skillPath, "SKILL.md");
  if (!fs.existsSync(skillFile)) {
    return null;
  }

  const content = fs.readFileSync(skillFile, "utf8");
  if (!content.startsWith("---")) {
    return null;
  }

  const end = content.indexOf("\n---", 3);
  if (end === -1) {
    return null;
  }

  const block = content.slice(3, end).trim().replace(/\r\n/g, "\n");
  /** @type {Record<string, string>} */
  const fields = {};

  let currentKey = null;
  /** @type {string[]} */
  let currentValue = [];
  /** @type {"fold" | "literal" | null} */
  let blockMode = null;

  function flush() {
    if (!currentKey) {
      return;
    }

    const joined =
      blockMode === "literal"
        ? currentValue.join("\n")
        : currentValue.join(blockMode ? " " : "\n");

    fields[currentKey] = joined.trim();
    currentKey = null;
    currentValue = [];
    blockMode = null;
  }

  for (const line of block.split("\n")) {
    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (keyMatch) {
      flush();
      currentKey = keyMatch[1];
      const rest = keyMatch[2].trim();

      if (/^[>|][+-]?$/.test(rest)) {
        blockMode = rest.startsWith(">") ? "fold" : "literal";
        continue;
      }

      if (rest) {
        currentValue = [rest];
        flush();
      }
      continue;
    }

    if (!currentKey) {
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    currentValue.push(trimmed);
  }

  flush();
  return fields;
}

export function namesMatchFolder(folderName, frontmatterName) {
  if (folderName === frontmatterName) {
    return true;
  }

  const aliasPrefixes = ["railway-", "ckm-"];
  for (const prefix of aliasPrefixes) {
    if (folderName.startsWith(prefix) && folderName.slice(prefix.length) === frontmatterName) {
      return true;
    }
  }

  if (folderName.startsWith("ckm-") && frontmatterName === `ckm:${folderName.slice(4)}`) {
    return true;
  }

  return false;
}

export function truncateDescription(description, maxLen = 110) {
  const normalized = description.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLen) {
    return normalized;
  }
  return `${normalized.slice(0, maxLen - 1).trimEnd()}…`;
}

export function getPackStats(config = readConfig()) {
  /** @type {{ name: string; label: string; version: string; skills: string[]; count: number }[]} */
  const packs = config.packs.map((pack) => ({
    name: pack.name,
    label: PACK_LABELS[pack.name] ?? pack.name,
    version: pack.version,
    skills: pack.skills,
    count: pack.skills.length,
  }));

  const total = packs.reduce((sum, pack) => sum + pack.count, 0);
  return { packs, total };
}

export function buildRegistry(config = readConfig(), skillPathMap = buildSkillPathMap()) {
  const { packs } = getPackStats(config);
  const gtmSubBySkill = new Map();
  for (const sub of getGtmSubmodules(config)) {
    for (const skillName of sub.skills) {
      gtmSubBySkill.set(skillName, {
        id: sub.id,
        label: sub.label,
        order: sub.order,
      });
    }
  }

  return packs.map((pack) => ({
    label: pack.label,
    skills: pack.skills.map((skillName) => {
      const skillPath = skillPathMap.get(skillName);
      const frontmatter = skillPath ? parseSkillFrontmatter(skillPath) : null;
      const description =
        frontmatter?.description ??
        `Missing SKILL.md description for ${skillName}.`;
      const sub = pack.name === "utopia-gtm" ? gtmSubBySkill.get(skillName) : undefined;

      return {
        name: skillName,
        desc: truncateDescription(description),
        ...(sub ? { sub: sub.label, subId: sub.id, subOrder: sub.order } : {}),
      };
    }),
  }));
}
