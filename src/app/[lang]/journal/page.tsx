import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/meta";
import JournalList from "./JournalList";
import ContactCTA from "@/components/ContactCTA";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("journal", "/journal");

export default function JournalPage() {
  return (
    <>
      <JournalList />
      <ContactCTA />
    </>
  );
}
