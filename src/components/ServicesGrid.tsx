import Image from "next/image";
import Link from "next/link";
import Arrow from "./Arrow";

const services = [
  { n: "01", title: "Private sales", text: "We help you sell your vehicle to the right buyer, with targeted marketing and a private network.", img: "/images/services/sedan-front.webp", href: "/sell" },
  { n: "02", title: "Vehicle sourcing", text: "Looking for a specific model? We find exceptional cars locally and internationally.", img: "/images/services/steering-wheel.webp", href: "/contact?interest=sourcing" },
  { n: "03", title: "Inspection & advice", text: "Independent evaluation, condition reports and expert guidance.", img: "/images/services/wheel-caliper.webp", href: "/contact" },
  { n: "04", title: "Concierge services", text: "Documentation, transport, registration, insurance, detailing and full logistical support.", img: "/images/services/brabus-rear.webp", href: "/contact" },
];

export default function ServicesGrid() {
  return (
    <ul className="services-grid" id="services-list">
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
