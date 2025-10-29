import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // BASE_URL: 'https://floranzafashion.com/api',
     BASE_URL: 'https://floranza.emosha.com/api',
     G_ID:'G-V14GYBXLN1'

  },
  images: {
    remotePatterns: [new URL('https://www.floranzafashion.com/**'), new URL('https://cdn.floranzafashion.com/**')],
  }
};

export default nextConfig;
