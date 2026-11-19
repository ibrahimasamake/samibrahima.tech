import type { CSSProperties, ReactNode } from "react";
import type { ServiceSlug } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Hand-drawn SVG illustrations, one per service. They use the theme tokens
 * (so they follow light/dark mode) and gentle CSS motion that switches off
 * with prefers-reduced-motion.
 */

const d = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 320 200" role="presentation" aria-hidden className={cn("art h-auto w-full", className)}>
      <defs>
        <pattern id="art-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" className="fill-none stroke-border" strokeWidth="0.6" />
        </pattern>
        <radialGradient id="art-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="200" fill="url(#art-grid)" opacity="0.7" />
      <rect width="320" height="200" fill="url(#art-glow)" />
      {children}
    </svg>
  );
}

/* Browser window with a page being laid out. */
function Web() {
  return (
    <Frame>
      <g className="art-float">
        <rect x="56" y="30" width="208" height="140" rx="12" className="fill-surface stroke-border-strong" strokeWidth="1.5" />
        <path d="M56 52h208" className="stroke-border-strong" strokeWidth="1.5" />
        <circle cx="70" cy="41" r="3" className="fill-border-strong" />
        <circle cx="80" cy="41" r="3" className="fill-border-strong" />
        <circle cx="90" cy="41" r="3" className="fill-border-strong" />
        <rect x="104" y="37" width="96" height="8" rx="4" className="fill-surface-2" />
        {/* hero */}
        <rect x="72" y="66" width="86" height="10" rx="3" className="fill-fg" opacity="0.85" />
        <rect x="72" y="82" width="64" height="10" rx="3" className="fill-accent art-type" />
        <rect x="72" y="100" width="76" height="5" rx="2.5" className="fill-subtle" opacity="0.6" />
        <rect x="72" y="110" width="60" height="5" rx="2.5" className="fill-subtle" opacity="0.6" />
        <rect x="72" y="124" width="42" height="14" rx="7" className="fill-accent" />
        {/* image block */}
        <rect x="172" y="66" width="76" height="72" rx="8" className="fill-surface-2 stroke-border" />
        <path d="M180 126l16-18 12 12 10-8 22 14" className="fill-none stroke-accent" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="228" cy="82" r="6" className="fill-accent art-pulse" />
        <rect x="72" y="148" width="176" height="8" rx="4" className="fill-surface-2" />
      </g>
      {/* cursor */}
      <g className="art-float" style={d(1.2)}>
        <path d="M232 128l0 22 6-6 5 10 5-2-5-10 8 0z" className="fill-fg stroke-bg" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    </Frame>
  );
}

/* Two phones, one with a notification arriving. */
function Mobile() {
  return (
    <Frame>
      <g className="art-float">
        <rect x="88" y="28" width="78" height="150" rx="16" className="fill-surface stroke-border-strong" strokeWidth="1.5" />
        <rect x="114" y="34" width="26" height="5" rx="2.5" className="fill-border-strong" />
        <rect x="98" y="50" width="58" height="34" rx="8" className="fill-accent" opacity="0.9" />
        <rect x="98" y="92" width="26" height="26" rx="6" className="fill-surface-2 stroke-border" />
        <rect x="130" y="92" width="26" height="26" rx="6" className="fill-surface-2 stroke-border" />
        <rect x="98" y="124" width="58" height="6" rx="3" className="fill-subtle" opacity="0.5" />
        <rect x="98" y="134" width="40" height="6" rx="3" className="fill-subtle" opacity="0.5" />
        <rect x="98" y="154" width="58" height="12" rx="6" className="fill-fg" opacity="0.85" />
      </g>
      <g className="art-float" style={d(0.8)}>
        <rect x="178" y="48" width="70" height="132" rx="15" className="fill-surface stroke-border-strong" strokeWidth="1.5" />
        <rect x="200" y="54" width="26" height="5" rx="2.5" className="fill-border-strong" />
        <path d="M190 150l12-16 10 8 14-20 12 10" className="fill-none stroke-success" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
        <rect x="190" y="70" width="46" height="6" rx="3" className="fill-fg" opacity="0.8" />
        <rect x="190" y="82" width="32" height="5" rx="2.5" className="fill-subtle" opacity="0.6" />
      </g>
      {/* notification */}
      <g className="art-pop" style={d(0.5)}>
        <rect x="150" y="20" width="96" height="26" rx="13" className="fill-fg" />
        <circle cx="164" cy="33" r="6" className="fill-success" />
        <rect x="176" y="29" width="58" height="4" rx="2" className="fill-bg" opacity="0.9" />
        <rect x="176" y="36" width="38" height="3" rx="1.5" className="fill-bg" opacity="0.5" />
      </g>
    </Frame>
  );
}

