import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ContactDetails } from "@/components/sections/contact/ContactDetails";
import { MailGlyph, PhoneGlyph } from "@/components/ui/icons";
import { ConsentMap } from "@/components/site/ConsentMap";
import { DefaultCtaBand } from "@/components/site/CtaBand";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Container, RuledDivider, Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/data/site";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale,
    route: "contact",
    title: dict.contact.seo.title,
    description: dict.contact.seo.description,
  });
}

export default async function ContactPage(props: Props) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const t = dict.contact;

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lead={t.hero.lead}
        tone="chalk"
        actions={
          <>
            <Button
              href={`tel:${site.phone.e164}`}
              size="lg"
              leading={<PhoneGlyph className="size-4" />}
            >
              {dict.common.actions.call}
            </Button>
            <Button
              href={`mailto:${site.email.general}`}
              variant="outline"
              size="lg"
              leading={<MailGlyph className="size-4" />}
            >
              {dict.common.actions.email}
            </Button>
          </>
        }
      />

      {/*
        Details and map. The section carries no visible heading — the four
        labelled blocks are the heading — so the numbered sequence below starts
        at 01 with the form. The sr-only h2 keeps the outline intact.
      */}
      <Section id="details" tone="paper">
        <Container>
          <h2 className="sr-only">{dict.common.footer.contactTitle}</h2>

          <Reveal>
            <RuledDivider className="mb-10 sm:mb-12" />
          </Reveal>

          <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
            <ContactDetails dict={t} common={dict.common} className="min-w-0 lg:col-span-5" />

            <Reveal delay={80} className="min-w-0 lg:col-span-7">
              {/* `flex` makes the inner panel (or the iframe) fill the column. */}
              <ConsentMap dict={t.map} className="flex h-full" />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── 01 · Enquiry form ────────────────────────────────────────────── */}
      <Section id="enquiry" tone="chalk">
        <Container>
          <SectionHeading
            index={1}
            eyebrow={t.form.header.eyebrow}
            title={t.form.header.title}
            lead={t.form.header.lead}
          />

          <div className="mt-10 max-w-3xl sm:mt-12">
            <EnquiryForm
              locale={typedLocale}
              dict={dict.apply}
              programmes={dict.programmes}
              privacyLinkText={dict.common.nav.privacy}
            />
          </div>
        </Container>
      </Section>

      {/* ── 02 · Questions ───────────────────────────────────────────────── */}
      <Section id="faq" tone="paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  index={2}
                  eyebrow={t.faq.header.eyebrow}
                  title={t.faq.header.title}
                  lead={t.faq.header.lead}
                />
              </div>
            </div>

            <div className="min-w-0 lg:col-span-6 lg:col-start-7">
              <Reveal>
                <Accordion items={t.faq.items} />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <DefaultCtaBand locale={typedLocale} dict={dict.common.ctaBand} />
    </>
  );
}
