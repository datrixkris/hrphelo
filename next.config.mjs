/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      // admin path redirect to dashboard
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
      // client path redirect to dashboard
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  //   reactStrictMode: false,
};

export default nextConfig;
