import type { Metadata } from "next";
import Link from "next/link";

const pageUrl = "https://dialedin.ink/how-it-works";

const howItWorksJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "The Science of the Sweet Spot: Inside the DialedIn Engine",
      isPartOf: { "@type": "WebSite", name: "DialedIn.ink", url: "https://dialedin.ink" },
      description:
        "Technical manual for the DialedIn relational engine: style baselines from Supabase tattoo_taxonomy, adaptive stroke voltage around a 3.5mm pivot, and hardware-tier membrane compensation.",
    },
    {
      "@type": "TechArticle",
      "@id": `${pageUrl}#article`,
      headline: "The Science of the Sweet Spot: Inside the DialedIn Engine",
      author: { "@type": "Organization", name: "Albor Digital LLC" },
      publisher: { "@type": "Organization", name: "Albor Digital LLC" },
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      keywords: [
        "tattoo machine voltage for fine line",
        "how does tattoo machine stroke affect voltage",
        "convert tattoo hertz to volts",
        "tattoo machine stalling on budget cartridges",
        "best stroke for American Traditional",
        "tattoo_taxonomy",
        "adaptive voltage",
        "tattoo sweet spot",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What tattoo machine voltage works for fine line?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Fine line is a high-frequency, low-impact discipline. DialedIn reads your style baseline from the tattoo_taxonomy table (ideal CPS band and voltage window), then applies stroke and hardware-tier modifiers so you stay inside a safe, style-consistent band instead of guessing a single static volt number.",
          },
        },
        {
          "@type": "Question",
          name: "How does tattoo machine stroke affect voltage?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Longer stroke increases needle throw and impact depth at the same voltage. DialedIn uses a 3.5mm mechanical pivot: above that pivot, the engine lowers recommended voltage to reduce overshoot; below it, voltage can be nudged up so short-stroke machines still break skin tension predictably.",
          },
        },
        {
          "@type": "Question",
          name: "How do you convert tattoo hertz to volts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hertz (CPS) and volts are not interchangeable constants—they depend on motor, stroke, grip, and needle load. DialedIn frames the relationship as a coupled setup: taxonomy gives a target frequency band and voltage window; the tool syncs hand speed to CPS and shows a calibrated volt readout for your hardware class.",
          },
        },
        {
          "@type": "Question",
          name: "Why does a tattoo machine stall on budget cartridges?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Stiffer safety membranes add hydraulic resistance before the needle moves. DialedIn applies a small hardware-tier nudge (on the order of +0.3V to +0.5V for mid-tier setups) so the motor is less likely to bog during the pull.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best stroke for American Traditional?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Traditional packing favors confident saturation and bold passes. DialedIn treats style as the anchor: American Traditional sets a different baseline than fine line or soft shading. You still match stroke to the machine you actually run—the engine adapts voltage so effective force stays coherent.",
          },
        },
      ],
    },
  ],
} as const;

