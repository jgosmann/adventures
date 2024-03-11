import { StoryObj } from "@storybook/react"
import Navigation from "."
import { userEvent, within } from "@storybook/test"
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

export const Default = {}

export const DefaultWithQuery = {
  args: {
    path: "/year/2021",
  },
}

export const DefaultWithYearPath = {}

export const Expanded: StoryObj<typeof Navigation> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByTitle("Expand menu"))
  },
}
