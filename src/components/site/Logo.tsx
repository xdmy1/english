import { cn } from "@/lib/cn";

/**
 * The owl mark, redrawn from the printed logo: navy head, two red eyes.
 * Kept as vector text + paths rather than an image so it stays crisp at any
 * size and inherits the surrounding colour on dark sections.
 */
export function OwlMark({
  className,
  eyeClassName,
}: {
  className?: string;
  eyeClassName?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 42"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-auto", className)}
    >
      {/* head + ear tufts */}
      <path
        d="M24 41C10.7 41 2.5 31.6 2.5 19.9c0-6.4 1.9-12 5.2-16.6a1 1 0 0 1 1.6-.06L15 10.2A21 21 0 0 1 24 8.2c3.3 0 6.4.7 9 2l5.7-6.96a1 1 0 0 1 1.6.06c3.3 4.6 5.2 10.2 5.2 16.6C45.5 31.6 37.3 41 24 41Z"
        fill="currentColor"
      />
      {/* eye discs */}
      <circle cx="16.4" cy="21.4" r="5.4" className={cn("fill-red-500", eyeClassName)} />
      <circle cx="31.6" cy="21.4" r="5.4" className={cn("fill-red-500", eyeClassName)} />
      {/* pupils */}
      <circle cx="16.4" cy="21.4" r="2.15" fill="currentColor" />
      <circle cx="31.6" cy="21.4" r="2.15" fill="currentColor" />
      {/* catchlights */}
      <circle cx="17.55" cy="20.15" r="0.75" fill="#fff" opacity="0.9" />
      <circle cx="32.75" cy="20.15" r="0.75" fill="#fff" opacity="0.9" />
      {/* beak */}
      <path
        d="M24 26.4c1.55 0 2.5.85 2.5 1.9 0 1.5-1.35 3.1-2.5 4-1.15-.9-2.5-2.5-2.5-4 0-1.05.95-1.9 2.5-1.9Z"
        className={cn("fill-red-500", eyeClassName)}
        opacity="0.85"
      />
    </svg>
  );
}

/** The two brand rules from the letterhead: navy over red. */
export function BrandRule({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("block", className)}>
      <span className="block h-[3px] w-full bg-navy-800" />
      <span className="mt-[2px] block h-[3px] w-full bg-red-500" />
    </span>
  );
}

export function Wordmark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-display text-[1.075rem] leading-[1.05] font-bold tracking-[-0.015em] sm:text-[1.15rem]",
          tone === "dark" ? "text-navy-800" : "text-white",
        )}
      >
        The Best Indeed
      </span>
      <span
        className={cn(
          "mt-[0.28em] text-[0.5rem] leading-none font-semibold tracking-[0.24em] uppercase sm:text-[0.5625rem]",
          tone === "dark" ? "text-red-500" : "text-red-300",
        )}
      >
        English Centre
      </span>
    </span>
  );
}

export function Logo({
  className,
  tone = "dark",
  markClassName,
}: {
  className?: string;
  tone?: "dark" | "light";
  markClassName?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <OwlMark
        className={cn(
          "h-9 w-auto shrink-0",
          tone === "dark" ? "text-navy-800" : "text-white",
          markClassName,
        )}
        eyeClassName={tone === "light" ? "fill-red-400" : undefined}
      />
      <Wordmark tone={tone} />
    </span>
  );
}
