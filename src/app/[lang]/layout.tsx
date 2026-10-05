import type { Metadata, Viewport } from "next";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntroLoader from "@/components/IntroLoader";
import Widgets from "@/components/Widgets";
import ContextCursor from "@/components/motion/ContextCursor";
import RevealObserver from "@/components/motion/RevealObserver";
import { I18nProvider } from "@/i18n/client";
import { htmlLang, locales } from "@/i18n/config";
import { getDict, getLang } from "@/i18n/server";
import { alternates } from "@/i18n/meta";
import { siteConfig } from "@/config/site";

// Every page is pre-rendered once per language; unknown language segments 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDict();
  const lang = await getLang();
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.meta.siteTitle, template: dict.meta.titleTemplate },
    description: dict.meta.siteDescription,
    alternates: await alternates("/"),
    openGraph: {
      type: "website",
      siteName: "VAULT",
      locale: { ro: "ro_RO", en: "en_GB", ru: "ru_RU" }[lang],
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: dict.meta.siteTitle }],
    },
    twitter: { card: "summary_large_image", title: dict.meta.siteTitle, description: dict.meta.siteDescription, images: ["/og.jpg"] },
  };
}

export const viewport: Viewport = {
  themeColor: "#050505",
};

// Runs before first paint: decides whether the intro plays (hero copy then waits hidden for the handoff).
const introScript = `try{var d=document.documentElement;if(sessionStorage.getItem("vault-intro-seen")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("intro-seen");else d.classList.add("intro-play")}catch(e){document.documentElement.classList.add("intro-seen")}`;

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await getLang();
  const dict = await getDict();
  return (
    <html lang={htmlLang[lang]} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {dict.common.skip}
        </a>
        <I18nProvider lang={lang} dict={dict}>
          <IntroLoader />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Widgets />
          <ContextCursor />
          <RevealObserver />
        </I18nProvider>
      </body>
    </html>
  );
}
