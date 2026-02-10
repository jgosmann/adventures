import { defineCollection, getCollection, type DataEntry } from "astro:content"
import { glob, type Loader, type LoaderContext } from "astro/loaders"
import { z } from "astro/zod"
import { plaintext } from "./mdast"
import readingTime from "reading-time"

function postsLoader(): Loader {
  const rawPostsLoader = glob({ pattern: "**/*.mdx", base: "./content/posts" })
  return {
    name: "posts-loader",
    async load(context: LoaderContext) {
      const decoratedStore = {
        ...context.store,
        set: (entry: DataEntry) => {
          return context.store.set({
            ...entry,
            data: {
              ...entry.data,
              readingTime: readingTime(plaintext(entry.body ?? "")),
            },
          })
        },
      }
      await rawPostsLoader.load({
        ...context,
        store: decoratedStore,
        parseData: props => {
          return context.parseData({
            ...props,
            data: { ...props.data, readingTime: { minutes: 0 } },
          })
        },
      })
    },
    schema: z.object({
      readingTime: z.object({ minutes: z.number().nonnegative() }),
    }),
  }
}

const posts = defineCollection({
  loader: postsLoader(),
  schema: ({ image }) =>
    z.object({
      background: z.preprocess(val => `images/${val}`, image()),
      categories: z.array(z.string()),
      date: z.date(),
      publishdate: z.date(),
      readingTime: z.object({ minutes: z.number().nonnegative() }),
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
