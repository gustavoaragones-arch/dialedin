import { DialedInProvider } from "@/components/DialedInProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DIALED-IN — Tattoo setup engine",
  description:
    "Tattoo needle gauge chart, rotary machine voltage for lining, and best stroke for black and grey realism with stroke-to-voltage safeguards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DialedInProvider>{children}</DialedInProvider>
      </body>
    </html>
  );
}
