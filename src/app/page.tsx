import HeroSlider from "@/components/HeroSlider";
import VehicleShowcase from "@/components/VehicleShowcase";
import VehicleStory from "@/components/VehicleStory";
import AuctionSection from "@/components/AuctionSection";
import TrustStrip from "@/components/TrustStrip";
import ContactCTA from "@/components/ContactCTA";
import { vehicles } from "@/data/vehicles";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <div id="home-next">
        <VehicleStory vehicle={vehicles[0]} />
        <VehicleStory vehicle={vehicles[1]} />
        <VehicleShowcase vehicle={vehicles[2]} />
      </div>
      <AuctionSection />
      <TrustStrip />
      <ContactCTA />
    </>
  );
}
