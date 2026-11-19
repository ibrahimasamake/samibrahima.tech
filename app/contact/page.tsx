import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { profile, socialLinks } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Ibrahima Samake about a website, mobile app, custom software, cloud or AI project. Email, LinkedIn, GitHub or the contact form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        title="Say hello. We don't bite."
        lead="A question, a crazy idea, a partnership, or a project that does not fit in a form. Every message gets a real reply, in English or French."
      />
      <div className="container-page grid gap-12 py-14 sm:py-20 lg:grid-cols-[22rem_1fr] lg:gap-16">
        <div className="grid content-start gap-8">
          <div className="rounded-3xl border border-accent/30 bg-accent-soft p-6">
            <p className="font-semibold text-fg">Planning a project?</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              The project form asks the right questions, so the reply can come with a scope and a cost range.
            </p>
            <ButtonLink href="/start-a-project" className="mt-5 w-full">
              Start your project <ArrowRight aria-hidden />
            </ButtonLink>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-subtle">Email</h2>
            <a href={`mailto:${profile.email}`} className="mt-2 inline-flex items-center gap-2 break-all text-lg text-fg hover:text-accent">
              <Mail className="size-5 shrink-0" aria-hidden /> {profile.email}
            </a>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-subtle">Profiles</h2>
            <ul className="mt-3 grid gap-2">
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer me" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
                    {s.label} <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-subtle">Based in</h2>
            <p className="mt-2 text-muted">
              {profile.basedIn}. {profile.workMode}.
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
