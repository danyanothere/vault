"use client";

import Link from "@/i18n/client";
import Logo from "./Logo";
import { navItems } from "./nav";
import { LangSwitch } from "./Language";
import { useDict } from "@/i18n/client";
import { InstagramIcon, TelegramIcon, YoutubeIcon } from "./Icons";

export default function Footer() {
  const dict = useDict();
  const t = (k: keyof typeof dict.nav) => dict.nav[k];
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Logo />
        <nav aria-label={dict.footer.nav} className="footer-nav">
          {navItems.map((i) => (
            <Link key={i.href} href={i.href}>
              {t(i.key)}
            </Link>
          ))}
        </nav>
        <div className="footer-side">
          <span className="v-sep" aria-hidden="true" />
          <LangSwitch />
          <div className="footer-social">
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
              <InstagramIcon size={17} />
            </a>
            <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noreferrer">
              <YoutubeIcon size={18} />
            </a>
            <a href="https://telegram.org" aria-label="Telegram" target="_blank" rel="noreferrer">
              <TelegramIcon size={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{dict.footer.rights}</p>
        <p className="footer-legal">
          <Link href="/privacy">{dict.footer.privacy}</Link>
          <Link href="/terms">{dict.footer.terms}</Link>
        </p>
      </div>
    </footer>
  );
}
