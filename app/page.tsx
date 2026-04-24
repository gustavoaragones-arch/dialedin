import { DialedInTool } from "@/components/DialedInTool";
import {
  dialedInHowToLd,
  dialedInSoftwareApplicationLd,
} from "@/lib/seoJsonLd";

export default function Page() {
  const jsonLd = [dialedInSoftwareApplicationLd, dialedInHowToLd];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DialedInTool />
    </>
  );
}
