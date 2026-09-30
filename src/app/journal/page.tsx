import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ContactCTA from "@/components/ContactCTA";
import { journal } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Stories, insights and automobiles from the VAULT journal.",
};

export default function JournalPage() {
  return (
    <>
      <div className="container">
        <div className="journal-head">
          <SectionHeading
            as="h1"
            eyebrow="The VAULT journal"
            title={
              <>
                Stories. Insights.
                <br />
                Automobiles.
              </>
            }
          />
          <p className="body-muted">Notes from the collection — heritage, buying advice and the market for exceptional cars.</p>
        </div>
        <div className="journal-grid">
          {journal.map((post, i) => (
            <Link key={post.slug} href="/journal" className={`journal-card ${i === 0 ? "featured" : ""}`}>
              <Image src={post.image} alt="" fill sizes={i === 0 ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"} />
              <div className="journal-body">
                <p className="journal-meta">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </p>
                <h2 className="journal-title">{post.title}</h2>
                <p className="journal-excerpt">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <ContactCTA />
    </>
  );
}
