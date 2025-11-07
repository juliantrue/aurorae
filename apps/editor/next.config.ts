import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Enable typedRoutes only for production to avoid dev ENOENT on routes-manifest
  typedRoutes: process.env.NODE_ENV === 'production',
  // Ensure serverless deployments include the data directory when tracing files.
  // For some hosts (e.g., Vercel) this helps bundle ../../data into the server output.
  outputFileTracingIncludes: {
    // Key matches any route under /api/rite
    '/api/rite': ['../../data/**/*'],
  },
};

export default nextConfig;
