import { BlogArticleFooter } from "@/components/blog/BlogArticleFooter";
import { MembraneTaxEsArticle } from "@/components/blog/es/MembraneTaxEs";
import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";
import { blogPostMetadata } from "@/lib/blogSeo";
import { outwardPath } from "@/lib/routePathnames";
import { SITE_URL } from "@/lib/seoSite";
import { getTranslations, setRequestLocale } from "next-intl/server";

const MEMBRANE_TAX_KEYWORDS = [
  "Tattoo machine stalling",
  "Dragonhawk Mast voltage",
  "cartridge membrane tension",
  "rotary tattoo machine torque",
] as const;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  return blogPostMetadata(params, {
    metaKey: "blogMembraneTax",
    path: "/blog/the-membrane-tax",
    keywords: [...MEMBRANE_TAX_KEYWORDS],
  });
}

export default async function TheMembraneTaxPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const headline = tMeta("blogMembraneTax.title");
  const description = tMeta("blogMembraneTax.description");
  const pageUrl = `${SITE_URL}/${locale}${outwardPath(locale, "/blog/the-membrane-tax")}`;
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
      name: "tattoomachinesetup.com",
      url: "https://tattoomachinesetup.com",
    },
    keywords: [
      "Tattoo machine stalling",
      "Dragonhawk Mast voltage",
      "cartridge membrane tension",
      "rotary tattoo machine torque",
    ],
  };

  if (locale === "es") {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
        <MembraneTaxEsArticle headline={headline} backBlog={tNav("backBlog")} />
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
        <h1 className="science-page__title">The Membrane Tax</h1>
        <p className="science-page__lede">Why "Perfect" Settings Often Fail Apprentices</p>
      </header>

      <section className="science-section">
        <p>
          You&apos;ve watched the seminars. You&apos;ve seen the pro artists
          setting their $1,300 machines to 7.2V for smooth realism shading. You
          copy the settings on your entry-level rotary, but instead of buttery
          gradients, your machine snags, stalls, or &quot;chews&quot; the skin.
        </p>
        <p>
          The problem isn&apos;t necessarily your hand speed or your motor—it&apos;s
          the Membrane Tax.
        </p>
      </section>

      <section className="science-section">
        <h2>The Hidden Resistance</h2>
        <p>
          Every modern safety cartridge contains a membrane (usually silicone or
          rubber). Its primary job is to prevent backflow, but its secondary
          effect is mechanical resistance. The motor must fight this membrane
          just to push the needle out of the tube.
        </p>
        <p>In the world of hardware, there are two types of tension:</p>
        <ul>
          <li>
            <strong>Premium Tension (Tier 1):</strong> Brands like Cheyenne or
            Kwadron use highly calibrated, soft-tension silicone. It takes very
            little "torque" to overcome.
          </li>
          <li>
            <strong>Budget Tension (Tier 2):</strong> Affordable cartridges often
            use stiffer rubber. They are safe, but they "steal" power from your
            machine.
          </li>
        </ul>
      </section>

      <section className="science-section">
        <h2>Calculating the Tax</h2>
        <p>
          If you are using a budget cartridge on a Tier 2 machine (like a Mast
          Archer or Dragonhawk), you are paying a heavy tax. A stiff membrane
          can absorb 0.4V to 0.8V of your supply.
        </p>
        <p>
          If the pro setting is 7.5V, but your cartridge has high tension, your
          needle is effectively hitting with the force of 6.8V. This is why your
          machine snags: the motor is struggling to complete the cycle against
          the rubber&apos;s pull.
        </p>
      </section>

      <section className="science-section">
        <h2>How to Compensate</h2>
        <p>
          To produce professional results on a resourceful budget, you have to
          &quot;nudge&quot; your power up to cover the tax.
        </p>
        <p>
          <strong>The Rule of Thumb:</strong> If you switch from premium to budget
          cartridges, increase your baseline by +0.3V to +0.5V to maintain the
          same needle frequency (CPS).
        </p>
      </section>

      <section className="science-section">
        <h2>The Disciplined Approach</h2>
        <p>
          Mastering your craft means understanding the physics of your tools.
          Don&apos;t blame your skill for a mechanical desync.
        </p>
        <p>
          <strong>Sync Your Setup:</strong> Not sure if you&apos;re paying the tax?
          Use the <Link className="dialed__link" href="/">tattoomachinesetup.com Logic Engine</Link>{" "}
          to select your specific machine and technique. Our engine calculates
          these offsets for you, giving you a &quot;Sweat Spot&quot; that accounts
          for your hardware tier.
        </p>
      </section>

      <BlogTechnicalContext />

      <BlogArticleFooter />
    </article>
  );
}
