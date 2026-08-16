import type { Metadata } from "next";
import { notFound } from "next/navigation";

import "../globals.css";

import { CookieConsent } from "@/components/site/CookieConsent";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { site } from "@/data/site";
import { isLocale, locales, localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { inter, literata } from "@/lib/fonts";

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Two figures on this site are derived from the current year: the copyright line
 * below and the "years teaching" count on the home and about pages. Prerendered
 * once and cached for a year, both would be wrong from the first of January
 * until somebody happened to redeploy. A day is short enough that neither can be
 * stale by the time anybody notices, and long enough that the pages are still
 * served from the edge. Inherited by every route under this layout.
 */
export const revalidate = 86400;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: dict.home.seo.title,
      template: `%s · ${site.shortName}`,
    },
    description: dict.home.seo.description,
    applicationName: site.name,
    formatDetection: { telephone: false },
    icons: { icon: "/icon.svg", apple: "/icon.svg" },
    other: { "theme-color": "#152A6F" },
  };
}

export default async function LocaleLayout(props: Props) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const year = new Date().getFullYear();

  return (
    <html
      lang={localeMeta[typedLocale].htmlLang}
      className={`${literata.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/*
          Marks the document as scriptable before the first paint. Everything
          that hides content until JavaScript runs — the scroll reveals — is
          gated on this flag, so a visitor whose bundle is slow, blocked or
          broken still sees the page. See the .reveal rules in globals.css.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.setAttribute("data-js","")',
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          {dict.common.actions.skipToContent}
        </a>

        <Header locale={typedLocale} dict={dict.common} />

        <main id="main" className="flex-1">
          {props.children}
        </main>

        <Footer
          locale={typedLocale}
          dict={dict.common}
          programmes={dict.programmes}
          year={year}
        />

        <CookieConsent locale={typedLocale} dict={dict.common.cookieBanner} />
      </body>
    </html>
  );
}
