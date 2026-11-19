import { Clock, Lock, MessageSquare } from "lucide-react";
import { Suspense } from "react";
import { ProjectEnquiryForm } from "@/components/forms/project-enquiry-form";
import { PageHeader } from "@/components/layout/page-header";
import { ChatArt } from "@/components/visuals/misc-art";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Start a project",
  description:
    "Tell us about your website, mobile app or custom software project. Five short steps; you get a reply on scope, timeline and cost.",
  path: "/start-a-project",
});

const notes = [
  { icon: Clock, title: "About 3 minutes", text: "Five short steps. Less time than a coffee." },
  { icon: MessageSquare, title: "A real reply", text: "Every enquiry is read by a human and answered with questions or a proposal. No bots, no autoresponder." },
  { icon: Lock, title: "Private", text: "Your answers go straight to our inbox. This website stores nothing." },
];

export default function StartProjectPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Start a project", path: "/start-a-project" }]}
        eyebrow="Start a project"
        title="So, what are we building?"
        lead="Share a few details and get back an honest plan: how we would approach it, a realistic timeline and a cost range. No obligation, no sales pitch."
        visual={<ChatArt />}
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
            . English or French, both welcome.
          </div>
        </aside>
      </div>
    </>
  );
}
