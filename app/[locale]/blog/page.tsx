import { Link } from "@/i18n/navigation";
import { BLOG_INDEX_POSTS } from "@/lib/blogIndexPosts";
import { localizedPageMetadata } from "@/lib/localizedMetadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return localizedPageMetadata(locale, "blogHub", "/blog");
}

export default async function BlogIndexPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const t = await getTranslations({ locale, namespace: "blogIndex" });

  return (
    <main className="blog-page">
      <header className="blog-page__header">
        <nav className="science-page__eyebrow" aria-label="Site sections">
          <Link className="dialed__link" href="/">
            {tNav("setupTool")}
          </Link>
          <span className="blog-page__crumb-sep" aria-hidden>
            {" · "}
          </span>
          <Link className="dialed__link" href="/how-it-works">
            {tNav("howItWorks")}
          </Link>
          <span className="blog-page__crumb-sep" aria-hidden>
            {" · "}
          </span>
          <span aria-current="page">{tNav("blog")}</span>
        </nav>
        <h1 className="blog-page__title">{t("pageTitle")}</h1>
        <p className="blog-page__subhead">{t("pageSubhead")}</p>
      </header>

      <section className="blog-list" aria-label="Blog posts">
        {BLOG_INDEX_POSTS.map((post) => (
          <article key={post.slug} className="blog-card">
            <span className="blog-card__tag">
              {t(`categories.${post.categoryKey}`)}
            </span>
            <h2 className="blog-card__title">
              <Link className="blog-card__link" href={`/blog/${post.slug}`}>
                {t(`posts.${post.key}.title`)}
              </Link>
            </h2>
            <p className="blog-card__summary">
              {t(`posts.${post.key}.summary`)}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
