import { BlogTechnicalContext } from "@/components/BlogTechnicalContext";
import { Link } from "@/i18n/navigation";

type Props = {
  headline: string;
  lede: string;
  backBlog: string;
};

export function PhysicsRuleBreakingEnArticle({ headline, lede, backBlog }: Props) {
  return (
    <article className="science-page">
      <header className="science-page__header">
        <p className="science-page__eyebrow">
          <Link href="/blog">{backBlog}</Link>
        </p>
        <h1 className="science-page__title">{headline}</h1>
        <p className="science-page__lede">{lede}</p>
      </header>

      <section className="science-section">
        <h2>Introduction: The map is not the territory</h2>
        <p>
          Every apprentice learns a clean partition: <strong>round liners</strong> for edges,
          <strong>magnums</strong> for fields, <strong>short stroke</strong> for softness,{" "}
          <strong>long stroke</strong> for authority. Those rules exist because they reduce
          trauma and variance at scale. They are not physics errors—they are risk management.
        </p>
        <p>
          Advanced work often violates the map on purpose. The question is not whether the rule
          was “wrong,” but whether the artist rebuilt the missing variables: voltage envelope,{" "}
          <strong>tattoo machine physics</strong> (stroke length, throw, cycle rate), needle
          geometry, and—most critically—<strong>hand speed</strong> relative to cycles per
          second.
        </p>
        <p>
          DialedIn is intentionally conservative: it encodes brand-adjacent defaults so you can
          start from a defensible baseline. From there, rule-breaking should be{" "}
          <em>instrumented</em>, not improvised. If you can state why your deviation still keeps
          impact energy, skin resistance, and ink film coherent, you are doing engineering—not
          gambling.
        </p>
        <section
          className="blog-tech-summary"
          aria-labelledby="tech-summary-intro-en"
        >
          <h3 id="tech-summary-intro-en" className="blog-tech-summary__title">
            Technical summary
          </h3>
          <ul className="blog-tech-summary__list">
            <li>Standards compress variance; they do not exhaust valid state-space.</li>
            <li>Any “wrong” tool pairing must re-balance stroke, voltage, and hand velocity.</li>
            <li>Use DialedIn as a safe origin; document the delta you intend to run.</li>
          </ul>
        </section>
      </section>

      <section className="science-section">
        <h2>Case study A: High stroke shading (4.0 mm+)</h2>
        <h3>The rule</h3>
        <p>
          Long throw is marketed for bold lining and color packing: more stored arc per cycle, more
          forward work per hit. Short throw is associated with softer, lower-amplitude passes.
        </p>
        <h3>The break</h3>
        <p>
          Blackwork and disciplined dotwork artists sometimes shade on 4.0–4.2 mm throws—not because
          the machine “likes” shading there, but because they want discrete micro-events on the
          skin rather than a fused wash plane.
        </p>
        <h3>Technical logic</h3>
        <p>
          With a long stroke, each cycle carries more needle momentum. If you run the same voltage
          intuition as packing work, you invite oversaturation and mechanical hammering. The
          controlled deviation is to <strong>pull voltage down</strong> and <strong>raise effective</strong>{" "}
          hand speed relative to CPS so hits land as separated micro-dots—classic{" "}
          <strong>pepper shading</strong>—instead of merged pools (<strong>smooth shading</strong>).
        </p>
        <ul>
          <li>
            <strong>Stroke ↑</strong> increases impact energy per cycle at equal drive.
          </li>
          <li>
            <strong>Voltage ↓</strong> reduces cycle power if you need softer events.
          </li>
          <li>
            <strong>Hand speed ↑</strong> increases lateral spacing between deposits.
          </li>
        </ul>
        <p>
          Read this trio together:{" "}
          <Link className="dialed__link" href="/blog/stroke-physics">
            stroke physics
          </Link>
          , then verify your operating band against{" "}
          <Link className="dialed__link" href="/blog/hand-speed-sync">
            hand-speed sync
          </Link>
          . High stroke shading is lawful when spacing—not slogans—does the safety work.
        </p>
        <section
          className="blog-tech-summary"
          aria-labelledby="tech-summary-a-en"
        >
          <h3 id="tech-summary-a-en" className="blog-tech-summary__title">
            Technical summary
          </h3>
          <ul className="blog-tech-summary__list">
            <li>High stroke shading trades fused washes for separated micro-hits.</li>
            <li>Lower voltage + faster hand often preserves texture without hammer trauma.</li>
            <li>Keywords: high stroke shading, pepper shading vs smooth shading.</li>
          </ul>
        </section>
      </section>

      <section className="science-section">
        <h2>Case study B: Realism “lines” with magnums</h2>
        <h3>The rule</h3>
        <p>
          Lines are RL territory: tight grouping, predictable edge, minimal lateral spread. That
          rule protects edge sharpness when the artist is still calibrating depth discipline.
        </p>
        <h3>The break</h3>
        <p>
          Portrait specialists sometimes pull structure with the <strong>edge of a magnum</strong>
          —especially <strong>curved magnum (CM)</strong>—to avoid the wire-y bite a small RL can
          leave on delicate planes.
        </p>
        <h3>Technical logic</h3>
        <p>
          A magnum presents a wider contact patch. Used on the flat, it behaves like a shader; used
          on the corner, it behaves like a soft brush with lateral compliance. The “line” is often
          a stacked illusion: multiple low-amplitude passes that read as an edge in camera space
          but never concentrate trauma in a single RL channel. That is the disciplined reading of{" "}
          <strong>magnum lining technique</strong>: you are buying transition softness with geometry,
          not cheating edge physics with denial.
        </p>
        <ul>
          <li>
            <strong>Edge contact</strong> reduces effective pressure per unit length vs packed RL.
          </li>
          <li>
            <strong>Curvature (CM)</strong> changes how pigment releases around pores and thin skin.
          </li>
          <li>
            <strong>Angle + speed</strong> must stay inside the same CPS spacing discipline as lining.
          </li>
        </ul>
        <section
          className="blog-tech-summary"
          aria-labelledby="tech-summary-b-en"
        >
          <h3 id="tech-summary-b-en" className="blog-tech-summary__title">
            Technical summary
          </h3>
          <ul className="blog-tech-summary__list">
            <li>Magnum edges trade razor RL bite for controlled lateral compliance.</li>
            <li>Portrait “lines” are often built passes, not single-channel cuts.</li>
            <li>Keywords: magnum lining technique, realism edge control.</li>
          </ul>
        </section>
      </section>

      <section className="science-section">
        <h2>Case study C: The single-needle myth (1RL / 3RL)</h2>
        <h3>The rule</h3>
        <p>
          Large groupings exist to move pigment area efficiently. Teaching defaults push beginners
          away from heroic single-needle work because time-under-needle and trauma control get
          harder, not impossible.
        </p>
        <h3>The break</h3>
        <p>
          Micro-realism pieces executed primarily on a <strong>#08–#10 3RL</strong> are not “denying
          physics”; they are accepting a slower accumulation model. Each pass deposits a thin,
          precise film; depth variance is amplified, so voltage and hand speed must be boringly
          consistent.
        </p>
        <h3>Technical logic</h3>
        <p>
          Layering replaces gauge width with repeatability. The machine still obeys the same
          stroke–voltage–CPS relationships; the artist simply refuses to buy area with needle count
          and pays with clock time and session planning instead.
        </p>
        <ul>
          <li>
            <strong>Smaller gauge</strong> ↑ sensitivity to angle error and ink film thickness.
          </li>
          <li>
            <strong>More passes</strong> ↑ cumulative heat; rest and stretch discipline matter.
          </li>
          <li>
            <strong>Conservative voltage bands</strong> beat “hero volts” for photographic detail.
          </li>
        </ul>
        <section
          className="blog-tech-summary"
          aria-labelledby="tech-summary-c-en"
        >
          <h3 id="tech-summary-c-en" className="blog-tech-summary__title">
            Technical summary
          </h3>
          <ul className="blog-tech-summary__list">
            <li>Single-needle micro-realism is a layering strategy, not a bypass of physics.</li>
            <li>Precision scales with repeatability more than with peak power.</li>
            <li>Keywords: micro-realism 3RL, controlled layering.</li>
          </ul>
        </section>
      </section>

      <section className="science-section">
        <h2>Conclusion: Hand speed is the closing variable</h2>
        <p>
          You can run configurations that look “wrong” on a checklist if you understand how{" "}
          <strong>voltage + stroke + hand speed</strong> couple into deposit spacing and impact
          energy. The craft is not the violation; the craft is knowing which variable you are
          spending to buy the look.
        </p>
        <blockquote>
          <p>
            <strong>Call to action:</strong> Use DialedIn to find your safe operating region—then
            break rules with intent, measurement, and skin accountability.
          </p>
        </blockquote>
        <section
          className="blog-tech-summary"
          aria-labelledby="tech-summary-outro-en"
        >
          <h3 id="tech-summary-outro-en" className="blog-tech-summary__title">
            Technical summary
          </h3>
          <ul className="blog-tech-summary__list">
            <li>Deviations are valid when stroke, volts, and CPS remain internally consistent.</li>
            <li>Hand speed finishes the texture equation after hardware choices.</li>
            <li>Discipline = naming your tradeoffs instead of mystifying them.</li>
          </ul>
        </section>
      </section>

      <BlogTechnicalContext
        title="Open the setup engine"
        description="Logic is the foundation. Precision is the result. Configure stroke, voltage, and hand-speed context in one place."
        primaryLabel="Open the setup engine"
        secondaryLabel="View technical methodology"
      />

      <footer className="science-section">
        <p className="legal-page__note">
          Published by DialedIn.ink, an Albor Digital LLC project. Technical guidance is
          educational; clinical decisions remain the artist&apos;s responsibility.
        </p>
      </footer>
    </article>
  );
}
