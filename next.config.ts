import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a minimal, self-contained server bundle for the GCP Cloud Run image.
  output: "standalone",
  reactStrictMode: true,
  images: {
    // Prefer modern formats for any raster assets (headshot, project covers).
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      // Serve the resume PDF at the clean /resume URL.
      { source: "/resume", destination: "/resume.pdf" },
    ];
  },
};

export default nextConfig;
