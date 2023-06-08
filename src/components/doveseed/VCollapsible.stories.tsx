import React from "react"
import { StoryFn } from "@storybook/react"
import VCollapsible from "./VCollapsible"

export default {
  title: "Doveseed/VCollapsible",
  component: VCollapsible,
}

const Template: StoryFn<typeof VCollapsible> = (args: {
  collapsed?: boolean
}) => (
  <span>
    [<VCollapsible {...args}>Children</VCollapsible>]
  </span>
)

export const Collapsed = {
  render: Template,

  args: {
    collapsed: true,
  },
}

export const Open = {
  render: Template,

  args: {
    collapsed: false,
  },
}
