import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Beyond } from "@/components/sections/about/Beyond";
import { Facilities } from "@/components/sections/about/Facilities";
import { Method } from "@/components/sections/about/Method";
import { Numbers } from "@/components/sections/about/Numbers";
import { Partnership } from "@/components/sections/about/Partnership";
import { Principles } from "@/components/sections/about/Principles";
import { Results } from "@/components/sections/about/Results";
import { Simulation } from "@/components/sections/about/Simulation";
import { Story } from "@/components/sections/about/Story";
import { CtaBand } from "@/components/site/CtaBand";
import { CountUp } from "@/components/ui/CountUp";
import { PageHero } from "@/components/ui/PageHero";
import { StatCard } from "@/components/ui/StatCard";
import { stats } from "@/data/catalogue";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale,
    route: "about",
    title: dict.about.seo.title,
    description: dict.about.seo.description,
  });
}

export default async function AboutPage(props: Props) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const t = dict.about;
  const year = new Date().getFullYear();

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        tone="chalk"
        aside={
          <StatCard
            size="lg"
            className="w-full lg:w-[17.5rem]"
            label={t.numbers.labels.passRate.label}
            value={
              <CountUp
                locale={typedLocale}
                value={stats.passRate.value}
                decimals={stats.passRate.decimals ?? 0}
                prefix={stats.passRate.prefix ?? ""}
                suffix={stats.passRate.suffix ?? ""}
              />
            }
          />
        }
      />

      <Story t={t.story} index={1} />
      <Numbers t={t.numbers} locale={typedLocale} year={year} index={2} />
      <Principles t={t.principles} index={3} />
      <Simulation t={t.simulation} index={4} />
      <Method t={t.method} index={5} />
      <Results
        t={t.results}
        locale={typedLocale}
        label={t.numbers.labels.passRate.label}
        index={6}
      />
      <Partnership t={t.partnership} index={7} />
      <Facilities
        t={t.facilities}
        locale={typedLocale}
        actions={dict.common.actions}
        photoPlaceholder={dict.common.placeholder.photo}
        index={8}
      />
      <Beyond t={t.beyond} index={9} />

      <CtaBand
        locale={typedLocale}
        eyebrow={dict.common.ctaBand.eyebrow}
        title={t.cta.title}
        body={t.cta.body}
        primary={t.cta.primary}
        secondary={t.cta.secondary}
        note={dict.common.ctaBand.note}
      />
    </>
  );
}
