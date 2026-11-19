import Image from "next/image";
import Link from "next/link";

/**
 * Hero visual: real screens of products in production, instead of a portrait.
 * Desktop Sougba in a browser frame, Nafas Perfumes on a phone in front.
 */
export function ProductShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-xl pb-10 lg:max-w-none">
      {/* Browser */}
      <Link
        href="/projects/sougba/"
        aria-label="Sougba marketplace case study"
        className="group block overflow-hidden rounded-2xl border border-border-strong bg-surface-2 shadow-2xl shadow-black/30 transition-transform duration-500 hover:-translate-y-1"
      >
        <div className="flex h-8 items-center gap-1.5 border-b border-border px-3" aria-hidden>
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="ml-3 truncate rounded-md bg-bg px-2.5 py-0.5 font-mono text-[11px] text-subtle">sougba.com</span>
        </div>
        <Image
          src="/images/projects/sougba/home-desktop.jpg"
          alt="Sougba marketplace home page with product categories and the most viewed products in Bamako"
          width={1440}
          height={900}
          priority
          sizes="(min-width: 1024px) 44vw, 90vw"
          className="h-auto w-full"
        />
      </Link>

      {/* Phone */}
      <Link
        href="/projects/nafas-perfumes/"
        aria-label="Nafas Perfumes case study"
        className="absolute -bottom-2 -left-3 w-[34%] max-w-[190px] rounded-[1.6rem] border border-border-strong bg-surface-2 p-1.5 shadow-2xl shadow-black/40 transition-transform duration-500 hover:-translate-y-1 sm:-left-8"
      >
        <div className="overflow-hidden rounded-[1.25rem]">
          <Image
            src="/images/projects/nafas/home-mobile.jpg"
            alt="Nafas Perfumes online shop on a phone"
            width={780}
            height={1688}
            sizes="190px"
            className="h-auto w-full"
          />
        </div>
      </Link>

      {/* Live chips */}
      <p className="absolute -top-3 right-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/95 px-3 py-1.5 text-xs text-fg shadow-lg backdrop-blur">
        <span className="animate-pulse-dot size-1.5 rounded-full bg-success" aria-hidden /> Live in Bamako
      </p>
      <p className="absolute right-6 bottom-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/95 px-3 py-1.5 text-xs text-fg shadow-lg backdrop-blur">
        <span className="animate-pulse-dot size-1.5 rounded-full bg-success" aria-hidden /> Live in Bengaluru
      </p>
    </div>
  );
}
