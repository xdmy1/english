import { Card, Tag } from "@/components/ui/Card";
import { Figure } from "@/components/ui/Figure";
import { Note } from "@/components/ui/Note";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { AboutDict } from "@/i18n/types";
import { cn } from "@/lib/cn";

/**
 * The exam-simulation room. Text holds five columns, the figure seven, so the
 * page opens out here instead of running another even grid.
 */
export function Simulation({
  t,
  index,
}: {
  t: AboutDict["simulation"];
  index: number;
}) {
  return (
    <Section id="simulation" tone="chalk">
      <Container>
        {/*
          The opening date sits above the lead, as it does in the home page's
          simulation section — not in the `actions` slot, which every other
          section on the site fills with a button. A red-filled pill in the place
          a reader expects a call to action gets clicked, and red is punctuation
          here, never a field.
        */}
        <SectionHeading
          eyebrow={t.header.eyebrow}
          title={t.header.title}
          index={index}
          lead={
            <>
              <span className="mb-5 block">
                <Tag>{t.badge}</Tag>
              </span>
              {t.header.lead}
            </>
          }
        />

        <div className="mt-14 grid items-center gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-5 lg:col-span-5">
            {t.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 32)} delay={Math.min(i, 3) * 50}>
                <p
                  className={cn(
                    "leading-[1.75]",
                    i === 0
                      ? "text-[1.0625rem] text-navy-900"
                      : "text-[0.9375rem] text-slate-600",
                  )}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100} className="lg:col-span-7">
            <Figure
              src="/simulation.svg"
              alt={t.header.title}
              sizes="(max-width: 1024px) 100vw, 58vw"
              aspectClassName="aspect-[4/3] sm:aspect-[3/2]"
            />
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {t.points.map((point, i) => (
            <Reveal as="li" key={point.title} delay={Math.min(i, 3) * 60}>
              <Card className="h-full">
                <h3 className="text-[1.0625rem] leading-snug font-semibold text-navy-900">
                  {point.title}
                </h3>
                <p className="mt-3 text-[0.875rem] leading-[1.7] text-slate-600">
                  {point.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={60}>
          <Note className="mt-10">{t.disclaimer}</Note>
        </Reveal>
      </Container>
    </Section>
  );
}
