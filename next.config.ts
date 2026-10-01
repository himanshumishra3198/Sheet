import type { NextConfig } from "next";

// The sheet is fully static: `next build` writes plain HTML/CSS/JS to out/,
// which nginx serves (see dockerfile/). There is no Node server at runtime.
const nextConfig: NextConfig = {
  output: "export",
  // No image optimizer without a server.
  images: { unoptimized: true },
};

export default nextConfig;
