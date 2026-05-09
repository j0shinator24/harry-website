import type { NextConfig } from "next"
import path from "node:path"

const nextConfig: NextConfig = {
  // Static export so the build output is a plain `out/` folder of HTML +
  // assets that Cloudflare Pages serves directly. The site has no API
  // routes, server actions, or runtime data fetching, so we get full
  // edge-cache wins with zero serverless overhead.
  output: "export",
  // Required for static export — Cloudflare Pages serves the unoptimized
  // <img> tags. CDN handles caching/compression.
  images: {
    unoptimized: true,
  },
  // Trailing slashes give clean Pages URLs like /about/ instead of /about
  // and avoid the redirect dance.
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  // NOTE: security headers are set via public/_headers (Cloudflare Pages
  // syntax). Next.js config-level headers() doesn't apply to a static
  // export, so configuring it there would be silently ignored.
}

export default nextConfig
