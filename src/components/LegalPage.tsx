import Link from "next/link";
import type { ReactNode } from "react";

export type LegalSection = { id: string; title: string; body: ReactNode };

type Props = { eyebrow: string; title: string; updated: string; intro: ReactNode; sections: LegalSection[] };

export default function LegalPage({ eyebrow, title, updated, intro, sections }: Props) {
  return (
    <article className="legal container">
      <header className="legal-head">
        <p className="eyebrow eyebrow-after">{eyebrow}</p>
        <h1 className="title-xl">{title}</h1>
        <p className="legal-updated">Last updated: {updated}</p>
        <div className="legal-intro">{intro}</div>
      </header>

      <div className="legal-grid">
        <nav className="legal-toc" aria-label="On this page">
          <p className="legal-toc-title">On this page</p>
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
              {s.body}
            </section>
          ))}
          <p className="legal-foot">
            Questions about this document? <Link href="/contact">Contact us</Link> — we reply personally.
          </p>
        </div>
      </div>
    </article>
  );
}
