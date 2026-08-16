import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { Container, Eyebrow } from "./Section";

/**
 * The masthead every inner page opens with. Using one component here is what
 * makes About, Programmes, Team, Timetable, Contact and Apply read as one
 * publication rather than six landing pages.
 *
 * Nothing in here is wrapped in `Reveal`. This is the first viewport and the
 * <h1> is the page's LCP element: revealing it would hold the largest paint
 * back until React has hydrated, to fade in something the visitor is already
 * looking at. Reveals start below the fold.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  aside,
  actions,
  tone = "chalk",
  className,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  /** Optional right-hand column: a stat, a badge, a small card. */
  aside?: ReactNode;
  actions?: ReactNode;
  tone?: "chalk" | "navy";
  className?: string;
}) {
  const dark = tone === "navy";

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b",
        dark ? "grain border-navy-800 bg-navy-900" : "border-line bg-chalk",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "ruled pointer-events-none absolute inset-0",
          dark && "opacity-[0.35] invert",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px",
          dark ? "bg-white/10" : "bg-white",
        )}
      />

      <Container className="relative pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div
          className={cn(
            "flex flex-col gap-10",
            aside && "lg:flex-row lg:items-end lg:justify-between lg:gap-16",
          )}
        >
          <div className="max-w-3xl">
            <Eyebrow tone={dark ? "light" : "dark"}>{eyebrow}</Eyebrow>

            <h1
              className={cn(
                "mt-5 text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.022em] text-balance sm:text-5xl lg:text-[3.5rem]",
                dark ? "text-white" : "text-navy-900",
              )}
            >
              {title}
            </h1>

            <p
              className={cn(
                "mt-6 max-w-2xl text-[1.0625rem] leading-[1.65] sm:text-lg",
                dark ? "text-navy-200" : "text-slate-600",
              )}
            >
              {lead}
            </p>

            {actions ? (
              <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
            ) : null}
          </div>

          {aside ? <div className="shrink-0">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
