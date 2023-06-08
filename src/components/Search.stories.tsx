import { SearchView } from "./Search"
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
    fields: {
      timeToRead: { minutes: 42 },
    },
  },
})

export const Loading = {
  args: {
    data: [],
    loading: true,
    error: false,
    loadMore: () => undefined,
  },
}

export const FirstPage = {
  args: {
    data: [postPreview(0)],
    loading: false,
    error: false,
    loadMore: () => undefined,
    nextPage: true,
  },
}

export const LoadingMore = {
  args: {
    data: [postPreview(0)],
    loading: true,
    error: false,
    loadMore: () => undefined,
    nextPage: true,
  },
}

export const AllResults = {
  args: {
    data: [postPreview(0), postPreview(1)],
    loading: false,
    error: false,
    loadMore: () => undefined,
  },
}

export const NoResults = {
  args: {
    data: [],
    loading: false,
    error: false,
    loadMore: () => undefined,
  },
}

export const Error = {
  args: {
    data: [],
    loading: false,
    error: true,
    loadMore: () => undefined,
  },
}

export const ErrorWithResult = {
  args: {
    data: [postPreview(0)],
    loading: false,
    error: true,
    loadMore: () => undefined,
  },
}
