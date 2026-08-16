import { localeMeta, type Locale } from "./config";

/**
 * Replaces {token} placeholders in a dictionary string.
 * format("{count} of {total}", { count: 3, total: 9 }) -> "3 of 9"
 */
export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/**
 * Splits a template on a single {token} so a React node can be injected.
 * splitOn("I accept the {privacy}.", "privacy") -> ["I accept the ", "."]
 */
export function splitOn(template: string, token: string): [string, string] {
  const marker = `{${token}}`;
  const index = template.indexOf(marker);
  if (index === -1) return [template, ""];
  return [template.slice(0, index), template.slice(index + marker.length)];
}

export function formatNumber(
  locale: Locale,
  value: number,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(localeMeta[locale].intl, options).format(value);
}

export function formatDate(
  locale: Locale,
  iso: string,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" },
): string {
  return new Intl.DateTimeFormat(localeMeta[locale].intl, {
    ...options,
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
