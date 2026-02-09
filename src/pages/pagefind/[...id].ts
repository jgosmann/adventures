import { getCollection } from "astro:content"

export async function getStaticPaths() {
  const searchFragments = await getCollection("searchFragments")
  return searchFragments.map(fragment => ({
    params: { id: fragment.id },
    props: { content: fragment.data.content },
  }))
}

export function GET({ params, props, request }) {
  const response = new Response(props.content)
  if (params.id.endsWith(".js")) {
    response.headers.set("Content-Type", "text/javascript")
  }
  return response
}
