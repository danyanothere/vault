import Image from "next/image";
import Link from "next/link";
import Arrow from "./Arrow";

const services = [
  { n: "01", title: "Private sales", text: "Discreet acquisition and sale of exceptional automobiles, off-market.", img: "/images/garage.jpg", href: "/collection" },
  { n: "02", title: "Vehicle sourcing", text: "We locate the specific car you are looking for, anywhere in the world.", img: "/images/gtr-dark.jpg", href: "/contact" },
  { n: "03", title: "Inspection & advice", text: "Independent inspection, provenance checks and honest valuation.", img: "/images/headlight.jpg", href: "/contact" },
  { n: "04", title: "Concierge services", text: "Logistics, registration, storage and delivery, handled end to end.", img: "/images/villa.jpg", href: "/contact" },
];

export default function ServicesGrid() {
  return (
    <ul className="services-grid">
      {services.map((s) => (
        <li key={s.n}>
          <Link href={s.href} className="service-card">
            <span className="service-img">
              <Image src={s.img} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" />
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
