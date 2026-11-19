import type { NextConfig } from "next";

/**
 * Static export: the whole site is built to plain HTML/CSS/JS in `out/` and
 * served by GitHub Pages (see .github/workflows/deploy.yml).
 *
 * Consequences, handled elsewhere:
 * - no server: forms post to a form service from the browser (lib/submit-form.ts);
 * - no redirects config: old URLs are small HTML redirect pages in /public;
 * - no image optimizer: images in /public are pre-sized.
 */
const nextConfig: NextConfig = {
  output: "export",
  // /about/ -> out/about/index.html, which every static host serves correctly.
  trailingSlash: true,
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
    unoptimized: true,
  },
};

export default nextConfig;
