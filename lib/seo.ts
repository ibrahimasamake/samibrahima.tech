import type { Metadata } from "next";
import { profile, siteConfig, socialLinks } from "@/data/profile";
import { absoluteUrl } from "@/lib/utils";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
};

/** Consistent title, description, canonical, Open Graph and Twitter tags. */
export function pageMetadata({ title, description, path, image, type = "website" }: PageMeta): Metadata {
  // Fall back to the generated site-wide preview so every page has a share image.
  const images = [image ?? { url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.title }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: profile.brand,
      locale: siteConfig.locale,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
  };
}

const ORG_ID = `${siteConfig.url}/#business`;
const PERSON_ID = `${siteConfig.url}/#ibrahima`;

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    jobTitle: "Founder & software engineer",
    url: siteConfig.url,
    image: absoluteUrl(profile.portrait.src),
    email: `mailto:${profile.email}`,
    knowsLanguage: ["en", "fr", "bm"],
    alumniOf: ["CMR University", "SUP IGA – Institut Supérieur du Génie Appliqué"],
    knowsAbout: [
      "Web development",
      "Mobile app development",
      "Custom software development",
      "E-commerce",
      "Cloud computing",
      "DevOps",
      "Kubernetes",
      "Artificial intelligence",
    ],
    sameAs: socialLinks.map((s) => s.href),
    worksFor: { "@id": ORG_ID },
  };
}

/** The business offering. No street address: remote services only. */
export function businessJsonLd() {
  return {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: `${profile.brand} — Software development`,
    url: siteConfig.url,
    description: siteConfig.description,
    image: absoluteUrl("/opengraph-image"),
    email: profile.email,
    founder: { "@id": PERSON_ID },
    areaServed: "Worldwide",
    availableLanguage: ["English", "French"],
    knowsAbout: ["Next.js", "Angular", "Flutter", "Spring Boot", "Kubernetes", "AWS"],
    sameAs: socialLinks.map((s) => s.href),
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: profile.brand,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
