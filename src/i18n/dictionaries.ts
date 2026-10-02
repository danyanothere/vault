import { en } from "./dict/en";
import { ro } from "./dict/ro";
import { ru } from "./dict/ru";
import type { Dict, Locale } from "./config";

/** Server-side lookup; the client only ever receives the active locale's dictionary. */
export const dictionaries: Record<Locale, Dict> = { ro, en, ru };
