export const processSteps = [
  {
    n: "01",
    name: "Discovery",
    summary: "Understand the business and requirements.",
    detail:
      "A conversation about your business, your customers and the problem. We ask how things work today, what it costs you, and what success looks like.",
    output: "A short written summary of goals, users and constraints.",
  },
  {
    n: "02",
    name: "Planning",
    summary: "Define scope, architecture and timeline.",
    detail:
      "We agree what the first version includes and what waits. We choose the simplest architecture that meets your needs and split the work into milestones.",
    output: "Scope, milestones, timeline and a fixed quote or estimate.",
  },
  {
    n: "03",
    name: "Design",
    summary: "Create the user experience and interface.",
    detail:
      "Screens and flows designed for your real users and devices, reviewed with you before code is written.",
    output: "Clickable or annotated designs for the key screens.",
  },
  {
    n: "04",
    name: "Development",
    summary: "Build the web or mobile solution.",
    detail:
      "Built in short iterations on a preview environment you can open at any time. You see progress every week, not only at the end.",
    output: "Working software on a preview link, updated through the project.",
  },
  {
    n: "05",
    name: "Testing",
    summary: "Validate security, quality and performance.",
    detail:
      "Automated tests where they matter, manual testing on real phones and browsers, and checks on access rights, inputs and page speed.",
    output: "A tested release candidate and a list of what was checked.",
  },
  {
    n: "06",
    name: "Deployment",
    summary: "Launch and provide agreed support.",
    detail:
      "Deployment on your domain with HTTPS, backups and monitoring, followed by a hand-over and the support period we agreed.",
    output: "Live product, documentation, and access to everything you own.",
  },
] as const;

export const reasons = [
  {
    title: "Built around your business",
    text: "Every project starts with how your business works, not with a template or a favourite technology.",
  },
  {
    title: "Modern, proven technology",
    text: "Next.js, Angular, Flutter, Spring Boot and Kubernetes: the same stack that runs our own products in production.",
  },
  {
    title: "Architecture that can grow",
    text: "A clean API and data model from day one, so a mobile app, a new branch or a partner integration does not mean a rewrite.",
  },
  {
    title: "Mobile-first by default",
    text: "Designed and tested for real phones on real networks, including low-end Android devices and expensive data.",
  },
  {
    title: "Clear, direct communication",
    text: "You talk to the people building your product, in English or French. Weekly progress you can open and try.",
  },
  {
    title: "Focused on outcomes",
    text: "The goal is more customers, fewer errors or hours saved. Features are chosen for that, not for the invoice.",
  },
  {
    title: "Deployment and support included",
    text: "The work does not stop at the code: hosting, HTTPS, backups, monitoring and the agreed support after launch.",
  },
  {
    title: "You own everything",
    text: "Your code, your data, your accounts and your domain. No lock-in.",
  },
] as const;
