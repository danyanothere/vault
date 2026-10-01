"use client";

import Image from "next/image";
import { useState } from "react";
import Arrow from "@/components/Arrow";
import { journal } from "@/data/journal";

export default function JournalList() {
  const [all, setAll] = useState(false);
  const posts = all ? journal : journal.slice(0, 3);

  return (
    <section className="container journal">
      <div className="journal-head">
        <div>
          <h1 className="title-lg">The VAULT journal</h1>
          <p className="journal-sub">Stories. Insights. Automobiles.</p>
        </div>
        <button type="button" className="btn btn-outline-light btn-sm" aria-expanded={all} aria-controls="journal-grid" onClick={() => setAll((a) => !a)}>
          <span>{all ? "Show less" : "View all"}</span>
          <Arrow />
        </button>
      </div>
      <ul id="journal-grid" className="journal-grid">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="journal-card">
              <div className="journal-img">
                <Image src={post.image} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" style={{ objectPosition: post.position }} />
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
