import { Phone } from "lucide-react";

export default function FloatingPhone() {
  return (
    <a href="tel:+40700000000" className="floating-phone" aria-label="Call VAULT">
      <Phone size={18} strokeWidth={1.5} />
    </a>
  );
}
