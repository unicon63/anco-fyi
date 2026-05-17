/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local /public assets with next/image
    unoptimized: false,
  },
  // Allow external image domains if needed in future
  // images: { domains: [] }
};

export default nextConfig;
