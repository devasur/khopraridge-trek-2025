/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/khopraridge-trek-2025' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/khopraridge-trek-2025/' : '',
}

module.exports = nextConfig