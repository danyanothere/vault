import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How VAULT collects, uses and protects your personal data.",
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <p>
        VAULT Private Automobiles (“VAULT”, “we”, “us”) is the controller of the personal data described in this
        policy. You can reach us at any time through the <Link href="/contact">contact page</Link> or by phone.
      </p>
    ),
  },
  {
    id: "data-we-collect",
    title: "Data we collect",
    body: (
      <>
        <p>We only collect what you choose to give us, and what is needed to answer you:</p>
        <ul>
          <li>Contact details — name, phone or WhatsApp number, email address, preferred contact method.</li>
          <li>Your enquiry — the vehicle or service you are interested in and any message you send.</li>
          <li>Vehicle details — brand, model, year, mileage, condition and photos, if you offer a car for sale.</li>
          <li>Auction participation — identity and verification details, only if you request to bid.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your data",
    body: (
      <ul>
        <li>To reply to your enquiry and arrange private viewings.</li>
        <li>To evaluate and present a vehicle you wish to sell.</li>
        <li>To verify bidders and run private auctions.</li>
        <li>To meet legal, accounting and anti-money-laundering obligations.</li>
      </ul>
    ),
  },
  {
    id: "legal-basis",
    title: "Legal basis",
    body: (
      <p>
        We process your data to take steps at your request before entering into a contract, to perform a contract with
        you, to comply with legal obligations, and — for keeping in touch about similar vehicles — on the basis of our
        legitimate interest or your consent, which you can withdraw at any time.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "Sharing",
    body: (
      <p>
        Discretion is the core of our service. We never sell your data. We share it only with parties strictly needed
        to complete a transaction — such as inspection partners, logistics providers, payment institutions or public
        authorities — and only the minimum required.
      </p>
    ),
  },
  {
    id: "retention",
    title: "Retention",
    body: (
      <p>
        Enquiries that do not lead to a transaction are deleted within 24 months. Transaction records are kept for the
        period required by tax and accounting law.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    body: (
      <p>
        This website does not use advertising or tracking cookies. Your browser stores a few small preferences locally
        — your chosen language, whether the intro animation has already played and whether you have opened our offer —
        so the site behaves as expected. These never leave your device.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <p>
        You may request access to, correction or deletion of your data, restrict or object to its processing, and ask
        for a copy in a portable format. You also have the right to lodge a complaint with your national data protection
        authority. To exercise any right, contact us — we respond within 30 days.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        Access to client data is limited to the team members who handle your request. We use encrypted connections and
        trusted providers to store information.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: <p>We may update this policy from time to time. The date at the top shows the latest version.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="October 1, 2026"
      intro={<p>Your privacy is part of the service. This page explains what we collect, why, and how you stay in control.</p>}
      sections={sections}
    />
  );
}
