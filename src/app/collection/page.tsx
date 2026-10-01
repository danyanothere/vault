import type { Metadata } from "next";
import VehicleShowcase from "@/components/VehicleShowcase";
import AuctionSection from "@/components/AuctionSection";
import TrustStrip from "@/components/TrustStrip";
import ContactCTA from "@/components/ContactCTA";
import { vehicles } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Collection",
  description: "Maserati Quattroporte, Brabus GLS and Porsche 911 Turbo Cabriolet — available by private enquiry.",
};

export default function CollectionPage() {
  return (
    <>
      <h1 className="sr-only">The VAULT collection</h1>
      {vehicles.map((v, i) => (
        <VehicleShowcase key={v.id} vehicle={v} priority={i === 0} />
      ))}
      <AuctionSection />
      <TrustStrip />
      <ContactCTA />
    </>
  );
}
