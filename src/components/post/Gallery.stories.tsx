import React from "react"
import { StoryFn } from "@storybook/react"
import GalleryComponent, { GalleryProps } from "./Gallery"
import {
  mockGatsbyImage,
  mockImageFileNode,
} from "../../../test/gatsby-image-fixture"
import Rimg from "./Rimg"

export default {
  title: "Post/Gallery",
  component: GalleryComponent,
  parameters: {
    chromatic: { viewports: [1600] },
  },
}

const imgFileNode = {
  ...mockImageFileNode(
    mockGatsbyImage({
      url: "background.png",
      width: 1920,
      height: 1200,
      layout: "constrained",
    })
  ),
  publicURL: "background.png",
}

const Template: StoryFn<typeof GalleryComponent> = (args: GalleryProps) => (
  <GalleryComponent {...args}>
    <Rimg image={imgFileNode} />
    <Rimg image={imgFileNode} />
    <Rimg image={imgFileNode} />
    <Rimg image={imgFileNode} />
  </GalleryComponent>
)

export const Gallery = {
  render: Template,
}

export const LargeGallery = {
  render: Template,

  args: {
    large: true,
  },
}
