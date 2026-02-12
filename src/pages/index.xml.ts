import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { excerpt } from "../mdast"
import { getImage } from "astro:assets"

export async function GET(context) {
  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  )
  return rss({
    title: "Jan's outdoor adventures",
    description:
      "Jan's blog about adventures experienced outdoors and while travelling.",
    site: context.site,
    items: await Promise.all(
      posts.map(async post => {
        return {
          title: post.data.title,
          description: excerpt(post.body ?? ""),
          pubDate: post.data.publishdate,
          link: `/posts/${post.id}`,
          categories: post.data.categories,
          customData: `<og:image>${new URL(
            (await getImage({ src: post.data.background, width: 800 })).src,
            context.site
          )}</og:image>`,
        }
      })
    ),
    xmlns: {
      og: "http://ogp.me/ns#",
    },
    customData: `<lastBuildDate>${new Date(
      Date.now()
    ).toUTCString()}</lastBuildDate>`,
  })
}
