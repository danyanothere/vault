import type { Metadata } from "next";
import JournalList from "./JournalList";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Journal",
  description: "Stories, insights and automobiles from the VAULT journal.",
};

export default function JournalPage() {
  return (
    <>
      <JournalList />
      <ContactCTA />
    </>
  );
}
