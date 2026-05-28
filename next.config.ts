import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "leni-whitford.agence-riveal.site",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
