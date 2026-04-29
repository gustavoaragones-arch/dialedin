import type { AppLocale } from "@/lib/appLocales";
import { APP_LOCALES } from "@/lib/appLocales";
import { SITE_URL } from "@/lib/seoSite";

/**
 * Internal pathname (filesystem / Link `href`) → user-facing path per locale.
 * Spanish blog slugs are localized for LatAm SEO; `pt` keeps English slugs until translated.
 */
export const localizedPathnames: Record<
  string,
  string | Record<AppLocale, string>
> = {
  "/": "/",
  "/how-it-works": "/how-it-works",
  "/science": "/science",
  "/blog": "/blog",
  "/disclaimer": "/disclaimer",
  "/terms": "/terms",
  "/privacy": "/privacy",
  "/responsible-ai": "/responsible-ai",
  "/blog/needle-geometry": {
    en: "/blog/needle-geometry",
    es: "/blog/geometria-agujas",
    pt: "/blog/needle-geometry",
  },
  "/blog/stroke-physics": {
    en: "/blog/stroke-physics",
    es: "/blog/fisica-stroke",
    pt: "/blog/stroke-physics",
  },
  "/blog/cartridge-drag": {
    en: "/blog/cartridge-drag",
    es: "/blog/resistencia-cartucho-piel",
    pt: "/blog/cartridge-drag",
  },
  "/blog/hand-speed-sync": {
    en: "/blog/hand-speed-sync",
    es: "/blog/sincronizacion-mano-cps",
    pt: "/blog/hand-speed-sync",
  },
  "/blog/hardware-tiers": {
    en: "/blog/hardware-tiers",
    es: "/blog/equipos-tier-1-vs-2",
    pt: "/blog/hardware-tiers",
  },
  "/blog/needle-hang-depth": {
    en: "/blog/needle-hang-depth",
    es: "/blog/profundidad-colgado-aguja",
    pt: "/blog/needle-hang-depth",
  },
  "/blog/hertz-vs-volts": {
    en: "/blog/hertz-vs-volts",
    es: "/blog/hertz-vs-voltios",
    pt: "/blog/hertz-vs-volts",
  },
  "/blog/the-membrane-tax": {
    en: "/blog/the-membrane-tax",
    es: "/blog/impuesto-membrana",
    pt: "/blog/the-membrane-tax",
  },
};

/** User-facing path after locale prefix (e.g. `/blog/fisica-stroke` for ES). */
export function outwardPath(locale: string, internalPath: string): string {
  if (internalPath === "") return "";
  const row = localizedPathnames[internalPath];
  if (row == null) return internalPath;
  if (typeof row === "string") return row;
  const loc = (locale === "en" || locale === "es" || locale === "pt"
    ? locale
    : "en") as AppLocale;
  return row[loc] ?? internalPath;
}

export function hreflangUrlMap(internalPath: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const loc of APP_LOCALES) {
    languages[loc] = `${SITE_URL}/${loc}${outwardPath(loc, internalPath)}`;
  }
  languages["x-default"] = `${SITE_URL}/en${outwardPath("en", internalPath)}`;
  return languages;
}
