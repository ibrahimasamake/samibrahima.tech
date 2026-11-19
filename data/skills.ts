/**
 * "production" = used in live products.
 * "project" = used in a delivered team or training project.
 * Keep this honest: it is what the expertise section shows.
 */
export type SkillLevel = "production" | "project";

export type SkillGroup = {
  name: string;
  items: { name: string; level: SkillLevel }[];
};

export const skillGroups: SkillGroup[] = [
  {
    name: "Frontend",
    items: [
      { name: "Angular (SSR)", level: "production" },
      { name: "Next.js", level: "production" },
      { name: "TypeScript", level: "production" },
      { name: "Tailwind CSS", level: "production" },
      { name: "HTML & CSS", level: "production" },
      { name: "React", level: "project" },
    ],
  },
  {
    name: "Mobile",
    items: [
      { name: "Flutter", level: "production" },
      { name: "Dart", level: "production" },
      { name: "Capacitor", level: "project" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Java 21", level: "production" },
      { name: "Spring Boot 3", level: "production" },
      { name: "REST APIs", level: "production" },
      { name: "Kafka", level: "production" },
      { name: "Node.js / Express", level: "project" },
      { name: "Python, FastAPI, Flask", level: "project" },
    ],
  },
  {
    name: "Data",
    items: [
      { name: "PostgreSQL", level: "production" },
      { name: "MongoDB", level: "production" },
      { name: "Redis", level: "production" },
      { name: "MySQL, SQLite", level: "project" },
    ],
  },
  {
    name: "Cloud & DevOps",
    items: [
      { name: "Docker", level: "production" },
      { name: "Kubernetes", level: "production" },
      { name: "Argo CD", level: "production" },
      { name: "Jenkins", level: "production" },
      { name: "GitHub Actions", level: "production" },
      { name: "Ansible", level: "production" },
      { name: "Cloudflare", level: "production" },
      { name: "Linux & Nginx", level: "production" },
      { name: "AWS (EC2, VPC, ALB, ASG, S3)", level: "project" },
      { name: "Terraform", level: "project" },
    ],
  },
  {
    name: "AI",
    items: [
      { name: "LLM & vision APIs (Bedrock, Groq, Azure)", level: "project" },
      { name: "Output validation (Pydantic)", level: "project" },
      { name: "OpenCV", level: "project" },
      { name: "AI-assisted development", level: "production" },
    ],
  },
];
