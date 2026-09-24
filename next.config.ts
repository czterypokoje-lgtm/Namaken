import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP only: AVIF is smaller but much slower to encode, and Next only
    // pre-computes it on request (worst on first load / in dev). WebP still
    // beats the original jpg/png by a wide margin without that encode cost.
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
