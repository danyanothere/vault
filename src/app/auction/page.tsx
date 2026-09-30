import type { Metadata } from "next";
import { BadgeCheck, FileSearch, Lock, UserRound, Truck } from "lucide-react";
import AuctionSection from "@/components/AuctionSection";
import BenefitStrip from "@/components/BenefitStrip";
import ContactCTA from "@/components/ContactCTA";
import FloatingPhone from "@/components/FloatingPhone";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Private Auction",
  description: "Exceptional cars, exclusive opportunities. Invitation-only private auctions.",
};

const steps = [
  ["01", "Request access", "Tell us about yourself and the cars you collect. Every bidder is verified personally."],
  ["02", "Receive the catalogue", "Full inspection reports, provenance files and service history for every lot."],
  ["03", "Private viewing", "Inspect the car in person or through a guided video session."],
  ["04", "Bid in confidence", "Sealed or live bidding in a closed room — your identity stays private."],
];

export default function AuctionPage() {
  return (
    <>
      <AuctionSection headingLevel="h1" />
      <div className="container">
        <BenefitStrip
          items={[
            { icon: BadgeCheck, title: "Verified automobiles", text: "Full inspection & documentation" },
            { icon: FileSearch, title: "Transparent history", text: "Verified provenance & service records" },
            { icon: Lock, title: "Private transactions", text: "Discreet and secure process" },
            { icon: UserRound, title: "Personal assistance", text: "Dedicated support for every client" },
            { icon: Truck, title: "International delivery", text: "Worldwide delivery options" },
          ]}
        />
      </div>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                Four steps.
                <br />
                Complete discretion.
              </>
            }
          />
          <ol className="stats" style={{ marginTop: 48, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {steps.map(([n, t, d]) => (
              <li key={n}>
                <span className="service-num">{n}</span>
                <span className="service-title">{t}</span>
                <span className="service-text" style={{ paddingRight: 0 }}>
                  {d}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <ContactCTA />
      <FloatingPhone />
    </>
  );
}
