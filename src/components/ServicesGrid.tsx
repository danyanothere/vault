"use client";

import Image from "next/image";
import Link, { useDict } from "@/i18n/client";
import Arrow from "./Arrow";

const media = [
  { img: "/images/experience/details/grille.webp", href: "/sell" },
  { img: "/images/experience/interior/steering-wheel.webp", href: "/contact?interest=sourcing" },
  { img: "/images/experience/details/wheel-caliper.webp", href: "/contact" },
  { img: "/images/services/brabus-rear.webp", href: "/contact" },
];

export default function ServicesGrid() {
  const items = useDict().services.items;
  const services = media.map((m, i) => ({ ...m, n: String(i + 1).padStart(2, "0"), title: items[i][0], text: items[i][1] }));
  return (
    <ul className="services-grid" id="services-list">
      {services.map((s) => (
        <li key={s.n}>
          <Link href={s.href} className="service-card" data-cursor="explore">
            <span className="service-img">
              <Image src={s.img} alt="" fill quality={90} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" />
            </span>
            <span className="service-body">
              <span className="service-num">{s.n}</span>
              <span className="service-title">{s.title}</span>
              <span className="service-text">{s.text}</span>
              <span className="icon-circle service-arrow" aria-hidden="true">
                <Arrow size={11} />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
