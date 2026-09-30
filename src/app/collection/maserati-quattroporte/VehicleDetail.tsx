"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Play, Rotate3d } from "lucide-react";
import Arrow from "@/components/Arrow";
import Button from "@/components/Button";

const gallery = [
  { label: "Exterior", src: "/images/hero-sedan.jpg", pos: "55% 60%" },
  { label: "Interior", src: "/images/garage.jpg", pos: "50% 50%" },
  { label: "Details", src: "/images/headlight.jpg", pos: "50% 45%" },
  { label: "Wheels", src: "/images/sedan-road.jpg", pos: "72% 70%" },
  { label: "Engine", src: "/images/r8-dark.jpg", pos: "50% 55%" },
  { label: "Rear", src: "/images/sedan-road.jpg", pos: "50% 50%" },
  { label: "Video", src: "/images/mustang-dark.jpg", pos: "50% 55%" },
];

const specs = [
  ["3.0 L", "V6"],
  ["Automatic", "Transmission"],
  ["RWD / AWD", "Drivetrain"],
  ["Luxury sedan", "Body type"],
  ["Italy", "Origin"],
];

export default function VehicleDetail() {
  const [active, setActive] = useState(0);
  const g = gallery[active];

  return (
    <>
      <section className="detail" aria-labelledby="detail-title">
        <div className="detail-left">
          <Link href="/collection" className="back-link">
            <Arrow size={12} /> Collection
          </Link>
          <h1 id="detail-title" className="detail-title">
            Maserati
            <br />
            Quattroporte
          </h1>
          <p className="eyebrow">Italian grand touring</p>
          <p className="body-muted">
            Four doors, a Ferrari-derived heart and the quiet confidence of Italian coachbuilding. A grand tourer made
            for long distances and discreet arrivals.
          </p>
          <div className="detail-actions">
            <Button href="/contact" arrow>
              Request a private viewing
            </Button>
            <Button href="/experience" variant="ghost" icon={<Rotate3d size={12} strokeWidth={1.3} />}>
              View 360°
            </Button>
            <Button href="/experience" variant="ghost" icon={<Play size={11} strokeWidth={1.4} />}>
              Watch video
            </Button>
          </div>
        </div>

        <div className="detail-media">
          {gallery.map((item, i) => (
            <Image
              key={item.label}
              src={item.src}
              alt={i === active ? `Maserati Quattroporte — ${item.label}` : ""}
              fill
              priority={i === 0}
              sizes="(max-width: 1100px) 100vw, 60vw"
              style={{ objectPosition: item.pos, opacity: i === active ? 1 : 0 }}
            />
          ))}
        </div>

        <aside className="detail-specs" aria-label="Specifications">
          <p className="hero-count">
            <span className="accent">01</span> / 03
          </p>
          <dl>
            {specs.map(([v, l]) => (
              <div key={l}>
                <dt>{v}</dt>
                <dd>{l}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <div className="gallery" role="group" aria-label="Gallery">
        {gallery.map((item, i) => (
          <button key={item.label} type="button" className={i === active ? "active" : undefined} aria-pressed={i === active} onClick={() => setActive(i)}>
            <span className="gallery-thumb">
              <Image src={item.src} alt="" fill sizes="160px" style={{ objectPosition: item.pos }} />
            </span>
            <span className="gallery-label">{item.label}</span>
          </button>
        ))}
      </div>
      <span className="sr-only" aria-live="polite">
        {g.label}
      </span>
    </>
  );
}
