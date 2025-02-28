require('dotenv').config();

const nextConfig = {
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
  },
  experimental: {
    appDir: true, // 🔹 Habilita el soporte para rutas en `app/`
  },
};

module.exports = nextConfig;

