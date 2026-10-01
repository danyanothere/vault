import type { Metadata } from "next";
import VehicleShowcase from "@/components/VehicleShowcase";
import AuctionSection from "@/components/AuctionSection";
import TrustStrip from "@/components/TrustStrip";
import ContactCTA from "@/components/ContactCTA";
import FloatingPhone from "@/components/FloatingPhone";
import { vehicles } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Collection",
  description: "Maserati Quattroporte, Brabus GLS and Porsche 911 Turbo Cabriolet — available by private enquiry.",
};

export default function CollectionPage() {
  return (
    <>
      <h1 className="sr-only">The VAULT collection</h1>
      <VehicleShowcase vehicle={vehicles[1]} priority />
      <VehicleShowcase vehicle={vehicles[2]} />
      <AuctionSection />
      <TrustStrip />
      <ContactCTA />
      <FloatingPhone />
    </>
  );
}
