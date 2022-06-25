import React from "react"
import { ComponentStory } from "@storybook/react"
import CollapsedMenu, { CollapsedMenuProps } from "./CollapsedMenu"

export default {
  title: "Navigation/Collapsed Menu",
  component: CollapsedMenu,
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

const Template: ComponentStory<typeof CollapsedMenu> = (
  args: CollapsedMenuProps
) => <CollapsedMenu {...args} />

export const Default = Template.bind({})

export const Expanded = Template.bind({})
Expanded.args = {
  expanded: true,
}
