import { StepNumber } from "@/components/ui/Card";
import {
  Container,
  RuledDivider,
  Section,
  SectionHeading,
} from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { AboutDict } from "@/i18n/types";
import { cn } from "@/lib/cn";

/**
 * Heading on the left, argument on the right, then the three pillars set out
 * below the brand rule as a sequence: build, correct, measure.
 */
export function Method({ t, index }: { t: AboutDict["method"]; index: number }) {
  return (
    <Section id="method" tone="paper">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={t.header.eyebrow}
              title={t.header.title}
              lead={t.header.lead}
              index={index}
            />
          </div>

          <div className="flex flex-col gap-5 lg:col-span-6 lg:col-start-7 lg:pt-3">
            {t.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 32)} delay={Math.min(i, 3) * 50}>
                <p
                  className={cn(
                    "leading-[1.75]",
                    i === 0
                      ? "text-[1.0625rem] text-navy-900"
                      : "text-[1rem] text-slate-600",
                  )}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <RuledDivider className="mt-16 sm:mt-20" />

        <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {t.pillars.map((pillar, i) => (
            <Reveal as="li" key={pillar.title} delay={Math.min(i, 3) * 60}>
              <StepNumber n={i + 1} />
              {/* text-xl is the step title across the site — see home/Method,
                  home/Enrol and the placement steps on /programmes. */}
              <h3 className="mt-5 text-xl leading-snug font-semibold text-navy-900">
                {pillar.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-slate-600">
                {pillar.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
