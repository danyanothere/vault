import Link from "@/i18n/client";
import { getDict, getLang } from "@/i18n/server";
import { legal, updatedOn } from "@/i18n/legal";

export default async function LegalPage({ doc }: { doc: "privacy" | "terms" }) {
  const lang = await getLang();
  const dict = await getDict();
  const l = dict.legal;
  const { intro, sections } = legal[lang][doc];
  const title = dict.meta[doc][0];

  return (
    <article className="legal container">
      <header className="legal-head">
        <p className="eyebrow eyebrow-after">{l.eyebrow}</p>
        <h1 className="title-xl">{title}</h1>
        <p className="legal-updated">
          {l.updated}: {updatedOn[lang]}
        </p>
        <div className="legal-intro">
          <p>{intro}</p>
        </div>
      </header>

      <div className="legal-grid">
        <nav className="legal-toc" aria-label={l.onPage}>
          <p className="legal-toc-title">{l.onPage}</p>
          <ol>
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="legal-body">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`}>
              <h2 id={`${s.id}-t`}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              {s.paras?.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((item) => (
                    <li key={item.slice(0, 24)}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <p className="legal-foot">
            {l.questions} <Link href="/contact">{l.contactUs}</Link> {l.reply}
          </p>
        </div>
      </div>
    </article>
  );
}
