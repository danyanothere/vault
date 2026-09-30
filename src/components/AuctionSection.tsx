import Image from "next/image";
import Button from "./Button";
import Countdown from "./Countdown";

export default function AuctionSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <section className="auction" aria-labelledby="auction-title">
      <div className="auction-bg" aria-hidden="true">
        <Image src="/images/hangar.jpg" alt="" fill sizes="100vw" style={{ objectPosition: "50% 60%" }} />
      </div>
      <div className="container auction-grid">
        <div className="auction-copy">
          <p className="eyebrow eyebrow-line">Private auction</p>
          <H id="auction-title" className="title-lg">
            Exceptional cars.
            <br />
            Exclusive opportunities.
          </H>
          <p className="body-muted">
            Invitation-only sales of verified automobiles. Every lot is inspected, documented and presented to a
            small circle of qualified collectors.
          </p>
          <Button href="/auction" variant="outline" arrow>
            View upcoming auctions
          </Button>
        </div>
        <div className="auction-card">
          <p className="eyebrow">Next private auction</p>
          <div className="auction-lot">
            <div className="auction-lot-img">
              <Image src="/images/porsche.jpg" alt="Porsche 911 Turbo, lot 01" fill sizes="160px" style={{ objectPosition: "50% 65%" }} />
            </div>
            <div>
              <p className="lot-num">Lot 01</p>
              <p className="lot-name">Porsche 911 Turbo</p>
            </div>
          </div>
          <Countdown />
          <Button href="/contact" arrow className="btn-block">
            Request to bid
          </Button>
        </div>
      </div>
    </section>
  );
}
