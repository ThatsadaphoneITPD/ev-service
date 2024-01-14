import './src/env.mjs';
/** @type {import('next').NextConfig} */
const nextConfig = {
  // skipTrailingSlashRedirect: true,
  // skipMiddlewareUrlNormalize: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/ecommerce',
  //       permanent: true,
  //     },
  //   ];
  // },
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/api/portraits/**',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        // port: '',
        // pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        // port: '',
        // pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // port: '',
        // pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/redqteam.com/isomorphic-furyroad/public/**',
      },
      {
        protocol: 'https',
        hostname: 'isomorphic-furyroad.s3.amazonaws.com',
      },
    ],
  },
  reactStrictMode: false,

  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API}/:path*`,
  //     },
  //     {
  //       source: '/api2/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API2}/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
