import type { Metadata } from "next";
import { Lock, Camera, Network, Handshake } from "lucide-react";
import SellForm from "./SellForm";
import BenefitStrip from "@/components/BenefitStrip";

export const metadata: Metadata = {
  title: "Sell Your Automobile",
  description: "Your car deserves more than a classified listing.",
};

export default function SellPage() {
  return (
    <div className="container">
      <div className="form-layout">
        <div className="form-intro">
          <p className="eyebrow eyebrow-line">Sell with VAULT</p>
          <h1 className="title-xl">
            Sell your
            <br />
            automobile.
          </h1>
          <p className="body-muted">
            Your car deserves more than a classified listing. We present it privately to qualified buyers and handle the
            transaction from valuation to handover.
          </p>
        </div>
        <SellForm />
      </div>
      <BenefitStrip
        items={[
          { icon: Lock, title: "Private process", text: "No public listing unless you want one" },
          { icon: Camera, title: "Professional presentation", text: "Studio photography and film" },
          { icon: Network, title: "Targeted network", text: "Collectors and dealers we know personally" },
          { icon: Handshake, title: "Discreet transaction", text: "Secure payment and paperwork" },
        ]}
      />
      <div style={{ height: "var(--section-y)" }} />
    </div>
  );
}
