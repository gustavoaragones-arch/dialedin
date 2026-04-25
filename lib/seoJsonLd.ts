/** Site-wide JSON-LD (@graph: SoftwareApplication + HowTo) for search engines. */

export const dialedinSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "DialedIn Tattoo Setup Engine",
      operatingSystem: "All",
      applicationCategory: "HealthApplication",
      description:
        "Relational tattoo setup software: Hertz-to-volt readout framing for ACUS M1/M2, kinetic (hammer-effect) guards on long stroke, hand-speed to CPS sync, and brand-bridge needle glossaries. Models reciprocation so physical CPS stays consistent across hardware tiers.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "ACUS M1/M2 Hertz-to-Volt Conversion",
        "Kinetic Impact Safety Guard",
        "Hand Speed to CPS Synchronization",
        "Brand Bridge Needle Translation",
      ],
    },
    {
      "@type": "HowTo",
      name: "How to Dial In Your Tattoo Machine Settings",
      description:
        "Hertz-to-volt readout framing for ACUS-class machines, CPS derived from hand-speed-adjusted voltage, and stroke-aware kinetic guards—indexed for technical Q&A.",
      step: [
        {
          "@type": "HowToStep",
          text: "Select your tattoo style (e.g., Fine Line, Realism) to set the baseline logic.",
        },
        {
          "@type": "HowToStep",
          text: "Select your machine from the library to establish stroke-cycle limits.",
        },
        {
          "@type": "HowToStep",
          text: "Adjust the Hand Speed slider to sync motor frequency with your physical movement.",
        },
        {
          "@type": "HowToStep",
          text: "Calibrate your power supply to the recommended CPS and Voltage output.",
        },
      ],
    },
  ],
} as const;
