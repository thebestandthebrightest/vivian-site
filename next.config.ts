import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/work", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      { source: "/resume", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
