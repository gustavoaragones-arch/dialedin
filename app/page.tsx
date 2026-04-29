import { DialedInTool } from "@/components/DialedInTool";
import { OG_DISCIPLINED_LINE, SITE_URL } from "@/lib/seoSite";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "DialedIn" },
  description: "Tattoo Machine Setup Engine",
  alternates: { canonical: "/" },
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
};

export default function Page() {
  return <DialedInTool />;
}
