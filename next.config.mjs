/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['victorsingh.ca', 'keebgram-backend.azurewebsites.net'], // Add your external image domain here
  },
};

export default nextConfig;
