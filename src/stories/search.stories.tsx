import { postPreview } from "../../test/post-preview-fixture"
import { searchUrl, staticQueryData } from "../../test/static-query-data"
import SearchPage from "../pages/search"
import { http } from "msw"

export default {
  title: "Pages/Search",
  component: SearchPage,
  parameters: {
    layout: "fullscreen",
    staticQuery: staticQueryData,
    storyshots: false,
  },
}

export const Search = {
  args: {
    location: {
      pathname: "/search",
      search: "?q=search-query",
    },
  },

  parameters: {
    msw: {
      handlers: [
        http.post(
          searchUrl,
          () =>
            new Response(
              JSON.stringify({
                data: {
                  search: {
                    page: "page0",
                    next: "next",
                    result: [postPreview(0)],
                  },
                },
              })
            )
        ),
      ],
    },
  },
}
