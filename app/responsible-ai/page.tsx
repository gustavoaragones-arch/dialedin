import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Responsible AI Policy — DialedIn.ink",
  description:
    "Responsible AI practices for DialedIn.ink, aligned with Albor Digital LLC.",
};

export default function ResponsibleAiPage() {
  return (
    <div className="legal-page">
      <p className="science-page__eyebrow">
        <Link href="/">← DIALED-IN</Link>
      </p>
      <h1>Responsible AI Policy</h1>
      <p className="legal-page__note">
        DialedIn.ink is operated by <strong>Albor Digital LLC</strong>. This
        policy describes how we treat automated recommendations and
        transparency. It is a public summary; the binding Responsible AI
        framework is maintained in Albor Digital&apos;s internal policy set.
      </p>
      <h2>Purpose &amp; limits</h2>
      <p>
        DialedIn.ink uses deterministic rules and documented heuristics to
        translate inputs into technical readouts (voltage bands, Hz framing,
        CPS teaching values, cartridge ranges). It is not an autonomous medical
        agent and must not be used as a substitute for professional judgment.
      </p>
      <h2>Human oversight</h2>
      <p>
        Artists must validate every recommendation against manufacturer specs,
        skin type, session goals, and local regulations. The tool surfaces
        warnings where modeled checks flag potential mismatch.
      </p>
      <h2>Accuracy &amp; updates</h2>
      <p>
        We version logic and publish a visible &quot;Last engine update&quot;
        stamp on the site. Material model changes will be reflected in release
        notes or methodology pages where practical.
      </p>
      <h2>Contact</h2>
      <p>
        <a className="dialed__link" href="mailto:contact@dialedin.ink">
          contact@dialedin.ink
        </a>
      </p>
    </div>
  );
}
