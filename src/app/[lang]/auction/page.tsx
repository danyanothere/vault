import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/meta";
import { getDict } from "@/i18n/server";
import AuctionSection from "@/components/AuctionSection";
import TrustStrip from "@/components/TrustStrip";
import ContactCTA from "@/components/ContactCTA";
import SectionHeading from "@/components/SectionHeading";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("auction", "/auction");

export default async function AuctionPage() {
  const t = (await getDict()).auction;
  const steps = t.steps.map(([title, text], i) => [String(i + 1).padStart(2, "0"), title, text]);
  return (
    <>
      <AuctionSection headingLevel="h1" />
      <TrustStrip />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={t.howEyebrow}
            title={
              <>
                {t.howTitle[0]}
                <br />
                {t.howTitle[1]}
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
    </>
  );
}
