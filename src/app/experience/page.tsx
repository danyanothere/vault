import type { Metadata } from "next";
import Experience360 from "./Experience360";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "360° Experience",
  description: "Explore every detail of the collection.",
};

export default function ExperiencePage() {
  return (
    <>
      <Experience360 />
      <ContactCTA />
    </>
  );
}
