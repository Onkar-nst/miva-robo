import path from "node:path";
import type { NextConfig } from "next";

const config: NextConfig = {
  // Matches the WordPress URLs exactly (all of them end in a slash).
  trailingSlash: true,
  outputFileTracingRoot: path.join(__dirname),
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      { source: "/wp-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/feed", destination: "/category/blogs/", permanent: true },
    ];
  },
};

export default config;
