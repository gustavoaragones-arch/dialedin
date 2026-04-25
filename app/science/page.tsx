import { ScienceMethodologyContent } from "@/components/ScienceMethodologyContent";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scientific methodology — DialedIn.ink",
  description:
    "Relational physics for tattoo setup: Hammer Effect on long stroke, ACUS Hz standard, CPS consistency across hardware, stroke–cycle equilibrium, taper geometry, and gauge vs skin tension.",
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
