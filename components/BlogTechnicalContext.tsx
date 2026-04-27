import Link from "next/link";

/** Crawlable CTAs at the end of technical blog posts (topic cluster hub). */
export function BlogTechnicalContext() {
  return (
    <section
      className="blog-tech-context"
      aria-labelledby="blog-tech-context-heading"
    >
      <h2 id="blog-tech-context-heading" className="blog-tech-context__title">
        Technical context
      </h2>
      <div className="blog-tech-context__actions">
        <Link
          href="/"
          className="blog-tech-context__btn blog-tech-context__btn--primary"
        >
          Configure Your Setup
        </Link>
        <Link href="/how-it-works" className="blog-tech-context__btn">
          View Technical Methodology
        </Link>
      </div>
    </section>
  );
}
