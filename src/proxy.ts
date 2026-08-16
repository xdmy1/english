import { NextResponse, type NextRequest } from "next/server";

import { LOCALE_COOKIE, defaultLocale, isLocale, locales } from "@/i18n/config";

/**
 * Every page lives under /<locale>/…  A request without a locale prefix is
 * redirected to the visitor's remembered choice, then to their browser
 * preference, and finally to English — which is the site's primary language.
 */
function resolveLocale(request: NextRequest): string {
  const remembered = request.cookies.get(LOCALE_COOKIE)?.value;
  if (remembered && isLocale(remembered)) return remembered;

  const header = request.headers.get("accept-language");
  if (header) {
    const ranked = header
      .split(",")
      .map((part) => {
        const [tag, ...params] = part.trim().split(";");
        const q = params
          .map((p) => p.trim())
          .find((p) => p.startsWith("q="))
          ?.slice(2);
        return { tag: (tag ?? "").trim().toLowerCase(), q: q ? Number(q) : 1 };
      })
      .filter((entry) => entry.tag.length > 0)
      .sort((a, b) => b.q - a.q);

    for (const { tag } of ranked) {
      const base = tag.split("-")[0] ?? "";
      // Moldovan browsers commonly report "mo" for Romanian.
      const normalised = base === "mo" ? "ro" : base;
      if (isLocale(normalised)) return normalised;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Everything except Next internals, the API, and files with an extension
     * (robots.txt, sitemap.xml, images, fonts …).
     */
    "/((?!_next/|api/|.*\\.[\\w]+$).*)",
  ],
};
