import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { ServiceIcon } from "@/components/sections/service-icon";
import { ButtonLink } from "@/components/ui/button";
import { getProject } from "@/data/projects";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Software development services",
  description:
    "Web development, mobile apps, custom business software, e-commerce, cloud & DevOps and AI automation. Founder-led, from idea to production.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Services"
        title="Everything it takes to put your product in production."
        lead="Pick one service or combine them. Most projects mix a web app, a mobile app and the infrastructure to run both, and you deal with one person for all of it."
      >
        <ButtonLink href="/start-a-project" size="lg">
          Start your project <ArrowRight aria-hidden />
        </ButtonLink>
      </PageHeader>

      <div className="container-page grid gap-6 py-20 sm:py-24">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={0.04}>
            <article
              id={s.slug}
              className="grid gap-8 rounded-3xl border border-border bg-surface p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl border border-border bg-bg text-accent">
                    <ServiceIcon slug={s.slug} className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-fg sm:text-3xl">{s.name}</h2>
                <p className="mt-3 leading-relaxed text-muted">{s.summary}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href={`/services/${s.slug}`}>Explore {s.name.toLowerCase()}</ButtonLink>
                </div>
                {s.proof.length > 0 && (
                  <p className="mt-6 text-sm text-subtle">
                    Proof:{" "}
                    {s.proof.map((slug, j) => {
                      const p = getProject(slug);
                      return p ? (
                        <span key={slug}>
                          {j > 0 && ", "}
                          <Link href={`/projects/${slug}`} className="text-muted underline-offset-4 hover:text-fg hover:underline">
                            {p.name}
                          </Link>
                        </span>
                      ) : null;
                    })}
                  </p>
                )}
              </div>
              <ul className="grid content-start gap-x-8 gap-y-5 sm:grid-cols-2">
                {s.offerings.map((o) => (
                  <li key={o.title} className="border-t border-border pt-4">
                    <h3 className="font-medium text-fg">{o.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{o.text}</p>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
      <CtaBand title="Not sure which service you need?" text="Describe the problem instead. I will suggest the simplest solution that solves it, and tell you honestly if you do not need custom software at all." />
    </>
  );
}
