#!/usr/bin/env node
/**
 * Lists everything the client still has to supply, and catches timetable
 * clashes. Run with:  npm run check:content
 *
 * Exits 1 when anything is unresolved, so it can be wired into a pre-deploy
 * step once the real content is in. It is deliberately NOT part of `npm run
 * build`, because the site has to be buildable while the placeholders remain.
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

const problems = [];
const warnings = [];

/* ── 1. PLACEHOLDER markers in the data layer ────────────────────────────── */

/** Lines that mention PLACEHOLDER as code rather than as unfilled data. */
const isMachinery = (line) => {
  const t = line.trimStart();
  return (
    t.startsWith("*") ||
    t.startsWith("//") ||
    t.startsWith("import ") ||
    t.startsWith("return ") ||
    t.includes("export const PLACEHOLDER")
  );
};

for (const file of ["src/data/site.ts", "src/data/team.ts", "src/data/catalogue.ts"]) {
  const source = read(file);
  source.split("\n").forEach((line, index) => {
    if (line.includes("PLACEHOLDER") && !isMachinery(line)) {
      problems.push(`${file}:${index + 1}  ${line.trim()}`);
    }
  });
}

/* ── 2. Team photos ──────────────────────────────────────────────────────── */

const teamSource = read("src/data/team.ts");
const photoCount = (teamSource.match(/photo:\s*null/g) ?? []).length;
if (photoCount > 0) {
  problems.push(`src/data/team.ts  ${photoCount} team member(s) still have no photograph`);
}

/* ── 3. Timetable: sample flag, and clashes ──────────────────────────────── */

const scheduleSource = read("src/data/schedule.ts");
if (/export const isSample = true/.test(scheduleSource)) {
  problems.push("src/data/schedule.ts  isSample is still true — the timetable is illustrative");
}

const slotPattern =
  /\{\s*id:\s*"([^"]+)",\s*day:\s*"([^"]+)",\s*start:\s*"([^"]+)",\s*end:\s*"([^"]+)",\s*group:\s*"([^"]+)",\s*programmeId:\s*"([^"]+)",\s*levelId:\s*"([^"]+)",\s*teacherId:\s*"([^"]+)",\s*roomId:\s*"([^"]+)"\s*\}/g;

const minutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const slots = [];
for (const match of scheduleSource.matchAll(slotPattern)) {
  const [, id, day, start, end, group, programmeId, levelId, teacherId, roomId] = match;
  slots.push({ id, day, start, end, group, programmeId, levelId, teacherId, roomId });
}

if (slots.length === 0) {
  warnings.push("src/data/schedule.ts  no timetable slots were parsed — check the file format");
}

for (const slot of slots) {
  if (minutes(slot.end) <= minutes(slot.start)) {
    problems.push(`schedule ${slot.id}  ends at or before it starts (${slot.start}–${slot.end})`);
  }
}

const overlaps = (a, b) =>
  a.day === b.day && minutes(a.start) < minutes(b.end) && minutes(b.start) < minutes(a.end);

for (let i = 0; i < slots.length; i += 1) {
  for (let j = i + 1; j < slots.length; j += 1) {
    const a = slots[i];
    const b = slots[j];
    if (!overlaps(a, b)) continue;
    if (a.roomId === b.roomId) {
      problems.push(`schedule  ${a.id} and ${b.id} both use room ${a.roomId} on ${a.day}`);
    }
    if (a.teacherId === b.teacherId) {
      problems.push(`schedule  ${a.id} and ${b.id} both need ${a.teacherId} on ${a.day}`);
    }
  }
}

/* ── 4. Form delivery ────────────────────────────────────────────────────── */

const envFile = existsSync(join(root, ".env.local"))
  ? read(".env.local")
  : existsSync(join(root, ".env"))
    ? read(".env")
    : "";

const hasWeb3 = /^\s*NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=\S/m.test(envFile);
const hasResend = /^\s*RESEND_API_KEY=\S/m.test(envFile) && /^\s*ENQUIRY_FROM=\S/m.test(envFile);
if (!hasWeb3 && !hasResend) {
  problems.push(
    "no form delivery configured — set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY or RESEND_API_KEY + ENQUIRY_FROM (docs/FORM-SETUP.md)",
  );
}

/* ── Report ──────────────────────────────────────────────────────────────── */

const bold = (s) => `[1m${s}[0m`;
const red = (s) => `[31m${s}[0m`;
const yellow = (s) => `[33m${s}[0m`;
const green = (s) => `[32m${s}[0m`;

console.log(`\n${bold("Content check")}\n`);

if (problems.length === 0 && warnings.length === 0) {
  console.log(green("Everything is filled in. Nothing left to supply.\n"));
  process.exit(0);
}

if (problems.length > 0) {
  console.log(red(`${problems.length} item(s) still to resolve:\n`));
  for (const problem of problems) console.log(`  • ${problem}`);
  console.log("");
}

if (warnings.length > 0) {
  console.log(yellow(`${warnings.length} warning(s):\n`));
  for (const warning of warnings) console.log(`  • ${warning}`);
  console.log("");
}

console.log("See CONTENT-TODO.md for what each of these needs.\n");
process.exit(problems.length > 0 ? 1 : 0);
