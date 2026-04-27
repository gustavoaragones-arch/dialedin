import type { Metadata } from "next";
import Link from "next/link";
import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";

const pageUrl = "https://dialedin.ink/blog/needle-hang-depth";

export const metadata: Metadata = {
  title: "Mastering Needle Hang: The Secret to Visibility and Precision",
  description:
    "Mastering the relationship between machine Hertz (CPS) and hand speed for perfect stitch density.",
  keywords: [
    "tattoo needle hang length",
    "riding the tube vs hanging the needle",
    "tattoo needle depth guide",
    "fine line needle protrusion",
  ],
  authors: [{ name: "DialedIn Team" }],
  publisher: "DialedIn.ink",
  alternates: { canonical: "/blog/needle-hang-depth" },
};

export default function NeedleHangDepthPage() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${pageUrl}#techarticle`,
    headline: "The Depth Equation: Mastering Needle Hang and Protrusion",
    url: pageUrl,
    description:
      "Technical guide to needle hang length, visibility control, ink wicking behavior, and depth discipline for fine line and realism.",
    author: { "@type": "Organization", name: "DialedIn Team" },
    publisher: {
      "@type": "Organization",
      name: "DialedIn.ink",
      url: "https://dialedin.ink",
    },
    keywords: [
      "tattoo needle hang length",
      "riding the tube vs hanging the needle",
      "tattoo needle depth guide",
      "fine line needle protrusion",
    ],
  };

  return (
    <article className="science-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <header className="science-page__header">
        <p className="science-page__eyebrow">
          <Link href="/blog">← Blog</Link>
        </p>
        <h1 className="science-page__title">
          The Depth Equation: Mastering Needle Hang and Protrusion
        </h1>
        <p className="science-page__lede">
          The final mechanical variable is not on your power supply. Needle hang determines what you
          can see, what depth you can control, and how cleanly ink moves to skin.
        </p>
      </header>

      <section className="blog-tech-summary" aria-labelledby="technical-summary-heading">
        <h2 id="technical-summary-heading" className="blog-tech-summary__title">
          Technical Summary
        </h2>
        <ul className="blog-tech-summary__list">
          <li>Short hang adds safety and depth control but reduces visual clarity.</li>
          <li>Long hang improves visibility but demands higher hand precision.</li>
          <li>Hang depth must match style intent and the taxonomy technical focus.</li>
        </ul>
      </section>

      <section className="science-section">
        <h2>Precision beyond the volts</h2>
        <p>
          Needle hang is the physical distance between tip and cartridge tube. It directly changes
          your visual feedback loop and depth control strategy. This is central to any reliable{" "}
          <strong>tattoo needle depth guide</strong>.
        </p>
      </section>

      <section className="science-section">
        <h2>Riding the tube (short hang)</h2>
        <p>
          With short hang, the needle barely peeks out and the tube stays close to skin. This creates
          a practical depth stop and protects against accidental over-depth.
        </p>
        <ul>
          <li>
            <strong>Pros:</strong> built-in safety, stable contact, and easier depth discipline for
            developing hands.
          </li>
          <li>
            <strong>Cons:</strong> more ink puddling and reduced point visibility in detail zones.
          </li>
        </ul>
      </section>

      <section className="science-section">
        <h2>Hanging the needle (long hang)</h2>
        <p>
          Long hang (often around 2-3 mm) creates air space so you can see the point touch skin. This
          supports precision-driven passes and is common when visibility is critical.
        </p>
        <p>
          In style mapping, this is where the Supabase taxonomy <code>technical_focus</code> column
          matters. If the focus emphasizes micro-realism detail or fine-line edge control, artists
          often favor greater visibility and tighter depth discipline rather than tube-riding contact.
        </p>
        <blockquote>
          <p>
            <strong>Disciplined mentor:</strong> Long hang is not an aesthetic choice. It is a
            precision contract. If your depth control is inconsistent, shorten hang before increasing
            speed.
          </p>
        </blockquote>
      </section>

      <section className="science-section">
        <h2>The depth equation in practice</h2>
        <p>
          The real comparison in <strong>riding the tube vs hanging the needle</strong> is control
          model versus visibility model. Choose the model that matches piece demand and hand stability.
        </p>
        <p>
          Proper <strong>tattoo needle hang length</strong> also affects ink flow. Too long and wick
          behavior drops; too short and over-saturation risk rises. This is why{" "}
          <strong>fine line needle protrusion</strong> settings should be deliberate, not copied.
        </p>
      </section>

      <BlogTechnicalContext title="Open the Setup Engine" primaryLabel="Open the Setup Engine" />

      <footer className="science-section">
        <p className="legal-page__note">
          Published by DialedIn.ink, an Albor Digital LLC project. Technical guidance is
          educational; clinical decisions remain the artist&apos;s responsibility.
        </p>
      </footer>
    </article>
  );
}
