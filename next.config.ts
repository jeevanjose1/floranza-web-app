import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BASE_URL: 'https://floranza.emosha.com/api'
  },
  images: {
    remotePatterns: [new URL('https://www.floranzafashion.com/**'), new URL('https://bucket-floranza.s3.ap-south-1.amazonaws.com/**')],
  }
};

export default nextConfig;
