/** Single source for supported locales (avoid circular imports with `routing`). */
export const APP_LOCALES = ["en", "es", "pt"] as const;

export type AppLocale = (typeof APP_LOCALES)[number];
