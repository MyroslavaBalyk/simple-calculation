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
};

export default nextConfig;
