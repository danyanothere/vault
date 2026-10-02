import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/meta";
import Experience360 from "./Experience360";
import ContactCTA from "@/components/ContactCTA";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("experience", "/experience");

export default function ExperiencePage() {
  return (
    <>
      <Experience360 />
      <ContactCTA />
    </>
  );
}
