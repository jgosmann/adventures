import React from "react"
import { StoryFn } from "@storybook/react"

import CopyButton from "./CopyButton"

export default {
  title: "Crypted/Copy Button",
  component: CopyButton,
  paramaters: {
    chromatic: { disableSnapshot: true },
  },
}

const Template: StoryFn<typeof CopyButton> = (args: { title?: string }) => (
  <CopyButton getCopyText={() => ""} {...args} />
)

export const WithoutTitle = {
  render: Template,
  args: { title: undefined },
}

export const WithTitle = {
  render: Template,

  args: {
    title: "Title",
  },
}
