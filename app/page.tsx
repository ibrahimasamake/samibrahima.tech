import { ArrowRight, ArrowUpRight, Award, Check, Hammer, PenLine, Rocket } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { PostCard } from "@/components/blog/post-card";
import { ProjectCard } from "@/components/projects/project-card";
import { CtaBand } from "@/components/sections/cta-band";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { StoryArt } from "@/components/visuals/story-art";
import { ServicesGrid } from "@/components/sections/services-grid";
import { TechExpertise } from "@/components/sections/tech-expertise";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { nowItems } from "@/data/now";
import { reasons } from "@/data/process";
import { profile, siteConfig } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { ReasonIcon } from "@/components/visuals/icons";

export const metadata = pageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
});

const proof = [
  { name: "Sougba", text: "Marketplace for Mali, web + Android", href: "/projects/sougba/" },
  { name: "Fere", text: "Till and stock for shops", href: "/projects/fere/" },
  { name: "Nafas Perfumes", text: "Online shop, Bengaluru", href: "/projects/nafas-perfumes/" },
  { name: "RasteScan", text: "National expo award, 2026", href: "/projects/rastescan/", award: true },
];

const statusStyle = {
  live: { label: "Live", dot: "bg-success", text: "text-success", icon: Rocket },
  building: { label: "Building", dot: "bg-accent", text: "text-accent", icon: Hammer },
  writing: { label: "Writing", dot: "bg-amber-400", text: "text-amber-500 dark:text-amber-300", icon: PenLine },
} as const;

