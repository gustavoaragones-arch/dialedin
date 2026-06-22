import { Link } from "@/i18n/navigation";
import { localizedPageMetadata } from "@/lib/localizedMetadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return localizedPageMetadata(locale, "responsibleAi", "/responsible-ai", {
    noindex: true,
  });
}

export default async function ResponsibleAiPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const tNav = await getTranslations({ locale, namespace: "blogNav" });

  return (
    <div className="legal-page">
      <p className="science-page__eyebrow">
        <Link href="/">{tNav("backDial")}</Link>
      </p>
      <h1>{t("responsibleAi.title")}</h1>
      <p className="legal-page__note">{t("common.operatorNote")}</p>
      <p>{t("responsibleAi.lead")}</p>
      <h2>{t("responsibleAi.purposeTitle")}</h2>
      <p>{t("responsibleAi.purposeBody")}</p>
      <h2>{t("responsibleAi.humanTitle")}</h2>
      <p>{t("responsibleAi.humanBody")}</p>
      <h2>{t("responsibleAi.dataTitle")}</h2>
      <p>{t("responsibleAi.dataBody")}</p>
      <h2>{t("responsibleAi.accuracyTitle")}</h2>
      <p>{t("responsibleAi.accuracyBody")}</p>
      <h2>{t("common.contactEmailLabel")}</h2>
      <p>
        <a className="dialed__link" href="mailto:contact@tattoomachinesetup.com">
          contact@tattoomachinesetup.com
        </a>
      </p>
    </div>
  );
}
