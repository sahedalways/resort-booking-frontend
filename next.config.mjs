/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "images.unsplash.com",
      "yourdomain.com",
    ],

    formats: ["image/avif", "image/webp"],

    minimumCacheTTL: 60,
  },
};

export default nextConfig;
