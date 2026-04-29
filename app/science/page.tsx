import { ScienceMethodologyContent } from "@/components/ScienceMethodologyContent";
import type { Metadata } from "next";
import Link from "next/link";
import { openGraphWebsite, twitterArticle } from "@/lib/seoSite";

const metaTitle = "Scientific methodology";
const metaDescription =
  "Universal machine physics for tattoo setup: hammer effect on long stroke, ACUS Hz readouts, CPS consistency across hardware tiers, and membrane-aware voltage compensation for stiffer cartridges.";

export const metadata: Metadata = {
  title: { absolute: metaTitle },
  description: metaDescription,
  alternates: { canonical: "/science" },
  openGraph: openGraphWebsite("/science", metaTitle, metaDescription),
  twitter: twitterArticle(metaTitle, metaDescription),
};

export default function SciencePage() {
  return (
    <div className="science-page">
      <header className="science-page__header">
        <p className="science-page__eyebrow">
          <Link href="/">← DIALED-IN tool</Link>
        </p>
        <h1 className="science-page__title">Scientific standard</h1>
        <p className="science-page__lede">
          Methodology for the DialedIn.ink authority layer: how stroke, voltage,
          taper geometry, and hand velocity are modeled together—not as isolated
          “settings,” but as coupled physical constraints.
        </p>
      </header>
      <ScienceMethodologyContent />
    </div>
  );
}
