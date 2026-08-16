import type { Metadata } from "next";

import { site } from "@/data/site";
import { localeMeta, locales, type Locale } from "@/i18n/config";
import { href, type RouteKey } from "@/i18n/routes";

/**
 * Canonical + hreflang for a page, in one place. `x-default` points at English
 * because that is the site's primary language.
 */
export function pageMetadata({
  locale,
  route,
  title,
  description,
  noIndex,
}: {
  locale: Locale;
  route: RouteKey;
  title: string;
  description: string;
  noIndex?: boolean;
}): Metadata {
  const path = href(locale, route);
  const languages = Object.fromEntries([
    ...locales.map((code) => [localeMeta[code].htmlLang, href(code, route)]),
    ["x-default", href("en", route)],
  ]);

  return {
    title,
    description,
    alternates: { canonical: path, languages },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales
        .filter((code) => code !== locale)
        .map((code) => localeMeta[code].ogLocale),
      url: path,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
