import Image from "next/image";
import { Phone } from "lucide-react";
import Button from "./Button";
import { phoneHref } from "@/config/site";
import { getDict } from "@/i18n/server";

type Props = {
  eyebrow?: string;
  title?: [string, string];
  text?: string;
  image?: string;
  imagePosition?: string;
  mark?: [string, string];
};

export default async function ContactCTA({ eyebrow, title, text, image = "/images/contact/covered-car.webp", imagePosition = "70% 50%", mark }: Props) {
  const dict = await getDict();
  eyebrow ??= dict.cta.eyebrow;
  title ??= [dict.cta.title[0], dict.cta.title[1]];
  text ??= dict.cta.text;
  mark ??= [dict.common.rareCars[0], dict.common.rareCars[1]];
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
              {dict.common.requestAccess}
            </Button>
            {phoneHref && (
              <Button href={phoneHref} variant="outline" icon={<Phone size={14} strokeWidth={1.5} />} className="btn-call">
                {dict.common.callUs}
              </Button>
            )}
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
