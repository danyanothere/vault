import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/meta";
import { getDict } from "@/i18n/server";
import VehicleShowcase from "@/components/VehicleShowcase";
import AuctionSection from "@/components/AuctionSection";
import TrustStrip from "@/components/TrustStrip";
import ContactCTA from "@/components/ContactCTA";
import { vehicles } from "@/data/vehicles";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("collection", "/collection");

export default async function CollectionPage() {
  const dict = await getDict();
  return (
    <>
      <h1 className="sr-only">VAULT — {dict.common.collection}</h1>
      {vehicles.map((v, i) => (
        <VehicleShowcase key={v.id} vehicle={v} priority={i === 0} />
      ))}
      <AuctionSection />
      <TrustStrip />
      <ContactCTA />
    </>
  );
}
