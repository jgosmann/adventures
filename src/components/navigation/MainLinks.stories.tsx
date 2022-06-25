import React from "react"
import { ComponentStory } from "@storybook/react"
import MainLinks, { MainLinksProps } from "./MainLinks"
import { minFullWidth } from "./sizes"

export default {
  title: "Navigation/Main Links",
  component: MainLinks,
  parameters: {
    chromatic: { viewports: [minFullWidth - 1, minFullWidth + 1] },
  },
}

const Template: ComponentStory<typeof MainLinks> = (args: MainLinksProps) => (
  <MainLinks {...args} />
)

export const Default = Template.bind({})

export const ColumnOrientation = Template.bind({})
ColumnOrientation.args = {
  orientation: "column",
}

export const WithQuery = Template.bind({})
WithQuery.args = {
  query: "query",
}

export const WithYearPath = Template.bind({})
WithYearPath.args = {
  path: "/year/2021",
}
