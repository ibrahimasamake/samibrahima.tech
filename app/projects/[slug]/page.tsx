import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/animations/reveal";
import { JsonLd } from "@/components/layout/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { ScreenFrame } from "@/components/projects/screen-frame";
import { ServiceIcon } from "@/components/sections/service-icon";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { profile, siteConfig } from "@/data/profile";
import { getProject, projects } from "@/data/projects";
import { getService } from "@/data/services";
import { graph, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}


export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name} — case study`,
    description: `${p.tagline} ${p.summary}`.slice(0, 158),
    path: `/projects/${p.slug}`,
    type: "article",
    image: { url: p.cover.src, width: p.cover.width, height: p.cover.height, alt: p.cover.alt },
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const index = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      <PageHeader
        crumbs={[
          { name: "Work", path: "/projects" },
          { name: p.name, path: `/projects/${p.slug}` },
        ]}
        eyebrow={p.category}
        title={p.name}
        lead={p.tagline}
      >
        <dl className="grid gap-x-10 gap-y-4 text-sm sm:grid-cols-3">
          <Meta label="Type" value={p.context} />
          <Meta label="Period" value={p.period} />
          <Meta label="Role" value={p.role} />
        </dl>
        {p.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {p.links.map((l, i) => (
              <ButtonLink key={l.href} href={l.href} variant={i === 0 ? "primary" : "secondary"}>
                {l.label} <ArrowUpRight aria-hidden />
              </ButtonLink>
            ))}
          </div>
        )}
      </PageHeader>

      {/* Cover */}
      <div className="container-page -mt-px pt-12 sm:pt-16">
        <ScreenFrame image={p.cover} priority sizes="(min-width: 1216px) 1152px, 100vw" />
      </div>

      <div className="container-page grid gap-16 py-16 sm:py-24 lg:grid-cols-[1fr_17rem] lg:gap-20">
        <div className="min-w-0 space-y-20">
          <Block title="Overview">
            <p className="text-xl leading-relaxed text-fg/90">{p.summary}</p>
          </Block>

          <div className="grid gap-10 md:grid-cols-2">
            <Block title="The business challenge" small>
              <div className="prose-body">
                {p.challenge.map((c) => (
                  <p key={c}>{c}</p>
                ))}
              </div>
            </Block>
            <Block title="The solution" small>
              <ul className="grid gap-3">
                {p.solution.map((s) => (
                  <li key={s} className="flex gap-3 leading-relaxed text-muted">
                    <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          <Block title="Main features">
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f.title} className="bg-surface p-5">
                  <h3 className="font-medium text-fg">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{f.text}</p>
                </li>
              ))}
            </ul>
          </Block>

          {p.gallery.length > 0 && (
            <Block title="Screens">
              <div className="grid items-start gap-8 sm:grid-cols-2">
                {p.gallery.map((g) => (
                  <Reveal key={g.src}>
                    <ScreenFrame image={g} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
                  </Reveal>
                ))}
              </div>
            </Block>
          )}

          {p.architecture && (
            <Block title="Architecture">
              <ArchitectureDiagram architecture={p.architecture} />
            </Block>
          )}

          <Block title="Technologies">
            <dl className="grid gap-5 sm:grid-cols-2">
              {p.tech.map((t) => (
                <div key={t.group}>
                  <dt className="font-mono text-xs uppercase tracking-wider text-subtle">{t.group}</dt>
                  <dd className="mt-2.5 flex flex-wrap gap-1.5">
                    {t.items.map((i) => (
                      <Badge key={i}>{i}</Badge>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block title="Technical challenges">
            <ol className="grid gap-4">
              {p.challenges.map((c, i) => (
                <li key={c.problem} className="rounded-2xl border border-border bg-surface p-6">
                  <p className="font-mono text-xs text-accent">Challenge {String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-2 font-medium text-fg">{c.problem}</p>
                  <p className="mt-3 leading-relaxed text-muted">
                    <span className="font-medium text-fg">Solution. </span>
                    {c.solution}
                  </p>
                </li>
              ))}
            </ol>
          </Block>

          <div className="grid gap-10 md:grid-cols-2">
            <Block title="My contribution" small>
              <ul className="grid gap-3">
                {p.contribution.map((c) => (
                  <li key={c} className="flex gap-3 leading-relaxed text-muted">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </Block>
            {p.outcomes.length > 0 && (
              <Block title="Outcomes" small>
                <ul className="grid gap-3">
                  {p.outcomes.map((o) => (
                    <li key={o} className="flex gap-3 leading-relaxed text-muted">
                      <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden />
                      {o}
                    </li>
                  ))}
                </ul>
              </Block>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-surface p-6">
            <p className="font-semibold text-fg">{p.similar}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Tell me about your business. I will reply with how I would approach it.
            </p>
            <ButtonLink href="/start-a-project" className="mt-5 w-full">
              Discuss a similar project <ArrowRight aria-hidden />
            </ButtonLink>
          </div>
          <div className="mt-6 px-1">
            <h2 className="font-mono text-xs uppercase tracking-wider text-subtle">Related services</h2>
            <ul className="mt-3 grid gap-1">
              {p.services.map((slug) => {
                const s = getService(slug)!;
                return (
                  <li key={slug}>
                    <Link href={`/services/${slug}`} className="flex items-center gap-2.5 rounded-lg py-1.5 text-sm text-muted hover:text-fg">
                      <ServiceIcon slug={slug} className="size-4" />
                      {s.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>

      {/* Next project */}
      <nav aria-label="More projects" className="container-page flex flex-col justify-between gap-4 border-t border-border py-10 sm:flex-row sm:items-center">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
          <ArrowLeft className="size-4" aria-hidden /> All projects
        </Link>
        <Link href={`/projects/${next.slug}`} className="group text-right">
          <span className="block font-mono text-xs uppercase tracking-wider text-subtle">Next case study</span>
          <span className="mt-1 inline-flex items-center gap-2 text-xl font-semibold text-fg">
            {next.name}
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
        </Link>
      </nav>

      <JsonLd
        data={graph({
          "@type": "CreativeWork",
          "@id": `${siteConfig.url}/projects/${p.slug}#work`,
          name: p.name,
          headline: `${p.name}: ${p.tagline}`,
          description: p.summary,
          url: `${siteConfig.url}/projects/${p.slug}`,
          image: absoluteUrl(p.cover.src),
          creator: { "@type": "Person", name: profile.name, url: siteConfig.url },
          keywords: p.tech.flatMap((t) => t.items).join(", "),
          inLanguage: "en",
        })}
      />
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-wider text-subtle">{label}</dt>
      <dd className="mt-1 text-fg">{value}</dd>
    </div>
  );
}

function Block({ title, small, children }: { title: string; small?: boolean; children: React.ReactNode }) {
  return (
    <section>
      <h2 className={small ? "mb-5 text-xl font-semibold text-fg" : "mb-7 text-2xl font-semibold text-fg sm:text-3xl"}>{title}</h2>
      {children}
    </section>
  );
}
