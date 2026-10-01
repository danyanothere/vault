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
import { LanguageProvider } from "@/components/Language";
import Widgets from "@/components/Widgets";
import ContextCursor from "@/components/motion/ContextCursor";
import RevealObserver from "@/components/motion/RevealObserver";

export const metadata: Metadata = {
  title: {
    default: "VAULT — Private Automobiles",
    template: "%s — VAULT Private Automobiles",
  },
  description: "A curated collection of exceptional automobiles, available by private enquiry.",
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

// Runs before first paint: decides whether the intro plays (hero copy then waits hidden for the handoff).
const introScript = `try{var d=document.documentElement;if(sessionStorage.getItem("vault-intro-seen")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("intro-seen");else d.classList.add("intro-play")}catch(e){document.documentElement.classList.add("intro-seen")}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <LanguageProvider>
          <IntroLoader />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Widgets />
          <ContextCursor />
          <RevealObserver />
        </LanguageProvider>
      </body>
    </html>
  );
}
