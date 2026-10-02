"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useDict, useLang } from "@/i18n/client";
import { LANG_COOKIE, locales, stripLocale } from "@/i18n/config";

/** EN / RO / RU links to the same page in another language; the choice is remembered for a year. */
export function LangSwitch({ className = "" }: { className?: string }) {
  const lang = useLang();
  const dict = useDict();
  const rest = stripLocale(usePathname());
  return (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label={dict.common.language}>
      {locales.map((l) => (
        <NextLink
          key={l}
          href={`/${l}${rest === "/" ? "" : rest}`}
          hrefLang={l}
          lang={l}
          className={l === lang ? "active" : undefined}
          aria-current={l === lang ? "true" : undefined}
          onClick={() => {
            document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
          }}
        >
          {l.toUpperCase()}
        </NextLink>
      ))}
    </div>
  );
}
