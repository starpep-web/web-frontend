require('dotenv').config();

const filteredEnvEntries = Object.entries(process.env).filter(([k]) => k.startsWith('NEXT_APP_'));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: Object.fromEntries(filteredEnvEntries)
};

module.exports = nextConfig;
