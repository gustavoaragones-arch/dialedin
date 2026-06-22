/** FAQ entities stay English for AEO consistency; WebPage/Article use localized headline/description. */
const FAQ_MAIN_ENTITY = [
  {
    "@type": "Question",
    name: "What tattoo machine voltage works for fine line?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Fine line tattoo voltage should track a high-frequency, low-impact discipline—not a random dial number. tattoomachinesetup.com anchors your setup to a fine-line baseline (needle frequency and voltage window), then applies stroke and hardware adjustments so the suggestion stays coherent with how you actually work.",
    },
  },
  {
    "@type": "Question",
    name: "How does tattoo machine stroke affect voltage?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Rotary machine stroke physics change how hard the needle hits at the same voltage. tattoomachinesetup.com uses a 3.5mm standard pivot: longer throw tends to hit harder, so the engine lowers voltage to reduce overshoot on soft work; shorter throw can receive a careful nudge up so penetration stays reliable.",
    },
  },
  {
    "@type": "Question",
    name: "How do hertz (CPS) relate to volts on a tattoo machine?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Voltage to CPS conversion is not a single universal constant—it depends on motor, stroke, grip, and needle load. tattoomachinesetup.com treats frequency and voltage as one coupled setup: your style sets a target band, and the readout stays tied to the machine context in front of you.",
    },
  },
  {
    "@type": "Question",
    name: "Why does a tattoo machine feel like it stalls on some cartridges?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Budget cartridges often use stiffer membranes, which add resistance before the needle moves—sometimes called a membrane tax. tattoomachinesetup.com applies a small hardware-tier nudge so the motor is less likely to bog during the pull.",
    },
  },
  {
    "@type": "Question",
    name: "How does tattoomachinesetup.com help with needle grouping choices?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "A tattoo needle grouping guide is only useful when it matches your style intent. tattoomachinesetup.com starts from the craft you selected—liner versus shader groupings and technique—so recommendations align with the saturation and line quality that style demands.",
    },
  },
] as const;

const ARTICLE_KEYWORDS = [
  "tattoo machine setup logic",
  "rotary machine stroke physics",
  "voltage to CPS conversion",
  "tattoo needle grouping guide",
  "fine line tattoo voltage",
  "skin trauma prevention",
  "tattoo machine sweet spot",
] as const;

export function buildHowItWorksJsonLd(
  pageUrl: string,
  headline: string,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: headline,
        isPartOf: {
          "@type": "WebSite",
          name: "tattoomachinesetup.com",
          url: "https://tattoomachinesetup.com",
        },
        description,
      },
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline,
        description,
        author: { "@type": "Organization", name: "Albor Digital LLC" },
        publisher: { "@type": "Organization", name: "Albor Digital LLC" },
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
        keywords: [...ARTICLE_KEYWORDS],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [...FAQ_MAIN_ENTITY],
      },
    ],
  };
}
