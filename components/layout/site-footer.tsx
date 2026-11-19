import Link from "next/link";
import { mainNav, profile, socialLinks } from "@/data/profile";
import { services } from "@/data/services";
import { Logo } from "./logo";

export function SiteFooter() {
  // Static export: the year is set when the site is built.
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {profile.positioning}. Websites, mobile apps and custom software, from idea to production. Working remotely
            from {profile.basedIn}.
          </p>
          <a href={`mailto:${profile.email}`} className="mt-4 inline-block text-sm text-fg underline-offset-4 hover:underline">
            {profile.email}
          </a>
        </div>
        <FooterCol title="Services" links={services.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))} />
        <FooterCol
          title="Studio"
          links={[
            ...mainNav.filter((n) => n.href !== "/services"),
            { label: "Start a project", href: "/start-a-project" },
          ]}
        />
        <FooterCol
          title="Elsewhere"
          links={[...socialLinks, { label: "Version française", href: "/fr/" }]}
          external
        />
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Ibrahima Samake. All rights reserved.</p>
          <p className="flex gap-4">
            <Link href="/privacy" className="hover:text-fg">
              Privacy policy
            </Link>
            <span>No tracking cookies</span>
            <span>Made in Bamako &amp; Bengaluru</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  external,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <h2 className="font-mono text-xs uppercase tracking-wider text-subtle">{title}</h2>
      <ul className="mt-4 grid gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            {external || l.href.endsWith("/") ? (
              <a
                href={l.href}
                className="text-sm text-muted hover:text-fg"
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer me" } : { hrefLang: "fr" })}
              >
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="text-sm text-muted hover:text-fg">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
