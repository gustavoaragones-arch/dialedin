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
      name: "The Science of the Sweet Spot | DialedIn",
      isPartOf: { "@type": "WebSite", name: "DialedIn.ink", url: "https://dialedin.ink" },
      description:
        "How DialedIn applies tattoo machine setup logic: style-first baselines, rotary machine stroke physics, voltage to CPS conversion, hardware-aware nudges, and safety guardrails for skin and motor.",
    },
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: "The Science of the Sweet Spot",
      author: { "@type": "Organization", name: "Albor Digital LLC" },
      publisher: { "@type": "Organization", name: "Albor Digital LLC" },
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      keywords: [
        "tattoo machine setup logic",
        "rotary machine stroke physics",
        "voltage to CPS conversion",
        "tattoo needle grouping guide",
        "fine line tattoo voltage",
        "skin trauma prevention",
        "tattoo machine sweet spot",
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
            text: "Fine line tattoo voltage should track a high-frequency, low-impact discipline—not a random dial number. DialedIn anchors your setup to a fine-line baseline (needle frequency and voltage window), then applies stroke and hardware adjustments so the suggestion stays coherent with how you actually work.",
          },
        },
        {
          "@type": "Question",
          name: "How does tattoo machine stroke affect voltage?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Rotary machine stroke physics change how hard the needle hits at the same voltage. DialedIn uses a 3.5mm standard pivot: longer throw tends to hit harder, so the engine lowers voltage to reduce overshoot on soft work; shorter throw can receive a careful nudge up so penetration stays reliable.",
          },
        },
        {
          "@type": "Question",
          name: "How do hertz (CPS) relate to volts on a tattoo machine?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Voltage to CPS conversion is not a single universal constant—it depends on motor, stroke, grip, and needle load. DialedIn treats frequency and voltage as one coupled setup: your style sets a target band, and the readout stays tied to the machine context in front of you.",
          },
        },
        {
          "@type": "Question",
          name: "Why does a tattoo machine feel like it stalls on some cartridges?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Budget cartridges often use stiffer membranes, which add resistance before the needle moves—sometimes called a membrane tax. DialedIn applies a small hardware-tier nudge so the motor is less likely to bog during the pull.",
          },
        },
        {
          "@type": "Question",
          name: "How does DialedIn help with needle grouping choices?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A tattoo needle grouping guide is only useful when it matches your style intent. DialedIn starts from the craft you selected—liner versus shader groupings and technique—so recommendations align with the saturation and line quality that style demands.",
          },
        },
      ],
    },
  ],
} as const;

