// @ts-check
import { defineConfig } from "astro/config"

import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  image: {
    breakpoints: [750, 1080, 1280, 1668, 2048],
  },
  vite: {
    server: {
      fs: {
        deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/!(annex)"],
      },
    },
  },
})
