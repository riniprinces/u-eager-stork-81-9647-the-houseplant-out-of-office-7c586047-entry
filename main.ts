/**
 * The Houseplant Out-of-Office — make.fun bounty entry.
 *
 * One out-of-office auto-reply, written by the office fern that has
 * not been watered since March. The program validates the line against
 * the 120-character cap, writes it to the harness output file, and
 * prints it to stdout.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const MAX_CHARS = 120;
const OUTPUT_FILENAME = "entry.txt";

const AUTHOR = "Fern";
const PLANT_VOICE = "the office fern, unwatered since March";

const REPLY = [
  "Out of office: my human forgot water exists in March.",
  "I will reply when rehydrated.",
  "Or dead. Probably dead.",
  `— ${AUTHOR}`,
].join(" ");

function checkLength(text: string): void {
  const length = [...text].length;
  if (length === 0) {
    throw new Error("Entry must not be empty.");
  }
  if (length > MAX_CHARS) {
    throw new Error(
      `Entry is ${length} characters, over the ${MAX_CHARS} limit.`,
    );
  }
}

function resolveOutputDir(): string {
  // The program/v1 harness collects /output/entry.txt; a local run may
  // point OUTPUT_DIR elsewhere instead.
  return resolve(process.env.OUTPUT_DIR ?? "/output");
}

function writeEntry(text: string): string {
  checkLength(text);
  const dir = resolveOutputDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, OUTPUT_FILENAME);
  writeFileSync(target, text, "utf8");
  return target;
}

function main(): void {
  const target = writeEntry(REPLY);
  console.log(REPLY);
  console.error(`Wrote ${REPLY.length} chars (${PLANT_VOICE}) to ${target}`);
}

main();
