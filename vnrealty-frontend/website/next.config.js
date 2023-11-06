/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "localhost:3000",
      "localhost:4000",
      "vnrealty-admin-demo.grex-solutions.com",
    ],
  },
  devIndicators: {
    buildActivity: false,
  },
  env: {
    DOMAIN: process.env.DOMAIN,
  },
};

module.exports = nextConfig;
