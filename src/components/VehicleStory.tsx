"use client";

import Image from "next/image";
import Link from "@/i18n/client";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Vehicle } from "@/data/vehicles";
import { localizeVehicle, vehicles } from "@/data/vehicles";
import { useDict } from "@/i18n/client";
import { easeLuxury, useReducedMotionSafe } from "@/lib/motion";
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

/** Progress at which the sharp still hands over to the moving film. */
const FILM_FROM = 0.12;

/**
 * Sticky scroll story for one vehicle. It opens on the full-resolution photograph;
 * once the specs start, the film (which begins on that same frame) fades in and plays.
 * Scroll drives type, scale and masks only — never video.currentTime.
 */
export default function VehicleStory({ vehicle: raw }: { vehicle: Vehicle }) {
  const dict = useDict();
  const vehicle = localizeVehicle(raw, dict);
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLElement>(null);
  const [film, setFilm] = useState(false);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(p, "change", (v) => setFilm(v > FILM_FROM));

  const scale = useTransform(p, [0, 1], [1, 1.035]);
  const shade = useTransform(p, [0, 0.15, 0.85, 1], [0.35, 0.55, 0.55, 0.8]);
  const exitClip = useTransform(p, [0.94, 1], ["inset(0% 0% 0% 0%)", "inset(0% 0% 6% 0%)"]);
  const bar = useTransform(p, [0, 1], [0, 1]);

  const intro = useLayer(p, -1, 0, 0.12, 0.2);
  const s1 = useLayer(p, 0.2, 0.27, 0.34, 0.4);
  const s2 = useLayer(p, 0.4, 0.47, 0.54, 0.6);
  const s3 = useLayer(p, 0.6, 0.66, 0.72, 0.77);
  const outro = useLayer(p, 0.78, 0.85, 1, 2);
  const line = useTransform(p, [0.6, 0.72], [0, 1]);

  // Reduced motion: the standard showcase, no pinning.
  if (reduce) return <VehicleShowcase vehicle={vehicle} />;

  const name = `${vehicle.brand} ${vehicle.modelLines.join(" ")}`;
  const layers = [s1, s2, s3];
  const total = String(vehicles.length).padStart(2, "0");

  return (
    <>
      <MobileStory vehicle={vehicle} total={total} />
    <section ref={ref} id={vehicle.id} className="story-scroll" aria-label={`${name} — ${vehicle.tagline.join(" ")}`}>
      <motion.div className="story-sticky" style={{ clipPath: exitClip }}>
        <motion.div className="story-media" style={{ scale }}>
          <Image
            quality={90}
            src={vehicle.showcase.src}
            alt={vehicle.showcase.alt}
            fill
            sizes="100vw"
            className="story-photo"
            style={{ objectPosition: vehicle.showcase.position }}
          />
          <motion.div
            className="story-film"
            initial={false}
            animate={{ opacity: film ? 1 : 0 }}
            transition={{ duration: 0.9, ease: easeLuxury }}
          >
            <ViewportVideo src={vehicle.video.src} className="story-video" active={film} restart style={{ objectPosition: vehicle.showcase.position }} />
          </motion.div>
        </motion.div>
        <motion.div className="story-shade" style={{ opacity: shade }} aria-hidden="true" />
        <Link href={`/collection/${vehicle.id}`} className="story-link" data-cursor="explore" aria-label={`${dict.common.view} ${name}`} />

        <div className="story-hud" aria-hidden="true">
          <span>
            {vehicle.index} / {total}
          </span>
          <span className="story-progress">
            <motion.span style={{ scaleX: bar }} />
          </span>
          <span>{vehicle.brand}</span>
        </div>

        <motion.div className="story-layer story-intro" style={intro}>
          <h2 className="story-name">
            <span>{vehicle.brand}</span>
            <span className="dim">{vehicle.modelLines.join(" ")}</span>
          </h2>
          <p className="story-tag">
            {vehicle.tagline[0]}
            {vehicle.tagline[1] && (
              <>
                <br />
                {vehicle.tagline[1]}
              </>
            )}
          </p>
        </motion.div>

        {vehicle.story.specs.map((s, i) => (
          <motion.div key={s.big} className="story-layer story-spec" style={layers[i]} aria-hidden="true">
            <span className={`story-big ${s.big.length > 4 ? "story-big-sm" : ""}`}>
              {s.big}
              {s.unit && <small>{s.unit}</small>}
            </span>
            {i === 2 && <motion.span className="story-line" style={{ scaleX: line }} />}
            <span className="story-label">{s.label}</span>
          </motion.div>
        ))}

        <motion.div className="story-layer story-outro" style={outro}>
          <p className="story-final">
            {vehicle.story.final.map((l, i) => (
              <span key={l}>
                {i > 0 && <br />}
                {l}
              </span>
            ))}
          </p>
          <div className="story-actions">
            <Button href="/contact" arrow magnetic>
              {dict.common.requestViewing}
            </Button>
            <WatchVideo label={dict.common.watchVideo} title={name} poster={vehicle.video.poster} src={vehicle.video.src} />
          </div>
        </motion.div>

        <ul className="sr-only">
          {vehicle.quickSpecs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </motion.div>
    </section>
    </>
  );
}

/**
 * Phones: a calm, unpinned editorial block — sharp photo, name, three specs, CTA.
 * No film and no sticky scrolling (shown/hidden with CSS so markup stays SSR-stable).
 */
function MobileStory({ vehicle, total }: { vehicle: Vehicle; total: string }) {
  const dict = useDict();
  const name = `${vehicle.brand} ${vehicle.modelLines.join(" ")}`;
  return (
    <section className="story-m" aria-label={name}>
      <Link href={`/collection/${vehicle.id}`} className="story-m-media" aria-label={`${dict.common.view} ${name}`}>
        <Image quality={85} src={vehicle.showcase.src} alt={vehicle.showcase.alt} fill sizes="100vw" style={{ objectPosition: vehicle.showcase.position }} />
        <span className="story-m-count">
          {vehicle.index} / {total}
        </span>
      </Link>
      <div className="story-m-copy">
        <h2 className="story-m-name">
          <span>{vehicle.brand}</span>
          <span className="dim">{vehicle.modelLines.join(" ")}</span>
        </h2>
        <p className="story-tag">{vehicle.tagline.filter(Boolean).join(" ")}</p>
        <ul className="story-m-specs">
          {vehicle.story.specs.map((s) => (
            <li key={s.big}>
              <span className="story-m-big">
                {s.big}
                {s.unit && <small>{s.unit}</small>}
              </span>
              <span className="story-m-label">{s.label}</span>
            </li>
          ))}
        </ul>
        <div className="story-m-actions">
          <Button href="/contact" arrow>
            {dict.common.requestViewing}
          </Button>
          <Link href={`/collection/${vehicle.id}`} className="btn btn-ghost">
            <span>{dict.common.viewDetails}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
