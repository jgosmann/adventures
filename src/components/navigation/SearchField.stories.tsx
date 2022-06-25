import React from "react"
import { ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import SearchField, { SearchFieldProps } from "./SearchField"

export default {
  title: "Navigation/Search Field",
  component: SearchField,
}

const Template: ComponentStory<typeof SearchField> = (
  args: SearchFieldProps
) => <SearchField {...args} />

export const Empty = Template.bind({})

export const Filled = Template.bind({})
Filled.args = {
  query: "search query",
}

export const Active = Template.bind({})
Active.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole("searchbox"))
}
