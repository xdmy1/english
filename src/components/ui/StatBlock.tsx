import { site } from "@/data/site";
import { statIds, stats, type StatId } from "@/data/catalogue";
import { teachers } from "@/data/team";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

export type StatLabels = Record<StatId, { label: string; caption: string }>;

/**
 * Two of the four headline numbers are derived rather than typed, so they can
 * never contradict the rest of the site: years of activity comes from the
 * founding year, and the teacher count is the length of the team list itself.
 */
export function statValue(id: StatId, year: number): number {
  if (id === "years") return Math.max(1, year - site.foundedYear);
  if (id === "teachers") return teachers.length;
  return stats[id].value;
}

/**
 * The headline numbers. Rendered as a rule-separated row rather than four
 * boxes — closer to a printed prospectus than to a marketing site.
 */
export function StatBlock({
  locale,
  labels,
  year,
  tone = "dark",
  className,
}: {
  locale: Locale;
  labels: StatLabels;
  /** Passed from the page so server and client agree. */
  year: number;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4",
        className,
      )}
    >
      {statIds.map((id, index) => {
        const fact = stats[id];
        return (
          /*
            The term comes first in the markup and the figure is lifted above
            it with `order`. A <dd> before its <dt> is not a definition list —
            screen readers lose the pairing — and the caption is a second <dd>
            rather than a <p>, which a <dl> does not allow. The Reveal IS the
            grouping div, because <dl> permits one div around each pair, not two.
          */
          <Reveal
            key={id}
            delay={Math.min(index, 3) * 60}
            className={cn(
              "flex flex-col border-t pt-5",
              tone === "dark" ? "border-navy-800" : "border-white/25",
            )}
          >
            <dt
              className={cn(
                "order-2 mt-3 text-[0.9375rem] font-semibold",
                tone === "dark" ? "text-navy-900" : "text-white",
              )}
            >
              {labels[id].label}
            </dt>
            <dd
              className={cn(
                "font-display order-1 text-[2.5rem] leading-none font-semibold tracking-[-0.02em] sm:text-[3.25rem]",
                tone === "dark" ? "text-navy-900" : "text-white",
              )}
            >
              <CountUp
                locale={locale}
                value={statValue(id, year)}
                decimals={fact.decimals ?? 0}
                prefix={fact.prefix ?? ""}
                suffix={fact.suffix ?? ""}
              />
            </dd>
            <dd
              className={cn(
                "order-3 mt-1.5 text-[0.8125rem] leading-relaxed",
                tone === "dark" ? "text-slate-500" : "text-navy-300",
              )}
            >
              {labels[id].caption}
            </dd>
          </Reveal>
        );
      })}
    </dl>
  );
}
