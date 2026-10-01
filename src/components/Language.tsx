"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const languages = ["EN", "RO", "RU"] as const;
export type Lang = (typeof languages)[number];

/** UI strings. Page copy stays English until translations are supplied. */
const dict = {
  EN: { collection: "Collection", experience: "Experience", about: "About", journal: "Journal", contact: "Contact", auction: "Auction", sell: "Sell", requestAccess: "Request access", call: "Call VAULT" },
  RO: { collection: "Colecție", experience: "Experiență", about: "Despre", journal: "Jurnal", contact: "Contact", auction: "Licitație", sell: "Vinde", requestAccess: "Solicită acces", call: "Sună VAULT" },
  RU: { collection: "Коллекция", experience: "Опыт", about: "О нас", journal: "Журнал", contact: "Контакты", auction: "Аукцион", sell: "Продать", requestAccess: "Запросить доступ", call: "Позвонить" },
};
export type UIKey = keyof (typeof dict)["EN"];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: UIKey) => string }>({
  lang: "EN",
  setLang: () => {},
  t: (k) => dict.EN[k],
});

const KEY = "vault-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("EN");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {
      // storage unavailable
    }
    if (saved && (languages as readonly string[]).includes(saved)) {
      const l = saved as Lang;
      queueMicrotask(() => setLangState(l));
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {
      // storage unavailable
    }
  };

  return <Ctx.Provider value={{ lang, setLang, t: (k) => dict[lang][k] }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label="Language">
      {languages.map((l) => (
        <button key={l} type="button" className={l === lang ? "active" : undefined} aria-pressed={l === lang} onClick={() => setLang(l)}>
          {l}
        </button>
      ))}
    </div>
  );
}
