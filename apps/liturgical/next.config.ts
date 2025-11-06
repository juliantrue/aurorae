import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Enable typedRoutes only for production to avoid dev ENOENT on routes-manifest
  typedRoutes: process.env.NODE_ENV === 'production'
};

export default nextConfig;
