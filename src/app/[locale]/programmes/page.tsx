import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExamLadder } from "@/components/sections/programmes/ExamLadder";
import { GroupIndex } from "@/components/sections/programmes/GroupIndex";
import { ProgrammeCard } from "@/components/sections/programmes/ProgrammeCard";
import { CtaBand } from "@/components/site/CtaBand";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight, Button } from "@/components/ui/Button";
import { StepNumber } from "@/components/ui/Card";
import { NotePanel } from "@/components/ui/Note";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { programmesByGroup } from "@/data/catalogue";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale,
    route: "programmes",
    title: dict.programmes.seo.title,
    description: dict.programmes.seo.description,
  });
}

export default async function ProgrammesPage(props: Props) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const t = dict.programmes;

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        tone="chalk"
        aside={<GroupIndex dict={t} />}
      />

      {/* ── 01 Curricula — the two long routes, given the most room ───────── */}
      <Section id="curricula" tone="paper">
        <Container>
          <SectionHeading
            index={1}
            eyebrow={t.hero.eyebrow}
            title={t.groups.curricula.title}
            lead={t.groups.curricula.lead}
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {programmesByGroup.curricula.map((id, index) => (
              <Reveal key={id} delay={Math.min(index, 3) * 70} className="h-full">
                <ProgrammeCard id={id} dict={t} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 02 Courses by age — heading held in a rail beside the grid ─────── */}
      <Section id="courses" tone="chalk">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)] lg:col-span-4">
              <SectionHeading
                index={2}
                eyebrow={t.hero.eyebrow}
                title={t.groups.courses.title}
                lead={t.groups.courses.lead}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:col-span-8">
              {programmesByGroup.courses.map((id, index) => (
                <Reveal key={id} delay={Math.min(index, 3) * 50} className="h-full">
                  <ProgrammeCard id={id} dict={t} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 03 Examination preparation ─────────────────────────────────────── */}
      <Section id="exams" tone="paper">
        <div
          aria-hidden="true"
          className="grid-paper pointer-events-none absolute inset-0 opacity-70"
        />
        <Container className="relative">
          <SectionHeading
            index={3}
            eyebrow={t.hero.eyebrow}
            title={t.groups.exams.title}
            lead={t.groups.exams.lead}
            actions={
              <Button
                href="#ladder"
                variant="outline"
                size="sm"
                trailing={<ArrowRight />}
              >
                {t.ladder.header.title}
              </Button>
            }
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {programmesByGroup.exams.map((id, index) => (
              <Reveal key={id} delay={Math.min(index, 3) * 60} className="h-full">
                <ProgrammeCard id={id} dict={t} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 04 The ladder ──────────────────────────────────────────────────── */}
      <Section id="ladder" tone="navy">
        <Container>
          <SectionHeading
            index={4}
            tone="light"
            eyebrow={t.ladder.header.eyebrow}
            title={t.ladder.header.title}
            lead={t.ladder.header.lead}
          />
          <ExamLadder dict={t} />
        </Container>
      </Section>

      {/* ── 05 Placement ───────────────────────────────────────────────────── */}
      <Section id="placement" tone="paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                index={5}
                eyebrow={t.placement.header.eyebrow}
                title={t.placement.header.title}
                lead={t.placement.header.lead}
              />
            </div>

            <Reveal delay={160} className="lg:col-span-5">
              <NotePanel>{t.placement.note}</NotePanel>
            </Reveal>
          </div>

          {/* Three steps as a rule-separated rail, not three boxes. */}
          <ol className="mt-14 grid gap-x-8 gap-y-10 border-t border-line pt-10 md:grid-cols-3">
            {t.placement.steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={Math.min(index, 3) * 70}
                className={cn(index > 0 && "md:border-l md:border-line md:pl-8")}
              >
                <StepNumber n={index + 1} />
                <h3 className="mt-5 text-[1.125rem] leading-snug font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-[58ch] text-[0.9375rem] leading-[1.7] text-slate-600">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── 06 Questions ───────────────────────────────────────────────────── */}
      <Section id="faq" tone="chalk">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                index={6}
                eyebrow={t.faq.header.eyebrow}
                title={t.faq.header.title}
                lead={t.faq.header.lead}
              />
            </div>

            <div className="lg:col-span-7">
              <Accordion items={t.faq.items} tone="dark" />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        locale={locale as Locale}
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
