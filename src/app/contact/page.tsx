import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";
import FloatingPhone from "@/components/FloatingPhone";

export const metadata: Metadata = {
  title: "Request Access",
  description: "Let's discuss your next automobile.",
};

export default function ContactPage() {
  return (
    <div className="container">
      <div className="form-layout">
        <div className="form-intro">
          <p className="eyebrow eyebrow-line">Private enquiry</p>
          <h1 className="title-xl">
            Request
            <br />
            access.
          </h1>
          <p className="body-muted">Let&apos;s discuss your next automobile.</p>
          <ul className="why-list" style={{ maxWidth: 440 }}>
            <li>
              <span><Phone size={14} strokeWidth={1.3} aria-hidden="true" /></span>
              <a href="tel:+40700000000">+40 700 000 000</a>
            </li>
            <li>
              <span><Mail size={14} strokeWidth={1.3} aria-hidden="true" /></span>
              <a href="mailto:private@vault.example">private@vault.example</a>
            </li>
            <li>
              <span><MapPin size={14} strokeWidth={1.3} aria-hidden="true" /></span>
              <span>Viewings by appointment only</span>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
      <FloatingPhone />
    </div>
  );
}
