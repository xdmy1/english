import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import type { HomeDict } from "@/i18n/types";
import { cn } from "@/lib/cn";

/**
 * Rule-separated rather than boxed: four arguments laid out like a printed
 * prospectus spread, numbered in the serif and divided by hairlines only.
 */
export function HomePillars({ dict }: { dict: HomeDict["pillars"] }) {
  return (
    <Section tone="paper">
      <Container>
        <SectionHeading
          index={2}
          eyebrow={dict.header.eyebrow}
          title={dict.header.title}
          lead={dict.header.lead}
        />

        <div className="mt-12 grid md:grid-cols-2">
          {dict.items.map((item, index) => {
            const rightColumn = index % 2 === 1;
            return (
              <Reveal
                key={item.title}
                delay={(index % 2) * 60}
                className={cn(
                  "border-t border-line",
                  rightColumn && "md:border-l md:border-line",
                )}
              >
                <article
                  className={cn(
                    "flex gap-5 py-9 sm:gap-7 md:py-12",
                    rightColumn ? "md:pl-10 lg:pl-14" : "md:pr-10 lg:pr-14",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="font-display pt-[0.3rem] text-[1.0625rem] leading-none font-semibold text-red-500 tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl leading-snug font-semibold tracking-[-0.01em] text-navy-900 sm:text-[1.375rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3.5 max-w-[48ch] text-[0.9375rem] leading-[1.72] text-slate-600">
                      {item.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
