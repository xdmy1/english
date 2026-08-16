import { Inter, Literata } from "next/font/google";

/**
 * Literata carries the institutional voice: a text-first serif with optical
 * sizing, drawn for long reading. Inter handles interface and data.
 * Both ship Latin-ext (ă â î ș ț) and Cyrillic, which the trilingual site needs.
 *
 * Both are loaded as VARIABLE fonts — no `weight` array. Naming explicit weights
 * makes next/font ask Google for static instances, which it no longer serves for
 * these families (the requests 404 and the page falls back to a system serif).
 * The variable file also means one download covers 400–700 instead of four.
 *
 * Roman only. next/font preloads every declared style × subset at highest
 * priority, so asking for italic added three more faces — 267 KB — to the head
 * of all thirty pages for a single subtitle. Nothing is set in italic now.
 */
export const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin", "latin-ext", "cyrillic"],
  axes: ["opsz"],
  display: "swap",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});
