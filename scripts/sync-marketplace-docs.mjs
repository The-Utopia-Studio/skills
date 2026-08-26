#!/usr/bin/env node
/**
 * Regenerate public marketplace docs from packs.config.json + SKILL.md frontmatter.
 *
 * Updates:
 * - docs/skills.html REGISTRY + counts
 * - docs/index.html module counts
 * - README.md module table + headline count
 * - INSTALL.md headline count
 * - SKILL_TAXONOMY.md counts
 * - packs.config.json marketplace description total
 */

import fs from "node:fs";
import path from "node:path";
import {
  CONFIG_PATH,
  REPO_ROOT,
  buildRegistry,
  buildSkillPathMap,
  getPackStats,
  readConfig,
} from "./lib/marketplace.mjs";

function replaceOnce(content, pattern, replacement, label) {
  if (!pattern.test(content)) {
    throw new Error(`Could not update ${label}: pattern not found`);
  }
  return content.replace(pattern, replacement);
}

function syncSkillsHtml(total, registryJson, icarusJson) {
  const filePath = path.join(REPO_ROOT, "docs/skills.html");
  let content = fs.readFileSync(filePath, "utf8");

  content = replaceOnce(
    content,
    /<meta name="description" content="Browse all \d+ Utopia Skills[^"]*" \/>/,
    `<meta name="description" content="Browse all ${total} Utopia Skills — invocation name and one-line description for every GTM, Product, Investments, and Founder Productivity skill." />`,
    "docs/skills.html meta description",
  );

  content = replaceOnce(
    content,
    /<h1 class="section__title">All \d+ skills — what they do and how to invoke them<\/h1>/,
    `<h1 class="section__title">All ${total} skills — what they do and how to invoke them</h1>`,
    "docs/skills.html h1",
  );

  content = replaceOnce(
    content,
    /const REGISTRY = \[.*?\];/s,
    `const REGISTRY = ${registryJson};`,
    "docs/skills.html REGISTRY",
  );

  content = replaceOnce(
    content,
    /const ICARUS = new Set\(\[.*?\]\);/s,
    `const ICARUS = new Set(${icarusJson});`,
    "docs/skills.html ICARUS",
  );

  fs.writeFileSync(filePath, content);
}

function syncIndexHtml(packs, total) {
  const filePath = path.join(REPO_ROOT, "docs/index.html");
  let content = fs.readFileSync(filePath, "utf8");

  content = replaceOnce(
    content,
    /The Utopia Studio marketplace — \d+ production skills across GTM,/,
    `The Utopia Studio marketplace — ${total} production skills across GTM,`,
    "docs/index.html hero count",
  );

  for (const pack of packs) {
    content = replaceOnce(
      content,
      new RegExp(
        `<p class="module__count">\\d+ skills · v[0-9.]+<\\/p>\\s*<h3 class="module__name">${pack.label}<\\/h3>`,
      ),
      `<p class="module__count">${pack.count} skills · v${pack.version}</p>\n              <h3 class="module__name">${pack.label}</h3>`,
      `docs/index.html ${pack.label} count`,
    );
  }

  fs.writeFileSync(filePath, content);
}

function syncReadme(packs, total) {
  const filePath = path.join(REPO_ROOT, "README.md");
  let content = fs.readFileSync(filePath, "utf8");

  content = replaceOnce(
    content,
    /^\d+ production skills for Claude Code/m,
    `${total} production skills for Claude Code`,
    "README headline count",
  );

  const tableRows = packs
    .map((pack) => {
      const shortName = pack.label.replace("Founder Productivity", "Founder Productivity");
      const blurb =
        pack.name === "utopia-gtm"
          ? "Seven sub-modules: strategy, comms, enablement, CS, BD, engineering, IP"
          : pack.name === "utopia-product"
            ? "Discovery, PRDs, design, build, deploy, product metrics"
            : pack.name === "utopia-investments"
              ? "DD, modeling, valuation, capital markets, fundraising decks"
              : "Onboarding, legal, Obsidian, agents, meta tools";

      return `| **${shortName}** | \`${pack.name}\` \`v${pack.version}\` | ${pack.count} | ${blurb} |`;
    })
    .join("\n");

  content = replaceOnce(
    content,
    /\| Module \| Pack \| Skills \| Covers \|\n\|[-| ]+\|\n(?:\|[^\n]+\|\n)+/,
    `| Module | Pack | Skills | Covers |\n|--------|------|--------|--------|\n${tableRows}\n`,
    "README module table",
  );

  fs.writeFileSync(filePath, content);
}

