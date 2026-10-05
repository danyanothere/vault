import type { Metadata } from "next";
import { locales } from "./config";
import { getDict, getLang } from "./server";
import type { Dict } from "./dict/en";

type MetaKey = Exclude<keyof Dict["meta"], "siteTitle" | "titleTemplate" | "siteDescription">;

/** hreflang alternates for a locale-less path like "/collection". */
export async function alternates(path: string): Promise<Metadata["alternates"]> {
  const lang = await getLang();
  const suffix = path === "/" ? "" : path;
  return {
    canonical: `/${lang}${suffix}`,
    languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}${suffix}`])), "x-default": `/ro${suffix}` },
  };
}

/** Title, description and alternates for a static page. */
export async function pageMetadata(key: MetaKey, path: string): Promise<Metadata> {
  const dict = await getDict();
  const [title, description] = dict.meta[key];
  return {
    title,
    description,
    alternates: await alternates(path),
    openGraph: { title: `${title} — VAULT`, description, images: ["/og.jpg"] },
    twitter: { title: `${title} — VAULT`, description },
  };
}
