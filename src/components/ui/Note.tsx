import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Small print: a disclaimer, a qualification, a footnote to a table. One
 * treatment everywhere — a hairline in the margin and text a size down — so
 * the reader learns to recognise a caveat at a glance.
 */
export function Note({
  children,
  tone = "dark",
  className,
  id,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  /** Set when something else points at the note with aria-describedby. */
  id?: string;
}) {
  return (
    <p
      id={id}
      className={cn(
        "max-w-[68ch] border-l-2 pl-5 text-[0.8125rem] leading-[1.7]",
        tone === "dark"
          ? "border-navy-200 text-slate-500"
          : "border-white/25 text-navy-300",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * A statement that needs its own ground rather than the margin: the sample
 * timetable warning, the employment note, the empty filter state. Navy-50 with
 * the brand's red rule at the leading edge.
 */
export function NotePanel({
  title,
  titleId,
  children,
  icon,
  actions,
  align = "left",
  as: As = "div",
  className,
}: {
  title?: ReactNode;
  /**
   * Gives the title an id. When the panel is rendered as a landmark (an
   * `aside`, say) it also becomes that landmark's accessible name.
   */
  titleId?: string;
  children: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  align?: "left" | "center";
  as?: ElementType;
  className?: string;
}) {
  const centered = align === "center";

  return (
    <As
      aria-labelledby={As !== "div" && titleId ? titleId : undefined}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-navy-200 bg-navy-50 p-6 sm:p-7",
        centered ? "text-center" : "pl-7 sm:pl-8",
        className,
      )}
    >
      {centered ? (
        <span aria-hidden="true" className="brand-rule mx-auto mb-5 block h-[6px] w-10" />
      ) : (
        // The same leading-edge marker as the apply page and the legal pages:
        // the brand's navy-over-red rule, not red on its own.
        <span aria-hidden="true" className="brand-rule absolute inset-y-0 left-0 w-[3px]" />
      )}

      <div className={cn("flex gap-4", centered && "flex-col items-center")}>
        {icon ? (
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-navy-200 bg-white text-navy-700"
          >
            {icon}
          </span>
        ) : null}

        <div className={cn("min-w-0 flex-1", centered && "w-full")}>
          {title ? (
            <p
              id={titleId}
              className="font-display text-[1.0625rem] leading-snug font-semibold text-navy-900"
            >
              {title}
            </p>
          ) : null}

          <div
            className={cn(
              "text-[0.9375rem] leading-[1.7] text-slate-600",
              title && "mt-2",
              centered && "mx-auto max-w-md",
            )}
          >
            {children}
          </div>

          {actions ? <div className="mt-5">{actions}</div> : null}
        </div>
      </div>
    </As>
  );
}
