import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL:
      "postgresql://postgres:admin@localhost:5432/mydb?schema=public",
  },
};

export default nextConfig;
