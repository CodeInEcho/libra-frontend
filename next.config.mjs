/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ['img.x2y2.io', 'image.api.playstation.com'] },
  experimental: {
    appDir: true,
  },
}

export default nextConfig
