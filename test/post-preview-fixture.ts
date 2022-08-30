import { mockGatsbyImage, mockImageFileNode } from "./gatsby-image-fixture"

export const previewImage = mockImageFileNode(
  mockGatsbyImage({
    url: "background.png",
    width: 300,
    height: 250,
    layout: "fixed",
  })
)

export const postPreview = (id: number, map = "48.1550, 11.5418") => ({
  pagePath: `/post/url${id}`,
  childMdx: {
    id: `id${id}`,
    background: previewImage,
    frontmatter: {
      title: `Post Title ${id}`,
      date: "2022-08-21 13:37",
      categories: ["Box 1", "Box 2"],
      map,
    },
    fields: {
      timeToRead: { minutes: 42 },
    },
  },
})
