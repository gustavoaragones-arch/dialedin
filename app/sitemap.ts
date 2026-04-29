import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seoSite";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = SITE_URL;

  const weekly = [
    "/how-it-works",
    "/science",
    "/blog",
    "/blog/needle-geometry",
    "/blog/stroke-physics",
    "/blog/cartridge-drag",
    "/blog/hand-speed-sync",
    "/blog/hardware-tiers",
    "/blog/needle-hang-depth",
    "/blog/hertz-vs-volts",
    "/blog/the-membrane-tax",
    "/terms",
    "/privacy",
    "/responsible-ai",
  ] as const;

  return [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    ...weekly.map((path) => ({
      url: `${base}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "/how-it-works" ? 0.9 : 0.75,
    })),
  ];
}
