import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import type { HomeDict } from "@/i18n/types";

export function HomeFaq({
  locale,
  dict,
}: {
  locale: Locale;
  dict: HomeDict["faq"];
}) {
  return (
    <Section id="faq" tone="chalk">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-h)+2.5rem)] lg:self-start">
            <SectionHeading
              index={8}
              eyebrow={dict.header.eyebrow}
              title={dict.header.title}
              lead={dict.header.lead}
            />
            <Reveal delay={160}>
              <div className="mt-9">
                <Button
                  href={href(locale, "contact")}
                  variant="outline"
                  trailing={<ArrowRight />}
                >
                  {dict.cta}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={80} className="lg:col-span-7">
            <div className="rounded-2xl border border-line bg-white px-6 sm:px-8">
              <Accordion items={dict.items} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
