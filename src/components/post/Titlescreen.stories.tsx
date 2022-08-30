import React from "react"
import { ComponentStory } from "@storybook/react"
import TitlescreenComponent, { TitlescreenProps } from "./Titlescreen"
import {
  mockGatsbyImage,
  mockImageFileNode,
} from "../../../test/gatsby-image-fixture"

export default {
  title: "Post/Titlescreen",
  component: TitlescreenComponent,
  parameters: {
    layout: "fullscreen",
  },
}

const Template: ComponentStory<typeof TitlescreenComponent> = (
  args: TitlescreenProps
) => <TitlescreenComponent {...args} />

export const Titlescreen = Template.bind({})
Titlescreen.args = {
  background: mockImageFileNode(
    mockGatsbyImage({
      url: "background.png",
      width: 1920,
      height: 1200,
      layout: "fullWidth",
    })
  ),
  frontmatter: {
    date: "2022-07-17T11:37:06Z",
    title: "The title of the post",
  },
  fields: { timeToRead: { minutes: 14 } },
}
