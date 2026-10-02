"use client";

import NextLink from "next/link";
import { createContext, forwardRef, useContext, useMemo, type ComponentProps } from "react";
import { localizeVehicles } from "@/data/vehicles";
import { localizeHref, type Dict, type Locale } from "./config";

const Ctx = createContext<{ lang: Locale; dict: Dict }>(null as unknown as { lang: Locale; dict: Dict });

export function I18nProvider({ lang, dict, children }: { lang: Locale; dict: Dict; children: React.ReactNode }) {
  return <Ctx.Provider value={{ lang, dict }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx).lang;
export const useDict = () => useContext(Ctx).dict;

/**
 * Drop-in replacement for next/link that keeps the visitor in their language:
 * "/collection" becomes "/ro/collection". Anchors and external links pass through.
 */
const Link = forwardRef<HTMLAnchorElement, ComponentProps<typeof NextLink>>(function Link({ href, ...rest }, ref) {
  const lang = useLang();
  const h = typeof href === "string" ? localizeHref(lang, href) : href;
  return <NextLink ref={ref} href={h} {...rest} />;
});

export default Link;

/** Vehicles with copy in the active language. */
export function useVehicles() {
  const dict = useDict();
  return useMemo(() => localizeVehicles(dict), [dict]);
}
