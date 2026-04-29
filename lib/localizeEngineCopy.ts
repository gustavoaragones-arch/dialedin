/**
 * Light-touch localization for English snippets embedded in engine/taxonomy strings.
 */
export function localizeEngineCopy(locale: string, text: string): string {
  if (!text) return text;
  if (locale === "es") {
    return text
      .replace(/\s+or\s+/gi, " o ")
      .replace(/\bpreferred\b/gi, "preferido")
      .replace(/\bPreferred\b/g, "Preferido");
  }
  if (locale === "pt") {
    return text
      .replace(/\s+or\s+/gi, " ou ")
      .replace(/\bpreferred\b/gi, "preferido")
      .replace(/\bPreferred\b/g, "Preferido");
  }
  return text;
}

const TECH_FOCUS_ES: Record<string, string> = {
  "Precision, pattern, texture.": "Precisión, patrón, textura.",
};

export function localizeTechnicalFocus(locale: string, text: string): string {
  if (locale !== "es") return text;
  return TECH_FOCUS_ES[text] ?? text;
}
