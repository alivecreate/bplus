/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "localhost:3000",
      'file://'
    ],
  },
  
  experimental: {
    serverActions: true,
  },
};


module.exports = nextConfig;
