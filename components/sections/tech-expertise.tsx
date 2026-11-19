import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

export function TechExpertise() {
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-5 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent" aria-hidden /> Used in live products
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full border border-subtle" aria-hidden /> Used in delivered team or training projects
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <div key={g.name} className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-subtle">{g.name}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li
                  key={s.name}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
                    s.level === "production" ? "border-border-strong text-fg" : "border-dashed border-border-strong text-muted",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn("size-1.5 rounded-full", s.level === "production" ? "bg-accent" : "border border-subtle")}
                  />
                  {s.name}
                  <span className="sr-only">{s.level === "production" ? "(used in live products)" : "(used in projects)"}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
