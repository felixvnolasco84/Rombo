import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "placehold.co",
      "img.clerk.com",
    ],
  },
};

export default withNextVideo(nextConfig);
