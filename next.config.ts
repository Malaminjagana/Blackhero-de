
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate a static website for GitHub Pages
  output: "export",

  // Set NEXT_PUBLIC_BASE_PATH only for deployments hosted below a repository path.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",

  // Required for static image hosting with next/image
  images: {
    unoptimized: true,
  },

  // Generate routes as folders with index.html
  trailingSlash: true,
};

export default nextConfig;
