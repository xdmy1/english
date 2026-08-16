import { PullQuote } from "@/components/ui/PullQuote";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { AboutDict } from "@/i18n/types";
import { cn } from "@/lib/cn";

/**
 * Heading and narrative hold seven columns; the founder's line hangs in the
 * far right four and stays with the reader as the story scrolls past.
 */
export function Story({ t, index }: { t: AboutDict["story"]; index: number }) {
  return (
    <Section id="story" tone="paper">
      <Container>
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={t.header.eyebrow}
              title={t.header.title}
              lead={t.header.lead}
              index={index}
            />

            <div className="mt-10 flex flex-col gap-5">
              {t.paragraphs.map((paragraph, i) => (
                <Reveal key={paragraph.slice(0, 32)} delay={Math.min(i, 3) * 50}>
                  <p
                    className={cn(
                      "max-w-[66ch] leading-[1.75]",
                      i === 0
                        ? "text-[1.125rem] text-navy-900"
                        : "text-[1rem] text-slate-600",
                    )}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={80}>
              <PullQuote
                attribution={t.quoteAttribution}
                className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]"
              >
                {t.quote}
              </PullQuote>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
