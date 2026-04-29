"use client";

import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

const LABELS: Record<string, string> = {
  en: "EN",
  es: "ES",
  pt: "PT",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("localeSwitcher");

  return (
    <label className="locale-switcher">
      <span className="sr-only">{t("ariaLabel")}</span>
      <select
        className="locale-switcher__select"
        value={locale}
        aria-label={t("ariaLabel")}
        onChange={(e) => {
          const next = e.target.value;
          router.replace(pathname, { locale: next });
        }}
      >
        {routing.locales.map((loc: string) => (
          <option key={loc} value={loc}>
            {LABELS[loc] ?? loc.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
