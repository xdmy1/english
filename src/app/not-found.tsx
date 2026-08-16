import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

import { Logo } from "@/components/site/Logo";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { site } from "@/data/site";
import { common } from "@/i18n/dictionaries/en/common";
import { defaultLocale, locales, localeMeta } from "@/i18n/config";
import { href, primaryNav } from "@/i18n/routes";
import { inter, literata } from "@/lib/fonts";

/**
 * The 404 for an address that matches no route at all.
 *
 * Three things about this file are not obvious.
 *
 * It cannot be translated. The site's root layout is app/[locale]/layout.tsx —
 * deliberately, so <html lang> can be the locale being rendered — and an
 * unmatched URL never reaches a locale segment, so nothing here knows what
 * language was wanted. It answers in English, the site's primary language, and
 * names the three home pages in their own languages underneath so a Romanian or
 * Russian visitor is one click away from the site in theirs.
 *
 * A catch-all under [locale] throwing notFound() would have been translated, and
 * was tried. notFound() is thrown outside a Suspense boundary in the document
 * shell, so React discards the shell and Next ships <html id="__next_error__">
 * with an empty body for the client to fill in: no markup at all without
 * JavaScript, and still no lang attribute. A real English document beats a
 * translated one that is not there.
 *
 * It brings its own stylesheet and fonts, and states lang on the wrapper. With
 * no app/layout.tsx, Next wraps this file in a built-in <html><body> that
 * carries no attributes — no lang, no font variables, and we cannot add them
 * from here without nesting a second <html> and breaking hydration. lang on the
 * element that contains every word on the page is what a screen reader acts on.
 * The complete fix is `experimental.globalNotFound` in next.config.ts with this
 * file renamed to global-not-found.tsx, which does own its <html>.
 */
export const metadata: Metadata = {
  title: `${common.notFound.title} · ${site.shortName}`,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const locale = defaultLocale;

  return (
    <div
      lang={localeMeta[locale].htmlLang}
      className={`${literata.variable} ${inter.variable} font-sans flex min-h-screen flex-col bg-white antialiased`}
    >
      <header className="border-b border-line">
        <Container className="flex h-18 items-center">
          <Link href={href(locale, "home")} aria-label={common.brand.name}>
            <Logo />
          </Link>
        </Container>
      </header>

      <main id="main" className="flex-1">
        <Container className="flex flex-col items-start py-24 sm:py-32">
          <p className="eyebrow text-red-500">404</p>
          <h1 className="font-display mt-4 max-w-2xl text-4xl leading-[1.08] font-semibold tracking-[-0.02em] text-navy-900 sm:text-5xl">
            {common.notFound.title}
          </h1>
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-slate-600">
            {common.notFound.body}
          </p>

          <Button
            href={href(locale, "home")}
            size="lg"
            className="mt-8"
            trailing={<ArrowRight />}
          >
            {common.notFound.cta}
          </Button>

          <nav
            aria-label={common.footer.exploreTitle}
            className="mt-14 w-full border-t border-line pt-8"
          >
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {primaryNav.map((key) => (
                <li key={key}>
                  <Link
                    href={href(locale, key)}
                    className="link-underline text-[0.9375rem] font-medium text-navy-800"
                  >
                    {common.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Each language named in itself, as the switcher names them. */}
          <nav
            aria-label={common.language.label}
            className="mt-8 w-full border-t border-line pt-8"
          >
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {locales.map((code) => (
                <li key={code}>
                  <Link
                    href={href(code, "home")}
                    lang={localeMeta[code].htmlLang}
                    className="link-underline text-[0.875rem] font-medium text-slate-600"
                  >
                    {localeMeta[code].label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </main>
    </div>
  );
}
