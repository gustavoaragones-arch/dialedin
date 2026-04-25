"use client";

import { TechnicalResultWithHints } from "./TechnicalTerm";

/**
 * Scientific methodology copy (DialedIn.ink authority layer).
 * Glossary tokens (SLT, TX, #10, Open Liner, Hanging) auto-link to Brand Bridge tooltips.
 */
export function ScienceMethodologyContent() {
  return (
    <article className="science-article">
      <section className="science-section" id="stroke-cycle">
        <h2>The stroke–cycle equilibrium</h2>
        <p>
          Rotary tattoo machines convert electrical cycles into needle
          displacement. For a given stroke length (mm), the needle travels a
          fixed arc per revolution. When hand velocity exceeds the rate at
          which those cycles deposit pigment, the skin sees under-filled
          segments—often misread as a &quot;machine problem&quot; when it is a{" "}
          <strong>velocity mismatch</strong>. The DialedIn.ink engine models this
          by pairing a five-step hand-speed scale (slow through fast-moderate)
          with recommended voltage bands: faster hands generally require higher
          effective cycle
          energy, bounded by tissue safety envelopes.
        </p>
        <p>
          Long-stroke machines (typically 4.0 mm+) store more kinetic energy in
          each impact. During soft shading or whip-style passes, that extra
          momentum raises the risk of <em>hammer effect</em> trauma unless
          voltage is deliberately pulled down—our{" "}
          <strong>Hammer Effect Guard</strong> applies a −1.5 V offset when
          stroke ≥ 4.0 mm and the technique is delicate shading-class.
        </p>
      </section>

      <section className="science-section" id="taper-geometry">
        <h2>Needle taper geometry</h2>
        <p>
          Taper defines how quickly the needle group narrows from body to tip.{" "}
          <TechnicalResultWithHints text="SLT" /> (super long taper) reduces
          frontal skin displacement for the same gauge, which matters for
          micro-detail and tight line work where standard long tapers can wedge
          tissue sideways. The <strong>Geometry Desync</strong> check flags Fine
          Line workflows where the resolved taper recommendation does not
          center <TechnicalResultWithHints text="SLT" />, prompting artists to
          reconsider cartridge geometry before chasing voltage or speed
          changes.
        </p>
        <p>
          <TechnicalResultWithHints text="TX" /> (textured) surfaces increase
          effective pigment film on the needle—useful for large fields or
          low-viscosity inks—while changing how ink releases during the same
          stroke length. Treat texture as a geometry modifier, not a substitute
          for correct taper class.
        </p>
      </section>

      <section className="science-section" id="gauge-tension">
        <h2>Gauge &amp; skin tension</h2>
        <p>
          Needle gauge (for example{" "}
          <TechnicalResultWithHints text="#10" /> at ~0.30 mm) sets the contact
          patch width. Smaller gauges reduce per-pass trauma but demand cleaner
          cycle timing: the skin&apos;s elastic return (tension + thickness)
          fights the needle on entry and exit. When tension is high—think
          convex surfaces or dehydrated skin—prefer slightly longer tapers and
          conservative voltage, then adjust{" "}
          <TechnicalResultWithHints text="Hanging" /> (needle extension beyond
          the tip) before chasing larger groupings. More hang increases throw
          for packing but amplifies lateral spread if taper geometry is
          mismatched. DialedIn.ink keeps hang, taper, and voltage in one
          relational surface so one input change recomputes the full
          recommendation set.
        </p>
        <p>
          For bold linework where tips are not pinched into a tight round,{" "}
          <TechnicalResultWithHints text="Open Liner" /> geometry (parallel
          grouping) can reduce binding at the cost of finer edge sharpness—pair
          with appropriate stroke length and voltage, not maximum aggression.
        </p>
      </section>
    </article>
  );
}
