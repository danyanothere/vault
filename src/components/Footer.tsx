"use client";

import Link from "next/link";
import Logo from "./Logo";
import { navItems } from "./nav";
import { LangSwitch, useLang } from "./Language";
import { InstagramIcon, TelegramIcon, YoutubeIcon } from "./Icons";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Logo />
        <nav aria-label="Footer" className="footer-nav">
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
        <p>© 2026 VAULT. All rights reserved.</p>
        <p className="footer-legal">
          <Link href="/contact">Privacy Policy</Link>
          <Link href="/contact">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
}
