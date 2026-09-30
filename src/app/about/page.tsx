import type { Metadata } from "next";
import Image from "next/image";
import { Play, Gem, ShieldCheck, Compass, Globe2, Check } from "lucide-react";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import BenefitStrip from "@/components/BenefitStrip";
import ServicesGrid from "@/components/ServicesGrid";
import StatsStrip from "@/components/StatsStrip";
import AuctionSection from "@/components/AuctionSection";
import ContactCTA from "@/components/ContactCTA";
import FloatingPhone from "@/components/FloatingPhone";

export const metadata: Metadata = {
  title: "About",
  description: "VAULT is a private automotive collection focused on exceptional vehicles and discreet transactions.",
};

const why = [
  ["Curated selection", "Only cars we would own ourselves."],
  ["Personal approach", "One advisor, from first call to delivery."],
  ["Discreet process", "No public listings, no unnecessary exposure."],
  ["Time-saving", "We do the searching, checking and paperwork."],
  ["International reach", "Partners and logistics across Europe and beyond."],
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-media">
          <Image src="/images/villa.jpg" alt="Modern private residence at dusk" fill priority sizes="100vw" style={{ objectPosition: "60% 60%" }} />
        </div>
        <div className="container">
          <div className="page-hero-copy">
            <p className="eyebrow eyebrow-line">About VAULT</p>
            <h1 className="title-xl">
              More than cars.
              <br />A private
              <br />
              experience.
            </h1>
            <p>
              VAULT is a private automotive collection focused on exceptional vehicles, discreet transactions and a
              personal approach to every client.
            </p>
            <div className="btn-row">
              <Button href="#story" arrow>
                Our philosophy
              </Button>
              <Button href="/experience" variant="ghost" icon={<Play size={11} strokeWidth={1.4} />}>
                Watch our story
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="story" aria-labelledby="story-title">
        <div className="story-img">
          <Image src="/images/headlight.jpg" alt="Detail of a luxury automobile" fill sizes="(max-width: 1024px) 100vw, 36vw" style={{ objectPosition: "50% 40%" }} />
        </div>
        <div className="story-center">
          <p className="eyebrow eyebrow-line">Our story</p>
          <h2 id="story-title" className="title-lg">
            Passion.
            <br />
            Experience.
            <br />
            Discretion.
          </h2>
          <p className="body-muted">
            VAULT began as a private collection and grew into a trusted address for clients who value rarity, condition
            and confidentiality. We buy, sell and source a small number of exceptional automobiles each year — and know
            every one of them personally.
          </p>
        </div>
        <div className="story-quote">
          <blockquote>
            “We believe that a car is more than a means of transport. It is a story, an investment and a part of your
            lifestyle.”
          </blockquote>
          <div>
            <span className="signature" aria-hidden="true">
              A. Vault
            </span>
            <div className="founder-meta">
              <span>Founder</span>
              <span>Private collection</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <BenefitStrip
          className="no-top"
          items={[
            { icon: Gem, title: "Exceptional cars" },
            { icon: ShieldCheck, title: "Trust & discretion" },
            { icon: Compass, title: "Expert guidance" },
            { icon: Globe2, title: "Global network" },
          ]}
        />
      </div>

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
          </div>
          <ServicesGrid />
        </div>
      </section>

      <section className="why" aria-labelledby="why-title">
        <div className="why-media">
          <Image src="/images/garage.jpg" alt="Private showroom with several automobiles" fill sizes="(max-width: 900px) 100vw, 54vw" />
        </div>
        <div className="why-copy">
          <SectionHeading
            eyebrow="Why VAULT"
            title={
              <span id="why-title">
                The right cars.
                <br />
                The right people.
              </span>
            }
          />
          <ul className="why-list">
            {why.map(([t, d], i) => (
              <li key={t}>
                <span>
                  <Check size={14} strokeWidth={1.4} aria-hidden="true" />
                  <span className="sr-only">{i + 1}</span>
                </span>
                <span>
                  {t}
                  <p>{d}</p>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container">
        <StatsStrip />
      </div>

      <div style={{ height: "var(--section-y)" }} />
      <AuctionSection />
      <ContactCTA />
      <FloatingPhone />
    </>
  );
}
