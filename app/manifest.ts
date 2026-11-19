import type { MetadataRoute } from "next";
import { profile, siteConfig } from "@/data/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.brand} — Software development`,
    short_name: "Ibrahima Samake",
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    background_color: "#08090b",
    theme_color: "#08090b",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
