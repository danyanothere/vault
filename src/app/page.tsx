import HeroSlider from "@/components/HeroSlider";
import VehicleShowcase from "@/components/VehicleShowcase";
import AuctionSection from "@/components/AuctionSection";
import TrustStrip from "@/components/TrustStrip";
import ContactCTA from "@/components/ContactCTA";
import FloatingPhone from "@/components/FloatingPhone";
import { vehicles } from "@/data/vehicles";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <div id="home-next">
        <VehicleShowcase vehicle={vehicles[1]} />
        <VehicleShowcase vehicle={vehicles[2]} />
      </div>
      <AuctionSection />
      <TrustStrip />
      <ContactCTA />
      <FloatingPhone />
    </>
  );
}
