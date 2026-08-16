import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Pin the workspace root. Without this, Turbopack walks up looking for a
   * lockfile and can settle on one outside the repository, then warn that it
   * is ignoring ours.
   */
  turbopack: { root: import.meta.dirname },

  images: {
    /**
     * The photo placeholders in /public are SVGs we author ourselves. Next
     * refuses to serve SVG through the image optimiser unless this is set;
     * the sandbox CSP below keeps that safe even if a future SVG is pasted in
     * from elsewhere.
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
        ],
      },
    ];
  },
};

export default nextConfig;
