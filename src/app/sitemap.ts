import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { products, services } from "@/content/products";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/", "/about-miva-robotics/", "/support-and-services/", "/contact/", "/privacy-policy/", "/terms-conditions/",
    ...[...products, ...services].map((x) => `/portfolio/${x.slug}/`),
    ...posts.map((p) => `/${p.slug}/`),
    "/category/blogs/",
  ];
  return paths.map((p) => ({ url: site.url + p }));
}
