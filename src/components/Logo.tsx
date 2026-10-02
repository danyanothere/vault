"use client";

import Link, { useDict } from "@/i18n/client";

export default function Logo({ onClick }: { onClick?: () => void }) {
  const dict = useDict();
  return (
    <Link href="/" className="logo" aria-label={`VAULT ${dict.common.privateAutomobiles}`} onClick={onClick}>
      <span className="logo-mark">VAULT</span>
      <span className="logo-sub">{dict.common.privateAutomobiles}</span>
    </Link>
  );
}
