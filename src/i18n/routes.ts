import type { Locale } from "./config";

/**
 * Every internal destination on the site is referenced by a route key, never by
 * a hard-coded string. Adding a locale therefore cannot break a single link.
 */
export const routes = {
  home: "",
  about: "about",
  programmes: "programmes",
  team: "team",
  schedule: "schedule",
  contact: "contact",
  apply: "apply",
  privacy: "privacy",
  cookies: "cookie-policy",
  terms: "terms",
} as const;

export type RouteKey = keyof typeof routes;

/** Builds a locale-prefixed path, e.g. href("ro", "about") -> "/ro/about". */
export function href(locale: Locale, route: RouteKey, hash?: string): string {
  const segment = routes[route];
  const path = segment ? `/${locale}/${segment}` : `/${locale}`;
  return hash ? `${path}#${hash}` : path;
}

/** Primary navigation, in order. */
export const primaryNav = [
  "about",
  "programmes",
  "team",
  "schedule",
  "contact",
] as const satisfies readonly RouteKey[];

export const legalNav = ["privacy", "cookies", "terms"] as const satisfies readonly RouteKey[];

/**
 * Maps a pathname such as "/ro/about" back to its route key so the language
 * switcher can stay on the same page when the locale changes.
 */
export function routeKeyFromPathname(pathname: string): RouteKey {
  const segments = pathname.split("/").filter(Boolean);
  const rest = segments.slice(1).join("/");
  const match = (Object.keys(routes) as RouteKey[]).find((key) => routes[key] === rest);
  return match ?? "home";
}
