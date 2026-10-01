"use client";

import Image from "next/image";
import { vehicles } from "@/data/vehicles";
import Arrow from "./Arrow";

export default function VehicleSelector({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <div className="selector" role="group" aria-label="Select vehicle">
      {vehicles.map((v, i) => (
        <button key={v.id} type="button" className={`selector-card ${i === active ? "active" : ""}`} aria-pressed={i === active} onClick={() => onSelect(i)}>
          <span className="selector-num">{v.index}</span>
          <span className="selector-thumb">
            <Image src={v.thumbnail.src} alt="" fill sizes="220px" style={{ objectPosition: v.thumbnail.position }} />
          </span>
          <span className="selector-name">
            <span>{v.brand}</span>
            <span className="dim">{v.modelLines[0]}</span>
          </span>
          <span className="selector-arrow" aria-hidden="true">
            <Arrow size={12} />
          </span>
        </button>
      ))}
    </div>
  );
}
