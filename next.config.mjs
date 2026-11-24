/**
 * Next.js config — Matroxx official website.
 *
 * Static export for GitHub Pages (project site). The basePath rule is the
 * detail that makes project Pages work: production builds use
 * /matroxx-website, PR preview builds use /matroxx-website/preview/pr-<n>.
 * See ARCHITECTURE.md §9.
 */
const basePath = process.env.NEXT_BASE_PATH ?? "/matroxx-website";

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: basePath,
  basePath,
  images: { unoptimized: true },
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
