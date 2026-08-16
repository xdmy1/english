import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomeEnrol } from "@/components/sections/home/Enrol";
import { HomeFaq } from "@/components/sections/home/Faq";
import { HomeHero } from "@/components/sections/home/Hero";
import { HomeLife } from "@/components/sections/home/Life";
import { HomeMethod } from "@/components/sections/home/Method";
import { HomePillars } from "@/components/sections/home/Pillars";
import { HomeProgrammes } from "@/components/sections/home/Programmes";
import { HomeSimulation } from "@/components/sections/home/Simulation";
import { HomeStats } from "@/components/sections/home/Stats";
import { HomeVisit } from "@/components/sections/home/Visit";
import { DefaultCtaBand } from "@/components/site/CtaBand";
import { site } from "@/data/site";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routes";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const meta = pageMetadata({
    locale,
    route: "home",
    title: dict.home.seo.title,
    description: dict.home.seo.description,
  });

  /*
    title.template in the layout applies to child segments, and the home page IS
    that segment — so it never picks up the brand the way every inner page does.
    Stated absolutely here, with the same separator the template uses.
  */
  return {
    ...meta,
    title: { absolute: `${dict.home.seo.title} · ${site.shortName}` },
  };
}

export default async function HomePage(props: Props) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const t = dict.home;
  const year = new Date().getFullYear();

  /* Only facts that exist in src/data are published here — nothing invented. */
  const organisation = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    url: `${site.url}${href(typedLocale, "home")}`,
    telephone: site.phone.e164,
    email: site.email.general,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    areaServed: {
      "@type": "Country",
      name: site.address.country,
    },
  };

  return (
    <>
      {/*
        Every value here comes from src/data/site.ts, which the centre fills in
        by hand. JSON.stringify does not escape a less-than sign, so one pasted
        closing script tag would end this element early and spill the rest of the
        record into the page as markup. Escaping it keeps the JSON valid and
        leaves nothing for the HTML parser to act on.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organisation).replace(/</g, "\\u003c"),
        }}
      />

      <HomeHero
        locale={typedLocale}
        dict={t.hero}
        passRate={t.stats.labels.passRate}
        year={year}
      />

      <HomeStats locale={typedLocale} dict={t.stats} year={year} />

      <HomePillars dict={t.pillars} />

      <HomeProgrammes
        locale={typedLocale}
        dict={t.programmes}
        programmesDict={dict.programmes}
        cardCta={dict.common.actions.learnMore}
      />

      <HomeSimulation locale={typedLocale} dict={t.simulation} />

      <HomeMethod locale={typedLocale} dict={t.method} />

      <HomeLife dict={t.life} />

      <HomeEnrol locale={typedLocale} dict={t.enrol} />

      <HomeFaq locale={typedLocale} dict={t.faq} />

      <HomeVisit
        locale={typedLocale}
        dict={t.visit}
        contactDict={dict.contact}
        weekdays={dict.common.weekdays}
      />

      <DefaultCtaBand locale={typedLocale} dict={dict.common.ctaBand} />
    </>
  );
}
