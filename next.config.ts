import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "dialedin.ink" }],
        destination: "https://tattoomachinesetup.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.dialedin.ink" }],
        destination: "https://tattoomachinesetup.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.tattoomachinesetup.com" }],
        destination: "https://tattoomachinesetup.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
