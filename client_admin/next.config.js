/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
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
    });

    return config;
  },
};

module.exports = nextConfig;
