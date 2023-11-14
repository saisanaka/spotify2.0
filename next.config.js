/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  domains: [
    'https://accounts.spotify.com/'
  ],
}

module.exports = nextConfig
module.exports = {
  env: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};
