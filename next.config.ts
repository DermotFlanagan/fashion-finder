import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
