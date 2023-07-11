/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(mp4)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "static/videos/", // Output path for the processed MP4 files
              publicPath: "/_next/static/videos/", // Public path for the processed MP4 files
              esModule: false, // Ensure compatibility with Next.js 13
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      }
    );

    return config;
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
