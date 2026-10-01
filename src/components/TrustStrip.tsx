import { Gem, KeyRound, ShieldCheck, UserRound, Globe2 } from "lucide-react";
import BenefitStrip from "./BenefitStrip";

export default function TrustStrip() {
  return (
    <div className="container">
      <BenefitStrip
        items={[
          { icon: Gem, title: "Verified automobiles", text: "Full inspection & documentation" },
          { icon: KeyRound, title: "Transparent history", text: "Verified provenance & service records" },
          { icon: ShieldCheck, title: "Private transactions", text: "Discreet and secure process" },
          { icon: UserRound, title: "Personal assistance", text: "Dedicated support for every client" },
          { icon: Globe2, title: "International delivery", text: "Worldwide delivery options" },
        ]}
      />
    </div>
  );
}
