export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  kind: "Work" | "Product" | "Education" | "Award" | "Certificate";
  points: string[];
};

/** Verified from the CVs and the previous site. */
export const timeline: TimelineItem[] = [
  {
    period: "Oct 2024 – present",
    title: "Founder & full-stack software engineer",
    org: "Sougba",
    kind: "Product",
    points: [
      "Founded and built a marketplace and shop-management platform for Mali.",
      "Web app, Android app and back office, as one experience for shops and buyers.",
      "Keep it running every day, so shops never lose a sale.",
    ],
  },
  {
    period: "Sep 2018 – present",
    title: "Founder & full-stack software developer",
    org: "SAM Informatique Mali, Bamako",
    kind: "Work",
    points: [
      "Software for local businesses, from understanding the need to delivery and long-term support.",
      "Supervise and mentor two junior developers: code reviews and task planning.",
      "IT maintenance and support: hardware, system setup, networking and troubleshooting.",
    ],
  },
  {
    period: "Nov 2026",
    title: "Best Socially Relevant Project",
    org: "TechKubik National Level Project Expo 2026, with the RasteScan team",
    kind: "Award",
    points: ["Award and cash prize for RasteScan, a public road-repair portal with AI inspection."],
  },
  {
    period: "Jul 2026 – present",
    title: "PG programme in Multi-Cloud Architecture & DevOps",
    org: "Hero Vired",
    kind: "Education",
    points: ["AWS, Terraform, CI/CD and containers, with graded deployment projects such as Travel Memory."],
  },
  {
    period: "Oct 2025 – Aug 2027 (expected)",
    title: "Master of Computer Applications (MCA)",
    org: "CMR University, Bengaluru",
    kind: "Education",
    points: [],
  },
  {
    period: "2019 – 2023",
    title: "Licence (Bachelor's) in Computer Software Engineering",
    org: "SUP IGA – Institut Supérieur du Génie Appliqué, Bamako",
    kind: "Education",
    points: [],
  },
];

export const certificates = [
  { name: "Cisco ThingQbator (Nasscom Foundation, RVCE) — Flutter & Dart", date: "Aug 2026" },
  { name: "NPTEL Online Certification — Python", date: "Mar 2026" },
];
