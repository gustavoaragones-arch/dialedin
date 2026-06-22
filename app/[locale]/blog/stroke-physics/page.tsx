import { BlogArticleFooter } from "@/components/blog/BlogArticleFooter";
import { StrokePhysicsEsArticle } from "@/components/blog/es/StrokePhysicsEs";
import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { blogPostMetadata } from "@/lib/blogSeo";
import { outwardPath } from "@/lib/routePathnames";
import { SITE_URL } from "@/lib/seoSite";
import { getTranslations, setRequestLocale } from "next-intl/server";

const STROKE_PHYSICS_KEYWORDS = [
  "best stroke for soft shading",
  "4.2mm stroke vs 3.5mm stroke",
  "rotary machine stroke guide",
  "tattoo machine stroke length",
  "long stroke rotary tattoo",
] as const;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  return blogPostMetadata(params, {
    metaKey: "blogStrokePhysics",
    path: "/blog/stroke-physics",
    keywords: [...STROKE_PHYSICS_KEYWORDS],
  });
}

export default async function StrokePhysicsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const headline = tMeta("blogStrokePhysics.title");
  const description = tMeta("blogStrokePhysics.description");
  const pageUrl = `${SITE_URL}/${locale}${outwardPath(locale, "/blog/stroke-physics")}`;
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
          name: "tattoomachinesetup.com",
          url: "https://tattoomachinesetup.com",
        },
        keywords: [
          "best stroke for soft shading",
          "4.2mm stroke vs 3.5mm stroke",
          "rotary machine stroke guide",
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
          name: "tattoomachinesetup.com",
          url: "https://tattoomachinesetup.com",
        },
        proficiencyLevel: "Expert",
      },
      {
        "@type": "HowTo",
        "@id": `${pageUrl}#howto`,
        name: "How to Calibrate Tattoo Voltage for Stroke Length",
        description:
          "A guide to using the 3.5mm pivot to adapt tattoo machine power settings.",
        step: [
          {
            "@type": "HowToStep",
            text: "Identify your machine stroke length (e.g., 4.2mm).",
          },
          {
            "@type": "HowToStep",
            text: "Determine the style baseline (e.g., Realism requires 3.0mm).",
          },
          {
            "@type": "HowToStep",
            text: "Apply the -0.5V modifier for every 0.5mm over the 3.5mm pivot.",
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
        <StrokePhysicsEsArticle headline={headline} backBlog={tNav("backBlog")} />
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
          Force versus frequency: the dial on your supply is only half the
          story. Stroke length decides how much mechanical punch each cycle
          carries into the skin.
        </p>
      </header>

      <section className="science-section">
        <h2>Force versus frequency</h2>
        <p>
          Apprentices often ask: &quot;What voltage should I use?&quot; That
          question is incomplete. The better framing is:{" "}
          <strong>
            how much force is my machine applying at this frequency?
          </strong>{" "}
          That force is governed by stroke length, grip geometry, needle hang,
          and load—not by the number on the screen alone.
        </p>
        <blockquote>
          <p>
            <strong>Disciplined mentor:</strong> When you change stroke, you
            change impact depth at the same voltage. Re-read your technique
            before you chase a volt number you saw on a different machine.
          </p>
        </blockquote>
      </section>

      <section className="science-section">
        <h2>The 3.5mm mechanical zero</h2>
        <p>
          In modern rotary practice, <strong>3.5&nbsp;mm</strong> is a versatile
          baseline: enough throw to pull a clean line with authority, enough
          control to blend shadow without treating the skin like a punching bag.
          When you move away from that neighborhood, the physics of your setup
          change—so <strong>4.2mm stroke vs 3.5mm stroke</strong> is not a small
          preference; it is a different impact class.
        </p>
        <p>
          A <strong>rotary machine stroke guide</strong> that ignores this pivot
          will mislead you: the same voltage on a longer throw is not the same
          tattoo.
        </p>
      </section>

      <section className="science-section">
        <h2>The hammer effect (4.0mm–4.2mm)</h2>
        <p>
          A long stroke carries more momentum. The needle spends more of the
          cycle in a deep throw and hits the skin with greater peak force. That
          is an asset for bold packing and certain liner work; it is a liability
          when the technique calls for soft, layered passes.
        </p>
        <ul>
          <li>
            <strong>Risk:</strong> Running a 4.2&nbsp;mm stroke at high voltage
            for soft shading invites overshoot, unstable gradients, and
            long-term texture issues. This is why{" "}
            <strong>best stroke for soft shading</strong> discussions usually
            steer toward moderate throw—or toward lower voltage when long throw
            is non-negotiable.
          </li>
          <li>
            <strong>Adjustment:</strong> If you must use a long-stroke machine
            for soft work, lower voltage and let hand speed and needle depth do
            their share. You are trading raw speed for controlled impact depth.
          </li>
        </ul>
        <p>
          Skin trauma and saturation are coupled to what actually enters the
          dermis:{" "}
          <Link className="dialed__link" href="/blog/needle-geometry">
            matching your stroke to the correct needle gauge is vital for
            saturation
          </Link>
          . Use the{" "}
          <Link className="dialed__link" href="/blog/needle-geometry">
            tattoo needle gauge guide
          </Link>{" "}
          to align taper, diameter, and grouping with your throw.
        </p>
        <blockquote>
          <p>
            <strong>Disciplined mentor:</strong> Long stroke is not
            &quot;more professional.&quot; It is more mechanical advantage. Use
            that advantage where the piece demands it, and refuse it where the
            skin needs finesse.
          </p>
        </blockquote>
      </section>

      <section className="science-section">
        <h2>The short-throw effect (2.5mm–3.0mm)</h2>
        <p>
          Short strokes cycle with less throw mass. They tend to feel quicker
          and lighter on entry—closer to painting the surface than driving a
          spike. That profile supports ultra-soft realism and delicate layering
          when your angles and hang are disciplined.
        </p>
        <ul>
          <li>
            <strong>Use case:</strong> Soft passes, watercolor-style layering,
            and situations where you want minimal residual trauma between passes.
          </li>
          <li>
            <strong>Limit:</strong> Demanding a bold 14RL line from a 2.5&nbsp;mm
            throw often ends in snag, stall, or overcompensation with voltage.
            The machine simply lacks the throw to open the channel your grouping
            expects.
          </li>
        </ul>
        <blockquote>
          <p>
            <strong>Disciplined mentor:</strong> Short stroke forgives less
            laziness in hang and pressure. If the line wavers, fix geometry and
            tension before you add volts.
          </p>
        </blockquote>
      </section>

      <section className="science-section">
        <h2>The DialedIn advantage</h2>
        <p>
          Adaptive stroke sync exists so you are not doing this math under
          pressure. When you tell the tool you are on a long throw for a soft
          discipline, it pulls recommended voltage into a safer band relative to
          that impact—skin protection first, bravado second.
        </p>
        <p>
          The full stack—style anchor, stroke modifier, hardware tiering—is
          laid out plainly on{" "}
          <Link className="dialed__link" href="/how-it-works">
            how DialedIn encodes stroke and voltage methodology
          </Link>
          . From there, move to the{" "}
          <Link className="dialed__link" href="/">
            tattoo machine setup engine
          </Link>{" "}
          and run your actual machine, stroke, and style together.
        </p>
      </section>

      <BlogTechnicalContext />

      <BlogArticleFooter />
    </article>
  );
}
