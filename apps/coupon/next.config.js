// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['images.ctfassets.net', 's.gravatar.com'],
  },
  // eslint: {
  //   // Warning: Dangerously allow production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true,
  // },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/api/auth/login',
        permanent: true,
      },
      {
        source: '/logout',
        destination: '/api/auth/logout',
        permanent: true,
      },
    ];
  },
  experimental: {
    // concurrentFeatures: true,
    // serverComponents: true,
  },
  future: {
    strictPostcssConfiguration: true,
  },
};

module.exports = withNx(nextConfig);
