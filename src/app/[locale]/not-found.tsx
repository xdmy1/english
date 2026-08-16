import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href, primaryNav } from "@/i18n/routes";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { OwlMark } from "@/components/site/Logo";
import Link from "next/link";

/**
 * not-found.tsx cannot read route params, so this renders in the site's
 * primary language. The header and footer above and below it stay in whatever
 * locale the layout resolved.
 */
export default async function NotFound() {
  const dict = await getDictionary(defaultLocale);
  const locale = defaultLocale;

  return (
    <Container className="flex flex-col items-start py-24 sm:py-32">
      <OwlMark className="h-14 w-auto text-navy-200" eyeClassName="fill-red-200" />

      <p className="eyebrow mt-8 text-red-500">404</p>
      <h1 className="font-display mt-4 max-w-2xl text-4xl leading-[1.08] font-semibold tracking-[-0.02em] text-navy-900 sm:text-5xl">
        {dict.common.notFound.title}
      </h1>
      <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-slate-600">
        {dict.common.notFound.body}
      </p>

      <Button href={href(locale, "home")} size="lg" className="mt-8" trailing={<ArrowRight />}>
        {dict.common.notFound.cta}
      </Button>

      <nav aria-label={dict.common.footer.exploreTitle} className="mt-14 w-full border-t border-line pt-8">
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {primaryNav.map((key) => (
            <li key={key}>
              <Link
                href={href(locale, key)}
                className="link-underline text-[0.9375rem] font-medium text-navy-800"
              >
                {dict.common.nav[key]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
