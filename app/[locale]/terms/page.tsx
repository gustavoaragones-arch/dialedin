import { Link } from "@/i18n/navigation";
import { localizedPageMetadata } from "@/lib/localizedMetadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return localizedPageMetadata(locale, "terms", "/terms", { noindex: true });
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const tNav = await getTranslations({ locale, namespace: "blogNav" });

  return (
    <div className="legal-page">
      <p className="science-page__eyebrow">
        <Link href="/">{tNav("backDial")}</Link>
      </p>
      <h1>{t("terms.title")}</h1>
      <p className="legal-page__note">{t("common.operatorNote")}</p>
      <h2>{t("terms.useTitle")}</h2>
      <p>{t("terms.useBody")}</p>
      <h2>{t("terms.ipTitle")}</h2>
      <p>{t("terms.ipBody")}</p>
      <h2>{t("terms.lawTitle")}</h2>
      <p>{t("terms.lawBody")}</p>
      <h2>{t("common.contactEmailLabel")}</h2>
      <p>
        <a className="dialed__link" href="mailto:contact@tattoomachinesetup.com">
          contact@tattoomachinesetup.com
        </a>
      </p>
    </div>
  );
}
