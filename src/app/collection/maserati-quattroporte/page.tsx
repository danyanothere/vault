import type { Metadata } from "next";
import VehicleDetail from "./VehicleDetail";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Maserati Quattroporte",
  description: "Maserati Quattroporte — Italian grand touring, available by private enquiry.",
};

export default function MaseratiPage() {
  return (
    <>
      <VehicleDetail />
      <ContactCTA />
    </>
  );
}