/* Business dashboard with live bars and a stock list. */
function Custom() {
  const bars = [44, 70, 52, 86, 64, 96];
  return (
    <Frame>
      <g className="art-float">
        <rect x="40" y="30" width="240" height="140" rx="12" className="fill-surface stroke-border-strong" strokeWidth="1.5" />
        <rect x="40" y="30" width="52" height="140" rx="12" className="fill-surface-2" />
        {[50, 66, 82, 98, 114].map((y, i) => (
          <rect key={y} x="52" y={y} width={i === 1 ? 30 : 24} height="6" rx="3" className={i === 1 ? "fill-accent" : "fill-subtle"} opacity={i === 1 ? 1 : 0.5} />
        ))}
        <rect x="104" y="44" width="70" height="8" rx="4" className="fill-fg" opacity="0.85" />
        {bars.map((h, i) => (
          <rect
            key={i}
            x={108 + i * 18}
            y={150 - h * 0.8}
            width="11"
            height={h * 0.8}
            rx="3"
            className={cn("art-grow", i === 5 ? "fill-accent" : "fill-accent/40")}
            style={d(i * 0.25)}
          />
        ))}
        <path d="M104 150h108" className="stroke-border-strong" />
        {/* stock list */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="222" y={48 + i * 26} width="46" height="18" rx="5" className="fill-surface-2 stroke-border" />
            <circle cx="232" cy={57 + i * 26} r="4" className={i === 2 ? "fill-danger art-pulse" : "fill-success"} />
            <rect x="240" y={55 + i * 26} width="22" height="4" rx="2" className="fill-subtle" opacity="0.7" />
          </g>
        ))}
      </g>
    </Frame>
  );
}

/* Product grid with a cart that keeps filling. */
function Ecommerce() {
  return (
    <Frame>
      <g className="art-float">
        {[0, 1, 2].map((col) =>
          [0, 1].map((row) => {
            const x = 52 + col * 64;
            const y = 34 + row * 70;
            return (
              <g key={`${col}-${row}`}>
                <rect x={x} y={y} width="54" height="62" rx="9" className="fill-surface stroke-border-strong" strokeWidth="1.2" />
                <rect x={x + 6} y={y + 6} width="42" height="30" rx="6" className={(col + row) % 2 ? "fill-accent/25" : "fill-surface-2"} />
                <rect x={x + 6} y={y + 42} width="30" height="5" rx="2.5" className="fill-fg" opacity="0.75" />
                <rect x={x + 6} y={y + 51} width="18" height="5" rx="2.5" className="fill-accent" />
              </g>
            );
          }),
        )}
      </g>
      {/* cart */}
      <g className="art-float" style={d(1)}>
        <rect x="236" y="70" width="58" height="58" rx="16" className="fill-fg" />
        <path d="M250 88h6l6 20h20l4-14h-27" className="fill-none stroke-bg" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="264" cy="114" r="2.6" className="fill-bg" />
        <circle cx="280" cy="114" r="2.6" className="fill-bg" />
        <g className="art-pop" style={d(0.4)}>
          <circle cx="290" cy="72" r="10" className="fill-accent" />
          <text x="290" y="76" textAnchor="middle" className="fill-accent-fg font-mono" fontSize="11" fontWeight="700">
            3
          </text>
        </g>
      </g>
      {/* flying item */}
      <rect x="200" y="96" width="12" height="12" rx="3" className="fill-accent art-travel" style={{ ["--d" as string]: "40px" }} />
    </Frame>
  );
}

