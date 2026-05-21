import type { AppLocale } from "@/lib/appLocales";
import { SITE_URL } from "@/lib/seoSite";

type SoftwareAppCopy = {
  appDescription: string;
  featureList: string[];
  keywords: string;
};

const COPY: Record<AppLocale, SoftwareAppCopy> = {
  en: {
    appDescription:
      "Relational technical calculator for tattoo artists. Optimizes machine voltage, stroke, and needle configuration for your style and technique.",
    featureList: [
      "Relational logic engine (style, technique, machine, cartridge)",
      "Hertz to volts teaching readouts",
      "Needle hang guidance",
      "Safety guardrails for apprentices",
    ],
    keywords:
      "tattoo machine settings, tattoo needle gauge, voltage for fine line, tattoo apprentice tool, DialedIn",
  },
  es: {
    appDescription:
      "Calculadora técnica relacional para artistas del tatuaje. Optimiza el voltaje, stroke de la máquina y configuración de agujas según el estilo y la técnica.",
    featureList: [
      "Motor de lógica relacional (estilo, técnica, máquina, cartucho)",
      "Lecturas didácticas hercios ↔ voltios",
      "Recomendaciones de salida de aguja",
      "Barreras de seguridad para aprendices",
    ],
    keywords:
      "ajuste máquina tatuar, calibre aguja tatuaje, voltaje línea fina, herramienta aprendiz tatuaje, DialedIn",
  },
  pt: {
    appDescription:
      "Calculadora técnica relacional para tatuadores. Otimiza voltagem, curso da máquina e configuração de agulhas conforme estilo e técnica.",
    featureList: [
      "Motor de lógica relacional (estilo, técnica, máquina, cartucho)",
      "Leituras didáticas hertz ↔ volts",
      "Orientação de recuo da agulha",
      "Barreiras de segurança para aprendizes",
    ],
    keywords:
      "configuração máquina tatuagem, calibre agulha tatuagem, voltagem linha fina, ferramenta aprendiz tatuagem, DialedIn",
  },
};

function resolveLocale(locale: string): AppLocale {
  if (locale === "es" || locale === "pt") return locale;
  return "en";
}

/**
 * Home / setup tool JSON-LD — single SoftwareApplication object for Google Rich Results
 * (name + offers required; EducationalApplication + operatingSystem recommended).
 */
export function buildSoftwareApplicationJsonLd(locale: string): Record<string, unknown> {
  const loc = resolveLocale(locale);
  const c = COPY[loc];
  const pageUrl = `${SITE_URL}/${loc}`;

  return {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    "@id": `${pageUrl}#softwareapplication`,
    name: "DialedIn.ink",
    url: pageUrl,
    operatingSystem: "Any",
    applicationCategory: "EducationalApplication",
    description: c.appDescription,
    isAccessibleForFree: true,
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    image: `${SITE_URL}/opengraph-image`,
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
    author: {
      "@type": "Organization",
      name: "DialedIn Team",
      url: pageUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "DialedIn.ink",
      url: SITE_URL,
    },
    featureList: c.featureList,
    keywords: c.keywords,
  };
}

/** @deprecated Use buildSoftwareApplicationJsonLd on the home page only. */
export function buildDialedInJsonLd(locale: string): Record<string, unknown> {
  return buildSoftwareApplicationJsonLd(locale);
}
