import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "./ContactForm";
import FloatingPhone from "@/components/FloatingPhone";

export const metadata: Metadata = {
  title: "Request Access",
  description: "Let's discuss your next automobile.",
};

export default function ContactPage() {
  return (
    <>
      <section className="request">
        <div className="request-media" aria-hidden="true">
          <Image quality={90} src="/images/services/wheel-caliper.webp" alt="" fill priority sizes="100vw" style={{ objectPosition: "70% 50%" }} />
        </div>
        <ContactForm />
      </section>
      <FloatingPhone />
    </>
  );
}
