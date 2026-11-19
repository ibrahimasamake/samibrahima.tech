import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCard } from "@/components/projects/project-card";
import { CtaBand } from "@/components/sections/cta-band";
import { Section } from "@/components/ui/section";
import { moreWork, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects & case studies",
  description:
    "Case studies: Sougba marketplace, Fere point of sale and inventory, Nafas Perfumes online shop, RasteScan civic AI, and cloud & DevOps platforms on Kubernetes and AWS.",
  path: "/projects",
});

export default function ProjectsPage() {
  const [first, ...rest] = projects;
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Work", path: "/projects" }]}
        eyebrow="Work"
        title="Products built, shipped and running."
        lead="Marketplaces, business software, online shops, civic tech and cloud platforms. Each case study shows the business problem, the solution, the architecture and my part in it."
      />
      <Section className="pt-14 sm:pt-16">
        <div className="container-page grid gap-6">
          <ProjectCard project={first} large priority headingLevel="h2" />
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.06}>
                <ProjectCard project={p} headingLevel="h2" />
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <h2 className="text-2xl font-semibold text-fg">More on GitHub</h2>
            <p className="mt-2 text-muted">Smaller projects and coursework, public on GitHub.</p>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {moreWork.map((w) => (
                <li key={w.href}>
                  <a
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
                  >
                    <span className="flex items-center justify-between gap-2 font-medium text-fg">
                      {w.name}
                      <ArrowUpRight className="size-4 text-subtle group-hover:text-fg" aria-hidden />
                    </span>
                    <span className="mt-2 text-sm leading-relaxed text-muted">{w.text}</span>
                    <span className="sr-only">(opens GitHub in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <CtaBand title="Want a product like these?" />
    </>
  );
}
