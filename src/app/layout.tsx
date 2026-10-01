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

const introScript = `try{if(sessionStorage.getItem("vault-intro-seen")==="1")document.documentElement.classList.add("intro-seen")}catch(e){}`;

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
        </LanguageProvider>
      </body>
    </html>
  );
}
