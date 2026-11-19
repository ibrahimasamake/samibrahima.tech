import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,color,border-color,transform] duration-200 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:bg-accent-strong",
        secondary: "border border-border-strong bg-surface text-fg hover:border-fg/40 hover:bg-surface-2",
        ghost: "text-muted hover:bg-surface-2 hover:text-fg",
        link: "rounded-none px-0 text-fg underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ComponentProps<"button"> & Variants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/** Link styled as a button. External links open safely in a new tab. */
export function ButtonLink({
  className,
  variant,
  size,
  href,
  external,
  ...props
}: ComponentProps<typeof Link> & Variants & { href: string; external?: boolean }) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  if (isExternal || href.endsWith(".html") || href.endsWith(".pdf") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cn(buttonVariants({ variant, size }), className)}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(props as ComponentProps<"a">)}
      />
    );
  }
  return <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
