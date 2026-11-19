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
  image: { url: profile.portrait.src, width: profile.portrait.width, height: profile.portrait.height, alt: profile.portrait.alt },
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About"
        title="I build software that businesses run on, and I keep it running."
      />

      <Section className="pt-14 sm:pt-20">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-[2rem] border border-border bg-surface">
              <Image
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                width={profile.portrait.width}
                height={profile.portrait.height}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-square w-full object-cover"
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
              Most small businesses I know in Bamako and Bengaluru run on WhatsApp, a notebook and memory. They are good
              businesses. They are just invisible online, and they rarely know exactly what is left in stock. That is the
              problem I like working on.
            </p>
            <p>
              I started <strong className="font-medium text-fg">SAM Informatique Mali</strong> in {profile.since} to build
              software for local businesses: from understanding what the business needs to delivery and long-term support.
              I still run it, and mentor two junior developers there.
            </p>
            <p>
              In 2024 I founded <Link href="/projects/sougba">Sougba</Link>, a marketplace and shop-management platform for
              Mali. Merchants put their shop online, customers reach them directly, and the owner sees sales and stock from a
              phone through <Link href="/projects/fere">Fere</Link>. I designed it, built it, and run its production on
              Kubernetes myself, with automated deploys, backups and written post-mortems.
            </p>
            <p>
              More recently I built the online store of{" "}
              <Link href="/projects/nafas-perfumes">Nafas Perfumes</Link>, a perfume shop in Bengaluru, and with three
              classmates built <Link href="/projects/rastescan">RasteScan</Link>, a public record of road repairs that won
              Best Socially Relevant Project at the TechKubik National Level Project Expo 2026.
            </p>
            <h2 className="!mt-12 text-2xl font-semibold text-fg">How I work</h2>
            <p>
              What I bring is the whole picture: understanding the business, designing the product, writing the code,
              shipping it and keeping it alive when real customers use it. I prefer simple systems that are easy to run over
              clever ones that need a team to babysit.
            </p>
            <p>
              I keep learning on purpose. I am completing a Master of Computer Applications at CMR University and a
              postgraduate programme in multi-cloud architecture and DevOps with Hero Vired, and I build with AI models where
              they genuinely help, inside rules they cannot break.
            </p>
            <div className="!mt-10">
              <ButtonLink href="/start-a-project" size="lg">
                Work with me <ArrowRight aria-hidden />
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
            lead="Work, products, education and recognition. Dates as on my CV."
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
            title={<span id="expertise-title">What I work with</span>}
            lead="Production experience is separated from project and training work, so you know exactly what to expect."
          />
          <div className="mt-12">
            <TechExpertise />
          </div>
        </div>
      </Section>

      <Section className="border-t border-border bg-surface/30 py-16 sm:py-20" aria-labelledby="shop-title">
        <div className="container-page grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
          <div className="overflow-hidden rounded-3xl border border-border">
            <Image
              src="/images/about/sam-informatique-shop.webp"
              alt="Ibrahima Samake behind the counter of the SAM Informatique Mali shop, with two laptops and shelves of phone accessories"
              width={765}
              height={1020}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="aspect-[4/3] w-full object-cover object-[50%_35%]"
            />
          </div>
          <div>
            <p className="eyebrow">Where it started</p>
            <h2 id="shop-title" className="mt-4 text-3xl font-semibold text-fg">
              A shop counter in Bamako
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              SAM Informatique Mali started as software and IT support for local businesses. Working next to shop owners
              every day is why every product I build starts with how the business really works, and why it has to run on the
              phone they already own.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
