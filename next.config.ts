import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Pin the workspace root. Without this, Turbopack walks up looking for a
   * lockfile and can settle on one outside the repository, then warn that it
   * is ignoring ours.
   */
  turbopack: { root: import.meta.dirname },

  /* Nothing gained by announcing the framework and its version. */
  poweredByHeader: false,

  images: {
    /**
     * The photo placeholders in /public are SVGs we author ourselves. Next
     * refuses to serve SVG through the image optimiser unless this is set.
     * The sandbox CSP below covers the optimised URL; the /public file is
     * reachable at its own URL too, which is what the SVG rule in headers()
     * is for. Both are needed before an SVG from a third party is safe.
     */
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          /*
           * Two years, subdomains included. Without it the first request of a
           * visitor who types the domain is plain HTTP and strippable on a
           * café network. `preload` is deliberately absent: it is a one-way
           * door and belongs with the launch checklist, not the build config.
           */
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          /*
           * The directives a page can enforce without a nonce. `script-src`
           * is missing on purpose — Next's App Router streams inline
           * bootstrap scripts and the pages carry an inline JSON-LD block, so
           * anything stricter than 'unsafe-inline' would need a nonce
           * threaded through src/proxy.ts and the layout, and 'unsafe-inline'
           * would buy nothing. What is here still closes the exfiltration
           * routes an injected tag would use.
           */
          {
            key: "Content-Security-Policy",
            value: "base-uri 'none'; form-action 'self'; frame-ancestors 'self'; object-src 'none'",
          },
        ],
      },
      {
        /*
         * Files in /public are served at their own URL, where the image
         * optimiser's CSP does not apply. An SVG opened directly is a document
         * on this origin: without this it could run script and read the
         * consent and locale cookies. Subresource use (<img>, next/image) is
         * unaffected by either header.
         */
        source: "/:path*.svg",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'none'; script-src 'none'; style-src 'unsafe-inline'; sandbox",
          },
          { key: "Content-Disposition", value: "attachment" },
        ],
      },
    ];
  },
};

export default nextConfig;
