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
 * logo → progress → a thin video slit → the slit expands into the
 * homepage hero media, where the real hero video takes over.
 *
 * The inline script in layout.tsx sets `intro-seen` (skip) or `intro-play`
 * (hero copy waits hidden) on <html> before first paint.
 */
export default function IntroLoader() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const letters = useRef<HTMLSpanElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLParagraphElement>(null);
  const meta = useRef<HTMLDivElement>(null);
  const slit = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

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
    const W = window.innerWidth;
    const H = window.innerHeight;

    // Target rectangle: the hero media area if this page has one, else the full screen.
    const target = document.querySelector<HTMLElement>(".hero-media")?.getBoundingClientRect();
    const box = target && target.height > 0 ? { x: target.left, y: target.top, w: target.width, h: target.height } : { x: 0, y: 0, w: W, h: H };
    if (video.current) {
      Object.assign(video.current.style, { left: `${box.x}px`, top: `${box.y}px`, width: `${box.w}px`, height: `${box.h}px` });
    }

    // Clip expressed as insets (px) of the full-screen slit layer.
    const clip = { t: H / 2, b: H / 2, l: box.x, r: W - box.x - box.w };
    const paint = () => {
      if (slit.current) slit.current.style.clipPath = `inset(${clip.t}px ${clip.r}px ${clip.b}px ${clip.l}px)`;
    };
    paint();
    const midY = box.y + box.h / 2;
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
      .add(clip, { t: midY - 2, b: H - midY - 2, duration: 350 * k, onUpdate: paint }, 1250 * k)
      .add(progress, { v: 100, duration: 400 * k, onUpdate: showProgress }, 1250 * k)
      .call(() => setStep(3), 1650 * k)
      .add(meta.current!, { opacity: [1, 0], duration: 300 * k }, 1700 * k)
      .add(clip, { t: box.y, b: H - box.y - box.h, duration: 650 * k, onUpdate: paint }, 1700 * k)
      .call(() => {
        window.dispatchEvent(new CustomEvent(INTRO_DONE_EVENT, { detail: { time: video.current?.currentTime } }));
      }, 2150 * k)
      .add(bg.current!, { opacity: [1, 0], duration: 350 * k }, 2250 * k)
      .add(slit.current!, { opacity: [1, 0], duration: 250 * k }, 2400 * k);

    return () => {
      tl.pause();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="intro" aria-hidden="true">
      <div ref={bg} className="intro-bg" />
      <div ref={slit} className="intro-slit">
        <video ref={video} src={hero.video.src} poster={hero.video.poster} muted playsInline autoPlay preload="auto" />
      </div>

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
