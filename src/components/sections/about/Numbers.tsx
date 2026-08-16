import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { StatBlock } from "@/components/ui/StatBlock";
import type { Locale } from "@/i18n/config";
import type { AboutDict } from "@/i18n/types";

/** The one dark break in the upper half of the page. */
export function Numbers({
  t,
  locale,
  year,
  index,
}: {
  t: AboutDict["numbers"];
  locale: Locale;
  year: number;
  index: number;
}) {
  return (
    <Section id="numbers" tone="navy">
      <Container>
        <SectionHeading
          eyebrow={t.header.eyebrow}
          title={t.header.title}
          lead={t.header.lead}
          index={index}
          tone="light"
        />

        <StatBlock
          locale={locale}
          labels={t.labels}
          year={year}
          tone="light"
          className="mt-14 sm:mt-16"
        />
      </Container>
    </Section>
  );
}
