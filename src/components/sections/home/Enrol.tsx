import { ArrowRight, Button } from "@/components/ui/Button";
import { StepNumber } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import type { HomeDict } from "@/i18n/types";
import { cn } from "@/lib/cn";

export function HomeEnrol({
  locale,
  dict,
}: {
  locale: Locale;
  dict: HomeDict["enrol"];
}) {
  return (
    <Section id="enrol" tone="paper">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index={7}
              eyebrow={dict.header.eyebrow}
              title={dict.header.title}
              lead={dict.header.lead}
            />
            <Reveal delay={160}>
              <div className="mt-9">
                <Button
                  href={href(locale, "apply")}
                  size="lg"
                  trailing={<ArrowRight />}
                >
                  {dict.cta}
                </Button>
              </div>
            </Reveal>
          </div>

          <ol className="lg:col-span-7">
            {dict.steps.map((step, index) => {
              const last = index === dict.steps.length - 1;
              return (
                <Reveal
                  key={step.title}
                  delay={Math.min(index, 3) * 70}
                  as="li"
                  className="relative"
                >
                  {!last ? (
                    <span
                      aria-hidden="true"
                      className="absolute top-12 bottom-0 left-[1.375rem] w-px bg-line"
                    />
                  ) : null}

                  <div className={cn("flex gap-5 sm:gap-7", last ? "pb-0" : "pb-10")}>
                    <StepNumber n={index + 1} className="relative z-10" />
                    <div className="pt-1.5">
                      <h3 className="text-xl leading-snug font-semibold tracking-[-0.01em] text-navy-900">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-[54ch] text-[0.9375rem] leading-[1.72] text-slate-600">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
