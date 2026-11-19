import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { TechExpertise } from "@/components/sections/tech-expertise";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { certificates, timeline } from "@/data/experience";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About the founder",
  description:
    "Ibrahima Samake: founder of Sougba and SAM Informatique Mali, full-stack and DevOps engineer building web, mobile and cloud software for businesses since 2018.",
  path: "/about",
  image: {
    url: profile.aboutPortrait.src,
    width: profile.aboutPortrait.width,
    height: profile.aboutPortrait.height,
    alt: profile.aboutPortrait.alt,
  },
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About"
        title="The story behind the work."
      />

      <Section className="pt-14 sm:pt-20">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-[2rem] border border-border bg-surface">
              <Image
                src={profile.aboutPortrait.src}
                alt={profile.aboutPortrait.alt}
                width={profile.aboutPortrait.width}
                height={profile.aboutPortrait.height}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[3/4] w-full object-cover object-top"
              />
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-subtle">Based in</dt>
                <dd className="mt-1 text-fg">{profile.basedIn}</dd>
              </div>
              <div>
                <dt className="text-subtle">Languages</dt>
                <dd className="mt-1 text-fg">{profile.languages.join(", ")}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={profile.cv.en} variant="secondary" size="sm" download>
                <Download aria-hidden /> CV (English)
              </ButtonLink>
              <ButtonLink href={profile.cv.fr} variant="secondary" size="sm" download hrefLang="fr">
                <Download aria-hidden /> CV (français)
              </ButtonLink>
            </div>
          </div>

          <div className="prose-body text-lg">
            <p className="text-xl text-fg/90">
              Most small shops in Bamako and Bengaluru still run on WhatsApp, a notebook and memory. They are good
              businesses. They are just invisible online, and they rarely know exactly what is left in stock. That is the
              problem this work keeps coming back to.
            </p>
            <p>
              It started in {profile.since} with <strong className="font-medium text-fg">SAM Informatique Mali</strong>:
              software and IT support for local businesses, from the first conversation to long-term support, and today
              two junior developers learning the craft along the way.
            </p>
            <p>
              In 2024 came <Link href="/projects/sougba/">Sougba</Link>, a marketplace for Mali. Shops go online by
              neighbourhood, customers reach them directly, and owners see sales and stock from their phone with{" "}
              <Link href="/projects/fere/">Fere</Link>. Designed, built and run in production with automated deploys,
              backups and honest post-mortems.
            </p>
            <p>
              Then the online store of <Link href="/projects/nafas-perfumes/">Nafas Perfumes</Link> in Bengaluru, and{" "}
              <Link href="/projects/rastescan/">RasteScan</Link>, a public record of road repairs built by four classmates,
              which won Best Socially Relevant Project at the TechKubik National Level Project Expo 2026.
            </p>
            <h2 className="!mt-12 text-2xl font-semibold text-fg">The way we like to work</h2>
            <p>
              The whole picture, not just the code: understand the business, design the product, build it, ship it, and keep
              it alive when real customers use it. Simple systems that are easy to run beat clever ones that need a team to
              babysit them.
            </p>
            <p>
              And never stop learning: a Master of Computer Applications at CMR University, a postgraduate programme in
              multi-cloud architecture and DevOps with Hero Vired, and plenty of experiments with AI, always inside rules it
              cannot break. The <Link href="/blog/">blog</Link> is where those lessons get written down.
            </p>
            <div className="!mt-10">
              <ButtonLink href="/start-a-project/" size="lg">
                Let&apos;s build something <ArrowRight aria-hidden />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border bg-surface/30" aria-labelledby="journey-title">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            eyebrow="Experience & learning"
            title={<span id="journey-title">The journey so far</span>}
            lead="Work, products, studies and a prize along the way."
          />
          <ol className="relative grid gap-4 border-l border-border pl-6 sm:pl-8">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 0.04} className="relative">
                <span aria-hidden className="absolute top-7 -left-[29px] size-2.5 rounded-full border-2 border-bg bg-accent sm:-left-[37px]" />
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{t.kind}</Badge>
                    <span className="font-mono text-xs text-subtle">{t.period}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-fg">{t.title}</h3>
                  <p className="text-muted">{t.org}</p>
                  {t.points.length > 0 && (
                    <ul className="mt-3 grid gap-1.5 text-[15px] leading-relaxed text-muted">
                      {t.points.map((p) => (
                        <li key={p} className="flex gap-2.5">
                          <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-subtle" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
            <li className="rounded-2xl border border-border bg-surface p-6">
              <Badge>Certificates</Badge>
              <ul className="mt-3 grid gap-2 text-[15px] text-muted">
                {certificates.map((c) => (
                  <li key={c.name}>
                    <span className="text-fg">{c.name}</span> · {c.date}
                  </li>
                ))}
              </ul>
            </li>
          </ol>
        </div>
      </Section>

      <Section aria-labelledby="expertise-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="Technical expertise"
            title={<span id="expertise-title">The toolbox</span>}
            lead="Production experience is separated from project and training work, so you know exactly what to expect."
          />
          <div className="mt-12">
            <TechExpertise />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
