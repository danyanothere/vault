import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VehicleDetail from "./VehicleDetail";
import ContactCTA from "@/components/ContactCTA";
import { getVehicle, vehicleName, vehicles } from "@/data/vehicles";

export const dynamicParams = false;

export function generateStaticParams() {
  return vehicles.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: PageProps<"/collection/[id]">): Promise<Metadata> {
  const { id } = await params;
  const v = getVehicle(id);
  return v ? { title: vehicleName(v), description: v.detailIntro } : {};
}

export default async function VehiclePage({ params }: PageProps<"/collection/[id]">) {
  const { id } = await params;
  const v = getVehicle(id);
  if (!v) notFound();
  return (
    <>
      <VehicleDetail id={v.id} />
      <ContactCTA />
    </>
  );
}