export const metadata: Metadata = {
  title: "The Science of the Sweet Spot: Inside the DialedIn Engine",
  description:
    "Technical manual: relational tattoo setup engine, Supabase tattoo_taxonomy baselines, 3.5mm adaptive stroke voltage, membrane-aware tier nudges. Answers fine-line voltage, stroke vs voltage, hertz-to-volts framing, cartridge stall, and traditional stroke questions.",
  keywords: [
    "tattoo machine voltage for fine line",
    "tattoo machine stroke affect voltage",
    "convert tattoo hertz to volts",
    "tattoo machine stalling budget cartridges",
    "best stroke American Traditional",
    "tattoo sweet spot",
    "tattoo_taxonomy",
    "adaptive voltage tattoo",
  ],
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "The Science of the Sweet Spot: Inside the DialedIn Engine",
    description:
      "Blueprint-style technical manual for DialedIn: style, stroke, voltage relational logic and adaptive compensation.",
    url: pageUrl,
    type: "article",
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howItWorksJsonLd),
        }}
      />
      <article className="blueprint-page" lang="en">
        <header className="blueprint-page__header">
          <p className="blueprint-page__crumb">
            <Link href="/">← Setup engine</Link>
            <span className="blueprint-page__crumb-sep" aria-hidden>
              /
            </span>
            <span className="blueprint-page__crumb-muted">DOC-ID: DIALEDIN-LOGIC</span>
          </p>
          <h1 className="blueprint-page__title">
            The Science of the Sweet Spot: Inside the DialedIn Engine
          </h1>
          <p className="blueprint-page__lede">
            Tattooing is a game of variables. Between your machine&apos;s stroke, your power
            supply&apos;s voltage, and the resistance of your cartridge membrane, there are
            dozens of ways to lose your &quot;Sweet Spot.&quot; DialedIn.ink was built to turn
            those variables into constants.
          </p>
        </header>

        <aside
          className="blueprint-page__spec-strip"
          aria-label="Technical architecture breadcrumbs"
        >
          <div className="blueprint-page__spec-item">
            <span className="blueprint-page__spec-label">DATA PLANE</span>
            <p>
              Style baselines, ideal stroke hints, and voltage windows load from the{" "}
              <code className="blueprint-page__code">tattoo_taxonomy</code> table in{" "}
              <strong>Supabase</strong> (PostgREST). Each row anchors CPS and volt bands to an
              artistic intent—not a generic calculator default.
            </p>
          </div>
          <div className="blueprint-page__spec-item">
            <span className="blueprint-page__spec-label">ADAPTIVE STROKE LOGIC</span>
            <p>
              After taxonomy supplies <code className="blueprint-page__code">volt_min</code> /{" "}
              <code className="blueprint-page__code">volt_max</code>, the engine applies a{" "}
              <strong>3.5&nbsp;mm pivot</strong> stroke modifier: longer throw reduces headroom;
              shorter throw can receive a compensating nudge. Bounds clamp into a safe operating
              band (see also{" "}
              <Link className="blueprint-page__inline-link" href="/science">
                scientific methodology
              </Link>
              ).
            </p>
          </div>
        </aside>

        <section className="blueprint-page__pillars" aria-labelledby="pillars-heading">
          <h2 id="pillars-heading" className="blueprint-page__visually-hidden">
            Engine pillars: style, stroke, voltage
          </h2>
          <div className="blueprint-page__pillar">
            <span className="blueprint-page__pillar-id">01 — STYLE</span>
            <h3 className="blueprint-page__pillar-title">The anchor</h3>
            <p>
              Fine line vs. American Traditional vs. soft shading changes the baseline needle
              frequency (CPS) and impact profile before any hardware slider moves.
            </p>
          </div>
          <div className="blueprint-page__pillar">
            <span className="blueprint-page__pillar-id">02 — STROKE</span>
            <h3 className="blueprint-page__pillar-title">The modifier</h3>
            <p>
              Stroke is physical throw length. A 4.2&nbsp;mm stroke at 8&nbsp;V hits harder than
              3.0&nbsp;mm at the same dial—so voltage cannot be read in isolation.
            </p>
          </div>
          <div className="blueprint-page__pillar">
            <span className="blueprint-page__pillar-id">03 — VOLTAGE</span>
            <h3 className="blueprint-page__pillar-title">The adaptive result</h3>
            <p>
              The engine shifts recommended voltage so effective force on skin stays coherent
              across mismatched machines and hand speeds.
            </p>
          </div>
        </section>

        <section className="blueprint-page__section" aria-labelledby="hierarchy-heading">
          <h2 id="hierarchy-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">01</span> The relational logic hierarchy
          </h2>
          <p>
            Most calculators are linear; they give you a number and stop. DialedIn uses a{" "}
            <strong>relational engine</strong> that analyzes how one setting affects the others.
          </p>
          <ul className="blueprint-page__list">
            <li>
              <strong>The Anchor (Style):</strong> Every setup starts with the artistic goal.
              Selecting &quot;Fine Line&quot; vs. &quot;American Traditional&quot; sets the
              baseline for your ideal needle frequency (CPS) and impact force—including how we
              think about{" "}
              <strong>tattoo machine voltage for fine line</strong> vs. bolder packing styles.
            </li>
            <li>
              <strong>The Modifier (Stroke):</strong> Your machine&apos;s stroke is the physical
              &quot;hammer&quot; length. We know a 4.2&nbsp;mm stroke at 8&nbsp;V hits significantly
              harder than a 3.0&nbsp;mm stroke—central to the question{" "}
              <strong>how does tattoo machine stroke affect voltage</strong> in real rigs, not
              on paper.
            </li>
            <li>
              <strong>The Adaptive Result:</strong> The engine automatically shifts your voltage
              to compensate for your hardware, keeping &quot;effective force&quot; on the skin more
              consistent when you change stroke or tier.
            </li>
          </ul>
        </section>

        <section className="blueprint-page__section" aria-labelledby="adaptive-heading">
          <h2 id="adaptive-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">02</span> Adaptive voltage logic (stroke
            modifier)
          </h2>
          <p>
            This is where DialedIn goes deeper than a static chart. We use{" "}
            <strong>3.5&nbsp;mm</strong> as the mechanical pivot point between &quot;short&quot;
            and &quot;long&quot; throw behavior.
          </p>
          <ul className="blueprint-page__list">
            <li>
              <strong>Long stroke compensation:</strong> If you use a 4.0&nbsp;mm+ power packer
              for soft shading, the engine lowers voltage to reduce overshoot—slowing the needle to
              match increased impact depth and helping avoid skin chewing.
            </li>
            <li>
              <strong>Short stroke boosting:</strong> If you run a 2.5&nbsp;mm-class soft shader
              for lining work, we nudge voltage up so the needle retains enough momentum to break
              skin tension reliably.
            </li>
          </ul>
          <p className="blueprint-page__note">
            For <strong>convert tattoo hertz to volts</strong> style questions: CPS (Hz) and
            volts are coupled through motor, stroke, and load. DialedIn does not pretend one magic
            formula fits every power supply; it frames a{" "}
            <Link className="blueprint-page__inline-link" href="/blog/hertz-vs-volts">
              hertz–volt readout
            </Link>{" "}
            inside a full machine context.
          </p>
        </section>

        <section className="blueprint-page__section" aria-labelledby="membrane-heading">
          <h2 id="membrane-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">03</span> The &quot;membrane tax&quot;
            calculation
          </h2>
          <p>
            Not all cartridges are created equal. Budget-tier cartridges often have stiffer safety
            membranes—one reason artists notice a{" "}
            <strong>tattoo machine stalling on budget cartridges</strong> when the motor fights
            membrane preload before meaningful needle motion.
          </p>
          <p>
            <strong>Logic:</strong> We factor in <strong>hardware tiers</strong>. On a Tier&nbsp;2
            class setup, the engine adds a small nudge (approximately +0.3&nbsp;V to +0.5&nbsp;V)
            to overcome internal rubber resistance so the motor is less likely to stall during the
            pull. Deep dive:{" "}
            <Link className="blueprint-page__inline-link" href="/blog/the-membrane-tax">
              The membrane tax
            </Link>
            .
          </p>
        </section>

        <section className="blueprint-page__section" aria-labelledby="advantages-heading">
          <h2 id="advantages-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">04</span> Advantages of a DialedIn setup
          </h2>
          <ul className="blueprint-page__list">
            <li>
              <strong>Minimal trauma:</strong> Syncing CPS to hand speed reduces dwell time and
              scatter from mismatched frequency and glide velocity.
            </li>
            <li>
              <strong>Predictable saturation:</strong> Fewer &quot;pixelated&quot; passes from
              fighting your own motor rhythm.
            </li>
            <li>
              <strong>Hardware agnostic:</strong> Entry-level rotaries and flagship grips obey the
              same sweet-spot physics—the engine stays relational so you are not locked to one
              brand story.
            </li>
          </ul>
          <p>
            Choosing the <strong>best stroke for American Traditional</strong> still depends on
            your machine catalog and hand—but once style is anchored, DialedIn keeps voltage and
            CPS guidance aligned so bold packing stays saturated without wandering into arbitrary
            max-volt guessing.
          </p>
        </section>

        <footer className="blueprint-page__footer">
          <p className="blueprint-page__footer-meta">
            ENGINE · RELATIONAL · STROKE-AWARE · TAXONOMY-BACKED
          </p>
        </footer>

        <Link href="/" className="blueprint-page__fab">
          Launch Setup Engine
        </Link>
      </article>
    </>
  );
}
