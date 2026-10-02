import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/meta";
import { getDict } from "@/i18n/server";
import Image from "next/image";
import { Lock, Camera, Network, Handshake } from "lucide-react";
import SellForm from "./SellForm";
import TrustStrip from "@/components/TrustStrip";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("sell", "/sell");

const icons = [Lock, Camera, Network, Handshake];

export default async function SellPage() {
  const t = (await getDict()).sell;
  const benefits = t.benefits.map((label, i) => ({ icon: icons[i], t: label }));
  return (
    <>
      <section className="sell">
        <div className="sell-media" aria-hidden="true">
          <Image quality={90} src="/images/auction/porsche-rear.webp" alt="" fill priority sizes="(max-width: 900px) 100vw, 55vw" style={{ objectPosition: "30% 50%" }} />
        </div>
        <div className="sell-copy">
          <p className="eyebrow eyebrow-after">{t.eyebrow}</p>
          <h1 className="title-xl">
            {t.title[0]}
            <br />
            {t.title[1]}
          </h1>
          <p className="body-muted">{t.text}</p>
          <ul className="sell-benefits">
            {benefits.map(({ icon: Icon, t }) => (
              <li key={t}>
                <span className="icon-circle">
                  <Icon size={15} strokeWidth={1.2} aria-hidden="true" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <p className="sell-mark">
            {t.mark[0]}
            <br />
            {t.mark[1]}
          </p>
        </div>
        <div className="sell-form">
          <SellForm />
        </div>
      </section>
      <TrustStrip />
      <div style={{ height: "var(--section-y)" }} />
    </>
  );
}
