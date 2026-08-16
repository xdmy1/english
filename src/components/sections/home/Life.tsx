import { OwlMark } from "@/components/site/Logo";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import type { HomeDict } from "@/i18n/types";

/**
 * The first item is given a navy plate spanning two columns and two rows, so
 * the section reads as a feature with satellites rather than a row of equal
 * boxes. The remaining items flow into whatever cells are left.
 */
export function HomeLife({ dict }: { dict: HomeDict["life"] }) {
  return (
    <Section tone="chalk">
      <Container>
        <SectionHeading
          index={6}
          eyebrow={dict.header.eyebrow}
          title={dict.header.title}
          lead={dict.header.lead}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((item, index) => {
            const feature = index === 0;

            if (feature) {
              return (
                <Reveal key={item.title} className="sm:col-span-2 lg:row-span-2">
                  <Card
                    tone="navy"
                    className="grain h-full justify-end overflow-hidden border-navy-800 bg-navy-900 p-7 sm:p-9"
                  >
                    <OwlMark
                      className="pointer-events-none absolute -right-8 -bottom-8 h-44 w-auto text-white/[0.05]"
                      eyeClassName="fill-white/[0.07]"
                    />
                    <span
                      aria-hidden="true"
                      className="relative block h-[3px] w-9 bg-red-500"
                    />
                    <h3 className="relative mt-6 text-2xl leading-snug font-semibold tracking-[-0.012em] text-white sm:text-[1.75rem]">
                      {item.title}
                    </h3>
                    <p className="relative mt-4 max-w-[44ch] text-[0.9375rem] leading-[1.72] text-navy-200">
                      {item.body}
                    </p>
                  </Card>
                </Reveal>
              );
            }

            return (
              <Reveal key={item.title} delay={Math.min(index, 3) * 60}>
                <Card className="h-full">
                  <h3 className="text-[1.1875rem] leading-snug font-semibold tracking-[-0.01em] text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.7] text-slate-600">
                    {item.body}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
