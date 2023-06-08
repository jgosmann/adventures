import { staticQueryData } from "../../test/static-query-data"
import PostListTemplate from "../templates/PostList"
import { postPreview } from "../../test/post-preview-fixture"

export default {
  title: "Templates/Post List",
  component: PostListTemplate,
  parameters: {
    layout: "fullscreen",
    staticQuery: staticQueryData,
  },
}

export const PostList = {
  args: {
    data: { allFile: { nodes: [postPreview(0), postPreview(1)] } },
    location: {
      pathname: "/",
      ancestorOrigins: {} as DOMStringList,
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      port: "",
      protocol: "http",
      search: "",
      assign: () => undefined,
      reload: () => undefined,
      replace: () => undefined,
      state: null,
    },
    pageContext: {
      prevPage: "prev",
      nextPage: "next",
    },
  },
}
