import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.trycloudflare.com",
  ],
  // Addresses from the old WordPress kelson.co.zm, so Google results and bookmarks land on the matching page.
  // (Trailing slashes are already dropped by Next, so "/cctv/" reaches "/cctv" first.)
  async redirects() {
    const toService = [
      "hosted-services",
      "networking",
      "server-rooms-and-data-centers",
      "cctv",
      "digital-signage-projection-and-video-walls",
      "audio-visual-systems-collaboration-and-conferencing",
      "structured-cabling-and-fibre-optics",
      "it-hardware-accessories",
      "collaboration-telephony",
      "ict-solutions",
    ].map((slug) => ({ source: `/${slug}`, destination: `/services/${slug}`, permanent: true }));
    const moved: [string, string][] = [
      ["/our-services", "/services"],
      ["/brands-we-stock", "/brands"],
      ["/our-team", "/about"],
      ["/blog", "/"],
      ["/privacy-policy", "/"],
      ["/register", "/"],
      ["/feed", "/"],
      ["/home", "/"],
      ["/submit-ticket", "/support"],
      ["/submit-ticket-2", "/support"],
      ["/new-ticket", "/support"],
      ["/open-ticket", "/support"],
      ["/my-tickets-2", "/support"],
      ["/search-tickets", "/support"],
      ["/wp-admin/:path*", "/"],
      ["/wp-login.php", "/"],
    ];
    return [...toService, ...moved.map(([source, destination]) => ({ source, destination, permanent: true }))];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(self), microphone=(self), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;