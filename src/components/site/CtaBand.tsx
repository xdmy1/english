import { type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import type { CommonDict } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Section";
import { OwlMark } from "./Logo";

/**
 * The closing call to action. Every page ends with one, so the request form is
 * never more than a click away. Pages pass their own copy where the dictionary
 * has a page-specific `cta`; otherwise pass common.ctaBand.
 */
export function CtaBand({
  locale,
  eyebrow,
  title,
  body,
  primary,
  secondary,
  note,
  className,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  body: string;
  primary: string;
  secondary: string;
  note?: string;
  className?: string;
}) {
  return (
    <section className={cn("grain relative overflow-hidden bg-navy-900", className)}>
      <div
        aria-hidden="true"
        className="grid-paper pointer-events-none absolute inset-0 opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -bottom-24 hidden sm:block"
      >
        <OwlMark className="h-72 w-auto text-white/[0.045]" eyeClassName="fill-white/[0.07]" />
      </div>

      <Container className="relative py-16 sm:py-20">
        <SectionHeading
          tone="light"
          eyebrow={eyebrow}
          title={title}
          lead={body}
          actions={
            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-wrap gap-3">
                <Button
                  href={href(locale, "apply")}
                  variant="light"
                  size="lg"
                  trailing={<ArrowRight />}
                >
                  {primary}
                </Button>
                <Button href={href(locale, "contact")} variant="lightOutline" size="lg">
                  {secondary}
                </Button>
              </div>
              {note ? <p className="text-[0.8125rem] text-navy-300">{note}</p> : null}
            </div>
          }
        />
      </Container>
    </section>
  );
}

/** Convenience wrapper for pages that only have the shared CTA copy. */
export function DefaultCtaBand({
  locale,
  dict,
  className,
}: {
  locale: Locale;
  dict: CommonDict["ctaBand"];
  className?: string;
}) {
  return (
    <CtaBand
      locale={locale}
      eyebrow={dict.eyebrow}
      title={dict.title}
      body={dict.body}
      primary={dict.primary}
      secondary={dict.secondary}
      note={dict.note}
      className={className}
    />
  );
}
