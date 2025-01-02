// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // Add configuration for handling uploads
  async headers() {
    return [
      {
        // Allow access to files in the uploads directory
        source: "/uploads/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },
  // Configure webpack to handle PDF files
  webpack(config) {
    config.module.rules.push({
      test: /\.pdf$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
