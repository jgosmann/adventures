import React from "react"
import { ComponentStory } from "@storybook/react"
import Navigation, { NavigationProps } from "."
import { userEvent, within } from "@storybook/testing-library"
import { minFullWidth } from "./sizes"

export default {
  title: "Navigation/Integration",
  component: Navigation,
  parameters: {
    layout: "fullscreen",
    chromatic: { viewports: [minFullWidth - 1, minFullWidth + 1] },
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

const Template: ComponentStory<typeof Navigation> = (args: NavigationProps) => (
  <Navigation {...args} />
)

export const Default = Template.bind({})

export const DefaultWithQuery = Template.bind({})
DefaultWithQuery.args = {
  query: "query",
}

export const DefaultWithYearPath = Template.bind({})
DefaultWithQuery.args = {
  path: "/year/2021",
}

export const Expanded = Template.bind({})
Expanded.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByTitle("Expand menu"))
}
