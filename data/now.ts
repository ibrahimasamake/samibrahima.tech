/**
 * "What we're working on" board on the homepage. Keep it current and
 * truthful: things actually live or actually in progress.
 * status: "live" | "building" | "writing"
 */
export type NowItem = {
  status: "live" | "building" | "writing";
  title: string;
  text: string;
  href?: string;
};

export const nowItems: NowItem[] = [
  {
    status: "live",
    title: "Sougba marketplace",
    text: "Shops in Bamako online by neighbourhood, buyers reaching them on WhatsApp. New features ship on web and Android together.",
    href: "/projects/sougba/",
  },
  {
    status: "building",
    title: "Fere workspace",
    text: "Ongoing work on the till, stock and orders tool that shop owners run from their phone.",
    href: "/projects/fere/",
  },
  {
    status: "building",
    title: "A B2B + B2C marketplace for India",
    text: "Multi-vendor marketplace in development. More to share once it is live.",
  },
  {
    status: "live",
    title: "Nafas Perfumes online shop",
    text: "A Bengaluru perfume counter now selling online, with the owner running everything alone.",
    href: "/projects/nafas-perfumes/",
  },
  {
    status: "writing",
    title: "Notes from the field",
    text: "Architecture, tools, cloud and AI, written up on the blog as we learn.",
    href: "/blog/",
  },
];
