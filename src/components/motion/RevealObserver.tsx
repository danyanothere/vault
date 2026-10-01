"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Blocks that rise in gently the first time they enter the viewport. */
const RISE = [
  ".showcase-copy",
  ".auction-copy",
  ".auction-card",
  ".benefit-strip",
  ".cta-copy",
  ".story-center",
  ".story-quote",
  ".services-head",
  ".services-grid",
  ".why-overlay",
  ".why-list",
  ".stats",
  ".journal-grid",
  ".legal-body section",
].join(",");

/** Eyebrow rules that draw from the left. */
const LINES = ".eyebrow-after";

/** The only images that get a curtain reveal (kept to three on purpose). */
const CURTAIN = ".about-hero-media, .why-media, .story-img";

/**
 * One IntersectionObserver for all restrained entrance motion.
 * Content above the fold is never hidden, so nothing flashes or depends on JS.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const arm = (selector: string, cls: string) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (el.closest(".hero, .intro")) return;
        const top = el.getBoundingClientRect().top;
        const visible = top < vh * 0.92;
        if (visible && cls === "rv-rise") return; // never hide content that is already on screen
        el.classList.add(cls);
        if (visible) {
          // already visible: play straight away (curtains, lines) without hiding first
          requestAnimationFrame(() => el.classList.add("in-view"));
        } else {
          io.observe(el);
        }
      });
    };

    arm(RISE, "rv-rise");
    arm(LINES, "rv-line");
    arm(CURTAIN, "rv-curtain");
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
