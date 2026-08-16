import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PhoneGlyph } from "@/components/ui/icons";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Card, StepNumber } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { site } from "@/data/site";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { href } from "@/i18n/routes";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale,
    route: "apply",
    title: dict.apply.seo.title,
    description: dict.apply.seo.description,
  });
}

export default async function ApplyPage(props: Props) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const t = dict.apply;
  const privacyHref = href(typedLocale, "privacy");

  return (
    <>
      {/* The one dark masthead on the site: this page is the destination. */}
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        tone="navy"
      />

      <Section tone="paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
            {/* ── The request ─────────────────────────────────────────────── */}
            <div className="lg:col-span-7">
              <EnquiryForm
                locale={typedLocale}
                dict={t}
                programmes={dict.programmes}
                privacyLinkText={dict.common.nav.privacy}
              />
            </div>

            {/* ── What follows it ─────────────────────────────────────────── */}
            <aside
              aria-label={t.aside.title}
              className="self-start lg:col-span-4 lg:col-start-9 lg:sticky lg:top-[calc(var(--header-h)+3rem)]"
            >
              <div className="flex flex-col gap-5">
                <Reveal>
                  <Card tone="chalk">
                    <h2 className="font-display text-xl leading-snug font-semibold text-navy-900">
                      {t.aside.title}
                    </h2>

                    <ol className="mt-7 flex flex-col gap-6">
                      {t.aside.steps.map((step, index) => (
                        <li key={step.title} className="relative flex gap-4">
                          {index < t.aside.steps.length - 1 ? (
                            <span
                              aria-hidden="true"
                              className="absolute top-12 -bottom-5 left-[1.375rem] w-px bg-navy-200"
                            />
                          ) : null}

                          <StepNumber n={index + 1} />

                          <div className="min-w-0 flex-1 pt-2.5">
                            <h3 className="text-[0.9375rem] leading-snug font-semibold text-navy-900">
                              {step.title}
                            </h3>
                            <p className="mt-1.5 text-[0.875rem] leading-[1.6] text-slate-600">
                              {step.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </Card>
                </Reveal>

                <Reveal delay={60}>
                  <Card tone="chalk">
                    <h3 className="font-display text-lg leading-snug font-semibold text-navy-900">
                      {t.aside.privacyTitle}
                    </h3>
                    <p className="mt-3 text-[0.875rem] leading-[1.65] text-slate-600">
                      {t.aside.privacyBody}
                    </p>
                    <Link
                      href={privacyHref}
                      className="link-underline group/btn mt-5 inline-flex items-center gap-1.5 self-start text-[0.875rem] font-semibold text-navy-800"
                    >
                      {dict.common.nav.privacy}
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </Card>
                </Reveal>

                <Reveal delay={120}>
                  <Card tone="chalk">
                    <h3 className="font-display text-lg leading-snug font-semibold text-navy-900">
                      {t.aside.callTitle}
                    </h3>
                    <p className="mt-3 text-[0.875rem] leading-[1.65] text-slate-600">
                      {t.aside.callBody}
                    </p>
                    <Button
                      href={`tel:${site.phone.e164}`}
                      variant="outline"
                      className="mt-5 self-start"
                      leading={<PhoneGlyph className="size-4" />}
                    >
                      {site.phone.display}
                    </Button>
                  </Card>
                </Reveal>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/*
        No closing call to action here — the visitor is already on it. A slim
        reassurance strip closes the page instead.
      */}
      <Section tone="chalk" size="sm">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-5 rounded-2xl border border-line bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:px-8">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="brand-rule mt-0.5 h-9 w-[3px] shrink-0 rounded-full"
                />
                <p className="text-[0.9375rem] leading-[1.6] text-slate-600">
                  {t.aside.responseTime}
                </p>
              </div>

              <Link
                href={privacyHref}
                className="link-underline group/btn inline-flex shrink-0 items-center gap-1.5 self-start text-[0.875rem] font-semibold text-navy-800 sm:self-auto"
              >
                {dict.common.nav.privacy}
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
