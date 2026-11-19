import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // The French pages from the previous static site live in /public/fr and use
  // relative links, so /fr/ must keep its trailing slash (handled in proxy.ts).
  skipTrailingSlashRedirect: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // URLs of the previous static site
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/sougba.html", destination: "/projects/sougba", permanent: true },
      // Short links
      { source: "/work", destination: "/projects", permanent: true },
      { source: "/portfolio", destination: "/projects", permanent: true },
      { source: "/start", destination: "/start-a-project", permanent: true },
      { source: "/cloud-devops", destination: "/services/cloud-devops", permanent: true },
    ];
  },
};

export default nextConfig;
