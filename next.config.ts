import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/about.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/activities.html",
        destination: "/news?type=activity",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
