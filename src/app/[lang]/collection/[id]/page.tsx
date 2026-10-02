import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VehicleDetail from "./VehicleDetail";
import ContactCTA from "@/components/ContactCTA";
import { getVehicle, localizeVehicle, vehicleName, vehicles } from "@/data/vehicles";
import { getDict } from "@/i18n/server";
import { alternates } from "@/i18n/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return vehicles.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/collection/[id]">): Promise<Metadata> {
  const { id } = await params;
  const v = getVehicle(id);
  if (!v) return {};
  const lv = localizeVehicle(v, await getDict());
  return { title: vehicleName(lv), description: lv.detailIntro, alternates: await alternates(`/collection/${id}`) };
}

export default async function VehiclePage({ params }: PageProps<"/[lang]/collection/[id]">) {
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