/* Commit → build → deploy, with a release travelling through. */
function Cloud() {
  const nodes = [
    { x: 56, label: "commit" },
    { x: 128, label: "build" },
    { x: 200, label: "image" },
    { x: 272, label: "deploy" },
  ];
  return (
    <Frame>
      {/* cloud */}
      <g className="art-float">
        <path
          d="M118 70a26 26 0 0 1 50-10a20 20 0 0 1 34 14a18 18 0 0 1-4 36H124a22 22 0 0 1-6-40z"
          className="fill-surface stroke-border-strong"
          strokeWidth="1.5"
        />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={138 + i * 20} y="84" width="14" height="14" rx="3" className="fill-accent/30 stroke-accent" strokeWidth="1" />
        ))}
      </g>
      {/* pipeline */}
      <path d="M56 150H272" className="fill-none stroke-accent art-dash" strokeWidth="2" />
      {nodes.map((n, i) => (
        <g key={n.label}>
          <circle cx={n.x} cy="150" r="13" className={cn("stroke-accent", i === 3 ? "fill-accent" : "fill-surface")} strokeWidth="2" />
          <text x={n.x} y="178" textAnchor="middle" className="fill-subtle font-mono" fontSize="9">
            {n.label}
          </text>
        </g>
      ))}
      <path d="M266 150l4 4 7-8" className="fill-none stroke-accent-fg" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="56" cy="150" r="5" className="fill-success art-travel" style={{ ["--d" as string]: "216px" }} />
      <path d="M200 137v-26" className="stroke-border-strong art-dash" strokeWidth="1.5" />
    </Frame>
  );
}

/* A model in a box, surrounded by rules. */
function Ai() {
  const outer = [
    [60, 60],
    [60, 140],
    [260, 60],
    [260, 140],
    [160, 28],
    [160, 172],
  ];
  return (
    <Frame>
      {outer.map(([x, y], i) => (
        <path key={i} d={`M${x} ${y}L160 100`} className="stroke-accent/50 art-dash" strokeWidth="1.4" style={d(i * 0.3)} />
      ))}
      {outer.map(([x, y], i) => (
        <g key={`n${i}`}>
          <circle cx={x} cy={y} r="9" className="fill-surface stroke-border-strong" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="3.5" className="fill-accent art-pulse" style={d(i * 0.4)} />
        </g>
      ))}
      <g className="art-float">
        <rect x="118" y="66" width="84" height="68" rx="14" className="fill-fg" />
        <rect x="126" y="74" width="68" height="52" rx="9" className="fill-none stroke-bg" strokeDasharray="4 4" opacity="0.5" />
        <circle cx="146" cy="96" r="5" className="fill-accent art-pulse" />
        <circle cx="174" cy="96" r="5" className="fill-accent art-pulse" style={d(0.4)} />
        <path d="M144 112q16 10 32 0" className="fill-none stroke-bg" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      {/* rule badge */}
      <g className="art-pop" style={d(1)}>
        <rect x="204" y="118" width="74" height="22" rx="11" className="fill-success" />
        <text x="241" y="133" textAnchor="middle" className="fill-bg font-mono" fontSize="9.5" fontWeight="700">
          rules: ok
        </text>
      </g>
    </Frame>
  );
}

const arts: Record<ServiceSlug, () => ReactNode> = {
  "web-development": Web,
  "mobile-apps": Mobile,
  "custom-software": Custom,
  ecommerce: Ecommerce,
  "cloud-devops": Cloud,
  "ai-automation": Ai,
};

export function ServiceArt({ slug, className }: { slug: ServiceSlug; className?: string }) {
  const Art = arts[slug];
  return (
    <div className={cn("overflow-hidden", className)}>
      <Art />
    </div>
  );
}
