import { DialedInProvider } from "@/components/DialedInProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { dialedinSchema } from "@/lib/seoJsonLd";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "DIALED-IN — Tattoo Voltage Calculator | ACUS M1 Frequency Guide | Tattoo Machine CPS",
  description:
    "DialedIn is the premier tattoo machine voltage and setup calculator. Specialized for ACUS M1, Cheyenne, and Bishop hardware, our engine syncs machine stroke with hand speed for perfect tattoo needle configurations.",
  keywords: [
    "Tattoo Voltage Calculator",
    "ACUS M1 Frequency Guide",
    "Tattoo Machine CPS",
    "tattoo machine voltage",
    "rotary tattoo stroke",
    "tattoo needle configuration",
  ],
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
