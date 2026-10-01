"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotionSafe } from "@/lib/motion";
import type { Vehicle } from "@/data/vehicles";
import Button from "./Button";
import WatchVideo from "./WatchVideo";
import VehicleShowcase from "./VehicleShowcase";
import ViewportVideo from "./motion/ViewportVideo";

/** Fade/rise a layer in over [a,b] and out over [c,d] of the scroll progress. */
function useLayer(p: MotionValue<number>, a: number, b: number, c: number, d: number) {
  // Offsets must stay inside [0, 1] and strictly increase (WAAPI-accelerated scroll animations).
  const input = [a, b, c, d];
  const op = [0, 1, 1, 0];
  const ys = [24, 0, 0, -24];
  const keep = input.map((v, i) => (v >= 0 && v <= 1 ? i : -1)).filter((i) => i >= 0);
  const opacity = useTransform(p, keep.map((i) => input[i]), keep.map((i) => op[i]));
  const y = useTransform(p, keep.map((i) => input[i]), keep.map((i) => ys[i]));
  // hidden layers must not catch clicks or focus
  const visibility = useTransform(opacity, (o) => (o < 0.04 ? "hidden" : "visible"));
  return { opacity, y, visibility };
}

/**
 * Sticky scroll story for the BRABUS GLS. The video's own camera move provides the motion;
 * scroll only drives type, scale and masks (never video.currentTime).
 */
export default function BrabusStory({ vehicle }: { vehicle: Vehicle }) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scale = useTransform(p, [0, 1], [1, 1.035]);
  const shade = useTransform(p, [0, 0.15, 0.85, 1], [0.35, 0.55, 0.55, 0.8]);
  const exitClip = useTransform(p, [0.94, 1], ["inset(0% 0% 0% 0%)", "inset(0% 0% 6% 0%)"]);

  const intro = useLayer(p, -1, 0, 0.12, 0.2);
  const v8 = useLayer(p, 0.2, 0.27, 0.34, 0.4);
  const hp = useLayer(p, 0.4, 0.47, 0.54, 0.6);
  const matic = useLayer(p, 0.6, 0.66, 0.72, 0.77);
  const outro = useLayer(p, 0.78, 0.85, 1, 2);
  const line = useTransform(p, [0.6, 0.72], [0, 1]);
  const bar = useTransform(p, [0, 1], [0, 1]);

  // Reduced motion: the standard showcase, no pinning.
  if (reduce) return <VehicleShowcase vehicle={vehicle} />;

  const name = `${vehicle.brand} ${vehicle.modelLines.join(" ")}`;

  return (
    <section ref={ref} id={vehicle.id} className="story-scroll" aria-label={`${name} — ${vehicle.tagline.join(" ")}`}>
      <motion.div className="story-sticky" style={{ clipPath: exitClip }}>
        <motion.div className="story-media" style={{ scale }}>
          <ViewportVideo src={vehicle.video.src} poster={vehicle.video.poster} className="story-video" />
        </motion.div>
        <motion.div className="story-shade" style={{ opacity: shade }} aria-hidden="true" />

        <div className="story-hud" aria-hidden="true">
          <span>{vehicle.index} / 03</span>
          <span className="story-progress">
            <motion.span style={{ scaleX: bar }} />
          </span>
          <span>{vehicle.brand}</span>
        </div>

        <motion.div className="story-layer story-intro" style={intro}>
          <h2 className="story-name">
            <span>{vehicle.brand}</span>
            <span className="dim">{vehicle.modelLines[0]}</span>
          </h2>
          <p className="story-tag">
            {vehicle.tagline[0]}
            <br />
            {vehicle.tagline[1]}
          </p>
        </motion.div>

        <motion.div className="story-layer story-spec" style={v8} aria-hidden="true">
          <span className="story-big">V8</span>
          <span className="story-label">4.0 L biturbo · hand-finished engine</span>
        </motion.div>

        <motion.div className="story-layer story-spec" style={hp} aria-hidden="true">
          <span className="story-big">
            800<small>HP</small>
          </span>
          <span className="story-label">1,000 Nm of torque</span>
        </motion.div>

        <motion.div className="story-layer story-spec" style={matic} aria-hidden="true">
          <span className="story-big story-big-sm">4MATIC</span>
          <motion.span className="story-line" style={{ scaleX: line }} />
          <span className="story-label">Permanent all-wheel drive</span>
        </motion.div>

        <motion.div className="story-layer story-outro" style={outro}>
          <p className="story-final">
            Power.
            <br />
            Without
            <br />
            compromise.
          </p>
          <div className="story-actions">
            <Button href="/contact" arrow magnetic>
              Request a private viewing
            </Button>
            <WatchVideo title={name} poster={vehicle.video.poster} src={vehicle.video.src} />
          </div>
        </motion.div>

        <ul className="story-specs-list sr-only">
          {vehicle.quickSpecs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
