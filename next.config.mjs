/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            // admin path redirect to dashboard
            {
                source: '/admin',
                destination: '/admin/dashboard',
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
