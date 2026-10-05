"use client";

import { useEffect, useState } from "react";
import { useDict } from "@/i18n/client";

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
}

/** Live countdown to a real auction date (ISO string). Renders "--" until mounted to avoid hydration mismatch. */
export default function Countdown({ target }: { target: string }) {
  const t = useDict().auction;
  const labels = t.units;
  const [parts, setParts] = useState<number[] | null>(null);

  useEffect(() => {
    const end = new Date(target).getTime();
    const tick = () => setParts(split(end - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <div className="countdown" role="timer" aria-label={t.timer}>
      {labels.map((label, i) => (
        <div key={label} className="countdown-box">
          <span className="countdown-num">{parts ? String(parts[i]).padStart(2, "0") : "--"}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
