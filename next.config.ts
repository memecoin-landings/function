import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  // // ОТКЛЮЧАЕМ next/image
  // images: {
  //   unoptimized: true,
  // },
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
