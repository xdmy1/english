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
  return pageMetadata({
    locale,
    route: "home",
    title: dict.home.seo.title,
    description: dict.home.seo.description,
  });
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
      />

      <HomeHero
        locale={typedLocale}
        dict={t.hero}
        passRateLabel={t.stats.labels.passRate.label}
        year={year}
      />

      <HomeStats locale={typedLocale} dict={t.stats} year={year} />

      <HomePillars dict={t.pillars} />

      <HomeProgrammes
        locale={typedLocale}
        dict={t.programmes}
        programmesDict={dict.programmes}
        viewAllLabel={dict.common.actions.learnMore}
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
