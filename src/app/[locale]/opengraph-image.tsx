import { ImageResponse } from "next/og";

import { site } from "@/data/site";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const NAVY = "#0F1E52";
const NAVY_MID = "#152A6F";
const RED = "#C22E35";

/**
 * The social card. Kept to the brand marks and a Latin-script strapline: the
 * renderer's bundled font has no Cyrillic, so the Russian card shows the same
 * wordmark rather than a row of empty boxes.
 */
export default async function OpengraphImage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const dict = await getDictionary(isLocale(locale) ? locale : "en");

  // Satori requires an explicit display on any element with more than one
  // child, so anything that would otherwise be two text nodes is joined here.
  const place = `${site.address.city} · ${site.address.country}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(135deg, ${NAVY_MID} 0%, ${NAVY} 55%, #091335 100%)`,
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -80,
            bottom: -140,
            display: "flex",
            opacity: 0.07,
          }}
        >
          <svg width="620" height="543" viewBox="0 0 48 42">
            <path
              d="M24 41C10.7 41 2.5 31.6 2.5 19.9c0-6.4 1.9-12 5.2-16.6a1 1 0 0 1 1.6-.06L15 10.2A21 21 0 0 1 24 8.2c3.3 0 6.4.7 9 2l5.7-6.96a1 1 0 0 1 1.6.06c3.3 4.6 5.2 10.2 5.2 16.6C45.5 31.6 37.3 41 24 41Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="63" viewBox="0 0 48 42">
            <path
              d="M24 41C10.7 41 2.5 31.6 2.5 19.9c0-6.4 1.9-12 5.2-16.6a1 1 0 0 1 1.6-.06L15 10.2A21 21 0 0 1 24 8.2c3.3 0 6.4.7 9 2l5.7-6.96a1 1 0 0 1 1.6.06c3.3 4.6 5.2 10.2 5.2 16.6C45.5 31.6 37.3 41 24 41Z"
              fill="#ffffff"
            />
            <circle cx="16.4" cy="21.4" r="5.4" fill={RED} />
            <circle cx="31.6" cy="21.4" r="5.4" fill={RED} />
            <circle cx="16.4" cy="21.4" r="2.15" fill={NAVY_MID} />
            <circle cx="31.6" cy="21.4" r="2.15" fill={NAVY_MID} />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#ffffff", fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
              The Best Indeed
            </div>
            <div
              style={{
                color: "#EB989C",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 6,
                marginTop: 4,
              }}
            >
              ENGLISH CENTRE
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div style={{ display: "flex", marginBottom: 28 }}>
            <div style={{ width: 84, height: 5, background: "#ffffff" }} />
            <div style={{ width: 84, height: 5, background: RED, marginLeft: 4 }} />
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            {dict.common.brand.tagline}
          </div>
          <div style={{ color: "#9AAADF", fontSize: 26, marginTop: 24 }}>{place}</div>
        </div>
      </div>
    ),
    size,
  );
}
