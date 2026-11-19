import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/layout/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCard } from "@/components/projects/project-card";
import { CtaBand } from "@/components/sections/cta-band";
import { ServiceIcon } from "@/components/sections/service-icon";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/data/profile";
import { getProject, type Project } from "@/data/projects";
import { getService, services } from "@/data/services";
import { graph, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}


export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ title: s.seoTitle, description: s.seoDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const proof = s.proof.map(getProject).filter(Boolean) as Project[];
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Services", path: "/services" },
          { name: s.name, path: `/services/${s.slug}` },
        ]}
        eyebrow={s.name}
        title={s.headline}
        lead={s.summary}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/start-a-project?type=${encodeURIComponent(typeFor(s.slug))}`} size="lg">
            Start your project <ArrowRight aria-hidden />
          </ButtonLink>
          {proof[0] && (
            <ButtonLink href={`/projects/${proof[0].slug}`} variant="secondary" size="lg">
              See {proof[0].name}
            </ButtonLink>
          )}
        </div>
      </PageHeader>

      <Section aria-labelledby="offer-title">
        <div className="container-page">
          <SectionHeading eyebrow="What I build" title={<span id="offer-title">What this covers</span>} />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {s.offerings.map((o) => (
              <li key={o.title} className="bg-surface p-7">
                <h3 className="font-semibold text-fg">{o.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{o.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="border-t border-border bg-surface/30" aria-label="Deliverables and fit">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-fg sm:text-3xl">What you get</h2>
            <ul className="mt-6 grid gap-3">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-3 text-muted">
                  <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
            <h3 className="mt-10 font-mono text-xs uppercase tracking-wider text-subtle">Typical stack</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.stack.map((t) => (
                <li key={t}>
                  <Badge>{t}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-surface p-7 sm:p-9">
            <ServiceIcon slug={s.slug} className="size-6 text-accent" />
            <h2 className="mt-5 text-2xl font-semibold text-fg">A good fit if…</h2>
            <ul className="mt-5 grid gap-4">
              {s.goodFit.map((g) => (
                <li key={g} className="border-t border-border pt-4 text-muted">
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {proof.length > 0 && (
        <Section aria-labelledby="proof-title">
          <div className="container-page">
            <SectionHeading
              eyebrow="Proof"
              title={<span id="proof-title">Where I have done this before</span>}
              lead="Real projects, with the business problem, the solution and the architecture."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {proof.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </Section>
      )}

      <Section className="border-t border-border bg-surface/30" aria-labelledby="faq-title">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeading eyebrow="Questions" title={<span id="faq-title">Common questions</span>} />
          <div className="divide-y divide-border rounded-3xl border border-border bg-surface">
            {s.faqs.map((f) => (
              <details key={f.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-fg">
                  {f.q}
                  <span aria-hidden className="text-xl leading-none text-subtle transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <section className="container-page pt-4" aria-label="Other services">
        <h2 className="font-mono text-xs uppercase tracking-wider text-subtle">Other services</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/services/${o.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted hover:border-border-strong hover:text-fg"
              >
                <ServiceIcon slug={o.slug} className="size-4" />
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title={`Let's talk about your ${s.name.toLowerCase()} project.`} />

      <JsonLd
        data={graph({
          "@type": "Service",
          name: s.name,
          serviceType: s.name,
          description: s.seoDescription,
          url: `${siteConfig.url}/services/${s.slug}`,
          provider: { "@id": `${siteConfig.url}/#business` },
          areaServed: "Worldwide",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: s.name,
            itemListElement: s.offerings.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o.title } })),
          },
        }, {
          "@type": "FAQPage",
          mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        })}
      />
    </>
  );
}

/** Maps a service to the matching option in the enquiry form. */
function typeFor(slug: string) {
  return (
    {
      "web-development": "web-app",
      "mobile-apps": "mobile-app",
      "custom-software": "custom-software",
      ecommerce: "ecommerce",
      "cloud-devops": "cloud-devops",
      "ai-automation": "ai-automation",
    } as Record<string, string>
  )[slug];
}
