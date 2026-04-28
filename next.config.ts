import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  sassOptions: {
    // Izinkan SASS resolve langsung dari node_modules (tanpa ~)
    loadPaths: [path.join(process.cwd(), 'node_modules')],
    silenceDeprecations: ['legacy-js-api'],
  },
  // Turbopack config (default di Next.js 16)
  turbopack: {},
}

export default nextConfig
