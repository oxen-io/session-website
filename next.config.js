const withPlugins = require('next-compose-plugins');
const withSvgr = require('@newhighsco/next-plugin-svgr');

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' ${
    process.env.NODE_ENV == 'development'
      ? "'unsafe-eval' 'unsafe-inline' "
      : ''
  }*.ctfassets.net *.youtube.com *.twitter.com;
  child-src 'self' *.ctfassets.net *.youtube.com *.twitter.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src 'self' blob: data: *.ctfassets.net *.youtube.com *.twitter.com;
  media-src 'self';
  connect-src *;
  font-src 'self' blob: data: fonts.gstatic.com maxcdn.bootstrapcdn.com;
  worker-src 'self' blob:;
`;

const securityHeaders = () => {
  const headers = [
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on',
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    },
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block',
    },
    {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN',
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
    {
      key: 'Content-Security-Policy',
      value: ContentSecurityPolicy.replace(/\n/g, ''),
    },
  ];
  return headers;
};

const config = {
  // .env.local doesn't load itself
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_PREVIEW_TOKEN: process.env.CONTENTFUL_PREVIEW_TOKEN,
    CAMPAIGN_MONITOR_CLIENT_ID: process.env.CAMPAIGN_MONITOR_CLIENT_ID,
    CAMPAIGN_MONITOR_API_KEY: process.env.CAMPAIGN_MONITOR_API_KEY,
    CAMPAIGN_MONITOR_LIST_API_ID: process.env.CAMPAIGN_MONITOR_LIST_API_ID,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders(),
      },
    ];
  },
  images: {
    domains: ['downloads.ctfassets.net', 'images.ctfassets.net'],
  },
  serverRuntimeConfig: {
    redirects: [
      {
        source: '/android',
        destination:
          'https://play.google.com/store/apps/details?id=network.loki.messenger',
        permanent: true,
      },
      {
        source: '/apk',
        destination: 'https://github.com/oxen-io/session-android/releases',
        permanent: true,
      },
      {
        source: '/iphone',
        destination:
          'https://apps.apple.com/app/session-private-messenger/id1470168868?ls=1',
        permanent: true,
      },
      {
        source: '/whitepaper',
        destination: 'https://arxiv.org/pdf/2002.04609.pdf',
        permanent: true,
      },
    ],
  },
  async redirects() {
    return this.serverRuntimeConfig.redirects;
  },
  async rewrites() {
    return [
      {
        source: '/feed',
        destination: '/api/feed/rss',
      },
      {
        source: '/feed/:slug',
        destination: '/api/feed/:slug',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/linux',
        destination: '/api/download/linux',
      },
      {
        source: '/lightpaper/pdf',
        destination: '/api/lightpaper',
      },
      {
        source: '/login',
        destination: '/api/login',
      },
      {
        source: '/logout',
        destination: '/api/logout',
      },
      {
        source: '/mac',
        destination: '/api/download/mac',
      },
      {
        source: '/windows',
        destination: '/api/download/windows',
      },
      {
        source: '/blog/:slug',
        destination: '/:slug',
      },
    ];
  },
  target: 'serverless',
};

module.exports = withPlugins([withSvgr], config);
