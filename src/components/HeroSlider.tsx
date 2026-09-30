"use client";

import Image from "next/image";
import { useState } from "react";
import { vehicles } from "@/data/vehicles";
import Button from "./Button";
import VehicleSelector from "./VehicleSelector";

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const v = vehicles[active];
  const total = String(vehicles.length).padStart(2, "0");

  return (
    <section className="hero" aria-label="Featured automobiles">
      <div className="hero-media" aria-hidden="true">
        {vehicles.map((item, i) => (
          <Image
            key={item.slug}
            src={item.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`hero-img ${i === active ? "is-active" : ""}`}
            style={{ objectPosition: item.position }}
          />
        ))}
        <div className="hero-shade" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-line">Exceptional automobiles</p>
          <h1 className="hero-title">
            Rare cars.
            <br />
            Private access.
          </h1>
          <p className="hero-sub">
            A curated collection of exceptional automobiles,{" "}
            <br />
            available by private enquiry.
          </p>
          <div className="hero-ctas">
            <Button href="/contact" arrow>Request a private viewing</Button>
            <Button href="/collection" variant="ghost">Explore collection</Button>
          </div>
        </div>

        <div className="hero-vehicle" key={v.slug}>
          <p className="hero-count">
            <span className="accent">{v.index}</span> / {total}
          </p>
          <h2 className="hero-vehicle-name">
            <span>{v.make}</span>
            <span>{v.modelLines.join(" ")}</span>
          </h2>
          <p className="hero-vehicle-cat">{v.category}</p>
          <p className="hero-pillars">
            {v.pillars.map((p, i) => (
              <span key={p}>
                {i > 0 && <i aria-hidden="true">|</i>}
                {p}
              </span>
            ))}
          </p>
        </div>

        <ol className="hero-dots" aria-label="Slides">
          {vehicles.map((item, i) => (
            <li key={item.slug}>
              <button
                type="button"
                className={i === active ? "active" : undefined}
                aria-label={`Show ${item.make} ${item.model}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
              >
                {item.index}
              </button>
            </li>
          ))}
        </ol>

        <div className="hero-bottom">
          <VehicleSelector active={active} onSelect={setActive} />
          <a href="#home-intro" className="scroll-cue">
            <span>Scroll</span>
            <svg width="10" height="22" viewBox="0 0 10 22" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <path d="M5 0v20M1 16l4 4 4-4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
