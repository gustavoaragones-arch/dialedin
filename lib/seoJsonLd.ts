import { SITE_URL } from "@/lib/seoSite";
import type { AppLocale } from "@/lib/appLocales";

type JsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": Record<string, unknown>[];
};

const COPY: Record<
  AppLocale,
  {
    appDescription: string;
    featureList: string[];
    keywords: string;
    howToName: string;
    howToDescription: string;
    howToSteps: string[];
  }
> = {
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
    howToName: "How to dial in your tattoo machine with DialedIn",
    howToDescription:
      "Select style and technique, pick your machine, sync hand speed to CPS, and read stroke-aware voltage guidance.",
    howToSteps: [
      "Choose your tattoo style and technique path to set the relational baseline.",
      "Select your machine from the library to establish stroke limits and voltage envelope.",
      "Adjust hand speed to align motor frequency (CPS) with your movement.",
      "Use the recommended voltage band and warnings as a technical starting point—not a substitute for mentor-led training.",
    ],
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
    howToName: "Cómo calibrar tu máquina con DialedIn",
    howToDescription:
      "Elige estilo y técnica, selecciona máquina, sincroniza la mano con CPS y usa la banda de voltaje con advertencias integradas.",
    howToSteps: [
      "Elige estilo y trayectoria de técnica para fijar la línea base relacional.",
      "Selecciona tu máquina en la biblioteca para límites de stroke y envolvente de voltaje.",
      "Ajusta la velocidad de mano para alinear la frecuencia del motor (CPS) con tu movimiento.",
      "Usa la banda de voltaje y advertencias como punto de partida técnico—no sustituye formación con mentor.",
    ],
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
    howToName: "Como calibrar sua máquina com o DialedIn",
    howToDescription:
      "Escolha estilo e técnica, selecione a máquina, sincronize a mão com CPS e use a faixa de voltagem com alertas.",
    howToSteps: [
      "Escolha estilo e trilha de técnica para definir a linha de base relacional.",
      "Selecione sua máquina na biblioteca para limites de curso e envelope de voltagem.",
      "Ajuste a velocidade da mão para alinhar a frequência do motor (CPS) ao movimento.",
      "Use a faixa de voltagem e alertas como ponto de partida técnico—não substitui treino com mentor.",
    ],
  },
};

function resolveLocale(locale: string): AppLocale {
  if (locale === "es" || locale === "pt") return locale;
  return "en";
}

/**
 * Site-wide JSON-LD for the setup tool: Educational SoftwareApplication + HowTo (locale-aware).
 */
export function buildDialedInJsonLd(locale: string): JsonLdGraph {
  const loc = resolveLocale(locale);
  const c = COPY[loc];
  const baseUrl = `${SITE_URL}/${loc}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${baseUrl}#dialedin-educational-app`,
        name: "DialedIn.ink",
        url: baseUrl,
        operatingSystem: "All",
        applicationCategory: "EducationalApplication",
        description: c.appDescription,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "Albor Digital LLC",
          url: SITE_URL,
        },
        educationalLevel: "Beginner to Intermediate (Apprentices)",
        featureList: c.featureList,
        keywords: c.keywords,
      },
      {
        "@type": "HowTo",
        "@id": `${baseUrl}#howto-dial-in`,
        name: c.howToName,
        description: c.howToDescription,
        step: c.howToSteps.map((text) => ({
          "@type": "HowToStep",
          text,
        })),
      },
    ],
  };
}
