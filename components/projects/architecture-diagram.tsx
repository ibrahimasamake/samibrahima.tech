import type { Project } from "@/data/projects";

/**
 * Layered architecture diagram drawn from data, in HTML so it reflows on
 * phones and reads correctly with a screen reader (an ordered list of layers).
 */
export function ArchitectureDiagram({ architecture }: { architecture: NonNullable<Project["architecture"]> }) {
  return (
    <figure className="rounded-3xl border border-border bg-surface p-4 sm:p-8 bg-grid">
      <ol className="grid gap-3">
        {architecture.layers.map((layer, i) => (
          <li key={layer.label} className="relative">
            {i > 0 && (
              <span aria-hidden className="mx-auto mb-3 block h-5 w-px bg-gradient-to-b from-border-strong to-accent/70" />
            )}
            <div className="rounded-2xl border border-border bg-bg/70 p-3 sm:p-4">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-subtle">{layer.label}</p>
              <ul className="grid gap-2 sm:grid-cols-[repeat(auto-fit,minmax(170px,1fr))]">
                {layer.nodes.map((node) => (
                  <li key={node.name} className="rounded-xl border border-border-strong bg-surface px-3.5 py-3">
                    <p className="text-sm font-medium text-fg">{node.name}</p>
                    {node.detail && <p className="mt-0.5 text-xs leading-relaxed text-muted">{node.detail}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      {architecture.note && <figcaption className="mt-4 text-sm text-subtle">{architecture.note}</figcaption>}
    </figure>
  );
}
