import { Link } from "@/i18n/navigation";
import { localizedPageMetadata } from "@/lib/localizedMetadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return localizedPageMetadata(locale, "privacy", "/privacy", { noindex: true });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const tNav = await getTranslations({ locale, namespace: "blogNav" });

  return (
    <div className="legal-page">
      <p className="science-page__eyebrow">
        <Link href="/">{tNav("backDial")}</Link>
      </p>
      <h1>{t("privacy.title")}</h1>
      <p className="legal-page__note">{t("common.operatorNote")}</p>
      <p>{t("privacy.lead")}</p>
      <h2>{t("privacy.dataTitle")}</h2>
      <p>{t("privacy.dataBody")}</p>
      <h2>{t("privacy.aiTitle")}</h2>
      <p>{t("privacy.aiBody")}</p>
      <h2>{t("privacy.cookiesTitle")}</h2>
      <p>{t("privacy.cookiesBody")}</p>
      <h2>{t("common.contactEmailLabel")}</h2>
      <p>
        <a className="dialed__link" href="mailto:contact@albor.digital">
          contact@albor.digital
        </a>
      </p>
    </div>
  );
}
