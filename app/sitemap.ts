import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/profile";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { categories, categorySlug, getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const used = new Set(posts.map((p) => p.category));
  const entries: { path: string; priority: number; lastModified?: string }[] = [
    { path: "/", priority: 1 },
    { path: "/services/", priority: 0.9 },
    { path: "/projects/", priority: 0.9 },
    { path: "/start-a-project/", priority: 0.9 },
    { path: "/blog/", priority: 0.8 },
    { path: "/about/", priority: 0.7 },
    { path: "/process/", priority: 0.7 },
    { path: "/contact/", priority: 0.7 },
    { path: "/privacy/", priority: 0.2 },
    ...services.map((s) => ({ path: `/services/${s.slug}/`, priority: 0.8 })),
    ...projects.map((p) => ({ path: `/projects/${p.slug}/`, priority: p.featured ? 0.8 : 0.6 })),
    ...posts.map((p) => ({ path: `/blog/${p.slug}/`, priority: 0.7, lastModified: p.date })),
    ...categories.filter((c) => used.has(c)).map((c) => ({ path: `/blog/category/${categorySlug(c)}/`, priority: 0.4 })),
    // Kept from the previous site
    { path: "/rastescan.html", priority: 0.5 },
    { path: "/fr/", priority: 0.4 },
    { path: "/fr/sougba.html", priority: 0.3 },
    { path: "/fr/rastescan.html", priority: 0.3 },
    { path: "/fr/blog/gitops-solo-developer.html", priority: 0.3 },
  ];
  return entries.map((e) => ({
    url: `${siteConfig.url}${e.path}`,
    changeFrequency: "weekly",
    priority: e.priority,
    ...(e.lastModified ? { lastModified: e.lastModified } : {}),
  }));
}
