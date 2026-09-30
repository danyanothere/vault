import Image from "next/image";
import { Phone } from "lucide-react";
import Button from "./Button";

export default function ContactCTA() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta-media" aria-hidden="true">
        <Image src="/images/audi-dark.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectPosition: "50% 72%" }} />
      </div>
      <div className="container cta-grid">
        <div className="cta-copy">
          <p className="eyebrow eyebrow-line">Private enquiry</p>
          <h2 id="cta-title" className="title-lg">
            Discuss your
            <br />
            next automobile.
          </h2>
          <p className="body-muted">
            Tell us what you are looking for. Every enquiry is handled personally, in confidence, by a member of our team.
          </p>
          <div className="btn-row">
            <Button href="/contact" arrow>
              Request access
            </Button>
            <Button href="tel:+40700000000" variant="ghost" icon={<Phone size={12} strokeWidth={1.4} />}>
              Call us
            </Button>
          </div>
        </div>
        <p className="cta-mark" aria-hidden="true">
          Rare cars.
          <br />
          Private access.
        </p>
      </div>
    </section>
  );
}
