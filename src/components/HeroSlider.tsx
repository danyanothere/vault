"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { animate, stagger } from "motion";
import { vehicles } from "@/data/vehicles";
import { easeLuxury, INTRO_DONE_EVENT } from "@/lib/motion";
import Button from "./Button";
import VehicleSelector from "./VehicleSelector";
import WatchVideo from "./WatchVideo";

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const v = vehicles[active];
  const total = String(vehicles.length).padStart(2, "0");
  const step = useCallback((d: number) => setActive((a) => (a + d + vehicles.length) % vehicles.length), []);
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);

  // Intro → hero handoff: the loader's video slit becomes this media area,
  // then the copy rises out of its masks.
  useEffect(() => {
    const onDone = () => {
      const el = root.current;
      if (!el) return;
      const masks = el.querySelectorAll<HTMLElement>("[data-reveal-mask]");
      const fades = el.querySelectorAll<HTMLElement>("[data-reveal-fade]");
      animate(masks, { transform: ["translateY(105%)", "translateY(0%)"] }, { duration: 0.9, ease: easeLuxury, delay: stagger(0.12) });
      animate(fades, { opacity: [0, 1], transform: ["translateY(14px)", "translateY(0px)"] }, { duration: 0.7, ease: easeLuxury, delay: stagger(0.08, { startDelay: 0.35 }) }).then(() =>
        document.documentElement.classList.remove("intro-play"),
      );
    };
    window.addEventListener(INTRO_DONE_EVENT, onDone);
    return () => window.removeEventListener(INTRO_DONE_EVENT, onDone);
  }, []);

  const fade = reduce ? 0.2 : undefined;

  return (
    <section
      ref={root}
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured automobiles"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
    >
      <div className="hero-media" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={v.id}
            className="hero-media-layer"
            initial={{ opacity: 0, scale: reduce ? 1 : 1.03 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: fade ?? 0.6, delay: reduce ? 0 : 0.15, ease: easeLuxury } }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.985, transition: { duration: fade ?? 0.35, ease: easeLuxury } }}
          >
            <Image
              quality={90}
              src={v.hero.src}
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 100vw, 72vw"
              className="hero-photo"
              style={{ objectPosition: v.hero.position }}
            />
          </motion.div>
        </AnimatePresence>
        <motion.div
          className="hero-ambient"
          animate={{ background: `radial-gradient(ellipse 60% 70% at 62% 58%, rgba(${v.ambient}, 0.07), rgba(${v.ambient}, 0) 70%)` }}
          transition={{ duration: 0.8, ease: easeLuxury }}
        />
        <div className="hero-shade" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-after" data-reveal-fade>
            Exceptional automobiles
          </p>
          <h1 className="hero-title">
            <span className="rv-mask">
              <span className="rv-inner" data-reveal-mask>
                Rare cars.
              </span>
            </span>
            <span className="rv-mask">
              <span className="rv-inner dim" data-reveal-mask>
                Private access.
              </span>
            </span>
          </h1>
          <p className="hero-sub" data-reveal-fade>
            A curated collection of exceptional automobiles,{" "}
            <br />
            available by private enquiry.
          </p>
          <div className="hero-ctas" data-reveal-fade>
            <Button href="/contact" arrow magnetic>
              Request a private viewing
            </Button>
            <div className="hero-ctas-row">
              <Button href="/collection" variant="ghost">
                Explore collection
              </Button>
              <WatchVideo key={v.id} title={`${v.brand} ${v.modelLines.join(" ")}`} poster={v.video.poster} src={v.video.src} />
            </div>
          </div>

          <div className="hero-vehicle" data-reveal-fade aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={v.id}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: reduce ? 0 : -12, transition: { duration: fade ?? 0.15, ease: easeLuxury } }}
                variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.3 } } }}
              >
                {[
                  <p className="hero-count" key="c">
                    {v.index} / {total}
                    <span className="count-line" aria-hidden="true" />
                  </p>,
                  <h2 className="hero-vehicle-name" key="n">
                    <span>{v.brand}</span>
                    <span className="dim">{v.modelLines[0]}</span>
                  </h2>,
                  <p className="hero-vehicle-cat" key="s">
                    {v.subtitle}
                  </p>,
                  <p className="hero-pillars" key="p">
                    {v.tags.map((p, i) => (
                      <span key={p}>
                        {i > 0 && <i aria-hidden="true">|</i>}
                        {p}
                      </span>
                    ))}
                  </p>,
                ].map((child) => (
                  <motion.div
                    key={child.key}
                    variants={{
                      hidden: { opacity: 0, y: reduce ? 0 : 14 },
                      show: { opacity: 1, y: 0, transition: { duration: fade ?? 0.45, ease: easeLuxury } },
                    }}
                  >
                    {child}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <ol className="hero-dots" aria-label="Slides" data-reveal-fade>
          {vehicles.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                className={i === active ? "active" : undefined}
                aria-label={`Show ${item.brand} ${item.modelLines.join(" ")}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
              >
                {item.index}
              </button>
            </li>
          ))}
        </ol>

        <a href="#home-next" className="scroll-cue" data-reveal-fade>
          <span>Scroll</span>
          <svg width="10" height="44" viewBox="0 0 10 44" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
            <path d="M5 0v42M1 38l4 4 4-4" />
          </svg>
        </a>
      </div>

      <VehicleSelector active={active} onSelect={setActive} />
    </section>
  );
}
