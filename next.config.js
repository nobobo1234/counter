/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  basePath: process.env.NODE_ENV === "production" ? process.env.BASE_PATH : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/counter/" : "",
};

module.exports = nextConfig;
