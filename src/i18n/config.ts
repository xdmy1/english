export const locales = ["en", "ro", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "tbi_locale";

type LocaleMeta = {
  /** Shown in the language switcher, in the language itself. */
  label: string;
  /** Two/three letter chip shown on narrow screens. */
  short: string;
  /** Value for <html lang>. */
  htmlLang: string;
  /** Value for og:locale. */
  ogLocale: string;
  /** Intl locale used for number and date formatting. */
  intl: string;
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: {
    label: "English",
    short: "EN",
    htmlLang: "en",
    ogLocale: "en_GB",
    intl: "en-GB",
  },
  ro: {
    label: "Română",
    short: "RO",
    htmlLang: "ro",
    ogLocale: "ro_MD",
    intl: "ro-MD",
  },
  ru: {
    label: "Русский",
    short: "RU",
    htmlLang: "ru",
    ogLocale: "ru_MD",
    intl: "ru-RU",
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
