/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.EASYBATT_SANDBOX === "1" ? ".next-sandbox" : ".next",
};

export default nextConfig;
