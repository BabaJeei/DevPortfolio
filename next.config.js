/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg|m4a|glb)$/i, // Add more extensions if needed
      type: "asset/resource", // Use Webpack 5 built-in asset handling
    });

    return config;
  },
};

module.exports = nextConfig;
