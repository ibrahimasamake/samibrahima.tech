"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-24 text-center">
      <div className="max-w-lg">
        <p className="eyebrow">Error</p>
        <h1 className="mt-4 text-4xl font-semibold text-fg">Something went wrong.</h1>
        <p className="mt-4 text-lg text-muted">Please try again. If it keeps happening, the email address in the footer always works.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/" variant="secondary">
            Home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