function syncInstall(total) {
  const filePath = path.join(REPO_ROOT, "INSTALL.md");
  let content = fs.readFileSync(filePath, "utf8");

  content = replaceOnce(
    content,
    /Four modules · \*\*\d+ skills\*\*/,
    `Four modules · **${total} skills**`,
    "INSTALL headline count",
  );

  fs.writeFileSync(filePath, content);
}

function syncTaxonomy(packs, total) {
  const filePath = path.join(REPO_ROOT, "SKILL_TAXONOMY.md");
  let content = fs.readFileSync(filePath, "utf8");

  const rows = {
    GTM: packs.find((pack) => pack.name === "utopia-gtm"),
    Product: packs.find((pack) => pack.name === "utopia-product"),
    Investments: packs.find((pack) => pack.name === "utopia-investments"),
    "Founder Productivity": packs.find(
      (pack) => pack.name === "utopia-founder-productivity",
    ),
  };

  content = replaceOnce(
    content,
    /\| \*\*GTM\*\* \| `skills\/gtm\/` \| `utopia-gtm` \| \d+ \|[^\n]+\n\| \*\*Product\*\* \| `skills\/product\/` \| `utopia-product` \| \d+ \|[^\n]+\n\| \*\*Investments\*\* \| `skills\/investments\/` \| `utopia-investments` \| \d+ \|[^\n]+\n\| \*\*Founder Productivity\*\* \| `skills\/founder-productivity\/` \| `utopia-founder-productivity` \| \d+ \|[^\n]+/,
    [
      `| **GTM** | \`skills/gtm/\` | \`utopia-gtm\` | ${rows.GTM.count} | Sales, marketing, growth, retention, distribution |`,
      `| **Product** | \`skills/product/\` | \`utopia-product\` | ${rows.Product.count} | Discovery, PRDs, design, build, deploy, product metrics |`,
      `| **Investments** | \`skills/investments/\` | \`utopia-investments\` | ${rows.Investments.count} | DD, modeling, valuation, fundraising, markets, quant |`,
      `| **Founder Productivity** | \`skills/founder-productivity/\` | \`utopia-founder-productivity\` | ${rows["Founder Productivity"].count} | Doesn't fit the three above |`,
    ].join("\n"),
    "SKILL_TAXONOMY module table",
  );

  content = replaceOnce(
    content,
    /\*\*Total: \d+ skills\*\*/,
    `**Total: ${total} skills**`,
    "SKILL_TAXONOMY total",
  );

  fs.writeFileSync(filePath, content);
}

function syncConfigDescription(total) {
  const config = readConfig();
  config.marketplace.description = config.marketplace.description.replace(
    /\d+ skills/,
    `${total} skills`,
  );
  fs.writeFileSync(CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`);
}

function main() {
  buildSkillPathMap();
  const config = readConfig();
  const { packs, total } = getPackStats(config);
  const registry = buildRegistry(config);
  const icarus = JSON.parse(
    fs.readFileSync(path.join(REPO_ROOT, "scripts/icarus-skills.json"), "utf8"),
  );

  syncSkillsHtml(total, JSON.stringify(registry), JSON.stringify(icarus));
  syncIndexHtml(packs, total);
  syncReadme(packs, total);
  syncInstall(total);
  syncTaxonomy(packs, total);
  syncConfigDescription(total);

  console.log(`✓ Synced marketplace docs (${total} skills across ${packs.length} packs)`);
}

main();
