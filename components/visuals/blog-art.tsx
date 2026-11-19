import type { ReactNode } from "react";
import type { Category } from "@/lib/blog";
import { cn } from "@/lib/utils";

/**
 * Generated cover art for blog posts that have no cover image.
 * The motif depends on the category; the layout varies with the post slug,
 * so every post gets its own picture.
 */

function rng(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function Architecture({ r }: { r: () => number }) {
  const boxes = Array.from({ length: 5 }, (_, i) => ({ x: 40 + i * 110 + r() * 30, y: 60 + r() * 170, w: 70 + r() * 20 }));
  return (
    <>
      {boxes.slice(1).map((b, i) => (
        <path
          key={i}
          d={`M${boxes[i].x + boxes[i].w} ${boxes[i].y + 22} C ${boxes[i].x + boxes[i].w + 40} ${boxes[i].y + 22}, ${b.x - 40} ${b.y + 22}, ${b.x} ${b.y + 22}`}
          className="fill-none stroke-accent/60 art-dash"
          strokeWidth="2"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
      {boxes.map((b, i) => (
        <g key={i} className="art-float" style={{ animationDelay: `${i * 0.5}s` }}>
          <rect x={b.x} y={b.y} width={b.w} height="44" rx="10" className={i === 2 ? "fill-accent" : "fill-surface stroke-border-strong"} strokeWidth="1.5" />
          <rect x={b.x + 12} y={b.y + 15} width={b.w * 0.5} height="5" rx="2.5" className={i === 2 ? "fill-accent-fg" : "fill-fg"} opacity="0.7" />
          <rect x={b.x + 12} y={b.y + 25} width={b.w * 0.3} height="4" rx="2" className={i === 2 ? "fill-accent-fg" : "fill-subtle"} opacity="0.5" />
        </g>
      ))}
    </>
  );
}

function CloudDevops({ r }: { r: () => number }) {
  const y = 150 + r() * 40;
  return (
    <>
      <path d={`M60 ${y}H540`} className="stroke-accent art-dash" strokeWidth="2.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx={60 + i * 120} cy={y} r="18" className={i === 4 ? "fill-accent" : "fill-surface stroke-accent"} strokeWidth="2.5" />
          <circle cx={60 + i * 120} cy={y} r="5" className={cn(i === 4 ? "fill-accent-fg" : "fill-accent", "art-pulse")} style={{ animationDelay: `${i * 0.35}s` }} />
        </g>
      ))}
      <circle cx="60" cy={y} r="7" className="fill-success art-travel" style={{ ["--d" as string]: "480px" }} />
      {Array.from({ length: 4 }, (_, i) => (
        <rect
          key={i}
          x={90 + i * 120 + r() * 20}
          y={y - 90 - r() * 30}
          width="60"
          height="38"
          rx="8"
          className="fill-surface stroke-border-strong art-float"
          strokeWidth="1.2"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}
    </>
  );
}

function Ai({ r }: { r: () => number }) {
  const nodes = Array.from({ length: 14 }, () => ({ x: 50 + r() * 500, y: 40 + r() * 250 }));
  return (
    <>
      {nodes.map((n, i) =>
        nodes.slice(i + 1, i + 3).map((m, j) => (
          <path key={`${i}-${j}`} d={`M${n.x} ${n.y}L${m.x} ${m.y}`} className="stroke-accent/35" strokeWidth="1.2" />
        )),
      )}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={4 + (i % 3) * 2} className="fill-accent art-pulse" style={{ animationDelay: `${(i % 7) * 0.3}s` }} />
      ))}
      <g className="art-float">
        <rect x="250" y="125" width="100" height="80" rx="16" className="fill-fg" />
        <circle cx="282" cy="160" r="6" className="fill-accent" />
        <circle cx="318" cy="160" r="6" className="fill-accent" />
        <path d="M280 180q20 12 40 0" className="fill-none stroke-bg" strokeWidth="3" strokeLinecap="round" />
      </g>
    </>
  );
}

