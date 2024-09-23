/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // admin path redirect to dashboard
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
    ];
  },
  //   reactStrictMode: false,
};

export default nextConfig;
