import { getCollection } from "astro:content"
import * as pagefind from "pagefind"
import { plaintext } from "../../mdast"
import { reverseGeocode } from "../../geocode"

export async function getStaticPaths() {
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
  return files.map(file => ({
    params: { id: file.path },
    props: { content: file.content },
  }))
}

export function GET({ params, props, request }) {
  const response = new Response(props.content)
  if (params.id.endsWith(".js")) {
    response.headers.set("Content-Type", "text/javascript")
  }
  return response
}
