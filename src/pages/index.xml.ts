import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { excerpt } from "../mdast"

export async function GET(context) {
  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  )
  return rss({
    title: "Jan's outdoor adventures",
    description:
      "Jan's blog about adventures experienced outdoors and while travelling.",
    site: context.site,
    items: posts.map(post => {
      return {
        title: post.data.title,
        description: excerpt(post.body ?? ""),
        pubDate: post.data.publishdate,
        link: `/posts/${post.id}`,
        categories: post.data.categories,
      }
    }),
    customData: `<lastBuildDate>${new Date(
      Date.now()
    ).toUTCString()}</lastBuildDate>`,
  })
}
