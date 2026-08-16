import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { AboutDict } from "@/i18n/types";

/**
 * Five principles read as a numbered list under hairlines, two abreast — a
 * standing order rather than five marketing cards.
 */
export function Principles({
  t,
  index,
}: {
  t: AboutDict["principles"];
  index: number;
}) {
  return (
    <Section id="principles" tone="paper">
      <Container>
        <SectionHeading
          eyebrow={t.header.eyebrow}
          title={t.header.title}
          lead={t.header.lead}
          index={index}
        />

        <ol className="mt-14 grid gap-x-16 gap-y-9 sm:mt-16 lg:grid-cols-2">
          {t.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={Math.min(i, 3) * 60}>
              <div className="flex gap-5 border-t border-line pt-6">
                <span
                  aria-hidden="true"
                  className="font-display w-7 shrink-0 pt-[0.2rem] text-[0.9375rem] font-semibold text-navy-500 tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.1875rem] leading-snug font-semibold text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-slate-600">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
