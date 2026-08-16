/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH for every hard fact about the centre.
 *  Everything marked PLACEHOLDER must be replaced before the site goes live.
 *  Run `npm run check:content` to list what is still unresolved.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const PLACEHOLDER = "PLACEHOLDER" as const;

export const site = {
  name: "The Best Indeed English Centre",
  shortName: "The Best Indeed",
  /** Used in <title> suffixes and structured data. */
  legalName: `${PLACEHOLDER} SRL`,

  /** Canonical production origin, no trailing slash. */
  url: "https://www.thebestindeed.md",

  /** Year the centre opened. PLACEHOLDER — confirm with the founder. */
  foundedYear: 2014,

  /** The date the Cambridge exam-simulation centre opens. */
  simulationCentreOpens: "2026-12-01",

  phone: {
    display: `+373 ${PLACEHOLDER}`,
    /** Digits only, E.164, for tel: links. */
    e164: "+37300000000",
  },

  whatsapp: {
    /** Digits only, no plus. Leave empty to hide the WhatsApp link. */
    number: "",
  },

  email: {
    /** Public inbox shown on the contact page. */
    general: `office@${PLACEHOLDER}.md`,
    /** Where enrolment requests are delivered (the founder's inbox). */
    admissions: `office@${PLACEHOLDER}.md`,
    /** Data-protection contact required by the privacy notice. */
    privacy: `office@${PLACEHOLDER}.md`,
  },

  address: {
    street: `${PLACEHOLDER} street, nr. ${PLACEHOLDER}`,
    city: "Chișinău",
    postalCode: "MD-2000",
    country: "Republic of Moldova",
    countryCode: "MD",
  },

  /**
   * Google Maps embed. The iframe is only ever mounted after the visitor
   * accepts the map cookie — see components/site/ConsentMap.tsx.
   */
  map: {
    /** Search query used for the "open in Maps" link. */
    query: "The Best Indeed English Centre Chișinău",
    /** Approximate centre of Chișinău until the exact address is confirmed. */
    lat: 47.0245,
    lng: 28.8322,
    zoom: 15,
  },

  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: "",
  },

  /** 0 = Sunday … 6 = Saturday. `null` = closed. */
  openingHours: [
    { day: 1, open: "09:00", close: "20:00" },
    { day: 2, open: "09:00", close: "20:00" },
    { day: 3, open: "09:00", close: "20:00" },
    { day: 4, open: "09:00", close: "20:00" },
    { day: 5, open: "09:00", close: "20:00" },
    { day: 6, open: "09:00", close: "15:00" },
    { day: 0, open: null, close: null },
  ],
} as const;

export function mapsLink(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.map.query)}`;
}

export function mapEmbedSrc(): string {
  const { lat, lng, zoom } = site.map;
  const bbox = 0.012;
  return (
    "https://www.openstreetmap.org/export/embed.html" +
    `?bbox=${lng - bbox}%2C${lat - bbox / 2}%2C${lng + bbox}%2C${lat + bbox / 2}` +
    `&layer=mapnik&marker=${lat}%2C${lng}#map=${zoom}/${lat}/${lng}`
  );
}
