import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jnfjrwprskhuiitrxltv.supabase.co",
      },
    ],
  },
};

export default nextConfig;
