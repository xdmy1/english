import type { MetadataRoute } from "next";

import { site } from "@/data/site";
import { locales, localeMeta } from "@/i18n/config";
import { href, routes, type RouteKey } from "@/i18n/routes";

const priorities: Partial<Record<RouteKey, number>> = {
  home: 1,
  programmes: 0.9,
  apply: 0.9,
  about: 0.8,
  schedule: 0.8,
  contact: 0.8,
  team: 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(routes) as RouteKey[];

  return locales.flatMap((locale) =>
    keys.map((route) => ({
      url: `${site.url}${href(locale, route)}`,
      lastModified: new Date(),
      changeFrequency: route === "schedule" ? ("weekly" as const) : ("monthly" as const),
      priority: priorities[route] ?? 0.4,
      alternates: {
        languages: Object.fromEntries([
          ...locales.map((code) => [
            localeMeta[code].htmlLang,
            `${site.url}${href(code, route)}`,
          ]),
          ["x-default", `${site.url}${href("en", route)}`],
        ]),
      },
    })),
  );
}
