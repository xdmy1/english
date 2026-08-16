import { createJiti } from "jiti";
import path from "node:path";

const root = "/Users/bobernagadamian/Desktop/TheEnglishCenter";
const jiti = createJiti(import.meta.url, { alias: { "@": path.join(root, "src") } });

const files = ["common", "home", "about", "programmes", "team", "schedule", "contact", "apply", "legal"];
const locales = ["en", "ro", "ru"];

const dicts = {};
for (const loc of locales) {
  dicts[loc] = {};
  for (const f of files) {
    const mod = await jiti.import(path.join(root, `src/i18n/dictionaries/${loc}/${f}.ts`));
    dicts[loc][f] = mod[f] ?? mod.default;
  }
}

// Walk and collect leaves + array lengths
function walk(node, prefix, out) {
  if (Array.isArray(node)) {
    out.arrays.set(prefix, node.length);
    node.forEach((v, i) => walk(v, `${prefix}[${i}]`, out));
    return;
  }
  if (node && typeof node === "object") {
    for (const k of Object.keys(node)) walk(node[k], prefix ? `${prefix}.${k}` : k, out);
    return;
  }
  out.leaves.set(prefix, node);
}

const info = {};
for (const loc of locales) {
  const out = { arrays: new Map(), leaves: new Map() };
  walk(dicts[loc], "", out);
  info[loc] = out;
}

console.log("=== ARRAY LENGTH DIFFERENCES ===");
const allArrayKeys = new Set([...locales.flatMap((l) => [...info[l].arrays.keys()])]);
for (const k of [...allArrayKeys].sort()) {
  const lens = locales.map((l) => info[l].arrays.get(k));
  if (new Set(lens.map(String)).size > 1) console.log(k, JSON.stringify(lens));
}

console.log("\n=== KEY SET DIFFERENCES (leaf paths) ===");
const allLeaf = new Set(locales.flatMap((l) => [...info[l].leaves.keys()]));
for (const k of [...allLeaf].sort()) {
  const present = locales.filter((l) => info[l].leaves.has(k));
  if (present.length !== 3) console.log(k, "present in:", present.join(","));
}

console.log("\n=== TOKEN MISMATCHES ===");
const tokenRe = /\{(\w+)\}/g;
for (const k of [...allLeaf].sort()) {
  const sets = locales.map((l) => {
    const v = info[l].leaves.get(k);
    if (typeof v !== "string") return null;
    return [...v.matchAll(tokenRe)].map((m) => m[1]).sort().join(",");
  });
  if (sets.some((s) => s === null)) continue;
  if (new Set(sets).size > 1) console.log(k, JSON.stringify(sets));
}

console.log("\n=== IDENTICAL TO ENGLISH (ro/ru string equal to en, len>3, not brand/CEFR) ===");
for (const k of [...allLeaf].sort()) {
  const en = info.en.leaves.get(k);
  if (typeof en !== "string" || en.length < 12) continue;
  for (const l of ["ro", "ru"]) {
    const v = info[l].leaves.get(k);
    if (v === en) console.log(`${l} ${k}: ${JSON.stringify(en.slice(0, 90))}`);
  }
}

console.log("\n=== RU strings containing NO Cyrillic (len>=15) ===");
for (const k of [...allLeaf].sort()) {
  const v = info.ru.leaves.get(k);
  if (typeof v !== "string" || v.length < 15) continue;
  if (!/[Ѐ-ӿ]/.test(v)) console.log(`${k}: ${JSON.stringify(v.slice(0, 110))}`);
}

console.log("\n=== TOKENS PRESENT (en) ===");
for (const k of [...allLeaf].sort()) {
  const v = info.en.leaves.get(k);
  if (typeof v === "string" && /\{\w+\}/.test(v)) console.log(`${k}: ${JSON.stringify(v)}`);
}

console.log("\n=== updatedDate / dates ===");
for (const l of locales) console.log(l, JSON.stringify(info[l].leaves.get("legal.updatedDate")));
