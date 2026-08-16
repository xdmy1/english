import { ArrowRight, Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { StatBlock } from "@/components/ui/StatBlock";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import type { HomeDict } from "@/i18n/types";

export function HomeStats({
  locale,
  dict,
  year,
}: {
  locale: Locale;
  dict: HomeDict["stats"];
  year: number;
}) {
  return (
    <Section id="numbers" tone="chalk">
      <Container>
        <SectionHeading
          index={1}
          eyebrow={dict.header.eyebrow}
          title={dict.header.title}
          lead={dict.header.lead}
        />

        <StatBlock
          locale={locale}
          labels={dict.labels}
          year={year}
          className="mt-14 sm:mt-16"
        />

        <Reveal delay={80}>
          <div className="mt-12 border-t border-line pt-8">
            <Button
              href={href(locale, "about")}
              variant="outline"
              trailing={<ArrowRight />}
            >
              {dict.cta}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
