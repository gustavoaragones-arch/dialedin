"use client";

import { useEffect } from "react";

const BCP47: Record<string, string> = {
  en: "en",
  es: "es",
  pt: "pt-BR",
};

/** Sets `document.documentElement.lang` because the root `<html>` lives outside `[locale]`. */
export function LocaleHtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = BCP47[locale] ?? locale;
  }, [locale]);
  return null;
}
