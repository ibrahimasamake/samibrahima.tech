import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our development process",
  description:
    "How a project runs: discovery, planning, design, development, testing and deployment. Clear outputs at every stage and weekly progress you can try.",
  path: "/process",
});

const principles = [
  { title: "Fixed scope per milestone", text: "Each milestone has an agreed scope and price. Changes are discussed before they are built, never discovered on the invoice." },
  { title: "Weekly, working progress", text: "A preview link you can open on your phone, updated as the work moves. You review software, not slides." },
  { title: "One point of contact", text: "The person you talk to is the person building your product. No telephone game, no account managers." },
  { title: "You own everything", text: "Code repository, domain, hosting and app-store accounts are in your name from the start." },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Process", path: "/process" }]}
        eyebrow="Process"
        title="From first coffee to launch day."
        lead="Six stages, each ending with something concrete you can review. You always know what is being built, why, and what comes next."
      >
        <ButtonLink href="/start-a-project" size="lg">
          Start with discovery <ArrowRight aria-hidden />
        </ButtonLink>
      </PageHeader>
      <Section>
        <div className="container-page">
          <ProcessSteps detailed />
        </div>
      </Section>
      <Section className="border-t border-border bg-surface/30" aria-labelledby="principles-title">
        <div className="container-page">
          <SectionHeading eyebrow="How we work" title={<span id="principles-title">What you can count on</span>} />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {principles.map((p) => (
              <li key={p.title} className="rounded-2xl border border-border bg-surface p-7">
                <h3 className="font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
