import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The one card surface used across the site. Hover lift is deliberately small
 * (1px and a border change, not a shadow bloom) — this is a school, not a
 * dashboard.
 */
export function Card({
  children,
  className,
  href,
  tone = "paper",
  interactive,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  tone?: "paper" | "chalk" | "navy" | "outline";
  interactive?: boolean;
}) {
  const tones = {
    paper: "border-line bg-white",
    chalk: "border-line bg-chalk",
    outline: "border-navy-200 bg-transparent",
    navy: "border-white/12 bg-navy-800/60 text-navy-100",
  } as const;

  const classes = cn(
    "relative flex flex-col rounded-2xl border p-6 sm:p-7",
    tones[tone],
    (href || interactive) &&
      "transition-[transform,border-color,box-shadow] duration-250 ease-out-quint can-hover:hover:-translate-y-px can-hover:hover:shadow-card " +
        (tone === "navy"
          ? "can-hover:hover:border-white/25"
          : "can-hover:hover:border-navy-300"),
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, "group/card")}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}

/** Small letterspaced chip: a level, a room, a status. */
export function Tag({
  children,
  tone = "navy",
  className,
}: {
  children: ReactNode;
  tone?: "navy" | "red" | "muted" | "light" | "brass";
  className?: string;
}) {
  const tones = {
    navy: "border-navy-200 bg-navy-50 text-navy-700",
    red: "border-red-200 bg-red-50 text-red-700",
    muted: "border-line bg-slate-100 text-slate-600",
    light: "border-white/20 bg-white/10 text-white",
    brass: "border-brass-400/40 bg-brass-100 text-brass-600",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-[0.2rem] text-2xs font-semibold tracking-[0.08em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Label / value row used inside programme and info cards. */
export function FactRow({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 border-t border-line py-2.5 first:border-t-0",
        className,
      )}
    >
      <dt className="text-2xs font-semibold tracking-[0.08em] text-slate-500 uppercase">
        {label}
      </dt>
      <dd className="text-right text-[0.875rem] font-medium text-navy-900 tabular-nums">
        {value}
      </dd>
    </div>
  );
}

/** Big serif numeral used to head a step in a numbered sequence. */
export function StepNumber({
  n,
  tone = "dark",
  className,
}: {
  n: number;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "font-display flex size-11 shrink-0 items-center justify-center rounded-full border text-[0.9375rem] font-semibold tabular-nums",
        tone === "dark"
          ? "border-navy-200 bg-white text-navy-800"
          : "border-white/25 bg-white/5 text-white",
        className,
      )}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}
