import { cn } from "@/lib/cn";

/**
 * The small hand-checked tick used wherever the site lists what is included.
 * Drawn rather than imported so it inherits currentColor and stays crisp at
 * 14px. One tick, one colour rule: red on light grounds, red-300 on navy.
 */
export function Tick({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={cn("size-3.5 shrink-0", className)}
    >
      <path
        d="M2.4 7.5 5.5 10.6 11.6 3.7"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The one checked list on the site. `md` is the section-level list; `sm` is the
 * tighter one used inside cards.
 */
export function CheckList({
  items,
  tone = "dark",
  size = "md",
  className,
}: {
  items: readonly string[];
  tone?: "dark" | "light";
  size?: "sm" | "md";
  className?: string;
}) {
  const compact = size === "sm";

  return (
    <ul className={cn("flex flex-col", compact ? "gap-2.5" : "gap-4", className)}>
      {items.map((item) => (
        <li key={item} className={cn("flex", compact ? "gap-2.5" : "gap-3.5")}>
          <Tick
            className={cn(
              "mt-[0.3rem]",
              tone === "dark" ? "text-red-500" : "text-red-300",
            )}
          />
          <span
            className={cn(
              compact
                ? "text-[0.875rem] leading-[1.55]"
                : "max-w-[52ch] text-[0.9375rem] leading-[1.7]",
              tone === "dark" ? "text-slate-700" : "text-navy-100",
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
