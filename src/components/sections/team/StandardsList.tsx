import { Reveal } from "@/components/ui/Reveal";
import type { Item } from "@/i18n/types";

/**
 * The appointment standards, set as a numbered hairline list rather than a
 * card grid — these are conditions in a document, not features on a shelf.
 * The <ol> carries the ordering for assistive technology, so the serif
 * numerals are decorative and hidden from it.
 */
export function StandardsList({ items }: { items: Item[] }) {
  return (
    <ol className="flex flex-col">
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item.title}
          delay={Math.min(index, 3) * 60}
          className="grid gap-x-6 gap-y-2 border-t border-line py-8 first:border-t-0 first:pt-0 sm:grid-cols-[3.25rem_1fr] sm:py-9"
        >
          <span
            aria-hidden="true"
            className="font-display text-[1.375rem] leading-none font-semibold text-navy-300 tabular-nums sm:pt-1"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div>
            <h3 className="text-[1.125rem] leading-snug font-semibold tracking-[-0.012em] text-navy-900 sm:text-[1.1875rem]">
              {item.title}
            </h3>
            <p className="mt-2.5 max-w-[64ch] text-[0.9375rem] leading-[1.7] text-slate-600">
              {item.body}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
