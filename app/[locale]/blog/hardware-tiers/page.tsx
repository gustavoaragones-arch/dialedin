import { BlogArticleFooter } from "@/components/blog/BlogArticleFooter";
import { HardwareTiersEsArticle } from "@/components/blog/es/HardwareTiersEs";
import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { blogPostMetadata } from "@/lib/blogSeo";
import { outwardPath } from "@/lib/routePathnames";
import { SITE_URL } from "@/lib/seoSite";
import { getTranslations, setRequestLocale } from "next-intl/server";

const HARDWARE_TIERS_KEYWORDS = [
  "best professional tattoo machines",
  "budget vs premium tattoo cartridges",
  "Cheyenne vs Dragonhawk performance",
  "tattoo gear reliability",
] as const;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  return blogPostMetadata(params, {
    metaKey: "blogHardwareTiers",
    path: "/blog/hardware-tiers",
    keywords: [...HARDWARE_TIERS_KEYWORDS],
  });
}

export default async function HardwareTiersPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const headline = tMeta("blogHardwareTiers.title");
  const description = tMeta("blogHardwareTiers.description");
  const pageUrl = `${SITE_URL}/${locale}${outwardPath(locale, "/blog/hardware-tiers")}`;
  const tNav = await getTranslations({ locale, namespace: "blogNav" });

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${pageUrl}#techarticle`,
    headline,
    url: pageUrl,
    description,
    author: { "@type": "Organization", name: "DialedIn Team" },
    publisher: {
      "@type": "Organization",
      name: "DialedIn.ink",
      url: "https://dialedin.ink",
    },
    keywords: [
      "best professional tattoo machines",
      "budget vs premium tattoo cartridges",
      "Cheyenne vs Dragonhawk performance",
      "tattoo gear reliability",
    ],
  };

  if (locale === "es") {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
        <HardwareTiersEsArticle headline={headline} backBlog={tNav("backBlog")} />
      </>
    );
  }

  return (
    <article className="science-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <header className="science-page__header">
        <p className="science-page__eyebrow">
          <Link href="/blog">{tNav("backBlog")}</Link>
        </p>
        <h1 className="science-page__title">{headline}</h1>
        <p className="science-page__lede">
          The question is not pride. The question is predictability. Tiers describe how repeatable
          your setup stays when skin resistance and workload rise.
        </p>
      </header>

      <section className="blog-tech-summary" aria-labelledby="technical-summary-heading">
        <h2 id="technical-summary-heading" className="blog-tech-summary__title">
          Technical Summary
        </h2>
        <ul className="blog-tech-summary__list">
          <li>Tier 1 improves timing consistency and cartridge stability under load.</li>
          <li>Tier 2 remains valid for training, synthetic reps, and disciplined backup rigs.</li>
          <li>Upgrade when your hand precision exceeds your machine&apos;s repeatability.</li>
        </ul>
      </section>

      <section className="science-section">
        <h2>Is it the artist or the tool?</h2>
        <p>
          Early on, you do not need a premium setup to learn line mechanics. But as you move toward
          professional skin work, you will eventually meet a performance ceiling. Understanding tiers
          is a reliability decision, not a status decision.
        </p>
      </section>

      <section className="science-section">
        <h2>Tier 1: The benchmarks (Cheyenne, Bishop, Kwadron)</h2>
        <p>
          These brands are listed as Tier 1 benchmarks in our internal reference list from{" "}
          <strong>tattoo machines:cartridges.pdf</strong>. Their advantage is repeatability:
          precision motor timing, stable throw behavior, and tighter cartridge consistency session
          after session.
        </p>
        <p>
          In practical terms, many artists evaluating the{" "}
          <strong>best professional tattoo machines</strong> choose this class when they need
          reliable pass behavior across varied skin and long appointment windows.
        </p>
      </section>

      <section className="science-section">
        <h2>Tier 2: The reliable workhorses (Dragonhawk, Mast, Peak)</h2>
        <p>
          Tier 2 has improved significantly. These systems are useful for apprentices on synthetic
          skin and for artists who need dependable backup tools.
        </p>
        <p>
          The trade-off appears under heavy load: more vibration drift, occasional torque variance,
          and less cartridge consistency when saturating dense black. This is the real-world lens on{" "}
          <strong>budget vs premium tattoo cartridges</strong> and machine classes.
        </p>
        <p>
          In direct station conversation around <strong>Cheyenne vs Dragonhawk performance</strong>,
          the deciding variable is usually repeatability under stress, not isolated peak output.
        </p>
        <blockquote>
          <p>
            <strong>Disciplined mentor:</strong> Build your habits on the gear you can trust every
            day. Upgrade when your hand outgrows the machine&apos;s ability to mirror your precision.
          </p>
        </blockquote>
      </section>

      <section className="science-section">
        <h2>The disciplined path forward</h2>
        <p>
          Learn physics on reliable Tier 2. Move to Tier 1 when your baseline is stable and you need
          tighter repeatability. That is how you improve <strong>tattoo gear reliability</strong> at
          the station level without confusing price with proficiency.
        </p>
      </section>

      <BlogTechnicalContext title="Open the Setup Engine" primaryLabel="Open the Setup Engine" />

      <BlogArticleFooter />
    </article>
  );
}
