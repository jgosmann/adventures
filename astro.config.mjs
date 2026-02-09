// @ts-check
import { defineConfig } from "astro/config"

import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import dsv from "@rollup/plugin-dsv"
import yaml from "@rollup/plugin-yaml"

// https://astro.build/config
export default defineConfig({
  site: "https://adventures.jgosmann.de",
  integrations: [mdx(), react()],
  image: {
    breakpoints: [750, 1080, 1280, 1668, 2048],
  },
  vite: {
    assetsInclude: ["**/*.gpx", "**/*.m4v"],
    plugins: [dsv(), yaml()],
    server: {
      fs: {
        deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/!(annex)"],
      },
    },
  },
})
