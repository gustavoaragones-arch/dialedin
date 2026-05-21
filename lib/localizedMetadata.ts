import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { hreflangUrlMap, outwardPath } from "@/lib/routePathnames";
import { SITE_URL } from "@/lib/seoSite";

function ogLocaleTag(locale: string): string {
  if (locale === "es") return "es_ES";
  if (locale === "pt") return "pt_BR";
  return "en_US";
}

/**
 * Localized title, description, canonical, hreflang alternates, OG/Twitter.
 * `pathWithoutLocale` is internal pathname: "" for home, "/how-it-works", "/blog/foo", etc.
 * `metaKey` matches `meta.<metaKey>.title` in messages.
 *
 * `alternates.canonical` and `alternates.languages` (en, es, pt, x-default → /en/…)
 * are emitted by Next.js as `<link rel="canonical">` and `<link rel="alternate" hreflang="…">`.
 */
export async function localizedPageMetadata(
  locale: string,
  metaKey: string,
  pathWithoutLocale: string,
  options?: {
    keywords?: string[];
    ogType?: "article" | "website";
    /** Legal and policy pages: keep out of organic index; blog/tool stay indexable. */
    noindex?: boolean;
  },
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const tOg = await getTranslations({ locale, namespace: "og" });
  const title = t(`${metaKey}.title`);
  const description = t(`${metaKey}.description`);
  const disciplinedLine = tOg("disciplinedLine");
  const outward = outwardPath(locale, pathWithoutLocale);
  const abs = `${SITE_URL}/${locale}${outward}`;

  const meta: Metadata = {
    title: { absolute: title },
    description,
    alternates: {
      canonical: abs,
      languages: hreflangUrlMap(pathWithoutLocale),
    },
    openGraph: {
      type: options?.ogType ?? "website",
      url: abs,
      siteName: "DialedIn",
      locale: ogLocaleTag(locale),
      title,
      description: `${description} ${disciplinedLine}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `${description} ${disciplinedLine}`,
    },
  };

  if (options?.keywords?.length) {
    meta.keywords = options.keywords;
  }
  if (options?.ogType === "article") {
    meta.authors = [{ name: "DialedIn Team" }];
    meta.publisher = "DialedIn.ink";
  }

  if (options?.noindex) {
    meta.robots = { index: false, follow: true };
  }

  return meta;
}
