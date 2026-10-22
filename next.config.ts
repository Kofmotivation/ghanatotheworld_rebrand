import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "freight.cargo.site",
      },
    ],
  },
  transpilePackages: ["globedots"],
};

export default nextConfig;
