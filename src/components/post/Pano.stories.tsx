import React from "react"
import { ComponentStory } from "@storybook/react"
import Pano, { PanoProps } from "./Pano"
import {
  mockGatsbyImage,
  mockImageFileNode,
} from "../../../test/gatsby-image-fixture"

export default {
  title: "Post/Panorama",
  component: Pano,
  parameters: {
    layout: "fullscreen",
  },
}

const Template: ComponentStory<typeof Pano> = (args: PanoProps) => (
  <Pano {...args} />
)

const imgFileNode = mockImageFileNode(
  mockGatsbyImage({
    url: "background.png",
    width: 1920,
    height: 1200,
    layout: "fixed",
  })
)

export const Panorama = Template.bind({})
Panorama.args = {
  image: {
    ...imgFileNode,
  },
}
