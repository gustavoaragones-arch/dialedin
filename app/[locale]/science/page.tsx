import { ScienceMethodologyContent } from "@/components/ScienceMethodologyContent";
import { Link } from "@/i18n/navigation";
import { localizedPageMetadata } from "@/lib/localizedMetadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return localizedPageMetadata(locale, "science", "/science");
}

export default async function SciencePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: "blogNav" });

  return (
    <div className="science-page">
      <header className="science-page__header">
        <p className="science-page__eyebrow">
          <Link href="/">{tNav("backTool")}</Link>
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
