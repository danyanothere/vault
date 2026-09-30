import type { ReactNode } from "react";

type Props = { eyebrow: string; title: ReactNode; children?: ReactNode; as?: "h1" | "h2"; className?: string };

export default function SectionHeading({ eyebrow, title, children, as: Tag = "h2", className = "" }: Props) {
  return (
    <div className={`section-heading ${className}`.trim()}>
      <p className="eyebrow">{eyebrow}</p>
      <Tag className="title-lg">{title}</Tag>
      {children && <div className="lede">{children}</div>}
    </div>
  );
}