function Tools({ r }: { r: () => number }) {
  const layers = ["web", "mobile", "backend", "data", "platform"];
  const offset = r() * 40;
  return (
    <>
      {layers.map((l, i) => (
        <g key={l} className="art-float" style={{ animationDelay: `${i * 0.4}s` }}>
          <rect x={150 + offset - i * 8} y={60 + i * 44} width={300 + i * 16} height="34" rx="9" className={i === 0 ? "fill-accent" : "fill-surface stroke-border-strong"} strokeWidth="1.3" />
          <text x={168 + offset - i * 8} y={82 + i * 44} className={cn("font-mono", i === 0 ? "fill-accent-fg" : "fill-muted")} fontSize="13">
            {l}
          </text>
          {[0, 1, 2].map((k) => (
            <rect key={k} x={300 + offset + k * 36} y={72 + i * 44} width="26" height="10" rx="5" className="fill-surface-2" />
          ))}
        </g>
      ))}
    </>
  );
}

function Product({ r }: { r: () => number }) {
  const dx = r() * 60;
  return (
    <>
      <g className="art-float">
        <rect x={210 + dx} y="30" width="150" height="270" rx="26" className="fill-surface stroke-border-strong" strokeWidth="2" />
        <rect x={262 + dx} y="42" width="46" height="8" rx="4" className="fill-border-strong" />
        <rect x={228 + dx} y="66" width="114" height="64" rx="12" className="fill-accent" opacity="0.9" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={228 + dx} y={142 + i * 36} width="114" height="28" rx="8" className="fill-surface-2 stroke-border" />
        ))}
        <rect x={228 + dx} y="256" width="114" height="22" rx="11" className="fill-fg" opacity="0.85" />
      </g>
      <g className="art-pop">
        <circle cx={385 + dx} cy="70" r="20" className="fill-success" />
        <path d={`M${376 + dx} 70l6 6 12-12`} className="fill-none stroke-bg" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  );
}

function News({ r }: { r: () => number }) {
  const stars = Array.from({ length: 9 }, () => ({ x: 60 + r() * 480, y: 40 + r() * 250, s: 6 + r() * 10 }));
  return (
    <>
      {stars.map((s, i) => (
        <path
          key={i}
          d={`M${s.x} ${s.y - s.s}L${s.x + s.s * 0.3} ${s.y - s.s * 0.3}L${s.x + s.s} ${s.y}L${s.x + s.s * 0.3} ${s.y + s.s * 0.3}L${s.x} ${s.y + s.s}L${s.x - s.s * 0.3} ${s.y + s.s * 0.3}L${s.x - s.s} ${s.y}L${s.x - s.s * 0.3} ${s.y - s.s * 0.3}Z`}
          className={i % 3 === 0 ? "fill-accent art-pulse" : "fill-subtle art-pulse"}
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
      <g className="art-float">
        <rect x="190" y="110" width="220" height="110" rx="18" className="fill-fg" />
        <text x="300" y="160" textAnchor="middle" className="fill-bg" fontSize="26" fontWeight="700">
          new
        </text>
        <rect x="250" y="178" width="100" height="8" rx="4" className="fill-accent" />
      </g>
    </>
  );
}

const motifs: Record<Category, (p: { r: () => number }) => ReactNode> = {
  Architecture,
  "Cloud & DevOps": CloudDevops,
  AI: Ai,
  Tools,
  Product,
  News,
};

export function BlogArt({ category, seed, className }: { category: Category; seed: string; className?: string }) {
  const Motif = motifs[category];
  const r = rng(seed);
  return (
    <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" aria-hidden role="presentation" className={cn("art h-full w-full", className)}>
      <defs>
        <pattern id={`g-${seed}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" className="fill-none stroke-border" strokeWidth="0.7" />
        </pattern>
        <radialGradient id={`r-${seed}`} cx={`${30 + r() * 40}%`} cy="35%" r="70%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="340" className="fill-surface-2" />
      <rect width="600" height="340" fill={`url(#g-${seed})`} />
      <rect width="600" height="340" fill={`url(#r-${seed})`} />
      <Motif r={r} />
    </svg>
  );
}
