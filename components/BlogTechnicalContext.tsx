import { Link } from "@/i18n/navigation";

/** Crawlable CTAs at the end of technical blog posts (topic cluster hub). */
type BlogTechnicalContextProps = {
  title?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  /** Optional localized description (defaults to English marketing line). */
  description?: string;
};

export function BlogTechnicalContext({
  title = "Tool call",
  primaryLabel = "Configure Your Setup",
  secondaryLabel = "View Technical Methodology",
  description = "Logic is the foundation. Precision is the result. Setup your machine with DialedIn.",
}: BlogTechnicalContextProps) {
  return (
    <section
      className="blog-tech-context"
      aria-labelledby="blog-tech-context-heading"
    >
      <h2 id="blog-tech-context-heading" className="blog-tech-context__title">
        {title}
      </h2>
      <p className="blog-tech-context__description">{description}</p>
      <div className="blog-tech-context__actions">
        <Link
          href="/"
          className="blog-tech-context__btn blog-tech-context__btn--primary"
        >
          {primaryLabel}
        </Link>
        <Link href="/how-it-works" className="blog-tech-context__btn">
          {secondaryLabel}
        </Link>
      </div>
    </section>
  );
}
