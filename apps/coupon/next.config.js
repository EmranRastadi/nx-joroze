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
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['images.ctfassets.net', 's.gravatar.com'],
  },
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
    runtime: 'experimental-edge',
  },
};

module.exports = withNx(nextConfig);
