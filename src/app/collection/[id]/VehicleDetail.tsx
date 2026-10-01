"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Cog, Gauge, Car, MapPin, Settings2, Play } from "lucide-react";
import Arrow from "@/components/Arrow";
import Button from "@/components/Button";
import WatchVideo from "@/components/WatchVideo";
import { galleryOrder, getVehicle, vehicleName, vehicles, type Img, type Spec } from "@/data/vehicles";

const specIcons: Record<Spec["icon"], typeof Cog> = { engine: Gauge, gearbox: Settings2, drive: Cog, body: Car, origin: MapPin };

export default function VehicleDetail({ id }: { id: string }) {
  const v = getVehicle(id)!;
  const idx = vehicles.indexOf(v);
  const prev = vehicles[(idx - 1 + vehicles.length) % vehicles.length];
  const next = vehicles[(idx + 1) % vehicles.length];

  const items: { label: string; img: Img }[] = galleryOrder.flatMap((cat) =>
    (v.gallery[cat] ?? []).slice(0, 1).map((img) => ({ label: cat[0].toUpperCase() + cat.slice(1), img })),
  );
  const [active, setActive] = useState(0);
  const title = vehicleName(v);

  return (
    <>
      <section className="detail" aria-labelledby="detail-title">
        <div className="detail-media" aria-live="polite">
          {items.map((item, i) => (
            <Image quality={90}
              key={item.label}
              src={item.img.src}
              alt={i === active ? item.img.alt : ""}
              fill
              priority={i === 0}
              sizes="100vw"
              style={{ objectPosition: item.img.position, opacity: i === active ? 1 : 0 }}
            />
          ))}
          <div className="detail-shade" aria-hidden="true" />
        </div>

        <div className="detail-left">
          <Link href="/collection" className="back-link">
            <Arrow size={12} /> Collection
          </Link>
          <h1 id="detail-title" className="detail-title">
            {v.brand}
            <span className="dim">{v.modelLines.join(" ")}</span>
          </h1>
          <p className="detail-sub">{v.subtitle}</p>
          <p className="detail-intro">
            {v.description.map((l, i) => (
              <span key={l}>
                {i > 0 && <br />}
                {l}
              </span>
            ))}
          </p>
          <div className="detail-actions">
            <Button href="/contact" arrow>
              Request a private viewing
            </Button>
            <div className="detail-actions-row">
              <Link href="/experience" className="btn btn-outline btn-sm">
                View 360°
              </Link>
              <WatchVideo title={title} poster={v.hero.src} posterPosition={v.hero.position} />
            </div>
          </div>
        </div>

        <aside className="detail-specs" aria-label="Specifications">
          <div className="detail-specs-head">
            <p className="detail-count">
              {v.index} <span>/ {String(vehicles.length).padStart(2, "0")}</span>
            </p>
            <div className="detail-nav">
              <Link href={`/collection/${prev.id}`} className="icon-pill" aria-label={`Previous: ${vehicleName(prev)}`}>
                <Arrow size={12} />
              </Link>
              <Link href={`/collection/${next.id}`} className="icon-pill" aria-label={`Next: ${vehicleName(next)}`}>
                <Arrow size={12} />
              </Link>
            </div>
          </div>
          <dl>
            {v.specs.map((s) => {
              const Icon = specIcons[s.icon];
              return (
                <div key={s.label}>
                  <Icon size={17} strokeWidth={1.2} aria-hidden="true" />
                  <dt>{s.value}</dt>
                  <dd>{s.label}</dd>
                </div>
              );
            })}
          </dl>
        </aside>
      </section>

      <div className="gallery" role="group" aria-label="Gallery">
        {items.map((item, i) => (
          <button key={item.label} type="button" className={i === active ? "active" : undefined} aria-pressed={i === active} onClick={() => setActive(i)}>
            <span className="gallery-thumb">
              <Image quality={90} src={item.img.src} alt="" fill sizes="180px" style={{ objectPosition: item.img.position }} />
            </span>
            <span className="gallery-label">{item.label}</span>
          </button>
        ))}
        <GalleryVideo title={title} poster={v.hero.src} />
      </div>
    </>
  );
}

function GalleryVideo({ title, poster }: { title: string; poster: string }) {
  return (
    <div className="gallery-video">
      <span className="gallery-thumb">
        <Image quality={90} src={poster} alt="" fill sizes="180px" />
        <span className="gallery-play" aria-hidden="true">
          <Play size={14} strokeWidth={1.4} />
        </span>
      </span>
      <WatchVideo title={title} poster={poster} label="Video" className="gallery-video-btn" />
    </div>
  );
}
