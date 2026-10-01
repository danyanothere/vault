import Link from "next/link";
import type { ReactNode } from "react";
import Arrow from "./Arrow";

type Props = {
  href?: string;
  variant?: "primary" | "outline" | "outline-light" | "ghost";
  arrow?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  /** Subtle magnetic pull on fine pointers (handled by ContextCursor). */
  magnetic?: boolean;
};

export default function Button({ href, variant = "primary", arrow, icon, children, type = "button", onClick, className = "", magnetic = false }: Props) {
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
      <Link href={href} className={cls} onClick={onClick} data-magnetic={magnetic || undefined}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} data-magnetic={magnetic || undefined}>
      {inner}
    </button>
  );
}
