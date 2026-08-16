import Link from "next/link";

import { programmesByGroup } from "@/data/catalogue";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { href, legalNav, primaryNav } from "@/i18n/routes";
import type { CommonDict, ProgrammesDict } from "@/i18n/types";
import { CookieSettingsButton } from "./CookieConsent";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { OwlMark, Wordmark } from "./Logo";
import { Container } from "@/components/ui/Section";

export function Footer({
  locale,
  dict,
  programmes,
  year,
}: {
  locale: Locale;
  dict: CommonDict;
  programmes: ProgrammesDict;
  /** Passed in so the server and client agree on the copyright year. */
  year: number;
}) {
  const openDays = site.openingHours.filter((entry) => entry.open !== null);
  const socials = Object.entries(site.social).filter(([, url]) => url.length > 0) as [
    keyof typeof site.social,
    string,
  ][];

  return (
    <footer className="grain relative overflow-hidden bg-navy-950 text-navy-200">
      <span aria-hidden="true" className="brand-rule absolute inset-x-0 top-0 block h-1.5" />

      <Container className="pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href={href(locale, "home")}
              className="inline-flex items-center gap-2.5"
              aria-label={dict.brand.name}
            >
              <OwlMark className="h-10 w-auto text-white" eyeClassName="fill-red-400" />
              <Wordmark tone="light" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-navy-300">
              {dict.footer.tagline}
            </p>

            {socials.length > 0 ? (
              <ul className="mt-6 flex items-center gap-2">
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="press flex size-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-200 ease-out-quint can-hover:hover:border-white/40 can-hover:hover:bg-white/10"
                    >
                      <SocialGlyph name={key} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Explore */}
          <nav aria-label={dict.navLabel.footer}>
            <h2 className="eyebrow text-white">{dict.footer.exploreTitle}</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {primaryNav.map((key) => (
                <li key={key}>
                  <Link href={href(locale, key)} className="link-underline text-navy-200">
                    {dict.nav[key]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={href(locale, "apply")} className="link-underline text-white">
                  {dict.nav.apply}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Programmes */}
          <nav aria-label={dict.footer.programmesTitle}>
            <h2 className="eyebrow text-white">{dict.footer.programmesTitle}</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {[...programmesByGroup.curricula, ...programmesByGroup.exams].map((id) => (
                <li key={id}>
                  <Link
                    href={href(locale, "programmes", id)}
                    className="link-underline text-navy-200"
                  >
                    {programmes.items[id].name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="eyebrow text-white">{dict.footer.contactTitle}</h2>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li>
                <p className="text-2xs font-semibold tracking-[0.1em] text-navy-400 uppercase">
                  {dict.footer.addressLabel}
                </p>
                <address className="mt-1 not-italic text-navy-200">
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                  <br />
                  {site.address.country}
                </address>
              </li>
              <li className="flex flex-col gap-1">
                <a href={`tel:${site.phone.e164}`} className="link-underline text-white">
                  {site.phone.display}
                </a>
                <a href={`mailto:${site.email.general}`} className="link-underline text-navy-200">
                  {site.email.general}
                </a>
              </li>
              <li>
                <p className="text-2xs font-semibold tracking-[0.1em] text-navy-400 uppercase">
                  {dict.footer.hoursLabel}
                </p>
                <ul className="mt-1 flex flex-col gap-0.5 text-navy-200">
                  {openDays.map((entry) => (
                    <li key={entry.day} className="flex justify-between gap-4 tabular-nums">
                      <span>{dict.weekdays[entry.day]}</span>
                      <span>
                        {entry.open}–{entry.close}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-7 text-[0.8125rem] text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>{format(dict.footer.rights, { year, name: dict.brand.name })}</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalNav.map((key) => (
              <Link key={key} href={href(locale, key)} className="link-underline">
                {dict.nav[key]}
              </Link>
            ))}
            <CookieSettingsButton label={dict.cookieBanner.settingsLabel} />
            {/* Opens upward: the footer clips its overflow. */}
            <LanguageSwitcher
              locale={locale}
              labels={dict.language}
              tone="light"
              placement="top"
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}

function SocialGlyph({ name }: { name: keyof typeof site.social }) {
  const paths: Record<keyof typeof site.social, string> = {
    facebook:
      "M9.5 15V8.6h2.1l.32-2.44H9.5V4.6c0-.7.2-1.18 1.2-1.18h1.3V1.24A17 17 0 0 0 10.13 1C8.28 1 7 2.13 7 4.2v1.96H4.9V8.6H7V15h2.5Z",
    instagram:
      "M8 2.4c1.82 0 2.04.01 2.76.04.67.03 1.03.14 1.27.23.32.13.55.28.79.52.24.24.39.47.52.79.09.24.2.6.23 1.27.03.72.04.94.04 2.75s-.01 2.03-.04 2.75c-.03.67-.14 1.03-.23 1.27-.13.32-.28.55-.52.79-.24.24-.47.39-.79.52-.24.09-.6.2-1.27.23-.72.03-.94.04-2.76.04s-2.04-.01-2.76-.04c-.67-.03-1.03-.14-1.27-.23a2.13 2.13 0 0 1-.79-.52 2.13 2.13 0 0 1-.52-.79c-.09-.24-.2-.6-.23-1.27C2.41 10.03 2.4 9.81 2.4 8s.01-2.03.04-2.75c.03-.67.14-1.03.23-1.27.13-.32.28-.55.52-.79.24-.24.47-.39.79-.52.24-.09.6-.2 1.27-.23C5.96 2.41 6.18 2.4 8 2.4Zm0 3.47a2.13 2.13 0 1 0 0 4.26 2.13 2.13 0 0 0 0-4.26Zm3.4-.62a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0Z",
    tiktok:
      "M11.1 1.6h-2v8.5a1.7 1.7 0 1 1-1.7-1.7c.18 0 .35.03.5.08V6.4a3.7 3.7 0 1 0 3.2 3.66V5.5c.63.44 1.4.7 2.2.72V4.2a2.6 2.6 0 0 1-2.2-2.6Z",
    youtube:
      "M14.4 5.2a1.7 1.7 0 0 0-1.2-1.2C12.1 3.7 8 3.7 8 3.7s-4.1 0-5.2.3A1.7 1.7 0 0 0 1.6 5.2C1.3 6.3 1.3 8 1.3 8s0 1.7.3 2.8c.16.6.63 1.05 1.2 1.2 1.1.3 5.2.3 5.2.3s4.1 0 5.2-.3a1.7 1.7 0 0 0 1.2-1.2c.3-1.1.3-2.8.3-2.8s0-1.7-.3-2.8ZM6.7 10.1V5.9L10.2 8l-3.5 2.1Z",
  };

  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4">
      <path d={paths[name]} />
    </svg>
  );
}
