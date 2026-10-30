import path from "node:path";
import type { NextConfig } from "next";

const config: NextConfig = {
  // `next dev` and `next build` get separate output folders, so running a build can never
  // delete the chunks a running dev server is serving (the cause of "ChunkLoadError").
  distDir: process.env.NODE_ENV === "production" ? ".next" : ".next-dev",
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
