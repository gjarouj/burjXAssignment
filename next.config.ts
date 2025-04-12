import type { NextConfig } from 'next';

const path = require('path');

const nextConfig: NextConfig = {
  // Rewrites configuration for proxying API requests
  async rewrites() {
    return [
      {
        source: '/api/coingecko/:path*',
        destination: 'https://coingeko.burjx.com/:path*',
      },
    ];
  },

  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
        pathname: '/**', // Allow all paths from that domain
      },
    ],
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'src')],
  //   additionalData: `@import "styles/_variables.scss";`,
  // },
};

export default nextConfig;
