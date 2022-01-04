import React from "react"
import { ComponentStory } from "@storybook/react"
import VCollapsible from "./VCollapsible"

export default {
  title: "Doveseed/VCollapsible",
  component: VCollapsible,
}

const Template: ComponentStory<typeof VCollapsible> = (args: {
  collapsed?: boolean
}) => (
  <span>
    [<VCollapsible {...args}>Children</VCollapsible>]
  </span>
)

export const Collapsed = Template.bind({})
Collapsed.args = {
  collapsed: true,
}

export const Open = Template.bind({})
Open.args = {
  collapsed: false,
}
