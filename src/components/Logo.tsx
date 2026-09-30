import Link from "next/link";

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="logo" aria-label="VAULT Private Automobiles, home" onClick={onClick}>
      <span className="logo-mark">VAULT</span>
      <span className="logo-sub">Private Automobiles</span>
    </Link>
  );
}
