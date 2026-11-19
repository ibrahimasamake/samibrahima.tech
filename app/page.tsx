import { ArrowRight, ArrowUpRight, Award, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { CtaBand } from "@/components/sections/cta-band";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ServicesGrid } from "@/components/sections/services-grid";
import { TechExpertise } from "@/components/sections/tech-expertise";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { reasons } from "@/data/process";
import { profile, siteConfig } from "@/data/profile";
import { featuredProjects, getProject } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
});

const proof = [
  { name: "Sougba", text: "Marketplace for Mali, web + Android", href: "/projects/sougba" },
  { name: "Fere", text: "Point of sale and stock for shops", href: "/projects/fere" },
  { name: "Nafas Perfumes", text: "Online shop, Bengaluru", href: "/projects/nafas-perfumes" },
  { name: "RasteScan", text: "National expo award, 2026", href: "/projects/rastescan", award: true },
];

export default function HomePage() {
  const [lead, ...rest] = featuredProjects;
  const sougba = getProject("sougba")!;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
        <div aria-hidden className="animate-drift absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-accent/20 blur-[120px]" />
        <div className="container-page relative grid items-center gap-14 pt-12 pb-20 sm:pt-20 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:pt-24 lg:pb-28">
          <div>
            {profile.availability.show && (
              <p className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 py-1.5 pr-4 pl-3 text-sm text-muted backdrop-blur">
                <span className="animate-pulse-dot size-2 rounded-full bg-success" aria-hidden />
                {profile.availability.label}
              </p>
            )}
            <h1
              className="animate-settle mt-7 text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.035em] text-fg sm:text-6xl lg:text-[4.4rem]"
              style={{ ["--delay" as string]: "80ms" }}
            >
              We build digital products that <span className="text-accent">move businesses forward.</span>
            </h1>
            <p
              className="animate-settle mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
              style={{ ["--delay" as string]: "160ms" }}
            >
              {profile.intro} From idea to production: websites, mobile apps and custom software, designed, built and
              deployed by the engineer you talk to.
            </p>
            <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ ["--delay" as string]: "240ms" }}>
              <ButtonLink href="/start-a-project" size="lg">
                Start your project <ArrowRight aria-hidden />
              </ButtonLink>
              <ButtonLink href="/projects" variant="secondary" size="lg">
                Explore our work
              </ButtonLink>
            </div>
            <ul
              className="animate-rise mt-10 grid gap-2.5 text-sm text-muted sm:grid-cols-2"
              style={{ ["--delay" as string]: "320ms" }}
            >
              {[
                `Building software for businesses since ${profile.since}`,
                "Web, Android and iOS, one point of contact",
                "Deployment, backups and support included",
                "English and French",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-rise relative mx-auto w-full max-w-md lg:max-w-none" style={{ ["--delay" as string]: "200ms" }}>
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface">
              <Image
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                width={profile.portrait.width}
                height={profile.portrait.height}
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
                className="aspect-[4/4.4] w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20">
                <p className="text-lg font-semibold text-white">{profile.name}</p>
                <p className="text-sm text-white/75">{profile.role} · Founder of Sougba</p>
              </div>
            </div>
            <Link
              href="/projects/sougba"
              className="group absolute -top-6 -left-3 hidden w-64 rounded-2xl border border-border bg-surface/95 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:block lg:-left-10"
            >
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-success">
                <span className="size-1.5 rounded-full bg-success" aria-hidden /> In production
              </p>
              <p className="mt-2 text-sm font-medium text-fg">sougba.com</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">
                Marketplace + shop workspace. 10+ services on Kubernetes, run end to end.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs text-fg">
                Case study <ArrowUpRight className="size-3.5" aria-hidden />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Proof strip ---------- */}
      <section aria-label="Products built" className="border-y border-border bg-surface/50">
        <div className="container-page grid grid-cols-2 gap-px lg:grid-cols-4">
          {proof.map((p) => (
            <Link key={p.name} href={p.href} className="group flex flex-col gap-1 px-1 py-6 sm:px-4 sm:py-7">
              <span className="flex items-center gap-2 font-semibold text-fg">
                {p.name}
                {p.award && <Award className="size-4 text-accent" aria-label="Award winner" />}
              </span>
              <span className="text-sm text-muted group-hover:text-fg">{p.text}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <Section id="services" aria-labelledby="services-title">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="What we build"
              title={<span id="services-title">Software for every stage of your business.</span>}
              lead="Whether you need your first website or a platform with web, mobile and cloud infrastructure, one engineer takes it from the first conversation to production."
            />
            <ButtonLink href="/services" variant="secondary" className="self-start md:self-end">
              All services
            </ButtonLink>
          </div>
          <div className="mt-12">
            <ServicesGrid />
          </div>
        </div>
      </Section>

      {/* ---------- Work ---------- */}
      <Section id="work" aria-labelledby="work-title" className="border-t border-border bg-surface/30">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title={<span id="work-title">Real products, in production.</span>}
              lead="Each project started with a business problem. Here is what was built, how, and what changed."
            />
            <ButtonLink href="/projects" variant="secondary" className="self-start md:self-end">
              All projects
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-6">
            <Reveal>
              <ProjectCard project={lead} large />
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {rest.slice(0, 4).map((p, i) => (
                <Reveal key={p.slug} delay={(i % 2) * 0.08}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- Founder intro ---------- */}
      <Section aria-labelledby="founder-title">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Who you work with"
              title={<span id="founder-title">You talk to the engineer who builds your product.</span>}
            />
            <div className="prose-body mt-6 text-lg">
              <p>
                I&apos;m Ibrahima Samake. I started SAM Informatique Mali in {profile.since} to build software for local
                businesses, and in 2024 founded <Link href="/projects/sougba">Sougba</Link>, a marketplace and
                shop-management platform I designed, built and still run in production.
              </p>
              <p>
                No account managers, no hand-offs. I understand the business problem, design the solution, write the
                code and deploy it, then stay around to keep it running.
              </p>
            </div>
            <ButtonLink href="/about" variant="link" className="mt-6">
              More about me <ArrowRight aria-hidden />
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
              {sougba.outcomes.slice(0, 4).map((o, i) => (
                <div key={o} className="bg-surface p-6">
                  <dt className="font-mono text-xs text-accent">Sougba · {String(i + 1).padStart(2, "0")}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-fg/90">{o}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Why us ---------- */}
      <Section aria-labelledby="why-title" className="border-t border-border bg-surface/30">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why work with us"
            title={<span id="why-title">Built to work for your business, long after launch.</span>}
          />
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={(i % 4) * 0.05}>
                <span className="block h-px w-10 bg-accent" aria-hidden />
                <h3 className="mt-5 font-semibold text-fg">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{r.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------- Process ---------- */}
      <Section aria-labelledby="process-title">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="How we work"
              title={<span id="process-title">A clear process, from first call to launch.</span>}
              lead="Six stages, with something concrete for you to review at the end of each one."
            />
            <ButtonLink href="/process" variant="secondary" className="self-start md:self-end">
              The process in detail
            </ButtonLink>
          </div>
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </div>
      </Section>

      {/* ---------- Tech ---------- */}
      <Section aria-labelledby="tech-title" className="border-t border-border bg-surface/30">
        <div className="container-page">
          <SectionHeading
            eyebrow="Technology"
            title={<span id="tech-title">The stack I run in production.</span>}
            lead="Chosen for reliability and long-term maintenance. Each technology is marked with where it has been used."
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
