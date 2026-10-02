import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/meta";
import Image from "next/image";
import ContactForm from "./ContactForm";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("contact", "/contact");

export default function ContactPage() {
  return (
    <>
      <section className="request">
        <div className="request-media" aria-hidden="true">
          <Image quality={90} src="/images/experience/details/wheel-caliper.webp" alt="" fill priority sizes="100vw" style={{ objectPosition: "70% 50%" }} />
        </div>
        <ContactForm />
      </section>
    </>
  );
}
