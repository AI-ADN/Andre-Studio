import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AGENTS.md is the studio's own operating manual; never let `next dev` rewrite it.
  agentRules: false,
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
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
