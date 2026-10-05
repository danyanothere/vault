import { notFound } from "next/navigation";

// Any unknown path inside a locale renders the branded 404 (with header, footer and translations).
export default function CatchAll() {
  notFound();
}
