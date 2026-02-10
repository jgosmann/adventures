import { defineCollection, getCollection } from "astro:content"
import { glob, type Loader, type LoaderContext } from "astro/loaders"
import { z } from "astro/zod"
import * as pagefind from "pagefind"
import { plaintext } from "./mdast"
import { reverseGeocode } from "./geocode"

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./content/posts" }),
  schema: ({ image }) =>
    z.object({
      background: z.preprocess(val => `images/${val}`, image()),
      categories: z.array(z.string()),
      date: z.date(),
      publishdate: z.date(),
      favorite: z.boolean().optional(),
      map: z.string().regex(/^[-+]?\d+(\.\d*)?\s*,\s*[-+]?\d+(\.\d*)?$/),
      title: z.string(),
    }),
})

const legal = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./content/legal" }),
  schema: z.object({
    title: z.string(),
  }),
})

export const collections = { posts, legal }
