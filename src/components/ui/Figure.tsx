import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The one image plate on the site: a rounded navy frame, the picture cropped to
 * fill it, and an optional caption under a hairline. The navy ground means a
 * slow-loading or transparent asset still reads as a deliberate plate rather
 * than a hole in the page.
 */
export function Figure({
  src,
  alt,
  caption,
  sizes,
  priority,
  rule,
  aspectClassName = "aspect-[3/2]",
  imageClassName,
  className,
}: {
  src: string;
  /** Empty string only when the picture repeats what the copy already says. */
  alt: string;
  caption?: ReactNode;
  sizes?: string;
  priority?: boolean;
  /** Draws the brand's red rule across the top edge. */
  rule?: boolean;
  aspectClassName?: string;
  imageClassName?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900 shadow-card",
        className,
      )}
    >
      {rule ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-10 block h-[3px] bg-red-500"
        />
      ) : null}

      <div className={cn("relative", aspectClassName)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
        />
      </div>

      {caption ? (
        <figcaption className="flex items-start gap-3 border-t border-white/12 px-5 py-4 text-[0.8125rem] leading-[1.6] text-navy-200 sm:px-6">
          <span
            aria-hidden="true"
            className="mt-[0.45rem] block h-[3px] w-7 shrink-0 bg-red-500"
          />
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
