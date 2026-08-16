import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FounderFeature } from "@/components/sections/team/FounderFeature";
import { JoinBand } from "@/components/sections/team/JoinBand";
import { StandardsList } from "@/components/sections/team/StandardsList";
import { TeacherCard } from "@/components/sections/team/TeacherCard";
import { CtaBand } from "@/components/site/CtaBand";
import { ContractGlyph } from "@/components/ui/icons";
import { NotePanel } from "@/components/ui/Note";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Container, RuledDivider, Section, SectionHeading } from "@/components/ui/Section";
import { teachers } from "@/data/team";
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
    route: "team",
    title: dict.team.seo.title,
    description: dict.team.seo.description,
  });
}

export default async function TeamPage(props: Props) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const t = dict.team;
  const placeholder = dict.common.placeholder;

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        tone="chalk"
      />

      {/* 01 — The founder */}
      <Section tone="paper">
        <FounderFeature index={1} dict={t.founder} placeholder={placeholder} />
      </Section>

      {/* 02 — The teaching staff */}
      <Section tone="chalk">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <SectionHeading
              className="lg:col-span-7"
              index={2}
              eyebrow={t.teachers.header.eyebrow}
              title={t.teachers.header.title}
              lead={t.teachers.header.lead}
            />
            <Reveal delay={160} className="lg:col-span-5">
              <NotePanel icon={<ContractGlyph />}>
                {t.teachers.employmentNote}
              </NotePanel>
            </Reveal>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-14 lg:grid-cols-3">
            {teachers.map((member, index) => (
              <Reveal
                as="li"
                key={member.id}
                delay={(index % 3) * 60}
                className="h-full"
              >
                <TeacherCard
                  member={member}
                  copy={t.members[member.id]}
                  sinceLabel={t.teachers.sinceLabel}
                  placeholder={placeholder}
                />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 03 — What we require before a teacher takes a class */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
                <SectionHeading
                  index={3}
                  eyebrow={t.standards.header.eyebrow}
                  title={t.standards.header.title}
                  lead={t.standards.header.lead}
                />
                <RuledDivider className="mt-9 hidden lg:flex" />
              </div>
            </div>

            <div className="lg:col-span-8">
              <StandardsList items={t.standards.items} />
            </div>
          </div>
        </Container>
      </Section>

      <JoinBand locale={typedLocale} dict={t.join} />

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
