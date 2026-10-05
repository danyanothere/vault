import Link from "@/i18n/client";
import { getDict } from "@/i18n/server";

export default async function NotFound() {
  const dict = await getDict();
  const t = dict.notFound;
  return (
    <section className="container legal" style={{ minHeight: "60svh", display: "grid", alignContent: "center", gap: 22 }}>
      <p className="eyebrow eyebrow-after">404</p>
      <h1 className="title-xl">{t.title}</h1>
      <p className="body-muted">{t.text}</p>
      <div className="btn-row">
        <Link href="/collection" className="btn btn-primary">
          <span>{dict.common.exploreCollection}</span>
        </Link>
        <Link href="/" className="btn btn-ghost">
          <span>{t.home}</span>
        </Link>
      </div>
    </section>
  );
}
