import Link from "next/link";
import { categories, categorySlug, getAllPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function CategoryNav({ active }: { active?: string }) {
  const posts = getAllPosts();
  const items = [
    { label: "All", href: "/blog/", count: posts.length, current: !active },
    ...categories
      .map((c) => ({
        label: c,
        href: `/blog/category/${categorySlug(c)}/`,
        count: posts.filter((p) => p.category === c).length,
        current: active === c,
      }))
      .filter((c) => c.count > 0),
  ];
  return (
    <nav aria-label="Blog categories">
      <ul className="flex flex-wrap gap-2">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              aria-current={i.current ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                i.current ? "border-accent bg-accent-soft text-fg" : "border-border bg-surface text-muted hover:border-border-strong hover:text-fg",
              )}
            >
              {i.label}
              <span className="font-mono text-xs text-subtle">{i.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
