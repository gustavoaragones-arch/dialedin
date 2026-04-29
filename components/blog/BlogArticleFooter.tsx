import { getTranslations } from "next-intl/server";

export async function BlogArticleFooter() {
  const t = await getTranslations("blogNav");

  return (
    <footer className="science-section">
      <p className="legal-page__note">{t("articleFooter")}</p>
    </footer>
  );
}
