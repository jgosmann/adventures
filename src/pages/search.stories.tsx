import React from "react"
import { ComponentStory } from "@storybook/react"
import { postPreview } from "../../test/post-preview-fixture"
import { searchUrl, staticQueryData } from "../../test/static-query-data"
import SearchPage, { SearchPageProps } from "./search"
import { rest } from "msw"

export default {
  title: "Pages/Search",
  component: SearchPage,
  parameters: {
    layout: "fullscreen",
    staticQuery: staticQueryData,
    storyshots: false,
  },
}

const Template: ComponentStory<typeof SearchPage> = (args: SearchPageProps) => (
  <SearchPage {...args} />
)

export const Search = Template.bind({})
Search.args = {
  location: {
    pathname: "/search",
    search: "?q=search-query",
  },
}
Search.parameters = {
  msw: {
    handlers: [
      rest.post(searchUrl, (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
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
}
