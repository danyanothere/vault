import { Gem, KeyRound, ShieldCheck, UserRound, Globe2 } from "lucide-react";
import BenefitStrip from "./BenefitStrip";
import { getDict } from "@/i18n/server";

const icons = [Gem, KeyRound, ShieldCheck, UserRound, Globe2];

export default async function TrustStrip() {
  const trust = (await getDict()).trust;
  return (
    <div className="container">
      <BenefitStrip items={trust.map(([title, text], i) => ({ icon: icons[i], title, text }))} />
    </div>
  );
}
