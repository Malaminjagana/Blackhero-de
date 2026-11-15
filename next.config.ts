
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set NEXT_PUBLIC_BASE_PATH only for deployments hosted below a repository path.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",

  // Keep the existing public image URLs unchanged.
  images: {
    unoptimized: true,
  },

  // Generate routes as folders with index.html
  trailingSlash: true,
};

export default nextConfig;
