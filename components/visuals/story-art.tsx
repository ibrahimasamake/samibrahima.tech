/**
 * "From notebook to phone": a paper sales notebook turning into a live shop
 * on a phone, with orders arriving. Used in the homepage story section.
 */
export function StoryArt() {
  return (
    <svg viewBox="0 0 520 300" aria-hidden role="presentation" className="art h-auto w-full">
      <defs>
        <pattern id="story-grid" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M18 0H0V18" className="fill-none stroke-border" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="520" height="300" rx="24" className="fill-surface" />
      <rect width="520" height="300" rx="24" fill="url(#story-grid)" />

      {/* Notebook */}
      <g className="art-float">
        <g transform="rotate(-6 120 150)">
          <rect x="44" y="62" width="150" height="180" rx="10" className="fill-surface-2 stroke-border-strong" strokeWidth="1.5" />
          <path d="M66 62v180" className="stroke-danger/50" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <g key={i}>
              <path d={`M74 ${92 + i * 20}H182`} className="stroke-border-strong" strokeWidth="0.8" />
              <path
                d={`M78 ${88 + i * 20}q8 -6 16 0t16 0t16 0${i % 2 ? "" : "t16 0"}`}
                className="fill-none stroke-muted"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <text x="160" y={89 + i * 20} className="fill-muted font-mono" fontSize="9">
                ?
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* Arrow */}
      <path d="M212 150C240 120 272 120 300 150" className="fill-none stroke-accent art-dash" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M292 142l9 9-12 4" className="fill-none stroke-accent" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

      {/* Phone */}
      <g className="art-float" style={{ animationDelay: "0.8s" }}>
        <rect x="318" y="36" width="140" height="236" rx="24" className="fill-bg stroke-border-strong" strokeWidth="2" />
        <rect x="366" y="46" width="44" height="7" rx="3.5" className="fill-border-strong" />
        <rect x="334" y="66" width="108" height="16" rx="5" className="fill-fg" opacity="0.85" />
        <text x="342" y="78" className="fill-bg font-mono" fontSize="9" fontWeight="700">
          TODAY
        </text>
        {/* chart */}
        {[30, 46, 38, 60, 52, 72].map((h, i) => (
          <rect
            key={i}
            x={338 + i * 17}
            y={162 - h}
            width="11"
            height={h}
            rx="3"
            className={i === 5 ? "fill-accent art-grow" : "fill-accent/35 art-grow"}
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}
        <path d="M334 164H442" className="stroke-border-strong" />
        {/* stock rows */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="334" y={176 + i * 26} width="108" height="20" rx="6" className="fill-surface stroke-border" />
            <circle cx="346" cy={186 + i * 26} r="4" className={i === 1 ? "fill-danger art-pulse" : "fill-success"} />
            <rect x="356" y={184 + i * 26} width="48" height="4" rx="2" className="fill-subtle" opacity="0.7" />
            <rect x="414" y={183 + i * 26} width="20" height="6" rx="3" className="fill-fg" opacity="0.6" />
          </g>
        ))}
      </g>

      {/* Order bubble */}
      <g className="art-pop" style={{ animationDelay: "0.6s" }}>
        <rect x="372" y="14" width="132" height="34" rx="17" className="fill-success" />
        <circle cx="392" cy="31" r="8" className="fill-bg" />
        <path d="M388 31l3 3 6-6" className="fill-none stroke-success" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="408" y="35" className="fill-bg" fontSize="12" fontWeight="700">
          New order
        </text>
      </g>
    </svg>
  );
}
