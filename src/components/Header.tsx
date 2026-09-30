"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Phone, X } from "lucide-react";
import Logo from "./Logo";
import Arrow from "./Arrow";
import { navItems } from "./nav";


const langs = ["EN", "RO", "RU"];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [openedAt, setOpenedAt] = useState(pathname);
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="site-header">
        <Logo />
        <nav className="main-nav" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : undefined} aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a href="tel:+40700000000" className="icon-circle icon-circle-accent" aria-label="Call VAULT">
            <Phone size={14} strokeWidth={1.4} />
          </a>
          <Link href="/contact" className="btn btn-outline btn-sm header-cta">
            <span>Request access</span>
            <Arrow />
          </Link>
          <div className="lang-switch" role="group" aria-label="Language">
            {langs.map((l) => (
              <button key={l} type="button" className={l === lang ? "active" : undefined} aria-pressed={l === lang} onClick={() => setLang(l)}>
                {l}
              </button>
            ))}
          </div>
          <button ref={toggleRef} type="button" className="menu-toggle" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" ref={panelRef} className={`mobile-menu ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" inert={!open}>
        <div className="mobile-menu-top">
          <Logo onClick={() => setOpen(false)} />
          <button type="button" className="icon-circle" aria-label="Close menu" onClick={() => { setOpen(false); toggleRef.current?.focus(); }}>
            <X size={16} strokeWidth={1.3} />
          </button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile">
          {navItems.map((item, i) => (
            <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : undefined} style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}>
              <span className="num">0{i + 1}</span>
              {item.label}
            </Link>
          ))}
          <Link href="/auction" style={{ transitionDelay: open ? "330ms" : "0ms" }}><span className="num">06</span>Auction</Link>
          <Link href="/sell" style={{ transitionDelay: open ? "380ms" : "0ms" }}><span className="num">07</span>Sell</Link>
        </nav>
        <div className="mobile-menu-foot">
          <Link href="/contact" className="btn btn-primary">
            <span>Request access</span>
            <Arrow />
          </Link>
          <div className="lang-switch" role="group" aria-label="Language">
            {langs.map((l) => (
              <button key={l} type="button" className={l === lang ? "active" : undefined} aria-pressed={l === lang} onClick={() => setLang(l)}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
