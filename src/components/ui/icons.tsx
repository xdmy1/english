import { cn } from "@/lib/cn";

/**
 * The site's line glyphs. Drawn on a 24px grid at a 1.6 stroke so they sit at
 * the same optical weight as Inter's semibold labels. All decorative — every
 * one is announced by the label next to it, so they are hidden from assistive
 * technology.
 */

type GlyphProps = { className?: string };

function Glyph({ className, children }: GlyphProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-[1.15rem] shrink-0", className)}
    >
      {children}
    </svg>
  );
}

export function PhoneGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path d="M8.4 3.5H5.7A2.2 2.2 0 0 0 3.5 5.9c.45 7.05 6.05 12.65 13.1 13.1a2.2 2.2 0 0 0 2.4-2.2v-2.7l-4.1-1.4-1.5 2a13.9 13.9 0 0 1-5.3-5.3l2-1.5L8.4 3.5Z" />
    </Glyph>
  );
}

export function MailGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <rect x="3.25" y="5.5" width="17.5" height="13" rx="2.2" />
      <path d="m4.4 7.4 6.4 4.6a2 2 0 0 0 2.4 0l6.4-4.6" />
    </Glyph>
  );
}

export function PinGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path d="M12 20.8c3.9-3.6 7-7.1 7-10.8a7 7 0 1 0-14 0c0 3.7 3.1 7.2 7 10.8Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Glyph>
  );
}

export function ClockGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.2V12l3.2 1.9" />
    </Glyph>
  );
}

/** A signed contract — the teaching staff are all on formal terms. */
export function ContractGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={cn("size-5", className)}>
      <path d="M13.5 3H7.5A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V7.5L13.5 3Z" />
      <path d="M13.5 3v3A1.5 1.5 0 0 0 15 7.5h3" />
      <path d="m9.25 14 1.75 1.75 3.75-3.75" />
    </Glyph>
  );
}

/** Marks a link that leaves the site. */
export function ExternalGlyph({ className }: GlyphProps) {
  return (
    <Glyph className={cn("size-3.5", className)}>
      <path d="M9 5h10v10" />
      <path d="M19 5 6 18" />
    </Glyph>
  );
}
