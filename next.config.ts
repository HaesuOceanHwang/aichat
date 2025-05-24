import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    domains: [
      'lh3.googleusercontent.com',
      'ssl.pstatic.net',
      'phinf.pstatic.net'
    ],
  },
};

export default nextConfig;
