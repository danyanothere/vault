"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { vehicles } from "@/data/vehicles";
import Button from "./Button";
import VehicleSelector from "./VehicleSelector";
import WatchVideo from "./WatchVideo";

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const v = vehicles[active];
  const total = String(vehicles.length).padStart(2, "0");
  const step = useCallback((d: number) => setActive((a) => (a + d + vehicles.length) % vehicles.length), []);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured automobiles"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
    >
      <div className="hero-media" aria-hidden="true">
        {vehicles.map((item, i) => (
          <Image quality={90}
            key={item.id}
            src={item.hero.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`hero-img ${i === active ? "is-active" : ""}`}
            style={{ objectPosition: item.hero.position }}
          />
        ))}
        <div className="hero-shade" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-after">Exceptional automobiles</p>
          <h1 className="hero-title">
            Rare cars.
            <br />
            <span className="dim">Private access.</span>
          </h1>
          <p className="hero-sub">
            A curated collection of exceptional automobiles,{" "}
            <br />
            available by private enquiry.
          </p>
          <div className="hero-ctas">
            <Button href="/contact" arrow>
              Request a private viewing
            </Button>
            <div className="hero-ctas-row">
              <Button href="/collection" variant="ghost">
                Explore collection
              </Button>
              <WatchVideo key={v.id} title={`${v.brand} ${v.modelLines.join(" ")}`} poster={v.video.poster} src={v.video.src} />
            </div>
          </div>

          <div className="hero-vehicle" key={v.id} aria-live="polite">
            <p className="hero-count">
              {v.index} / {total}
              <span className="count-line" aria-hidden="true" />
            </p>
            <h2 className="hero-vehicle-name">
              <span>{v.brand}</span>
              <span className="dim">{v.modelLines[0]}</span>
            </h2>
            <p className="hero-vehicle-cat">{v.subtitle}</p>
            <p className="hero-pillars">
              {v.tags.map((p, i) => (
                <span key={p}>
                  {i > 0 && <i aria-hidden="true">|</i>}
                  {p}
                </span>
              ))}
            </p>
          </div>
        </div>

        <ol className="hero-dots" aria-label="Slides">
          {vehicles.map((item, i) => (
            <li key={item.id}>
              <button type="button" className={i === active ? "active" : undefined} aria-label={`Show ${item.brand} ${item.modelLines.join(" ")}`} aria-current={i === active} onClick={() => setActive(i)}>
                {item.index}
              </button>
            </li>
          ))}
        </ol>

        <a href="#home-next" className="scroll-cue">
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
