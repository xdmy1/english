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

  /*
    `images` has to be named explicitly. A page's openGraph object REPLACES the
    layout's rather than merging into it, and the generated card lives at
    /[locale]/opengraph-image — so leaving it out silently drops the social
    image from every page except the three home pages.
  */
  const ogImage = `/${locale}/opengraph-image`;

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
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
