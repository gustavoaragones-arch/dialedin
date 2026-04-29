import { DialedInProvider } from "@/components/DialedInProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { dialedinSchema } from "@/lib/seoJsonLd";
import { OG_DISCIPLINED_LINE, SITE_URL } from "@/lib/seoSite";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "DialedIn",
  description:
    "Tattoo machine setup engine — style-first voltage, stroke sync, and CPS guidance for accountable tattooing.",
  applicationName: "DialedIn",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "DialedIn",
    locale: "en_US",
    title: "DialedIn",
    description: `Tattoo Machine Setup Engine. ${OG_DISCIPLINED_LINE}`,
  },
  twitter: {
    card: "summary_large_image",
    title: "DialedIn",
    description: `Tattoo Machine Setup Engine. ${OG_DISCIPLINED_LINE}`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(dialedinSchema),
          }}
        />
      </head>
      <body>
        <main className="site-main">
          <DialedInProvider>{children}</DialedInProvider>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
