import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPageLayout } from "@/components/sections/legal/LegalPageLayout";
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
    route: "terms",
    title: dict.legal.terms.seo.title,
    description: dict.legal.terms.seo.description,
  });
}

export default async function TermsPage(props: Props) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);

  return (
    <LegalPageLayout
      locale={typedLocale}
      page={dict.legal.terms}
      updatedLabel={dict.legal.updatedLabel}
      updatedDate={dict.legal.updatedDate}
      tocTitle={dict.legal.tocTitle}
      commonDict={dict.common}
    />
  );
}