export const metadata: Metadata = {
  title: "The Science of the Sweet Spot | DialedIn",
  description:
    "Disciplined craft: tattoo machine setup logic from style baselines, rotary machine stroke physics, and voltage to CPS conversion—with guardrails for fine line tattoo voltage, skin trauma prevention, and the tattoo machine sweet spot.",
  keywords: [
    "tattoo machine setup logic",
    "rotary machine stroke physics",
    "voltage to CPS conversion",
    "tattoo needle grouping guide",
    "fine line tattoo voltage",
    "skin trauma prevention",
    "tattoo machine sweet spot",
  ],
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "The Science of the Sweet Spot | DialedIn",
    description:
      "Precision is not an accident. How DialedIn turns machine physics into a calculated roadmap for accountable tattooing.",
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
      <article className="blueprint-page blueprint-page--craft" lang="en">
        <header className="blueprint-page__header">
          <p className="blueprint-page__crumb">
            <Link href="/">← Setup tool</Link>
            <span className="blueprint-page__crumb-sep" aria-hidden>
              /
            </span>
            <span className="blueprint-page__crumb-muted">Method</span>
          </p>
          <h1 className="blueprint-page__title">The Science of the Sweet Spot</h1>
          <p className="blueprint-page__lede blueprint-page__lede--hero">
            Precision is not an accident. DialedIn translates the physics of your machine into a
            calculated roadmap for your art.
          </p>
        </header>

        <section className="blueprint-page__flow" aria-labelledby="flow-heading">
          <h2 id="flow-heading" className="blueprint-page__flow-heading">
            From style to result
          </h2>
          <ol className="blueprint-page__flow-steps">
            <li className="blueprint-page__flow-step">
              <span className="blueprint-page__flow-num" aria-hidden>
                1
              </span>
              <div className="blueprint-page__flow-body">
                <h3 className="blueprint-page__flow-title">Style</h3>
                <p>
                  You name the craft—fine line, American Traditional, soft grey-wash. That choice
                  sets the baseline needle frequency (CPS) and voltage window, not a generic
                  default.
                </p>
              </div>
            </li>
            <li className="blueprint-page__flow-step">
              <span className="blueprint-page__flow-num" aria-hidden>
                2
              </span>
              <div className="blueprint-page__flow-body">
                <h3 className="blueprint-page__flow-title">Machine &amp; stroke</h3>
                <p>
                  Stroke length and cartridge tier change how power reaches the skin. The engine
                  syncs those variables to your hand so rotary machine stroke physics stay
                  accountable.
                </p>
              </div>
            </li>
            <li className="blueprint-page__flow-step">
              <span className="blueprint-page__flow-num" aria-hidden>
                3
              </span>
              <div className="blueprint-page__flow-body">
                <h3 className="blueprint-page__flow-title">Result</h3>
                <p>
                  You get a voltage-to-CPS readout inside a safe operating band—the tattoo machine
                  sweet spot—prioritizing skin health and motor longevity over reckless power.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <aside className="blueprint-page__spec-strip" aria-label="How the engine thinks">
          <div className="blueprint-page__spec-item">
            <span className="blueprint-page__spec-label">Style-first logic</span>
            <p>
              Every artistic intent has a technical baseline. We do not flatten everything into one
              chart. DialedIn uses a curated taxonomy where styles such as Fine Line or American
              Traditional anchor needle frequency (CPS) and voltage windows—so tattoo machine setup
              logic follows the standard of that discipline.
            </p>
          </div>
          <div className="blueprint-page__spec-item">
            <span className="blueprint-page__spec-label">Adaptive stroke sync</span>
            <p>
              Your machine&apos;s stroke is its physical punch. We treat about{" "}
              <strong>3.5&nbsp;mm</strong> as the pivot between a shorter throw and a long-stroke
              hammer (4.0&nbsp;mm and above). For soft work on a long throw, the engine lowers
              voltage to guard against skin trauma; on a short throw (around 2.5&nbsp;mm), it can
              raise power so you still achieve reliable penetration.
            </p>
          </div>
          <div className="blueprint-page__spec-item">
            <span className="blueprint-page__spec-label">Hardware tiering &amp; resistance</span>
            <p>
              Not all gear is equal. Budget cartridges often run stiffer membranes that steal power
              before the needle moves—the membrane tax. Hardware tiering adds a measured nudge so
              your motor is less likely to stall when the membrane fights back.
            </p>
          </div>
          <div className="blueprint-page__spec-item">
            <span className="blueprint-page__spec-label">Safety guardrails</span>
            <p>
              Technical accountability means every suggestion stays inside a safe operating range.
              Skin trauma prevention and respect for the motor come before chasing maximum volts.
              For the underlying research framing, see{" "}
              <Link className="blueprint-page__inline-link" href="/science">
                scientific methodology
              </Link>
              .
            </p>
          </div>
        </aside>

        <section className="blueprint-page__pillars" aria-labelledby="pillars-heading">
          <h2 id="pillars-heading" className="blueprint-page__visually-hidden">
            Three pillars of the calculation
          </h2>
          <div className="blueprint-page__pillar">
            <span className="blueprint-page__pillar-id">01 — ANCHOR</span>
            <h3 className="blueprint-page__pillar-title">Style-first baseline</h3>
            <p>
              Fine line, American Traditional, and soft shading do not share the same CPS and
              impact profile. The anchor is always the craft you selected—including how we think
              about fine line tattoo voltage versus bolder packing.
            </p>
          </div>
          <div className="blueprint-page__pillar">
            <span className="blueprint-page__pillar-id">02 — MODIFIER</span>
            <h3 className="blueprint-page__pillar-title">Stroke &amp; hand</h3>
            <p>
              Stroke is throw length in millimeters. The same dial on a 4.2&nbsp;mm machine hits
              harder than on a 3.0&nbsp;mm rig—so voltage is never read in isolation from rotary
              machine stroke physics.
            </p>
          </div>
          <div className="blueprint-page__pillar">
            <span className="blueprint-page__pillar-id">03 — OUTPUT</span>
            <h3 className="blueprint-page__pillar-title">Calibrated result</h3>
            <p>
              Recommended voltage shifts so effective force on the skin stays coherent when you
              change machine, stroke, or tier—aligned with a tattoo needle grouping guide that
              matches your technique.
            </p>
          </div>
        </section>

        <section className="blueprint-page__section" aria-labelledby="baseline-heading">
          <h2 id="baseline-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">01</span> Style-first baseline
          </h2>
          <p>
            We don&apos;t believe in one size fits all. DialedIn starts by looking at your artistic
            goal. Whether you are pulling bold lines or layering soft grey-wash, the engine sets a
            baseline frequency (CPS) that matches the industry standard for that specific craft.
          </p>
        </section>

        <section className="blueprint-page__section" aria-labelledby="stroke-mod-heading">
          <h2 id="stroke-mod-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">02</span> The stroke modifier (adaptive
            mode)
          </h2>
          <p>
            Your machine&apos;s stroke is its physical punch. A long-stroke machine (4.0&nbsp;mm
            and up) moves with more momentum. To prevent skin trauma, DialedIn automatically dials
            back your voltage when you use a long stroke for soft techniques. Conversely, if your
            stroke is short, we nudge the power up to ensure you get the penetration you need.
          </p>
        </section>

        <section className="blueprint-page__section" aria-labelledby="live-heading">
          <h2 id="live-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">03</span> Constant calculation
          </h2>
          <p>
            As you change your machine or your style, the engine recalculates in real time.
            It&apos;s like having a technical mentor at your station, ensuring your gear is always
            synced to your hand.
          </p>
          <p className="blueprint-page__note">
            On <strong>voltage to CPS conversion</strong>: frequency and volts are partners, not
            duplicates. DialedIn keeps them in one context—see also{" "}
            <Link className="blueprint-page__inline-link" href="/blog/hertz-vs-volts">
              hertz and volts on the machine
            </Link>
            .
          </p>
        </section>

        <section className="blueprint-page__section" aria-labelledby="membrane-heading">
          <h2 id="membrane-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">04</span> The membrane tax, in plain
            terms
          </h2>
          <p>
            Stiffer membranes add resistance before meaningful needle motion. That is why some
            budget cartridges feel like they tax your motor. DialedIn accounts for tier differences
            with a small compensating nudge so the pull stays honest. Deeper read:{" "}
            <Link className="blueprint-page__inline-link" href="/blog/the-membrane-tax">
              The membrane tax
            </Link>
            .
          </p>
        </section>

        <section className="blueprint-page__section" aria-labelledby="why-heading">
          <h2 id="why-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">05</span> What disciplined setup buys you
          </h2>
          <ul className="blueprint-page__list">
            <li>
              <strong>Controlled trauma:</strong> Matching CPS to hand speed and stroke reduces
              scatter from fighting your own motor rhythm.
            </li>
            <li>
              <strong>Predictable saturation:</strong> Fewer hesitant passes from guessing voltage
              in a vacuum.
            </li>
            <li>
              <strong>Standards, not slogans:</strong> Entry-level rotaries and flagship machines
              answer to the same physics—the tattoo machine sweet spot is a method, not a brand
              story.
            </li>
          </ul>
        </section>

        <section className="blueprint-page__section" aria-labelledby="methodology-heading">
          <h2 id="methodology-heading" className="blueprint-page__section-title">
            <span className="blueprint-page__section-num">06</span> Scientific methodology: the
            constant of effective force
          </h2>
          <p>
            Our logic is built on the physical relationship between stroke length (S) and needle
            frequency (F). As S increases, the impact force on the skin increases exponentially. To
            maintain a constant safe impact zone, frequency (voltage) must be inversely adjusted.
          </p>
          <p>
            DialedIn uses a linear decay formula around the <strong>3.5&nbsp;mm pivot</strong> to
            keep your machine in the mechanical sweet spot, regardless of hardware tiering. For the
            full stroke narrative, see{" "}
            <Link className="blueprint-page__inline-link" href="/blog/stroke-physics">
              The 3.5mm pivot
            </Link>{" "}
            and the deeper framing on{" "}
            <Link className="blueprint-page__inline-link" href="/science">
              scientific methodology
            </Link>
            .
          </p>
        </section>

        <footer className="blueprint-page__footer">
          <p className="blueprint-page__footer-meta">
            METHOD · STROKE-AWARE · STYLE-ANCHORED · ACCOUNTABLE
          </p>
        </footer>

        <Link href="/" className="blueprint-page__fab">
          Open setup tool
        </Link>
      </article>
    </>
  );
}
