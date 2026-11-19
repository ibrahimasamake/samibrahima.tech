import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/profile";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${siteConfig.url}${p}`;
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/projects", priority: 0.9 },
    { path: "/start-a-project", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/process", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy", priority: 0.2 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
    ...projects.map((p) => ({ path: `/projects/${p.slug}`, priority: p.featured ? 0.8 : 0.6 })),
    // Pages kept from the previous site
    { path: "/rastescan.html", priority: 0.5 },
    { path: "/blog/gitops-solo-developer.html", priority: 0.5 },
    { path: "/fr/", priority: 0.4 },
    { path: "/fr/sougba.html", priority: 0.3 },
    { path: "/fr/rastescan.html", priority: 0.3 },
    { path: "/fr/blog/gitops-solo-developer.html", priority: 0.3 },
  ];
  return pages.map((p) => ({ url: url(p.path), changeFrequency: "monthly", priority: p.priority }));
}
