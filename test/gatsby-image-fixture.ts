import { IGatsbyImageData, Layout } from "gatsby-plugin-image"
import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks"

export interface MockGatsbyImageArgs {
  url: string
  width: number
  height: number
  layout: Layout
}

export const mockGatsbyImage = ({
  url,
  width,
  height,
  layout,
}: MockGatsbyImageArgs): { gatsbyImageData: IGatsbyImageData } => ({
  gatsbyImageData: {
    layout,
    width,
    height,
    images: {
      fallback: {
        src: url,
      },
    },
  },
})

export const mockImageFileNode = (image: {
  gatsbyImageData: IGatsbyImageData
}): FileNode & { gatsbyImageData: IGatsbyImageData; title: string } => ({
  parent: "parent",
  id: "image-id",
  title: "Image title",
  children: [],
  internal: { type: "File", owner: "test-fixtures", contentDigest: "hash" },
  ...image,
})
