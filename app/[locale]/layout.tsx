import { DialedInProvider } from "@/components/DialedInProvider";
import { LocaleHtmlLang } from "@/components/LocaleHtmlLang";
import { SiteFooter } from "@/components/SiteFooter";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export function generateStaticParams() {
  return routing.locales.map((locale: string) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <>
      <LocaleHtmlLang locale={locale} />
      <NextIntlClientProvider messages={messages}>
        <main className="site-main">
          <DialedInProvider>{children}</DialedInProvider>
        </main>
        <SiteFooter />
      </NextIntlClientProvider>
    </>
  );
}
