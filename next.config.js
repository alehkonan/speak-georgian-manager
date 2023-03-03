/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['sjvxbuqvopcxcdetqebf.supabase.co'],
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/words',
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
