import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "freight.cargo.site",
      },
      {
        protocol: "https",
        hostname: "i1.sndcdn.com",
      },
      {
        protocol: "https",
        hostname: "i2.sndcdn.com",
      },
      {
        protocol: "https",
        hostname: "i3.sndcdn.com",
      },
      {
        protocol: "https",
        hostname: "i4.sndcdn.com",
      },
    ],
  },
  transpilePackages: ["globedots"],
};

export default nextConfig;
