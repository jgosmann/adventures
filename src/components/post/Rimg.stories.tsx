import React from "react"
import { ComponentStory } from "@storybook/react"
import Rimg, { RimgProps } from "./Rimg"
import {
  mockGatsbyImage,
  mockImageFileNode,
} from "../../../test/gatsby-image-fixture"
import { userEvent, within } from "@storybook/testing-library"

export default {
  title: "Post/Responsive Image",
  component: Rimg,
}

const Template: ComponentStory<typeof Rimg> = (args: RimgProps) => (
  <Rimg {...args} />
)

const imgFileNode = mockImageFileNode(
  mockGatsbyImage({
    url: "background.png",
    width: 1920,
    height: 1200,
    layout: "constrained",
  })
)

export const ResponsiveImage = Template.bind({})
ResponsiveImage.args = {
  image: {
    ...imgFileNode,
    publicURL: "background.png",
  },
}

export const WithAltAndCaption = Template.bind({})
WithAltAndCaption.args = {
  ...ResponsiveImage.args,
  alt: "The alt text",
  caption: "The caption",
}

export const WithChildren = Template.bind({})
WithChildren.args = {
  ...ResponsiveImage.args,
  children: <em>The children</em>,
}

export const WithOverlay = Template.bind({})
WithOverlay.args = {
  ...ResponsiveImage.args,
  overlay: "overlay.svg",
}

export const WithOverlayDeactivated = Template.bind({})
WithOverlayDeactivated.args = {
  ...WithOverlay.args,
}
WithOverlayDeactivated.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole("checkbox"))
}
