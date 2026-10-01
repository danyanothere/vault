import Image from "next/image";
import Button from "./Button";
import Countdown from "./Countdown";

export default function AuctionSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <section className="auction" aria-labelledby="auction-title">
      <div className="container auction-grid">
        <div className="auction-copy">
          <p className="eyebrow eyebrow-after">Private auction</p>
          <H id="auction-title" className="title-lg">
            Exceptional cars.
            <br />
            Exclusive opportunities.
          </H>
          <p className="body-muted">
            Selected automobiles available through
            <br />
            private offers and invitation-only auctions.
          </p>
          <Button href="/auction" variant="outline-light" arrow>
            View upcoming auctions
          </Button>
        </div>
        <div className="auction-card">
          <div className="auction-card-img" aria-hidden="true">
            <Image src="/images/auction/porsche-rear.webp" alt="" fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectPosition: "40% 50%" }} />
          </div>
          <div className="auction-card-body">
            <p className="tick-label">Next private auction</p>
            <div>
              <p className="tick-label tick-small">Lot 01</p>
              <p className="lot-name">Porsche 911 Turbo</p>
            </div>
            <Countdown />
            <Button href="/contact?interest=auction" arrow>
              Request to bid
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
