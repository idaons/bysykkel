/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: {
      displayName: true,
    },
  },
  pageExtensions: ["page.tsx", "page.ts"],
};

module.exports = nextConfig;
