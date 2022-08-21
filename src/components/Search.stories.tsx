import React from "react"
import { ComponentStory } from "@storybook/react"
import { SearchView, SearchViewProps } from "./Search"
import {
  mockGatsbyImage,
  mockImageFileNode,
} from "../../test/gatsby-image-fixture"

export default {
  title: "Controls/Search",
  component: SearchView,
}

const postPreview = (id: number) => ({
  pagePath: `/post/url${id}`,
  childMdx: {
    id: `id${id}`,
    background: mockImageFileNode(
      mockGatsbyImage({
        url: "background.png",
        width: 300,
        height: 250,
        layout: "fixed",
      })
    ),
    frontmatter: {
      title: `Post Title ${id}`,
      date: "2022-08-21 13:37",
      categories: ["Box 1", "Box 2"],
    },
    timeToRead: 42,
  },
})

const Template: ComponentStory<typeof SearchView> = (args: SearchViewProps) => (
  <SearchView {...args} />
)

export const Loading = Template.bind({})
Loading.args = {
  data: [],
  loading: true,
  error: false,
  loadMore: () => undefined,
}

export const FirstPage = Template.bind({})
FirstPage.args = {
  data: [postPreview(0)],
  loading: false,
  error: false,
  loadMore: () => undefined,
  nextPage: true,
}

export const LoadingMore = Template.bind({})
LoadingMore.args = {
  data: [postPreview(0)],
  loading: true,
  error: false,
  loadMore: () => undefined,
  nextPage: true,
}

export const AllResults = Template.bind({})
AllResults.args = {
  data: [postPreview(0), postPreview(1)],
  loading: false,
  error: false,
  loadMore: () => undefined,
}

export const NoResults = Template.bind({})
NoResults.args = {
  data: [],
  loading: false,
  error: false,
  loadMore: () => undefined,
}

export const Error = Template.bind({})
Error.args = {
  data: [],
  loading: false,
  error: true,
  loadMore: () => undefined,
}

export const ErrorWithResult = Template.bind({})
ErrorWithResult.args = {
  data: [postPreview(0)],
  loading: false,
  error: true,
  loadMore: () => undefined,
}
