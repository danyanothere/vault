"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Mouse, DoorOpen, Package, Armchair, Expand, Shrink, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { maseratiExperience as media, type Frame } from "@/data/experience";
import { easeLuxury } from "@/lib/motion";

type Mode = "exterior" | "interior" | "details";
const modes: Mode[] = ["exterior", "interior", "details"];
const STEP_PX = 60; // horizontal drag distance per frame (use ~12px for a 36-frame turntable)

export default function Experience360() {
  const [mode, setMode] = useState<Mode>("exterior");
  const [doors, setDoors] = useState(false);
  const [trunk, setTrunk] = useState(false);
  const [frame, setFrame] = useState(0);
  const [full, setFull] = useState<"off" | "native" | "overlay">("off");
  const [dragging, setDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ x: 0, acc: 0, raf: 0, pending: 0 });
  const reduce = useReducedMotion();

  const picked: Frame[] =
    mode === "exterior" ? (doors ? media.exterior.doorsOpen : trunk ? media.exterior.trunkOpen : media.exterior.closed) : media[mode];
  const frames = picked.length ? picked : media.exterior.closed;
  const count = frames.length;
  const current = frames[((frame % count) + count) % count];
  const trunkAvailable = media.exterior.trunkOpen.length > 0;
  const doorsAvailable = media.exterior.doorsOpen.length > 0;

  const go = useCallback((d: number) => setFrame((f) => (((f + d) % count) + count) % count), [count]);

  const selectMode = (m: Mode) => {
    setMode(m);
    setFrame(0);
    if (m !== "exterior") {
      setDoors(false);
      setTrunk(false);
    }
  };

  /* pointer drag → frame steps, batched per animation frame */
  const onDown = (e: React.PointerEvent) => {
    drag.current.x = e.clientX;
    drag.current.acc = 0;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const d = drag.current;
    d.acc += e.clientX - d.x;
    d.x = e.clientX;
    const steps = Math.trunc(d.acc / STEP_PX);
    if (!steps) return;
    d.acc -= steps * STEP_PX;
    d.pending -= steps; // drag right turns the car towards its left side
    if (!d.raf) {
      d.raf = requestAnimationFrame(() => {
        const p = d.pending;
        d.pending = 0;
        d.raf = 0;
        go(p);
      });
    }
  };
  const onUp = (e: React.PointerEvent) => {
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  /* fullscreen: native API, falling back to a fixed overlay */
  const toggleFull = async () => {
    if (full === "native") {
      await document.exitFullscreen?.();
      return;
    }
    if (full === "overlay") {
      setFull("off");
      return;
    }
    const el = stageRef.current;
    if (el?.requestFullscreen) {
      try {
        await el.requestFullscreen();
        setFull("native");
        return;
      } catch {
        // fall through to overlay
      }
    }
    setFull("overlay");
  };

  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) setFull((f) => (f === "native" ? "off" : f));
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFull((f) => (f === "overlay" ? "off" : f));
    };
    document.addEventListener("fullscreenchange", onChange);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = full === "overlay" ? "hidden" : "";
  }, [full]);

  /* preload neighbours of the current frame */
  useEffect(() => {
    [-2, -1, 1, 2].forEach((o) => {
      const f = frames[(((frame + o) % count) + count) % count];
      const img = new window.Image();
      img.src = `/_next/image?url=${encodeURIComponent(f.src)}&w=1920&q=90`;
    });
  }, [frame, frames, count]);

  /* then warm the cache with every other view once the page is idle */
  useEffect(() => {
    const all = [...media.exterior.closed, ...media.exterior.doorsOpen, ...media.exterior.trunkOpen, ...media.interior, ...media.details];
    const run = () =>
      all.forEach((f) => {
        const img = new window.Image();
        img.src = `/_next/image?url=${encodeURIComponent(f.src)}&w=1920&q=90`;
      });
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(run) : window.setTimeout(run, 2500);
    return () => {
      if (!w.requestIdleCallback) window.clearTimeout(id);
    };
  }, []);

  const isFull = full !== "off";

  return (
    <section className="exp" aria-labelledby="exp-title">
      <div
        ref={stageRef}
        className={`exp-stage ${dragging ? "dragging" : ""} ${full === "overlay" ? "is-overlay" : ""}`}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(-1);
          if (e.key === "ArrowRight") go(1);
        }}
      >
        <div
          className="exp-view"
          data-cursor="drag"
          data-mode={mode}
          tabIndex={0}
          role="img"
          aria-roledescription="360 degree viewer"
          aria-label={`${mode} view: ${current.label}. Drag or use arrow keys to change the angle.`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={`${mode}-${doors}-${trunk}`}
              className="exp-set"
              initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 0% 100%)" }}
              animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.3 } }}
              transition={{ duration: 0.75, ease: easeLuxury }}
            >
              {frames.map((f, i) => {
                const cur = ((frame % count) + count) % count;
                const dist = Math.min(Math.abs(i - cur), count - Math.abs(i - cur));
                if (dist > 2) return null;
                return (
                  <Image
                    quality={90}
                    key={`${f.src}-${f.label}`}
                    src={f.src}
                    alt=""
                    fill
                    sizes="100vw"
                    priority={i === cur}
                    draggable={false}
                    className={i === cur ? "is-active" : undefined}
                    style={{ objectPosition: f.position }}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
          <div className="exp-shade" aria-hidden="true" />
        </div>

        <div className="exp-head">
          <span className="exp-cube" aria-hidden="true">
            <Box size={22} strokeWidth={1.1} />
          </span>
          <div>
            <h1 id="exp-title" className="exp-title">
              360° Experience
            </h1>
            <p className="exp-sub">Explore every detail</p>
          </div>
        </div>

        <div className="exp-modes" role="tablist" aria-label="View">
          {modes.map((m) => (
            <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => selectMode(m)}>
              {m}
            </button>
          ))}
        </div>

        <div className="exp-frame-nav">
          <button type="button" className="icon-circle" aria-label="Previous angle" onClick={() => go(-1)}>
            <ChevronLeft size={16} strokeWidth={1.3} />
          </button>
          <span className="exp-frame-label">
            {current.label}
            <small>
              {String(((frame % count) + count) % count + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </small>
          </span>
          <button type="button" className="icon-circle" aria-label="Next angle" onClick={() => go(1)}>
            <ChevronRight size={16} strokeWidth={1.3} />
          </button>
        </div>

        <div className="exp-controls">
          <div className="exp-control is-static">
            <Mouse size={22} strokeWidth={1} aria-hidden="true" />
            <span>Drag to explore</span>
          </div>
          <button
            type="button"
            className="exp-control"
            aria-pressed={doors}
            disabled={!doorsAvailable}
            onClick={() => {
              setMode("exterior");
              setTrunk(false);
              setDoors((d) => !d);
              setFrame(0);
            }}
          >
            <DoorOpen size={22} strokeWidth={1} aria-hidden="true" />
            <span>{doors ? "Close door" : "Open door"}</span>
          </button>
          <button
            type="button"
            className="exp-control"
            aria-pressed={trunk}
            disabled={!trunkAvailable}
            title={trunkAvailable ? undefined : "Trunk imagery coming soon"}
            onClick={() => {
              setMode("exterior");
              setDoors(false);
              setTrunk((t) => !t);
              setFrame(0);
            }}
          >
            <Package size={22} strokeWidth={1} aria-hidden="true" />
            <span>{trunkAvailable ? "Open trunk" : "Open trunk · soon"}</span>
          </button>
          <button type="button" className="exp-control" aria-pressed={mode === "interior"} onClick={() => selectMode(mode === "interior" ? "exterior" : "interior")}>
            <Armchair size={22} strokeWidth={1} aria-hidden="true" />
            <span>Toggle interior</span>
          </button>
          <button type="button" className="exp-control" aria-pressed={isFull} onClick={toggleFull}>
            {isFull ? <Shrink size={22} strokeWidth={1} aria-hidden="true" /> : <Expand size={22} strokeWidth={1} aria-hidden="true" />}
            <span>{isFull ? "Exit full screen" : "Full screen"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
