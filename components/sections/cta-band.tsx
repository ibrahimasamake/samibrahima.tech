import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { profile } from "@/data/profile";

export function CtaBand({
  title = "Have a project in mind?",
  text = "Tell me about your business and what you want to build. You will get a clear answer on scope, timeline and cost, usually within two working days.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-page py-20 sm:py-28" aria-labelledby="cta-title">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">
        <div aria-hidden className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div
          aria-hidden
          className="animate-drift absolute -top-1/2 left-1/2 h-[120%] w-[70%] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 id="cta-title" className="text-3xl font-semibold text-fg sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/start-a-project" size="lg">
              Start your project <ArrowRight aria-hidden />
            </ButtonLink>
            <ButtonLink href={`mailto:${profile.email}`} variant="secondary" size="lg">
              Email {profile.email}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
