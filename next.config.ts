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
  eslint: {
    ignoreDuringBuilds: true,  // 빌드 중 ESLint 검사 비활성화
  },
};

export default nextConfig;
