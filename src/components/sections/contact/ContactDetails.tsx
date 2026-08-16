import type { ReactNode } from "react";

import { mapsLink, site } from "@/data/site";
import type { CommonDict, ContactDict } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { ClockGlyph, ExternalGlyph, MailGlyph, PhoneGlyph, PinGlyph } from "@/components/ui/icons";

/**
 * Telephone, email, address and opening hours, in that order — the order a
 * visitor actually needs them. Every value comes from src/data/site.ts, so the
 * page, the footer and the structured data can never drift apart.
 */
export function ContactDetails({
  dict,
  common,
  className,
}: {
  dict: ContactDict;
  common: CommonDict;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <DetailBlock
        icon={<PhoneGlyph />}
        label={dict.cards.phone.label}
        note={dict.cards.phone.note}
      >
        <a
          href={`tel:${site.phone.e164}`}
          className="link-underline font-display text-xl leading-tight font-semibold text-navy-900"
        >
          {site.phone.display}
        </a>
      </DetailBlock>

      <DetailBlock
        icon={<MailGlyph />}
        label={dict.cards.email.label}
        note={dict.cards.email.note}
        delay={60}
      >
        <a
          href={`mailto:${site.email.general}`}
          className="link-underline font-display text-lg leading-tight font-semibold break-words text-navy-900"
        >
          {site.email.general}
        </a>
      </DetailBlock>

      <DetailBlock
        icon={<PinGlyph />}
        label={dict.cards.address.label}
        note={dict.cards.address.note}
        delay={120}
      >
        <address className="text-[0.9375rem] leading-[1.6] font-medium text-navy-900 not-italic">
          {site.address.street}
          <br />
          {site.address.postalCode} {site.address.city}
          <br />
          {site.address.country}
        </address>
        <a
          href={mapsLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-navy-800"
        >
          {common.actions.directions}
          <ExternalGlyph />
        </a>
      </DetailBlock>

      <DetailBlock
        icon={<ClockGlyph />}
        label={dict.cards.hours.label}
        note={dict.cards.hours.note}
        delay={180}
      >
        <dl className="flex flex-col">
          {site.openingHours.map((entry) => {
            const closed = entry.open === null;
            return (
              <div
                key={entry.day}
                className="flex items-baseline justify-between gap-4 border-t border-line py-1.5 first:border-t-0 first:pt-0"
              >
                <dt className="text-[0.875rem] text-slate-600">
                  {common.weekdays[entry.day]}
                </dt>
                <dd
                  className={cn(
                    "text-[0.875rem] font-medium tabular-nums",
                    closed ? "text-slate-500" : "text-navy-900",
                  )}
                >
                  {closed ? dict.closed : `${entry.open}–${entry.close}`}
                </dd>
              </div>
            );
          })}
        </dl>
      </DetailBlock>
    </div>
  );
}

function DetailBlock({
  icon,
  label,
  note,
  children,
  delay = 0,
}: {
  icon: ReactNode;
  label: string;
  note: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <Card tone="chalk" className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border border-navy-200 bg-white text-navy-800"
          >
            {icon}
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="eyebrow text-navy-500">{label}</h3>
            <div className="mt-2.5">{children}</div>
            <p className="mt-3 text-[0.875rem] leading-[1.6] text-slate-600">{note}</p>
          </div>
        </div>
      </Card>
    </Reveal>
  );
}
