import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/i18n/meta";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("terms", "/terms");

export default function TermsPage() {
  return <LegalPage doc="terms" />;
}
