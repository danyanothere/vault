import type { Dict } from "@/i18n/config";

type UIKey = keyof Dict["nav"];

export const navItems: { href: string; key: UIKey }[] = [
  { href: "/collection", key: "collection" },
  { href: "/experience", key: "experience" },
  { href: "/about", key: "about" },
  { href: "/journal", key: "journal" },
  { href: "/contact", key: "contact" },
];

