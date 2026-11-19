import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5 rounded-lg" aria-label="Ibrahima Samake, home">
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-lg bg-fg font-mono text-[13px] font-semibold text-bg transition-colors group-hover:bg-accent group-hover:text-accent-fg"
      >
        IS
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-fg">Ibrahima Samake</span>
    </Link>
  );
}
