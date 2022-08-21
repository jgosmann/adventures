import React from "react"
import { ComponentStory } from "@storybook/react"
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

const Template: ComponentStory<typeof GalleryComponent> = (
  args: GalleryProps
) => (
  <GalleryComponent {...args}>
    <Rimg image={imgFileNode} />
    <Rimg image={imgFileNode} />
    <Rimg image={imgFileNode} />
    <Rimg image={imgFileNode} />
  </GalleryComponent>
)

export const Gallery = Template.bind({})

export const LargeGallery = Template.bind({})
LargeGallery.args = {
  large: true,
}
