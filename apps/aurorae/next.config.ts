import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: process.env.NODE_ENV === 'production'
};

export default nextConfig;
