import React from "react"
import { StoryObj } from "@storybook/react"
import Rimg from "./Rimg"
import {
  mockGatsbyImage,
  mockImageFileNode,
} from "../../../test/gatsby-image-fixture"
import { userEvent, within } from "@storybook/testing-library"

export default {
  title: "Post/Responsive Image",
  component: Rimg,
}

const imgFileNode = mockImageFileNode(
  mockGatsbyImage({
    url: "background.png",
    width: 1920,
    height: 1200,
    layout: "constrained",
  })
)

export const ResponsiveImage = {
  args: {
    image: {
      ...imgFileNode,
      publicURL: "background.png",
    },
  },
}

export const WithAltAndCaption = {
  args: {
    ...ResponsiveImage.args,
    alt: "The alt text",
    caption: "The caption",
  },
}

export const WithChildren = {
  args: {
    ...ResponsiveImage.args,
    children: <em>The children</em>,
  },
}

export const WithOverlay = {
  args: {
    ...ResponsiveImage.args,
    overlay: "overlay.svg",
  },
}

export const WithOverlayDeactivated: StoryObj<typeof Rimg> = {
  args: {
    ...WithOverlay.args,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("checkbox"))
  },
}
