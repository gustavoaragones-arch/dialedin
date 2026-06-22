import { BlogArticleFooter } from "@/components/blog/BlogArticleFooter";
import { NeedleTaperEsArticle } from "@/components/blog/es/NeedleTaperEs";
import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { blogPostMetadata } from "@/lib/blogSeo";
import { outwardPath } from "@/lib/routePathnames";
import { SITE_URL } from "@/lib/seoSite";
import { getTranslations, setRequestLocale } from "next-intl/server";

const NEEDLE_TAPER_KEYWORDS = [
  "Tattoo needle taper differences",
  "long taper vs short taper tattoo",
  "needle penetration depth tattoo myth",
  "super long taper realism tattoo",
] as const;

const ARTICLE_BODY_EXCERPT_EN =
  "Needle taper is the length of the sharpened cone before full shank diameter: short taper opens fast for packing authority; long taper balances ink flow and gentler entry; super long taper favors micro-detail and soft layering when technique respects hole geometry. Artists rarely \"know\" millimeters live—they read resistance through the grip, saturation, and machine tone.";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  return blogPostMetadata(params, {
    metaKey: "blogNeedleTaper",
    path: "/blog/needle-taper",
    keywords: [...NEEDLE_TAPER_KEYWORDS],
  });
}

export default async function NeedleTaperPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const headline = tMeta("blogNeedleTaper.title");
  const description = tMeta("blogNeedleTaper.description");
  const pageUrl = `${SITE_URL}/${locale}${outwardPath(locale, "/blog/needle-taper")}`;
  const tNav = await getTranslations({ locale, namespace: "blogNav" });

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${pageUrl}#article`,
    headline,
    url: pageUrl,
    description,
    articleBody: ARTICLE_BODY_EXCERPT_EN,
    author: {
      "@type": "Organization",
      name: "tattoomachinesetup.com Team",
    },
    publisher: {
      "@type": "Organization",
      name: "tattoomachinesetup.com",
      url: "https://tattoomachinesetup.com",
    },
    keywords: NEEDLE_TAPER_KEYWORDS.join(", "),
  };

  if (locale === "es") {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
        <NeedleTaperEsArticle headline={headline} backBlog={tNav("backBlog")} />
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
          In technical tattooing, taper—the needle&apos;s sharpened cone—is often the most
          misunderstood variable. Gauge tells you wire thickness; grouping tells you how needles
          are bound; taper defines how steel enters skin and how much pigment each hit deposits.
          Understanding taper is the difference between clean saturation and needless trauma.
        </p>
      </header>

      <section className="science-section">
        <h2>Technical geometry: what taper actually is</h2>
        <p>
          Taper is the length of the needle&apos;s point before it reaches full shank diameter
          (gauge). Measure runs from where the grind begins to the tip.
        </p>
        <ul>
          <li>
            <strong>Short taper (ST), ~1.5&nbsp;mm:</strong> a shorter, relatively blunt cone.
            Opens a wider channel quickly—strong for color packing and bold traditional lines where
            you want decisive ink delivery per cycle.
          </li>
          <li>
            <strong>Long taper (LT), ~2.0–2.5&nbsp;mm:</strong> the common industry balance between
            ink flow and softer mechanical entry.
          </li>
          <li>
            <strong>Super long taper (SLT), ~3.5–7.0&nbsp;mm:</strong> an extremely fine, long point.
            Enters with minimal wedging at the surface—often favored for realism, soft gradients,
            and micro-detail when passes stay disciplined.
          </li>
        </ul>
        <p>
          Pair taper thinking with gauge basics in{" "}
          <Link className="dialed__link" href="/blog/needle-geometry">
            needle geometry (#10 vs #12 &amp; taper)
          </Link>
          .
        </p>
      </section>

      <section className="science-section">
        <h2>The precision myth: “1&nbsp;mm depth” vs feeling</h2>
        <p>
          Seminars love tidy quotes—“stay exactly 1.5&nbsp;mm.” As an average mental map toward
          viable dermis, it can help beginners. As a live measurement, it breaks down fast.
        </p>
        <p>
          <strong>No artist reads true millimeters in real time.</strong> Tattooing is not CNC
          milling. Skin elasticity, thickness, and regional resistance vary person-to-person and
          elbow-to-inner-forearm.
        </p>
        <h3>What artists actually steer</h3>
        <ul>
          <li>
            <strong>Mechanical resistance:</strong> vibration through the grip signals how hard you
            are loading tissue.
          </li>
          <li>
            <strong>Visual saturation:</strong> how pigment seats and whether the surface shows
            trauma shine or chew.
          </li>
          <li>
            <strong>Sound:</strong> tonal shift when the needle stack meets tougher tissue.
          </li>
        </ul>
        <blockquote>
          <p>
            <strong>Disciplined mentor:</strong> millimeters are a teaching scaffold for “which
            layer matters.” Execution is a trained feedback loop—not a handheld depth gauge.
          </p>
        </blockquote>
      </section>

      <section className="science-section">
        <h2>How much needle should enter?</h2>
        <p>
          With super long taper, often only part of the grind negotiates the surface before full
          gauge width engages. Driving to full-column depth widens the hole and invites mechanical
          bleed that reads like user error but is geometry.
        </p>
        <ul>
          <li>
            <strong>Soft shading:</strong> frequently “kiss” with cone tip for incremental value
            builds.
          </li>
          <li>
            <strong>Solid lines:</strong> enough engagement that the ink channel retains pigment
            without chasing volts for what taper already refused to do cleanly.
          </li>
        </ul>
        <p>
          Visible needle hang changes what “entry” means at the tube—review{" "}
          <Link className="dialed__link" href="/blog/needle-hang-depth">
            needle hang &amp; depth control
          </Link>{" "}
          before you blame only voltage.
        </p>
      </section>

      <section className="science-section">
        <h2>Technique over numerology</h2>
        <p>
          tattoomachinesetup.com encodes conservative geometry context so realism-oriented workflows bias toward
          long or super-long taper recommendations where that lowers relative trauma—while stroke,
          cartridge tier, and hand velocity stay coupled in the same model.
        </p>
        <p>
          Obsess over skin feedback, not micrometers on the needle drawing. The machine is the
          actuator, taper is the bridge geometry, and your hand is the sensor that decides when ink
          deposit is correct.
        </p>
        <p>
          Once taper clicks, close the loop with{" "}
          <Link className="dialed__link" href="/blog/hand-speed-sync">
            hand speed vs machine CPS/Hertz
          </Link>{" "}
          and the setup engine&apos;s fluid hand-speed control—the same cartridge reads differently
          when velocity mismatches cycle rate.
        </p>
        <p className="legal-page__note">
          This article is educational technical guidance; clinical judgment remains the artist&apos;s
          responsibility.
        </p>
      </section>

      <BlogTechnicalContext />

      <BlogArticleFooter />
    </article>
  );
}
