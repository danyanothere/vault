import type { LucideIcon } from "lucide-react";

export type Benefit = { icon: LucideIcon; title: string; text?: string };

export default function BenefitStrip({ items, className = "", centered = false }: { items: Benefit[]; className?: string; centered?: boolean }) {
  return (
    <ul className={`benefit-strip cols-${items.length} ${centered ? "is-centered" : ""} ${className}`.trim()}>
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title}>
          <Icon size={centered ? 30 : 28} strokeWidth={1} aria-hidden="true" />
          <div>
            <h3>{title}</h3>
            {text && <p>{text}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
