import "server-only";

import type { Locale } from "./config";
import type { Dictionary } from "./types";

const loaders = {
  en: () => import("./dictionaries/en").then((m) => m.dictionary),
  ro: () => import("./dictionaries/ro").then((m) => m.dictionary),
  ru: () => import("./dictionaries/ru").then((m) => m.dictionary),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
