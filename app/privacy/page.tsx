import type { Metadata } from "next";
import Link from "next/link";
import { openGraphWebsite, twitterArticle } from "@/lib/seoSite";

const metaTitle = "Privacy Policy";
const metaDescription =
  "Privacy Policy for DialedIn.ink, a product of Albor Digital LLC.";

export const metadata: Metadata = {
  title: { absolute: metaTitle },
  description: metaDescription,
  alternates: { canonical: "/privacy" },
  openGraph: openGraphWebsite("/privacy", metaTitle, metaDescription),
  twitter: twitterArticle(metaTitle, metaDescription),
};

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <p className="science-page__eyebrow">
        <Link href="/">← DIALED-IN</Link>
      </p>
      <h1>Privacy Policy</h1>
      <p className="legal-page__note">
        DialedIn.ink is operated by <strong>Albor Digital LLC</strong>. This page
        describes how we handle information in the web application. For the
        full Albor Digital privacy program, refer to the company&apos;s
        official privacy documentation.
      </p>
      <h2>Data we process</h2>
      <p>
        The tool runs primarily in your browser. If you connect optional
        services (for example a hosted machine library), only the data required
        to fetch configuration rows is transmitted to those providers under
        their respective terms.
      </p>
      <h2>Cookies &amp; analytics</h2>
      <p>
        We do not use third-party advertising cookies on DialedIn.ink. Any
        analytics we add in the future will be disclosed here with opt-out
        where applicable.
      </p>
      <h2>Retention</h2>
      <p>
        We retain operational logs only as needed for security and reliability,
        consistent with Albor Digital policy.
      </p>
      <h2>Contact</h2>
      <p>
        Privacy inquiries:{" "}
        <a className="dialed__link" href="mailto:contact@dialedin.ink">
          contact@dialedin.ink
        </a>
      </p>
    </div>
  );
}
