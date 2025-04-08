import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['knex'],
   images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ae04.alicdn.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'ae01.alicdn.com',
          pathname: '/**',
        }
      ],
    }, 
};

export default nextConfig;
