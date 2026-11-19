import type { ServiceSlug } from "./services";

/**
 * Case studies. Every statement here comes from the previous site, the CVs,
 * public repositories or live product screenshots. Do not add numbers or
 * outcomes that cannot be shown.
 */

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** "screen" gets a device frame, "photo" is shown as-is. */
  kind?: "screen" | "mobile" | "photo";
};

export type ArchitectureLayer = {
  label: string;
  nodes: { name: string; detail?: string }[];
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  /** Who it was for: own product, client, team or training. */
  context: "Own product" | "Client project" | "Team project" | "Training project";
  period: string;
  role: string;
  summary: string;
  challenge: string[];
  solution: string[];
  features: { title: string; text: string }[];
  tech: { group: string; items: string[] }[];
  architecture?: { layers: ArchitectureLayer[]; note?: string };
  contribution: string[];
  challenges: { problem: string; solution: string }[];
  /** Verified outcomes only. */
  outcomes: string[];
  cover: ProjectImage;
  gallery: ProjectImage[];
  links: { label: string; href: string }[];
  services: ServiceSlug[];
  featured: boolean;
  /** One line used for the "discuss a similar project" call to action. */
  similar: string;
};

export const projects: Project[] = [
  {
    slug: "sougba",
    name: "Sougba",
    tagline: "A marketplace and shop-management platform for Mali.",
    category: "Marketplace · Web & mobile",
    context: "Own product",
    period: "Oct 2024 – present",
    role: "Founder and product lead",
    summary:
      "Sougba connects buyers, shops and service providers in Mali. Shops go online by neighbourhood, buyers reach them directly on WhatsApp, and owners run their shop with Fere, the built-in workspace for stock and sales.",
    challenge: [
      "Most small shops in Bamako sell through WhatsApp and keep their accounts in a paper notebook. They need two things: to be found online, and a simple way to track stock and sales.",
      "Existing tools are built for other markets: expensive, English-only and heavy on mobile data.",
    ],
    solution: [
      "One product on the web, on Android and in a back office for the team, so merchants and buyers get the same experience everywhere.",
      "French first, built for low-end Android phones and costly data: fast pages, small images and a phone-first layout.",
      "Every feature ships on web and mobile together.",
    ],
    features: [
      { title: "Public marketplace", text: "Products, services, shops and buyer requests, with fast search and pages that are easy to find on Google." },
      { title: "Near you", text: "Shops and products by neighbourhood, so buyers find what is close." },
      { title: "Direct contact", text: "Buyers message the seller on WhatsApp, no middleman." },
      { title: "Fere workspace", text: "Each shop gets a till, a stock book and customer records on its phone." },
      { title: "Back office", text: "Tools for the team to welcome new shops and keep the marketplace tidy." },
      { title: "Notifications", text: "Shops and buyers hear about what matters to them, on web and mobile." },
    ],
    tech: [{ group: "Platforms", items: ["Web app", "Android app (Google Play)", "Team back office"] }],
    contribution: [
      "Founded the product and shaped it with shop owners and buyers",
      "Designed and built the web app, the mobile app and the back office",
      "Keeps it running every day for shops and buyers",
    ],
    challenges: [
      {
        problem: "Buyers use low-end phones on expensive data.",
        solution: "Fast-loading pages, small images and French-first, plain-language copy shaped every screen.",
      },
      {
        problem: "Shops already sell on WhatsApp and will not switch habits overnight.",
        solution: "Sougba connects to WhatsApp instead of replacing it: buyers find the shop online, then talk to the seller where they already do.",
      },
    ],
    outcomes: ["Live at sougba.com, with the Android app on Google Play"],
    cover: {
      src: "/images/projects/sougba/home-desktop.jpg",
      alt: "Sougba marketplace home page showing product categories and the most viewed products in Bamako",
      width: 1440,
      height: 900,
      kind: "screen",
    },
    gallery: [
      {
        src: "/images/projects/sougba/home-mobile.jpg",
        alt: "Sougba on a phone: search, neighbourhood picker and featured categories",
        width: 780,
        height: 1688,
        kind: "mobile",
        caption: "Phone-first: neighbourhood picker and featured categories.",
      },
      {
        src: "/images/projects/sougba/og.jpg",
        alt: "Sougba marketplace preview image",
        width: 1200,
        height: 628,
        kind: "screen",
        caption: "The marketplace home page.",
      },
    ],
    links: [{ label: "Visit sougba.com", href: "https://sougba.com" }],
    services: ["ecommerce", "web-development", "mobile-apps", "custom-software"],
    featured: true,
    similar: "Planning a marketplace or a platform with web and mobile apps?",
  },
  {
    slug: "fere",
    name: "Fere",
    tagline: "Point of sale, stock and orders for shops, on any phone.",
    category: "Business software · POS & inventory",
    context: "Own product",
    period: "2024 – present",
    role: "Product designer and developer",
    summary:
      "Fere is the merchant workspace inside Sougba: a private back office where a shop manages its catalogue, stock, quick sales, customers, team and branches, and publishes products to the marketplace.",
    challenge: [
      "Shop owners know their business but not their exact stock. Sales are written in a notebook, if at all, and nobody knows what is running low until a customer asks for it.",
      "Business software on the market is priced, designed and written for other countries.",
    ],
    solution: [
      "A workspace that starts with what an owner does every day: add a product with a photo, sell it, see what is left.",
      "Every sale updates the stock by itself, and every change is recorded.",
      "The same workspace publishes products to the Sougba marketplace, so going online is one step, not a second system.",
    ],
    features: [
      { title: "Catalogue", text: "Products with photos, category, brand, SKU, barcode, purchase and sale price." },
      { title: "Stock & movements", text: "Quantities per branch, low-stock alerts and a history of every movement." },
      { title: "Quick sale", text: "A fast point-of-sale screen, plus QR checkout." },
      { title: "Sales history", text: "Every sale, searchable, with what was sold and for how much." },
      { title: "Customers & suppliers", text: "Customer records and supplier contacts in one place." },
      { title: "Team & branches", text: "Roles such as owner, and separate branches under one business." },
      { title: "Publications", text: "Push products from the private catalogue to the public marketplace." },
      { title: "Reports", text: "A dashboard with the numbers an owner checks first." },
    ],
    tech: [{ group: "Platforms", items: ["Web workspace", "Inside the Sougba mobile app"] }],
    contribution: [
      "Designed the workspace around a shop owner's daily routine",
      "Built the workspace on web and its place in the mobile app",
      "Connected it to the marketplace so products publish in one step",
    ],
    challenges: [
      {
        problem: "Stock and sales drift apart when they are written in two places.",
        solution: "Selling and stock are one action: a sale updates the stock count immediately, so the numbers always agree.",
      },
      {
        problem: "One business, several branches, different staff.",
        solution: "Branches and roles are built in, so each person sees and changes only what they should.",
      },
    ],
    outcomes: ["Live inside Sougba as the free workspace for shops"],
    cover: {
      src: "/images/projects/fere/catalogue.jpg",
      alt: "Fere workspace in dark mode: adding a product with photos, price, stock quantity and alert threshold",
      width: 1800,
      height: 975,
      kind: "screen",
      caption: "Adding a product in a test workspace. The menu shows stock, movements, quick sale, sales history, QR checkout, customers and team.",
    },
    gallery: [],
    links: [{ label: "Try it on sougba.com", href: "https://sougba.com" }],
    services: ["custom-software", "ecommerce", "web-development"],
    featured: true,
    similar: "Need a point of sale, inventory or order system for your business?",
  },
  {
    slug: "nafas-perfumes",
    name: "Nafas Perfumes",
    tagline: "An online shop for a Bengaluru perfume store.",
    category: "E-commerce · Client project",
    context: "Client project",
    period: "Nov 2026",
    role: "Full-stack developer, from first conversation to launch",
    summary:
      "Nafas is a perfume counter in Bengaluru with great perfumes and loyal customers. If you did not walk past the counter, Nafas did not exist online. Now customers browse and order from their phone.",
    challenge: [
      "A walk-in-only shop: no way for customers to browse the collection or order without visiting.",
      "The owner needed to run the shop alone, with no developer for every new perfume or price change.",
    ],
    solution: [
      "A mobile-first online shop: browse the full collection, choose a size, pay online or on delivery.",
      "An owner back office for catalogue, orders, stock and daily sales.",
      "WhatsApp contact for customers who want personal advice.",
    ],
    features: [
      { title: "Catalogue by size", text: "Every perfume in 30, 60 and 100 ml, with brands and oils." },
      { title: "Online or on delivery", text: "Razorpay for online payment, plus cash on delivery." },
      { title: "Owner back office", text: "New perfume, new price, new photo, without a developer." },
      { title: "Orders and stock", text: "Orders reach the owner immediately; stock and daily sales are tracked." },
      { title: "Search", text: "Find a perfume by name or brand from any page." },
      { title: "Personal service", text: "A WhatsApp link for questions and advice." },
    ],
    tech: [
      { group: "Application", items: ["Next.js", "TypeScript", "PostgreSQL"] },
      { group: "Payments", items: ["Razorpay", "Cash on delivery"] },
      { group: "Deployment", items: ["Docker"] },
    ],
    contribution: [
      "Understood how the shop works and what the owner needed to do alone",
      "Designed and built the storefront and the owner back office",
      "Integrated payments and deployed the shop on its own domain",
    ],
    challenges: [
      {
        problem: "The owner is not technical and has no developer on call.",
        solution: "Every routine task (products, prices, photos, orders) lives in a simple back office designed for one person.",
      },
    ],
    outcomes: ["Live at nafasperfume.com", "The owner manages products, prices and orders without a developer"],
    cover: {
      src: "/images/projects/nafas/home-desktop.jpg",
      alt: "Nafas Perfumes home page: 'Find your signature scent' with prices for 30, 60 and 100 ml",
      width: 1440,
      height: 900,
      kind: "screen",
    },
    gallery: [
      {
        src: "/images/projects/nafas/home-mobile.jpg",
        alt: "Nafas Perfumes online shop on a phone",
        width: 780,
        height: 1688,
        kind: "mobile",
        caption: "Most customers order from their phone.",
      },
      {
        src: "/images/projects/nafas/shop.jpg",
        alt: "The Nafas Perfumes counter in Bengaluru, with two customers seen from behind",
        width: 618,
        height: 1100,
        kind: "photo",
        caption: "The shop the website now brings online.",
      },
    ],
    links: [{ label: "Visit nafasperfume.com", href: "https://nafasperfume.com" }],
    services: ["ecommerce", "web-development"],
    featured: true,
    similar: "Want your shop to sell online, and still run it yourself?",
  },
  {
    slug: "rastescan",
    name: "RasteScan",
    tagline: "A public record of road repairs, from a citizen's photo to proof of repair.",
    category: "Civic tech · AI · Web & mobile",
    context: "Team project",
    period: "Nov 2026",
    role: "Team member (four MCA students, CMR University)",
    summary:
      "Citizens photograph road damage, the most dangerous reports rise to the top of the city's queue, and anyone can follow each report to the proof of repair. Best Socially Relevant Project at the TechKubik National Level Project Expo 2026.",
    challenge: [
      "Road damage reaches a city as a WhatsApp photo, a social media post or a phone call. An open manhole and a hairline crack wait in the same pile.",
      "Results come back as a total, which cannot tell a citizen whether their road was fixed, or how long it took.",
    ],
    solution: [
      "A public portal in English, Kannada and Hindi: a photo and a location, no login, with an offline queue.",
      "Faces and number plates are blurred before a photo is stored or sent to any AI.",
      "A vision model scores the damage; plain server code decides urgency and repair deadlines.",
      "Crews upload a photo from the site, and the public page shows before and after.",
    ],
    features: [
      { title: "Report in seconds", text: "Photo and location, no account, works offline and in three languages." },
      { title: "Privacy first", text: "Faces and number plates blurred before storage or AI." },
      { title: "AI inspection with checks", text: "Pixel analysis gives the model hints and rejects boxes on cars, buildings or sky." },
      { title: "Ranked officer queue", text: "Ordered by urgency, deadline, severity and number of reports." },
      { title: "Proof of repair", text: "Before and after photos, checked again before a report is marked resolved." },
      { title: "Indicative repair cost", text: "The model measures; the server does the arithmetic." },
    ],
    tech: [
      { group: "Backend", items: ["Python", "FastAPI", "Pydantic", "SQLite", "OpenCV", "Pillow"] },
      { group: "Web & mobile", items: ["React 19", "Vite", "TypeScript", "Leaflet", "Flutter", "Capacitor"] },
      { group: "AI", items: ["Amazon Bedrock (Nova)", "Groq", "Azure", "Offline test mode"] },
      { group: "Platform", items: ["AWS EC2, S3, CloudFront", "Terraform", "Ansible", "GitHub Actions"] },
    ],
    architecture: {
      layers: [
        { label: "Clients", nodes: [{ name: "Web portal", detail: "React 19 · Vite · TypeScript" }, { name: "Android", detail: "Flutter · Capacitor build" }] },
        { label: "Edge", nodes: [{ name: "CloudFront", detail: "HTTPS" }] },
        { label: "API", nodes: [{ name: "FastAPI on EC2", detail: "public, citizen and officer APIs · urgency rules · audit trail · retry worker" }] },
        {
          label: "Storage & AI",
          nodes: [
            { name: "SQLite", detail: "reports, history, officers, wards" },
            { name: "S3", detail: "blurred photos only" },
            { name: "AI provider", detail: "Bedrock, Groq or Azure, replaceable" },
          ],
        },
      ],
      note: "The AI is one replaceable box. Everything around it is plain, testable code.",
    },
    contribution: [
      "One of four team members: Aditi Varsha, Chaitanya, Ibrahima and Vishnu",
      "Wrote the public project story and the lessons learned, linked below",
    ],
    challenges: [
      {
        problem: "Within two days, one AI provider was locked, another model was shut down and a third needed its own handling.",
        solution: "The model sits behind one interface. The urgency rules never lived inside a provider, so they stayed put.",
      },
      {
        problem: "An AI must never under-rate a dangerous hazard.",
        solution: "An open manhole is always critical in code, whatever the model says. Under 60% confidence, a person reviews before anything is published.",
      },
      {
        problem: "A busy or failing AI could lose reports.",
        solution: "Reports are saved as waiting and a background worker finishes them later. Every answer must pass a strict schema.",
      },
    ],
    outcomes: [
      "Best Socially Relevant Project and cash prize, TechKubik National Level Project Expo 2026",
      "108 backend tests passing, with CI jobs for backend, web and infrastructure",
      "Not yet proved: AI accuracy on local photos, and real use by a city. The demo uses public dataset photos.",
    ],
    cover: {
      src: "/images/projects/rastescan/queue.jpg",
      alt: "RasteScan officer queue with demo reports sorted by urgency",
      width: 1400,
      height: 1007,
      kind: "screen",
      caption: "Officer queue with demo data.",
    },
    gallery: [
      { src: "/images/projects/rastescan/report.jpg", alt: "RasteScan report result format on a demo road photo", width: 1400, height: 1096, kind: "screen", caption: "Report result format, shown on a labelled dataset photo." },
      { src: "/images/projects/rastescan/map.jpg", alt: "RasteScan public map of road damage reports", width: 1400, height: 671, kind: "screen", caption: "Public map of reports." },
      { src: "/images/projects/rastescan/scoreboard.jpg", alt: "RasteScan public scoreboard", width: 1400, height: 1038, kind: "screen", caption: "Public scoreboard." },
      { src: "/images/projects/rastescan/award.jpg", alt: "The RasteScan team receiving the Best Socially Relevant Project award", width: 900, height: 612, kind: "photo", caption: "Prize giving, HKBK College of Engineering, Bengaluru." },
    ],
    links: [
      { label: "Read the full story", href: "/rastescan.html" },
      { label: "Source on GitHub", href: "https://github.com/ibrahimasamake/rastescan" },
    ],
    services: ["ai-automation", "web-development", "mobile-apps", "cloud-devops"],
    featured: true,
    similar: "Thinking about an AI feature you can actually trust?",
  },
  {
    slug: "travel-memory-aws",
    name: "Travel Memory on AWS",
    tagline: "A MERN app made highly available across two availability zones.",
    category: "Cloud · AWS · Terraform",
    context: "Training project",
    period: "2026 · Hero Vired programme",
    role: "Cloud engineer (graded assignment)",
    summary:
      "A deployment of the open-source Travel Memory MERN app on AWS that survives a server failure without the user noticing: two availability zones, public and internal load balancers, auto scaling and HTTPS, all rebuilt from Terraform.",
    challenge: [
      "Take an app that runs on one machine and make it survive a failed server at peak traffic.",
      "Keep the API off the public internet.",
    ],
    solution: [
      "Cloudflare DNS points to an internet-facing Application Load Balancer that terminates HTTPS with an ACM certificate.",
      "Nginx on each frontend instance serves React and forwards API calls to an internal load balancer.",
      "Backend instances run in private subnets with no public IP; outbound traffic leaves through a NAT gateway.",
      "Frontend and backend auto scaling groups (min 2, max 4) scale on CPU at 50%.",
    ],
    features: [
      { title: "Two availability zones", text: "Public and private subnets in ap-south-1a and ap-south-1c." },
      { title: "Private API", text: "The backend is reachable only through the internal load balancer." },
      { title: "HTTPS", text: "HTTP redirects to HTTPS, TLS 1.3/1.2 policy." },
      { title: "Auto scaling", text: "CPU target tracking for frontend and backend." },
      { title: "Infrastructure as code", text: "VPC, subnets, NAT, security groups, ALBs and ASGs in Terraform." },
    ],
    tech: [
      { group: "AWS", items: ["EC2", "VPC", "ALB (public + internal)", "Auto Scaling", "NAT Gateway", "ACM"] },
      { group: "IaC & edge", items: ["Terraform", "Cloudflare DNS", "Nginx", "pm2"] },
      { group: "Application", items: ["MongoDB Atlas", "Express", "React", "Node.js"] },
    ],
    architecture: {
      layers: [
        { label: "Edge", nodes: [{ name: "Cloudflare DNS", detail: "CNAME → public ALB" }] },
        { label: "Public subnets (2 AZs)", nodes: [{ name: "Public ALB", detail: "HTTPS · ACM" }, { name: "Frontend ASG", detail: "Nginx + React · min 2 / max 4" }, { name: "NAT Gateway" }] },
        { label: "Private subnets (2 AZs)", nodes: [{ name: "Internal ALB", detail: ":3001" }, { name: "Backend ASG", detail: "Express · no public IP" }] },
        { label: "Data", nodes: [{ name: "MongoDB Atlas" }] },
      ],
    },
    contribution: ["Designed and deployed the whole infrastructure, wrote the Terraform and the documentation"],
    challenges: [
      {
        problem: "The frontend must reach a backend that has no public address.",
        solution: "Nginx forwards API paths to an internal load balancer, so the browser only ever talks to the public ALB.",
      },
    ],
    outcomes: ["Was live on a custom domain during grading, then taken down to stop AWS charges; redeployable with terraform apply"],
    cover: {
      src: "/images/projects/devops/travel-memory-architecture.jpg",
      alt: "Travel Memory deployment architecture on AWS: Cloudflare DNS, public and internal load balancers, frontend and backend auto scaling groups across two availability zones, MongoDB Atlas",
      width: 1600,
      height: 983,
      kind: "screen",
      caption: "Deployment architecture, from the project documentation.",
    },
    gallery: [],
    links: [{ label: "Repository, report and diagram", href: "https://github.com/ibrahimasamake/travel-memory-aws-deployment" }],
    services: ["cloud-devops"],
    featured: false,
    similar: "Need your app to survive a server failure?",
  },
  {
    slug: "voting-application",
    name: "Voting application API",
    tagline: "A small Flask and MongoDB Atlas API with duplicate protection and a health check.",
    category: "Backend · Python",
    context: "Training project",
    period: "Aug 2026 · Hero Vired programme",
    role: "Backend developer (assessment)",
    summary:
      "A REST API that records votes for candidates, refuses duplicates, lists results, resets data and reports its own health. Small by design: the focus was a clean API, a cloud database and a documented setup.",
    challenge: ["Record votes reliably in a cloud database without counting the same candidate twice."],
    solution: [
      "Flask routes for voting, results, reset and health.",
      "MongoDB Atlas as the store, with a check before every insert to prevent duplicates.",
      "A health endpoint so a load balancer or monitor can confirm the app is running.",
    ],
    features: [
      { title: "GET /vote/<name>", text: "Records a vote, or answers that it already exists." },
      { title: "GET /results", text: "Returns every recorded vote as JSON." },
      { title: "GET /reset", text: "Clears the vote collection." },
      { title: "GET /health", text: "Confirms the application is running." },
    ],
    tech: [{ group: "Backend", items: ["Python", "Flask", "PyMongo", "MongoDB Atlas"] }],
    architecture: {
      layers: [
        { label: "Client", nodes: [{ name: "Browser or curl" }] },
        { label: "API", nodes: [{ name: "Flask", detail: "/vote · /results · /reset · /health" }] },
        { label: "Data", nodes: [{ name: "MongoDB Atlas", detail: "voteDb.vote" }] },
      ],
    },
    contribution: ["Wrote the API, connected MongoDB Atlas and documented setup and endpoints"],
    challenges: [
      {
        problem: "Prevent duplicate votes for the same candidate.",
        solution: "Look the candidate up before inserting and return a clear message if it already exists.",
      },
    ],
    outcomes: [],
    cover: {
      src: "/images/projects/voting/results.jpg",
      alt: "JSON response from the /results endpoint listing four candidates",
      width: 1000,
      height: 608,
      kind: "screen",
      caption: "The /results endpoint running locally.",
    },
    gallery: [],
    links: [{ label: "Source on GitHub", href: "https://github.com/ibrahimasamake/VotingApplication_Hiro" }],
    services: ["custom-software"],
    featured: false,
    similar: "Need a clean, documented API for your product?",
  },
];

/** Smaller public repositories, listed without a case study. */
export const moreWork = [
  {
    name: "Inventory & sales web app",
    text: "Product inventory and sales with Java 17, Jakarta Servlet, JSP/JSTL, JDBC and MySQL (MVC). MCA coursework.",
    href: "https://github.com/ibrahimasamake/inventory-app-using-java-web-MVC-architecture",
  },
  {
    name: "Student management system",
    text: "Student and department management with Java 17, Jakarta Servlet, JSP/JSTL, JDBC and MySQL. MCA coursework.",
    href: "https://github.com/ibrahimasamake/student-management-system",
  },
  {
    name: "Multi-cloud & DevOps labs",
    text: "Notes and labs from the Hero Vired multi-cloud architecture and DevOps programme.",
    href: "https://github.com/ibrahimasamake/Hero_Vired_DevOps_MultiCloud_Courses",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
