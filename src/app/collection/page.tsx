import type { Metadata } from "next";
import VehicleShowcase from "@/components/VehicleShowcase";
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
      {[vehicles[1], vehicles[2], vehicles[0]].map((v, i) => (
        <VehicleShowcase key={v.slug} vehicle={v} reverse={i === 1} priority={i === 0} />
      ))}
      <ContactCTA />
      <FloatingPhone />
    </>
  );
}
