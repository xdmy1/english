import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { AboutDict } from "@/i18n/types";

/**
 * The warm end of the page. No cards, no chips, no icons — just larger type
 * and a great deal more air than anything above it.
 */
export function Beyond({ t, index }: { t: AboutDict["beyond"]; index: number }) {
  return (
    <Section id="beyond" tone="paper">
      <Container>
        <SectionHeading
          eyebrow={t.header.eyebrow}
          title={t.header.title}
          lead={t.header.lead}
          index={index}
        />

        <ul className="mt-16 grid gap-x-16 gap-y-12 sm:mt-20 sm:gap-y-14 lg:grid-cols-2">
          {t.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={Math.min(i, 3) * 60}>
              <div className="border-t border-line pt-7">
                <h3 className="font-display text-[1.375rem] leading-snug font-semibold text-navy-900 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[54ch] text-[1.0625rem] leading-[1.75] text-slate-600">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
