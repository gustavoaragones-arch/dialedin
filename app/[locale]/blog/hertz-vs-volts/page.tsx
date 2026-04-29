import { BlogArticleFooter } from "@/components/blog/BlogArticleFooter";
import { HertzVsVoltsEsArticle } from "@/components/blog/es/HertzVsVoltsEs";
import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { blogPostMetadata } from "@/lib/blogSeo";
import { outwardPath } from "@/lib/routePathnames";
import { SITE_URL } from "@/lib/seoSite";
import { getTranslations, setRequestLocale } from "next-intl/server";

const HERTZ_KEYWORDS = [
  "Tattoo machine hertz to volts",
  "ACUS M1 frequency settings",
  "tattoo machine CPS explained",
  "rotary tattoo physics",
] as const;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  return blogPostMetadata(params, {
    metaKey: "blogHertzVsVolts",
    path: "/blog/hertz-vs-volts",
    keywords: [...HERTZ_KEYWORDS],
  });
}

export default async function HertzVsVoltsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const headline = tMeta("blogHertzVsVolts.title");
  const description = tMeta("blogHertzVsVolts.description");
  const pageUrl = `${SITE_URL}/${locale}${outwardPath(locale, "/blog/hertz-vs-volts")}`;
  const tNav = await getTranslations({ locale, namespace: "blogNav" });

  const blogJsonLd = {
    "@context": "https://schema.org",
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
      "Tattoo machine hertz to volts",
      "ACUS M1 frequency settings",
      "tattoo machine CPS explained",
      "rotary tattoo physics",
    ],
  };

  if (locale === "es") {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
        <HertzVsVoltsEsArticle headline={headline} backBlog={tNav("backBlog")} />
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
        <h1 className="science-page__title">Hertz vs. Volts</h1>
        <p className="science-page__lede">The Frequency Truth</p>
      </header>

      <section className="science-section">
        <h2>The Display Dilemma</h2>
        <p>
          If you grew up using a standard rotary or a coil machine, you think
          in Volts. You know that 8.5V &quot;feels&quot; right for your liner.
          But then you see an artist using an ACUS M1 or a Cheyenne SOL Nova,
          and their screen says 110 Hz.
        </p>
        <p>
          Are they tattooing at 110 Volts? (Definitely not). Are they using a
          secret language? (Sort of).
        </p>
        <p>
          At DialedIn.ink, we believe that understanding the difference between
          electrical potential and physical frequency is the "Level Up" every
          apprentice needs.
        </p>
      </section>

      <section className="science-section">
        <h2>Volts: The &quot;Gas Pedal&quot;</h2>
        <p>
          Voltage is electrical pressure. Think of it like the gas pedal in a
          car. When you push the pedal (increase Volts), you are telling the
          motor to spin faster. However, every car (machine) responds
          differently to that pedal.
        </p>
        <ul>
          <li>
            A lightweight Tier 2 rotary might hit 100 cycles per second at 8V.
          </li>
          <li>
            A heavy-duty Tier 1 machine might only hit 80 cycles per second at
            that same 8V.
          </li>
        </ul>
        <p>
          Voltage is what you give the machine; it isn&apos;t necessarily what the
          needle does.
        </p>
      </section>

      <section className="science-section">
        <h2>Hertz (Hz) &amp; CPS: The Speedometer</h2>
        <p>
          Hertz is a measurement of frequency—how many times something happens
          per second. In tattooing, 1 Hz = 1 Cycle Per Second (CPS).
        </p>
        <p>
          When a high-end German machine like the ACUS M1 shows "130 Hz," it
          is telling you exactly how many times the needle is reciprocating
          every second. This is far more precise than Volts because it describes
          the physical reality of the needle hitting the skin, regardless of the
          power supply brand.
        </p>
      </section>

      <section className="science-section">
        <h2>Why the Sync Matters</h2>
        <p>
          If you are moving your hand at a "Fast-Moderate" pace but your machine
          is only running at 70 Hz (CPS), you will get "pixelated" lines because
          the needle isn&apos;t hitting often enough to fill the gap. To fix this,
          you don&apos;t just "turn up the heat"—you need to sync your Cycles Per
          Second to your Hand Velocity.
        </p>
      </section>

      <section className="science-section">
        <h2>The DialedIn Translation</h2>
        <p>
          Most apprentices don&apos;t have a machine that displays Hertz. You have a
          standard power supply that shows Volts. This creates a "blind spot"
          in your technical setup.
        </p>
        <p>
          The DialedIn Engine was built to solve this. When you select your
          machine style and hardware in our tool, we use known motor constants
          to translate that Voltage into a Derived CPS.
        </p>
        <ul>
          <li>We show you the Voltage (what to set on your box).</li>
          <li>We show you the CPS (what your needle is actually doing).</li>
        </ul>
      </section>

      <section className="science-section">
        <h2>Master the Physics</h2>
        <p>
          Stop treating your machine like a black box. Whether you&apos;re using a
          budget-friendly Mast Archer or a pro-standard Cheyenne, the goal is
          the same: Total Control.
        </p>
        <p>
          <strong>Find Your Frequency:</strong> Ready to see what your current
          voltage actually means in physical hits? Use the{" "}
          <Link className="dialed__link" href="/">
            DialedIn.ink Setup Engine
          </Link>{" "}
          to bridge the gap between Volts and the Frequency Truth.
        </p>
      </section>

      <BlogTechnicalContext />

      <BlogArticleFooter />
    </article>
  );
}
