import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Brand pages moved from /merken/<merk> to /autosleutel-bijmaken/<merk>
      // so the URL carries the phrase people actually search for, which is
      // what all three ranking competitors do. Permanent, so the old URLs
      // pass their (small — they were only correct from launch day) equity on
      // rather than 404ing. /merken itself stays as the hub listing them.
      {
        source: "/merken/:merk",
        destination: "/autosleutel-bijmaken/:merk",
        permanent: true,
      },
    ];
  },
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
