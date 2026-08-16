import { ArrowRight, Button } from "@/components/ui/Button";
import { Card, FactRow, Tag } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { levels, programmes, programmesByGroup } from "@/data/catalogue";
import type { Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { href } from "@/i18n/routes";
import type { HomeDict, ProgrammesDict } from "@/i18n/types";

/** Curricula first, then the examination programmes: the two ends of the ladder. */
const previewIds = [...programmesByGroup.curricula, ...programmesByGroup.exams];

export function HomeProgrammes({
  locale,
  dict,
  programmesDict,
  cardCta,
}: {
  locale: Locale;
  dict: HomeDict["programmes"];
  programmesDict: ProgrammesDict;
  /** common.actions.learnMore — the read-on affordance on each card. */
  cardCta: string;
}) {
  return (
    <Section id="programmes" tone="chalk">
      <Container>
        <SectionHeading
          index={3}
          eyebrow={dict.header.eyebrow}
          title={dict.header.title}
          lead={dict.header.lead}
          actions={
            <Button
              href={href(locale, "programmes")}
              variant="outline"
              trailing={<ArrowRight />}
            >
              {dict.cta}
            </Button>
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {previewIds.map((id, index) => {
            const facts = programmes[id];
            const copy = programmesDict.items[id];
            const first = facts.levels[0];
            const last = facts.levels[facts.levels.length - 1];
            const levelRange =
              first === last
                ? levels[first].cefr
                : `${levels[first].cefr} – ${levels[last].cefr}`;

            const meta = [
              facts.hours !== null
                ? format(programmesDict.facts.hours, { n: facts.hours })
                : null,
              facts.sessionsPerWeek !== null
                ? format(programmesDict.facts.perWeek, { n: facts.sessionsPerWeek })
                : null,
            ].filter(Boolean);

            return (
              <Reveal key={id} delay={Math.min(index, 3) * 60}>
                <Card href={href(locale, "programmes", id)} className="h-full">
                  <Tag tone="muted">{programmesDict.groups[facts.group].title}</Tag>

                  <h3 className="mt-5 text-[1.3125rem] leading-snug font-semibold tracking-[-0.01em] text-navy-900">
                    {copy.name}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-slate-600">
                    {copy.tagline}
                  </p>

                  {meta.length > 0 ? (
                    <p className="mt-5 text-2xs font-semibold tracking-[0.08em] text-slate-500 uppercase">
                      {meta.join(" · ")}
                    </p>
                  ) : null}

                  <dl className="mt-auto pt-5">
                    <FactRow label={programmesDict.facts.levels} value={levelRange} />
                    <FactRow
                      label={programmesDict.facts.ages}
                      value={
                        facts.ages
                          ? `${facts.ages[0]}–${facts.ages[1]}`
                          : programmesDict.facts.anyAge
                      }
                    />
                  </dl>

                  <span className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-navy-800">
                    {cardCta}
                    <ArrowRight className="can-hover:group-hover/card:translate-x-0.5" />
                  </span>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
