import React from "react"
import { ComponentStory } from "@storybook/react"
import ExpandedMenu, { ExpandedMenuProps } from "./ExpandedMenu"

export default {
  title: "Navigation/Expanded Menu",
  component: ExpandedMenu,
  parameters: {
    layout: "fullscreen",
    staticQuery: {
      allSitePage: {
        nodes: [
          { path: "/year/2020", context: { year: 2020 } },
          { path: "/year/2021", context: { year: 2021 } },
          { path: "/year/2022", context: { year: 2022 } },
        ],
      },
    },
  },
}

const Template: ComponentStory<typeof ExpandedMenu> = (
  args: ExpandedMenuProps
) => <ExpandedMenu {...args} />

export const Default = Template.bind({})

export const Expanded = Template.bind({})
Expanded.args = {
  expanded: true,
}
