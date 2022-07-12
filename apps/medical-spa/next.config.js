// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
// const { withPlaiceholder } = require('@plaiceholder/next');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  swcMinify: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'scontent-iad3-1.cdninstagram.com',
      'video-iad3-1.cdninstagram.com',
    ],
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

// module.exports = withPlaiceholder(withNx(nextConfig));
module.exports = withNx(nextConfig);
