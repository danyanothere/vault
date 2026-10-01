import Image from "next/image";
import { Phone } from "lucide-react";
import Button from "./Button";
import { PHONE_HREF } from "./nav";

type Props = {
  eyebrow?: string;
  title?: [string, string];
  text?: string;
  image?: string;
  imagePosition?: string;
  mark?: [string, string];
};

export default function ContactCTA({
  eyebrow = "Contact",
  title = ["Discuss your", "next automobile."],
  text = "Get in touch for a private viewing, more information or to discuss a tailored offer.",
  image = "/images/contact/covered-car.webp",
  imagePosition = "70% 50%",
  mark = ["Rare cars.", "Private access."],
}: Props) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta-media" aria-hidden="true">
        <Image quality={90} src={image} alt="" fill sizes="(max-width: 800px) 100vw, 70vw" style={{ objectPosition: imagePosition }} />
      </div>
      <div className="container cta-grid">
        <div className="cta-copy">
          <p className="eyebrow eyebrow-after">{eyebrow}</p>
          <h2 id="cta-title" className="title-lg">
            {title[0]}
            <br />
            {title[1]}
          </h2>
          <p className="body-muted">{text}</p>
          <div className="btn-row">
            <Button href="/contact" arrow magnetic>
              Request access
            </Button>
            <Button href={PHONE_HREF} variant="outline" icon={<Phone size={14} strokeWidth={1.5} />} className="btn-call">
              Call us
            </Button>
          </div>
        </div>
        <p className="cta-mark" aria-hidden="true">
          {mark[0]}
          <br />
          {mark[1]}
          <span className="count-line" />
        </p>
      </div>
    </section>
  );
}
