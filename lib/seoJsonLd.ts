/** Site-wide JSON-LD (@graph: SoftwareApplication + HowTo) for search engines. */

export const dialedinSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://dialedin.ink/#setup-engine",
      name: "DialedIn Setup Engine",
      operatingSystem: "All",
      applicationCategory: "TechnicalCalculator",
      description:
        "Adaptive tattoo setup engine that syncs machine stroke, voltage, and needle configuration based on artistic style.",
      url: "https://dialedin.ink/",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Adaptive Stroke Logic",
        "Style-to-Voltage Mapping",
        "Needle Configuration Guidance",
        "Real-time CPS/Hertz Conversion",
      ],
    },
    {
      "@type": "HowTo",
      "@id": "https://dialedin.ink/#howto-dial-in",
      name: "How to Dial In Your Tattoo Machine Settings",
      description:
        "Select style and machine, sync hand speed to CPS, and read stroke-aware voltage guidance from the DialedIn Setup Engine.",
      step: [
        {
          "@type": "HowToStep",
          text: "Select your tattoo style (e.g., Fine Line, Realism) to set the baseline logic.",
        },
        {
          "@type": "HowToStep",
          text: "Select your machine from the library to establish stroke and voltage limits.",
        },
        {
          "@type": "HowToStep",
          text: "Adjust the Hand Speed slider to sync motor frequency with your physical movement.",
        },
        {
          "@type": "HowToStep",
          text: "Calibrate your power supply to the recommended CPS and voltage output.",
        },
      ],
    },
  ],
} as const;
