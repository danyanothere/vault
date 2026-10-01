"use client";

import { useEffect, useState } from "react";

const KEY = "vault-intro-seen";
const steps = [
  { n: "01", label: "Loading", pct: 0 },
  { n: "02", label: "Initialization", pct: 35 },
  { n: "03", label: "Loading collection", pct: 72 },
  { n: "04", label: "Welcome", pct: 100 },
];

// The inline script in layout.tsx adds `intro-seen` to <html> before paint,
// so returning visitors never see the overlay flash.
export default function IntroLoader() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"run" | "exit" | "done">("run");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {
      // storage unavailable: play once per page load
    }
    const timers: number[] = [];
    const later = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    if (seen) {
      later(0, () => setPhase("done"));
    } else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      later(0, () => setStep(3));
      later(450, () => setPhase("done"));
    } else {
      later(450, () => setStep(1));
      later(1000, () => setStep(2));
      later(1500, () => setStep(3));
      later(2050, () => setPhase("exit"));
      later(2700, () => setPhase("done"));
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  if (phase === "done") return null;
  const s = steps[step];

  return (
    <div className={`intro ${phase === "exit" ? "intro-exit" : ""}`} aria-hidden="true">
      <div className="intro-step" key={s.n}>
        <span>{s.n}</span> {s.label}
      </div>
      <div className="intro-center" key={step === 1 ? "v" : "logo"}>
        {step === 1 ? (
          <span className="intro-v">V</span>
        ) : (
          <>
            <span className="intro-logo">VAULT</span>
            <span className="logo-sub">Private Automobiles</span>
          </>
        )}
        <div className="intro-bar">
          <div className="intro-progress">
            <span style={{ transform: `scaleX(${Math.max(s.pct, 2) / 100})` }} />
          </div>
          <span className="intro-pct">{s.pct}%</span>
        </div>
        {step === 3 && <p className="intro-welcome">Rare cars. Private access.</p>}
      </div>
    </div>
  );
}
