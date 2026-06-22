import type { Metadata } from "next";

/** Canonical site origin for metadata, sitemap, and robots. */
export const SITE_URL = "https://tattoomachinesetup.com";

/** Appended to Open Graph descriptions for social previews (Disciplined Craft CTA). */
export const OG_DISCIPLINED_LINE =
  "Disciplined craft — technical accountability. Calibrate stroke, voltage, and style with DialedIn.";

export function openGraphArticle(
  path: string,
  title: string,
  aeoDescription: string,
): NonNullable<Metadata["openGraph"]> {
  return {
    type: "article",
    siteName: "DialedIn",
    locale: "en_US",
    url: new URL(path, SITE_URL).href,
    title,
    description: `${aeoDescription} ${OG_DISCIPLINED_LINE}`,
  };
}

export function twitterArticle(
  title: string,
  aeoDescription: string,
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description: `${aeoDescription} ${OG_DISCIPLINED_LINE}`,
  };
}

export function openGraphWebsite(
  path: string,
  title: string,
  aeoDescription: string,
): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    siteName: "DialedIn",
    locale: "en_US",
    url: new URL(path, SITE_URL).href,
    title,
    description: `${aeoDescription} ${OG_DISCIPLINED_LINE}`,
  };
}
