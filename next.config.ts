
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set NEXT_PUBLIC_BASE_PATH only for deployments hosted below a repository path.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",

  // Use Next.js image optimization on Vercel; preserve static URLs on other hosts.
  images: {
    unoptimized: process.env.VERCEL !== "1",
  },

  // Generate routes as folders with index.html
  trailingSlash: true,
};

export default nextConfig;
