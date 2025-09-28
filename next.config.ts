import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias.canvas = false;
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { icon: true },
        },
      ],
    });

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
