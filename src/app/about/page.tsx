import type { Metadata } from "next";
import Image from "next/image";
import { Gem, ShieldCheck, Handshake, Globe2, Star, UserRound, Lock, Clock, Globe } from "lucide-react";
import Button from "@/components/Button";
import WatchVideo from "@/components/WatchVideo";
import BenefitStrip from "@/components/BenefitStrip";
import ServicesSection from "@/components/ServicesSection";
import StatsStrip from "@/components/StatsStrip";
import ContactCTA from "@/components/ContactCTA";
import FloatingPhone from "@/components/FloatingPhone";

export const metadata: Metadata = {
  title: "About",
  description: "VAULT is a private automotive collection focused on exceptional vehicles and discreet transactions.",
};

const why = [
  { icon: Star, t: "Curated selection", d: "Only exceptional vehicles that meet our standards." },
  { icon: UserRound, t: "Personal approach", d: "Direct communication, tailored to your needs." },
  { icon: Lock, t: "Discreet process", d: "Maximum privacy and confidentiality." },
  { icon: Clock, t: "Time-saving", d: "We handle the details so you can focus on what matters." },
  { icon: Globe, t: "International reach", d: "Access to unique vehicles and opportunities worldwide." },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero-media">
          <Image quality={90} src="/images/about/residence-dusk.webp" alt="Private residence at dusk with luxury automobiles" fill priority sizes="100vw" style={{ objectPosition: "60% 60%" }} />
        </div>
        <div className="about-hero-copy">
          <p className="eyebrow eyebrow-after">About VAULT</p>
          <h1 className="about-title">
            More than cars.
            <br />
            <span className="dim">A private</span>
            <br />
            <span className="dim">experience.</span>
          </h1>
          <p className="about-lede">
            VAULT is a private automotive collection focused
            <br />
            on exceptional vehicles, discreet transactions
            <br />
            and a personal approach to every client.
          </p>
          <div className="btn-row">
            <Button href="#story" arrow>
              Our philosophy
            </Button>
            <WatchVideo label="Watch our story" title="The VAULT story" poster="/images/about/residence-dusk.webp" posterPosition="60% 60%" />
          </div>
        </div>
        <p className="about-hero-mark" aria-hidden="true">
          Rare cars.
          <br />
          Private access.
        </p>
      </section>

      <section id="story" className="story" aria-labelledby="story-title">
        <div className="story-img">
          <Image quality={90} src="/images/about/leather-seat.webp" alt="Quilted leather seat with Trident emblem" fill sizes="(max-width: 900px) 100vw, 36vw" style={{ objectPosition: "50% 35%" }} />
        </div>
        <div className="story-center">
          <p className="eyebrow eyebrow-after">Our story</p>
          <h2 id="story-title" className="story-title">
            Passion.
            <br />
            Experience.
            <br />
            Discretion.
          </h2>
          <p className="story-text">
            VAULT was founded by a private enthusiast with a passion for exceptional automobiles. Over the years, we have
            built a trusted network of clients, collectors and partners, helping to buy, sell and source rare and
            high-quality vehicles with complete discretion.
          </p>
        </div>
        <div className="story-quote">
          <blockquote>
            “We believe that a car is more than a means of transport. It is a story, an investment and a part of your
            lifestyle.”
          </blockquote>
          <div className="founder">
            <svg className="signature" viewBox="0 0 120 50" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 38c10-2 20-20 26-30 3-5-6 30-9 36m-2-14c8-4 16-5 20-3 6 3-8 10-4 10s10-12 14-11c3 1-3 9 0 9 4 0 8-9 11-9 2 0-1 7 2 7 5 0 14-10 24-12 8-2 18-1 26 1" />
              <path d="M40 44c20-4 44-6 70-6" />
            </svg>
            <p className="founder-meta">
              <span>Founder</span>
              <span>Private collection</span>
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <BenefitStrip
          centered
          items={[
            { icon: Gem, title: "Exceptional cars", text: "Carefully selected premium and rare vehicles." },
            { icon: ShieldCheck, title: "Trust & discretion", text: "Private process, confidential transactions." },
            { icon: Handshake, title: "Expert guidance", text: "Professional advice and full support." },
            { icon: Globe2, title: "Global network", text: "Access to unique opportunities locally and internationally." },
          ]}
        />
      </div>

      <ServicesSection />

      <section className="why" aria-labelledby="why-title">
        <div className="why-media">
          <Image quality={90} src="/images/about/showroom.webp" alt="Glass showroom with several luxury automobiles" fill sizes="(max-width: 900px) 100vw, 62vw" style={{ objectPosition: "30% 60%" }} />
          <div className="why-overlay">
            <p className="eyebrow eyebrow-after">Why VAULT</p>
            <h2 id="why-title" className="title-lg">
              The right cars.
              <br />
              The right people.
            </h2>
            <p className="body-muted">
              A curated approach for those
              <br />
              who appreciate true automotive value.
            </p>
          </div>
        </div>
        <ul className="why-list">
          {why.map(({ icon: Icon, t, d }) => (
            <li key={t}>
              <Icon size={20} strokeWidth={1.1} aria-hidden="true" />
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="container">
        <StatsStrip />
      </div>

      <ContactCTA
        eyebrow="Let's talk"
        title={["Find your next", "automotive story."]}
        image="/images/about/coastal-porsche.webp"
        imagePosition="50% 65%"
      />
      <FloatingPhone />
    </>
  );
}
