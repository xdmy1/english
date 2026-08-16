import { CountUp } from "@/components/ui/CountUp";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/data/catalogue";
import type { Locale } from "@/i18n/config";
import type { AboutDict } from "@/i18n/types";

/**
 * One number, printed at the size it deserves, with every qualification a
 * parent needs in order to read it correctly set beside it in small print.
 */
export function Results({
  t,
  locale,
  label,
  index,
}: {
  t: AboutDict["results"];
  locale: Locale;
  /** The pass-rate label, reused from the numbers section. */
  label: string;
  index: number;
}) {
  const fact = stats.passRate;

  return (
    <Section id="results" tone="chalk">
      <Container>
        <SectionHeading
          eyebrow={t.header.eyebrow}
          title={t.header.title}
          lead={t.header.lead}
          index={index}
        />

        <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-display text-[4.75rem] leading-[0.82] font-semibold tracking-[-0.04em] text-navy-900 sm:text-[6.5rem] lg:text-[7.5rem]">
                <CountUp
                  locale={locale}
                  value={fact.value}
                  decimals={fact.decimals ?? 0}
                  prefix={fact.prefix ?? ""}
                  suffix={fact.suffix ?? ""}
                />
              </p>
            </Reveal>

            <Reveal delay={60}>
              <Eyebrow className="mt-7">{label}</Eyebrow>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="text-[1.0625rem] leading-[1.7] text-navy-900">{t.lead}</p>
            </Reveal>

            <ol className="mt-9">
              {t.notes.map((note, i) => (
                <Reveal as="li" key={note.slice(0, 32)} delay={Math.min(i, 3) * 60}>
                  <div className="flex gap-4 border-t border-line pt-4 pb-4 last:pb-0">
                    <span
                      aria-hidden="true"
                      className="font-display w-5 shrink-0 pt-[0.1rem] text-[0.75rem] font-semibold text-navy-500 tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[0.8125rem] leading-[1.7] text-slate-600">
                      {note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
