import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms that apply to the use of the VAULT website and its private services.",
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance",
    body: (
      <p>
        By using this website you agree to these terms. If you do not agree, please do not use the site. Separate
        written agreements apply to any purchase, sale, consignment or auction.
      </p>
    ),
  },
  {
    id: "information",
    title: "Vehicle information",
    body: (
      <p>
        Vehicles, specifications and images are presented for information only and do not constitute a binding offer.
        Availability, condition and price are confirmed in writing before any transaction. Imagery may be illustrative.
      </p>
    ),
  },
  {
    id: "enquiries",
    title: "Enquiries and private viewings",
    body: (
      <p>
        Sending a request does not create an obligation for either party. Private viewings are arranged by appointment
        and may require identity verification.
      </p>
    ),
  },
  {
    id: "selling",
    title: "Selling your vehicle",
    body: (
      <p>
        When you submit a vehicle you confirm that you own it or are authorised to sell it, and that the information and
        photos you provide are accurate. Any valuation is indicative until confirmed by inspection.
      </p>
    ),
  },
  {
    id: "auctions",
    title: "Private auctions",
    body: (
      <p>
        Auctions are by invitation only. Participation, bidding, reserve prices, fees and payment terms are governed by
        the auction conditions provided to verified bidders. Countdown timers on this website are indicative.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <p>
        The VAULT name, logo, texts, design and imagery on this website belong to VAULT or its licensors and may not be
        copied or reused without written permission. Vehicle brands and trademarks belong to their respective owners.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Liability",
    body: (
      <p>
        We take care to keep this website accurate and available, but we do not guarantee it is free of errors or
        interruptions. To the extent permitted by law, VAULT is not liable for indirect losses arising from the use of
        the website.
      </p>
    ),
  },
  {
    id: "links",
    title: "Third-party links",
    body: (
      <p>
        Links to external services such as WhatsApp, Instagram, YouTube or Telegram are provided for convenience. Their
        own terms and privacy policies apply.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of the country in which VAULT is registered. Disputes will first be
        addressed amicably and, failing that, by the competent courts of that jurisdiction.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes",
    body: <p>We may update these terms. Continued use of the website after an update means you accept the new version.</p>,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="October 1, 2026"
      intro={<p>Clear rules for a discreet service. Please read them before sending an enquiry or taking part in an auction.</p>}
      sections={sections}
    />
  );
}
