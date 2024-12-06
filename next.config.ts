import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '', 
        pathname: '/**', // permet d'accepter tous les chemins d'images de Cloudinary
      },
    ],
  },
};

export default nextConfig;
