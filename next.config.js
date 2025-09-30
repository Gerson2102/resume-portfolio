/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: "out",
  // Increase timeout for complex pages during static generation
  staticPageGenerationTimeout: 120,
  images: {
    unoptimized: true,
  },
  // Suppress wallet extension errors during development
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // For GitHub Pages deployment under a custom domain, leave these commented
  // For deployment under username.github.io/repository-name, uncomment and adjust:
  // basePath: '/repository-name',
  // assetPrefix: '/repository-name/',
};

// MDX configuration
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX(nextConfig);
