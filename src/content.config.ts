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

function pagefindLoader(): Loader {
  return {
    name: "pagefind-loader",
    load: async (context: LoaderContext) => {
      const [posts, { index }] = await Promise.all([
        getCollection("posts"),
        pagefind.createIndex({}),
      ])
      if (!index) {
        throw new Error("Failed to create search index")
      }
      await Promise.all(
        posts.map(async post => {
          const [lat, long] = JSON.parse(`[${post.data.map}]`)
          await index.addCustomRecord({
            url: `/posts/${post.id}`,
            content: [
              post.data.title,
              await reverseGeocode({ lat, long }),
              post.data.categories.join(", "),
              plaintext(post.body ?? ""),
            ].join("\n"),
            language: "en",
            meta: {
              id: post.id,
              title: post.data.title,
            },
            sort: {
              date: post.data.date.getTime().toString(),
            },
          })
        })
      )
      const { errors, files } = await index.getFiles()
      if (errors.length > 0) {
        throw new Error(`Indexing errors: ${errors}`)
      }
      for (const file of files) {
        context.store.set({
          id: file.path,
          data: { content: file.content },
        })
      }
    },
    schema: z.object({
      content: z.instanceof(Uint8Array),
    }),
  }
}
const searchFragments = defineCollection({
  loader: pagefindLoader(),
})

export const collections = { posts, legal, searchFragments }
