// @ts-check
import { defineConfig } from "astro/config"

import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  vite: {
    server: {
      fs: {
        deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/!(annex)"],
      },
    },
  },
})
