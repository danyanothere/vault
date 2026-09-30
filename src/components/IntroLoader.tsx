"use client";

import { useEffect, useState } from "react";

const KEY = "vault-intro-seen";
const steps = [
  { n: "01", label: "Loading" },
  { n: "02", label: "Initialization" },
  { n: "03", label: "Loading collection" },
  { n: "04", label: "Welcome" },
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
      later(500, () => setPhase("done"));
    } else {
      later(480, () => setStep(1));
      later(960, () => setStep(2));
      later(1440, () => setStep(3));
      later(2000, () => setPhase("exit"));
      later(2500, () => setPhase("done"));
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  if (phase === "done") return null;
  const s = steps[step];

  return (
    <div className={`intro ${phase === "exit" ? "intro-exit" : ""}`} aria-hidden="true">
      <div className="intro-step" key={s.n}>
        <span className="accent">{s.n}</span> {s.label}
      </div>
      <div className="intro-center" key={step < 3 ? "logo" : "welcome"}>
        {step < 3 ? (
          <>
            <span className="intro-logo">VAULT</span>
            <span className="logo-sub">Private Automobiles</span>
          </>
        ) : (
          <span className="intro-welcome">
            Rare cars.
            <br />
            Private access.
          </span>
        )}
      </div>
      <div className="intro-progress">
        <span style={{ transform: `scaleX(${(step + 1) / 4})` }} />
      </div>
      <div className="intro-pct">{String((step + 1) * 25).padStart(3, "0")}%</div>
    </div>
  );
}
