/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Always use the basePath for GitHub Pages
  basePath: '/simple-calculation',
  // Disable trailing slashes to ensure consistent URL behavior
  trailingSlash: false,
  // Ensure assets are properly prefixed with basePath
  assetPrefix: '/simple-calculation',
  // Ensure CSS is properly processed
  webpack: (config) => {
    return config;
  },
  // Add custom environment variables here (but not NODE_ENV)
  env: {
    NEXT_PUBLIC_BASE_PATH: '/simple-calculation',
  },
};

export default nextConfig;
