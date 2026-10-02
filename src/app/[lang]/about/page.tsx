import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/meta";
import { getDict } from "@/i18n/server";
import Image from "next/image";
import { Gem, ShieldCheck, Handshake, Globe2, Star, UserRound, Lock, Clock, Globe } from "lucide-react";
import Button from "@/components/Button";
import WatchVideo from "@/components/WatchVideo";
import BenefitStrip from "@/components/BenefitStrip";
import ServicesSection from "@/components/ServicesSection";
import StatsStrip from "@/components/StatsStrip";
import ContactCTA from "@/components/ContactCTA";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("about", "/about");

const whyIcons = [Star, UserRound, Lock, Clock, Globe];
const benefitIcons = [Gem, ShieldCheck, Handshake, Globe2];

export default async function AboutPage() {
  const dict = await getDict();
  const a = dict.about;
  const why = a.why.map(([t, d], i) => ({ icon: whyIcons[i], t, d }));
  return (
    <>
      <section className="about-hero">
        <div className="about-hero-media">
          <Image quality={90} src="/images/about/residence-dusk.webp" alt={a.heroAlt} fill priority sizes="100vw" style={{ objectPosition: "60% 60%" }} />
        </div>
        <div className="about-hero-copy">
          <p className="eyebrow eyebrow-after">{a.eyebrow}</p>
          <h1 className="about-title">
            {a.title[0]}
            <br />
            <span className="dim">{a.title[1]}</span>
            <br />
            <span className="dim">{a.title[2]}</span>
          </h1>
          <p className="about-lede">
            {a.lede[0]}
            <br />
            {a.lede[1]}
            <br />
            {a.lede[2]}
          </p>
          <div className="btn-row">
            <Button href="#story" arrow>
              {a.philosophy}
            </Button>
            <WatchVideo label={a.watchStory} title={dict.video.story} poster="/videos/story-poster.webp" src="/videos/story.mp4" />
          </div>
        </div>
        <p className="about-hero-mark" aria-hidden="true">
          {dict.common.rareCars[0]}
          <br />
          {dict.common.rareCars[1]}
        </p>
      </section>

      <section id="story" className="story" aria-labelledby="story-title">
        <div className="story-img">
          <Image quality={90} src="/images/experience/interior/driver-seat.webp" alt={a.storyAlt} fill sizes="(max-width: 900px) 100vw, 36vw" style={{ objectPosition: "65% 50%" }} />
        </div>
        <div className="story-center">
          <p className="eyebrow eyebrow-after">{a.storyEyebrow}</p>
          <h2 id="story-title" className="story-title">
            {a.storyTitle[0]}
            <br />
            {a.storyTitle[1]}
            <br />
            {a.storyTitle[2]}
          </h2>
          <p className="story-text">
            {a.storyText}
          </p>
        </div>
        <div className="story-quote">
          <blockquote>
            {a.quote}
          </blockquote>
          <div className="founder">
            <svg className="signature" viewBox="0 0 120 50" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 38c10-2 20-20 26-30 3-5-6 30-9 36m-2-14c8-4 16-5 20-3 6 3-8 10-4 10s10-12 14-11c3 1-3 9 0 9 4 0 8-9 11-9 2 0-1 7 2 7 5 0 14-10 24-12 8-2 18-1 26 1" />
              <path d="M40 44c20-4 44-6 70-6" />
            </svg>
            <p className="founder-meta">
              <span>{a.founder[0]}</span>
              <span>{a.founder[1]}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <BenefitStrip
          centered
          items={a.benefits.map(([title, text], i) => ({ icon: benefitIcons[i], title, text }))}
        />
      </div>

      <ServicesSection />

      <section className="why" aria-labelledby="why-title">
        <div className="why-media">
          <Image quality={90} src="/images/about/showroom.webp" alt={a.whyAlt} fill sizes="(max-width: 900px) 100vw, 62vw" style={{ objectPosition: "60% 55%" }} />
          <div className="why-overlay">
            <p className="eyebrow eyebrow-after">{a.whyEyebrow}</p>
            <h2 id="why-title" className="title-lg">
              {a.whyTitle[0]}
              <br />
              {a.whyTitle[1]}
            </h2>
            <p className="body-muted">
              {a.whyText[0]}
              <br />
              {a.whyText[1]}
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
        eyebrow={dict.cta.aboutEyebrow}
        title={[dict.cta.aboutTitle[0], dict.cta.aboutTitle[1]]}
        image="/images/about/coastal-porsche.webp"
        imagePosition="50% 65%"
      />
    </>
  );
}
