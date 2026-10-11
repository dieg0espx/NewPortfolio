/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Screenshots are long full-page captures; unoptimized keeps export simple.
    unoptimized: true,
  },
};

export default nextConfig;
