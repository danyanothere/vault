import type { Metadata, Viewport } from "next";
import "@fontsource/manrope/200.css";
import "@fontsource/manrope/300.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntroLoader from "@/components/IntroLoader";

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
        <IntroLoader />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
