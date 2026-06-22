import { BlogArticleFooter } from "@/components/blog/BlogArticleFooter";
import { CartridgeDragEsArticle } from "@/components/blog/es/CartridgeDragEs";
import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { blogPostMetadata } from "@/lib/blogSeo";
import { outwardPath } from "@/lib/routePathnames";
import { SITE_URL } from "@/lib/seoSite";
import { getTranslations, setRequestLocale } from "next-intl/server";

const CARTRIDGE_DRAG_KEYWORDS = [
  "tattoo cartridge membrane tension",
  "skin stretching techniques",
  "needle drag in tattooing",
  "how to reduce skin trauma",
] as const;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  return blogPostMetadata(params, {
    metaKey: "blogCartridgeDrag",
    path: "/blog/cartridge-drag",
    keywords: [...CARTRIDGE_DRAG_KEYWORDS],
  });
}

export default async function CartridgeDragPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const headline = tMeta("blogCartridgeDrag.title");
  const description = tMeta("blogCartridgeDrag.description");
  const pageUrl = `${SITE_URL}/${locale}${outwardPath(locale, "/blog/cartridge-drag")}`;
  const tNav = await getTranslations({ locale, namespace: "blogNav" });

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${pageUrl}#techarticle`,
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
      "tattoo cartridge membrane tension",
      "skin stretching techniques",
      "needle drag in tattooing",
      "how to reduce skin trauma",
    ],
  };

  if (locale === "es") {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
        <CartridgeDragEsArticle headline={headline} backBlog={tNav("backBlog")} />
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
          Clean settings do not guarantee clean work. If membrane drag is high or your stretch
          collapses, energy is wasted before the needle can do disciplined work.
        </p>
      </header>

      <section className="blog-tech-summary" aria-labelledby="technical-summary-heading">
        <h2 id="technical-summary-heading" className="blog-tech-summary__title">
          Technical Summary
        </h2>
        <ul className="blog-tech-summary__list">
          <li>Membrane tension can steal torque and lower effective hit.</li>
          <li>Skin tension controls whether force becomes penetration or vibration.</li>
          <li>Fix stretch first, then compensate voltage in measured increments.</li>
        </ul>
      </section>

      <section className="science-section">
        <h2>Why logic isn&apos;t enough</h2>
        <p>
          You can have the perfect voltage and the perfect machine, but if your stretch is weak or
          your cartridge is fighting you, the result is trauma. This is the bio-mechanical side of
          DialedIn logic.
        </p>
      </section>

      <section className="science-section">
        <h2>The invisible resistance (membrane tension)</h2>
        <p>
          Every cartridge uses a safety membrane. Some are stiff; some are soft. A stiff membrane
          forces the motor to spend more energy just getting the needle moving. That resistance is
          why <strong>tattoo cartridge membrane tension</strong> matters in real stations, not just
          in spec sheets.
        </p>
        <p>
          The technical impact is simple: torque is being taxed before useful work reaches the skin.
          If you run safety-heavy brands, you may need a small bump of about +0.2V to +0.3V
          compared to a looser cartridge to achieve a similar effective hit.
        </p>
        <blockquote>
          <p>
            <strong>Disciplined mentor:</strong> Compensate in small steps. A measured +0.2V with
            stable depth is discipline; random voltage jumps are guesswork.
          </p>
        </blockquote>
        <p>
          For a full tier comparison of benchmark rigs versus workhorse gear, read{" "}
          <Link className="dialed__link" href="/blog/hardware-tiers">
            Tattoo Hardware: Tier 1 vs Tier 2 Gear
          </Link>
          .
        </p>
      </section>

      <section className="science-section">
        <h2>The three-point stretch</h2>
        <p>
          Skin is your second machine. Loose skin absorbs impact like a sponge, converting needle
          energy into vibration instead of saturation. That is how you end up passing the same line
          three times and creating avoidable trauma.
        </p>
        <p>
          Build a drum-tight three-point tension zone with your stretching hand and your tattooing
          hand pinky. This keeps entry consistent and reduces <strong>needle drag in tattooing</strong>.
        </p>
        <p>
          Stretch quality interacts with geometry too: when you change <strong>needle diameter</strong>,
          revisit your tension discipline. For that baseline, use the{" "}
          <Link className="dialed__link" href="/blog/needle-geometry">
            tattoo needle gauge guide
          </Link>
          .
        </p>
        <blockquote>
          <p>
            <strong>Disciplined mentor:</strong> If skin starts to bounce, do not chase volts first.
            Rebuild your stretch, then reassess machine output.
          </p>
        </blockquote>
      </section>

      <section className="science-section">
        <h2>Mastering the surface</h2>
        <p>
          True <strong>skin stretching techniques</strong> are not optional for clean saturation. A
          stable surface means the machine can work inside its power band instead of fighting
          moving tissue.
        </p>
        <p>
          If your goal is <strong>how to reduce skin trauma</strong>, treat drag and stretch as
          first-order setup variables, not afterthoughts.
        </p>
      </section>

      <BlogTechnicalContext title="Open the Setup Engine" primaryLabel="Open the Setup Engine" />

      <BlogArticleFooter />
    </article>
  );
}
