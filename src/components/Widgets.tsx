"use client";

import Link, { useDict } from "@/i18n/client";
import { useEffect, useRef, useState } from "react";
import { Gift, MessageSquare, Phone, X, ArrowRight } from "lucide-react";
import { PHONE, PHONE_HREF } from "./nav";

const GIFT_KEY = "vault-gift-opened";
const WHATSAPP = "https://wa.me/40700000000";

type Panel = "gift" | "chat" | null;

export default function Widgets() {
  const [open, setOpen] = useState<Panel>(null);
  const dict = useDict();
  const w = dict.widgets;
  const [giftSeen, setGiftSeen] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(GIFT_KEY) === "1";
    } catch {
      // storage unavailable: show the badge
    }
    if (!seen) queueMicrotask(() => setGiftSeen(false));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const toggle = (p: Exclude<Panel, null>) => {
    setOpen((cur) => (cur === p ? null : p));
    if (p === "gift" && !giftSeen) {
      setGiftSeen(true);
      try {
        localStorage.setItem(GIFT_KEY, "1");
      } catch {
        // storage unavailable
      }
    }
  };

  return (
    <div ref={root} className={`widgets ${open ? "has-open" : ""}`}>
      {open === "gift" && (
        <div className="widget-panel" role="dialog" aria-label={w.offer}>
          <button type="button" className="widget-close" aria-label={dict.common.close} onClick={() => setOpen(null)}>
            <X size={14} strokeWidth={1.5} />
          </button>
          <p className="widget-eyebrow">{w.offer}</p>
          <h2 className="widget-title">{w.offerTitle}</h2>
          <p className="widget-text">
            {w.offerText}
          </p>
          <Link href="/contact?interest=specific" className="btn btn-primary btn-sm widget-cta" onClick={() => setOpen(null)}>
            <span>{w.claim}</span>
            <ArrowRight size={13} strokeWidth={1.6} />
          </Link>
        </div>
      )}

      {open === "chat" && (
        <div className="widget-panel" role="dialog" aria-label={w.chat}>
          <button type="button" className="widget-close" aria-label={dict.common.close} onClick={() => setOpen(null)}>
            <X size={14} strokeWidth={1.5} />
          </button>
          <p className="widget-eyebrow">
            <span className="widget-online" aria-hidden="true" /> {w.online}
          </p>
          <h2 className="widget-title">{w.help}</h2>
          <p className="widget-text">{w.reply}</p>
          <ul className="widget-actions">
            <li>
              <a href={WHATSAPP} target="_blank" rel="noreferrer">
                <MessageSquare size={15} strokeWidth={1.4} /> WhatsApp
              </a>
            </li>
            <li>
              <a href={PHONE_HREF}>
                <Phone size={15} strokeWidth={1.4} /> {PHONE}
              </a>
            </li>
            <li>
              <Link href="/contact" onClick={() => setOpen(null)}>
                <ArrowRight size={15} strokeWidth={1.4} /> {dict.common.requestAccess}
              </Link>
            </li>
          </ul>
        </div>
      )}

      <button
        type="button"
        className={`widget widget-gift ${open === "gift" ? "is-open" : ""}`}
        aria-label={giftSeen ? w.offer : w.offerNew}
        aria-expanded={open === "gift"}
        onClick={() => toggle("gift")}
      >
        <Gift size={22} strokeWidth={1.6} />
        {!giftSeen && <span className="widget-badge">1</span>}
      </button>

      <button
        type="button"
        className={`widget widget-chat ${open === "chat" ? "is-open" : ""}`}
        aria-label={w.chat}
        aria-expanded={open === "chat"}
        onClick={() => toggle("chat")}
      >
        <MessageSquare size={21} strokeWidth={1.6} />
        <span className="widget-dot" aria-hidden="true" />
      </button>
    </div>
  );
}
