/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/timeline',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