export default function HomePage() {
  const [lead, ...rest] = featuredProjects;
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
        <div aria-hidden className="animate-drift absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-accent/20 blur-[120px]" />
        <div className="container-page relative grid items-center gap-14 pt-12 pb-20 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pt-24 lg:pb-28">
          <div>
            {profile.availability.show && (
              <p className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 py-1.5 pr-4 pl-3 text-sm text-muted backdrop-blur">
                <span className="animate-pulse-dot size-2 rounded-full bg-success" aria-hidden />
                {profile.availability.label}
              </p>
            )}
            <h1
              className="animate-settle mt-7 text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.035em] text-fg sm:text-6xl lg:text-[4.2rem]"
              style={{ ["--delay" as string]: "80ms" }}
            >
              We build digital products that <span className="text-accent">move businesses forward.</span>
            </h1>
            <p className="animate-settle mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={{ ["--delay" as string]: "160ms" }}>
              Need a website, a mobile app or software made for the way you work? We turn good ideas into products people
              actually enjoy using, then keep them running long after launch day.
            </p>
            <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ ["--delay" as string]: "240ms" }}>
              <ButtonLink href="/start-a-project/" size="lg">
                Start your project <ArrowRight aria-hidden />
              </ButtonLink>
              <ButtonLink href="/projects/" variant="secondary" size="lg">
                Explore our work
              </ButtonLink>
            </div>
            <ul className="animate-rise mt-10 grid gap-2.5 text-sm text-muted sm:grid-cols-2" style={{ ["--delay" as string]: "320ms" }}>
              {[
                `Building for businesses since ${profile.since}`,
                "Web, Android and iOS, one conversation",
                "Launch, backups and support included",
                "English or French, your choice",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-rise" style={{ ["--delay" as string]: "200ms" }}>
            <ProductShowcase />
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

      {/* ---------- Story ---------- */}
      <Section aria-labelledby="story-title">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Why we do this</p>
            <h2 id="story-title" className="mt-4 text-3xl leading-tight font-semibold text-fg sm:text-4xl">
              Great businesses shouldn&apos;t be invisible online.
            </h2>
            <div className="mt-10 overflow-hidden rounded-3xl border border-border">
              <StoryArt />
            </div>
          </Reveal>
          <Reveal delay={0.08} className="prose-body text-lg">
            <p className="text-xl text-fg/90">
              Most small shops in Bamako and Bengaluru still run on WhatsApp, a notebook and memory. They are good
              businesses. They are just invisible online, and they rarely know exactly what is left in stock.
            </p>
            <p>
              That is the problem we love working on. A perfume counter that now sells to customers who never walked past
              it. Shops that see today&apos;s sales on their phone instead of counting at night. A city road reported with a
              photo and followed all the way to the repair.
            </p>
            <p>
              What we bring is the whole picture: understanding what the business needs, building it, shipping it, and
              keeping it alive when real customers use it. Small businesses don&apos;t need complicated software. They need
              something that works on day one and keeps working.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Services ---------- */}
      <Section id="services" aria-labelledby="services-title" className="border-t border-border bg-surface/30">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="What we build"
              title={<span id="services-title">Whatever stage you are at, we have got you.</span>}
              lead="From a first website to a platform with web, mobile and cloud infrastructure: one team, from the first chat to production."
            />
            <ButtonLink href="/services/" variant="secondary" className="self-start md:self-end">
              All services
            </ButtonLink>
          </div>
          <div className="mt-12">
            <ServicesGrid />
          </div>
        </div>
      </Section>

      {/* ---------- Work ---------- */}
      <Section id="work" aria-labelledby="work-title">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title={<span id="work-title">Real products. Real users. Still running.</span>}
              lead="Each one started with a business problem. Here is what was built, how, and what changed for the people using it."
            />
            <ButtonLink href="/projects/" variant="secondary" className="self-start md:self-end">
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

      {/* ---------- Now ---------- */}
      <Section aria-labelledby="now-title" className="border-t border-border bg-surface/30">
        <div className="container-page">
          <SectionHeading
            eyebrow="On the workbench"
            title={<span id="now-title">What we are working on right now.</span>}
            lead="Some of it is live, some of it is still covered in sawdust."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nowItems.map((n, i) => {
              const st = statusStyle[n.status];
              const body = (
                <>
                  <div className="flex items-center justify-between">
                    <p className={cn("inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider", st.text)}>
                      <span className={cn("size-1.5 rounded-full", st.dot, n.status !== "live" && "animate-pulse")} aria-hidden />
                      {st.label}
                    </p>
                    <span className={cn("grid size-9 place-items-center rounded-xl border border-border bg-bg", st.text)}>
                      <st.icon className="size-4" aria-hidden />
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold text-fg">{n.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{n.text}</p>
                  {n.href && (
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-fg">
                      Take a look <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  )}
                </>
              );
              return (
                <Reveal as="li" key={n.title} delay={(i % 3) * 0.05}>
                  {n.href ? (
                    <Link href={n.href} className="block h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong">
                      {body}
                    </Link>
                  ) : (
                    <div className="h-full rounded-2xl border border-dashed border-border-strong bg-surface p-6">{body}</div>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* ---------- Why us ---------- */}
      <Section aria-labelledby="why-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why work with us"
            title={<span id="why-title">Built for your business, long after launch.</span>}
          />
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={(i % 4) * 0.05}>
                <ReasonIcon index={i} />
                <h3 className="mt-5 font-semibold text-fg">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{r.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------- Process ---------- */}
      <Section aria-labelledby="process-title" className="border-t border-border bg-surface/30">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="How we work"
              title={<span id="process-title">No mystery. No surprise invoices.</span>}
              lead="Six clear stages, each ending with something you can see, click and comment on."
            />
            <ButtonLink href="/process/" variant="secondary" className="self-start md:self-end">
              The process in detail
            </ButtonLink>
          </div>
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </div>
      </Section>

      {/* ---------- Blog ---------- */}
      {posts.length > 0 && (
        <Section aria-labelledby="blog-title">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="From the blog"
                title={<span id="blog-title">Fresh from the workshop.</span>}
                lead="Architecture, tools, cloud, AI and the occasional thing that broke at 2 a.m."
              />
              <ButtonLink href="/blog/" variant="secondary" className="self-start md:self-end">
                Read the blog
              </ButtonLink>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ---------- Tech ---------- */}
      <Section aria-labelledby="tech-title" className="border-t border-border bg-surface/30">
        <div className="container-page">
          <SectionHeading
            eyebrow="Technology"
            title={<span id="tech-title">Tools that have earned their place.</span>}
            lead="Picked because they hold up in production, not because they trended this week. Each one is marked with where it has been used."
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
