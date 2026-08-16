"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { OwlMark } from "@/components/site/Logo";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { href, primaryNav } from "@/i18n/routes";
import { commonFor, localeFromPathname } from "./boundary-dictionary";

/**
 * The boundary for a notFound() thrown inside a matched locale route — the
 * invalid-locale guards in the layout and the pages. An address that matches no
 * route at all is answered by app/not-found.tsx instead, which has to render a
 * whole document of its own; see the note there.
 *
 * A boundary is rendered without route params, so the locale comes off the
 * pathname. The header and footer around this are already in that language, and
 * the links below have to lead back into it rather than silently moving the
 * visitor to English.
 */
export default function NotFound() {
  const locale = localeFromPathname(usePathname());
  const dict = commonFor(locale);

  return (
    <Container className="flex flex-col items-start py-24 sm:py-32">
      <OwlMark className="h-14 w-auto text-navy-200" eyeClassName="fill-red-200" />

      <p className="eyebrow mt-8 text-red-500">404</p>
      <h1 className="font-display mt-4 max-w-2xl text-4xl leading-[1.08] font-semibold tracking-[-0.02em] text-navy-900 sm:text-5xl">
        {dict.notFound.title}
      </h1>
      <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-slate-600">
        {dict.notFound.body}
      </p>

      <Button href={href(locale, "home")} size="lg" className="mt-8" trailing={<ArrowRight />}>
        {dict.notFound.cta}
      </Button>

      <nav aria-label={dict.footer.exploreTitle} className="mt-14 w-full border-t border-line pt-8">
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {primaryNav.map((key) => (
            <li key={key}>
              <Link
                href={href(locale, key)}
                className="link-underline text-[0.9375rem] font-medium text-navy-800"
              >
                {dict.nav[key]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
