"use client";

import Link from "@/i18n/client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Phone, X } from "lucide-react";
import Logo from "./Logo";
import Arrow from "./Arrow";
import { navItems } from "./nav";
import { phoneHref, siteConfig } from "@/config/site";
import { LangSwitch } from "./Language";
import { useDict } from "@/i18n/client";
import { stripLocale } from "@/i18n/config";

export default function Header() {
  const pathname = usePathname();
  const dict = useDict();
  const t = (k: keyof typeof dict.nav) => dict.nav[k];
  const ui = dict.common;
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  if (openedAt !== pathname) {
    // close the menu after navigation
    setOpenedAt(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const path = stripLocale(pathname);
  const isActive = (href: string) => path === href || path.startsWith(href + "/");
  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <>
      <header className="site-header">
        <Logo />
        <nav className="main-nav" aria-label={dict.nav.primary}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : undefined} aria-current={isActive(item.href) ? "page" : undefined}>
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          {phoneHref && (
            <>
              <a href={phoneHref} className="phone-ring" aria-label={ui.call}>
                <Phone size={17} strokeWidth={2} />
              </a>
              <span className="v-sep" aria-hidden="true" />
            </>
          )}
          <Link href="/contact" className="btn btn-outline btn-sm header-cta" data-magnetic>
            <span>{ui.requestAccess}</span>
            <Arrow />
          </Link>
          <LangSwitch className="header-lang" />
          <span className="v-sep header-lang" aria-hidden="true" />
          <button ref={toggleRef} type="button" className="menu-toggle" aria-label={dict.nav.openMenu} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" ref={panelRef} className={`mobile-menu ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label={dict.nav.menu} inert={!open}>
        <div className="mobile-menu-top">
          <Logo onClick={() => setOpen(false)} />
          <button type="button" className="icon-circle" aria-label={dict.nav.closeMenu} onClick={close}>
            <X size={16} strokeWidth={1.3} />
          </button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile">
          {[...navItems, { href: "/auction", key: "auction" as const }, { href: "/sell", key: "sell" as const }].map((item, i) => (
            <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : undefined} style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}>
              <span className="num">0{i + 1}</span>
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <Link href="/contact" className="btn btn-primary">
            <span>{ui.requestAccess}</span>
            <Arrow />
          </Link>
          {phoneHref && (
            <a href={phoneHref} className="mobile-phone">
              <span className="icon-circle icon-circle-accent">
                <Phone size={14} strokeWidth={1.5} />
              </span>
              {siteConfig.contact.phone}
            </a>
          )}
          <LangSwitch />
        </div>
      </div>
    </>
  );
}
