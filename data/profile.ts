/**
 * Single source of truth for who runs this site and how to reach him.
 * Everything here is taken from the previous samibrahima.tech site, the CVs
 * and public GitHub repositories. Update it here, not in components.
 */
export const profile = {
  name: "Ibrahima Samake",
  shortName: "Ibrahima",
  brand: "Ibrahima Samake",
  role: "Founder & engineering lead",
  positioning: "Software engineering & digital product development",
  headline: "We build digital products that move businesses forward.",
  intro:
    "Need a website, mobile application or custom software? We help businesses turn ideas into reliable, scalable digital products.",
  // Location is where Ibrahima works from. No office is claimed.
  basedIn: "Bengaluru, India and Bamako, Mali",
  workMode: "Remote-first, working with clients in any time zone",
  languages: ["English", "French", "Bambara"],
  since: 2018,
  email: "ibsamk17@gmail.com",
  portrait: {
    src: "/images/about/ibrahima-samake.jpg",
    alt: "Portrait of Ibrahima Samake in a navy blazer and white shirt",
    width: 900,
    height: 900,
  },
  /** Second, more personal photo used on the About page. */
  aboutPortrait: {
    src: "/images/about/ibrahima-samake-black-shirt.jpg",
    alt: "Ibrahima Samake in a black shirt, resting his chin on his hand",
    width: 1050,
    height: 1400,
  },
  cv: {
    en: "/cv/Ibrahima-Samake-CV.pdf",
    fr: "/cv/Ibrahima-Samake-CV-FR.pdf",
  },
  /**
   * Shown in the header only when true. Keep it accurate.
   */
  availability: {
    show: true,
    label: "Taking on new projects",
  },
} as const;

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/samibrahima" },
  { label: "GitHub", href: "https://github.com/ibrahimasamake" },
  { label: "Freelancer", href: "https://www.freelancer.com/u/SamIbrahima" },
] as const;

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.samibrahima.tech",
  title: "Ibrahima Samake — Web, mobile & custom software development",
  description:
    "Founder-led software development: websites, web and mobile apps, custom business software, e-commerce, cloud & DevOps and AI. From idea to production.",
  ogImage: "/opengraph-image",
  locale: "en_US",
} as const;

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/projects" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
