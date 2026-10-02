import { lang as rootLang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./config";
import { dictionaries } from "./dictionaries";

/** Current locale from the `[lang]` root segment (Server Components only). */
export async function getLang(): Promise<Locale> {
  const l = await rootLang();
  if (!hasLocale(l)) notFound();
  return l;
}

/** Dictionary for the current locale (Server Components only). */
export async function getDict() {
  return dictionaries[await getLang()];
}
