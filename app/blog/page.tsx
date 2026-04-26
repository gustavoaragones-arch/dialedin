import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Technical Blog — DialedIn.ink",
  description:
    "Technical insights and machine physics from the DialedIn Team.",
};

const POSTS = [
  {
    slug: "hertz-vs-volts",
    title: "Hertz vs. Volts: The Frequency Truth",
    summary:
      "Understand the display dilemma between volts and Hz, and how derived CPS gives a true picture of needle reciprocation across ACUS, Cheyenne, and standard rotary setups.",
    category: "Motor Physics",
  },
  {
    slug: "the-membrane-tax",
    title: "The Membrane Tax: Why Your Machine Stalls on Budget Cartridges",
    summary:
      "Learn why stiffer cartridge membranes can absorb effective drive and how to compensate voltage without overdriving skin, especially on tier-2 machines.",
    category: "Needle Geometry",
  },
] as const;

export default function BlogIndexPage() {
  return (
    <main className="blog-page">
      <header className="blog-page__header">
        <p className="science-page__eyebrow">
          <Link href="/">← DIALED-IN tool</Link>
        </p>
        <h1 className="blog-page__title">Technical Blog</h1>
        <p className="blog-page__subhead">
          Technical insights and machine physics from the DialedIn Team.
        </p>
      </header>

      <section className="blog-list" aria-label="Blog posts">
        {POSTS.map((post) => (
          <article key={post.slug} className="blog-card">
            <span className="blog-card__tag">{post.category}</span>
            <h2 className="blog-card__title">
              <Link className="blog-card__link" href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className="blog-card__summary">{post.summary}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
