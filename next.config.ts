import type { NextConfig } from "next";

// DATABASE_URL is read from the environment at runtime (.env locally, the
// container env in production). Do not put it under `env` here: Next inlines
// those values into the build, which would pin every image to one database.
const nextConfig: NextConfig = {
  // No next/image in use; this turns off the /_next/image optimizer endpoint,
  // which is public attack surface on a self-hosted server.
  images: { unoptimized: true },
};

export default nextConfig;
