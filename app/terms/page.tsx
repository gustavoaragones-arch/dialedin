import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — DialedIn.ink",
  description:
    "Terms of Service for DialedIn.ink, a product of Albor Digital LLC.",
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <p className="science-page__eyebrow">
        <Link href="/">← DIALED-IN</Link>
      </p>
      <h1>Terms of Service</h1>
      <p className="legal-page__note">
        DialedIn.ink is operated by <strong>Albor Digital LLC</strong>. These
        terms summarize how you may use the public tool. For the authoritative
        legal text, refer to the Albor Digital master agreements and policies
        provided by counsel.
      </p>
      <h2>Acceptance</h2>
      <p>
        By using DialedIn.ink you agree to these terms and to use the tool only
        for lawful, professional purposes. Output is educational and
        technical—not medical or legal advice.
      </p>
      <h2>Service &amp; availability</h2>
      <p>
        We may change, suspend, or discontinue features to maintain security or
        accuracy. Continued use after updates constitutes acceptance of the
        revised terms where notice is posted on this site.
      </p>
      <h2>Disclaimer</h2>
      <p>
        Tattooing involves health and safety risk. You are solely responsible
        for machine settings, hygiene, licensing, and client care. DialedIn.ink
        does not replace manufacturer documentation or professional training.
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
