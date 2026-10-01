"use client";

import { useEffect, useRef, useState } from "react";
import Arrow from "./Arrow";
import ServicesGrid from "./ServicesGrid";

export default function ServicesSection() {
  const wrap = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const list = () => wrap.current?.querySelector<HTMLElement>("#services-list") ?? null;

  useEffect(() => {
    const el = list();
    if (!el) return;
    const update = () =>
      setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const move = (dir: number) => {
    const el = list();
    const card = el?.querySelector("li");
    if (el && card) el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 12), behavior: "smooth" });
  };

  return (
    <section className="section services" aria-labelledby="services-title" ref={wrap}>
      <div className="container">
        <div className="services-head">
          <div>
            <p className="eyebrow eyebrow-after">What we do</p>
            <h2 id="services-title" className="title-lg">
              Comprehensive
              <br />
              automotive services
            </h2>
          </div>
          <p className="body-muted services-intro">
            From private sales to vehicle sourcing, inspections and logistics, VAULT provides a complete, end-to-end
            service for clients who value quality, time and confidentiality.
          </p>
          <div className="services-arrows">
            <button type="button" className="icon-circle arrow-back" aria-label="Previous service" disabled={edge.start} onClick={() => move(-1)}>
              <Arrow size={12} />
            </button>
            <button type="button" className="icon-circle" aria-label="Next service" disabled={edge.end} onClick={() => move(1)}>
              <Arrow size={12} />
            </button>
          </div>
        </div>
        <ServicesGrid />
      </div>
    </section>
  );
}
