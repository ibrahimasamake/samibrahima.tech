import { Bot, Cloud, Globe, LayoutGrid, ShoppingBag, Smartphone, type LucideProps } from "lucide-react";
import type { ServiceSlug } from "@/data/services";

const icons = {
  "web-development": Globe,
  "mobile-apps": Smartphone,
  "custom-software": LayoutGrid,
  ecommerce: ShoppingBag,
  "cloud-devops": Cloud,
  "ai-automation": Bot,
} satisfies Record<ServiceSlug, unknown>;

export function ServiceIcon({ slug, ...props }: { slug: ServiceSlug } & LucideProps) {
  const Icon = icons[slug];
  return <Icon aria-hidden strokeWidth={1.6} {...props} />;
}
