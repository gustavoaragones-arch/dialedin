import { Link } from "@/i18n/navigation";
import { localizedPageMetadata } from "@/lib/localizedMetadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return localizedPageMetadata(locale, "disclaimer", "/disclaimer", {
    noindex: true,
  });
}

export default async function DisclaimerPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const tNav = await getTranslations({ locale, namespace: "blogNav" });

  return (
    <div className="legal-page">
      <p className="science-page__eyebrow">
        <Link href="/">{tNav("backDial")}</Link>
      </p>
      <h1>{t("disclaimer.title")}</h1>
      <p className="legal-page__note">{t("common.operatorNote")}</p>
      <p>{t("disclaimer.lead")}</p>
      <p>{t("disclaimer.acknowledge")}</p>
      <h2>{t("disclaimer.riskTitle")}</h2>
      <p>{t("disclaimer.riskBody")}</p>
      <h2>{t("disclaimer.equipTitle")}</h2>
      <p>{t("disclaimer.equipBody")}</p>
      <h2>{t("disclaimer.liabilityTitle")}</h2>
      <p>{t("disclaimer.liabilityBody")}</p>
      <h2>{t("common.contactEmailLabel")}</h2>
      <p>
        <a className="dialed__link" href="mailto:contact@tattoomachinesetup.com">
          contact@tattoomachinesetup.com
        </a>
      </p>
    </div>
  );
}
