import type { MetadataRoute } from "next";
import type { AppLocale } from "@/lib/appLocales";
import { routing } from "@/i18n/routing";
import { outwardPath } from "@/lib/routePathnames";
import { SITE_URL } from "@/lib/seoSite";

const PATHS = [
  "",
  "/how-it-works",
  "/science",
  "/blog",
  "/blog/needle-geometry",
  "/blog/stroke-physics",
  "/blog/cartridge-drag",
  "/blog/hand-speed-sync",
  "/blog/physics-of-rule-breaking",
  "/blog/hardware-tiers",
  "/blog/needle-hang-depth",
  "/blog/hertz-vs-volts",
  "/blog/the-membrane-tax",
] as const;

/** hreflang keys aligned with `localizedMetadata` / `hreflangUrlMap`. */
function hreflangKey(locale: AppLocale): string {
  if (locale === "es") return "es";
  if (locale === "pt") return "pt-BR";
  return "en";
}

function alternateLanguages(internalPath: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const loc of routing.locales as readonly AppLocale[]) {
    const outward = outwardPath(loc, internalPath);
    languages[hreflangKey(loc)] = `${SITE_URL}/${loc}${outward}`;
  }
  languages["x-default"] = `${SITE_URL}/en${outwardPath("en", internalPath)}`;
  return languages;
}

function priorityForPath(path: string): number {
  if (path === "") return 1;
  if (path === "/how-it-works") return 0.9;
  if (path.startsWith("/blog/")) return 0.8;
  return 0.75;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales as readonly AppLocale[]) {
    for (const path of PATHS) {
      const localized = outwardPath(locale, path);
      const url = `${SITE_URL}/${locale}${localized}`;
      const isHome = path === "";

      entries.push({
        url,
        lastModified,
        changeFrequency: isHome ? "daily" : "weekly",
        priority: priorityForPath(path),
        alternates: {
          languages: alternateLanguages(path),
        },
      });
    }
  }

  return entries;
}
