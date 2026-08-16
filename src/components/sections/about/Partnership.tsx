import { Note } from "@/components/ui/Note";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { AboutDict } from "@/i18n/types";

/**
 * Deliberately the quietest section on the page: a narrow measure, no badges,
 * no shields, no logo. What our Cambridge status is, and what it is not.
 */
export function Partnership({
  t,
  index,
}: {
  t: AboutDict["partnership"];
  index: number;
}) {
  return (
    <Section id="partnership" tone="paper">
      <Container width="narrow">
        <SectionHeading
          eyebrow={t.header.eyebrow}
          title={t.header.title}
          lead={t.header.lead}
          index={index}
        />

        <div className="mt-10 flex max-w-[68ch] flex-col gap-5">
          {t.paragraphs.map((paragraph, i) => (
            <Reveal key={paragraph.slice(0, 32)} delay={Math.min(i, 3) * 50}>
              <p className="text-[1rem] leading-[1.8] text-slate-700">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <Note className="mt-10">{t.disclaimer}</Note>
        </Reveal>
      </Container>
    </Section>
  );
}
