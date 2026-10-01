"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Label = "drag" | "view" | "play" | "explore";

/**
 * Desktop-only contextual cursor. It appears only over elements marked with
 * `data-cursor`, follows the pointer on a quick spring and never blocks events.
 * Also drives the subtle magnetic pull of `[data-magnetic]` CTAs.
 */
export default function ContextCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<Label | null>(null);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-context-cursor");
    let magnet: HTMLElement | null = null;
    let raf = 0;
    let last: PointerEvent | null = null;

    const release = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };

    const frame = () => {
      raf = 0;
      const e = last;
      if (!e) return;
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      const zone = target?.closest<HTMLElement>("[data-cursor]");
      setLabel((zone?.dataset.cursor as Label) ?? null);

      const m = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (m !== magnet) release();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        const dx = ((e.clientX - (r.left + r.width / 2)) / r.width) * 9;
        const dy = ((e.clientY - (r.top + r.height / 2)) / r.height) * 8;
        m.style.transform = `translate(${Math.max(-4.5, Math.min(4.5, dx))}px, ${Math.max(-3.5, Math.min(3.5, dy))}px)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = e;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeave = () => {
      setLabel(null);
      release();
    };

    // content moves under a still pointer while scrolling: drop the label until the mouse moves again
    const onScroll = () => {
      setLabel(null);
      release();
    };

    const onDown = (e: PointerEvent) => e.pointerType === "mouse" && setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      release();
      document.documentElement.classList.remove("has-context-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div className="ctx-cursor" style={{ x: sx, y: sy }} aria-hidden="true">
      <motion.span
        className={`ctx-cursor-dot ${pressed ? "is-pressed" : ""}`}
        animate={{ scale: label ? (pressed ? 0.92 : 1) : 0.6, opacity: label ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 38 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
