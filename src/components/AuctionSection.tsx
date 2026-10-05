import Image from "next/image";
import Button from "./Button";
import Countdown from "./Countdown";
import { getDict } from "@/i18n/server";
import { siteConfig } from "@/config/site";

export default async function AuctionSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  const t = (await getDict()).auction;
  return (
    <section className="auction" aria-labelledby="auction-title">
      <div className="container auction-grid">
        <div className="auction-copy">
          <p className="eyebrow eyebrow-after">{t.eyebrow}</p>
          <H id="auction-title" className="title-lg">
            {t.title[0]}
            <br />
            {t.title[1]}
          </H>
          <p className="body-muted">
            {t.text[0]}
            <br />
            {t.text[1]}
          </p>
          <Button href="/auction" variant="outline-light" arrow>
            {t.cta}
          </Button>
        </div>
        <div className="auction-card">
          <div className="auction-card-img" aria-hidden="true">
            <Image quality={90} src="/images/auction/porsche-rear.webp" alt="" fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectPosition: "40% 50%" }} />
          </div>
          <div className="auction-card-body">
            <p className="tick-label">{t.next}</p>
            <div>
              <p className="tick-label tick-small">{t.lot}</p>
              <p className="lot-name">Porsche 911 Turbo</p>
            </div>
            {siteConfig.nextAuction ? <Countdown target={siteConfig.nextAuction} /> : <p className="auction-tbd">{t.dateTbd}</p>}
            <Button href="/contact?interest=auction" arrow>
              {t.bid}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
