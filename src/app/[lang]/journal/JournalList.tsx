"use client";

import Image from "next/image";
import { useState } from "react";
import Arrow from "@/components/Arrow";
import { localizeJournal } from "@/data/journal";
import { useDict } from "@/i18n/client";

export default function JournalList() {
  const [all, setAll] = useState(false);
  const dict = useDict();
  const t = dict.journal;
  const journal = localizeJournal(dict);
  const posts = all ? journal : journal.slice(0, 3);

  return (
    <section className="container journal">
      <div className="journal-head">
        <div>
          <h1 className="title-lg">{t.title}</h1>
          <p className="journal-sub">{t.sub}</p>
        </div>
        <button type="button" className="btn btn-outline-light btn-sm" aria-expanded={all} aria-controls="journal-grid" onClick={() => setAll((a) => !a)}>
          <span>{all ? t.showLess : t.viewAll}</span>
          <Arrow />
        </button>
      </div>
      <ul id="journal-grid" className="journal-grid">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="journal-card" data-cursor="view">
              <div className="journal-img">
                <Image src={post.image} alt="" fill quality={90} sizes="(max-width: 640px) 100vw, 33vw" style={{ objectPosition: post.position }} />
              </div>
              <div className="journal-body">
                <p className="journal-meta">{post.category}</p>
                <h2 className="journal-title">{post.title}</h2>
                <p className="journal-excerpt">{post.excerpt}</p>
                <time className="journal-date">{post.date}</time>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
