import { ArrowRight, Button } from "@/components/ui/Button";
import { StepNumber } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import type { HomeDict } from "@/i18n/types";

export function HomeMethod({
  locale,
  dict,
}: {
  locale: Locale;
  dict: HomeDict["method"];
}) {
  return (
    <Section id="method" tone="paper">
      <Container>
        <SectionHeading
          index={5}
          eyebrow={dict.header.eyebrow}
          title={dict.header.title}
          lead={dict.header.lead}
          actions={
            <Button
              href={href(locale, "about")}
              variant="ghost"
              trailing={<ArrowRight />}
            >
              {dict.cta}
            </Button>
          }
        />

        <div className="relative mt-14">
          {/* The rail the three stages hang from; the numerals sit on top of it. */}
          <div
            aria-hidden="true"
            className="mask-rail-x pointer-events-none absolute inset-x-0 top-[1.375rem] hidden h-px bg-line lg:block"
          />

          <ol className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            {dict.steps.map((step, index) => (
              <Reveal key={step.title} delay={Math.min(index, 3) * 70} as="li" className="relative">
                <StepNumber n={index + 1} className="relative z-10" />
                <h3 className="mt-6 text-xl leading-snug font-semibold tracking-[-0.01em] text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-[1.72] text-slate-600">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
