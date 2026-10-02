export type Post = { slug: string; title: string; date: string; category: string; excerpt: string; image: string; position?: string };

export const journal: Post[] = [
  {
    slug: "maserati-quattroporte-story",
    title: "The story behind a Maserati Quattroporte",
    date: "Sep 12, 2026",
    category: "Heritage",
    excerpt: "Six generations of the four-door that taught Italy how to travel quickly, and in comfort.",
    image: "/images/hero/maserati-showroom.webp",
  },
  {
    slug: "inspect-porsche-911",
    title: "How to inspect a Porsche 911 before buying",
    date: "Sep 5, 2026",
    category: "Guidance",
    excerpt: "Bore scoring, service records and the questions a seller should never avoid.",
    image: "/images/vehicles/porsche/porsche-911-cabriolet.webp",
  },
  {
    slug: "performance-suv-values",
    title: "The rising value of performance SUVs",
    date: "Aug 28, 2026",
    category: "Market",
    excerpt: "Why limited-run SUVs are quietly outperforming the coupés they share engines with.",
    image: "/images/vehicles/brabus/brabus-gls-showroom.webp",
  },
  {
    slug: "private-auction-guide",
    title: "Inside a private auction: what bidders should know",
    date: "Aug 14, 2026",
    category: "Auction",
    excerpt: "Reserve prices, provenance files and the etiquette of bidding in a closed room.",
    image: "/images/auction/porsche-rear.webp",
  },
  {
    slug: "keeping-a-collection",
    title: "Keeping a collection: storage, climate and care",
    date: "Jul 30, 2026",
    category: "Collection",
    excerpt: "The unglamorous discipline that protects the value of an exceptional car.",
    image: "/images/about/showroom.webp",
    position: "30% 60%",
  },
  {
    slug: "grand-touring",
    title: "Grand touring, reconsidered",
    date: "Jul 16, 2026",
    category: "Driving",
    excerpt: "A thousand kilometres in a day, and why the right car makes it feel like two hundred.",
    image: "/images/about/coastal-porsche.webp",
    position: "50% 70%",
  },
];

/** Posts with the locale's category, title, excerpt and date. */
export const localizeJournal = (dict: import("@/i18n/config").Dict): Post[] =>
  journal.map((p, i) => {
    const [category, title, excerpt, date] = dict.journal.posts[i] ?? [p.category, p.title, p.excerpt, p.date];
    return { ...p, category, title, excerpt, date };
  });
