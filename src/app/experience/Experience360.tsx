"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { DoorOpen, Expand, Hand, Package, Armchair } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const views = {
  exterior: { label: "Exterior", src: "/images/hero-sedan.jpg" },
  interior: { label: "Interior", src: "/images/garage.jpg" },
  details: { label: "Details", src: "/images/headlight.jpg" },
} as const;
type View = keyof typeof views;

export default function Experience360() {
  const [view, setView] = useState<View>("exterior");
  const [angle, setAngle] = useState(0);
  const [doors, setDoors] = useState(false);
  const [trunk, setTrunk] = useState(false);
  const [dragging, setDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const last = useRef(0);

  const onDown = (e: React.PointerEvent) => {
    setDragging(true);
    last.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - last.current;
    last.current = e.clientX;
    setAngle((a) => (a + dx * 0.4 + 360) % 360);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setAngle((a) => (a + 345) % 360);
    if (e.key === "ArrowRight") setAngle((a) => (a + 15) % 360);
  };
  const fullscreen = () => {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  // Simulated rotation: horizontal pan + mirror past 180°.
  const t = Math.sin((angle * Math.PI) / 180);
  const flip = angle > 90 && angle < 270 ? -1 : 1;
  const pos = `${50 + t * 30}% 55%`;

  return (
    <div className="container">
      <div className="exp-head">
        <SectionHeading
          as="h1"
          eyebrow="360° experience"
          title={
            <>
              Explore
              <br />
              every detail.
            </>
          }
        />
        <div className="tabs" role="tablist" aria-label="View">
          {(Object.keys(views) as View[]).map((k) => (
            <button key={k} type="button" role="tab" aria-selected={view === k} onClick={() => setView(k)}>
              {views[k].label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={stageRef}
        className={`stage ${dragging ? "dragging" : ""}`}
        tabIndex={0}
        role="img"
        aria-label={`${views[view].label} view, rotated ${Math.round(angle)} degrees. Use arrow keys to rotate.`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onKeyDown={onKey}
      >
        {(Object.keys(views) as View[]).map((k) => (
          <Image
            key={k}
            src={views[k].src}
            alt=""
            fill
            priority={k === "exterior"}
            sizes="100vw"
            draggable={false}
            style={{
              opacity: view === k ? 1 : 0,
              objectPosition: k === "exterior" ? pos : "50% 50%",
              transform: k === "exterior" ? `scaleX(${flip}) scale(${doors || trunk ? 1.06 : 1})` : undefined,
              filter: doors || trunk ? "brightness(1.12)" : undefined,
            }}
          />
        ))}
        <div className="stage-state">
          {doors && <span>Doors open</span>}
          {trunk && <span>Trunk open</span>}
        </div>
        <span className="stage-angle">{String(Math.round(angle)).padStart(3, "0")}°</span>
        <span className="stage-hint">
          <Hand size={13} strokeWidth={1.3} aria-hidden="true" /> Drag to rotate
        </span>
      </div>

      <div className="exp-actions">
        <button type="button" className="chip" aria-pressed={doors} onClick={() => setDoors((d) => !d)}>
          <DoorOpen size={14} strokeWidth={1.2} aria-hidden="true" /> Open doors
        </button>
        <button type="button" className="chip" aria-pressed={trunk} onClick={() => setTrunk((d) => !d)}>
          <Package size={14} strokeWidth={1.2} aria-hidden="true" /> Open trunk
        </button>
        <button type="button" className="chip" aria-pressed={view === "interior"} onClick={() => setView((v) => (v === "interior" ? "exterior" : "interior"))}>
          <Armchair size={14} strokeWidth={1.2} aria-hidden="true" /> Toggle interior
        </button>
        <button type="button" className="chip" onClick={fullscreen}>
          <Expand size={14} strokeWidth={1.2} aria-hidden="true" /> Full screen
        </button>
      </div>
    </div>
  );
}
