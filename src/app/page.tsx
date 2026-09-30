import HeroSlider from "@/components/HeroSlider";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import StatsStrip from "@/components/StatsStrip";
import VehicleShowcase from "@/components/VehicleShowcase";
import ServicesGrid from "@/components/ServicesGrid";
import AuctionSection from "@/components/AuctionSection";
import ContactCTA from "@/components/ContactCTA";
import { vehicles } from "@/data/vehicles";

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      <section id="home-intro" className="section">
        <div className="container">
          <div className="intro-row">
            <SectionHeading
              eyebrow="The collection"
              title={
                <>
                  Chosen one by one.
                  <br />
                  Shown by invitation.
                </>
              }
            />
            <div className="section-heading">
              <p className="body-muted">
                Every automobile in the VAULT collection is selected for its condition, provenance and character, then
                presented privately to a small circle of clients.
              </p>
              <div>
                <Button href="/collection" variant="outline" arrow>
                  View the collection
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: 72 }}>
          <StatsStrip />
        </div>
      </section>

      <VehicleShowcase vehicle={vehicles[1]} />
      <VehicleShowcase vehicle={vehicles[2]} reverse />

      <section className="section">
        <div className="container">
          <div className="services-head">
            <SectionHeading
              eyebrow="What we do"
              title={
                <>
                  Comprehensive
                  <br />
                  automotive services
                </>
              }
            />
            <Button href="/about" variant="ghost">
              About VAULT
            </Button>
          </div>
          <ServicesGrid />
        </div>
      </section>

      <AuctionSection />
      <ContactCTA />
    </>
  );
}
