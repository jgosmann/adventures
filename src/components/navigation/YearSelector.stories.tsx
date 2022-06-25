import React from "react"
import { ComponentStory } from "@storybook/react"
import { YearSelectorView, YearSelectorViewProps } from "./YearSelector"

export default {
  title: "Navigation/Year Selector",
  component: YearSelectorView,
  parameters: {
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

const Template: ComponentStory<typeof YearSelectorView> = (
  args: YearSelectorViewProps
) => <YearSelectorView {...args} />

export const Closed = Template.bind({})

export const Open = Template.bind({})
Open.args = {
  active: true,
}

export const SelectedYear = Template.bind({})
SelectedYear.args = {
  path: "/year/2021",
}
