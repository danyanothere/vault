import type { Dict } from "./dict/en";

export const locales = ["ro", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ro";
export const LANG_COOKIE = "vault-lang";

export const hasLocale = (value: string | undefined): value is Locale => !!value && (locales as readonly string[]).includes(value);

/** Prefix an internal path with the locale. Anchors, tel:, mailto: and external URLs are returned untouched. */
export function localizeHref(lang: Locale, href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const [, first] = href.split("/");
  if (hasLocale(first)) return href;
  return href === "/" ? `/${lang}` : `/${lang}${href}`;
}

/** Remove the locale segment: "/ro/collection" → "/collection". */
export function stripLocale(pathname: string) {
  const parts = pathname.split("/");
  if (hasLocale(parts[1])) parts.splice(1, 1);
  const out = parts.join("/");
  return out === "" ? "/" : out;
}

/** BCP 47 tag for <html lang> and Intl. */
export const htmlLang: Record<Locale, string> = { ro: "ro", en: "en", ru: "ru" };

export type { Dict };

/** Simple "{n}" placeholder interpolation. */
export const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
