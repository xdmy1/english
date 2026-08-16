import Image from "next/image";
import type { CSSProperties } from "react";

import { BrandRule } from "@/components/site/Logo";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Tick } from "@/components/ui/CheckList";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { StatCard } from "@/components/ui/StatCard";
import { statValue } from "@/components/ui/StatBlock";
import { stats } from "@/data/catalogue";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import type { HomeDict } from "@/i18n/types";

/**
 * A drawn underline rather than text-decoration: two passes of an off-level
 * stroke, so the accent reads as something ruled by hand under the important
 * half of the sentence. Painted as a background on an inline box with
 * box-decoration-break: clone, so it hugs each line of the phrase exactly
 * rather than running on to the end of the column when the headline wraps.
 */
const accentUnderline: CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='11' viewBox='0 0 240 11' preserveAspectRatio='none'%3E%3Cpath d='M3 7.1C48 3.3 100 1.7 150 2.3c24 .3 48 1.2 87 3.6' fill='none' stroke='%23c22e35' stroke-width='2.9' stroke-linecap='round'/%3E%3Cpath d='M22 10c46-2.4 96-3.2 138-2.6' fill='none' stroke='%23c22e35' stroke-width='1.7' stroke-linecap='round' opacity='.42'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 0.2em",
  backgroundPosition: "0 100%",
};

export function HomeHero({
  locale,
  dict,
  passRateLabel,
  year,
}: {
  locale: Locale;
  dict: HomeDict["hero"];
  /** Label for the floating stat card — comes from home.stats.labels. */
  passRateLabel: string;
  year: number;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div
        aria-hidden="true"
        className="ruled pointer-events-none absolute inset-0 opacity-70"
      />

      <Container className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ── Left: the argument ─────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white py-1.5 pr-4 pl-3 text-[0.8125rem] font-medium text-navy-700">
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-red-500"
                />
                {dict.badge}
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mt-7 text-[2.375rem] leading-[1.06] font-semibold tracking-[-0.022em] text-navy-900 sm:text-[3rem] lg:text-[3.375rem]">
                <span className="block text-balance">{dict.title}</span>
                <span className="mt-1.5 block text-balance">
                  <span className="box-decoration-clone pb-[0.16em]" style={accentUnderline}>
                    {dict.titleAccent}
                  </span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.68] text-slate-600">
                {dict.lead}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button
                  href={href(locale, "apply")}
                  size="lg"
                  trailing={<ArrowRight />}
                >
                  {dict.primary}
                </Button>
                <Button href={href(locale, "programmes")} size="lg" variant="outline">
                  {dict.secondary}
                </Button>
              </div>
              <p className="mt-4 max-w-md text-[0.8125rem] leading-relaxed text-slate-500">
                {dict.note}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <ul className="mt-9 flex flex-col divide-y divide-line border-y border-line sm:flex-row sm:divide-x sm:divide-y-0">
                {dict.marks.map((mark) => (
                  <li
                    key={mark}
                    className="flex items-start gap-2.5 py-3.5 sm:flex-1 sm:px-4 sm:py-4 sm:first:pl-0 sm:last:pr-0"
                  >
                    <Tick className="mt-[0.2rem] text-red-500" />
                    <span className="text-[0.8125rem] leading-snug font-medium text-navy-800">
                      {mark}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ── Right: the portrait plate ──────────────────────────────── */}
          <Reveal delay={120} y={16} className="lg:col-span-5">
            <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
              <BrandRule className="mb-3.5" />
              <div className="relative overflow-hidden rounded-2xl border border-line bg-navy-900 shadow-card">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/hero.svg"
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 30rem, (min-width: 640px) 28rem, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <StatCard
                as="figcaption"
                size="md"
                className="absolute -bottom-4 left-3 w-[12.75rem] p-5 shadow-lift sm:-bottom-6 sm:-left-6 sm:w-[13.5rem] sm:p-5"
                value={
                  <CountUp
                    locale={locale}
                    value={statValue("passRate", year)}
                    decimals={stats.passRate.decimals ?? 0}
                    prefix={stats.passRate.prefix ?? ""}
                    suffix={stats.passRate.suffix ?? ""}
                  />
                }
                label={passRateLabel}
              />
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
