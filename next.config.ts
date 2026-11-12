
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate a static website for GitHub Pages
  output: "export",

  // GitHub project repository path
  // Only apply the prefix during GitHub Actions deployment
  basePath: process.env.GITHUB_ACTIONS
    ? "/Blackhero-de"
    : "",

  // Required for static image hosting with next/image
  images: {
    unoptimized: true,
  },

  // Generate routes as folders with index.html
  trailingSlash: true,
};

export default nextConfig;
