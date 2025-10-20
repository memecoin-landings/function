import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {
  images: {
    domains: process.env["IMAGE_HOSTS"]?.split(",") ?? [],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  experimental: {
    viewTransition: true, // Включаем API
  },
};

export default nextConfig;
