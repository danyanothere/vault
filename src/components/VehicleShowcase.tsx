"use client";

import Image from "next/image";
import Link from "@/i18n/client";
import type { Vehicle } from "@/data/vehicles";
import { localizeVehicle, vehicles } from "@/data/vehicles";
import { useDict } from "@/i18n/client";
import Button from "./Button";
import WatchVideo from "./WatchVideo";

type Props = { vehicle: Vehicle; priority?: boolean };

export default function VehicleShowcase({ vehicle: raw, priority = false }: Props) {
  const dict = useDict();
  const vehicle = localizeVehicle(raw, dict);
  const total = String(vehicles.length).padStart(2, "0");
  const [first, ...rest] = vehicle.modelLines;
  const multi = vehicle.modelLines.length > 1;
  return (
    <section id={vehicle.id} className="showcase" aria-labelledby={`sc-${vehicle.id}`}>
      <div className="showcase-media">
        <Image quality={90} src={vehicle.showcase.src} alt={vehicle.showcase.alt} fill sizes="(max-width: 900px) 100vw, 70vw" priority={priority} style={{ objectPosition: vehicle.showcase.position }} />
        <div className="showcase-shade" aria-hidden="true" />
        <Link href={`/collection/${vehicle.id}`} className="showcase-media-link" data-cursor="explore" aria-label={`${dict.common.view} ${vehicle.brand} ${vehicle.modelLines.join(" ")}`} />
      </div>

      <div className="showcase-copy">
        <p className="hero-count">
          {vehicle.index} / {total}
          <span className="count-line" aria-hidden="true" />
        </p>
        <h2 id={`sc-${vehicle.id}`} className={`showcase-name ${multi ? "is-multi" : ""}`}>
          <span className="sn-brand">{vehicle.brand}</span>
          <span className={multi ? "sn-big" : "sn-model"}>{first}</span>
          {rest.map((l) => (
            <span key={l} className="sn-sub">
              {l}
            </span>
          ))}
        </h2>
        <p className="showcase-tagline">
          {vehicle.tagline[0]}
          {vehicle.tagline[1] && (
            <>
              <br />
              {vehicle.tagline[1]}
            </>
          )}
        </p>
        <p className="showcase-desc">
          {vehicle.description.map((l, i) => (
            <span key={l}>
              {i > 0 && <br />}
              {l}
            </span>
          ))}
        </p>
        <div className="showcase-actions">
          <Button href="/contact" arrow magnetic>
            {dict.common.requestViewing}
          </Button>
          <WatchVideo label={dict.common.watchVideo} title={`${vehicle.brand} ${vehicle.modelLines.join(" ")}`} poster={vehicle.video.poster} src={vehicle.video.src} />
        </div>
      </div>

      <ol className="showcase-dots" aria-label={dict.common.collection}>
        {vehicles.map((v) => (
          <li key={v.id}>
            <Link
              href={`/collection/${v.id}`}
              className={v.id === vehicle.id ? "active" : undefined}
              aria-current={v.id === vehicle.id ? "true" : undefined}
              aria-label={`${v.brand} ${v.modelLines.join(" ")}`}
            >
              {v.index}
            </Link>
          </li>
        ))}
      </ol>

      <ul className="showcase-specs" aria-label={dict.detail.specs}>
        {vehicle.quickSpecs.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  );
}
