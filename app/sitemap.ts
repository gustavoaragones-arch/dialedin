import type { MetadataRoute } from "next";

const base = "https://dialedin.ink";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/how-it-works`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/blog/needle-geometry`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/blog/stroke-physics`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
