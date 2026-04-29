import { BlogArticleFooter } from "@/components/blog/BlogArticleFooter";
import { NeedleGeometryEsArticle } from "@/components/blog/es/NeedleGeometryEs";
import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { blogPostMetadata } from "@/lib/blogSeo";
import { outwardPath } from "@/lib/routePathnames";
import { SITE_URL } from "@/lib/seoSite";
import { getTranslations, setRequestLocale } from "next-intl/server";

const NEEDLE_GEOMETRY_KEYWORDS = [
  "Difference between #10 and #12 needles",
  "long taper vs short taper tattoo",
  "needle gauge ink flow",
  "tattoo needle taper",
  "bugpin tattoo needles",
] as const;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  return blogPostMetadata(params, {
    metaKey: "blogNeedleGeometry",
    path: "/blog/needle-geometry",
    keywords: [...NEEDLE_GEOMETRY_KEYWORDS],
  });
}

export default async function NeedleGeometryPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const headline = tMeta("blogNeedleGeometry.title");
  const description = tMeta("blogNeedleGeometry.description");
  const pageUrl = `${SITE_URL}/${locale}${outwardPath(locale, "/blog/needle-geometry")}`;
  const tNav = await getTranslations({ locale, namespace: "blogNav" });

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        headline,
        url: pageUrl,
        description,
        author: {
          "@type": "Organization",
          name: "DialedIn Team",
        },
        publisher: {
          "@type": "Organization",
          name: "DialedIn.ink",
          url: "https://dialedin.ink",
        },
        keywords: [
          "Difference between #10 and #12 needles",
          "long taper vs short taper tattoo",
          "needle gauge ink flow",
        ],
      },
      {
        "@type": "TechArticle",
        "@id": `${pageUrl}#techarticle`,
        headline,
        description,
        author: { "@type": "Organization", name: "DialedIn Team" },
        publisher: {
          "@type": "Organization",
          name: "DialedIn.ink",
          url: "https://dialedin.ink",
        },
        proficiencyLevel: "Expert",
      },
      {
        "@type": "HowTo",
        "@id": `${pageUrl}#howto`,
        name: "How to Match Tattoo Needle Gauge and Taper to Your Piece",
        description:
          "Select gauge and taper from artistic intent so footprint, ink flow, and skin trauma stay aligned.",
        step: [
          {
            "@type": "HowToStep",
            text: "Name the artistic goal (e.g., fine line vs bold traditional) to set acceptable trauma and saturation targets.",
          },
          {
            "@type": "HowToStep",
            text: "Choose gauge: #12 for bolder footprint and ink load, #10 bugpin for tighter grouping and controlled grey-wash, #08 only when ultra-fine work and slower hand speed are intentional.",
          },
          {
            "@type": "HowToStep",
            text: "Choose taper: short taper for decisive saturation and punch; long taper for gradual entry and layered gradients without chewing the surface.",
          },
        ],
      },
    ],
  };

  if (locale === "es") {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
        <NeedleGeometryEsArticle headline={headline} backBlog={tNav("backBlog")} />
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
          Two cartridges labeled the same can behave like different tools. The
          silent variables are gauge and taper—and they govern trauma, ink flow,
          and how forgiving the skin will be.
        </p>
      </header>

      <section className="science-section">
        <h2>Why one &quot;3RL&quot; isn&apos;t like the other</h2>
        <p>
          You buy a 03RL from two different brands. One feels like a surgical
          scalpel; the other feels like a dull nail. The difference is not only
          quality—it is geometry. To master your craft, you must understand the
          two silent variables: gauge and taper.
        </p>
      </section>

      <section className="science-section">
        <h2>The gauge (diameter)</h2>
        <p>
          The number on the box (#08, #10, #12) refers to the thickness of each
          individual needle in the grouping. That diameter sets how much steel
          meets the skin per pass and how much ink the needle can carry before
          friction and capillary action take over—this is the core of{" "}
          <strong>needle gauge ink flow</strong> thinking.
        </p>
        <ul>
          <li>
            <strong>#12 (0.35&nbsp;mm):</strong> The standard. It carries more
            ink and creates a bolder footprint. Suited to American Traditional
            and heavy packing where saturation and authority matter.
          </li>
          <li>
            <strong>#10 (0.30&nbsp;mm):</strong> Bugpin. Thinner wires mean a
            tighter grouping for a given label. This is often the working range
            for smooth black and grey realism when you need control without a
            brutish entry.
          </li>
          <li>
            <strong>#08 (0.25&nbsp;mm):</strong> Ultra-fine. Minimal trauma per
            wire, but the channel is narrow—<strong>needle gauge ink flow</strong>{" "}
            is lower, so a slower, more deliberate hand speed keeps pigment where
            you intend it.
          </li>
        </ul>
        <blockquote>
          <p>
            <strong>Disciplined mentor:</strong> When you change gauge, you are
            changing both trauma profile and how much ink the grouping can
            deliver per cycle. Re-tune voltage and hand speed together, not one
            at a time.
          </p>
        </blockquote>
        <p>
          Needle force at the skin is not only diameter and taper:{" "}
          <Link className="dialed__link" href="/blog/stroke-physics">
            needle penetration is heavily influenced by your machine&apos;s stroke
            length
          </Link>
          . For throw, pivot, and voltage trade-offs, see{" "}
          <Link className="dialed__link" href="/blog/stroke-physics">
            understanding tattoo machine stroke physics
          </Link>
          .
        </p>
        <p>
          The practical <strong>difference between #10 and #12 needles</strong>{" "}
          is not snobbery: #12 hits harder and carries more; #10 asks for
          precision in pressure and angle because the same nominal grouping is
          physically finer.
        </p>
      </section>

      <section className="science-section">
        <h2>The taper (the point)</h2>
        <p>
          Taper is the length of the needle&apos;s point before it reaches full
          shank diameter. <strong>Long taper vs short taper tattoo</strong>{" "}
          work is not cosmetic—it changes how the tip opens the skin and how
          quickly the full column of ink meets resistance.
        </p>
        <ul>
          <li>
            <strong>Short taper:</strong> Hits with more punch. It opens a
            larger channel quickly—excellent for solid color and situations
            where you need decisive saturation.
          </li>
          <li>
            <strong>Long taper:</strong> The point is more gradual. It enters
            with less abrupt resistance, which helps you layer gradients without
            chewing the surface when your technique is soft and repetitive.
          </li>
        </ul>
        <blockquote>
          <p>
            <strong>Disciplined mentor:</strong> Match taper to the job: short
            for authority and pack; long for finesse and layered passes. If
            the skin looks pebbled after soft work, taper and hand speed are the
            first suspects—not only voltage.
          </p>
        </blockquote>
      </section>

      <section className="science-section">
        <h2>The disciplined setup</h2>
        <p>
          For fine line work, a #10 long taper is a primary reference tool: the
          tight footprint of bugpin gauge with a gentler entry from long taper.
          It is not the only valid choice, but it is a disciplined default when
          you want precision without an aggressive hole geometry.
        </p>
        <blockquote>
          <p>
            <strong>Disciplined mentor:</strong> Name your gauge and taper
            before you chase machine settings. If those are wrong for the piece,
            no amount of voltage fixes the physics.
          </p>
        </blockquote>
      </section>

      <section className="science-section">
        <h2>Next: method at the machine</h2>
        <p>
          Geometry sets what the skin receives; your machine translates intent
          into force and frequency. Read{" "}
          <Link className="dialed__link" href="/how-it-works">
            how DialedIn turns style, stroke, and voltage into one accountable
            roadmap
          </Link>
          , then open the{" "}
          <Link className="dialed__link" href="/">
            tattoo machine setup engine
          </Link>{" "}
          to align your station with the same standards.
        </p>
      </section>

      <BlogTechnicalContext />

      <BlogArticleFooter />
    </article>
  );
}
