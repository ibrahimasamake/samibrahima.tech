import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbJsonLd, graph } from "@/lib/seo";
import { JsonLd } from "./json-ld";

/** Inner page header with breadcrumbs (visible + structured data). */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
  visual,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  /** Optional illustration shown beside the title on large screens. */
  visual?: ReactNode;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-page relative pt-10 pb-16 sm:pt-14 sm:pb-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-subtle">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="size-3.5" aria-hidden />}
                {i === all.length - 1 ? (
                  <span aria-current="page" className="text-muted">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="hover:text-fg">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className={visual ? "mt-10 grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]" : ""}>
        <div className={visual ? "max-w-3xl" : "mt-10 max-w-3xl"}>
          {eyebrow && <p className="eyebrow animate-rise mb-4">{eyebrow}</p>}
          <h1
            className="animate-settle text-4xl leading-[1.08] font-semibold text-fg sm:text-5xl lg:text-6xl"
            style={{ ["--delay" as string]: "60ms" }}
          >
            {title}
          </h1>
          {lead && (
            <p className="animate-settle mt-6 text-lg leading-relaxed text-muted sm:text-xl" style={{ ["--delay" as string]: "140ms" }}>
              {lead}
            </p>
          )}
          {children && (
            <div className="animate-rise mt-8" style={{ ["--delay" as string]: "220ms" }}>
              {children}
            </div>
          )}
        </div>
        {visual && (
          <div className="animate-rise hidden lg:block" style={{ ["--delay" as string]: "180ms" }}>
            {visual}
          </div>
        )}
        </div>
      </div>
      <JsonLd data={graph(breadcrumbJsonLd(all))} />
    </header>
  );
}
