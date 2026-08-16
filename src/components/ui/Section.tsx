import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function Container({
  className,
  children,
  as: As = "div",
  width = "default",
}: {
  className?: string;
  children: ReactNode;
  as?: ElementType;
  width?: "default" | "wide" | "narrow" | "prose";
}) {
  const widths = {
    narrow: "max-w-4xl",
    prose: "max-w-[68ch]",
    default: "max-w-[76rem]",
    wide: "max-w-[88rem]",
  } as const;

  return (
    <As className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", widths[width], className)}>
      {children}
    </As>
  );
}

export function Section({
  id,
  className,
  children,
  tone = "paper",
  size = "md",
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: "paper" | "chalk" | "navy" | "none";
  size?: "sm" | "md" | "lg";
}) {
  const tones = {
    paper: "bg-white text-ink",
    chalk: "bg-chalk text-ink",
    navy: "grain bg-navy-900 text-navy-100",
    none: "",
  } as const;

  const sizes = {
    sm: "py-14 sm:py-16",
    md: "py-18 sm:py-24",
    lg: "py-22 sm:py-32",
  } as const;

  return (
    <section id={id} className={cn("relative", tones[tone], sizes[size], className)}>
      {children}
    </section>
  );
}

/**
 * The one eyebrow treatment on the site: small caps, an optional red numeral,
 * and a hairline. Mastheads, section headings and standalone labels all use
 * this, so a reader recognises "you are at the top of something" instantly.
 */
export function Eyebrow({
  children,
  index,
  tone = "dark",
  align = "left",
  className,
}: {
  /** Omit to render the numeral and the rule on their own. */
  children?: ReactNode;
  /** Two-digit section number, e.g. 3 renders "03". */
  index?: number;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        align === "center" && "justify-center",
        tone === "dark" ? "text-navy-500" : "text-navy-300",
        className,
      )}
    >
      {index !== undefined ? (
        <span className={tone === "dark" ? "text-red-500" : "text-red-300"}>
          {String(index).padStart(2, "0")}
        </span>
      ) : null}
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-6 shrink-0",
          tone === "dark" ? "bg-navy-300" : "bg-navy-100/40",
        )}
      />
      {children}
    </p>
  );
}

/**
 * The editorial section header used across the whole site: a numbered eyebrow
 * sitting on a hairline, a serif heading, and an optional lead paragraph.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  index,
  align = "left",
  tone = "dark",
  className,
  as: As = "h2",
  actions,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Two-digit section number, e.g. 3 renders "03". */
  index?: number;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2" | "h3";
  actions?: ReactNode;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered && "items-center text-center",
        actions && "lg:flex-row lg:items-end lg:justify-between lg:gap-12",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {eyebrow ? (
          <Reveal>
            <Eyebrow
              index={index}
              tone={tone}
              align={centered ? "center" : "left"}
            >
              {eyebrow}
            </Eyebrow>
          </Reveal>
        ) : null}

        <Reveal delay={60}>
          <As
            className={cn(
              "mt-4 text-balance",
              As === "h1"
                ? "text-4xl leading-[1.06] font-semibold tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]"
                : "text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.018em] sm:text-4xl lg:text-[2.6rem]",
              tone === "dark" ? "text-navy-900" : "text-white",
            )}
          >
            {title}
          </As>
        </Reveal>

        {lead ? (
          <Reveal delay={110}>
            <div
              className={cn(
                "mt-5 text-[1.0625rem] leading-[1.65]",
                tone === "dark" ? "text-slate-600" : "text-navy-200",
              )}
            >
              {lead}
            </div>
          </Reveal>
        ) : null}
      </div>

      {actions ? (
        <Reveal delay={160} className={cn(centered && "mx-auto")}>
          <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>
        </Reveal>
      ) : null}
    </div>
  );
}

/** A hairline that carries the brand's navy-over-red rule at its left edge. */
export function RuledDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)} aria-hidden="true">
      <span className="h-[3px] w-10 bg-navy-800" />
      <span className="h-[3px] w-10 bg-red-500" />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
