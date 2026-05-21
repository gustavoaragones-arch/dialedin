import { DialedInTool } from "@/components/DialedInTool";
import { localizedPageMetadata } from "@/lib/localizedMetadata";
import { buildSoftwareApplicationJsonLd } from "@/lib/seoJsonLd";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return localizedPageMetadata(locale, "home", "", {
    ogType: "website",
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const softwareJsonLd = buildSoftwareApplicationJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareJsonLd),
        }}
      />
      <DialedInTool />
    </>
  );
}
