export type ServiceSlug =
  | "web-development"
  | "mobile-apps"
  | "custom-software"
  | "ecommerce"
  | "cloud-devops"
  | "ai-automation";

export type Service = {
  slug: ServiceSlug;
  name: string;
  short: string;
  /** Page <title> and H1 can differ for SEO. */
  seoTitle: string;
  seoDescription: string;
  headline: string;
  summary: string;
  offerings: { title: string; text: string }[];
  /** What a client gets at the end, concretely. */
  deliverables: string[];
  stack: string[];
  /** Slugs of projects that prove this service. */
  proof: string[];
  goodFit: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    name: "Web development",
    short: "Websites, web apps, dashboards and portals that load fast and are easy to run.",
    seoTitle: "Website & web application development services",
    seoDescription:
      "Corporate websites, landing pages, SaaS platforms, dashboards, booking systems and custom portals built with Next.js, Angular and a solid backend.",
    headline: "Websites and web applications your business can run on.",
    summary:
      "From a fast company website to a full SaaS platform: server-rendered pages that rank, interfaces that work on cheap phones, and a backend that keeps your data safe.",
    offerings: [
      { title: "Corporate websites", text: "A clear, fast site that explains what you do and turns visitors into enquiries." },
      { title: "Landing pages", text: "One page, one goal: launch a product, run a campaign, collect sign-ups." },
      { title: "SaaS platforms", text: "Accounts, roles, subscriptions-ready data model and an admin back office." },
      { title: "Web applications", text: "Custom tools your team or your customers use every day, in the browser." },
      { title: "Business dashboards", text: "Sales, stock and activity in one screen, with the numbers you actually use." },
      { title: "Booking systems", text: "Appointments, reservations and availability, with confirmations by email or WhatsApp." },
      { title: "Custom portals", text: "Client, supplier or staff portals with secure sign-in and the right access for each role." },
    ],
    deliverables: [
      "Responsive site or app, tested on phones, tablets and desktops",
      "Search-engine basics: titles, descriptions, sitemap, structured data",
      "Admin screens so you can update content without a developer",
      "Deployment on your domain with HTTPS",
      "Source code in a repository you own",
    ],
    stack: ["Next.js", "React", "Angular (SSR)", "TypeScript", "Tailwind CSS", "Spring Boot", "Node.js", "PostgreSQL"],
    proof: ["sougba", "nafas-perfumes", "rastescan"],
    goodFit: [
      "You need a site that brings in customers, not just a brochure",
      "Your team runs on spreadsheets and WhatsApp and needs a proper tool",
      "You have an idea for a web product and want a first version in production",
    ],
    faqs: [
      { q: "Can I edit the content myself?", a: "Yes. Where content changes often, you get simple admin screens. Nafas Perfumes' owner adds perfumes and changes prices alone." },
      { q: "Will it work on low-end phones?", a: "That is the default. Sougba was designed for low-end Android phones and expensive mobile data: server-side rendering and small images." },
    ],
  },
  {
    slug: "mobile-apps",
    name: "Mobile app development",
    short: "Android and iOS apps from one Flutter codebase, connected to your backend.",
    seoTitle: "Mobile app development — Android, iOS & cross-platform",
    seoDescription:
      "Cross-platform mobile apps built with Flutter for Android and iOS: business apps, customer-facing apps and API integrations.",
    headline: "Mobile apps your customers and staff keep using.",
    summary:
      "One Flutter codebase for Android and iOS, built on the same API as your website so every feature ships on web and mobile together.",
    offerings: [
      { title: "Android applications", text: "Built, signed and prepared for Google Play, the way the Sougba app is published." },
      { title: "iOS applications", text: "The same Flutter codebase compiled for iPhone and prepared for App Store review." },
      { title: "Cross-platform apps", text: "One codebase, two stores, one team to talk to." },
      { title: "Business applications", text: "Point of sale, stock checks, field reports: tools for your staff on their phones." },
      { title: "Customer-facing apps", text: "Catalogues, orders, bookings and notifications for your customers." },
      { title: "API integrations", text: "Payments, maps, messaging and your existing systems, connected through a clean API." },
    ],
    deliverables: [
      "Android and/or iOS app from one Flutter codebase",
      "Store listing preparation (screenshots, descriptions, privacy details)",
      "Backend API shared with your website",
      "Push notifications and offline-friendly behaviour where needed",
      "Source code in a repository you own",
    ],
    stack: ["Flutter", "Dart", "REST APIs", "Push notifications", "Spring Boot", "FastAPI"],
    proof: ["sougba", "rastescan"],
    goodFit: [
      "Your customers live on their phones and your website is not enough",
      "Your staff need a tool they can use on the shop floor or in the field",
      "You want one product on web, Android and iOS without three separate teams",
    ],
    faqs: [
      { q: "Flutter or native?", a: "Flutter for almost every business app: one codebase, close-to-native performance, lower cost. Native only when a feature truly needs it." },
      { q: "Do you publish to the stores?", a: "Yes. Builds are prepared and submitted under your own developer accounts, so the apps stay yours." },
    ],
  },
  {
    slug: "custom-software",
    name: "Custom software & backend",
    short: "Inventory, point of sale, CRM, ERP-style tools and the APIs behind them.",
    seoTitle: "Custom software development — POS, inventory, CRM & business platforms",
    seoDescription:
      "Custom business software: inventory management, point of sale, CRM, order management and ERP-style platforms, with robust backend and API development.",
    headline: "Software shaped around how your business really works.",
    summary:
      "Off-the-shelf tools are built for someone else's business. We build the system you need: stock, sales, orders, customers and reports, with the backend and APIs to grow.",
    offerings: [
      { title: "Inventory management", text: "Products, stock levels, movements and low-stock alerts across branches." },
      { title: "Point of sale", text: "Fast checkout, receipts and sales history that match your stock automatically." },
      { title: "CRM systems", text: "Customers, suppliers, history and follow-ups in one place." },
      { title: "ERP-style platforms", text: "Branches, roles, purchasing, sales and reporting that fit together." },
      { title: "Order management", text: "From order to delivery, with statuses your team and customers can follow." },
      { title: "Backend & API development", text: "Secure REST and gRPC APIs, authentication, event-driven services and integrations." },
    ],
    deliverables: [
      "A working system with roles and permissions for your team",
      "Documented API, ready for a mobile app or partner integrations",
      "Data model designed for your reports, not just for today's screens",
      "Automated backups and a deployment you can rebuild",
      "Hand-over: documentation and a walkthrough for your team",
    ],
    stack: ["Java 21", "Spring Boot 3", "Kafka", "gRPC", "Python", "FastAPI", "Node.js", "PostgreSQL", "MongoDB", "Redis"],
    proof: ["fere", "sougba", "voting-application"],
    goodFit: [
      "You track stock or sales in a notebook or spreadsheet",
      "Your current tool does 60% of what you need and fights you on the rest",
      "You need an API so a website, an app and partners can share the same data",
    ],
    faqs: [
      { q: "Can it work across several shops or branches?", a: "Yes. Fere, the merchant workspace built for Sougba, handles branches, team roles, stock and sales per branch." },
      { q: "Who owns the code?", a: "You do. The repository, the data and the deployment are yours from day one." },
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce & marketplaces",
    short: "Online shops and multi-vendor marketplaces with payments and stock that stay in sync.",
    seoTitle: "E-commerce & marketplace development",
    seoDescription:
      "Online stores and multi-vendor marketplaces: catalogue, orders, online and cash-on-delivery payments, stock management and seller tools.",
    headline: "Sell online without losing track of your shop.",
    summary:
      "An online shop that your customers enjoy and you can run alone, or a full marketplace connecting buyers and sellers, with stock and orders that never drift apart.",
    offerings: [
      { title: "Online stores", text: "Catalogue, cart, checkout, online payment or cash on delivery." },
      { title: "Multi-vendor marketplaces", text: "Shops, products, services and buyer requests, with search and SEO-friendly pages." },
      { title: "Payments", text: "Payment gateways such as Razorpay, and pay-on-delivery flows where cards are rare." },
      { title: "Seller tools", text: "Products, stock, orders and customers from a phone." },
      { title: "WhatsApp-first contact", text: "Let buyers reach the seller directly where they already talk." },
    ],
    deliverables: [
      "Storefront tested on mobile first",
      "Owner back office for products, prices, stock and orders",
      "Payment integration and order notifications",
      "Product pages built to be found in search",
      "Deployment, backups and a hand-over walkthrough",
    ],
    stack: ["Next.js", "Angular (SSR)", "PostgreSQL", "Razorpay", "Typesense", "Spring Boot", "Docker"],
    proof: ["nafas-perfumes", "sougba", "fere"],
    goodFit: [
      "Customers only find you if they walk past your shop",
      "You sell through WhatsApp and want orders and stock in one place",
      "You want to launch a marketplace for a city, a sector or a community",
    ],
    faqs: [
      { q: "Can I run the shop without a developer?", a: "That is the goal. Nafas Perfumes' owner adds products, changes prices and handles orders alone." },
      { q: "Do you support cash on delivery?", a: "Yes, alongside online payment." },
    ],
  },
  {
    slug: "cloud-devops",
    name: "Cloud & DevOps",
    short: "AWS, Docker, Kubernetes and CI/CD so releases are routine and data is safe.",
    seoTitle: "Cloud & DevOps services — AWS, Docker, Kubernetes, CI/CD",
    seoDescription:
      "Cloud deployment, AWS infrastructure, Docker and Kubernetes, CI/CD pipelines, GitOps, Linux administration, backups and monitoring.",
    headline: "Infrastructure that makes releasing boring, and keeps your data safe.",
    summary:
      "We run our own platform in production every day. The same practices are available for your product: automated deploys, rollbacks in one step, backups you have actually restored, and monitoring that warns you first.",
    offerings: [
      { title: "AWS infrastructure", text: "VPCs, load balancers, auto scaling, HTTPS certificates, defined in Terraform." },
      { title: "Cloud deployment", text: "Move an app from a laptop or a shared host to a reliable, reproducible setup." },
      { title: "Docker & Kubernetes", text: "Containerised services on Kubernetes (k3s), managed declaratively." },
      { title: "CI/CD & GitOps", text: "Jenkins or GitHub Actions to build and test; Argo CD to deploy. Every deploy is a commit." },
      { title: "Linux administration", text: "Servers, Nginx, networking, Cloudflare Tunnel and private access with Tailscale." },
      { title: "Infrastructure automation", text: "Ansible playbooks and Terraform modules instead of manual steps." },
      { title: "Monitoring & backups", text: "Scheduled health reports, database backups with retention, and restore drills." },
    ],
    deliverables: [
      "Infrastructure as code you can rebuild in minutes",
      "A pipeline from commit to production, with one-step rollback",
      "Backups on a schedule, with a tested restore",
      "Health checks and alerts",
      "A written runbook for your team",
    ],
    stack: ["AWS", "Terraform", "Docker", "Kubernetes (k3s)", "Argo CD", "Jenkins", "GitHub Actions", "Ansible", "Nginx", "Cloudflare", "Linux"],
    proof: ["sougba-platform", "travel-memory-aws", "rastescan"],
    goodFit: [
      "Deploys are manual, scary, and only one person knows how",
      "You have never restored a backup, so you do not know if you have one",
      "Your app runs on a single server and you want it to survive a failure",
    ],
    faqs: [
      { q: "Do I need Kubernetes?", a: "Often not. A small product may be best on one well-managed server or a managed platform. We recommend the simplest setup that meets your needs." },
      { q: "Can you take over an existing deployment?", a: "Yes. It starts with an audit: what runs where, how it is deployed and backed up, and what to fix first." },
    ],
  },
  {
    slug: "ai-automation",
    name: "AI & automation",
    short: "LLM-powered features, assistants and workflow automation with guardrails.",
    seoTitle: "AI integration & business automation development",
    seoDescription:
      "AI integrations, LLM-powered applications, assistants, intelligent data processing and workflow automation built with clear rules and safeguards.",
    headline: "AI features that help your team, with rules it cannot break.",
    summary:
      "Language and vision models are useful when they sit inside plain, testable software. The model suggests; your rules decide. That is how RasteScan was built, and how we build AI features for businesses.",
    offerings: [
      { title: "AI integrations", text: "Add model-powered features to an existing web or mobile app." },
      { title: "LLM-powered applications", text: "Search, summarise, classify and extract from your documents and data." },
      { title: "AI assistants", text: "Assistants that answer from your own content, with clear limits." },
      { title: "Workflow automation", text: "Remove copy-paste work between email, spreadsheets and your systems." },
      { title: "Intelligent data processing", text: "Turn photos, forms and documents into structured, validated data." },
    ],
    deliverables: [
      "A replaceable model provider, so you are not locked in",
      "Strict output validation and retries",
      "Human review for low-confidence results",
      "Privacy steps before data reaches a model (for example, blurring faces)",
      "A test mode that runs without an AI provider",
    ],
    stack: ["Python", "FastAPI", "Pydantic", "Amazon Bedrock", "Groq", "Azure AI", "OpenCV", "LLM APIs"],
    proof: ["rastescan"],
    goodFit: [
      "Your team spends hours sorting, reading or re-typing information",
      "You want an AI feature but need to trust what it does",
      "You want to try AI without betting your product on one vendor",
    ],
    faqs: [
      { q: "Will the AI make decisions on its own?", a: "Only where you decide it may. In RasteScan, the model scores damage but plain code sets urgency, and anything under 60% confidence waits for a person." },
      { q: "Which AI provider do you use?", a: "The one that fits your data, budget and region. The provider sits behind one interface so it can be swapped." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
