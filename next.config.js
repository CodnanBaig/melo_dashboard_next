/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  // Disable static generation to avoid SSR issues with authentication
  output: 'standalone',
  experimental: {
    // Force all pages to be dynamic
    staticPageGenerationTimeout: 0,
  },
}

module.exports = nextConfig 