import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The one pull quote on the site: a red hairline in the margin, the serif at a
 * size that stops the eye, and an optional attribution set as an eyebrow.
 */
export function PullQuote({
  children,
  attribution,
  className,
}: {
  children: ReactNode;
  attribution?: string;
  className?: string;
}) {
  return (
    <figure className={cn("border-l-2 border-red-500 pl-6", className)}>
      <blockquote className="font-display text-[1.3125rem] leading-[1.45] font-medium tracking-[-0.012em] text-pretty text-navy-900 sm:text-[1.5rem]">
        {children}
      </blockquote>
      {attribution ? (
        <figcaption className="eyebrow mt-6 text-navy-500">{attribution}</figcaption>
      ) : null}
    </figure>
  );
}
