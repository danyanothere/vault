import Link from "next/link";
import type { ReactNode } from "react";
import Arrow from "./Arrow";

type Props = {
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  arrow?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
};

export default function Button({ href, variant = "primary", arrow, icon, children, type = "button", onClick, className = "" }: Props) {
  const cls = `btn btn-${variant} ${className}`.trim();
  const inner = (
    <>
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}
