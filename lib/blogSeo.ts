import { BLOG_KEYWORDS_ES } from "@/lib/blog/es/keywords";
import { localizedPageMetadata } from "@/lib/localizedMetadata";
import { setRequestLocale } from "next-intl/server";

export type BlogPostSeoConfig = {
  metaKey: string;
  path: string;
  keywords: string[];
};

export async function blogPostMetadata(
  params: Promise<{ locale: string }>,
  config: BlogPostSeoConfig,
) {
  const { locale } = await params;
  setRequestLocale(locale);
  const keywordsEs = BLOG_KEYWORDS_ES[config.path];
  const keywords =
    locale === "es" && keywordsEs?.length ? keywordsEs : config.keywords;
  return localizedPageMetadata(locale, config.metaKey, config.path, {
    keywords,
    ogType: "article",
  });
}
