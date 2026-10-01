import type { Metadata } from "next";
import Image from "next/image";
import { Lock, Camera, Network, Handshake } from "lucide-react";
import SellForm from "./SellForm";
import TrustStrip from "@/components/TrustStrip";
import FloatingPhone from "@/components/FloatingPhone";

export const metadata: Metadata = {
  title: "Sell Your Automobile",
  description: "Your car deserves more than a classified listing.",
};

const benefits = [
  { icon: Lock, t: "Private process" },
  { icon: Camera, t: "Professional presentation" },
  { icon: Network, t: "Targeted network" },
  { icon: Handshake, t: "Discreet transaction" },
];

export default function SellPage() {
  return (
    <>
      <section className="sell">
        <div className="sell-media" aria-hidden="true">
          <Image src="/images/auction/porsche-rear.webp" alt="" fill priority sizes="(max-width: 900px) 100vw, 55vw" style={{ objectPosition: "30% 50%" }} />
        </div>
        <div className="sell-copy">
          <p className="eyebrow eyebrow-after">Sell your car</p>
          <h1 className="title-xl">
            Sell your
            <br />
            automobile.
          </h1>
          <p className="body-muted">Your car deserves more than a classified listing.</p>
          <ul className="sell-benefits">
            {benefits.map(({ icon: Icon, t }) => (
              <li key={t}>
                <span className="icon-circle">
                  <Icon size={15} strokeWidth={1.2} aria-hidden="true" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <p className="sell-mark">
            Exceptional cars.
            <br />
            The right owners.
          </p>
        </div>
        <div className="sell-form">
          <SellForm />
        </div>
      </section>
      <TrustStrip />
      <div style={{ height: "var(--section-y)" }} />
      <FloatingPhone />
    </>
  );
}
