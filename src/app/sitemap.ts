import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";
import { vehicles } from "@/data/vehicles";

const pages = ["", "/collection", "/experience", "/about", "/journal", "/contact", "/auction", "/sell", "/privacy", "/terms", ...vehicles.map((v) => `/collection/${v.id}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return pages.flatMap((p) =>
    locales.map((l) => ({
      url: `${base}/${l}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : p.startsWith("/collection") ? 0.8 : 0.5,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${base}/${x}${p}`])) },
    })),
  );
}
