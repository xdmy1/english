import { ConsentMap } from "@/components/site/ConsentMap";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { mapsLink, site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import type { ContactDict, HomeDict } from "@/i18n/types";

/**
 * Collapses site.openingHours into the fewest rows that still tell the truth:
 * consecutive days sharing the same hours are printed as one range.
 */
function openingRows(weekdays: string[], closedLabel: string) {
  const groups: { days: number[]; open: string | null; close: string | null }[] = [];

  for (const entry of site.openingHours) {
    const previous = groups[groups.length - 1];
    if (previous && previous.open === entry.open && previous.close === entry.close) {
      previous.days.push(entry.day);
    } else {
      groups.push({ days: [entry.day], open: entry.open, close: entry.close });
    }
  }

  return groups.map((group) => {
    const first = weekdays[group.days[0]] ?? "";
    const last = weekdays[group.days[group.days.length - 1]] ?? "";
    return {
      days: group.days.length > 1 ? `${first} – ${last}` : first,
      hours:
        group.open && group.close ? `${group.open} – ${group.close}` : closedLabel,
    };
  });
}

export function HomeVisit({
  locale,
  dict,
  contactDict,
  weekdays,
}: {
  locale: Locale;
  dict: HomeDict["visit"];
  contactDict: ContactDict;
  weekdays: string[];
}) {
  const rows = openingRows(weekdays, contactDict.closed);

  return (
    <Section id="visit" tone="paper">
      <Container>
        <SectionHeading
          index={9}
          eyebrow={dict.header.eyebrow}
          title={dict.header.title}
          lead={dict.header.lead}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <dl className="border-t border-line">
              <Reveal className="border-b border-line py-5">
                <dt className="text-2xs font-semibold tracking-[0.08em] text-slate-500 uppercase">
                  {contactDict.cards.phone.label}
                </dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${site.phone.e164}`}
                    className="link-underline text-[1.0625rem] font-medium text-navy-900"
                  >
                    {site.phone.display}
                  </a>
                </dd>
              </Reveal>

              <Reveal delay={60} className="border-b border-line py-5">
                <dt className="text-2xs font-semibold tracking-[0.08em] text-slate-500 uppercase">
                  {contactDict.cards.email.label}
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${site.email.general}`}
                    className="link-underline text-[1.0625rem] font-medium break-words text-navy-900"
                  >
                    {site.email.general}
                  </a>
                </dd>
              </Reveal>

              <Reveal delay={120} className="border-b border-line py-5">
                <dt className="text-2xs font-semibold tracking-[0.08em] text-slate-500 uppercase">
                  {contactDict.cards.address.label}
                </dt>
                <dd className="mt-2">
                  <address className="text-[1.0625rem] leading-[1.55] font-medium text-navy-900 not-italic">
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city},{" "}
                    {site.address.country}
                  </address>
                </dd>
              </Reveal>

              <Reveal delay={180} className="border-b border-line py-5">
                <dt className="text-2xs font-semibold tracking-[0.08em] text-slate-500 uppercase">
                  {contactDict.cards.hours.label}
                </dt>
                <dd className="mt-2">
                  <ul className="space-y-1.5">
                    {rows.map((row) => (
                      <li
                        key={row.days}
                        className="flex items-baseline justify-between gap-6 text-[0.9375rem]"
                      >
                        <span className="text-slate-600">{row.days}</span>
                        <span className="font-medium text-navy-900 tabular-nums">
                          {row.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </Reveal>
            </dl>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={mapsLink()} external trailing={<ArrowRight />}>
                  {dict.primary}
                </Button>
                <Button href={href(locale, "contact")} variant="outline">
                  {dict.secondary}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-7">
            {/* The child selector makes the consent panel fill the plate rather
                than sitting at its own minimum height inside a taller box. */}
            <ConsentMap
              dict={contactDict.map}
              className="h-full min-h-[26rem] [&>*]:h-full"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
