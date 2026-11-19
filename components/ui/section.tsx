import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("py-20 sm:py-28", className)} {...props} />;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: As = "h2",
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <As
        className={cn(
          "font-semibold text-fg",
          As === "h1" ? "text-4xl leading-[1.08] sm:text-5xl lg:text-6xl" : "text-3xl leading-tight sm:text-4xl",
        )}
      >
        {title}
      </As>
      {lead && <p className="mt-5 text-lg leading-relaxed text-muted">{lead}</p>}
      {children}
    </div>
  );
}
