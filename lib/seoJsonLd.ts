/** JSON-LD blobs for the DIALED-IN landing page (SoftwareApplication + HowTo). */

const origin = "https://dialedin.example.com";

export const dialedInSoftwareApplicationLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DIALED-IN Tattoo Setup Engine",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Tattoo needle gauge chart logic, rotary machine voltage for lining, and best stroke for black and grey realism — DIALED-IN maps style, technique, and machine to stroke-to-voltage recommendations with long-stroke soft-shading safeguards.",
  url: `${origin}/`,
  keywords: [
    "Tattoo needle gauge chart",
    "Rotary machine voltage for lining",
    "Best stroke for black and grey realism",
    "Stroke-to-voltage",
    "Curved magnum technical range",
  ],
  featureList: [
    "Computes adjusted voltage from machine baseline when stroke ≥ 4.0mm and technique is Soft Shading (−1.5 V, clamped to machine envelope).",
    "Surfaces cartridge results as technical ranges (e.g., #10 07-11 Curved Magnum) without brand SKUs.",
  ],
};

export const dialedInHowToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How DIALED-IN maps stroke to voltage for tattooing",
  description:
    "Step-through logic used by the DIALED-IN engine for rotary tattoo machines: baseline envelope, effective stroke length, and automatic voltage reduction for soft shading on long-stroke machines.",
  totalTime: "PT2M",
  tool: [
    {
      "@type": "HowToTool",
      name: "Rotary tattoo machine with documented stroke length and voltage envelope",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Establish machine baseline envelope",
      text: "Read the machine default_volt_range JSON (min, max, baseline volts) for the selected rotary machine.",
    },
    {
      "@type": "HowToStep",
      name: "Determine effective stroke length",
      text: "Take the maximum value from stroke_options (millimeters). Values at or above 4.0mm are treated as long stroke for soft-tissue safeguards.",
    },
    {
      "@type": "HowToStep",
      name: "Apply stroke-to-voltage guard for Soft Shading",
      text: "If effective stroke ≥ 4.0mm and the technique is Soft Shading, subtract 1.5V from the baseline before clamping to the machine min/max envelope to reduce skin trauma risk.",
    },
    {
      "@type": "HowToStep",
      name: "Select cartridge by technical range",
      text: "Use the style preset ideal_needle_range expressed as gauge, grouping span, and configuration (e.g., #10 07-11 Curved Magnum) rather than a branded cartridge SKU.",
    },
  ],
};
