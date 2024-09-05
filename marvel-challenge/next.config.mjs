import { createRequire } from "module";
import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "i.annihil.us",
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true, // Forzar el uso de SWC para la transformación
  },
  webpack(config, { dev }) {
    if (dev) {
      // Configuración para desarrollo
      config.optimization.minimize = false;
      // Configura loaders si necesitas manejar assets específicos en desarrollo
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      });
    } else {
      // Configuración para producción
      config.optimization.minimize = true;
      // Configura loaders si necesitas manejar assets específicos en producción
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "[hash].[ext]",
          },
        },
      });
    }

    return config;
  },
};

// Envuelve la configuración con withBundleAnalyzer
const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);

export default withBundleAnalyzerConfig;
