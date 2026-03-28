import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: !Boolean(process.env.LOCAL_DEV),
  },
  typescript:{
    ignoreBuildErrors:!Boolean(process.env.LOCAL_DEV)
  },
  async redirects() {
    return [];
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': [
        '.cts',
        '.cjs',
      ],
      '.js': [
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
      ],
      '.mjs': [
        '.mts',
        '.mjs',
      ],
    };

    return webpackConfig;
  },
};

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
});
