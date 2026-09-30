"use client";

import Image from "next/image";
import { vehicles } from "@/data/vehicles";
import Arrow from "./Arrow";

export default function VehicleSelector({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <div className="selector" role="group" aria-label="Select vehicle">
      {vehicles.map((v, i) => (
        <button
          key={v.slug}
          type="button"
          className={`selector-card ${i === active ? "active" : ""}`}
          aria-pressed={i === active}
          onClick={() => onSelect(i)}
        >
          <span className="selector-thumb">
            <Image src={v.thumb} alt="" fill sizes="96px" style={{ objectPosition: v.position }} />
          </span>
          <span className="selector-text">
            <span className="selector-num">{v.index}</span>
            <span className="selector-name">
              {v.make} {v.modelLines[0]}
            </span>
          </span>
          <span className="selector-arrow" aria-hidden="true">
            <Arrow size={11} />
          </span>
        </button>
      ))}
    </div>
  );
}
