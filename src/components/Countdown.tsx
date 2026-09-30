"use client";

import { useEffect, useState } from "react";

const OFFSET = (((2 * 24 + 14) * 60 + 37) * 60 + 21) * 1000;
const KEY = "vault-auction-target";
const initial = [2, 14, 37, 21];
const labels = ["Days", "Hours", "Min", "Sec"];

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
}

export default function Countdown() {
  // Server and first client render share the same static values, so hydration always matches.
  const [parts, setParts] = useState(initial);

  useEffect(() => {
    let target = Date.now() + OFFSET;
    try {
      const saved = Number(sessionStorage.getItem(KEY));
      if (saved > Date.now()) target = saved;
      else sessionStorage.setItem(KEY, String(target));
    } catch {
      // storage unavailable: fall back to an in-memory target
    }
    const tick = () => setParts(split(target - Date.now()));
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="countdown" role="timer" aria-label="Time until auction">
      {parts.map((p, i) => (
        <div key={labels[i]} className="countdown-box">
          <span className="countdown-num">{String(p).padStart(2, "0")}</span>
          <span className="countdown-label">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}
