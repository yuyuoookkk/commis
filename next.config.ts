import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 👈 ADD THIS

  images: {
    unoptimized: true, // 👈 ALSO ADD THIS (important for static export)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
