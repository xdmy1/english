"use client";

import { site, mapsLink, mapEmbedSrc } from "@/data/site";
import type { ContactDict } from "@/i18n/types";
import { cn } from "@/lib/cn";
import { useConsentFor } from "@/lib/consent";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";

/**
 * The map is a third-party embed, so the iframe is never mounted until the
 * visitor asks for it. Until then they get the address, a static brand panel
 * and a plain link that opens Maps in their own tab.
 */
export function ConsentMap({
  dict,
  className,
}: {
  dict: ContactDict["map"];
  className?: string;
}) {
  const { allowed, ready, allow } = useConsentFor("maps");

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-navy-900",
        className,
      )}
    >
      {ready && allowed ? (
        <iframe
          title={dict.title}
          src={mapEmbedSrc()}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-full min-h-[22rem] w-full border-0"
        />
      ) : (
        <div className="grain grid-paper relative flex min-h-[22rem] flex-col justify-end bg-navy-900 p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_0%,rgb(40_65_149/0.55),transparent_70%)]"
          />
          <div className="relative max-w-md">
            <Eyebrow tone="light">{dict.provider}</Eyebrow>
            <h3 className="font-display mt-3 text-2xl font-semibold text-white">
              {dict.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-200">{dict.body}</p>
            <address className="mt-4 text-sm not-italic text-navy-100">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}, {site.address.country}
            </address>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button size="sm" variant="light" onClick={allow} disabled={!ready}>
                {dict.accept}
              </Button>
              <Button size="sm" variant="lightOutline" href={mapsLink()} external>
                {dict.open}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
