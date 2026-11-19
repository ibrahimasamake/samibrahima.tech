import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ChaiArt } from "@/components/visuals/misc-art";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-24 text-center">
      <div className="max-w-lg">
        <ChaiArt />
        <p className="eyebrow mt-6">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-fg sm:text-5xl">This page went for chai and never came back.</h1>
        <p className="mt-4 text-lg text-muted">It may have moved when the site was rebuilt. These places are very much here:</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            Projects
          </ButtonLink>
          <ButtonLink href="/start-a-project" variant="secondary">
            Start a project <ArrowRight aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
