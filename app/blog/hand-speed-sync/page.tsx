import type { Metadata } from "next";
import Link from "next/link";
import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";

const pageUrl = "https://dialedin.ink/blog/hand-speed-sync";

export const metadata: Metadata = {
  title: "Mastering Needle Hang: The Secret to Visibility and Precision",
  description:
    "Mastering the relationship between machine Hertz (CPS) and hand speed for perfect stitch density.",
  keywords: [
    "tattoo machine CPS vs hand speed",
    "whip shading technique speed",
    "lining hand speed guide",
  ],
  authors: [{ name: "DialedIn Team" }],
  publisher: "DialedIn.ink",
  alternates: { canonical: "/blog/hand-speed-sync" },
};

export default function HandSpeedSyncPage() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${pageUrl}#techarticle`,
    headline: "The Hand Speed Variable: Why Hertz Is Only Half the Story",
    url: pageUrl,
    description:
      "Guide to tattoo machine CPS vs hand speed, stitch density, and practical speed control for lining and whip shading.",
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
      "tattoo machine CPS vs hand speed",
      "whip shading technique speed",
      "lining hand speed guide",
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
          The Hand Speed Variable: Why Hertz Is Only Half the Story
        </h1>
        <p className="science-page__lede">
          Machine frequency is only one side of line quality. Stitch density is the product of CPS
          and how far your hand travels between hits.
        </p>
      </header>

      <section className="blog-tech-summary" aria-labelledby="technical-summary-heading">
        <h2 id="technical-summary-heading" className="blog-tech-summary__title">
          Technical Summary
        </h2>
        <ul className="blog-tech-summary__list">
          <li>CPS is the machine constant; hand velocity is the moving variable.</li>
          <li>Slow hand + higher CPS closes stitch gaps for lining authority.</li>
          <li>Fast hand + moderate CPS opens spacing for controlled shading texture.</li>
        </ul>
      </section>

      <section className="science-section">
        <h2>The synchronization problem</h2>
        <p>
          A machine at 100 Hz strikes 100 times per second. If your hand travels about one inch
          per second, those hits stack into dense stitch coverage. Move three inches per second at
          the same CPS and spacing opens into a dotted line.
        </p>
        <p>
          This is the core of <strong>tattoo machine CPS vs hand speed</strong>: your machine can be
          correct on paper while your line is mechanically under-populated.
        </p>
      </section>

      <section className="science-section">
        <h2>Calculating your hand velocity</h2>
        <p>
          Your machine is relatively constant; your hand is the variable you can train with intent.
        </p>
        <ul>
          <li>
            <strong>For bold lining:</strong> slower hand speed with higher operating frequency
            (roughly 110-120 Hz) compresses hit spacing into a continuous wall of pigment.
          </li>
          <li>
            <strong>For whip shading:</strong> faster hand speed with lower frequency (roughly
            70-80 Hz) separates hits into textured gradients typical of{" "}
            <strong>whip shading technique speed</strong>.
          </li>
        </ul>
        <blockquote>
          <p>
            <strong>Disciplined mentor:</strong> Pick speed for the texture you need, then verify
            CPS supports that spacing. Do not let style decisions happen by accident.
          </p>
        </blockquote>
      </section>

      <section className="science-section">
        <h2>The stipple trap</h2>
        <p>
          Many beginners chase stippling by cranking voltage too low. The risk is snagging:
          inadequate force can compromise clean needle exit and create unstable passes.
        </p>
        <p>
          Keep the machine in a stable power band and create spacing with hand speed, not with
          unsafe under-driving. Force still governs reliable penetration, which is why{" "}
          <Link className="dialed__link" href="/blog/stroke-physics">
            understanding tattoo machine stroke physics
          </Link>{" "}
          is essential when deciding speed and density.
        </p>
        <blockquote>
          <p>
            <strong>Disciplined mentor:</strong> Realism is not about weak impact. It is about
            controlled depth, fast movement, and repeatable spacing.
          </p>
        </blockquote>
      </section>

      <section className="science-section">
        <h2>DialedIn in practice</h2>
        <p>
          The tool keeps CPS, voltage, and stroke inside a coherent band while you tune hand
          velocity to task. Use it as a <strong>lining hand speed guide</strong>, then validate in
          skin response and pass consistency.
        </p>
        <p>
          In the Supabase tattoo taxonomy, the <code>technical_focus</code> column is where each
          style records its priority constraint (for example, crisp line authority versus soft
          texture control). Needle hang should follow that focus: short hang supports control-heavy
          work, while longer protrusion supports visibility-heavy passes when hand discipline is high.
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
