"use client";

import { useEffect, useRef, useState } from "react";
import { createTimeline, cubicBezier, stagger } from "animejs";
import { vehicles } from "@/data/vehicles";
import { INTRO_DONE_EVENT } from "@/lib/motion";

const KEY = "vault-intro-seen";
const STEPS = ["Loading", "Initialization", "Loading collection", "Welcome"];
const hero = vehicles[0];

/**
 * Cinematic boot. Anime.js drives the whole timeline:
 * logo → progress → a thin slit → two black panels part to reveal the
 * homepage hero media, where the real hero video takes over.
 *
 * The inline script in layout.tsx sets `intro-seen` (skip) or `intro-play`
 * (hero copy waits hidden) on <html> before first paint.
 */
export default function IntroLoader() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const letters = useRef<HTMLSpanElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLParagraphElement>(null);
  const meta = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {
      // storage unavailable: play once per page load
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced || !html.classList.contains("intro-play")) {
      html.classList.remove("intro-play");
      queueMicrotask(() => setDone(true));
      return;
    }

    const mobile = window.innerWidth < 700;
    const k = mobile ? 0.72 : 1; // shorter choreography on phones
    const H = window.innerHeight;

    // The slit opens on the horizon of the hero media (or the screen centre on other pages).
    // The page itself sits underneath in its final layout: only two black panels move,
    // so the media geometry never jumps.
    const target = document.querySelector<HTMLElement>(".hero-media")?.getBoundingClientRect();
    const midY = target && target.height > 0 ? target.top + target.height / 2 : H / 2;
    if (top.current) top.current.style.height = `${midY}px`;
    if (bottom.current) bottom.current.style.top = `${midY}px`;

    const progress = { v: 0 };
    const showProgress = () => {
      if (bar.current) bar.current.style.transform = `scaleX(${Math.max(progress.v, 2) / 100})`;
      if (pct.current) pct.current.textContent = `${Math.round(progress.v)}%`;
    };

    const ease = cubicBezier(0.22, 1, 0.36, 1);
    const finish = () => {
      setDone(true);
      // Safety net: never leave hero copy hidden (e.g. intro finished on another page).
      window.setTimeout(() => html.classList.remove("intro-play"), 1600);
    };

    const tl = createTimeline({ defaults: { ease }, onComplete: finish });
    tl.add(letters.current!.children, { opacity: [0, 1], translateY: [10, 0], duration: 600 * k, delay: stagger(60 * k) }, 0)
      .add(progress, { v: 35, duration: 700 * k, onUpdate: showProgress }, 0)
      .call(() => setStep(1), 650 * k)
      .add(letters.current!, { letterSpacing: ["0.42em", "0.2em"], marginRight: ["-0.42em", "-0.2em"], duration: 600 * k }, 650 * k)
      .add(progress, { v: 72, duration: 500 * k, onUpdate: showProgress }, 700 * k)
      .call(() => setStep(2), 1150 * k)
      .add(logo.current!, { opacity: [1, 0], translateY: [0, -12], duration: 350 * k }, 1150 * k)
      .add(label.current!, { opacity: [0, 1], translateY: [8, 0], duration: 400 * k }, 1250 * k)
      .add(top.current!, { translateY: [0, -2], duration: 350 * k }, 1250 * k)
      .add(bottom.current!, { translateY: [0, 2], duration: 350 * k }, 1250 * k)
      .add(progress, { v: 100, duration: 400 * k, onUpdate: showProgress }, 1250 * k)
      .call(() => setStep(3), 1650 * k)
      .add(meta.current!, { opacity: [1, 0], duration: 280 * k }, 1650 * k)
      .add(top.current!, { translateY: -midY, duration: 700 * k }, 1700 * k)
      .add(bottom.current!, { translateY: H - midY, duration: 700 * k }, 1700 * k)
      // hand over at ~55% of the opening so the hero copy rises while the curtain is still moving
      .call(() => {
        window.dispatchEvent(new CustomEvent(INTRO_DONE_EVENT));
      }, 2080 * k);

    return () => {
      tl.pause();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="intro" aria-hidden="true">
      <div ref={top} className="intro-panel intro-panel-top" />
      <div ref={bottom} className="intro-panel intro-panel-bottom" />

      <div ref={meta} className="intro-meta">
        <div className="intro-step" key={step}>
          <span>{String(step + 1).padStart(2, "0")}</span> {STEPS[step]}
        </div>
        <div className="intro-center">
          <div ref={logo} className="intro-logo-wrap">
            <span ref={letters} className="intro-logo">
              {"VAULT".split("").map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </span>
            <span className="logo-sub">Private Automobiles</span>
          </div>
          <p ref={label} className="intro-vehicle">
            {hero.brand} {hero.modelLines.join(" ")}
          </p>
          <div className="intro-bar">
            <div className="intro-progress">
              <span ref={bar} />
            </div>
            <span ref={pct} className="intro-pct">
              0%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
