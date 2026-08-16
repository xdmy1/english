import type { ElementType, ReactNode } from "react";

import { BrandRule } from "@/components/site/Logo";
import { cn } from "@/lib/cn";

/**
 * The white slip pinned to a coloured ground: one figure, stated once, with the
 * brand rule above it. Used for the masthead asides and the hero's floating
 * pass-rate card, so the same object never gets drawn twice.
 */
export function StatCard({
  eyebrow,
  value,
  label,
  size = "md",
  as: As = "div",
  className,
}: {
  eyebrow?: ReactNode;
  value: ReactNode;
  label?: ReactNode;
  size?: "sm" | "md" | "lg";
  as?: ElementType;
  className?: string;
}) {
  const sizes = {
    sm: "text-[1.375rem] leading-[1.25]",
    md: "text-[2.125rem] leading-none",
    lg: "text-[3.25rem] leading-[0.9] tracking-[-0.03em] sm:text-[3.75rem]",
  } as const;

  return (
    <As
      className={cn(
        "relative rounded-2xl border border-line bg-white p-6 shadow-card sm:p-7",
        className,
      )}
    >
      <BrandRule className="w-9" />

      {eyebrow ? <p className="eyebrow mt-5 text-navy-500">{eyebrow}</p> : null}

      <p
        className={cn(
          "font-display font-semibold tracking-[-0.02em] text-navy-900 tabular-nums",
          sizes[size],
          eyebrow ? "mt-3" : "mt-6",
        )}
      >
        {value}
      </p>

      {label ? (
        <p
          className={cn(
            "mt-4 border-t border-line pt-3.5 leading-snug font-semibold text-navy-900",
            size === "lg"
              ? "mt-5 pt-4 text-[0.9375rem]"
              : "text-[0.8125rem]",
          )}
        >
          {label}
        </p>
      ) : null}
    </As>
  );
}
