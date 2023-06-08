import { StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import SearchField from "./SearchField"

export default {
  title: "Navigation/Search Field",
  component: SearchField,
}

export const Empty = {}

export const Filled = {
  args: {
    query: "search query",
  },
}

export const Active: StoryObj<typeof SearchField> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("searchbox"))
  },
}
