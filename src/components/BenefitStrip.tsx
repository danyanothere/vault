import type { LucideIcon } from "lucide-react";

export type Benefit = { icon: LucideIcon; title: string; text?: string };

export default function BenefitStrip({ items, className = "" }: { items: Benefit[]; className?: string }) {
  return (
    <ul className={`benefit-strip cols-${items.length} ${className}`.trim()}>
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title}>
          <Icon size={26} strokeWidth={1} aria-hidden="true" />
          <div>
            <h3>{title}</h3>
            {text && <p>{text}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
