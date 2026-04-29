import { PhysicsRuleBreakingEnArticle } from "@/components/blog/PhysicsRuleBreakingEn";
import { PhysicsRuleBreakingEsArticle } from "@/components/blog/es/PhysicsRuleBreakingEs";
import { blogPostMetadata } from "@/lib/blogSeo";
import { outwardPath } from "@/lib/routePathnames";
import { SITE_URL } from "@/lib/seoSite";
import { getTranslations, setRequestLocale } from "next-intl/server";

const RULE_BREAKING_KEYWORDS_EN = [
  "high stroke shading",
  "magnum lining technique",
  "pepper shading vs smooth shading",
  "tattoo machine physics",
  "creative tattoo setup",
  "tattoo needle hang",
] as const;

const ARTICLE_BODY_EXCERPT_EN =
  "In the tattoo industry, standards exist to prevent skin trauma, but advanced artists often bypass them to achieve unique textures. Long-stroke machines can shade when voltage and hand speed are re-balanced; magnums can draw portrait edges when geometry replaces RL aggression; micro-realism can run on a single 3RL when layering replaces gauge width. DialedIn encodes conservative defaults so you can name your deltas with intent.";

const ARTICLE_BODY_EXCERPT_ES =
  "En el tatuaje, los estándares reducen trauma y varianza, pero los artistas avanzados los rompen con intención para lograr texturas únicas. Un stroke largo puede sombrear si se reequilibra voltaje y mano; un magnum puede dibujar aristas de retrato cuando la geometría sustituye la agresividad del RL; el micro-realismo puede vivir en una sola 3RL cuando las capas sustituyen el ancho de agrupación. DialedIn fija un origen conservador para que puedas nombrar tu delta con rigor.";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  return blogPostMetadata(params, {
    metaKey: "blogPhysicsRuleBreaking",
    path: "/blog/physics-of-rule-breaking",
    keywords: [...RULE_BREAKING_KEYWORDS_EN],
  });
}

export default async function PhysicsRuleBreakingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const headline = tMeta("blogPhysicsRuleBreaking.title");
  const description = tMeta("blogPhysicsRuleBreaking.description");
  const pageUrl = `${SITE_URL}/${locale}${outwardPath(locale, "/blog/physics-of-rule-breaking")}`;
  const tNav = await getTranslations({ locale, namespace: "blogNav" });

  const alternativeHeadline =
    locale === "es"
      ? "Por qué los estándares técnicos son solo un punto de partida"
      : "Why technical standards are just a starting point";

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${pageUrl}#article`,
    headline,
    alternativeHeadline,
    url: pageUrl,
    description,
    articleBody:
      locale === "es" ? ARTICLE_BODY_EXCERPT_ES : ARTICLE_BODY_EXCERPT_EN,
    author: {
      "@type": "Organization",
      name: "DialedIn Technical Lab",
    },
    publisher: {
      "@type": "Organization",
      name: "DialedIn.ink",
      url: "https://dialedin.ink",
    },
    keywords: RULE_BREAKING_KEYWORDS_EN.join(", "),
  };

  if (locale === "es") {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
        <PhysicsRuleBreakingEsArticle
          headline={headline}
          lede={description}
          backBlog={tNav("backBlog")}
        />
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <PhysicsRuleBreakingEnArticle
        headline={headline}
        lede={description}
        backBlog={tNav("backBlog")}
      />
    </>
  );
}
