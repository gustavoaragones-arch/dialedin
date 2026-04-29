import { localizedPathnames } from "@/lib/routePathnames";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "pt"],
  defaultLocale: "en",
  localePrefix: "always",
  pathnames: localizedPathnames,
});

export type { AppLocale } from "@/lib/appLocales";
