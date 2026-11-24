import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one job title, and nothing else.
// Plausible enough to print on a business card, with one absurdly
// specific twist — the plants being watered are not even real,
// and the job is restricted to a single floor.
const TITLE = "Specialist in Watering Fake Plants on the 13th Floor Only";

const MAX_LENGTH = 60;

function validateTitle(title: string): void {
  if (typeof title !== "string") {
    throw new Error("Job title must be a string.");
  }
  if (title.length === 0) {
    throw new Error("Job title must not be empty.");
  }
  if (title.trim().length === 0) {
    throw new Error("Job title must not be only whitespace.");
  }
  if (title.length > MAX_LENGTH) {
    throw new Error(
      `Job title must be at most ${MAX_LENGTH} characters, got ${title.length}.`,
    );
  }
  if (title !== title.trim()) {
    throw new Error("Job title must not have leading or trailing whitespace.");
  }
  if (title.includes("\n") || title.includes("\r")) {
    throw new Error("Job title must be exactly one line.");
  }
}

function main(): void {
  validateTitle(TITLE);

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const outputPath = join(outputDir, "entry.txt");

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, TITLE, { encoding: "utf8" });

  const written = readFileSync(outputPath, { encoding: "utf8" });
  if (written !== TITLE) {
    throw new Error(
      `Verification failed: file content ${JSON.stringify(written)} ` +
        `does not exactly match title ${JSON.stringify(TITLE)}.`,
    );
  }

  console.log(TITLE);
  console.log(`Character count: ${TITLE.length}`);
}

main();
