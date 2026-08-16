"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/cn";

export interface AccordionItem {
  q: string;
  a: string;
}

/**
 * FAQ list. The answers stay in the DOM at all times — search engines index
 * them and Ctrl+F still finds them — and open/close is a grid-row transition,
 * which is interruptible and never measures layout in JavaScript.
 */
export function Accordion({
  items,
  className,
  defaultOpen,
  tone = "dark",
}: {
  items: AccordionItem[];
  className?: string;
  /** Index to open on first render. Pass -1 for all closed. */
  defaultOpen?: number;
  tone?: "dark" | "light";
}) {
  const baseId = useId();
  const [open, setOpen] = useState<number>(defaultOpen ?? 0);

  return (
    /*
      Each item draws its own top rule. The wrapper used to add `divide-y` on
      top of that, which put two hairlines between every pair — 2px where the
      rest of the site rules at 1px.
    */
    <div className={className}>
      {items.map((item, index) => {
        const expanded = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={item.q}
            className={cn(
              "border-t first:border-t-0",
              tone === "dark" ? "border-line" : "border-white/12",
            )}
            data-open={expanded || undefined}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? -1 : index)}
                className={cn(
                  // A full-width row cannot take the 3% of `press` without
                  // looking rubbery, so it gets a 1% version of the same idea.
                  "group flex w-full items-start gap-5 py-5 text-left active:scale-[0.99] sm:py-6",
                  "transition-[color,transform] duration-200 ease-out-quint",
                  tone === "dark"
                    ? "can-hover:hover:text-navy-600"
                    : "can-hover:hover:text-white",
                )}
              >
                <span
                  className={cn(
                    "font-display flex-1 text-[1.0625rem] leading-snug font-medium sm:text-lg",
                    tone === "dark" ? "text-navy-900" : "text-white",
                  )}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    // Turning on the spot, in both directions: the in-out curve.
                    "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-200 ease-in-out-quint",
                    tone === "dark"
                      ? "border-navy-200 text-navy-700 group-data-[open]:border-navy-800 group-data-[open]:bg-navy-800 group-data-[open]:text-white"
                      : "border-white/25 text-white group-data-[open]:border-white group-data-[open]:bg-white group-data-[open]:text-navy-900",
                    expanded && "rotate-45",
                  )}
                >
                  <svg
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="size-3.5"
                  >
                    <path
                      d="M7 2v10M2 7h10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>

            {/*
              Collapsing with grid-rows and opacity leaves the answer in the
              accessibility tree, so every answer was read out however firmly
              the button said it was collapsed — and every panel stayed a
              landmark. aria-hidden makes the closed state real. The text is
              still in the DOM, and there is nothing focusable inside it, so
              Ctrl+F and crawlers are unaffected.
            */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!expanded}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out-quint",
                expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    "max-w-[62ch] pr-10 pb-6 text-[0.9375rem] leading-[1.7]",
                    tone === "dark" ? "text-slate-600" : "text-navy-200",
                  )}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
