import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

async function main() {
  const contractPath = resolve(process.cwd(), "parity", "portal-contract.json");
  const raw = await readFile(contractPath, "utf8");
  const contract = JSON.parse(raw);

  const failures = [];

  if (!contract.portalTitle || typeof contract.portalTitle !== "string") {
    failures.push("portalTitle must be a non-empty string");
  }
  if (!Array.isArray(contract.tracks) || contract.tracks.length === 0) {
    failures.push("tracks must contain at least one track object");
  }
  if (!Array.isArray(contract.categories) || contract.categories.length === 0) {
    failures.push("categories must contain at least one value");
  }
  if (
    !Array.isArray(contract.requiredPhrases) ||
    contract.requiredPhrases.length === 0
  ) {
    failures.push("requiredPhrases must contain at least one phrase");
  }

  const legacyPortalUrl =
    process.env.LEGACY_PORTAL_URL || contract.legacyPortalUrl;
  if (!legacyPortalUrl) {
    failures.push("legacyPortalUrl missing from contract and env");
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error(`❌ Contract schema error: ${failure}`);
    }
    process.exit(1);
  }

  const response = await fetch(legacyPortalUrl);
  if (!response.ok) {
    console.error(`❌ Unable to fetch legacy portal: ${response.status}`);
    process.exit(1);
  }

  const html = await response.text();
  const missingPhrases = contract.requiredPhrases.filter(
    (phrase) => !html.includes(phrase),
  );

  if (missingPhrases.length > 0) {
    console.error("❌ Legacy portal is missing required phrases:");
    for (const phrase of missingPhrases) {
      console.error(`   - ${phrase}`);
    }
    process.exit(1);
  }

  console.log(`✅ Parity contract check passed for ${legacyPortalUrl}`);
  console.log(`   - requiredPhrases: ${contract.requiredPhrases.length}`);
  console.log(`   - tracks: ${contract.tracks.length}`);
  console.log(`   - categories: ${contract.categories.length}`);
}

main().catch((error) => {
  console.error("❌ Parity contract check failed with an unexpected error:");
  console.error(error);
  process.exit(1);
});
