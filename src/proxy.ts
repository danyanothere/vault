import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LANG_COOKIE, locales, type Locale } from "@/i18n/config";

/** Preferred locale: saved choice → browser languages → Romanian. */
function pickLocale(req: NextRequest): Locale {
  const saved = req.cookies.get(LANG_COOKIE)?.value;
  if (hasLocale(saved)) return saved;
  const header = req.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { base } of ranked) {
    if (base === "mo") return "ro"; // legacy Moldovan tag
    if ((locales as readonly string[]).includes(base)) return base as Locale;
  }
  return defaultLocale;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (hasLocale(first)) return;
  const url = req.nextUrl.clone();
  url.pathname = `/${pickLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // pages only: skip Next internals, API routes and any file with an extension (images, videos, icons)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
