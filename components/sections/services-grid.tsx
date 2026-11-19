import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { services } from "@/data/services";
import { ServiceIcon } from "./service-icon";

export function ServicesGrid({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ul className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <Reveal as="li" key={s.slug} delay={(i % 3) * 0.06} className="bg-surface">
          <Link
            href={`/services/${s.slug}`}
            className="group relative flex h-full flex-col p-7 transition-colors hover:bg-surface-2 sm:p-8"
          >
            <span className="grid size-11 place-items-center rounded-xl border border-border bg-bg text-accent transition-colors group-hover:border-accent/40">
              <ServiceIcon slug={s.slug} className="size-5" />
            </span>
            <H className="mt-6 text-lg font-semibold text-fg">{s.name}</H>
            <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{s.short}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
              Learn more
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
