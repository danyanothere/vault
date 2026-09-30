import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { vehicles } from "@/data/vehicles";
import Button from "./Button";

type Props = { vehicle: Vehicle; reverse?: boolean; priority?: boolean };

export default function VehicleShowcase({ vehicle, reverse = false, priority = false }: Props) {
  const total = String(vehicles.length).padStart(2, "0");
  return (
    <section className={`showcase ${reverse ? "showcase-reverse" : ""}`} aria-labelledby={`sc-${vehicle.slug}`}>
      <div className="showcase-media">
        <Image
          src={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          sizes="(max-width: 900px) 100vw, 64vw"
          priority={priority}
          style={{ objectPosition: vehicle.position }}
        />
        <div className="showcase-shade" aria-hidden="true" />
      </div>
      <div className="showcase-copy">
        <p className="hero-count">
          <span className="accent">{vehicle.index}</span> / {total}
        </p>
        <h2 id={`sc-${vehicle.slug}`} className="showcase-name">
          {vehicle.make}
          {vehicle.modelLines.map((l) => (
            <span key={l}>
              <br />
              {l}
            </span>
          ))}
        </h2>
        <p className="showcase-tagline">
          {vehicle.tagline[0]}
          <br />
          {vehicle.tagline[1]}
        </p>
        <p className="body-muted showcase-desc">{vehicle.description}</p>
        <div className="btn-row">
          <Button href="/contact" arrow>Request a private viewing</Button>
          <Button href="/experience" variant="ghost" icon={<Play size={11} strokeWidth={1.4} />}>
            Watch video
          </Button>
        </div>
        <ul className="spec-line" aria-label="Key specifications">
          {vehicle.specs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        {vehicle.slug === "maserati-quattroporte" && (
          <Link href="/collection/maserati-quattroporte" className="text-link">
            View full details
          </Link>
        )}
      </div>
    </section>
  );
}
