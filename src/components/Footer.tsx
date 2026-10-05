"use client";

import Link from "@/i18n/client";
import Logo from "./Logo";
import { navItems } from "./nav";
import { LangSwitch } from "./Language";
import { useDict } from "@/i18n/client";
import { InstagramIcon, TelegramIcon, YoutubeIcon } from "./Icons";
import { siteConfig } from "@/config/site";

const socials = [
  { key: "instagram", label: "Instagram", href: siteConfig.social.instagram, icon: <InstagramIcon size={17} /> },
  { key: "youtube", label: "YouTube", href: siteConfig.social.youtube, icon: <YoutubeIcon size={18} /> },
  { key: "telegram", label: "Telegram", href: siteConfig.social.telegram, icon: <TelegramIcon size={16} /> },
].filter((s) => s.href);

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
          {socials.length > 0 && (
            <div className="footer-social">
              {socials.map((s) => (
                <a key={s.key} href={s.href!} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
          )}
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
