import Link from "next/link";
import Logo from "./Logo";
import { navItems } from "./nav";
import { InstagramIcon, TelegramIcon, YoutubeIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Logo />
        <nav aria-label="Footer" className="footer-nav">
          {navItems.map((i) => (
            <Link key={i.href} href={i.href}>
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="footer-side">
          <p className="footer-langs" aria-label="Languages">
            <span className="active">EN</span>
            <span>RO</span>
            <span>RU</span>
          </p>
          <div className="footer-social">
            <a href="https://instagram.com" aria-label="Instagram" className="icon-circle" target="_blank" rel="noreferrer">
              <InstagramIcon />
            </a>
            <a href="https://youtube.com" aria-label="YouTube" className="icon-circle" target="_blank" rel="noreferrer">
              <YoutubeIcon />
            </a>
            <a href="https://telegram.org" aria-label="Telegram" className="icon-circle" target="_blank" rel="noreferrer">
              <TelegramIcon />
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
