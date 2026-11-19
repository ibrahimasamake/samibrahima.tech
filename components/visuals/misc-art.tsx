/** Conversation bubbles: used on Contact and Start a project. */
export function ChatArt() {
  return (
    <svg viewBox="0 0 420 260" aria-hidden role="presentation" className="art h-auto w-full">
      <defs>
        <pattern id="chat-grid" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M18 0H0V18" className="fill-none stroke-border" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="420" height="260" rx="24" className="fill-surface" />
      <rect width="420" height="260" rx="24" fill="url(#chat-grid)" />
      <g className="art-float">
        <rect x="36" y="40" width="210" height="58" rx="20" className="fill-surface-2 stroke-border-strong" strokeWidth="1.3" />
        <rect x="56" y="58" width="150" height="7" rx="3.5" className="fill-fg" opacity="0.75" />
        <rect x="56" y="72" width="100" height="6" rx="3" className="fill-subtle" opacity="0.6" />
      </g>
      <g className="art-float" style={{ animationDelay: "0.7s" }}>
        <rect x="160" y="112" width="224" height="64" rx="20" className="fill-accent" />
        <rect x="182" y="132" width="160" height="7" rx="3.5" className="fill-accent-fg" opacity="0.85" />
        <rect x="182" y="146" width="112" height="6" rx="3" className="fill-accent-fg" opacity="0.55" />
      </g>
      <g className="art-float" style={{ animationDelay: "1.4s" }}>
        <rect x="36" y="192" width="96" height="40" rx="20" className="fill-surface-2 stroke-border-strong" strokeWidth="1.3" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={64 + i * 20} cy="212" r="5" className="fill-muted art-pulse" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
      </g>
      <g className="art-pop" style={{ animationDelay: "0.5s" }}>
        <circle cx="372" cy="62" r="22" className="fill-success" />
        <path d="M362 62l7 7 13-14" className="fill-none stroke-bg" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/** A cup of chai with steam, for the 404 page. */
export function ChaiArt() {
  return (
    <svg viewBox="0 0 200 170" aria-hidden role="presentation" className="art mx-auto h-auto w-44">
      {[70, 95, 120].map((x, i) => (
        <path
          key={x}
          d={`M${x} 58c-8-10 8-16 0-28`}
          className="fill-none stroke-subtle art-steam"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}
      <path d="M44 70h112l-10 66a14 14 0 0 1-14 12H68a14 14 0 0 1-14-12z" className="fill-surface stroke-border-strong" strokeWidth="2.5" />
      <path d="M50 84h100" className="stroke-accent" strokeWidth="6" strokeLinecap="round" />
      <path d="M156 84h8a16 16 0 0 1 0 32h-12" className="fill-none stroke-border-strong" strokeWidth="2.5" />
      <ellipse cx="100" cy="156" rx="70" ry="6" className="fill-border" />
    </svg>
  );
}
