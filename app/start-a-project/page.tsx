import { Clock, Lock, MessageSquare } from "lucide-react";
import { Suspense } from "react";
import { ProjectEnquiryForm } from "@/components/forms/project-enquiry-form";
import { PageHeader } from "@/components/layout/page-header";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Start a project",
  description:
    "Tell me about your website, mobile app or custom software project. Five short steps; you get a reply on scope, timeline and cost.",
  path: "/start-a-project",
});

const notes = [
  { icon: Clock, title: "About 3 minutes", text: "Five short steps. Only the essentials." },
  { icon: MessageSquare, title: "A real reply", text: "I read every enquiry myself and answer with questions or a proposal." },
  { icon: Lock, title: "Private", text: "Your answers are sent to me by email and not stored on this site." },
];

export default function StartProjectPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Start a project", path: "/start-a-project" }]}
        eyebrow="Start a project"
        title="Tell me what you want to build."
        lead="Share a few details and I will come back with how I would approach it, a realistic timeline and a cost range. No obligation."
      />
      <div className="container-page grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_20rem] lg:gap-14">
        <Suspense fallback={<div className="h-[560px] animate-pulse rounded-3xl border border-border bg-surface" aria-label="Loading form" />}>
          <ProjectEnquiryForm />
        </Suspense>
        <aside className="grid content-start gap-6">
          {notes.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-surface text-accent">
                <Icon className="size-[18px]" aria-hidden />
              </span>
              <div>
                <p className="font-medium text-fg">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </div>
          ))}
          <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-muted">
            Prefer email? Write to{" "}
            <a href={`mailto:${profile.email}`} className="break-all text-fg underline underline-offset-4">
              {profile.email}
            </a>
            . I reply in English or French.
          </div>
        </aside>
      </div>
    </>
  );
}
