import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // "Components" was renamed SurgiCore; keep old links working.
  async redirects() {
    return [
      { source: "/products/components", destination: "/products/surgicore", permanent: true },
      { source: "/products/components/:item", destination: "/products/surgicore/:item", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
