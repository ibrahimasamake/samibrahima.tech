import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

const known = {
  projects: new Set<string>(projects.map((p) => p.slug)),
  services: new Set<string>(services.map((s) => s.slug)),
};

/**
 * 1. Serve the French pages kept from the previous static site at /fr/
 *    (they use relative links, so the trailing slash matters).
 * 2. Return a real 404 status for unknown case-study or service URLs.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/fr") return NextResponse.redirect(new URL("/fr/", request.url), 308);
  if (pathname === "/fr/") return NextResponse.rewrite(new URL("/fr/index.html", request.url));

  const match = pathname.match(/^\/(projects|services)\/([^/]+)\/?$/);
  if (match) {
    const [, section, slug] = match as unknown as [string, keyof typeof known, string];
    if (!known[section].has(slug)) {
      return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/fr", "/fr/", "/projects/:slug", "/services/:slug"],
};
