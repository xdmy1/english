import { common as en } from "@/i18n/dictionaries/en/common";
import { common as ro } from "@/i18n/dictionaries/ro/common";
import { common as ru } from "@/i18n/dictionaries/ru/common";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import type { CommonDict } from "@/i18n/types";

/**
 * The dictionary for the two boundaries — error.tsx and not-found.tsx.
 *
 * React renders a boundary with no props, so neither of them can be handed the
 * route params, and error.tsx has to be a client component besides. Neither can
 * therefore await getDictionary(). The three `common` dictionaries are imported
 * statically instead, and the locale is read off the pathname the router is
 * already holding — the header and footer around the boundary are in that
 * language, so the body must be too.
 *
 * Only `common` is pulled in, not a whole dictionary: these are the two screens
 * where the visitor is already having a bad time, and they should not wait on a
 * chunk that carries nine pages of prose.
 */
const dictionaries: Record<Locale, CommonDict> = { en, ro, ru };

/** "/ru/nosuchpage" → "ru". Anything unrecognised falls back to English. */
export function localeFromPathname(pathname: string | null): Locale {
  const first = (pathname ?? "").split("/")[1] ?? "";
  return isLocale(first) ? first : defaultLocale;
}

export function commonFor(locale: Locale): CommonDict {
  return dictionaries[locale];
}
