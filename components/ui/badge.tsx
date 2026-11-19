import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] leading-none tracking-wide text-muted",
        className,
      )}
      {...props}
    />
  );
}
