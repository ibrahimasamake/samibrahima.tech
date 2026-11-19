import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  large,
  priority,
  headingLevel = "h3",
}: {
  project: Project;
  large?: boolean;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const techs = project.tech.flatMap((t) => t.items).slice(0, 4);
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-border-strong",
        large && "lg:grid lg:grid-cols-[1.25fr_1fr]",
      )}
    >
      <div className={cn("relative overflow-hidden bg-surface-2", large ? "aspect-[16/10] lg:aspect-auto lg:min-h-[420px]" : "aspect-[16/10]")}>
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          priority={priority}
          sizes={large ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" aria-hidden />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="eyebrow">{project.category}</p>
        <H className={cn("mt-3 font-semibold text-fg", large ? "text-2xl sm:text-3xl" : "text-xl")}>
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.name}
          </Link>
        </H>
        <p className="mt-3 leading-relaxed text-muted">{large ? project.summary : project.tagline}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {techs.map((t) => (
            <li key={t}>
              <Badge>{t}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between pt-6 text-sm">
          <span className="text-subtle">{project.context}</span>
          <span className="inline-flex items-center gap-1 font-medium text-fg">
            Read case study
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </div>
      </div>
      {/* Visible focus ring for the stretched link */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl ring-ring group-has-[a:focus-visible]:ring-2" />
    </article>
  );
}
