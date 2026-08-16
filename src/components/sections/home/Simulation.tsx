import { ArrowRight, Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Card";
import { CheckList } from "@/components/ui/CheckList";
import { Figure } from "@/components/ui/Figure";
import { Note } from "@/components/ui/Note";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { format, formatDate } from "@/i18n/format";
import { href } from "@/i18n/routes";
import type { HomeDict } from "@/i18n/types";

export function HomeSimulation({
  locale,
  dict,
}: {
  locale: Locale;
  dict: HomeDict["simulation"];
}) {
  const opens = format(dict.dateLabel, {
    date: formatDate(locale, site.simulationCentreOpens),
  });

  return (
    <Section id="simulation" tone="navy" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="grid-paper pointer-events-none absolute inset-0 opacity-60"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              index={4}
              tone="light"
              eyebrow={dict.eyebrow}
              title={dict.title}
              lead={
                <>
                  <span className="mb-5 block">
                    <Tag tone="light">{opens}</Tag>
                  </span>
                  {dict.lead}
                </>
              }
            />

            <Reveal delay={160}>
              <CheckList
                tone="light"
                items={dict.points}
                className="mt-8 border-t border-white/12 pt-8"
              />
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-9">
                <Button
                  href={href(locale, "apply")}
                  variant="light"
                  size="lg"
                  trailing={<ArrowRight />}
                >
                  {dict.cta}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* The plate fills the column, so the argument on the left never
              leaves a slab of empty navy beside it. */}
          <Reveal delay={120} y={16} className="lg:col-span-6 lg:h-full">
            <Figure
              src="/simulation.svg"
              alt={dict.title}
              rule
              sizes="(min-width: 1024px) 34rem, 100vw"
              aspectClassName="aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[26rem]"
              imageClassName="object-left"
              className="h-full border-white/12 bg-navy-950 shadow-pop"
            />
          </Reveal>
        </div>

        <Reveal delay={80}>
          <Note tone="light" className="mt-14 max-w-3xl">
            {dict.disclaimer}
          </Note>
        </Reveal>
      </Container>
    </Section>
  );
}
