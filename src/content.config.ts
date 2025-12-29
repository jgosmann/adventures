import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./content/posts" }),
  schema: ({ image }) =>
    z.object({
      background: z.preprocess(val => `images/${val}`, image()),
      categories: z.array(z.string()),
      date: z.date(),
      title: z.string(),
    }),
})

export const collections = { posts }
